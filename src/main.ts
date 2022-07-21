import "dotenv/config";
import { Page } from "puppeteer";

import BlackArt from "./system/blackArt";
import EntryPortal from "./browser_automations/entryPortal";
import Scraper from "./browser_automations/webScraper";
import Vocab from "./constants/vocab";
import AccountManager from "./browser_automations/accountManager";

async function runtime(page: Page) {
  let already_passed_wall = false;
  console.log(Vocab.INITIALIZING_BROWSER_MSG);

  if (process.env.VONAYUTA_LOGIN === "true") {
    await AccountManager.login(page);
    already_passed_wall = true;
  }
  await EntryPortal.gotoContent(already_passed_wall, page);
  await Scraper.traverseAndScrap(page);
}

async function main() {
  const browser = await BlackArt.instantiateBrowser();
  const page = await BlackArt.getFirstTabRepresentation(browser);

  await runtime(page);
  browser.close();
  console.log(Vocab.WORK_DONE_MSG);
}

main();
