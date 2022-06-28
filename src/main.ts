import "dotenv/config";
import { Page } from "puppeteer";

import { BlackArt } from "./system/blackArt";
import { EntryPortal } from "./browser_automations/entryPortal";
import { Scraper } from "./browser_automations/webScraper";
import { Vocab } from "./constants/vocab";

async function runtime(page: Page) {
  console.log(Vocab.INITIALIZING_BROWSER_MSG);
  await EntryPortal.gotoContent(page);
  await Scraper.traverseAndScrap(page);
}

async function main() {
  const browser = await BlackArt.instantiateBrowser();
  const page = await BlackArt.getFirstTabRepresentation(browser);

  await runtime(page);
  browser.close();
  console.log(Vocab.WORK_DONE_MSG);
}

try {
  main();
} catch (error) {
  console.log(error);
}
