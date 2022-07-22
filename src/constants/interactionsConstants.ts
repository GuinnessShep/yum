import { KeyInput } from "puppeteer";

export namespace InteractionsConstants {
  export const TARGETED_WEBSITE: string = "https://e621.net/";
  export const TARGETED_WEBSITE_LOGIN_PAGE: string =
    "https://e621.net/session/new";
  export const TARGETED_WEBSITE_USER_DASHBORD_PAGE: string =
    "https://e621.net/users/home";

  export const NEXT_PAGE_BTN_ID: string = "#paginator-next";

  export const USERNAME_BTN_ID: string = "#name";
  export const PASSWORD_BTN_ID: string = "#password";

  export const LOGGED_IN_BANNER_CLASS: string = ".user-greeting-outer";

  export const DATA_ROOT_HTML_TAG: string = "article";
  export const DATA_URL_ATTRIBUTE: string = "data-file-url";

  export const NEXT_PAGE_HOTKEY: KeyInput = "ArrowRight";
  export const CONFIRM_HOTKEY: KeyInput = "Enter";

  export const DEFAULT_TIMEOUT: number = 750;
}

export default InteractionsConstants;
