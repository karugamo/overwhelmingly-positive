import { load, saveToJson } from "./lib";
import { relevantSteamCategories } from "./const";

const appIdToSteam = load("steam-games");
const appIdToVideo = load("appid-to-video");

function selectGameData({ name, appId }) {
  const steamGame = appIdToSteam[appId];

  return {
    name,
    appId,
    video: appIdToVideo[appId]?.id,
    categories:
      steamGame?.categories
        // @ts-ignore
        .filter(({ id }) => relevantSteamCategories.includes(id))
        .map(({ id }) => id) ?? [],
    genres: steamGame?.genres?.map(({ id }) => Number(id)) ?? [],
  };
}

function isGame({ appId }) {
  return appIdToSteam[appId]?.type === "game";
}

export default function selectGamesData() {
  const rawGames = load("top-games-steamdb");
  const selectedGames = rawGames.filter(isGame);
  const removedGames = rawGames.filter((game) => !isGame(game));

  console.log(
    "Excluded because they are not Games:",
    removedGames.map(({ appId, name }) => `${name} (${appId}, ${appIdToSteam[appId]?.type})`)
  );

  const games = selectedGames.map(selectGameData);

  console.log("Website has", games.length, "Games");
  saveToJson("games", games);
}
