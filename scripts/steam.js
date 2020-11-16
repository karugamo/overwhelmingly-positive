/* global require  module */
const delay = require('delay')
const {steam, load, saveToJson} = require('./lib')

async function main() {
  const appIdToSteamDetails = load('steam-games')
  const topGames = load('top-games-steamdb')

  for (const [index, game] of topGames.entries()) {
    const {appId} = game

    if (appIdToSteamDetails[appId]) continue

    let response
    try {
      response = await steam(`appdetails?appids=${appId}`)
    } catch (e) {
      console.error('Steam app details retrieval failed')
      console.error(e)
    }
    await delay(400)

    const app = response.body[`${appId}`]

    const gameData = app?.data

    if (app?.success) {
      console.log(
        `${index + 1}/${topGames.length} from steam: ${
          gameData.name
        } (${appId})`
      )
      appIdToSteamDetails[appId] = gameData
      saveToJson('steam-games', appIdToSteamDetails)
    } else {
      console.log('Failed', appId, game.name)
    }
  }
}

module.exports = main

if (require.main === module) {
  main()
}
