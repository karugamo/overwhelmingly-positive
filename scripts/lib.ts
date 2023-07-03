import * as fs from "fs";
import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";
import { resolve } from "path";
import { relevantSteamCategories } from "./const";

export function saveToJson(name, data) {
  const json = JSON.stringify(data, null, " ");
  fs.writeFileSync(resolve(__dirname, `../data/${name}.json`), json);
}

export function load(name: string) {
  return require(`../data/${name}.json`);
}

export async function getTopRatedGames() {
  const { data } = await axios.get("https://steamdb.info/stats/gameratings/", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "de,en;q=0.9,en-US;q=0.8,fi;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
      "upgrade-insecure-requests": "1",
      cookie:
        "cf_chl_1=8dbda24d1ec0c7f; cf_chl_prog=x17; cf_clearance=a7f6da8d42ae094efe20455c9e46a2009ff1e58c-1604418389-0-1zb0e9d870zb300278z58bd938f-150; __cfduid=df45473ecd0a4e1241d2fc3cc846bda401604418389; __Host-cc=us",
    },
  });

  const $ = cheerio.load(data);

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

  return games;
}

function parseNumber(text) {
  return Number(text.replace(",", ""));
}

export function getCategoryIdMap(games) {
  return _.mapValues(
    _.keyBy(
      // @ts-ignore
      _.flatten(games.map(({ categories }) => categories)).filter(({ id }) =>
        relevantSteamCategories.includes(id)
      ),
      "id"
    ),
    "description"
  );
}

export function getGenreIdMap(games) {
  return _.mapValues(
    _.keyBy(
      _.flatten(games.map(({ genres }) => genres)).filter((a) => a),
      "id"
    ),
    "description"
  );
}

export function createEnum(nameById, enumName) {
  const camelCased = _.mapValues(nameById, (key) =>
    _.upperFirst(_.camelCase(key))
  );

  return `
  enum ${enumName} {
${Object.entries(camelCased)
  .map(([id, name]) => `    ${name} = ${id},`)
  .join("\n")} 
  }
  `;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}