/* global require */
const {YOUTUBE_KEY} = require('../env')
const axios = require('axios')
const delay = require('delay')
const fs = require('fs')
const dayjs = require('dayjs')

const games = require('../raw-games.json')

async function main() {
  const gamesNeedNewVideo = games.filter(
    (game) =>
      !game.video ||
      dayjs(game.video.lastUpdated).isBefore(dayjs().subtract(2, 'month'))
  )
  for (const game of gamesNeedNewVideo) {
    delay(300)

    const videoId = await getYouTubeVideoId(`"${game.name} gameplay"`)

    if (videoId) {
      console.log(game.name, `https://www.youtube.com/watch?v=${videoId}`)
      game.video = {
        id: videoId,
        lastUpdated: new Date()
      }
      save()
    } else {
      console.log(`Failed to fetch for ${game.name} (${game.appId})`)
    }
  }
}

main()

async function getYouTubeVideoId(query) {
  const encodedQuery = encodeURIComponent(query)

  const result = await axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${encodedQuery}&type=video&key=${YOUTUBE_KEY}`
    )
    .catch(console.log)

  return result?.data?.items?.[0]?.id?.videoId
}

function save() {
  const json = JSON.stringify(games, null, ' ')
  fs.writeFileSync('../raw-games.json', json)
}
