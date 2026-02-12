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

// Bold Spark page content components
import BoldHome from '@components/bold/pages/BoldHome.astro'
import BoldServices from '@components/bold/pages/BoldServices.astro'
import BoldAbout from '@components/bold/pages/BoldAbout.astro'
import BoldPricing from '@components/bold/pages/BoldPricing.astro'
import BoldGallery from '@components/bold/pages/BoldGallery.astro'
import BoldContact from '@components/bold/pages/BoldContact.astro'

// Trust Shield page content components
import TrustHome from '@components/trust/pages/TrustHome.astro'
import TrustServices from '@components/trust/pages/TrustServices.astro'
import TrustAbout from '@components/trust/pages/TrustAbout.astro'
import TrustPricing from '@components/trust/pages/TrustPricing.astro'
import TrustGallery from '@components/trust/pages/TrustGallery.astro'
import TrustContact from '@components/trust/pages/TrustContact.astro'

// Future: import Bubbly, Noir page components here

/**
 * Static map of (theme, page) → page content component.
 * Unimplemented themes fall back to Minimal components.
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
    home: BoldHome,
    services: BoldServices,
    about: BoldAbout,
    pricing: BoldPricing,
    gallery: BoldGallery,
    contact: BoldContact,
  },
  trust: {
    home: TrustHome,
    services: TrustServices,
    about: TrustAbout,
    pricing: TrustPricing,
    gallery: TrustGallery,
    contact: TrustContact,
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
