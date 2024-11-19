import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { z } from "zod";
import sharp from "sharp";
import { createInsertSchema } from "drizzle-zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "~/db/db";
import { propertyManagementList } from "~/data/propertyManagementList";
import { address, flat, flatToTag, propertyManagement, tag } from "~/db/schema";
import { getBrowser } from "~/utils/getBrowser";
import { isFulfilled, isRejected } from "~/utils/typeHelper";
import { tags } from "~/data/tags";
import { updateMapPreview } from "~/server/updateMapPreview";
const insertFlatSchema = createInsertSchema(flat);

export const propertyManagementRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.query.propertyManagement.findMany({
      with: {
        flats: {
          columns: {
            id: true,
            title: true,
          },
          extras: {
            isActive: sql<0 | 1>`deleted IS NULL`.as("isActive"),
          },
        },
      },
    });
  }),
  update: protectedProcedure
    .input(
      z
        .object({
          slugs: z.array(z.string()).optional(),
          return: z.boolean().optional(),
        })
        .optional(),
    )
    .mutation(async ({ input }) => {
      const { slugs } = input ?? {};
      const propertyManagements = slugs
        ? propertyManagementList.filter((p) => slugs.includes(p.slug))
        : propertyManagementList;

      // insert property management data in db
      await db
        .insert(propertyManagement)
        .values(propertyManagements)
        .onConflictDoUpdate({
          target: propertyManagement.slug,
          set: {
            name: sql`excluded.name`,
            website: sql`excluded.website`,
            slug: sql`excluded.slug`,
          },
          where: sql`propertyManagement.slug = excluded.slug`,
        });

      const browser = await getBrowser();
      try {
        const scrapedData = (
          await Promise.all(
            propertyManagements.map(async ({ getFlats, slug }) => {
              let data = null;
              try {
                // get number of existing (non deleted) flats
                const existingFlatCount = await db
                  .select()
                  .from(flat)
                  .where(
                    and(
                      isNull(flat.deleted),
                      eq(flat.propertyManagementId, slug),
                    ),
                  )
                  .execute();
                data = await getFlats(browser, existingFlatCount.length + 15);
              } catch (e) {
                return false;
              }

              return {
                slug,
                flats: data.filter(Boolean),
              };
            }),
          )
        ).filter(Boolean);

        const dbPromises = scrapedData.map(async ({ slug, flats }) => {
          const addresses = flats.map((f) => f.address).filter(Boolean);
          const tagKeys = Array.from(new Set(flats.map((f) => f.tags).flat()));
          const tagsToInsert = tagKeys
            // make sure this tag exists in the tags object
            .filter((tag) => !!tags[tag])
            .map((tag) => ({ id: tag, name: tags[tag] }));

          tagsToInsert.length &&
            (await db
              .insert(tag)
              .values(tagsToInsert)
              .onConflictDoNothing()
              .execute());

          // upsert addresses
          addresses.length &&
            (await db
              .insert(address)
              .values(addresses)
              .onConflictDoUpdate({
                target: address.id,
                set: {
                  street: sql`excluded.street`,
                  city: sql`excluded.city`,
                  streetNumber: sql`excluded.streetNumber`,
                  postalCode: sql`excluded.postalCode`,
                  longitude: sql`excluded.longitude`,
                  latitude: sql`excluded.latitude`,
                },
                where: sql`address.id = excluded.id`,
              }));

          // upsert flats
          const flatsToInsert = (
            await Promise.allSettled(
              flats.map(async (f) => {
                let image: Buffer | null = null;
                if (f.imageUrl) {
                  try {
                    const imageBuffer = await (
                      await fetch(f.imageUrl)
                    ).arrayBuffer();
                    image = await sharp(imageBuffer)
                      .resize(200, 200, {
                        fit: "cover",
                      })
                      .toBuffer();
                  } catch (e) {
                    console.error(e);
                  }
                }

                return {
                  addressId: f.address.id,
                  coldRentPrice: f.coldRentPrice,
                  floor: f.floor,
                  propertyManagementId: slug,
                  id: f.id,
                  roomCount: f.roomCount,
                  title: f.title,
                  usableArea: f.usableArea,
                  warmRentPrice: f.warmRentPrice,
                  lastSeen: new Date(),
                  firstSeen: new Date(),
                  url: f.url,
                  image,
                  deleted: null,
                } satisfies z.infer<typeof insertFlatSchema>;
              }),
            )
          )
            .filter(isFulfilled)
            .map((r) => r.value);

          flatsToInsert.length &&
            (await db
              .insert(flat)
              .values(flatsToInsert)
              .onConflictDoUpdate({
                target: flat.id,
                set: {
                  addressId: sql`excluded.addressId`,
                  coldRentPrice: sql`excluded.coldRentPrice`,
                  floor: sql`excluded.floor`,
                  image: sql`excluded.image`,
                  propertyManagementId: sql`excluded.propertyManagementId`,
                  roomCount: sql`excluded.roomCount`,
                  title: sql`excluded.title`,
                  usableArea: sql`excluded.usableArea`,
                  warmRentPrice: sql`excluded.warmRentPrice`,
                  lastSeen: sql`excluded.lastSeen`,
                  deleted: sql`excluded.deleted`,
                  url: sql`excluded.url`,
                },
                where: sql`flat.id = excluded.id`,
              }));

          // connect tags to flats
          const flatToTagRelations = flats
            .map((flat) =>
              flat.tags.map((tag) => ({ flatId: flat.id, tagId: tag })),
            )
            .flat();
          flatToTagRelations.length &&
            (await db
              .insert(flatToTag)
              .values(flatToTagRelations)
              .onConflictDoNothing()
              .execute());

          const existingFlats = await db
            .select()
            .from(flat)
            .where(
              and(isNull(flat.deleted), eq(flat.propertyManagementId, slug)),
            )
            .execute();

          const newFlatIds = flats.map((f) => f.id);
          const removedFlatIds = existingFlats
            .map((f) => f.id)
            .filter((id) => !newFlatIds.includes(id));

          if (removedFlatIds.length > 0) {
            await db
              .update(flat)
              .set({ deleted: new Date() })
              .where(inArray(flat.id, removedFlatIds))
              .execute();
          }
        });
        const settledDbPromises = await Promise.allSettled(dbPromises);
        settledDbPromises
          .filter((p) => isRejected(p))
          .forEach((p) => {
            console.error(p);
          });

        // start map preview update
        updateMapPreview();

        if (input?.return) {
          return scrapedData;
        }
        return null;
      } finally {
        await browser.close();
      }
    }),
});
