import { test, expect } from '@playwright/test'
import { THEMES, NAV_LINKS } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'
import { openMobileMenu, closeMobileMenuWithEscape } from '../helpers/navigation'

/** Selector for main navigation links (handles Noir's split-nav variant). */
const mainNavLink = (text: string) =>
  `nav[aria-label^="Main navigation"] a:text-is("${text}")`

test.describe('Desktop Navigation', () => {
  for (const theme of THEMES) {
    test(`${theme}: header nav links are visible`, async ({ page, isMobile }) => {
      test.skip(!!isMobile, 'Desktop navigation only')
      await gotoWithTheme(page, theme, '/')

      for (const linkText of NAV_LINKS) {
        await expect(page.locator(mainNavLink(linkText)).first()).toBeVisible()
      }
    })
  }

  test('clicking nav links navigates to correct pages', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop navigation only')
    await gotoWithTheme(page, 'minimal', '/')

    const expectedPaths: Record<string, string> = {
      Services: '/services',
      About: '/about',
      Pricing: '/pricing',
      Gallery: '/gallery',
      Contact: '/contact',
    }

    for (const [linkText, expectedPath] of Object.entries(expectedPaths)) {
      await page.locator(mainNavLink(linkText)).first().click()
      // ClientRouter handles navigation client-side via History API
      await page.waitForURL(new RegExp(expectedPath), { timeout: 10000 })

      // Go back to home for next iteration
      await page.goto('/')
      await page.waitForLoadState('networkidle')
    }
  })

  test('active page has aria-current="page"', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop navigation only')
    await gotoWithTheme(page, 'minimal', '/services')

    const activeLink = page.locator('nav[aria-label^="Main navigation"] a[aria-current="page"]')
    await expect(activeLink.first()).toHaveText(/Services/i)
  })

  test('logo navigates to home page', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop navigation only')
    await gotoWithTheme(page, 'minimal', '/services')

    await page.locator('[aria-label*="CleanSpark"]').first().click()
    // ClientRouter handles navigation client-side via History API
    await page.waitForURL(/\/$/, { timeout: 10000 })
  })
})

test.describe('Mobile Navigation', () => {
  for (const theme of THEMES) {
    test(`${theme}: mobile menu opens and shows all nav links`, async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Mobile navigation only')
      await gotoWithTheme(page, theme, '/')

      await openMobileMenu(page)

      for (const linkText of NAV_LINKS) {
        const mobileLink = page.locator('[aria-label="Mobile navigation"] a', {
          hasText: linkText,
        })
        await expect(mobileLink).toBeVisible()
      }
    })
  }

  test('mobile menu closes with Escape key', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only')
    await gotoWithTheme(page, 'minimal', '/')

    await openMobileMenu(page)

    const burger = page.locator('[aria-label="Open menu"]')
    await expect(burger).toHaveAttribute('aria-expanded', 'true')

    await closeMobileMenuWithEscape(page)

    await expect(burger).toHaveAttribute('aria-expanded', 'false')
  })

  test('mobile menu closes when a link is clicked', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only')
    await gotoWithTheme(page, 'minimal', '/')

    await openMobileMenu(page)

    const servicesLink = page.locator('[aria-label="Mobile navigation"] a', {
      hasText: 'Services',
    })
    await servicesLink.click()
    // ClientRouter handles navigation client-side via History API
    await page.waitForURL(/\/services/, { timeout: 10000 })
  })

  test('burger button toggles aria-expanded', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only')
    await gotoWithTheme(page, 'minimal', '/')

    const burger = page.locator('[aria-label="Open menu"]')

    await expect(burger).toHaveAttribute('aria-expanded', 'false')

    await burger.click()
    await expect(burger).toHaveAttribute('aria-expanded', 'true')

    await burger.click()
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
  })
})
