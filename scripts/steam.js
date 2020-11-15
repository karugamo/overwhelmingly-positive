/* global require  module */
const delay = require('delay')
const {steam, load, saveToJson} = require('./lib')

const steamGames = load('steam-games')

async function main() {
  const games = load('top-games-steamdb')

  for (const [index, game] of games.entries()) {
    const {appId} = game

    if (steamGames[appId]) continue

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
        `${index + 1}/${games.length} from steam: ${gameData.name} (${appId})`
      )
      steamGames[appId] = gameData
      saveToJson('steam-games', steamGames)
    } else {
      console.log('Failed', appId, game.name)
    }
  }
}

module.exports = main

if (require.main === module) {
  main()
}
