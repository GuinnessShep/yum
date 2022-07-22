import { Page } from "puppeteer";

import InteractionsConstants from "../constants/interactionsConstants";
import Vocab from "../constants/vocab";
import EntryPortal from "../browser_automations/entryPortal";
import Rescue from "../constants/rescue";

namespace StandardLogin {
  //================
  // * ... Private
  //================
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function gotoLoginPage(page: Page) {
    const login_page = InteractionsConstants.TARGETED_WEBSITE_LOGIN_PAGE;

    await page.goto(login_page, {
      waitUntil: ["networkidle2", "domcontentloaded"],
    });
  }

  async function doTypeCredentials(
    username: string,
    password: string,
    page: Page
  ) {
    const username_btn_id = InteractionsConstants.USERNAME_BTN_ID;
    const password_btn_id = InteractionsConstants.PASSWORD_BTN_ID;
    const t = InteractionsConstants.DEFAULT_TIMEOUT;
    const delay = randomInt(t * 2, t * 2.5);

    await page.click(username_btn_id);
    await page.keyboard.type(username);

    await page.waitForTimeout(delay);

    await page.click(password_btn_id);
    await page.keyboard.type(password);

    await page.keyboard.press(InteractionsConstants.CONFIRM_HOTKEY);
    await page.waitForNavigation({
      waitUntil: ["networkidle2", "domcontentloaded"],
    });
  }

  async function typeCredentials(
    username: string,
    password: string,
    page: Page
  ) {
    const login_page = InteractionsConstants.TARGETED_WEBSITE_LOGIN_PAGE;
    const max_retry =
      parseInt(process.env.VONAYUTA_MAX_LOGIN_RETRY as string, 10) ||
      Rescue.DEFAULT_MAX_LOGIN_RETRY;
    let retry_counter = 0;

    while (true) {
      await doTypeCredentials(username, password, page);

      if (page.url() !== login_page) break;

      console.log(Vocab.retrying_login_msg(retry_counter));
      if (max_retry <= 0 || retry_counter + 1 >= max_retry) {
        console.log(Vocab.SKIPPED_STANDARD_LOGIN_MSG);
        break;
      }
      retry_counter += 1;
    }
  }

  //===============
  // * ... Public
  //===============
  export function isAvailable(username: string, password: string): Boolean {
    return username.length > 0 && password.length > 0;
  }

  export async function run(username: string, password: string, page: Page) {
    console.log(Vocab.TRYING_STANDARD_LOGIN_MSG);
    await gotoLoginPage(page);
    await typeCredentials(username, password, page);
  }
}

export default StandardLogin;
