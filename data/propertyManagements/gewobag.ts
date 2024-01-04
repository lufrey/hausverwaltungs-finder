import type { Browser } from "puppeteer";
import {
  flatSchema,
  type Flat,
  type PropertyManagement,
} from "../propertyManagementList";
import { getAddress } from "../address";
import type { Tags } from "../tags";
import { hashString, parseUncleanFloat, parseUncleanInt } from "~/utils/util";
import { typedObjectKeys } from "~/utils/typeHelper";
/*
export const gewobag: PropertyManagement = {
  slug: "gewobag",
  name: "Gewobag",
  getFlats: async (browser: Browser) => {
    const url =
      "https://www.gewobag.de/fuer-mieter-und-mietinteressenten/mietangebote/?bezirke_all=1&objekttyp%5B%5D=wohnung&gesamtmiete_von=&gesamtmiete_bis=&gesamtflaeche_von=&gesamtflaeche_bis=&zimmer_von=&zimmer_bis=&sort-by=recent";
    const page = await browser.newPage();
    await page.goto(url);

    const readPage = async () => {
      await page.waitForSelector(".angebot-content");
      const els = await page.$$("article.angebot-big-layout");

      return await Promise.all(
        els.map(async (el) => {
          const title = await el.$eval(
            ".angebot-title",
            (htmlTitle) => htmlTitle.textContent?.trim() ?? "",
          );
          const idSource = await el.$eval(
            ".read-more-link",
            (link) => (link as HTMLAnchorElement).href,
          );
          const address = await el.$eval(
            "address",
            (addressEl) => addressEl.textContent,
          );
          const availSpaceText = await el.$eval(
            ".angebot-area td",
            (spaceEl) => spaceEl.textContent,
          ); // <td> 1 Zimmer | 47,99 m² </td>
          const availSpace = availSpaceText ? availSpaceText.split("|") : [];
          const rooms = availSpace[0]?.trim() ?? "";
          const usableArea = availSpace[1]?.trim() ?? "";
          const warmRentPriceText = await el.$eval(
            ".angebot-kosten td",
            (rentText) => rentText.textContent,
          ); // ab 841,75€
          const warmRentPrice = warmRentPriceText
            ? warmRentPriceText.substring(3)
            : "";
          if (!address || !warmRentPrice || !title) {
            return false;
          }

          const tags: Tags = [];

          const titleToTagsMap = {
            altbau: ["altbau"],
            neubau: ["neubau"],
            wbs: ["wbs"],
            garage: ["garage"],
            stellplatz: ["stellplatz"],
            parkplatz: ["parkplatz"],
          } as const;

          const titleToTagsKeys = typedObjectKeys(titleToTagsMap);
          titleToTagsKeys.forEach((key) => {
            if (title.toLowerCase().includes(key)) {
              tags.push(...titleToTagsMap[key]);
            }
          });

          const returnFlat = {
            address,
            title,
            id,
            roomCount: parseUncleanInt(rooms),
            coldRentPrice,
            warmRentPrice: parseUncleanInt(warmRentPrice),
            usableArea: parseUncleanFloat(usableArea),
            tags,
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
    };

    const pagesData = await readPage();

    return pagesData;
  },
};
*/
