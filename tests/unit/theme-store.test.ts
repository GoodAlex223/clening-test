import { describe, it, expect } from 'vitest'
import {
  getThemeFromCookie,
  buildThemeCookieString,
  THEME_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
} from '@lib/theme-store'
import { DEFAULT_THEME, isValidThemeId } from '@themes/index'

describe('isValidThemeId', () => {
  it.each(['minimal', 'bold', 'trust', 'bubbly', 'noir'])('returns true for "%s"', (id) => {
    expect(isValidThemeId(id)).toBe(true)
  })

  it.each(['invalid', '', 'Minimal', 'BOLD', 'foo', '123'])(
    'returns false for "%s"',
    (value) => {
      expect(isValidThemeId(value)).toBe(false)
    }
  )

  it.each([null, undefined, 42, {}, []])('returns false for non-string %p', (value) => {
    expect(isValidThemeId(value)).toBe(false)
  })
})

describe('getThemeFromCookie', () => {
  it('returns DEFAULT_THEME when cookieHeader is null', () => {
    expect(getThemeFromCookie(null)).toBe(DEFAULT_THEME)
  })

  it('returns DEFAULT_THEME when cookieHeader is undefined', () => {
    expect(getThemeFromCookie(undefined)).toBe(DEFAULT_THEME)
  })

  it('returns DEFAULT_THEME when cookieHeader is empty string', () => {
    expect(getThemeFromCookie('')).toBe(DEFAULT_THEME)
  })

  it.each(['minimal', 'bold', 'trust', 'bubbly', 'noir'] as const)(
    'extracts "%s" from cookie string',
    (theme) => {
      expect(getThemeFromCookie(`${THEME_COOKIE_NAME}=${theme}`)).toBe(theme)
    }
  )

  it('extracts theme when multiple cookies are present', () => {
    expect(
      getThemeFromCookie(`other=value; ${THEME_COOKIE_NAME}=bold; another=test`)
    ).toBe('bold')
  })

  it('extracts theme at start of cookie string', () => {
    expect(getThemeFromCookie(`${THEME_COOKIE_NAME}=trust; other=value`)).toBe('trust')
  })

  it('extracts theme at end of cookie string', () => {
    expect(getThemeFromCookie(`other=value; ${THEME_COOKIE_NAME}=noir`)).toBe('noir')
  })

  it('returns DEFAULT_THEME for invalid theme value', () => {
    expect(getThemeFromCookie(`${THEME_COOKIE_NAME}=invalid`)).toBe(DEFAULT_THEME)
  })

  it('returns DEFAULT_THEME when theme cookie is missing', () => {
    expect(getThemeFromCookie('other=value; another=test')).toBe(DEFAULT_THEME)
  })
})

describe('buildThemeCookieString', () => {
  it.each(['minimal', 'bold', 'trust', 'bubbly', 'noir'] as const)(
    'builds cookie string for "%s"',
    (theme) => {
      const cookie = buildThemeCookieString(theme)
      expect(cookie).toContain(`${THEME_COOKIE_NAME}=${theme}`)
      expect(cookie).toContain('path=/')
      expect(cookie).toContain(`max-age=${THEME_COOKIE_MAX_AGE}`)
      expect(cookie).toContain('SameSite=Lax')
    }
  )
})
