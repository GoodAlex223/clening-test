# Roadmap

Long-term vision and major releases for CleanSpark.

**Last Updated**: 2026-02-17

---

## Vision

CleanSpark becomes a standout portfolio piece that demonstrates deep frontend architecture skills through a real-world cleaning business website with 5 radically different design themes. The project showcases not just visual variety but engineering excellence — type-safe content systems, multi-theme architecture, performance optimization, and production-quality code.

---

## Current Phase

**Phase**: Project Freeze (v1.0 Complete)
**Focus**: Documentation audit, backlog triage, v1.0 release tagging
**Timeline**: Freeze week (Feb 16–22, 2026)

---

## Releases

### v0.1 — Foundation (Complete)

**Theme**: Project scaffolding + Theme Engine + First Theme
**Status**: Complete (2026-02-11)

**Goals**:

- [x] Project planning and documentation
- [x] Astro project scaffolding with TypeScript + Tailwind
- [x] Content Collections with Zod schemas (services, testimonials, team, gallery, pricing)
- [x] Theme engine (store, resolver, persister)
- [x] All 6 page routes created
- [x] **Minimal Zen** theme fully implemented (all 6 pages)
- [x] ThemeSwitcher component (interactive island)
- [x] Basic SEO (meta tags, Open Graph, sitemap)
- [x] Mobile-responsive across all pages
- [x] Lighthouse score 100 on all metrics

**Tasks**: T-001 Project Scaffolding, T-002 Content Collections, T-003 Theme Engine, T-004 Page Routes, T-005 Minimal Zen Theme, T-011a Lighthouse Audit

### v0.2 — Design Expansion (Complete)

**Theme**: 3 more themes implemented
**Status**: Complete (2026-02-12)

**Goals**:

- [x] **Bold Spark** theme — all 6 pages with geometric CSS art, offset shadows, clip-paths
- [x] **Trust Shield** theme — all 6 pages with corporate grid, trust badges, CSS-only shield
- [x] **Bubbly Clean** theme — all 6 pages with floating bubbles, bouncy animations, wave dividers
- [x] Cross-theme accessibility testing (WCAG 2.1 AA)
- [x] Gallery filter interactivity
- [x] Contact form with Zod validation

**Tasks**: T-006 Bold Spark, T-007 Trust Shield, T-008 Bubbly Clean

### v0.3 — Polish & Final Theme (Complete)

**Theme**: Final theme + production polish
**Status**: Complete (2026-02-13)

**Goals**:

- [x] **Noir Luxe** theme — all 6 pages with dark elegance, film grain overlay, gold diamond art
- [x] Accessibility audit passing (WCAG 2.1 AA on all 30 theme/page combinations)
- [x] Before/after slider component in Gallery
- [x] View Transitions (ClientRouter) between pages
- [x] Full E2E test suite with Playwright (884 tests across 4 browsers)
- [x] Unit tests with Vitest (78 tests)
- [x] Scroll-spy navigation, smooth scrolling, scroll-reveal animations

**Tasks**: T-009 Noir Luxe, T-010 Interactive Features, T-011 Testing & Quality

### v1.0 — Launch (Complete)

**Theme**: Deployment, documentation, portfolio integration
**Status**: Complete (2026-02-17)

**Goals**:

- [x] Deploy to Vercel (SSR, serverless)
- [x] README with screenshots of all 5 themes
- [x] Portfolio case study writeup
- [x] Social share images per theme (5 theme-specific OG images)
- [x] Performance: 100/100/100/100 Lighthouse (mobile and desktop)
- [x] Cross-browser testing (Chrome, Firefox, WebKit, Mobile Chrome — 4 browsers)

**Tasks**: T-012 Deployment & Launch, T-F01 README Screenshots, T-F02 Portfolio Case Study, T-F03 OG/Social Share Images

---

## Ongoing

- **Performance**: Every page scores 100 on Lighthouse (mobile and desktop)
- **Accessibility**: WCAG 2.1 AA compliance across all themes, verified with axe-core
- **Mobile-first**: Every component designed for mobile first, enhanced for desktop
- **Content quality**: Realistic cleaning business content (not lorem ipsum)
- **Type safety**: Zero `any` types, full Zod validation on content

---

## Principles

1. **Content-Design Separation**: Business content NEVER lives inside theme components. Content Collections are the single source of truth.
2. **Theme Independence**: Adding or removing a theme should not affect other themes or break the site.
3. **Progressive Enhancement**: The site must be fully readable with JavaScript disabled. JS only enhances interactivity.
4. **Real-World Authenticity**: The cleaning business content should feel real — realistic services, prices, testimonials — not placeholder text.
5. **Performance Budget**: <100KB JS total, <1s FCP desktop, 100 Lighthouse on all metrics.

---

_See [TODO.md](TODO.md) for current tactical tasks._
_See [MILESTONES.md](MILESTONES.md) for key dates._
_See [BACKLOG.md](BACKLOG.md) for unprioritized ideas._
