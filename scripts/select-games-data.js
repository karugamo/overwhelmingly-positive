/*global require */
const fs = require('fs')
const rawGames = require('../data/raw-games.json')
const _ = require('lodash')

const relevantCategories = [2, 1, 9, 31]

console.log('categories map')
const categories = _.mapValues(
  _.keyBy(
    _.flatten(rawGames.map(({categories}) => categories)).filter(({id}) =>
      relevantCategories.includes(id)
    ),
    'id'
  ),
  'description'
)
console.log(categories)

console.log('genres map')
const genres = _.mapValues(
  _.keyBy(
    _.flatten(rawGames.map(({genres}) => genres)).filter((a) => a),
    'id'
  ),
  'description'
)

console.log(genres)

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

console.log(createEnum(genres, 'Genre'))
console.log(createEnum(categories, 'Category'))

const json = JSON.stringify(games)
fs.writeFileSync('./data/games.json', json)

function createEnum(nameById, enumName) {
  const camelCased = _.mapValues(nameById, (key) =>
    _.upperFirst(_.camelCase(key))
  )

  return `
  enum ${enumName} {
${Object.entries(camelCased)
  .map(([id, name]) => `    ${name} = ${id},`)
  .join('\n')} 
  }
  `
}
