# Backlog

Ideas and tasks not yet prioritized for active development.

**Last Updated**: 2026-02-22

**Purpose**: Holding area for unprioritized ideas and future work.
**Active tasks**: See [TODO.md](TODO.md)
**Completed work**: See [DONE.md](DONE.md)
**Strategic direction**: See [ROADMAP.md](ROADMAP.md)

> **FROZEN** as of 2026-02-20. This project is in development freeze.
> No new items will be added. Existing items are categorized for reference
> if development resumes in the future.

---

## Post-Freeze Priority

High-value items worth implementing if development resumes. These improve portfolio presentation, production readiness, or code quality significantly.

### Infrastructure & DevOps

- [ ] **GitHub Actions CI/CD + Lighthouse** — Add CI workflow with linting, type checking, build verification on PRs; include Lighthouse step to fail if scores drop below 90 *(consolidated from T-002, T-011a, T-012)*
- [ ] **`@astrojs/sitemap` integration** — Auto-generated sitemap + dynamic robots.txt update *(from T-001)*
- [ ] **OG image validation in CI** — Build step to verify all 5 OG images exist and meet 1200×630 dimensions *(from T-F03)*
- [ ] **Automated documentation drift detection** — CI step or script that checks key documentation claims (file paths, feature lists, config files) against the actual codebase *(from T-F04)*
- [ ] **Automated release pipeline** — GitHub Actions workflow to auto-create releases on tag push, including changelog generation from conventional commits *(from T-F06)*
- [ ] **Semantic versioning enforcement** — CI check that validates `package.json` version matches the latest git tag *(from T-F06)*

### Code Quality & DRY

- [ ] **Shared contact form utility** — Extract `initContactForm()` (~60 lines, duplicated 5x) to `src/lib/contact-form.ts` with config parameter; eliminates ~300 lines of duplication *(from T-010)*
- [ ] **Shared scroll-reveal utility** — Extract IntersectionObserver script + CSS (~20 lines JS + ~45 lines CSS, duplicated 5x) to `src/lib/scroll-reveal.ts` accepting options (threshold, rootMargin, translateY, timing); eliminates ~100 lines *(from T-010)*
- [ ] **Shared SectionLabel component + contrast fix** — `.section-label` styles duplicated across Bold, Bubbly, Noir themes; `var(--color-secondary)` failed WCAG AA contrast 4 times (Minimal, Bold, Trust, Bubbly); shared component with accessible defaults would prevent recurrence *(consolidated from T-006, T-007, T-008)*
- [ ] **Shared button/form/field styles** — `.btn`, `.field`, `.form` duplicated across all 5 themes; extract shared base styles *(consolidated from T-005, T-006, T-007)*

### Content & Features

- [ ] **Contact form backend** — Create `/api/contact` endpoint (email service or serverless function); currently client-side only confirmation *(consolidated from T-004, T-005, T-008)*
- [ ] **Astro `<Image>` optimization** — Replace plain `<img>` tags with Astro Image component for responsive sizes and WebP/AVIF; add `width`/`height` attributes to gallery images for CLS improvement *(consolidated from T-002, T-005, T-011a)*
- [ ] **About/FAQ content to Content Layer API** — Move hardcoded about page content (story, values, stats) and pricing FAQ (duplicated across 5 themes) to Content Layer API collections *(consolidated from T-004, T-005)*
- [ ] **Per-page OG images** — Generate 30 images (5 themes × 6 pages) for page-specific social previews *(from T-F03)*

### Testing

- [ ] **Content schema unit tests** — Validate sample data against Zod schemas programmatically, test edge cases *(from T-002)*
- [ ] **Visual regression testing** — Add Playwright screenshot comparison tests to catch visual regressions across themes *(from T-011)*

---

## Deferred Indefinitely

Nice-to-have items. Low priority for a frozen portfolio piece — kept for reference.

### Feature Ideas

