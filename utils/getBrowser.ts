import puppeteer from "puppeteer";

export const getBrowser = async () => {
  const { BROWSERLESS_URL, BROWSERLESS_TOKEN } = process.env;

  // if specified, use browserless
  if (BROWSERLESS_URL && BROWSERLESS_TOKEN) {
    return await puppeteer.connect({
      browserWSEndpoint: `wss://${BROWSERLESS_URL}?token=${BROWSERLESS_TOKEN}`,
    });
  }
  // else use local
  try {
    return await puppeteer.connect({
      browserURL: "http://localhost:9222",
    });
  } catch (error) {
    console.log("No running browser found. Launching a new one...");
    return await puppeteer.launch({
      headless: process.env.NODE_ENV === "development" ? false : "new",
      args: ["--remote-debugging-port=9222"],
    });
  }
};
