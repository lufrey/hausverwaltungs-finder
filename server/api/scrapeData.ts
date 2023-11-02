import fs from "fs";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";
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

  propertyManagementList.forEach(async ({ getFlats, slug }) => {
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

    const image = fs.readFileSync("./assets/placeholder.png");

    await db
      .insert(flat)
      .values(
        flats.map((f) => {
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
        },
        where: sql`flat.id = excluded.id`,
      });
  });

  return data;
});
