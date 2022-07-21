import { KeyInput } from "puppeteer";

export namespace InteractionsConstants {
  export const TARGETED_WEBSITE: string = "https://e621.net/";
  export const TARGETED_WEBSITE_LOGIN_PAGE: string =
    "https://e621.net/session/new";
  export const PASS_WALL_BTN_ID: string = "#guest-warning-accept";
  export const DATA_URL_ATTRIBUTE: string = "data-file-url";
  export const DATA_ROOT_HTML_TAG: string = "article";
  export const NEXT_PAGE_BTN_ID: string = "#paginator-next";
  export const NEXT_PAGE_HOTKEY: KeyInput = "ArrowRight";
  export const CONFIRM_HOTKEY: KeyInput = "Enter";

  export const USERNAME_BTN_ID: string = "#name";
  export const PASSWORD_BTN_ID: string = "#password";

  export const DEFAULT_WAIT: number = 5000;
}

export default InteractionsConstants;
