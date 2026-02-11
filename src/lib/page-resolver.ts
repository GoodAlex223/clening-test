import type { ThemeId } from '@themes/types'

/** Page names matching route files */
export type PageName = 'home' | 'services' | 'about' | 'pricing' | 'gallery' | 'contact'

// Minimal Zen page content components
import MinimalHome from '@components/minimal/pages/MinimalHome.astro'
import MinimalServices from '@components/minimal/pages/MinimalServices.astro'
import MinimalAbout from '@components/minimal/pages/MinimalAbout.astro'
import MinimalPricing from '@components/minimal/pages/MinimalPricing.astro'
import MinimalGallery from '@components/minimal/pages/MinimalGallery.astro'
import MinimalContact from '@components/minimal/pages/MinimalContact.astro'

// Future: import Bold, Trust, Bubbly, Noir page components here

/**
 * Static map of (theme, page) → page content component.
 * All unimplemented themes fall back to Minimal components.
 * CSS custom properties still provide visual distinction per theme.
 */
const PAGE_CONTENT_MAP = {
  minimal: {
    home: MinimalHome,
    services: MinimalServices,
    about: MinimalAbout,
    pricing: MinimalPricing,
    gallery: MinimalGallery,
    contact: MinimalContact,
  },
  bold: {
    home: MinimalHome,
    services: MinimalServices,
    about: MinimalAbout,
    pricing: MinimalPricing,
    gallery: MinimalGallery,
    contact: MinimalContact,
  },
  trust: {
    home: MinimalHome,
    services: MinimalServices,
    about: MinimalAbout,
    pricing: MinimalPricing,
    gallery: MinimalGallery,
    contact: MinimalContact,
  },
  bubbly: {
    home: MinimalHome,
    services: MinimalServices,
    about: MinimalAbout,
    pricing: MinimalPricing,
    gallery: MinimalGallery,
    contact: MinimalContact,
  },
  noir: {
    home: MinimalHome,
    services: MinimalServices,
    about: MinimalAbout,
    pricing: MinimalPricing,
    gallery: MinimalGallery,
    contact: MinimalContact,
  },
} as const satisfies Record<ThemeId, Record<PageName, unknown>>

/** Resolve a theme + page pair to the page content component. */
export function resolvePageContent<P extends PageName>(
  themeId: ThemeId,
  pageName: P,
): (typeof PAGE_CONTENT_MAP)[ThemeId][P] {
  return PAGE_CONTENT_MAP[themeId][pageName] as (typeof PAGE_CONTENT_MAP)[ThemeId][P]
}
