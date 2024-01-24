import type { Browser } from "puppeteer";
import {
  flatSchema,
  type Flat,
  type PropertyManagement,
} from "../propertyManagementList";
import { getAddress } from "../address";
import { hashString, parseUncleanFloat, parseUncleanInt } from "~/utils/util";
import { getApartmentTags } from "~/server/aiTagRetriever";

export const berlinovo: PropertyManagement = {
  slug: "berlinovo",
  name: "berlinovo",

  getFlats: async (browser: Browser) => {
    const url =
      "https://www.berlinovo.de/de/wohnungen/suche?w%5B0%5D=wohungen_region%3A6";
    const page = await browser.newPage();
    await page.goto(url);

    // no cookie banner

    const readPage = async () => {
      await page.waitForSelector(".view-suche-wohnungen");
      const els = await page.$$("article.node--type-apartment");

      return await Promise.all(
        els.map(async (el) => {
          const title = await el.$eval(
            ".title .field--name-title",
            (htmlTitle) => htmlTitle.textContent?.trim() ?? "",
          );
          const idSource = await el.$eval(
            ".title .field--name-title a",
            (link) => (link as HTMLAnchorElement).href,
          );
          const addressRaw = await el.$eval(
            ".address",
            (addressEl) => addressEl.textContent,
          );
          const rooms = await el.$eval(
            ".field--name-field-rooms .field__item",
            (roomEl) => roomEl.getAttribute("content") || "",
          );
          const warmRentPrice = await el.$eval(
            ".field--name-field-total-rent .field__item",
            (rentText) => rentText.getAttribute("content") || "",
          );
          const coldRentPrice = await el.$eval(
            ".field--name-field-bruttokaltmiete .field__item",
            (rentText) => rentText.getAttribute("content") || "",
          );

          const imageUrl = await el.$eval(
            ".block-field-blocknodeapartmentfield-image img",
            (imgEl) => imgEl.src || null,
          );

          if (!addressRaw) {
            return false;
          }
          const id = await hashString(idSource);
          const addressPretty = await getAddress(idSource, addressRaw);

          if (!addressPretty || !warmRentPrice || !title) {
            return false;
          }

          const tags = await getApartmentTags(id, title);

          const returnFlat = {
            address: addressPretty,
            title,
            id,
            roomCount: parseUncleanInt(rooms),
            coldRentPrice: parseUncleanFloat(coldRentPrice),
            warmRentPrice: parseUncleanInt(warmRentPrice),
            usableArea: 0, // nicht auf der Übersichtsseite verfügbar. wenn dann jede angebotsseite aufrufen...
            tags,
            url: idSource,
            imageUrl,
          } satisfies Flat;
          const result = flatSchema.safeParse(returnFlat);
          // console.log(result);
          if (result.success) {
            return result.data;
          }
          return false;
        }),
      );
    };

    const pagesData = await readPage();
    await page.close();
    return pagesData;
  },
};
