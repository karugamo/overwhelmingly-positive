/*global require */
const fs = require('fs')
const rawGames = require('../data/raw-games.json')
const g2a = require('../data/g2a.json')
const _ = require('lodash')

const relevantCategories = [2, 1, 9, 31]

const selectedGames = rawGames.filter(({type}) => type === 'game')
console.log('Removed', rawGames.length - selectedGames.length, 'non-games')

console.log('categories map')
const categories = _.mapValues(
  _.keyBy(
    _.flatten(selectedGames.map(({categories}) => categories)).filter(({id}) =>
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
    _.flatten(selectedGames.map(({genres}) => genres)).filter((a) => a),
    'id'
  ),
  'description'
)

console.log(genres)

const games = selectedGames.map((rawGame) => ({
  name: rawGame.name,
  appId: rawGame.appId,
  video: rawGame.video?.id,
  categories:
    rawGame.categories
      .filter(({id}) => relevantCategories.includes(id))
      .map(({id}) => id) ?? [],
  genres: rawGame.genres?.map(({id}) => Number(id)) ?? [],
  g2a: getG2a(rawGame.appId)
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

function getG2a(appId) {
  const listing = g2a[appId]
  if (!listing) return false

  if (!listing.offers) {
    console.error(listing.slug)
    window.process.exit()
  }

  const offer = listing.offers.find(({selectedOffer}) => selectedOffer)

  if (!offer) return false

  return {
    slug: listing.slug,
    price: offer?.price?.value,
    currency: offer?.price?.currency,
    sellerName: offer?.customer?.name,
    sellerVotes: _.sum(Object.values(offer?.customer?.votes)),
    sellerRating: offer?.customer?.rating
  }
}
