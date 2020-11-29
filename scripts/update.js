/* global require */

const updateTopRated = require('./steamdb')
const updateSteamGames = require('./steam')
const updateYoutube = require('./youtube')
const selectGamesData = require('./select-games-data')

async function main() {
  await updateTopRated()
  await updateSteamGames()
  await updateYoutube()

  await selectGamesData()
}

main()
