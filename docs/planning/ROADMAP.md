# Roadmap

Long-term vision and major releases for CleanSpark.

**Last Updated**: 2026-02-09

---

## Vision

CleanSpark becomes a standout portfolio piece that demonstrates deep frontend architecture skills through a real-world cleaning business website with 5 radically different design themes. The project showcases not just visual variety but engineering excellence — type-safe content systems, multi-theme architecture, performance optimization, and production-quality code.

---

## Current Phase

**Phase**: MVP Foundation
**Focus**: Project scaffolding, core architecture, first theme implementation
**Timeline**: Phase 1 of 4

---

## Releases

### v0.1 — Foundation (Target: Phase 1)

**Theme**: Project scaffolding + Theme Engine + First Theme
**Status**: Not Started

**Goals**:
- [x] Project planning and documentation
- [ ] Astro project scaffolding with TypeScript + Tailwind
- [ ] Content Collections with Zod schemas (services, testimonials, team, gallery, pricing)
- [ ] Theme engine (store, resolver, persister)
- [ ] All 6 page routes created
- [ ] **Minimal Zen** theme fully implemented (all 6 pages)
- [ ] ThemeSwitcher component (interactive island)
- [ ] Basic SEO (meta tags, Open Graph, sitemap)
- [ ] Mobile-responsive across all pages
- [ ] Lighthouse score 90+ on all metrics

### v0.2 — Design Expansion (Target: Phase 2)

**Theme**: 3 more themes implemented
**Status**: Not Started

**Goals**:
- [ ] **Bold Spark** theme — all 6 pages with parallax, dynamic motion
- [ ] **Trust Shield** theme — all 6 pages with corporate grid, trust badges
- [ ] **Bubbly Clean** theme — all 6 pages with illustrations, bouncy animations
- [ ] Theme transition animations (View Transitions API)
- [ ] Cross-theme regression testing
- [ ] Gallery filter interactivity
- [ ] Contact form with validation

### v0.3 — Polish & Final Theme (Target: Phase 3)

**Theme**: Final theme + production polish
**Status**: Not Started

**Goals**:
- [ ] **Noir Luxe** theme — all 6 pages with dark elegance, grain overlay
- [ ] Accessibility audit (WCAG 2.1 AA on all themes)
- [ ] Performance optimization (image lazy loading, font subsetting)
- [ ] Before/after slider component in Gallery
- [ ] Animated page transitions between routes
- [ ] Error pages (404, 500) styled per theme
- [ ] Full E2E test suite with Playwright
- [ ] Loading states and skeleton screens

### v1.0 — Launch (Target: Phase 4)

**Theme**: Deployment, documentation, portfolio integration
**Status**: Not Started

**Goals**:
- [ ] Deploy to Vercel
- [ ] Custom domain setup
- [ ] README with screenshots of all 5 themes
- [ ] Portfolio case study writeup
- [ ] Performance report (Lighthouse, WebPageTest)
- [ ] Social share images per theme
- [ ] Analytics integration (privacy-respecting)
- [ ] Final cross-browser testing (Chrome, Firefox, Safari, Edge)

---

## Ongoing

- **Performance**: Every page must score 90+ on Lighthouse
- **Accessibility**: WCAG 2.1 AA compliance across all themes
- **Mobile-first**: Every component designed for mobile first, enhanced for desktop
- **Content quality**: Realistic cleaning business content (not lorem ipsum)
- **Type safety**: Zero `any` types, full Zod validation on content

---

## Principles

1. **Content-Design Separation**: Business content NEVER lives inside theme components. Content Collections are the single source of truth.
2. **Theme Independence**: Adding or removing a theme should not affect other themes or break the site.
3. **Progressive Enhancement**: The site must be fully readable with JavaScript disabled. JS only enhances interactivity.
4. **Real-World Authenticity**: The cleaning business content should feel real — realistic services, prices, testimonials — not placeholder text.
5. **Performance Budget**: <100KB JS total, <1s FCP, 90+ Lighthouse on all metrics.

---

*See [TODO.md](TODO.md) for current tactical tasks.*
*See [MILESTONES.md](MILESTONES.md) for key dates.*
*See [BACKLOG.md](BACKLOG.md) for unprioritized ideas.*
