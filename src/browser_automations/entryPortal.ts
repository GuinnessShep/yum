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
      waitUntil: "networkidle2",
    });
  }

  async function typeRequest(request: string, page: Page) {
    console.log(Vocab.TYPING_REQUEST_MSG);
    await page.keyboard.type(request);
    await page.keyboard.press(InteractionsConstants.CONFIRM_HOTKEY);
    await page.waitForTimeout(InteractionsConstants.DEFAULT_WAIT);
  }

  export async function passWall(page: Page, wait: Boolean = true) {
    const pass_wall_btn_id = InteractionsConstants.PASS_WALL_BTN_ID;

    if (wait) await page.waitForTimeout(InteractionsConstants.DEFAULT_WAIT);
    await page.click(pass_wall_btn_id);
  }

  //===============
  // * ... Public
  //===============
  export async function gotoContent(passed_wall: Boolean, page: Page) {
    const request = process.env.VONAYUTA_REQUEST as string;

    await gotoIndex(page);
    await typeRequest(request, page);
    if (!passed_wall) await passWall(page);
  }
}

export default EntryPortal;
