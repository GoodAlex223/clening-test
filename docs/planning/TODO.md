# TODO

Active tasks and backlog for CleanSpark.

**Last Updated**: 2026-02-12

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
