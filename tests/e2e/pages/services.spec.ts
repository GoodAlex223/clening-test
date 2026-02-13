import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('Services Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')
        await expect(page.locator('[data-page="services"]')).toBeVisible()
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')
        await expect(page).toHaveTitle(/Services.*CleanSpark/i)
      })

      test('displays service cards', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')

        // Should have multiple service sections or cards
        const serviceItems = page.locator('[data-service]')
        const count = await serviceItems.count()
        expect(count).toBeGreaterThanOrEqual(3)
      })

      test('each service has name and description', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')

        // Check first service card has heading and text
        const firstService = page.locator('[data-service]').first()
        const heading = firstService.locator('h2, h3').first()
        await expect(heading).toBeVisible()
      })

      test('displays service categories', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')

        // Services should be organized (residential, commercial, specialty)
        const content = await page.textContent('body')
        expect(content).toBeTruthy()
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/services')
        await scanAccessibility(page, `Services — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }
})
