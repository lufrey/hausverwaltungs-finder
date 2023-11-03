import type { Browser } from "puppeteer";
import { z } from "zod";
import { getAddress, insertAddressSchema } from "./address";
import { tagsSchema } from "./tags";
import { hashString, parseUncleanFloat, parseUncleanInt } from "~/utils/util";

const flatSchema = z.object({
  id: z.string(),
  title: z.string(),
  coldRentPrice: z.number(),
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

type PropertyManagement = z.infer<typeof propertyManagementSchema> & {
  getFlats: (browser: Browser) => Promise<(Flat | false)[]>;
};

export const propertyManagementList: PropertyManagement[] = [
  {
    slug: "stadtundland",
    name: "Stadt und Land",
    getFlats: async (browser: Browser) => {
      const url = "https://www.stadtundland.de/immobiliensuche.php";
      const page = await browser.newPage();
      await page.goto(url);

      await page.waitForSelector("#button-submit-gen-2");
      await page.click("#button-submit-gen-2");

      await page.waitForSelector(".SP-TeaserList__item");
      const els = await page.$$(".SP-TeaserList__item");
      const tableKeyMap = {
        adresse: "address",
        nutzfl: "usableArea",
        kaltmiete: "coldRentPrice",
        warmmiete: "warmRentPrice",
        "zzgl. gültiger ust": "coldRentPrice",
        zimmer: "roomCount",
      } as const;
      const tableKeys = Object.keys(tableKeyMap);
      const data = await Promise.all(
        els.map(async (el) => {
          const title = await el.$eval(
            ".SP-Teaser__headline",
            (el) => el.textContent?.trim() ?? "",
          );
          const imageUrl =
            (await el.$(".SP-MiniGallery__list a")) === null
              ? null
              : await el.$eval(".SP-MiniGallery__list a", (el) => el.href);

          const idSource = await el.$eval(
            ".SP-LinkList__item a",
            (el) => el.href,
          );

          const tableData = await el.$eval(".SP-Table--static tbody", (el) => {
            return Array.from(el.children).reduce((acc, cur) => {
              const key =
                cur.children[0].textContent?.toLowerCase().trim() ?? "";
              const value =
                cur.children[1].textContent?.toLowerCase().trim() ?? "";
              acc[key] = value;
              return acc;
            }, {} as any);
          });

          const mappedTableData = Object.entries(tableData).reduce(
            (acc, [key, value]) => {
              // if one element in tablekeys is part of the key, we map it to the new key
              const mappedKey = tableKeys.find((tableKey) =>
                key.includes(tableKey),
              );
              if (mappedKey) {
                // @ts-ignore
                acc[tableKeyMap[mappedKey]] = value;
              }
              return acc;
            },
            {} as Record<
              (typeof tableKeyMap)[keyof typeof tableKeyMap],
              string
            >,
          );

          const address = await getAddress(mappedTableData.address);
          const coldRentPrice = parseUncleanInt(mappedTableData.coldRentPrice);
          if (!address || !coldRentPrice || !title) {
            return false;
          }

          const returnFlat = {
            address,
            title,
            id: await hashString(idSource),
            roomCount: parseUncleanInt(mappedTableData.roomCount),
            coldRentPrice,
            warmRentPrice: parseUncleanInt(mappedTableData.warmRentPrice),
            usableArea: parseUncleanFloat(mappedTableData.usableArea),
            tags: [],
            url: idSource,
            imageUrl,
          } satisfies Flat;
          const result = flatSchema.safeParse(returnFlat);
          if (result.success) {
            return result.data;
          }
          return false;
        }),
      );
      await page.close();
      return data;
    },
  },
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
