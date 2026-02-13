/** Theme IDs matching ThemeId union type */
export const THEMES = ['minimal', 'bold', 'trust', 'bubbly', 'noir'] as const
export type TestThemeId = (typeof THEMES)[number]

/** Page routes and their corresponding PageName identifiers */
export const PAGES = [
  { name: 'home', path: '/', title: /CleanSpark/i },
  { name: 'services', path: '/services', title: /Services.*CleanSpark/i },
  { name: 'about', path: '/about', title: /About.*CleanSpark/i },
  { name: 'pricing', path: '/pricing', title: /Pricing.*CleanSpark/i },
  { name: 'gallery', path: '/gallery', title: /Gallery.*CleanSpark/i },
  { name: 'contact', path: '/contact', title: /Contact.*CleanSpark/i },
] as const

/** Theme display names matching THEME_REGISTRY */
export const THEME_DISPLAY_NAMES: Record<TestThemeId, string> = {
  minimal: 'Minimal Zen',
  bold: 'Bold Spark',
  trust: 'Trust Shield',
  bubbly: 'Bubbly Clean',
  noir: 'Noir Luxe',
}

/** Themes that have stats counter animations on their home page */
export const THEMES_WITH_STATS: readonly TestThemeId[] = ['bold', 'trust', 'noir']

/** All 30 theme/page combinations for parameterized tests */
export const THEME_PAGE_MATRIX = THEMES.flatMap((theme) =>
  PAGES.map((page) => ({ theme, ...page }))
)

/** Cookie name used by the theme system */
export const THEME_COOKIE_NAME = 'cleanspark_theme'

/** Navigation link labels (consistent across all themes) */
export const NAV_LINKS = ['Services', 'About', 'Pricing', 'Gallery', 'Contact'] as const
