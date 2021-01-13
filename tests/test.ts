import {chromium} from 'playwright'
import delay from 'delay'

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

it('opens the Portal modal and clicks on the Steam button', async () => {
  await page.waitForSelector(portalImage)
  await page.click(portalImage)

  await page.waitForSelector('.Content')

  await page.waitForSelector(`iframe[src="${portalWidgetUrl}"]`)

  // TODO: This doesn't work without a delay
  await delay(1000)

  let frames = await page.frames()
  const steamWidget = frames.find((f) => f.url() === portalWidgetUrl)

  expect(steamWidget).toBeTruthy()

  const steamCta =
    '#widget > .game_purchase_action > .game_purchase_action_bg > .btn_addtocart > .btn_addtocart_content'

  await steamWidget.waitForSelector(steamCta)

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await steamWidget.click(steamCta)
  ])

  expect(await newPage.url()).toBe('https://store.steampowered.com/cart/')
})
