/*global require module */
const _ = require('lodash')
const fs = require('fs')
const {load, saveToJson} = require('./lib')

const appIdToSteam = load('steam-games')
const appIdToVideo = load('appid-to-video')
const appIdToG2a = load('g2a')

const relevantCategories = [2, 1, 9, 31]

function selectGameData({name, appId}) {
  const steamGame = appIdToSteam[appId]

  return {
    name,
    appId,
    video: appIdToVideo[appId]?.id,
    categories:
      steamGame?.categories
        .filter(({id}) => relevantCategories.includes(id))
        .map(({id}) => id) ?? [],
    genres: steamGame?.genres?.map(({id}) => Number(id)) ?? [],
    g2a: getG2a(appId)
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

  // console.log('getCategoryIdMap')
  // const categories = getCategoryIdMap(selectedGames)
  // console.log(categories)

  // console.log('getGenreIdMap')
  // const genres = getGenreIdMap(selectedGames)
  // console.log(genres)

  const games = selectedGames.map(selectGameData)

  // console.log(createEnum(genres, 'Genre'))
  // console.log(createEnum(categories, 'Category'))

  console.log('Website has', games.length, 'Games')
  saveToJson('games', games)
}

module.exports = main

if (require.main === module) {
  main()
}

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
  const listing = appIdToG2a[appId]
  if (!listing) return false

  const offers = listing.offers

  if (!offers) {
    console.error(listing.slug)
    window.process.exit()
  }

  const offer = selectOffer(offers)

  // console.log()
  // console.log(listing.slug)
  // console.log(offers.map(debugFormatOffer).join('\n'))
  // console.log(offer.price.value)

  if (!offer) return false

  return {
    slug: listing.slug,
    price: offer?.price?.value,
    currency: offer?.price?.currency,
    sellerName: offer?.customer?.name,
    sellerVotes: getTotalVotes(offer),
    sellerRating: offer?.customer?.rating
  }
}

function getTotalVotes(offer) {
  return _.sum(Object.values(offer?.customer?.votes))
}

function debugFormatOffer(offer) {
  const totalRatings = getTotalVotes(offer)

  const rating = offer.customer.rating

  const adjustedRating = getAdjustedRating(offer)

  return `${offer.price.value} ${totalRatings}  ${rating} ${adjustedRating}`
}

function selectOffer(offers) {
  return _.sortBy(offers, (offer) => {
    const adjustedRating = getAdjustedRating(offer)
    const pricePenalty = calcPricePenalty(adjustedRating)

    return offer.price.value + pricePenalty
  })[0]
}

function calcPricePenalty(adjustedRating) {
  if (adjustedRating > 97) return 0

  const power = 0.999
  const multiply = 20

  const max = 100 / 100 ** power
  const raw = multiply * (100 / adjustedRating ** power - max)

  return Math.round(raw * 100) / 100
}

function getAdjustedRating(offer) {
  const totalRatings = _.sum(Object.values(offer.customer.votes))

  const rating = offer.customer.rating
  return Math.round(
    rating - (rating - 0.5) * Math.pow(4, -Math.log10(totalRatings + 1))
  )
}

function getCategoryIdMap(games) {
  return _.mapValues(
    _.keyBy(
      _.flatten(games.map(({categories}) => categories)).filter(({id}) =>
        relevantCategories.includes(id)
      ),
      'id'
    ),
    'description'
  )
}

function getGenreIdMap(games) {
  return _.mapValues(
    _.keyBy(
      _.flatten(games.map(({genres}) => genres)).filter((a) => a),
      'id'
    ),
    'description'
  )
}
