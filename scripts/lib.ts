import * as fs from "fs";
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
