import type { ThemeId } from '@themes/types'

import MinimalLayout from '@layouts/minimal/MinimalLayout.astro'
import BoldLayout from '@layouts/bold/BoldLayout.astro'
import TrustLayout from '@layouts/trust/TrustLayout.astro'
import BubblyLayout from '@layouts/bubbly/BubblyLayout.astro'
import NoirLayout from '@layouts/noir/NoirLayout.astro'

/**
 * Static map of theme ID to layout component.
 * Each layout is a complete Astro component that wraps page content.
 */
const LAYOUT_MAP = {
  minimal: MinimalLayout,
  bold: BoldLayout,
  trust: TrustLayout,
  bubbly: BubblyLayout,
  noir: NoirLayout,
} as const satisfies Record<ThemeId, unknown>

/** Resolve a theme ID to its layout component */
export function resolveLayout(themeId: ThemeId): (typeof LAYOUT_MAP)[ThemeId] {
  return LAYOUT_MAP[themeId]
}
