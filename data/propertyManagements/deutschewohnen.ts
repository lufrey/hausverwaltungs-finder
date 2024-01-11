import { z } from "zod";
import {
  flatSchema,
  type Flat,
  type PropertyManagement,
} from "../propertyManagementList";
import { getAddress } from "../address";
import { getTagsForTitle } from "../tags";
import { hashString } from "~/utils/util";

const listingSchema = z.object({
  id: z.string(),
  utilizationType: z.string(),
  commercializationType: z.string(),
  detailType: z.string(),
  title: z.string(),
  price: z.number(),
  address: z.object({
    street: z.string(),
    houseNumber: z.string(),
    zip: z.string(),
    city: z.string(),
    district: z.string(),
  }),
  images: z.array(
    z.object({
      filePath: z.string(),
      title: z.string(),
    }),
  ),
  requiresQualificationCertificate: z.boolean(),
  area: z.number(),
  rooms: z.number(),
  date: z.string(),
});

export const deutschewohnen: PropertyManagement = {
  slug: "deutschewohnen",
  name: "Deutsche Wohnen SE",
  getFlats: async () => {
    const url = "https://immo-api.deutsche-wohnen.com/estate/findByFilter";

    const postBody = {
      infrastructure: {},
      flatTypes: {},
      other: {},
      page: "1",
      locale: "de",
      commercializationType: "rent",
      utilizationType: "flat,retirement",
      location: "Berlin",
      city: "Berlin",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postBody),
    }).then((r) => r.json());

    try {
      const parsedRes = z.array(z.any()).parse(res);
      const listings = parsedRes
        .map((listing) => {
          const result = listingSchema.safeParse(listing);
          if (result.success) {
            return result.data;
          }
          return false;
        })
        .filter(Boolean);
      if (parsedRes.length !== listings.length) {
        console.log(
          `parsed ${listings.length} of ${parsedRes.length} listings`,
        );
      }

      return await Promise.all(
        listings.map(async (listing) => {
          const id = await hashString(listing.id);
          const cleanedAddress = await getAddress(
            id,
            `${listing.address.street} ${listing.address.houseNumber}, ${listing.address.zip} ${listing.address.city}`,
          );
          if (cleanedAddress === null) {
            return false;
          }

          const returnFlat = {
            address: cleanedAddress,
            title: listing.title,
            id,
            roomCount: listing.rooms,
            coldRentPrice: listing.price,
            warmRentPrice: null,
            usableArea: listing.area,
            tags: getTagsForTitle(listing.title),
            url: `https://www.deutsche-wohnen.com/expose/object/${listing.id}`,
            imageUrl: listing.images[0]?.filePath
              ? `https://immo-api.deutsche-wohnen.com${listing.images[0]?.filePath}`
              : null,
          } satisfies Flat;
          const result = flatSchema.safeParse(returnFlat);
          if (result.success) {
            return result.data;
          }
          return false;
        }),
      );
    } catch (e) {
      console.log("error parsing json", e);
      return [];
    }
  },
};
