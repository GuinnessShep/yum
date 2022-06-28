import { Page } from "puppeteer";

import InteractionsConstants from "../constants/interactionsConstants";

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

  async function typeRequest(page: Page, request: string) {
    await page.keyboard.type(request);
    await page.keyboard.press(InteractionsConstants.CONFIRM_HOTKEY);
  }

  async function passWall(page: Page) {
    const pass_wall_btn_id = InteractionsConstants.PASS_WALL_BTN_ID;

    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.click(pass_wall_btn_id);
  }

  //===============
  // * ... Public
  //===============
  export async function gotoContent(page: Page) {
    const request = process.env.VONAYUTA_REQUEST as string;

    await gotoIndex(page);
    await typeRequest(page, request);
    await passWall(page);
  }
}

export default EntryPortal;
