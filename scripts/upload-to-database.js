/* global require */
const MongoClient = require('mongodb').MongoClient
const {MONGO_DB_PW} = require('../env')
const {load} = require('./lib')

const uri = `mongodb+srv://admin:${MONGO_DB_PW}@cluster0.8am5w.mongodb.net/overwhelmingly-positive?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect(async (err) => {
  if (err) return console.error(err)

  const collection = client
    .db('overwhelmingly-positive')
    .collection('top-games-steamdb')

  const games = load('top-games-steamdb')

  await collection.drop()

  await collection.insertMany(
    games.map((game) => ({
      _id: game.appId,
      ...game
    })),
    {upsert: true}
  )

  client.close()
})
