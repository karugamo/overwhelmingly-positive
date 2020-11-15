/* global require __dirname module */
const fs = require('fs')
const delay = require('delay')
const {resolve} = require('path')
const {steam, getTopRatedGames} = require('./lib')

async function main() {
  let games = []

  console.log('Get top rated games from steamdb...')
  try {
    games = await getTopRatedGames()
  } catch (e) {
    console.log('Retrieval of top rated games from steamdb.info failed', e)
  }

  const gamesWithDetails = []

  console.log(`Retrieved list with ${games.length} games from steamdb\n`)

  for (const [index, game] of games.entries()) {
    await delay(300)
    const {appId} = game

    let response
    try {
      response = await steam(`appdetails?appids=${appId}`)
    } catch (e) {
      console.error('Steam app details retrieval failed')
      console.error(e)
    }

    const app = response.body[`${appId}`]

    const gameData = app?.data

    if (app?.success) {
      console.log(
        `${index + 1}/${games.length} from steam: ${gameData.name} (${appId})`
      )
      gamesWithDetails.push({
        ...gameData,
        ...game
      })
    } else {
      console.log('Failed', appId, game.name)
    }
  }

  games = gamesWithDetails

  const json = JSON.stringify(games, null, ' ')
  fs.writeFileSync(resolve(__dirname, '../data/raw-games.json'), json)
}

module.exports = main

if (require.main === module) {
  main()
}
