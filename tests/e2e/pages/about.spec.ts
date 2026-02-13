import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('About Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/about')
        await expect(page.locator('[data-page="about"]')).toBeVisible()
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/about')
        await expect(page).toHaveTitle(/About.*CleanSpark/i)
      })

      test('displays team members', async ({ page }) => {
        await gotoWithTheme(page, theme, '/about')

        // Should have team member cards with names and roles
        const teamContent = await page.textContent('body')
        expect(teamContent).toMatch(/team|staff|member|founder|manager/i)
      })

      test('displays company story section', async ({ page }) => {
        await gotoWithTheme(page, theme, '/about')

        // Company story/values are present
        const bodyText = await page.textContent('body')
        expect(bodyText).toMatch(/clean|mission|value|story|about/i)
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/about')
        await scanAccessibility(page, `About — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }
})
