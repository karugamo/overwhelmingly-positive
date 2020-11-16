/*global require module */
const _ = require('lodash')
const {load, saveToJson} = require('./lib')
const {relevantSteamCategories} = require('./const')

const appIdToSteam = load('steam-games')
const appIdToVideo = load('appid-to-video')
const appIdToG2a = load('g2a')

function selectGameData({name, appId}) {
  const steamGame = appIdToSteam[appId]

  return {
    name,
    appId,
    video: appIdToVideo[appId]?.id,
    categories:
      steamGame?.categories
        .filter(({id}) => relevantSteamCategories.includes(id))
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

  const games = selectedGames.map(selectGameData)

  console.log('Website has', games.length, 'Games')
  saveToJson('games', games)
}

module.exports = main

if (require.main === module) {
  main()
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
