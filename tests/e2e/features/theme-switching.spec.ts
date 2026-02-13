import { test, expect } from '@playwright/test'
import { THEMES, THEME_DISPLAY_NAMES, THEME_COOKIE_NAME } from '../helpers/constants'
import { gotoWithTheme, clickThemeButton, getAppliedPrimaryColor } from '../helpers/theme'
import type { TestThemeId } from '../helpers/constants'

/**
 * Scope theme-switcher queries to the first instance (desktop nav).
 * Multiple ThemeSwitcher islands may exist on the page.
 */
const switcher = (selector: string) => `.theme-switcher ${selector}`

test.describe('Theme Switching', () => {
  test('default theme is minimal when no cookie is set', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const activeButton = page
      .locator(switcher('[data-theme="minimal"][aria-pressed="true"]'))
      .first()
    await expect(activeButton).toBeVisible()
  })

  test('theme switcher renders all 5 theme buttons', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Theme switcher hidden on mobile')
    await gotoWithTheme(page, 'minimal', '/')

    for (const theme of THEMES) {
      const button = page.locator(switcher(`[data-theme="${theme}"]`)).first()
      await expect(button).toBeVisible()
      await expect(button).toHaveAttribute(
        'aria-label',
        `Switch to ${THEME_DISPLAY_NAMES[theme]} theme`
      )
    }
  })

  for (const theme of THEMES) {
    test(`clicking "${THEME_DISPLAY_NAMES[theme]}" button switches theme`, async ({
      page,
      isMobile,
    }) => {
      test.skip(!!isMobile, 'Theme switcher hidden on mobile')

      // Start with a different theme
      const startTheme: TestThemeId = theme === 'minimal' ? 'bold' : 'minimal'
      await gotoWithTheme(page, startTheme, '/')

      // Click theme button — waits for page reload
      await clickThemeButton(page, switcher(`[data-theme="${theme}"]`))

      // Verify the correct theme button is now active (server-rendered)
      const activeButton = page
        .locator(switcher(`[data-theme="${theme}"][aria-pressed="true"]`))
        .first()
      await expect(activeButton).toBeVisible()
    })
  }

  test('theme persists across page navigation', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Theme switcher hidden on mobile')
    await gotoWithTheme(page, 'trust', '/')

    await page.getByRole('link', { name: 'Services' }).first().click()
    // ClientRouter handles navigation client-side via History API
    await page.waitForURL(/\/services/, { timeout: 10000 })

    await expect(
      page.locator(switcher('[data-theme="trust"][aria-pressed="true"]')).first()
    ).toBeVisible()

    await page.getByRole('link', { name: 'About' }).first().click()
    await page.waitForURL(/\/about/, { timeout: 10000 })

    await expect(
      page.locator(switcher('[data-theme="trust"][aria-pressed="true"]')).first()
    ).toBeVisible()
  })

  test('theme cookie is set correctly after switching', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Theme switcher hidden on mobile')
    await gotoWithTheme(page, 'minimal', '/')

    // Switch to noir via client-side click (waits for page reload)
    await clickThemeButton(page, switcher('[data-theme="noir"]'))

    const cookies = await page.context().cookies()
    const themeCookie = cookies.find((c) => c.name === THEME_COOKIE_NAME)

    expect(themeCookie).toBeDefined()
    expect(themeCookie!.value).toBe('noir')
  })

  test('each theme applies different CSS custom properties', async ({ page }) => {
    const primaryColors: string[] = []

    for (const theme of THEMES) {
      await gotoWithTheme(page, theme, '/')
      const color = await getAppliedPrimaryColor(page)
      primaryColors.push(color)
    }

    const uniqueColors = new Set(primaryColors)
    expect(uniqueColors.size).toBe(5)
  })
})
