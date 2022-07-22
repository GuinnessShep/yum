import { Page } from "puppeteer";

namespace SessionLogin {
  export function isAvailable(danbooru_session: string): Boolean {
    return danbooru_session.length > 0;
  }

  export function getToken() {
    return process.env.VONAYUTA_DANBOORU_SESSION as string;
  }

  export async function run(session: string, page: Page) {
    await page.setCookie({
      name: "_danbooru_session",
      value: session,
      domain: "e621.net",
    });
  }
}

export default SessionLogin;
