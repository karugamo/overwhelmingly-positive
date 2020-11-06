const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const {YOUTUBE_KEY, UPDATE_YOUTUBE, UPDATE_DETAILS} = require('./env')

const shouldUpdate = {
  youtube: UPDATE_YOUTUBE,
  details: UPDATE_DETAILS
}

async function main() {
  let games = []

  try {
    games = await getTopRatedGames()
  } catch (e) {
    console.log('Retrieval of top rated games from steamdb.info failed', e)
  }

  if (shouldUpdate.youtube) {
    try {
      games = await Promise.all(
        games.map(async ({name}) => ({
          ...games,
          videoId: await getYouTubeVideoId(`"${name} gameplay"`)
        }))
      )
    } catch (e) {
      console.log('YouTube video retrieval failed', e)
    }
  }

  if (shouldUpdate.details) {
    games = games.map((game) => {
      let result = game
      try {
        setTimeout(async () => {
          const {appId} = game
          const {data} = await axios.get(
            `http://store.steampowered.com/api/appdetails?appids=${appId}`
          )

          console.log(appId, data?.[`${appId}`]?.data)

          if (data?.[`${appId}`]?.success) {
            result = {
              ...data?.[`${appId}`]?.data,
              ...game
            }
          }
        }, 500)

        return result
      } catch (e) {
        console.log('Steam app details retrieval failed', e)
      }
    })
  }

  const json = JSON.stringify(games, null, ' ')
  fs.writeFileSync('games.json', json)
}

main()

function parseNumber(text) {
  return Number(text.replace(',', ''))
}

async function getTopRatedGames() {
  const {data} = await axios.get('https://steamdb.info/stats/gameratings/', {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'de,en;q=0.9,en-US;q=0.8,fi;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      'upgrade-insecure-requests': '1',
      cookie:
        'cf_chl_1=8dbda24d1ec0c7f; cf_chl_prog=x17; cf_clearance=a7f6da8d42ae094efe20455c9e46a2009ff1e58c-1604418389-0-1zb0e9d870zb300278z58bd938f-150; __cfduid=df45473ecd0a4e1241d2fc3cc846bda401604418389; __Host-cc=us'
    }
  })

  const $ = cheerio.load(data)

  let games = []

  $('.app').each((index, element) => {
    const positive = parseNumber($(element).find('td')[3].children[0].data)
    const negative = parseNumber($(element).find('td')[4].children[0].data)
    const name = $(element).find('td')[2].children[0].children[0].data
    const appId = $(element).attr('data-appid')

    games.push({
      appId,
      name,
      positive,
      negative
    })
  })

  return games
}

async function getYouTubeVideoId(query) {
  const encodedQuery = encodeURIComponent(query)

  const result = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${encodedQuery}&type=video&key=${YOUTUBE_KEY}`
  )

  return result?.data?.items?.[0]?.id
}
