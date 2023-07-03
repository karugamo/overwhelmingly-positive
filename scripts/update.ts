import updateTopRated from "./steamdb";
import updateSteamGames from "./steam";
import updateYoutube from "./youtube";
import selectGamesData from "./select-games-data";
import { load } from "./lib";

async function main() {
  console.log("💿 Get top rated games from steamdb..");
  await updateTopRated();
  console.log();

  const rawGames = load("top-games-steamdb");
  if (rawGames.length === 0) {
    throw new Error(`No games were found`);
  }

  console.log("🚂 Get steam games details..");
  await updateSteamGames();
  console.log();

  console.log("📺 Get youtube videos..");
  await updateYoutube();
  console.log();

  console.log("🎮 Select games data for website..");
  selectGamesData();
}

main();
