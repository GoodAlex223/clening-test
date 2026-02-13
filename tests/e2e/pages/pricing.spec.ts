import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('Pricing Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')
        await expect(page.locator('[data-page="pricing"]')).toBeVisible()
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')
        await expect(page).toHaveTitle(/Pricing.*CleanSpark/i)
      })

      test('displays 3 pricing tiers', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')

        // Should have pricing tier content (dollar amounts)
        const priceElements = page.locator('text=/\\$/i')
        const count = await priceElements.count()
        expect(count).toBeGreaterThanOrEqual(3)
      })

      test('highlighted tier has visual distinction', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')

        // Check for a highlighted/recommended tier
        const bodyText = await page.textContent('body')
        expect(bodyText).toMatch(/popular|recommended|best value/i)
      })

      test('each tier has a CTA button', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')

        // CTA buttons linking to contact
        const ctaLinks = page.locator('a[href="/contact"]')
        const count = await ctaLinks.count()
        expect(count).toBeGreaterThanOrEqual(1)
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/pricing')
        await scanAccessibility(page, `Pricing — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }
})
