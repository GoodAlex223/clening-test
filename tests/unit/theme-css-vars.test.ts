import { describe, it, expect } from 'vitest'
import { buildThemeCssVars } from '@lib/theme-css-vars'
import { THEME_REGISTRY, THEME_IDS } from '@themes/index'

describe('buildThemeCssVars', () => {
  it.each([...THEME_IDS])('generates valid CSS custom properties for "%s" theme', (themeId) => {
    const theme = THEME_REGISTRY[themeId]
    const result = buildThemeCssVars(theme)

    // Color variables
    expect(result).toContain(`--color-background: ${theme.colors.background}`)
    expect(result).toContain(`--color-surface: ${theme.colors.surface}`)
    expect(result).toContain(`--color-text: ${theme.colors.text}`)
    expect(result).toContain(`--color-text-muted: ${theme.colors.textMuted}`)
    expect(result).toContain(`--color-primary: ${theme.colors.primary}`)
    expect(result).toContain(`--color-secondary: ${theme.colors.secondary}`)
    expect(result).toContain(`--color-accent: ${theme.colors.accent}`)
    expect(result).toContain(`--color-cta: ${theme.colors.cta}`)
    expect(result).toContain(`--color-cta-text: ${theme.colors.ctaText}`)

    // Font variables
    expect(result).toContain(`--font-heading: ${theme.fonts.heading}`)
    expect(result).toContain(`--font-body: ${theme.fonts.body}`)

    // Spacing variables
    expect(result).toContain(`--radius-sm: ${theme.spacing.borderRadius.sm}`)
    expect(result).toContain(`--radius-md: ${theme.spacing.borderRadius.md}`)
    expect(result).toContain(`--radius-lg: ${theme.spacing.borderRadius.lg}`)
    expect(result).toContain(`--radius-full: ${theme.spacing.borderRadius.full}`)
    expect(result).toContain(`--section-padding: ${theme.spacing.sectionPadding}`)
    expect(result).toContain(`--container-max: ${theme.spacing.containerMax}`)
  })

  it('includes --font-accent when theme has accent font', () => {
    const bubbly = THEME_REGISTRY.bubbly
    expect(bubbly.fonts.accent).toBeDefined()

    const result = buildThemeCssVars(bubbly)
    expect(result).toContain(`--font-accent: ${bubbly.fonts.accent}`)
  })

  it('omits --font-accent when theme has no accent font', () => {
    const minimal = THEME_REGISTRY.minimal
    expect(minimal.fonts.accent).toBeUndefined()

    const result = buildThemeCssVars(minimal)
    expect(result).not.toContain('--font-accent')
  })

  it('returns semicolon-separated string', () => {
    const result = buildThemeCssVars(THEME_REGISTRY.minimal)
    const parts = result.split('; ')

    // At least 17 variables (colors + fonts + spacing)
    expect(parts.length).toBeGreaterThanOrEqual(17)
    // Each part should be a CSS custom property
    parts.forEach((part) => {
      expect(part).toMatch(/^--[\w-]+: .+/)
    })
  })
})
