# Backlog

Ideas and tasks not yet prioritized for active development.

**Last Updated**: 2026-02-11

**Purpose**: Holding area for unprioritized ideas and future work.
**Active tasks**: See [TODO.md](TODO.md)
**Completed work**: See [DONE.md](DONE.md)
**Strategic direction**: See [ROADMAP.md](ROADMAP.md)

---

## Feature Ideas

### Content & Pages

| Idea                | Description                                        | Value                                      | Added      |
| ------------------- | -------------------------------------------------- | ------------------------------------------ | ---------- |
| Blog section        | Add a blog/tips page with cleaning advice articles | SEO boost, content marketing demo          | 2026-02-09 |
| FAQ page            | Dedicated FAQ with accordion UI per theme          | Reduces contact form load, good UX pattern | 2026-02-09 |
| Service area pages  | Individual pages per neighborhood/city served      | Local SEO, demonstrates dynamic routing    | 2026-02-09 |
| Booking integration | Embed Calendly or custom booking widget            | Real-world functionality demo              | 2026-02-09 |
| Live chat widget    | Floating chat button (mock or real)                | Shows integration skills                   | 2026-02-09 |

### Design & UX

| Idea                      | Description                               | Value                              | Added      |
| ------------------------- | ----------------------------------------- | ---------------------------------- | ---------- |
| Dark mode per theme       | Add dark/light toggle within each theme   | Accessibility, popular feature     | 2026-02-09 |
| Animated page loader      | Custom loading animation per theme        | Polish, attention to detail        | 2026-02-09 |
| Scroll progress indicator | Progress bar showing page scroll position | UX enhancement, micro-interaction  | 2026-02-09 |
| Parallax hero backgrounds | Depth effect on hero section images       | Visual impact for Bold Spark theme | 2026-02-09 |
| Cursor effects            | Custom cursor styling per theme           | Premium feel, especially Noir Luxe | 2026-02-09 |
| Skeleton loading screens  | Themed skeleton placeholders during load  | Professional loading UX            | 2026-02-09 |

### Technical

| Idea                  | Description                                  | Value                              | Added      |
| --------------------- | -------------------------------------------- | ---------------------------------- | ---------- |
| CMS integration       | Add Decap CMS or similar for content editing | Shows CMS integration skills       | 2026-02-09 |
| i18n (multi-language) | Add Spanish/French versions                  | Demonstrates i18n in Astro         | 2026-02-09 |
| PWA support           | Service worker, offline mode, install prompt | Progressive Web App skills         | 2026-02-09 |
| RSS feed              | Auto-generated RSS for blog (if added)       | Standard feature for content sites | 2026-02-09 |
| Sitemap generation    | Auto-generate XML sitemap                    | SEO essential                      | 2026-02-09 |
| Web Vitals monitoring | Real-time Core Web Vitals dashboard          | Performance awareness              | 2026-02-09 |

---

## Enhancements

Improvements to existing functionality.

### Post-MVP Theme Enhancements

| Enhancement          | Theme        | Description                               | Added      |
| -------------------- | ------------ | ----------------------------------------- | ---------- |
| 3D card effects      | Bold Spark   | CSS 3D transforms on service cards        | 2026-02-09 |
| Morphing transitions | All          | Animate between theme layouts smoothly    | 2026-02-09 |
| Typed text animation | Minimal Zen  | TypeWriter effect on hero headline        | 2026-02-09 |
| Particle background  | Noir Luxe    | Subtle particle.js-style background       | 2026-02-09 |
| SVG illustrations    | Bubbly Clean | Custom SVG cleaning illustrations         | 2026-02-09 |
| Testimonial carousel | All          | Animated testimonial slider with autoplay | 2026-02-09 |

---

## Technical Debt

Known issues that should be addressed eventually.

| Item | Impact | Effort | Added |
| ---- | ------ | ------ | ----- |
| Mobile menu uses inline styles instead of CSS classes | Low — works correctly, just less elegant | Low | 2026-02-11 |
| ThemeSwitcher `client:load` warning in dev server | None — cosmetic only, doesn't affect build | Low | 2026-02-11 |

---

## Research Topics

Areas requiring investigation before implementation.

| Topic                        | Question                                       | Why Important                          | Added      |
| ---------------------------- | ---------------------------------------------- | -------------------------------------- | ---------- |
| Astro View Transitions       | Best patterns for multi-layout transitions?    | Core UX for theme switching            | 2026-02-09 |
| Font subsetting              | How to subset Google Fonts for Astro?          | Performance — fonts are heaviest asset | 2026-02-09 |
| Image optimization           | Astro Image vs sharp vs manual optimization?   | Performance critical for gallery page  | 2026-02-09 |
| Cookie vs localStorage       | SSR implications of cookie-based theme store?  | Architecture decision validation       | 2026-02-09 |
| Playwright visual regression | How to do screenshot comparison in Playwright? | Ensure themes don't break each other   | 2026-02-09 |

---

## Spawned Improvements

