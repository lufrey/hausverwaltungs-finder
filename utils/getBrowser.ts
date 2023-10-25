import puppeteer from "puppeteer";

export const getBrowser = async () => {
    try {
        return await puppeteer.connect({
            browserURL: "http://localhost:9222",
        });
    } catch (error) {
        console.log("No running browser found. Launching a new one...");
        return await puppeteer.launch({
            headless: "new",
            args: ["--remote-debugging-port=9222"],
        });
    }
};
