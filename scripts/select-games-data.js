/*global require module */
const {load, saveToJson} = require('./lib')
const {relevantSteamCategories} = require('./const')

const appIdToSteam = load('steam-games')
const appIdToVideo = load('appid-to-video')

function selectGameData({name, appId}) {
  const steamGame = appIdToSteam[appId]

  return {
    name,
    appId,
    video: appIdToVideo[appId]?.id,
    categories:
      steamGame?.categories
        .filter(({id}) => relevantSteamCategories.includes(id))
        .map(({id}) => id) ?? [],
    genres: steamGame?.genres?.map(({id}) => Number(id)) ?? []
  }
}

function isGame({appId}) {
  return appIdToSteam[appId]?.type === 'game'
}

function main() {
  const rawGames = load('top-games-steamdb')
  const selectedGames = rawGames.filter(isGame)
  const removedGames = rawGames.filter((game) => !isGame(game))

  console.log(
    'Removed',
    removedGames.map(({appId, name}) => `${name} (${appId})`)
  )

  const games = selectedGames.map(selectGameData)

  console.log('Website has', games.length, 'Games')
  saveToJson('games', games)
}

module.exports = main

if (require.main === module) {
  main()
}
