import { eq, inArray, isNull, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";
import sharp from "sharp";
import { propertyManagementList } from "~/data/propertyManagementList";
import { db } from "~/db/db";
import { address, flat, propertyManagement } from "~/db/schema";
import { getBrowser } from "~/utils/getBrowser";

const insertFlatSchema = createInsertSchema(flat);

export default defineEventHandler(async () => {
  // update property management data in db
  const propertyManagementData = propertyManagementList.map((p) => ({
    name: p.name,
    website: p.website,
    slug: p.slug,
  }));

  await db
    .insert(propertyManagement)
    .values(propertyManagementData)
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

  const data = await Promise.all(
    propertyManagementList.map(async ({ getFlats, slug }) => ({
      slug,
      flats: (await getFlats(browser)).filter(Boolean),
    })),
  );

  const dbPromises = propertyManagementList.map(async ({ getFlats, slug }) => {
    const flats = (await getFlats(browser)).filter(Boolean);

    const addresses = flats.map((f) => f.address).filter(Boolean);

    await db
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
      });

    await db
      .insert(flat)
      .values(
        await Promise.all(
          flats.map(async (f) => {
            let image: Buffer | null = null;
            if (f.imageUrl) {
              const imageBuffer = await (await fetch(f.imageUrl)).arrayBuffer();
              image = await sharp(imageBuffer)
                .resize(200, 200, {
                  fit: "cover",
                })
                .toBuffer();
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
              warmRentPrice: f.warmRentPrice!,
              tags: f.tags ?? [],
              lastSeen: new Date(),
              firstSeen: new Date(),
              url: f.url,
              image,
            } satisfies z.infer<typeof insertFlatSchema>;
          }),
        ),
      )
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
          tags: sql`excluded.tags`,
          deleted: sql`NULL`,
        },
        where: sql`flat.id = excluded.id`,
      });

    // remove flats that are no longer available
    const existingFlats = await db
      .select()
      .from(flat)
      .leftJoin(propertyManagement, eq(flat.propertyManagementId, slug))
      .where(isNull(flat.deleted))
      .execute();

    const existingFlatIds = existingFlats.map((f) => f.flat.id);
    const newFlatIds = data.flatMap((d) => d.flats.map((f) => f.id));
    const removedFlatIds = existingFlatIds.filter(
      (id) => !newFlatIds.includes(id),
    );

    if (removedFlatIds.length > 0) {
      await db
        .update(flat)
        .set({ deleted: new Date() })
        .where(inArray(flat.id, removedFlatIds))
        .execute();
    }
  });
  await Promise.allSettled(dbPromises);

  return data;
});
