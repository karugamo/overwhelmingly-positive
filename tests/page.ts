import {BrowserContext, Frame, Page} from 'playwright'
import { delay } from '../scripts/lib'

export async function goToHomepage(page: Page) {
  await page.goto('http://localhost:9000')
}

export async function clickGamePortalImage(page: Page) {
  const portalImage = 'img[alt=Portal]'
  await page.waitForSelector(portalImage)
  await page.click(portalImage)
}

export async function waitForSteamWidget(page: Page) {
  const portalWidgetUrl = 'https://store.steampowered.com/widget/400/'
  await page.waitForSelector('.Content')

  await page.waitForSelector(`iframe[src="${portalWidgetUrl}"]`)

  // TODO: This doesn't work without a delay
  await delay(1000)

  let frames = await page.frames()
  const steamWidget = frames.find((f) => f.url() === portalWidgetUrl)
  return steamWidget
}

export async function clickOnSteamWidgetCTA(
  context: BrowserContext,
  steamWidget: Frame
) {
  const steamCta =
    '#widget > .game_purchase_action > .game_purchase_action_bg > .btn_addtocart > .btn_addtocart_content'

  await steamWidget.waitForSelector(steamCta)

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await steamWidget.click(steamCta)
  ])
  return newPage
}
