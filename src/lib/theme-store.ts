import type { ThemeId } from '@themes/types'
import { DEFAULT_THEME, isValidThemeId } from '@themes/index'

export const THEME_COOKIE_NAME = 'cleanspark_theme'
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds

/**
 * Parse a theme ID from a raw cookie header string (server-side).
 * Returns the default theme if cookie is missing or invalid.
 */
export function getThemeFromCookie(cookieHeader: string | null | undefined): ThemeId {
  if (!cookieHeader) return DEFAULT_THEME

  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${THEME_COOKIE_NAME}=([^;]+)`))
  const value = match?.[1]

  if (value && isValidThemeId(value)) {
    return value
  }

  return DEFAULT_THEME
}

/**
 * Build a Set-Cookie string for persisting theme choice.
 * Intended for server-side use or passing to document.cookie.
 */
export function buildThemeCookieString(theme: ThemeId): string {
  return `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`
}

/**
 * Write theme cookie (client-side only).
 * Sets cookie and returns the theme that was set.
 */
export function setThemeCookie(theme: ThemeId): void {
  document.cookie = buildThemeCookieString(theme)
}

/**
 * Read current theme from document.cookie (client-side only).
 */
export function getCurrentTheme(): ThemeId {
  return getThemeFromCookie(document.cookie)
}
