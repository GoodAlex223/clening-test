/**
 * Scroll-spy utility — highlights the active nav link based on scroll position.
 * Shared across all 5 theme Nav components.
 * Compatible with View Transitions (call on astro:page-load).
 */

interface ScrollSpyOptions {
  /** CSS selector for nav link elements */
  linkSelector: string
  /** Class name to add to the active link */
  activeClass: string
  /** Offset in pixels from top to trigger active state (accounts for sticky nav) */
  offset?: number
}

export function initScrollSpy(options: ScrollSpyOptions): (() => void) | undefined {
  const { linkSelector, activeClass, offset = 120 } = options

  const links = document.querySelectorAll<HTMLAnchorElement>(linkSelector)
  if (links.length === 0) return undefined

  // Build map of section ID → link element for current-page anchor links
  const currentPath = window.location.pathname
  const sectionLinks = new Map<string, HTMLAnchorElement[]>()

  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return

    // Match links pointing to the current page (e.g., "/" on home, "/services" on services)
    const linkPath = href.split('#')[0] || '/'
    if (linkPath === currentPath || (linkPath === '/' && currentPath === '/')) {
      const hash = href.split('#')[1]
      if (hash) {
        const existing = sectionLinks.get(hash) ?? []
        existing.push(link)
        sectionLinks.set(hash, existing)
      }
    }
  })

  // Also match route-based navigation for current page indicator
  links.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return
    const linkPath = href.split('#')[0] || '/'
    if (linkPath === currentPath) {
      link.classList.add(activeClass)
    }
  })

  // If no anchor-based sections to spy on, just return the cleanup
  if (sectionLinks.size === 0) return undefined

  const sections: { id: string; el: HTMLElement; links: HTMLAnchorElement[] }[] = []
  sectionLinks.forEach((sectionLinkEls, id) => {
    const el = document.getElementById(id)
    if (el) {
      sections.push({ id, el, links: sectionLinkEls })
    }
  })

  if (sections.length === 0) return undefined

  let ticking = false

  function updateActiveLink(): void {
    const scrollPos = window.scrollY + offset
    let activeSection: (typeof sections)[0] | null = null

    for (const section of sections) {
      if (section.el.offsetTop <= scrollPos) {
        activeSection = section
      }
    }

    // Remove active from all section links
    sections.forEach((s) => {
      s.links.forEach((l) => l.classList.remove(activeClass))
    })

    // Add active to current section's links
    if (activeSection) {
      activeSection.links.forEach((l) => l.classList.add(activeClass))
    }
  }

  function onScroll(): void {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  updateActiveLink()

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll)
  }
}
