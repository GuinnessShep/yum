import { Page } from "puppeteer";
import { exit } from "process";

import Vocab from "../constants/vocab";
import InteractionsConstants from "../constants/interactionsConstants";
import SessionLogin from "./sessionLogin";
import StandardLogin from "./standardLogin";
import PromptLogin from "./promptLogin";

namespace LoginManager {
  function getCredentials() {
    const username = process.env.VONAYUTA_USERNAME as string;
    const password = process.env.VONAYUTA_PASSWORD as string;

    return [username, password] as const;
  }

  export async function throwIfUnsuccessfulLogin(page: Page) {
    const user_dashboard_page =
      InteractionsConstants.TARGETED_WEBSITE_USER_DASHBORD_PAGE;
    const selector = InteractionsConstants.LOGGED_IN_BANNER_CLASS;
    const timeout = InteractionsConstants.DEFAULT_TIMEOUT;

    await page.goto(user_dashboard_page, {
      waitUntil: ["networkidle2", "domcontentloaded"],
    });
    try {
      await page.waitForSelector(selector, { timeout });
    } catch {
      throw "Unsuccessful Login";
    }
  }

  export async function login(page: Page) {
    const [username, password] = getCredentials();
    const session_token = SessionLogin.getToken();
    const abort_if_failed_to_login =
      process.env.VONAYUTA_ABORT_SCRAPING_IF_FAILED_TO_LOGIN === "true";

    if (SessionLogin.isAvailable(session_token)) {
      console.log(Vocab.INITIALIZING_SESSION_LOGIN_MSG);
      await SessionLogin.run(session_token, page);
    }
    try {
      await throwIfUnsuccessfulLogin(page);
    } catch {
      console.log(Vocab.SKIPPED_SESSION_LOGIN_MSG);
      if (StandardLogin.isAvailable(username, password)) {
        console.log(Vocab.INITIALIZING_STANDARD_LOGIN_MSG);
        await StandardLogin.run(username, password, page);
      }
      try {
        await throwIfUnsuccessfulLogin(page);
      } catch {
        await PromptLogin.run(page);
      }
    }
    try {
      await throwIfUnsuccessfulLogin(page);
      console.log(Vocab.SUCCESSFUL_LOGIN_MSG);
    } catch {
      if (abort_if_failed_to_login) {
        console.log(Vocab.ABORTED_EVERYTHING_MSG);
        exit(1);
      }
      console.log(Vocab.ABORTED_LOGIN_MSG);
    }
  }
}

export default LoginManager;
