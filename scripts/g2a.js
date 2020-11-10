/* globals require process */

const fetch = require('node-fetch')
const {saveToJson} = require('./lib')
const delay = require('delay')
const games = require('../data/raw-games.json')

async function main() {
  await findG2aOffers(games[0])[0]
  const g2a = {}

  for (const game of games) {
    process.stdout.write(`${game.name}: `)
    const {slug, offers} = await findG2aOffers(game)[0]
    console.log(slug)
    g2a[game.appId] = {slug, offers}
  }

  saveToJson('g2a')
}

async function findG2aOffers(game) {
  const {products} = await get(
    `v3/products/filter/?query=${game.name}&sort=preorder&wholesale=false`
  )

  for (const {slug, attributes} of products) {
    if (
      attributes.region !== 'GLOBAL' ||
      attributes.platform.name !== 'Steam'
    ) {
      continue
    }

    const product = await get(
      `v1/products/${slug}?currency=EUR&store=portuguese&wholesale=false`
    )

    const appId = product.info.attributes.SteamAppID
    if (appId.toString() === game.appId) {
      return {
        slug,
        offers: product.offers.items
      }
    }
  }
}

main()

async function get(endpoint) {
  await delay(200)

  const headers = {
    authority: 'www.g2a.com',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'de,en;q=0.9,en-US;q=0.8,fi;q=0.7',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
    cookie:
      'skc=45900298-1886-4072-b592-e062fec56961-1600942770; store=german; gdpr_cookie=%5B%22COOKIE-1-1%22%2C%22COOKIE-2-1%22%2C%22COOKIE-3-1%22%5D; gtm_client_id=7899825534.1604856601443; currency=EUR; skc=b2eddc01-83f3-4a4d-9e3c-42909cd55031-1604856635; g2aSSO=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHMkEgSUQiLCJqdGkiOiJPWWx4cHlJUFlQR0hTbDZrbU5PN0gxY2F4TjVDZ1VZTSIsImV4cCI6MTYwNzQ0ODk4NiwidXNlcl9pZCI6ImQ0M2ZiYWQ0LWExMGEtNGRiMy04Y2Y5LWNiZTk2N2Q5ZmIzMSIsInVzZXJfa2V5IjoiMTM3ZmI0ZDk1NzlmMTI3YWZhOTYiLCJ1c2VyX2VtYWlsIjoiZmlubkBrYXJ1Z2Ftby5hZ2VuY3kiLCJhY2NvdW50X2lkIjoiZDQzZmJhZDQtYTEwYS00ZGIzLThjZjktY2JlOTY3ZDlmYjMxIiwiYWNjb3VudF9rZXkiOiIxMzdmYjRkOTU3OWYxMjdhZmE5NiIsImFjY291bnRfdHlwZSI6InBlcnNvbmFsIiwiYWNjb3VudF9lbWFpbCI6ImZpbm5Aa2FydWdhbW8uYWdlbmN5Iiwicm9sZXMiOltdLCJwZXJtaXNzaW9ucyI6W119.CCGARRfnKrG_g-e0IyQ8ZlPxhpwJ5cDrLlVBh9S-9P1aWdvAtVrCz1yjWQ8OCCqxf8xavOuFoAsS6BL0m_BIeis_w5aVU8XEEeMq-W2s5Ou2oTKY1iuEchqC0VPO1PtuxPcpkBvtiwyyLXyxNdj97c1WefOSPE9helqpwdwNXs-wsIr3cEiocrR9hNfRJfI8ZRexP8vGu6RY-gh1EISVIztqlKDRJMr8B68Vmt_x6_aZqo8JV_RlE56vlTZQTtwiOiJGkmorj8RZFd-YJLYRVGmgDhrHekA3444lY4BNzS20umV9GL44hskhi309E1Foq5815XKmcrb0pVpmQQVW1cTmMMa_MaAdvRHjyFCm94f3EiyyODWbIc2oEQNesiAwSH1aT_g5u7TAVo_LSAuZXSqhjrADbkY9OliE8TxI_MiQZGUJFBFcaD2B7sH-SneenfXjoiY_pBFCdvqpcQWuDRjHMUGb6Fo3djjHctpTC2LMzCy4l4DZbczMQWZpjMHcy4r21ILgUvGunpmiOLlnx_InFvm020sUwBejEroltdOiY7C5S94AbB1tKyZWUnqvsyG8OKahcVqd8R2BK4000pVuwggFBTrUGvywQzy1J-cve5l0cPfnNWYsB9nloUNZwd8AugN8m1Ml_--ph-zSoRqkt2nEjY5nhOwY2AowpD0; cart-v2=true; gol_ref=YTQ2OTc3Y2U1YztkZDE3NjIzMS0xZThmLTRjNWYtOTgxMi1jMTNiNzg1MGJkZTE7MTYwNDg1ODMwMg==; ak_bmsc=5549C99B83CD82330A2F1135B0485B7E58DD35D54E0D00004A5BAA5F52C7086B~plBdYHCvoZJe65t3T1AHNB+lZWhhmcw7BM6bCPxsDLhbXmu4fph5KW0E+XqJnuEIVyVxM95005MwpP+qZe2bOe+icPMwSQrczWZMTUZpz/ThSMVNSQoHsFgllyZUBGaKfL4+YDPC6ZdKF+fvWmlHx3qo5DV7dOxEQpWf+wJwvznITI010Fgn9FvkG0QHutDkQuePRk3itrwdaNeEu2XA4wEWRbQyZ7fxqgMfUUWy+E7l4=; bm_sz=57891F262EA1E2D5ECFC9FD6EAC4ED1B~YAAQ1TXdWJGDuId1AQAAGZl0sQlMSSDolWyNRPqgqIyEbgUq3htjegFiyQdE3djkwTIAA2TkeyLar+2dmm8ikiz8WISzC22UpyLKGVe5wjkbI4HPHAbLK1QQceRIXu3KWeRvqb1UN/k4uYvKFCSoQno+QlgeIo8mgbtn+YNQ016jR7r/ewLafOgFSuf9; G2ACOM=ceoglgqc6si2741m90j76vqmb3; bm_mi=BFFA89C12AEB9C9F9CBE9F8A3CD7D896~AYp8Kh6GHuHVI+dv+kad9zUsgOnnUvo4aPEec33PsKpUgqtle4nEc5c62LWi8M84jtdA8nYyzvDb9gMdKcIY7epUMQ/FtrpqjOFqu95ykumv3zuJ+yO9ehTTXvmGY+AohVSUFL9J3h4aiF2YTcrkfDnhDvcv0aOHbhTJ5ITnJnJZC8oaP61bHyOdt6/LV2rkHzA8jy0ErJdWdQcxFHtT6BrW0D0GkMlXiC7Y4GuzI9A=; _abck=7FA0FFD290CB43BF391C466A350DE11E~0~YAAQt/UWAhGqHqJ1AQAAFj13sQQ2KPZNUqtPIOuBGSWNj3nL+5JHc+BK/Lgq04velxrdgjeG1KcQvsRnJnMfwFHyOXZHwPEklFSfImQ8gqfiD+rtOIuXS8md3orgAWwQlrdJJ0QWOZDPiRpse8jWo+MM0pisVZ6SAEJAarhHsG2A8+6olh77u1kDeXw1Byjz911+p8d7t3+5fwMdtH4H7ROYT2ayY8gCGVJ0bxVDHbK6aYI8vFxvkHFy46SijLzrTwW2KRI+ggDRsJ0gVNfmhEIrI6T03I0YgPXJJMg4B9dfibc1Gj2ONQeRltw90mhXjaCezJsKcrV/rGjBDYYiKPFwUg==~-1~||-1||~-1; gdpr_user_cookie=false; bm_sv=FF71AB7A58F0CFF81FCD8A28F6990096~FwKIYoN7iw1g9cTCcwh2lW6gTad4nIWhgngIVzGS3tuVRqeD4K2001WK7fYVtpQefvFPKdQQLz5Wl16DaNGJVsBa5ILDc5WEf8ozNbChxgI04Wp70q02y8QVZycSk18Ma0jDu6MB7/wyB0x2IXiOUg=='
  }

  const res = await fetch('https://www.g2a.com/new/api/' + endpoint, {
    headers,
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors'
  })
  return await res.json()
}
