import { describe, it, expect } from 'vitest'
import { THEME_REGISTRY, THEME_IDS, DEFAULT_THEME, getThemeConfig } from '@themes/index'
import type { ThemeConfig } from '@themes/types'

describe('THEME_REGISTRY', () => {
  it('contains exactly 5 themes', () => {
    expect(Object.keys(THEME_REGISTRY)).toHaveLength(5)
  })

  it('has keys matching THEME_IDS', () => {
    expect(Object.keys(THEME_REGISTRY).sort()).toEqual([...THEME_IDS].sort())
  })
})

describe('THEME_IDS', () => {
  it('contains exactly 5 elements', () => {
    expect(THEME_IDS).toHaveLength(5)
  })

  it('contains all expected theme IDs', () => {
    expect(THEME_IDS).toContain('minimal')
    expect(THEME_IDS).toContain('bold')
    expect(THEME_IDS).toContain('trust')
    expect(THEME_IDS).toContain('bubbly')
    expect(THEME_IDS).toContain('noir')
  })
})

describe('DEFAULT_THEME', () => {
  it('is "minimal"', () => {
    expect(DEFAULT_THEME).toBe('minimal')
  })

  it('exists in THEME_REGISTRY', () => {
    expect(THEME_REGISTRY[DEFAULT_THEME]).toBeDefined()
  })
})

describe('getThemeConfig', () => {
  it.each([...THEME_IDS])('returns config for "%s" with correct id', (themeId) => {
    const config = getThemeConfig(themeId)
    expect(config.id).toBe(themeId)
  })
})

describe('Theme config schema validation', () => {
  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/

  it.each([...THEME_IDS])('%s has valid structure', (themeId) => {
    const config: ThemeConfig = THEME_REGISTRY[themeId]

    // Identity
    expect(config.id).toBe(themeId)
    expect(config.displayName).toBeTruthy()
    expect(config.description).toBeTruthy()

    // Colors — all hex
    expect(config.colors.background).toMatch(hexColorRegex)
    expect(config.colors.surface).toMatch(hexColorRegex)
    expect(config.colors.text).toMatch(hexColorRegex)
    expect(config.colors.textMuted).toMatch(hexColorRegex)
    expect(config.colors.primary).toMatch(hexColorRegex)
    expect(config.colors.secondary).toMatch(hexColorRegex)
    expect(config.colors.accent).toMatch(hexColorRegex)
    expect(config.colors.cta).toMatch(hexColorRegex)
    expect(config.colors.ctaText).toMatch(hexColorRegex)

    // Fonts
    expect(config.fonts.heading).toBeTruthy()
    expect(config.fonts.body).toBeTruthy()

    // Spacing
    expect(config.spacing.borderRadius.sm).toBeTruthy()
    expect(config.spacing.borderRadius.md).toBeTruthy()
    expect(config.spacing.borderRadius.lg).toBeTruthy()
    expect(config.spacing.borderRadius.full).toBeTruthy()
    expect(config.spacing.sectionPadding).toBeTruthy()
    expect(config.spacing.containerMax).toBeTruthy()
  })

  it('all themes have unique display names', () => {
    const displayNames = THEME_IDS.map((id) => THEME_REGISTRY[id].displayName)
    expect(new Set(displayNames).size).toBe(displayNames.length)
  })

  it('all themes have unique primary colors', () => {
    const primaryColors = THEME_IDS.map((id) => THEME_REGISTRY[id].colors.primary)
    expect(new Set(primaryColors).size).toBe(primaryColors.length)
  })
})
