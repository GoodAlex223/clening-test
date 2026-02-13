import type { Page } from '@playwright/test'
import type { TestThemeId } from './constants'
import { THEME_COOKIE_NAME } from './constants'

/**
 * Set theme cookie before navigating to a page.
 * Uses context.addCookies() so the cookie is sent on the first request (no FOUC).
 */
export async function setThemeCookie(page: Page, theme: TestThemeId): Promise<void> {
  await page.context().addCookies([
    {
      name: THEME_COOKIE_NAME,
      value: theme,
      domain: 'localhost',
      path: '/',
    },
  ])
}

/**
 * Navigate to a page with a specific theme pre-set via cookie.
 * Waits for the page to fully load before returning.
 */
export async function gotoWithTheme(page: Page, theme: TestThemeId, path: string): Promise<void> {
  await setThemeCookie(page, theme)
  await page.goto(path)
  await page.waitForLoadState('networkidle')
}

/**
 * Click a theme switcher button and wait for the full page reload.
 * The ThemeSwitcher sets document.cookie then calls window.location.reload().
 */
export async function clickThemeButton(page: Page, selector: string): Promise<void> {
  const button = page.locator(selector).first()
  // Use Promise.all to capture the reload navigation
  await Promise.all([page.waitForEvent('load'), button.click()])
  await page.waitForLoadState('networkidle')
}

/**
 * Read the --color-primary CSS custom property from the theme wrapper's inline style.
 * CSS vars are applied to the [data-theme] wrapper div, not to <html>.
 */
export async function getAppliedPrimaryColor(page: Page): Promise<string> {
  return page.evaluate(() => {
    const themeEl = document.querySelector('[data-theme]')
    const style = themeEl?.getAttribute('style') || ''
    const match = style.match(/--color-primary:\s*([^;]+)/)
    return match ? match[1].trim() : ''
  })
}
