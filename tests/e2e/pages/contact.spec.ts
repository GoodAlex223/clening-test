import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('Contact Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/contact')
        await expect(page.locator('[data-page="contact"]')).toBeVisible()
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/contact')
        await expect(page).toHaveTitle(/Contact.*CleanSpark/i)
      })

      test('displays contact form', async ({ page }) => {
        await gotoWithTheme(page, theme, '/contact')

        await expect(page.locator('input[name="name"]')).toBeVisible()
        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('textarea[name="message"]')).toBeVisible()
      })

      test('displays contact information', async ({ page }) => {
        await gotoWithTheme(page, theme, '/contact')

        // Contact info (phone, email, address)
        const bodyText = await page.textContent('body')
        expect(bodyText).toMatch(/phone|email|address|seattle/i)
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/contact')
        await scanAccessibility(page, `Contact — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }
})
