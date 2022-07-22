export namespace Vocab {
  //===============
  // * ... Consts
  //===============
  export const TYPING_REQUEST_MSG: string =
    "[Initializing...]\t Typing request";

  export const DOWNLOADED_MSG: string = "[Downloaded!]\t\t Boop!";

  export const WORK_DONE_MSG: string =
    "\n[MISSION COMPLETE!]\t All your yiff are belong to us";

  export const INITIALIZING_BROWSER_MSG: string =
    "[Initializing...]\t Entering your favorite website";

  export const INITIALIZING_SESSION_LOGIN_MSG: string =
    "[Initializing...]\t Trying to login with your session token";
  export const SKIPPED_SESSION_LOGIN_MSG: string =
    "[Skipped! :<]\t\t Skipped session login method: invalid token";

  export const INITIALIZING_STANDARD_LOGIN_MSG: string =
    "[Initializing...]\t Trying to login with your credentials";
  export const TRYING_STANDARD_LOGIN_MSG: string =
    "[Initializing...]\t Entering login page";
  export const SKIPPED_STANDARD_LOGIN_MSG: string =
    "[Skipped! :<]\t\t Skipped login: invalid credentials";

  export const SUCCESSFUL_LOGIN_MSG: string =
    "[Initializing...]\t Successfully logged in";

  export const SKIPPED_LOGIN_MSG: string = "[Skipped! :<]\t\t Skipped login";
  export const ABORTED_LOGIN_MSG: string = "[Skipped! :<]\t\t Aborted login";
  export const ABORTED_EVERYTHING_MSG: string =
    "[Skipped! :<]\t\t Aborting everything";

  export const PROMPT_USERNAME_MSG: string = "Please, type your username: ";
  export const PROMPT_USERNAME_CONFIRM_MSG: string =
    "Please, confirm your username: ";
  export const PROMPT_PASSWORD_MSG: string = "Please, type your password: ";
  export const PROMPT_INVALID_USERNAME_CONFIRM_MSG: string =
    "Please, type your username and confirm it correctly.";

  //=============
  // * ... Funs
  //=============
  export function retrying_download_msg(retry_counter: number) {
    return `[Struggling...]\t\t Retrying to download... (Retry ${
      retry_counter + 1
    })`;
  }

  export function retrying_login_msg(retry_counter: number) {
    return `[Struggling...]\t\t Retrying to login... (Retry ${
      retry_counter + 1
    })`;
  }

  export function skipped_msg(content_url: string) {
    return `[Skipped! :<]\t\t ${content_url}`;
  }

  export function downloading_msg(url: string) {
    return `[Downloading...]\t ${url}`;
  }
}

export default Vocab;