<!-- Items generated from completed task reviews. Keep origin for traceability. -->

### 2026-02-09 From: T-001 Project Scaffolding

**Origin**: docs/planning/plans/2026-02-09_project-scaffolding.md

- [ ] Add `@astrojs/sitemap` integration for auto-generated sitemap and update robots.txt dynamically
- [ ] Configure Vitest path alias resolution to mirror tsconfig.json aliases for unit tests
- [ ] Add `.editorconfig` for cross-editor consistency (tabs/spaces, line endings)
- [ ] Consider adding Husky + lint-staged for pre-commit hooks (referenced in PROJECT.md but not configured)

### 2026-02-09 From: T-001 Code Review

**Origin**: PR #1 code review

- [ ] Update scaffolding plan table (Step 1.3) to reflect actual config files — table references `tailwind.config.ts` and `.eslintrc.cjs` but implementation uses CSS-first Tailwind v4 and `eslint.config.js`
- [ ] Document Tailwind v4 CSS-first `@theme` approach for multi-theme system — plan assumes traditional config file but v4 uses CSS directives instead

### 2026-02-09 From: T-002 Content Collections

**Origin**: docs/archive/plans/2026-02-09_content-collections.md

- [ ] Add content schema unit tests (Vitest) — validate sample data against Zod schemas programmatically, test edge cases like empty arrays and boundary ratings
- [ ] Add image optimization pipeline — integrate Astro `<Image>` with sharp for responsive sizes and WebP/AVIF when real photos replace placeholder paths

### 2026-02-09 From: T-002 Code Review

**Origin**: PR #2 code review

- [ ] Fix DONE.md relative path pattern for T-001 entry — same `../../archive/` bug exists in the T-001 plan link (should be `../archive/`)
- [ ] Add CI/CD workflow (GitHub Actions) — no checks configured yet; add linting, type checking, and build verification on PRs

### 2026-02-10 From: T-004 Page Routes & Base Structure

**Origin**: docs/archive/plans/2026-02-10_t-004-page-routes.md

- [ ] Add gallery filter URL state persistence — persist active filter in URL search params for shareable filtered views
- [ ] Create `/api/contact` endpoint — contact form currently shows client-side confirmation only, needs backend (email service or serverless)
- [ ] Extract FAQ content to Content Collection — pricing page FAQ is hardcoded, could be a JSON collection if FAQ grows

### 2026-02-10 From: T-004 Code Review

**Origin**: PR #4 code review

- [ ] Move hardcoded about page content to Content Collections — company story, values, and stats are inline in about.astro instead of in collections
- [ ] Clean up BaseLayout dead props — title/description props and fallback rendering path are unused after SEO slot migration; remove or document as intentional backwards-compat

### 2026-02-10 From: T-003 Theme Engine Core

**Origin**: docs/archive/plans/2026-02-10_t-003-theme-engine.md

- [ ] Add unit tests for theme-store.ts — test cookie parsing edge cases (malformed cookies, missing values, empty strings)
- [ ] Add unit tests for isValidThemeId() — verify type guard with valid/invalid inputs
- [ ] Add E2E test for theme switching roundtrip — select theme, verify cookie, reload, verify correct layout
- [ ] Enhance ThemeSwitcher keyboard navigation — add arrow-key navigation between theme options for a11y
- [ ] Integrate View Transitions with theme switch — smooth cross-fade instead of hard reload (after T-010)

### 2026-02-11 From: T-005 Minimal Zen Theme

**Origin**: docs/archive/plans/2026-02-11_t-005-minimal-zen.md

- [ ] Investigate Astro `:global()` pseudo-function for JS-toggled CSS modifiers — find CSS-only solution to replace inline styles for mobile menu overlay
- [ ] Extract shared button/form/field styles into utility components — `.btn`, `.field`, `.form` duplicated across MinimalContact, MinimalPricing, MinimalHome
- [ ] Add contact form API endpoint — currently client-side only confirmation, needs backend (email service or serverless function)
- [ ] Integrate Astro `<Image>` component — gallery and team use placeholder paths, need responsive sizes and WebP/AVIF when real assets available

---

## Rejected Ideas

Ideas considered but decided against. Keep reasoning for future reference.

| Idea                        | Reason for Rejection                                                | Date       |
| --------------------------- | ------------------------------------------------------------------- | ---------- |
| React SPA                   | Already have Next.js in portfolio, no SEO benefits for content site | 2026-02-09 |
| WordPress                   | Not a developer skills showcase, limits custom architecture         | 2026-02-09 |
| Server-side theme switching | Adds SSR complexity, cookie + page reload is simpler and sufficient | 2026-02-09 |
| Separate repos per theme    | Fragments the project, harder to demonstrate architecture skills    | 2026-02-09 |

---

## Promotion Criteria

Move items to [TODO.md](TODO.md) when:

- Aligns with current [ROADMAP.md](ROADMAP.md) phase
- Value clearly exceeds effort
- Dependencies are resolved
- Capacity exists to complete