| Idea | Description | Value | Origin |
|------|-------------|-------|--------|
| Blog section | Blog/tips page with cleaning advice articles | SEO boost, content marketing demo | 2026-02-09 |
| FAQ page | Dedicated FAQ with accordion UI per theme | Reduces contact form load | 2026-02-09 |
| Service area pages | Individual pages per neighborhood/city | Local SEO, dynamic routing demo | 2026-02-09 |
| Booking integration | Embed Calendly or custom booking widget | Real-world functionality demo | 2026-02-09 |
| Live chat widget | Floating chat button (mock or real) | Shows integration skills | 2026-02-09 |
| Interactive case study page | Convert CASE_STUDY.md to live `/case-study` route | Theme-aware styling | T-F02 |
| Architecture diagram images | Replace ASCII art with SVG/Mermaid diagrams | Better GitHub rendering | T-F02 |
| Metrics dashboard section | Visual metrics comparison in case study | Data visualization | T-F02 |

### Design & UX

| Idea | Description | Value | Origin |
|------|-------------|-------|--------|
| Dark mode per theme | Dark/light toggle within each theme | Accessibility, popular feature | 2026-02-09 |
| Animated page loader | Custom loading animation per theme | Polish, attention to detail | 2026-02-09 |
| Scroll progress indicator | Progress bar showing page scroll position | Micro-interaction | 2026-02-09 |
| Parallax hero backgrounds | Depth effect on hero section images | Visual impact for Bold Spark | 2026-02-09 |
| Cursor effects | Custom cursor styling per theme | Premium feel, especially Noir | 2026-02-09 |
| Skeleton loading screens | Themed skeleton placeholders during load | Professional loading UX | 2026-02-09 |

### Technical

| Idea | Description | Value | Origin |
|------|-------------|-------|--------|
| CMS integration | Add Decap CMS or similar | Shows CMS skills | 2026-02-09 |
| i18n (multi-language) | Add Spanish/French versions | Demonstrates i18n in Astro | 2026-02-09 |
| PWA support | Service worker, offline mode, install | Progressive Web App skills | 2026-02-09 |
| RSS feed | Auto-generated RSS for blog (if added) | Standard content site feature | 2026-02-09 |
| Web Vitals monitoring | Real-time Core Web Vitals dashboard | Performance awareness | 2026-02-09 |
| Custom domain | Set up custom domain when available | Production polish | T-012 |
| WebP OG images with PNG fallback | ~60% file size reduction for OG images | Performance | T-F03 |

### Theme Enhancements

| Enhancement | Theme | Description | Origin |
|-------------|-------|-------------|--------|
| 3D card effects | Bold Spark | CSS 3D transforms on service cards | 2026-02-09 |
| Morphing transitions | All | Animate between theme layouts smoothly | 2026-02-09 |
| Typed text animation | Minimal Zen | TypeWriter effect on hero headline | 2026-02-09 |
| Particle background | Noir Luxe | Subtle particle.js-style background | 2026-02-09 |
| SVG illustrations | Bubbly Clean | Custom SVG cleaning illustrations | 2026-02-09 |
| Testimonial carousel | All | Animated testimonial slider with autoplay | 2026-02-09 |
| Real parallax scroll | Bold Spark | True parallax (different scroll speeds) on hero | T-006 |
| View Transitions theme switch | All | Smooth cross-fade instead of hard reload (architectural constraint: requires all 5 theme CSS loaded simultaneously) | T-003 |

### Process Improvements (from T-F06 Code Review)

| Item | Impact | Origin |
|------|--------|--------|
| Commit message on `baca26a` claims T-F07 removed from Planned but T-F07 is still present in TODO.md | Low — misleading git history, no functional impact | T-F06 CR |
| Plan execution log entries ("Smoke Test Complete", "Version Bump") lack mandatory Sub-Item Complete format (Results, Lessons, Problems, Improvements, Tech Debt, Related Changes) | Low — plan is still in-progress, can be corrected before archival | T-F06 CR |

### Documentation Bugs (from T-F05 Code Review)

| Item | Impact | Origin |
|------|--------|--------|
| DONE.md CASE_STUDY.md line count says 162, actual is 161 | Low — off-by-one in T-F02 completion entry | T-F05 CR |
| DONE.md T-F05 entry claims docs/README.md and archive/README.md were updated — neither was modified | Low — copy-paste from T-F04 | T-F05 CR |
| docs/README.md has 2 broken links to `planning/plans/2026-02-09_theme-designs.md` after archival move | Medium — broken navigation links | T-F05 CR |
| CLAUDE.md still says "30 theme/page combinations" in Detected Patterns after Testing Infrastructure removed the count | Low — stale count reference | T-F05 CR |
| "Fix auto-updated by memory-updater claim" backlog item dropped without resolution | Low — misleading provenance in archived plan | T-F05 CR |

