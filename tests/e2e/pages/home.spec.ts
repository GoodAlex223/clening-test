import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES, THEMES_WITH_STATS } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { scanAccessibility } from '../helpers/accessibility'

test.describe('Home Page', () => {
  for (const theme of THEMES) {
    test.describe(`${THEME_DISPLAY_NAMES[theme]} theme`, () => {
      test('renders with correct page identifier', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')
        await expect(page.locator('[data-page="home"]')).toBeVisible()
      })

      test('displays hero section with heading and CTA', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')

        // Hero heading
        const heading = page.locator('h1').first()
        await expect(heading).toBeVisible()
        const text = await heading.textContent()
        expect(text!.length).toBeGreaterThan(0)

        // CTA link or button
        const cta = page.locator('a[href="/contact"], a[href="/services"]').first()
        await expect(cta).toBeVisible()
      })

      test('displays featured services section', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')

        // Should show up to 3 featured services
        const serviceHeadings = page.locator('text=/cleaning|service/i')
        const count = await serviceHeadings.count()
        expect(count).toBeGreaterThan(0)
      })

      test('displays testimonials section', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')

        // Testimonials should have rating stars or text content
        const testimonialText = page.locator('text=/stars|review|testimonial|client/i')
        const count = await testimonialText.count()
        expect(count).toBeGreaterThan(0)
      })

      test('has correct title', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')
        await expect(page).toHaveTitle(/CleanSpark/i)
      })

      test('passes accessibility audit', async ({ page }) => {
        await gotoWithTheme(page, theme, '/')
        await scanAccessibility(page, `Home — ${THEME_DISPLAY_NAMES[theme]}`)
      })
    })
  }

  for (const theme of THEMES_WITH_STATS) {
    test(`${theme}: stats counters animate on scroll`, async ({ page }) => {
      await gotoWithTheme(page, theme, '/')

      const counters = page.locator('[data-counter]')
      const count = await counters.count()

      if (count > 0) {
        // Scroll to the counter section to trigger IntersectionObserver
        await counters.first().scrollIntoViewIfNeeded()
        // Wait for counter to animate away from '0'
        await expect(counters.first()).not.toHaveText('0', { timeout: 3000 })
      }
    })
  }
})
