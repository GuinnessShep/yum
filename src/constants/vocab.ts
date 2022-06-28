export namespace Vocab {
  //===============
  // * ... Consts
  //===============
  export const DOWNLOADED_MSG: string = "[Downloaded!]\t\t Boop!";

  export const WORK_DONE_MSG: string =
    "\n[MISSION COMPLETE!]\t All your yiff are belong to us";

  export const INITIALIZING_BROWSER_MSG: string =
    "[Initializing...]\t Entering your favorite website";

  //=============
  // * ... Funs
  //=============
  export function retrying_msg(retry_counter: number) {
    return `[Struggling...]\t\t Retrying to download... (Retry ${
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