### Minor Polish & Tech Debt

| Item | Impact | Origin |
|------|--------|--------|
| Mobile menu uses inline styles instead of CSS classes | Low — works correctly, just less elegant | T-005 |
| ThemeSwitcher arrow-key navigation | Low — Tab navigation works, roving tabindex would be ideal | T-003 |
| Shared wave divider component | Low — SVG duplicated across 7 Bubbly files | T-008 |
| Shared animated bubble component | Low — bubble decorations duplicated in Bubbly Home/About | T-008 |
| Noir `#2a2a2a` border color to theme config | Low — hardcoded in 13 CSS rules across 5 Noir files | T-009 |
| Shared NoirPageHeader component | Low — identical header markup in 5 Noir sub-pages | T-009 |
| `.editorconfig` for cross-editor consistency | Low — tabs/spaces, line endings | T-001 |
| Husky + lint-staged pre-commit hooks | Low — referenced in PROJECT.md but not configured | T-001 |
| Gallery filter URL state persistence | Low — filter state not in URL, not shareable | T-004 |
| BaseLayout dead props cleanup | Low — title/description props may be unused after SEO slot | T-004 |
| Test timeout constants centralization | Low — hardcoded 3000ms/10000ms scattered in E2E tests | T-011 |
| Shared page test factory | Low — 6 near-identical page specs could share factory | T-011 |
| Better error messages in test helpers | Low — unclear failures in CI | T-011 |
| Font loading optimization | Low — `font-display: swap` and subsetting for LCP | T-006, T-007 |
| Nav listener cleanup on View Transitions | Low — scroll/keydown listeners not cleaned up on swap | T-010 |
| Listener cleanup convention documentation | Low — document `astro:before-swap` pattern as convention | T-010 |
| `astro:before-swap` cleanup for nav components | Low — applied to BeforeAfterSlider but not nav components | T-010 |
| Investigate `:global()` for JS-toggled CSS | Low — CSS-only solution for mobile menu overlay | T-005 |
| Add null coalescing for `btn.textContent` in MinimalContact | Low — strict TypeScript safety improvement | T-005 |
| Standardize stats counter script location across themes | Low — Bold in layout, Trust in page component | T-007 |
| Add text-accent token to theme configs | Low — distinguish decorative accent from text-usable accent to prevent future contrast failures | T-011a |
| Update scaffolding plan table to reflect actual configs | Low — archived plan references tailwind.config.ts, .eslintrc.cjs | T-001 |
| Document Tailwind v4 CSS-first `@theme` approach | Low — plan assumes traditional config file | T-001 |
| WebP format with PNG fallback for screenshots | Low — ~60% size reduction (~519KB to ~200KB) | T-F01 |
| Additional page screenshots (Services, Gallery) | Low — README only shows home hero | T-F01 |
| Mobile viewport screenshots (375x812) | Low — showcase responsive design in README | T-F01 |
| Extract test timeout constants | Low — magic numbers in E2E tests | T-011 |

### Research Topics (Unresolved)

| Topic | Question | Why Important | Origin |
|-------|----------|---------------|--------|
| Font subsetting | How to subset Google Fonts for Astro? | Performance — fonts are heaviest asset | 2026-02-09 |
| Image optimization | Astro Image vs sharp vs manual optimization? | Performance critical for gallery page | 2026-02-09 |
| Playwright visual regression | How to do screenshot comparison in Playwright? | Ensure themes don't break each other | 2026-02-09 |

---

## Rejected Ideas

Ideas considered but decided against. Keep reasoning for future reference.

| Idea | Reason for Rejection | Date |
|------|---------------------|------|
| React SPA | Already have Next.js in portfolio, no SEO benefits for content site | 2026-02-09 |
| WordPress | Not a developer skills showcase, limits custom architecture | 2026-02-09 |
| Server-side theme switching | Adds SSR complexity, cookie + page reload is simpler and sufficient | 2026-02-09 |
| Separate repos per theme | Fragments the project, harder to demonstrate architecture skills | 2026-02-09 |
