import { Page } from "puppeteer";

import Vocab from "../constants/vocab";
import InteractionsConstants from "../constants/interactionsConstants";
import Rescue from "../constants/rescue";
import EntryPortal from "./entryPortal";
import { exit } from "process";

namespace AccountManager {
  function skipLogin(username: string, password: string): Boolean {
    return username.length <= 0 || password.length <= 0;
  }

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function getCredentials() {
    // * ... {ToDo} login with a prompt
    const username: string = process.env.VONAYUTA_USERNAME as string;
    const password: string = process.env.VONAYUTA_PASSWORD as string;

    return [username, password] as const;
  }

  async function gotoLoginPage(page: Page) {
    const login_page = InteractionsConstants.TARGETED_WEBSITE_LOGIN_PAGE;

    await page.goto(login_page, {
      waitUntil: "networkidle2",
    });
  }

  async function doTypeCredentials(
    username: string,
    password: string,
    page: Page
  ) {
    const username_btn_id = InteractionsConstants.USERNAME_BTN_ID;
    const password_btn_id = InteractionsConstants.PASSWORD_BTN_ID;
    const delay = randomInt(1450, 1850);

    await page.click(username_btn_id);
    await page.keyboard.type(username);

    await page.waitForTimeout(delay);

    await page.click(password_btn_id);
    await page.keyboard.type(password);

    await page.keyboard.press(InteractionsConstants.CONFIRM_HOTKEY);
    await page.waitForNavigation({ waitUntil: "networkidle2" });
  }

  async function typeCredentials(
    username: string,
    password: string,
    page: Page
  ) {
    const login_page = InteractionsConstants.TARGETED_WEBSITE_LOGIN_PAGE;
    const abort_if_failed_login =
      process.env.VONAYUTA_ABORT_SCRAPING_IF_FAILED_TO_LOGIN === "true";
    const max_retry =
      parseInt(process.env.VONAYUTA_MAX_LOGIN_RETRY as string, 10) ||
      Rescue.DEFAULT_MAX_LOGIN_RETRY;
    let retry_counter = 0;

    while (true) {
      await doTypeCredentials(username, password, page);

      if (page.url() !== login_page) {
        console.log(Vocab.SUCCESSFUL_LOGIN_MSG);
        break;
      }

      console.log(Vocab.retrying_login_msg(retry_counter));
      if (max_retry <= 0 || retry_counter + 1 >= max_retry) {
        console.log(Vocab.ABORTED_LOGIN_MSG);
        if (abort_if_failed_login) {
          console.log(Vocab.ABORTED_EVERYTHING_MSG);
          exit(1);
        }
        break;
      }
      retry_counter += 1;
    }
  }

  async function processLogin(page: Page) {
    console.log(Vocab.INITIALIZING_LOGIN_MSG);
    const [username, password] = await getCredentials();

    await gotoLoginPage(page);
    await EntryPortal.passWall(page, false);
    if (skipLogin(username, password)) {
      console.log(Vocab.SKIPPED_LOGIN_MSG);
      return;
    }
    await typeCredentials(username, password, page);
  }

  export async function login(page: Page) {
    await processLogin(page);
  }
}

export default AccountManager;
