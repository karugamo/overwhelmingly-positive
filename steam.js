const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

async function main() {
  try {
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
      //   console.log($(element).find('td')[3].children[0].data)

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
    console.log(games)

    const json = JSON.stringify(games, null, ' ')
    fs.writeFileSync('games.json', json)
  } catch (e) {
    console.log(e)
  }
}

main()

function parseNumber(text) {
  return Number(text.replace(',', ''))
}

// fetch('https://steamdb.info/stats/gameratings/', {

//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: null,
//   method: 'GET',
//   mode: 'cors'
// })
