/* globals require, beforeAll, afterAll, beforeEach, afterEach, it */

const {chromium} = require('playwright')
const assert = require('assert')
const delay = require('delay')

const portalImage = 'img[alt=Portal]'
const portalWidgetUrl = 'https://store.steampowered.com/widget/400/'

let browser
let page
let context

beforeAll(async () => {
  browser = await chromium.launch({headless: true})
  context = await browser.newContext()
})
afterAll(async () => {
  await browser.close()
})
beforeEach(async () => {
  page = await context.newPage()
  await page.goto('http://localhost:9000')
})
afterEach(async () => {
  await page.close()
})

it('open Portal Steam Modal and go to Steam', async () => {
  await page.waitForSelector(portalImage)
  await page.click(portalImage)

  await page.waitForSelector('.Content')

  await page.waitForSelector(`iframe[src="${portalWidgetUrl}"]`)

  // TODO: This doesn't work without a delay
  await delay(1000)

  let frames = await page.frames()
  console.log(frames.map((f) => f.url()))
  const steamWidget = frames.find((f) => f.url() === portalWidgetUrl)

  assert.ok(steamWidget, 'Expected to see steam widget')

  const steamCta =
    '#widget > .game_purchase_action > .game_purchase_action_bg > .btn_addtocart > .btn_addtocart_content'

  await steamWidget.waitForSelector(steamCta)

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await steamWidget.click(steamCta)
  ])

  assert.strictEqual(
    await newPage.url(),
    'https://store.steampowered.com/cart/'
  )
})
