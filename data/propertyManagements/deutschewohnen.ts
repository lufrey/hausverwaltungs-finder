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

export const deutschewohnen: PropertyManagement = {
  slug: "deutschewohnen",
  name: "Deutsche Wohnen SE",
  getFlats: async (browser: Browser) => {
    const url =
      "https://www.deutsche-wohnen.com/immobilienangebote#page=1&commercializationType=rent&utilizationType=flat,retirement&location=Berlin&city=Berlin";
    const page = await browser.newPage();
    await page.goto(url);

    try {
      await page
        .waitForSelector(
          "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection",
          {
            timeout: 4000, // dauert manchmal ewig auf dieser Seite...
          },
        )
        .then(() =>
          page.click(
            "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection",
          ),
        );
    } catch (e) {
      console.log("no cookie banner");
    }

    const readPage = async () => {
      const apartments = await page.$$(".object-list__item");

      return await Promise.all(
        apartments.map(async (apartment) => {
          const title = await apartment.$eval(
            "h2",
            (titleElement) => titleElement.textContent?.trim() ?? "",
          );

          const idSource = await apartment.$eval(
            "a.object-list__content-container",
            (link) => (link as HTMLAnchorElement).href,
          );

          const addressRaw = await apartment.$eval(
            ".object-list__address p",
            (addressEl) => addressEl.textContent,
          );

          const areaRaw = await apartment.$eval(
            ".object-list__detail-item span:has(sup)",
            (space) => space.textContent, // '55,5 m2|'
          );

          const usableArea = areaRaw ? areaRaw.split(" ")[0] : "";
          const roomsRaw = await apartment.$eval(
            ".object-list__detail-item span:has(span+span)",
            (roomCount) => roomCount.textContent, // '2\n Zimmer|'
          );

          const rooms = roomsRaw ? roomsRaw.split("\n")[0] : "";
          const coldRentPrice = await apartment.$eval(
            ".object-list__price-total",
            (rent) => rent.textContent,
          );

          let imageUrl = "";
          try {
            imageUrl = await apartment.$eval(
              ".slick-active .image-slider__image-container picture img",
              (img) => {
                const imgsrc = img.getAttribute("data-src");
                return imgsrc || "";
              },
            );
          } catch (e) {
            console.log("Image not found");
          }

          if (!addressRaw) {
            return false;
          }
          const id = await hashString(idSource);
          const addressPretty = await getAddress(idSource, addressRaw);

          if (!addressPretty || !coldRentPrice || !title) {
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
            address: addressPretty,
            title,
            id,
            roomCount: parseUncleanInt(rooms),
            coldRentPrice: parseUncleanInt(coldRentPrice),
            warmRentPrice: null,
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

    const paginationSelector =
      "a.pagination__entry--control:has(.pagination__icon--next)";
    let paginationNextButton = await page.$(paginationSelector);

    while (paginationNextButton) {
      await paginationNextButton.click();
      await page.waitForNetworkIdle();
      const newPageData = await readPage();
      pagesData.push(...newPageData);
      paginationNextButton = await page.$(paginationSelector);
    }

    await page.close();
    return pagesData;
  },
};
