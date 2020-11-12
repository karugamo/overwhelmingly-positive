/* global exports require */
const games = require('./data/games.json')

exports.createPages = async ({actions: {createPage}}) => {
  games.forEach((game) => {
    const encodedName = encodeGame(game)
    createPage({
      path: `/game/${encodedName}/`,
      component: require.resolve('./src/pages/index.tsx'),
      context: {game}
    })
  })
}

// this is duplicated in the typescript code
function encodeGame(game) {
  return game.name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/ /g, '_')
}
