import { Page } from "puppeteer";

import InteractionsConstants from "../constants/interactionsConstants";
import Vocab from "../constants/vocab";

export namespace EntryPortal {
  //================
  // * ... Private
  //================
  async function gotoIndex(page: Page) {
    const targeted_website = InteractionsConstants.TARGETED_WEBSITE;

    await page.goto(targeted_website, {
      waitUntil: ["networkidle2", "domcontentloaded"],
    });
  }

  async function typeRequest(request: string, page: Page) {
    console.log(Vocab.TYPING_REQUEST_MSG);
    await page.keyboard.type(request);
    await page.keyboard.press(InteractionsConstants.CONFIRM_HOTKEY);
    await page.waitForNavigation({
      waitUntil: ["networkidle2", "domcontentloaded"],
    });
  }

  export async function bypassWall(page: Page) {
    await page.setCookie({
      name: "gw",
      value: "seen",
      domain: "e621.net",
    });
  }

  //===============
  // * ... Public
  //===============
  export async function gotoContent(page: Page) {
    const request = process.env.VONAYUTA_REQUEST as string;

    await gotoIndex(page);
    await typeRequest(request, page);
  }
}

export default EntryPortal;
