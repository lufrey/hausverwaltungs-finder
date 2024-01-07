import { and, eq, inArray, isNull, sql, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "~/db/db";
import { address, flat } from "~/db/schema";
import { omit } from "~/utils/typeHelper";
import { berlinDistricts } from "~/data/districts";

const sqlTrue = sql`true`;

const countsAsNewTime = 60 * 60 * 24;
export const countsAsNewFilter = sql<
  0 | 1
>`strftime('%s', 'now') - firstSeen < ${countsAsNewTime}`.as("isNew");

const queryOptions = {
  where: isNull(flat.deleted),
  with: { address: true },
  columns: {
    id: true,
    addressId: true,
    coldRentPrice: true,
    floor: true,
    propertyManagementId: true,
    tags: true,
    title: true,
    firstSeen: true,
    lastSeen: true,
    roomCount: true,
    usableArea: true,
    warmRentPrice: true,
    url: true,
  },
  extras: {
    hasImage: sql<0 | 1>`image IS NOT NULL`.as("hasImage"),
    isNew: countsAsNewFilter,
  },
} as const;

export const flatRouter = router({
  getFeatured: publicProcedure
    .input(
      z.object({
        limit: z.number().optional().default(8),
      }),
    )
    .query(async ({ input }) => {
      return (
        await db.query.flat.findMany({
          ...queryOptions,
          limit: input.limit,
        })
      ).map((flat) => {
        if (flat.isNew) {
          flat.tags.push("new");
        }
        return flat;
      });
    }),
  getAll: publicProcedure
    .input(
      z
        .object({
          pagination: z
            .object({
              limit: z.number(),
              offset: z.number(),
            })
            .optional()
            .default({ limit: 999, offset: 0 }),
          tags: z.array(z.string()).optional(),
          propertyManagements: z.array(z.string()).optional(),
          districts: z.array(z.string()).optional(),
        })
        .optional()
        .default({}),
    )
    .query(async ({ input }) => {
      // when filtering for "new", we need to filter for the timestamp
      // instead of the tag
      const onlyShowNew = input.tags?.includes("new");
      if (onlyShowNew) {
        input.tags = input.tags?.filter((tag) => tag !== "new");
      }

      const data = (
        await db
          .select({
            flat: { ...getTableColumns(flat), isNew: countsAsNewFilter },
            address: getTableColumns(address),
          })
          .from(flat)
          .limit(input.pagination.limit)
          .offset(input.pagination.offset)
          .leftJoin(address, eq(flat.addressId, address.id))
          .where(
            and(
              // not deleted
              isNull(flat.deleted),
              // fulfills property management filter
              input.propertyManagements
                ? inArray(flat.propertyManagementId, input.propertyManagements)
                : sqlTrue,
              // fulfills district filter
              input.districts
                ? inArray(
                    address.postalCode,
                    input.districts
                      .map((d) => {
                        // @ts-ignore
                        const district = berlinDistricts[d];
                        return district?.zipCodes ?? [];
                      })
                      .flat(),
                  )
                : sqlTrue,
              // fulfills countsAsNew filter
              onlyShowNew ? sql`isNew = 1` : sqlTrue,
            ),
          )
      ).map((dataPoint) => {
        const flat = omit(dataPoint.flat, ["deleted", "image"]);
        if (flat.isNew) {
          flat.tags.push("new");
        }
        return {
          ...flat,
          address: dataPoint.address,
          hasImage: +!!dataPoint.flat.image as 0 | 1,
        };
      });

      return data.filter((flat) => {
        if (input.tags && input.tags.length > 0) {
          return flat.tags.some((tag) => input.tags!.includes(tag));
        }

        return true;
      });
    }),
});
