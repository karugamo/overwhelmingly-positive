import { getTopRatedGames, saveToJson } from "./lib";

export default async function getGamesFromSteamDb() {
  try {
    const games = await getTopRatedGames();
    console.log(`Retrieved list with ${games.length} games from steamdb\n`);
    saveToJson("top-games-steamdb", games);
  } catch (e) {
    console.log("❌ Retrieval of top rated games from steamdb.info failed", e.message);
  }
}
