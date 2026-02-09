# TODO

Active tasks and backlog for CleanSpark.

**Last Updated**: 2026-02-09

**Purpose**: Tracks PLANNED and IN-PROGRESS tasks only.
**Completed tasks**: Move to [DONE.md](DONE.md)
**Unprioritized ideas**: See [BACKLOG.md](BACKLOG.md)

---

## In Progress

<!-- Currently active tasks. Limit to 1-3 at a time. -->

_No tasks currently in progress._

---

## Planned

<!-- Defined tasks ready to start. Ordered by priority. -->

### T-002: Content Collections & Schemas

**Priority**: P0 — Critical
**Milestone**: M1
**Depends on**: T-001

- [ ] Define Zod schema for Services collection
- [ ] Define Zod schema for Testimonials collection
- [ ] Define Zod schema for Team collection
- [ ] Define Zod schema for Gallery collection
- [ ] Define Zod schema for Pricing collection
- [ ] Define site config schema (company info, areas, hours)
- [ ] Create sample content entries (at least 1 per collection)
- [ ] Write realistic cleaning business content (6+ services, 8+ testimonials, 4+ team members, 3 pricing tiers)
- [ ] Verify all schemas compile and validate

### T-003: Theme Engine Core

**Priority**: P0 — Critical
**Milestone**: M1
**Depends on**: T-001

- [ ] Create `src/lib/theme-store.ts` — cookie-based theme state
- [ ] Create `src/lib/theme-resolver.ts` — maps theme name to layout
- [ ] Create `src/themes/` config files for all 5 themes (design tokens)
- [ ] Create `src/middleware.ts` — reads theme from cookie on request
- [ ] Create ThemeSwitcher component (interactive island, `client:load`)
- [ ] Implement fallback to "minimal" if invalid theme
- [ ] Test theme persistence across page reloads

### T-004: Page Routes & Base Structure

**Priority**: P1 — High
**Milestone**: M1
**Depends on**: T-001

- [ ] Create `src/pages/index.astro` (Home)
- [ ] Create `src/pages/services.astro`
- [ ] Create `src/pages/about.astro`
- [ ] Create `src/pages/pricing.astro`
- [ ] Create `src/pages/gallery.astro`
- [ ] Create `src/pages/contact.astro`
- [ ] Each page fetches content and delegates to ThemeResolver
- [ ] Create shared SEO/Head component

### T-005: Minimal Zen Theme — Full Implementation

**Priority**: P1 — High
**Milestone**: M2
**Depends on**: T-002, T-003, T-004

- [ ] Create `src/layouts/minimal/MinimalLayout.astro`
- [ ] Create `src/components/minimal/MinimalNav.astro`
- [ ] Create `src/components/minimal/MinimalFooter.astro`
- [ ] Home page: Hero, services preview, testimonials, CTA
- [ ] Services page: Service cards with icons, process steps
- [ ] About page: Story, team grid, values, certifications
- [ ] Pricing page: 3 tiers, comparison table, quote CTA
- [ ] Gallery page: Photo grid, category filter
- [ ] Contact page: Form, map placeholder, service areas
- [ ] Mobile responsive across all pages (320px–1920px)
- [ ] Micro-interactions (hover states, scroll reveals)
- [ ] Lighthouse audit 90+ on all pages

### T-006: Bold Spark Theme — Full Implementation

**Priority**: P2 — Medium
**Milestone**: M3
**Depends on**: T-005

- [ ] Create Bold Spark layout with diagonal sections
- [ ] Parallax scrolling effects on hero and key sections
- [ ] Large expressive typography (neo-mint + orange palette)
- [ ] Dynamic motion on scroll (IntersectionObserver)
- [ ] All 6 pages implemented with Bold Spark design
- [ ] Mobile responsive
- [ ] Theme switch from/to Bold Spark works

### T-007: Trust Shield Theme — Full Implementation

**Priority**: P2 — Medium
**Milestone**: M3
**Depends on**: T-005

- [ ] Create Trust Shield layout with traditional grid
- [ ] Navy + slate grey color scheme
- [ ] Trust badges, certification icons
- [ ] Formal serif headings, structured sections
- [ ] All 6 pages implemented
- [ ] Mobile responsive

### T-008: Bubbly Clean Theme — Full Implementation

**Priority**: P2 — Medium
**Milestone**: M3
**Depends on**: T-005

- [ ] Create Bubbly Clean layout with rounded shapes
- [ ] Soft pastel palette
- [ ] Bouncy CSS animations (keyframes)
- [ ] Handwritten font accents, illustration placeholders
- [ ] All 6 pages implemented
- [ ] Mobile responsive

### T-009: Noir Luxe Theme — Full Implementation

**Priority**: P2 — Medium
**Milestone**: M4
**Depends on**: T-005

- [ ] Create Noir Luxe dark layout
- [ ] Charcoal + champagne gold palette
- [ ] Elegant serif typography, grain texture overlay
- [ ] Sophisticated fade-in animations
- [ ] All 6 pages implemented
- [ ] Mobile responsive

### T-010: Interactive Features

**Priority**: P2 — Medium
**Milestone**: M3–M4
**Depends on**: T-005

- [ ] Contact form with client-side validation (Zod)
- [ ] Gallery filter by service category (interactive island)
- [ ] Before/after image slider component
- [ ] Smooth scroll navigation
- [ ] View Transitions API for page transitions

### T-011: Testing & Quality

**Priority**: P2 — Medium
**Milestone**: M4

- [ ] Playwright E2E: Test all 6 pages × 5 themes = 30 test cases
- [ ] Playwright: Theme switching roundtrip test
- [ ] Playwright: Mobile viewport tests
- [ ] Vitest: Theme resolver unit tests
- [ ] Vitest: Content schema validation tests
- [ ] Accessibility audit (axe-core or Lighthouse)
- [ ] Cross-browser testing matrix

### T-012: Deployment & Launch

**Priority**: P3 — Normal
**Milestone**: M5
**Depends on**: T-011

- [ ] Configure Vercel deployment
- [ ] Set up custom domain (if available)
- [ ] Generate Lighthouse performance report
- [ ] Create README with screenshots of all 5 themes
- [ ] Write portfolio case study
- [ ] Create social share images per theme
- [ ] Final documentation review

---

## Blocked

<!-- Tasks waiting on external dependencies or decisions -->

_No blocked tasks._

---

## Spawned

<!-- Tasks generated from completed work. Include origin for traceability. -->

_No spawned tasks yet._

---

## Notes

- Tasks grouped by status, sorted by priority within each group
- When a task is done: remove from here, add to [DONE.md](DONE.md)
- Significant tasks should have a plan in `plans/`
- New ideas without clear priority go to [BACKLOG.md](BACKLOG.md)
- T-006, T-007, T-008 can be developed in parallel (independent themes)
