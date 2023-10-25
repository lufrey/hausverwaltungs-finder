import { type Browser } from "puppeteer";

export async function getReanovoFlats() {
  const url = "https://reanovo.everreal.co/api/prism/public/expose?take=20";
  const data = await fetch(url).then((r) => r.json());
  return data;
}

export async function getStadtUndLandFlats(browser: Browser) {
  const url = "https://www.stadtundland.de/immobiliensuche.php";
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector("#button-submit-gen-2");
  await page.click("#button-submit-gen-2");
  page.waitForSelector(".SP-TeaserList__item");
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
}
