import { delay, load, saveToJson } from "./lib";
import got from "got";


const steam = got.extend({
  prefixUrl: "https://store.steampowered.com/api/",
  retry: {
    limit: 5,
    calculateDelay: ({ attemptCount }) => {
      const oneMinute = 1000 * 60;
      return oneMinute * attemptCount + Math.random() * 100;
    },
  },
  hooks: {
    beforeRetry: [
      (options, error, retryCount) => {
        console.log("Retry request", retryCount);
      },
    ],
  },
  responseType: "json",
});

export default async function getInfoFromSteam() {
  const appIdToSteamDetails = load("steam-games");
  const topGames = load("top-games-steamdb");

  for (const [index, game] of topGames.entries()) {
    const { appId } = game;

    if (appIdToSteamDetails[appId]) continue;

    let response;
    try {
      response = await steam(`appdetails?appids=${appId}`);
    } catch (e) {
      console.error("Steam app details retrieval failed");
      console.error(e);
    }
    await delay(400);

    const app = response.body[`${appId}`];

    const gameData = app?.data;

    if (app?.success) {
      console.log(
        `${index + 1}/${topGames.length} from steam: ${
          gameData.name
        } (${appId})`
      );
      appIdToSteamDetails[appId] = gameData;
      saveToJson("steam-games", appIdToSteamDetails);
    } else {
      console.log("Failed", appId, game.name);
    }
  }
}
