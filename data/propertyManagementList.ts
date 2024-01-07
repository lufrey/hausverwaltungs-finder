import type { Browser } from "puppeteer";
import { z } from "zod";
import { insertAddressSchema } from "./address";
import { tagsSchema } from "./tags";
import { stadtundland } from "./propertyManagements/stadtundland";
import { gewobag } from "./propertyManagements/gewobag";
import { deutschewohnen } from "./propertyManagements/deutschewohnen";

export const flatSchema = z.object({
  id: z.string(),
  title: z.string(),
  coldRentPrice: z.number().nullable().optional(),
  warmRentPrice: z.number().nullable().optional(),
  roomCount: z.number().nullable().optional(),
  usableArea: z.number().nullable().optional(),
  address: insertAddressSchema,
  floor: z.number().nullable().optional(),
  tags: tagsSchema,
  imageUrl: z.string().optional().nullable(),
  url: z.string(),
});

export type Flat = z.infer<typeof flatSchema>;

const propertyManagementSchema = z.object({
  slug: z.string(),
  name: z.string(),
  website: z.string().optional(),
});

export type PropertyManagement = z.infer<typeof propertyManagementSchema> & {
  getFlats: (browser: Browser) => Promise<(Flat | false)[]>;
};

export const propertyManagementList: PropertyManagement[] = [
  stadtundland,
  gewobag,
  deutschewohnen,
  // {
  //   id: "reanovo",
  //   name: "Reanovo",
  //   // @ts-ignore
  //   getFlats: async () => {
  //     const url = "https://reanovo.everreal.co/api/prism/public/expose?take=20";
  //     const data = await fetch(url).then((r) => r.json());
  //     return data;
  //   },
  // },
];
