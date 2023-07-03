import { saveToJson } from "./lib";
import cheerio from "cheerio";
import { chromium } from "playwright";

export default async function getGamesFromSteamDb() {
  try {
    const games = await getTopRatedGames();
    console.log(`Retrieved list with ${games.length} games from steamdb\n`);
    saveToJson("top-games-steamdb", games);
  } catch (e) {
    console.log(
      "❌ Retrieval of top rated games from steamdb.info failed",
      e.message
    );
  }
}

async function getTopRatedGames() {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("https://steamdb.info/stats/gameratings/");
  const html = await page.content();

  const $ = cheerio.load(html);

  let games = [];

  $(".app").each((index, element) => {
    const positive = parseNumber(
      ($(element).find("td")[3].children[0] as any).data
    );
    const negative = parseNumber(
      ($(element).find("td")[4].children[0] as any).data
    );
    const name = ($(element).find("td")[2].children[0] as any).children[0].data;
    const appId = $(element).attr("data-appid");

    games.push({
      appId,
      name,
      positive,
      negative,
    });
  });

  await browser.close();

  return games;
}

function parseNumber(text: string) {
  return Number(text.replace(",", ""));
}
