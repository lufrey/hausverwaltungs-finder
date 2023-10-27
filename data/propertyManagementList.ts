import type { Browser } from "puppeteer";
import { z } from "zod";

const flatSchema = z.object({
  title: z.string(),
  price: z.number(),
  roomNumber: z.number(),
  usableArea: z.string(),
  objectNumber: z.string(),
  objectType: z.string(),
  address: z.string(),
  rentExcludingVAT: z.string(),
  rentIncludingVAT: z.string(),
});

type Flat = z.infer<typeof flatSchema>;

type PropertyManagement = {
  id: string;
  name: string;
  getFlats: (browser: Browser) => Promise<Flat[]>;
  website?: string;
};

export const propertyManagementList: PropertyManagement[] = [
  {
    id: "stadtundland",
    name: "Stadt und Land",
    // @ts-ignore
    getFlats: async (browser: Browser) => {
      const url = "https://www.stadtundland.de/immobiliensuche.php";
      const page = await browser.newPage();
      await page.goto(url);

      await page.waitForSelector("#button-submit-gen-2");
      await page.click("#button-submit-gen-2");

      await page.waitForSelector(".SP-TeaserList__item");
      const els = await page.$$(".SP-TeaserList__item");
      const data = await Promise.all(
        els.map(async (el) => ({
          objectNumber: await el.$eval("tr:nth-child(1) td", (el) =>
            el.textContent?.trim()
          ),
          objectType: await el.$eval("tr:nth-child(2) td", (el) =>
            el.textContent?.trim()
          ),
          address: await el.$eval("tr:nth-child(3) td", (el) =>
            el.textContent?.trim()
          ),
          usableArea: await el.$eval("tr:nth-child(4) td", (el) =>
            el.textContent?.trim()
          ),
          rentExcludingVAT: await el.$eval("tr:nth-child(5) td", (el) =>
            el.textContent?.trim()
          ),
          rentIncludingVAT: await el.$eval("tr:nth-child(6) td", (el) =>
            el.textContent?.trim()
          ),
        }))
      );
      await page.close();
      return data;
    },
  },
  {
    id: "reanovo",
    name: "Reanovo",
    // @ts-ignore
    getFlats: async () => {
      const url = "https://reanovo.everreal.co/api/prism/public/expose?take=20";
      const data = await fetch(url).then((r) => r.json());
      return data;
    },
  },
];
