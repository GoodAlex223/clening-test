import type { ThemeId, ThemeConfig } from './types'
import { minimalTheme } from './minimal'
import { boldTheme } from './bold'
import { trustTheme } from './trust'
import { bubblyTheme } from './bubbly'
import { noirTheme } from './noir'

/** All theme configurations keyed by ThemeId */
export const THEME_REGISTRY: Record<ThemeId, ThemeConfig> = {
  minimal: minimalTheme,
  bold: boldTheme,
  trust: trustTheme,
  bubbly: bubblyTheme,
  noir: noirTheme,
}

/** Ordered list of all available theme IDs */
export const THEME_IDS: readonly ThemeId[] = ['minimal', 'bold', 'trust', 'bubbly', 'noir'] as const

/** Default theme when no cookie exists or cookie is invalid */
export const DEFAULT_THEME: ThemeId = 'minimal'

/** Runtime check: is the value a valid ThemeId? */
export function isValidThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && value in THEME_REGISTRY
}

/** Get theme config by ID */
export function getThemeConfig(id: ThemeId): ThemeConfig {
  return THEME_REGISTRY[id]
}

export type { ThemeId, ThemeConfig } from './types'
