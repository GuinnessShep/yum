import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser } from "puppeteer";

export namespace BlackArt {
  export async function instantiateBrowser() {
    const headless_state = process.env.VONAYUTA_HEADLESS_STATE === "true";

    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: headless_state,
    });

    return browser;
  }

  export async function getFirstTabRepresentation(browser: Browser) {
    const pages = await browser.pages();
    const page = pages[0];
    const skip_css = process.env.VONAYUTA_SKIP_CSS === "true";
    const skipped_requests = skip_css
      ? ["image", "stylesheet", "font"]
      : ["image", "font"];

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (skipped_requests.indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    });

    return page;
  }
}

export default BlackArt;