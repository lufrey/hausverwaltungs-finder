import { z } from "zod";
import {
  flatSchema,
  type Flat,
  type PropertyManagement,
} from "../propertyManagementList";
import { getAddress } from "../address";
import { getApartmentTagsLocally } from "../tags";
import { hashString } from "~/server/util";
import { getApartmentTagsViaAI } from "~/server/aiTagRetriever";
import { env } from "~/env";

const listingSchema = z.object({
  RealEstateId: z.number(),
  PublicationId: z.number(),
  MarketingMethod: z.string(),
  Street: z.string(),
  HouseNumber: z.string(),
  PostalCode: z.string(),
  City: z.string(),
  Rooms: z.number().nullable(),
  Floor: z.number().nullable(),
  Size: z.number(),
  BasePrice: z.number().nullable(),
  OperatingCost: z.number().nullable(),
  HeatingWWCost: z.number().nullable(),
  Deposit: z.number().nullable(),
  Description: z.string(),
  Equipment: z.string(),
  Title: z.string(),
  WBSType: z.string(),
  MediaFiles: z.array(
    z.object({
      Title: z.string(),
      Description: z.string(),
      MediaFileType: z.string(),
    }),
  ),
});

export const allod: PropertyManagement = {
  slug: "allod",
  name: "Allod Immobilien",
  website: "https://www.allod.de/Immobilien",
  getFlats: async (_, limit) => {
    await new Promise((resolve) => setTimeout(resolve, 10));

    const url = "https://papapi.mediac2.de/api/Publications?portalId=10035";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Origin: "https://www.allod.de",
        Referer: "https://www.allod.de",
      },
    }).then((r) => r.json());

    if (!Array.isArray(res)) return [];

    const listings = res
      .slice(0, limit)
      .map((listing) => {
        const parsedListing = listingSchema.safeParse(listing);
        return parsedListing.success && parsedListing.data;
      })
      .filter(Boolean);
    console.log(`parsed ${listings.length} of ${res.length} listings`);

    return await Promise.all(
      listings
        .map(async (listing) => {
          const id = await hashString(listing.PublicationId.toString());
          const cleanedAddress = await getAddress(
            id,
            `${listing.Street} ${listing.HouseNumber}, ${listing.PostalCode} ${listing.City}`,
          );
          if (!cleanedAddress) return false;
          const tags = env.OPENAI_API_KEY
            ? await getApartmentTagsViaAI(id, listing.Title)
            : getApartmentTagsLocally(listing.Title);

          const returnFlat = {
            id,
            address: cleanedAddress,
            title: listing.Title,
            roomCount: listing.Rooms,
            floor: listing.Floor,
            usableArea: listing.Size,
            coldRentPrice: listing.BasePrice,
            warmRentPrice:
              listing.BasePrice &&
              listing.OperatingCost &&
              listing.HeatingWWCost
                ? listing.OperatingCost +
                  listing.HeatingWWCost +
                  listing.BasePrice
                : null,
            tags,
            url: `https://www.allod.de/Immobilien/Details/${listing.RealEstateId}`,
            imageUrl: `https://papapi.mediac2.de/media/RealEstates/${listing.PublicationId}/Preview.jpg`,
          } satisfies Flat;
          const parsedFlat = flatSchema.safeParse(returnFlat);
          if (!parsedFlat.success) console.log(parsedFlat.error);
          return parsedFlat.success && parsedFlat.data;
        })
        .filter(Boolean),
    );
  },
};
