import { Page } from "puppeteer";

import Vocab from "../constants/vocab";
import StandardLogin from "./standardLogin";
import LoginManager from "./loginManager";

namespace PromptLogin {
  export async function run(page: Page) {
    const username = "todo";
    const username_confirm = "todo";
    const password = "todo";

    while (true) {
      console.log(Vocab.PROMPT_USERNAME_MSG);
      console.log(Vocab.PROMPT_USERNAME_CONFIRM_MSG);

      if (username === username_confirm) break;
      console.log(Vocab.PROMPT_INVALID_USERNAME_CONFIRM_MSG);
    }

    console.log(Vocab.PROMPT_PASSWORD_MSG);
    await StandardLogin.run(username, password, page);
    try {
      await LoginManager.throwIfUnsuccessfulLogin(page);
    } catch {
      console.log("ToDo");
    }
  }
}

export default PromptLogin;
