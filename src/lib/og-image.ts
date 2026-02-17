/**
 * OG Image URL resolver — maps ThemeId to absolute OG image URL.
 *
 * Images live at public/images/og/{theme}-og.png (1200×630px).
 * Falls back to DEFAULT_THEME when themeId is invalid.
 */
import type { ThemeId } from '@themes/types'
import { isValidThemeId, DEFAULT_THEME } from '@themes/index'

const OG_BASE_PATH = '/images/og'

/** Build absolute OG image URL for meta tags. */
export function getOgImageUrl(themeId: ThemeId, origin: string): string {
  const id = isValidThemeId(themeId) ? themeId : DEFAULT_THEME
  return `${origin}${OG_BASE_PATH}/${id}-og.png`
}
