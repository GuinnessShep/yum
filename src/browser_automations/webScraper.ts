import { Page } from "puppeteer";

import { Downloader } from "../system/downloader";
import { InteractionsConstants } from "../constants/interactionsConstants";

export namespace Scraper {
  //================
  // * ... Private
  //================
  async function retrieveContent(page: Page) {
    const selector = InteractionsConstants.DATA_ROOT_HTML_TAG;
    const attr = InteractionsConstants.DATA_URL_ATTRIBUTE;

    const content = await page.$$eval(
      selector,
      (elements, attribute) => elements.map((el) => el.getAttribute(attribute)),
      attr
    );
    return content as Array<string>;
  }

  async function downloadPageContent(page: Page) {
    const content = await retrieveContent(page);
    await Downloader.dlContent(content, page);
  }

  //===============
  // * ... Public
  //===============
  export async function traverseAndScrap(page: Page) {
    const next_page_btn_id = InteractionsConstants.NEXT_PAGE_BTN_ID;
    const next_page_hotkey = InteractionsConstants.NEXT_PAGE_HOTKEY;
    let next_page_exists = await page.$(next_page_btn_id);

    while (next_page_exists) {
      await downloadPageContent(page);
      await page.keyboard.press(next_page_hotkey);
      await page.waitForNavigation({ waitUntil: "networkidle2" });
      next_page_exists = await page.$(next_page_btn_id);
    }
    await downloadPageContent(page);
  }
}
