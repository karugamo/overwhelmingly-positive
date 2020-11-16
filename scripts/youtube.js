/* global require module */
const {YOUTUBE_KEY} = require('../env')
const axios = require('axios')
const delay = require('delay')
const dayjs = require('dayjs')

const {load, saveToJson} = require('./lib')

const games = load('top-games-steamdb')
const appIdToVideo = load('appid-to-video')

async function main() {
  const gamesNeedNewVideo = games.filter(needsVideo)

  for (const game of gamesNeedNewVideo) {
    delay(300)

    const videoId = await getYouTubeVideoId(`"${game.name} gameplay"`)

    if (videoId) {
      console.log(game.name, `https://www.youtube.com/watch?v=${videoId}`)

      appIdToVideo[game.appId] = {
        id: videoId,
        lastUpdated: new Date()
      }
      saveToJson('appid-to-video', appIdToVideo)
    } else {
      console.log(`Failed to fetch for ${game.name} (${game.appId})`)
    }
  }
}

async function getYouTubeVideoId(query) {
  const encodedQuery = encodeURIComponent(query)

  const result = await axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${encodedQuery}&type=video&key=${YOUTUBE_KEY}`
    )
    .catch(console.log)

  return result?.data?.items?.[0]?.id?.videoId
}

module.exports = main

if (require.main === module) {
  main()
}

function needsVideo(game) {
  const {appId} = game

  const video = appIdToVideo[appId]

  if (!video) return true

  const isOlderThanTwoMonth = dayjs(video.lastUpdated).isBefore(
    dayjs().subtract(2, 'month')
  )

  return isOlderThanTwoMonth
}
