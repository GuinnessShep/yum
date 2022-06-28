import "dotenv/config";

import fs from "fs";
import https from "https";
import http from "http";

import { Page } from "puppeteer";

import { Rescue } from "../constants/rescue";
import { Vocab } from "../constants/vocab";

export namespace Downloader {
  //================
  // * ... Private
  //================
  async function download(url: string, filepath: string) {
    const protocol = !url.charAt(4).localeCompare("s") ? https : http;

    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filepath);
      let fileinfo: any = null;

      const request = protocol.get(url, (response) => {
        if (response.statusCode !== 200) {
          fs.unlink(filepath, () => {
            reject(
              new Error(`Failed to get '${url}' (${response.statusCode})`)
            );
          });
          return;
        }

        fileinfo = {
          mime: response.headers["content-type"],
          size: parseInt(response.headers["content-length"] as string, 10),
        };

        response.pipe(stream);
      });

      stream.on("finish", () => {
        resolve(fileinfo);
      });

      request.on("error", (err) => {
        fs.unlink(filepath, () => reject(err));
      });

      stream.on("error", (err) => {
        fs.unlink(filepath, () => reject(err));
      });

      request.end();
    });
  }

  async function failedDlDelay(page: Page, retry_counter: number) {
    const delay =
      parseInt(process.env.VONAYUTA_DOWNLOAD_RETRY_SLEEP_MS as string) ||
      Rescue.DEFAULT_RETRY_DELAY;

    console.log(Vocab.retrying_msg(retry_counter));
    if (delay <= 0) return;
    await page.waitForTimeout(delay);
  }

  async function doDlContent(content_url: string, page: Page) {
    let retry_counter = 0;
    const max_retry =
      parseInt(process.env.VONAYUTA_MAX_DOWNLOAD_RETRY as string) ||
      Rescue.DEFAULT_MAX_RETRY;

    const folder = process.env.VONAYUTA_DOWNLOAD_FOLDER as string;
    const segments = new URL(content_url).pathname.split("/");
    const filename = segments.pop() || segments.pop();
    const filepath = `${folder}/${filename}`;

    while (true) {
      try {
        await download(content_url, filepath);
        console.log(Vocab.DOWNLOADED_MSG);
        break;
      } catch (error) {
        if (max_retry <= 0) {
          console.log(Vocab.skipped_msg(content_url));
          break;
        }
        console.log(error);
        await failedDlDelay(page, retry_counter);
        if (retry_counter + 1 >= max_retry) {
          console.log(Vocab.skipped_msg(content_url));
          break;
        }
        retry_counter += 1;
      }
    }
  }

  //===============
  // * ... Public
  //===============
  export async function dlContent(content: Array<string>, page: Page) {
    for (const url of content) {
      console.log(Vocab.downloading_msg(url));
      await doDlContent(url, page);
    }
  }
}
