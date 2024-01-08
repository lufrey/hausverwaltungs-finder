import { and, eq, inArray, isNull, sql, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "~/db/db";
import { address, flat, flatToTag } from "~/db/schema";
import { omit } from "~/utils/typeHelper";
import { berlinDistricts } from "~/data/districts";
import { type Tags, tagsSchema } from "~/data/tags";

const sqlTrue = sql`true`;

const countsAsNewTime = 60 * 60 * 3;
export const countsAsNewFilter = sql<
  0 | 1
>`strftime('%s', 'now') - firstSeen < ${countsAsNewTime}`.as("isNew");

const queryOptions = {
  where: isNull(flat.deleted),
  with: { address: true, flatToTag: true },
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
        const tags = flat.flatToTag.map((flatToTag) => flatToTag.tagId);
        if (flat.isNew) {
          tags.push("new");
        }
        return { ...flat, tags };
      });
    }),
  getAll: publicProcedure
    .input(
      z
        .object({
          limit: z.coerce.number().optional().default(100),
          offset: z.number().optional().default(0),
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
      const tagsToFilterFor = tagsSchema.safeParse(input.tags ?? []);

      // get the flatIds of all flats that fulfill the filters
      const flatIdsQuery = db
        .select({ id: flat.id, isNew: countsAsNewFilter })
        .from(flat)
        .leftJoin(flatToTag, eq(flat.id, flatToTag.flatId))
        .groupBy(flat.id)
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
            // fulfills tag filter
            tagsToFilterFor.success && tagsToFilterFor.data.length > 0
              ? inArray(flatToTag.tagId, tagsToFilterFor.data)
              : sqlTrue,
          ),
        )
        .limit(input.limit)
        .offset(input.offset);

      // run the full query, there will be multiples, because of the m:n relation to the tags
      const query = db
        .select({
          flat: { ...getTableColumns(flat), isNew: countsAsNewFilter },
          address: getTableColumns(address),
          flatToTag: getTableColumns(flatToTag),
        })
        .from(flatIdsQuery.as("flatIdQuery"))
        .innerJoin(flat, eq(flat.id, sql`flatIdQuery.id`))
        .innerJoin(address, eq(flat.addressId, address.id))
        .leftJoin(flatToTag, eq(flat.id, flatToTag.flatId));

      // filter out the multiples and bring it into the correct format
      const data = (await query).reduce(
        (acc, dataPoint) => {
          const flat = omit(dataPoint.flat, ["deleted", "image"]);

          // create the flat object for the first time
          if (!acc[dataPoint.flat.id]) {
            acc[dataPoint.flat.id] = {
              ...flat,
              tags: flat.isNew ? ["new"] : [],
              hasImage: !!dataPoint.flat.image,
              address: dataPoint.address,
            };
          }

          // add current tag
          if (dataPoint.flatToTag?.tagId) {
            acc[dataPoint.flat.id].tags.push(dataPoint.flatToTag.tagId);
          }

          return acc;
        },
        {} as Record<
          string,
          Omit<typeof flat.$inferSelect, "image" | "deleted"> & {
            tags: Tags;
            hasImage: boolean;
            address: typeof address.$inferSelect;
          }
        >,
      );
      return Object.values(data);
    }),
});
