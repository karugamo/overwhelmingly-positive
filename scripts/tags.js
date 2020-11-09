const games = require('../data/raw-games.json')
const cheerio = require('cheerio')
const axios = require('axios')
const delay = require('delay')

const appId = games[0].appId

async function main() {
  const gamesWithTags = []

  const gamesWithoutTags = games.filter(({tags}) => tags === undefined)

  for (const game of gamesWithoutTags) {
    await delay(100)

    gamesWithTags.push({...game, tags: getTags(game)})
  }

  console.log(`\n${gamesWithTags.length} games(s) were upated with tags!`)
}

main()

async function getTags({name, appId}) {
  const {data} = await axios
    .get(`https://store.steampowered.com/app/${appId}`, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en;q=0.9,en-US;q=0.8,fi;q=0.7',
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
    .catch((e) =>
      console.log(`Retrieving tags for ${name} (${appId}) failed`, e)
    )

  const $ = cheerio.load(data)

  const tags = []

  $('.app_tag').each((index, element) => {
    const tag = $(element).text().trim()
    tags.push(tag)
  })

  removePlusSignTag()

  console.log(`Tags for ${name} (${appId}) retrieved successfully`)

  return tags

  function removePlusSignTag() {
    tags.pop()
  }
}
