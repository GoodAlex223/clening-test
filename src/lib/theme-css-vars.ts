import type { ThemeConfig } from '@themes/types'

/** Build an inline style string of CSS custom properties from a theme config. */
export function buildThemeCssVars(theme: ThemeConfig): string {
  const vars = [
    `--color-background: ${theme.colors.background}`,
    `--color-surface: ${theme.colors.surface}`,
    `--color-text: ${theme.colors.text}`,
    `--color-text-muted: ${theme.colors.textMuted}`,
    `--color-primary: ${theme.colors.primary}`,
    `--color-secondary: ${theme.colors.secondary}`,
    `--color-accent: ${theme.colors.accent}`,
    `--color-cta: ${theme.colors.cta}`,
    `--color-cta-text: ${theme.colors.ctaText}`,
    `--font-heading: ${theme.fonts.heading}`,
    `--font-body: ${theme.fonts.body}`,
    `--radius-sm: ${theme.spacing.borderRadius.sm}`,
    `--radius-md: ${theme.spacing.borderRadius.md}`,
    `--radius-lg: ${theme.spacing.borderRadius.lg}`,
    `--radius-full: ${theme.spacing.borderRadius.full}`,
    `--section-padding: ${theme.spacing.sectionPadding}`,
    `--container-max: ${theme.spacing.containerMax}`,
  ]

  if (theme.fonts.accent) {
    vars.push(`--font-accent: ${theme.fonts.accent}`)
  }

  return vars.join('; ')
}
