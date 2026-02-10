/** Theme identifier — lowercase single word matching directory names */
export type ThemeId = 'minimal' | 'bold' | 'trust' | 'bubbly' | 'noir'

/** Color palette for a theme */
export interface ThemeColors {
  background: string
  surface: string
  text: string
  textMuted: string
  primary: string
  secondary: string
  accent: string
  cta: string
  ctaText: string
}

/** Typography configuration */
export interface ThemeFonts {
  /** CSS font-family for headings (e.g. "'Inter', sans-serif") */
  heading: string
  /** CSS font-family for body text */
  body: string
  /** Optional decorative/accent font */
  accent?: string
}

/** Spacing and shape tokens */
export interface ThemeSpacing {
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  sectionPadding: string
  containerMax: string
}

/** Complete theme configuration */
export interface ThemeConfig {
  id: ThemeId
  displayName: string
  description: string
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: ThemeSpacing
}
