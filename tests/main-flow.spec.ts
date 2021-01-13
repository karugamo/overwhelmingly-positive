import {it, expect} from '@playwright/test'
import {
  clickGamePortalImage,
  clickOnSteamWidgetCTA,
  goToHomepage,
  waitForSteamWidget
} from './page'

it('opens the Portal modal and click on the Steam button', async ({
  page,
  context
}) => {
  await goToHomepage(page)
  await clickGamePortalImage(page)

  const steamWidget = await waitForSteamWidget(page)
  expect(steamWidget).toBeTruthy()

  const newPage = await clickOnSteamWidgetCTA(context, steamWidget)

  expect(newPage.url()).toBe('https://store.steampowered.com/cart/')
})
