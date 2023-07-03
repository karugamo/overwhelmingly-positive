import updateTopRated from "./steamdb";
import updateSteamGames from "./steam";
import updateYoutube from "./youtube";
import selectGamesData from "./select-games-data";

async function main() {
  console.log("💿 Get top rated games from steamdb..");
  await updateTopRated();
  console.log();

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
