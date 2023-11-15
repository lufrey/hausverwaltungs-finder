import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "~/db/db";
import { address, flat } from "~/db/schema";
import { countsAsNew } from "~/utils/util";

const extras = {
  hasImage: sql<0 | 1>`image IS NOT NULL`.as("hasImage"),
};
const sqlTrue = sql`true`;

const withOptions = {
  flats: {
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
    extras,
  },
} as const;

export const flatRouter = router({
  getFeatured: publicProcedure.query(async () => {
    return await db.query.propertyManagement.findMany({
      with: {
        ...withOptions,
        ...{
          flats: {
            limit: 5,
            ...withOptions.flats,
          },
        },
      },
    });
  }),
  getAll: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional().default(999),
          offset: z.number().optional().default(0),
          tags: z.array(z.string()).optional(),
          propertyManagements: z.array(z.string()).optional(),
        })
        .optional()
        .default({}),
    )
    .query(async ({ input }) => {
      // remove tag "new"
      const onlyShowNew = input.tags?.includes("new");
      if (onlyShowNew) {
        input.tags = input.tags?.filter((tag) => tag !== "new");
      }

      const data = (
        await db
          .select()
          .from(flat)
          .limit(input.limit)
          .offset(input.offset)
          .leftJoin(address, eq(flat.addressId, address.id))
          .where(
            and(
              input.propertyManagements
                ? inArray(flat.propertyManagementId, input.propertyManagements)
                : sqlTrue,
              isNull(flat.deleted),
            ),
          )
      ).map((dataPoint) => {
        return {
          ...dataPoint.flat,
          address: dataPoint.address,
          hasImage: +!!dataPoint.flat.image as 0 | 1,
        };
      });

      return data.filter((flat) => {
        if (onlyShowNew && !countsAsNew(flat.firstSeen)) {
          return false;
        }

        if (input.tags && input.tags.length > 0) {
          return flat.tags.some((tag) => input.tags!.includes(tag));
        }

        return true;
      });
    }),
});
