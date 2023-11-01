import type { Browser } from "puppeteer";
import { z } from "zod";
import { addressSchema, getAddress } from "./address";
import { parseUncleanFloat, parseUncleanInt } from "~/utils/util";

const flatSchema = z.object({
  id: z.string(),
  title: z.string(),
  coldRentPrice: z.number().nullable().optional(),
  warmRentPrice: z.number().nullable().optional(),
  roomCount: z.number().nullable().optional(),
  usableArea: z.number().nullable().optional(),
  address: addressSchema.nullable(),
  floor: z.number().nullable().optional(),
  tags: z.array(z.string()),
  image: z.string().optional().nullable(),
});

type Flat = z.infer<typeof flatSchema>;

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
          // TODO: fix this
          console.log(await el.$(".SP-Teaser__image"));
          const imageUrl =
            (await el.$(".SP-Teaser__image")) === null
              ? null // @ts-ignore
              : await el.$eval(".SP-FixedSize__raiser", (el) => el.href);
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

          const returnFlat = {
            address: await getAddress(mappedTableData.address),
            title,
            id: "1",
            roomCount: parseUncleanInt(mappedTableData.roomCount),
            coldRentPrice: parseUncleanInt(mappedTableData.coldRentPrice),
            warmRentPrice: parseUncleanInt(mappedTableData.warmRentPrice),
            usableArea: parseUncleanFloat(mappedTableData.usableArea),
            tags: [],
            image: imageUrl,
          };
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
