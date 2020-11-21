/* global module require */
const {differenceBy} = require('lodash')
const {getTopRatedGames, saveToJson, load} = require('./lib')

const collectionName = 'top-games-steamdb'

async function main() {
  console.log('Get top rated games from steamdb...')
  try {
    const games = await getTopRatedGames()
    const previousGames = load(collectionName)
    const addedGames = differenceBy(previousGames, games, 'appId')
    const removedGames = differenceBy(games, previousGames, 'appId')

    console.log('Added:', addedGames.map((game) => game.name).join(', '))
    console.log('Removed:', removedGames.map((game) => game.name).join(', '))

    console.log(`Retrieved list with ${games.length} games from steamdb\n`)
    saveToJson(collectionName, games)
  } catch (e) {
    console.log('Retrieval of top rated games from steamdb.info failed', e)
  }
}

module.exports = main

if (require.main === module) {
  main()
}
