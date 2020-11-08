/*global require */
const fs = require('fs')
const rawGames = require('../data/raw-games.json')
const _ = require('lodash')

const relevantCategories = [2, 1, 9, 31]

console.log('categories map')
console.log(
  _.mapValues(
    _.keyBy(
      _.flatten(rawGames.map(({categories}) => categories)).filter(({id}) =>
        relevantCategories.includes(id)
      ),
      'id'
    ),
    'description'
  )
)

console.log('genres map')
console.log(
  _.mapValues(
    _.keyBy(_.flatten(rawGames.map(({genres}) => genres)), 'id'),
    'description'
  )
)

const games = rawGames.map((rawGame) => ({
  name: rawGame.name,
  appId: rawGame.appId,
  video: rawGame.video?.id,
  categories:
    rawGame.categories
      .filter(({id}) => relevantCategories.includes(id))
      .map(({id}) => id) ?? [],
  genres: rawGame.genres?.map(({id}) => Number(id)) ?? []
}))

const json = JSON.stringify(games)
fs.writeFileSync('./data/games.json', json)
