import { z } from "zod";
import { Client } from "@googlemaps/google-maps-services-js";
import { districtSchema } from "./districts";

export const addressSchema = z.object({
  street: z.string(),
  houseNumber: z.string(),
  zipCode: z.string(),
  district: districtSchema.optional(),
  city: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const getAddress = async (address: string) => {
  const client = new Client({});
  const x = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY ?? "",
      region: "de",
      language: "de",
      components: "country:DE",
    },
  });
  const addressData = x.data.results[0];

  const addressComponentMap = {
    street_number: "houseNumber",
    route: "street",
    sublocality_level_1: "district",
    locality: "city",
    postal_code: "zipCode",
  };

  const addressComponents = addressData.address_components.reduce(
    (acc, cur) => {
      Object.entries(addressComponentMap).forEach(([key, value]) => {
        if (cur.types.includes(key)) {
          acc[value] = cur.long_name;
        }
      });

      return acc;
    },
    {} as any,
  );

  const result = addressSchema.safeParse({
    street: addressComponents.street,
    houseNumber: addressComponents.houseNumber,
    zipCode: addressComponents.zipCode,
    city: addressComponents.city,
    coordinates: {
      lat: addressData.geometry.location.lat,
      lng: addressData.geometry.location.lng,
    },
  });
  if (result.success) {
    return result.data;
  } else {
    console.log(address);
    return null;
  }
};
