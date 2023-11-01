import { sql } from "drizzle-orm";
import { propertyManagementList } from "~/data/propertyManagementList";
import { db } from "~/db/db";
import { address, flat, propertyManagement } from "~/db/schema";
import { getBrowser } from "~/utils/getBrowser";

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
    // TODO: add some kind of generatable index to the address table

    // create all addresses that dont exist
    // const addresses = flats
    //   .map((f) => f.address)
    //   .filter(Boolean)
    //   .map((a) => ({
    //     id: a.id,
    //     street: a.street,
    //     city: a.city,
    //     postalCodeId: a.postalCode,
    //   }));

    // await db.insert(address).values(addresses).onConflictDoNothing();

    await db.insert(flat).values(
      flats.map((f) => {
        return {
          // addressId: f.address ? f.address. : null,
          coldRentPrice: f.coldRentPrice,
          floor: f.floor,
          image: null,
          propertyManagementId: slug,

          // id: f.id,
          roomCount: f.roomCount,
          title: f.title,
          usableArea: f.usableArea,
          warmRentPrice: f.warmRentPrice,
        };
      }),
    );
  });

  return data;
});
