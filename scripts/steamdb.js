/* global module require */
const {getTopRatedGames, saveToJson} = require('./lib')

async function main() {
  console.log('Get top rated games from steamdb...')
  try {
    const games = await getTopRatedGames()
    console.log(`Retrieved list with ${games.length} games from steamdb\n`)
    saveToJson('top-games-steamdb', games)
  } catch (e) {
    console.log('Retrieval of top rated games from steamdb.info failed', e)
  }
}

module.exports = main

if (require.main === module) {
  main()
}
