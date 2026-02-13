import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('Gallery Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')
        await expect(page.locator('[data-page="gallery"]')).toBeVisible()
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')
        await expect(page).toHaveTitle(/Gallery.*CleanSpark/i)
      })

      test('displays gallery items', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')

        const items = page.locator('[data-gallery-item]')
        const count = await items.count()
        expect(count).toBeGreaterThanOrEqual(3)
      })

      test('displays filter buttons', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')

        const allButton = page.locator('[data-filter="all"]')
        await expect(allButton).toBeVisible()

        // At least one category filter besides "All"
        const categoryFilters = page.locator('[data-filter]:not([data-filter="all"])')
        const count = await categoryFilters.count()
        expect(count).toBeGreaterThan(0)
      })

      test('gallery items have before/after images', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')

        // Check for images within gallery items
        const images = page.locator('[data-gallery-item] img')
        const count = await images.count()
        expect(count).toBeGreaterThan(0)
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/gallery')
        await scanAccessibility(page, `Gallery — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }
})
