/*global require */
const fs = require('fs')
const rawGames = require('../data/raw-games.json')

const games = rawGames.map((rawGame) => ({
  name: rawGame.name,
  appId: rawGame.appId,
  video: rawGame.video,
  categories: rawGame.categories,
  genres: rawGame.genres
}))

const json = JSON.stringify(games, null, ' ')
fs.writeFileSync('./data/games.json', json)
