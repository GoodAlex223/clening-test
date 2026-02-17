# Project Context

Accumulated knowledge, decisions, and patterns for CleanSpark.

**Last Updated**: 2026-02-17

---

## Overview

CleanSpark is a multi-theme cleaning business website serving as a developer portfolio piece. It demonstrates frontend architecture through 5 radically different design themes, built with Astro 5 + TypeScript (strict) + Tailwind CSS 4. Deployed on Vercel SSR with perfect Lighthouse scores (100/100/100/100) and 962 automated tests.

---

## Key Decisions

### Decision Log

| Date       | Decision                          | Rationale                                                             | Alternatives Considered                                       |
| ---------- | --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| 2026-02-09 | Astro as framework                | Not in portfolio yet; perfect for content sites; islands architecture | Next.js (already used), SvelteKit, Nuxt, vanilla HTML         |
| 2026-02-09 | TypeScript strict mode            | Type safety for theme system; portfolio standard                      | JavaScript (less impressive)                                  |
| 2026-02-09 | Tailwind CSS 4.x                  | Utility-first, theme-friendly, fast prototyping                       | CSS Modules, Sass, vanilla CSS                                |
| 2026-02-09 | Full layout swap (not CSS themes) | Designs differ in layout/UX/animations, not just colors               | CSS variable theming (too limited)                            |
| 2026-02-09 | Cookie-based theme persistence    | Server-readable, no flash of wrong theme                              | localStorage (FOUC risk), URL params (not persistent)         |
| 2026-02-09 | Content Collections with Zod      | Type-safe at build time, clean content-design separation              | JSON imports (no validation), headless CMS (overkill for MVP) |
| 2026-02-09 | 6-page structure                  | Enough to showcase layouts without being bloated                      | Single page (too simple), 10+ pages (too much for MVP)        |
| 2026-02-09 | pnpm as package manager           | Fast, disk-efficient, strict dependencies                             | npm (slower), yarn (no advantage)                             |
| 2026-02-09 | Vercel for deployment             | Free tier, Astro-native support, instant deploys                      | Netlify (also viable), GitHub Pages (limited)                 |
| 2026-02-09 | 5 design themes                   | Maximum variety for portfolio impact                                  | 3 (minimum), 7 (diminishing returns)                          |
| 2026-02-09 | src/data/ over src/content/         | Astro 5 convention for Content Layer API; avoids reserved directory    | src/content/ (Astro 4 convention, conflicts with new API)     |
| 2026-02-09 | Glob loader for Markdown services   | Rich text descriptions with frontmatter; file loader for JSON others  | All JSON (less flexible), all Markdown (overkill for flat data) |
| 2026-02-10 | Static import maps with `satisfies` | Compile-time completeness; adding theme without updating = build error | Dynamic import() (runtime overhead, no type safety)           |
| 2026-02-10 | Thin page routes pattern            | Pages are data-fetching shells; zero presentation logic in routes     | Full page components (couples layout to routing)              |
| 2026-02-11 | Inline styles for mobile menu       | Astro scoped styles conflict with JS-toggled CSS classes at runtime   | CSS class toggles (unreliable with Astro scoping)             |
| 2026-02-12 | Scoped CSS class prefixes per theme | Prevents style leaking: .mn/.mf, .bn/.bf, .tn/.tf, .bbn/.bbf, .nn/.nf | Global classes (risk of cross-theme conflicts)              |
| 2026-02-13 | SSR with @astrojs/vercel adapter    | Cookie-based theme switching requires server; output: 'server'        | Static output (can't read cookies server-side)                |
| 2026-02-13 | Full page reload on theme switch    | Clean component tree swap; bypasses ClientRouter                      | View Transitions (theme swap is too radical for morph)        |
| 2026-02-13 | astro:page-load re-initialization   | ClientRouter swaps DOM without full reload; islands lose listeners    | Single init (breaks after View Transitions navigation)        |

### Major Architectural Decisions

#### ADR-001: Full Layout Swap vs CSS Theming

**Date**: 2026-02-09
**Context**: The 5 design themes must be radically different — not just color swaps but different layouts, navigation styles, animation patterns, typography systems, and UX flows.
**Decision**: Each theme gets its own complete layout component tree, not shared CSS variables.
**Rationale**: CSS-only theming cannot change component structure, section ordering, navigation patterns, or animation behavior. Full layout swap gives maximum creative freedom per theme.
**Alternatives**: CSS custom properties theming (too limited), Tailwind theme config (colors only), runtime CSS injection (performance concerns).
**Consequences**: More code to maintain (5× layout files), but each theme is fully independent and can't break others. Adding a new theme is additive only.
**Status**: Active

#### ADR-002: Astro Content Collections for Business Data

**Date**: 2026-02-09
**Context**: Business content (services, prices, testimonials) must be decoupled from design to render through 5 different themes.
**Decision**: Use Astro Content Collections with Zod schemas as the single source of truth for all business data.
**Rationale**: Type-safe at build time, clean separation from presentation, supports Markdown for rich text, Zod validation catches content errors before they reach the browser.
**Alternatives**: Hardcoded in components (tight coupling), JSON files without validation (error-prone), headless CMS (overkill, adds dependency).
**Consequences**: All content changes go through Markdown/JSON files with Zod validation. Theme components receive typed data via props.
**Status**: Active

#### ADR-003: Cookie-Based Theme State

**Date**: 2026-02-09
**Context**: Theme selection must persist across page reloads and be available server-side to avoid flash of wrong theme (FOUC).
**Decision**: Store theme name in a cookie, read it in Astro middleware before rendering.
**Rationale**: Cookies are sent with every request, so the server (or edge) knows the theme before rendering HTML. localStorage requires client-side JS to read, causing a flash of default theme.
**Alternatives**: localStorage (FOUC), URL parameter (not persistent), server session (requires backend).
**Consequences**: Theme choice survives browser restarts. No FOUC. Works with Astro's static output (cookie read at build time or edge middleware).
**Status**: Active

---

## Patterns

### Code Patterns

| Pattern                   | When to Use                                | Example                               |
| ------------------------- | ------------------------------------------ | ------------------------------------- |
| Theme-prefixed components | Theme-specific UI                          | `MinimalHero.astro`, `BoldHero.astro` |
| Content prop drilling     | Pass content data to theme components      | `<MinimalHero services={services} />` |
| Interactive islands       | Only for components needing JS             | `<ThemeSwitcher client:load />`       |
| Layout delegation         | Pages resolve theme and delegate to layout | `const Layout = resolveLayout(theme)` |
| Zod schema validation     | All content collection definitions         | `z.object({ name: z.string(), ... })` |

### Anti-Patterns

| Anti-Pattern                    | Why Avoid                                      | Better Alternative                                     |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| Content inside theme components | Couples content to design, 5× maintenance      | Use Content Collections, pass via props                |
| Global JavaScript               | Defeats Astro's zero-JS philosophy             | Use `client:load` islands sparingly                    |
| Shared layout with conditionals | `if (theme === 'bold')` becomes unmaintainable | Separate layout per theme                              |
| Inline styles for theming       | Hard to maintain, no tooling support           | Tailwind utilities + theme config                      |
| Stock photos                    | Looks generic, undermines portfolio            | Use high-quality Unsplash/Pexels with consistent style |

---

## Conventions

### Naming

| Element                | Convention              | Example                                      |
| ---------------------- | ----------------------- | -------------------------------------------- |
| Theme IDs              | lowercase single word   | `minimal`, `bold`, `trust`, `bubbly`, `noir` |
| Theme display names    | Title Case, two words   | "Minimal Zen", "Bold Spark"                  |
| Component files        | PascalCase .astro       | `HeroSection.astro`                          |
| Theme component prefix | Theme name + component  | `MinimalHero.astro`                          |
| Content files          | kebab-case .md or .json | `deep-cleaning.md`                           |
| Utility functions      | camelCase .ts           | `resolveTheme.ts`                            |

### File Organization

```
src/
├── components/
│   ├── shared/           # ThemeSwitcher, SEO, BeforeAfterSlider
│   ├── minimal/          # MinimalNav, MinimalFooter
│   │   └── pages/        # MinimalHome, MinimalServices, etc.
│   ├── bold/             # BoldNav, BoldFooter
│   │   └── pages/        # BoldHome, BoldServices, etc.
│   ├── trust/            # TrustNav, TrustFooter
│   │   └── pages/        # TrustHome, TrustServices, etc.
│   ├── bubbly/           # BubblyNav, BubblyFooter
│   │   └── pages/        # BubblyHome, BubblyServices, etc.
│   └── noir/             # NoirNav, NoirFooter
│       └── pages/        # NoirHome, NoirServices, etc.
├── layouts/
│   ├── BaseLayout.astro  # HTML shell, ClientRouter, head slot
│   ├── minimal/          # MinimalLayout.astro
│   ├── bold/             # BoldLayout.astro
│   ├── trust/            # TrustLayout.astro
│   ├── bubbly/           # BubblyLayout.astro
│   └── noir/             # NoirLayout.astro
├── data/                 # Content: services/, testimonials.json, etc.
├── themes/               # Theme configs, types, registry
├── lib/                  # Theme engine, validation, utilities
└── pages/                # Thin route shells (6 pages)
```

### Code Style

- Astro components: HTML-first, minimal `<script>` blocks
- TypeScript: Strict mode, no `any`, prefer `interface` over `type`
- Tailwind: Mobile-first utilities, avoid `@apply` except in theme base styles
- Comments: Only for non-obvious logic; component names should be self-documenting

---

## Domain Knowledge

### Glossary

| Term               | Definition                                                                  |
| ------------------ | --------------------------------------------------------------------------- |
| Theme              | A complete visual design system (layout, colors, typography, animations)    |
| Design token       | A named value (color, font, spacing) that defines a theme's visual language |
| Island             | An interactive component that hydrates on the client (Astro concept)        |
| Content Collection | Astro's built-in system for type-safe structured content                    |
| FOUC               | Flash of Unstyled Content — brief display of wrong theme before JS loads    |
| CTA                | Call to Action — buttons/sections prompting user action                     |
| Above the fold     | Content visible without scrolling on initial page load                      |

### Business Rules (Cleaning Website)

| Rule                    | Description                                                   | Source                         |
| ----------------------- | ------------------------------------------------------------- | ------------------------------ |
| CTA above the fold      | "Get a Quote" or "Book Now" must be visible without scrolling | Industry best practice         |
| Trust signals early     | Testimonials, certifications, ratings within first 2 scrolls  | Conversion research            |
| Benefits over features  | "More free time for family" not "2-hour cleaning"             | Content strategy best practice |
| Service area visibility | Show map or area list prominently                             | Local SEO requirement          |
| Real photos preferred   | Team photos > stock images for trust                          | UX research                    |
| Mobile-first navigation | Max 5-7 nav items, no complex dropdowns                       | Mobile UX best practice        |
| Transparent pricing     | Show pricing structure clearly, even if "starting from"       | Conversion optimization        |

---

## Known Issues

### Technical Debt

| Issue | Impact | Remediation Plan | Priority |
| ----- | ------ | ---------------- | -------- |
| Mobile menu uses inline styles instead of CSS classes | Low — works correctly, just less elegant | Investigate Astro `:global()` pseudo-function | Low |
| Contact form init logic (~60 lines) duplicated across 5 themes | Medium — maintenance burden | Extract shared `initContactForm()` to `src/lib/contact-form.ts` | Medium |
| Scroll-reveal script duplicated across 5 layouts | Medium — same pattern repeated | Extract shared `src/lib/scroll-reveal.ts` with options | Medium |
| `var(--color-secondary)` WCAG AA contrast failures (4 occurrences fixed) | Low — all fixed, but pattern recurs | Create shared SectionLabel component with accessible defaults | Medium |
| Button/form/field styles duplicated across all 5 themes | Low — cosmetic duplication | Extract shared utility components | Low |
| Nav components add window/document listeners without View Transitions cleanup | Low — Astro replaces DOM | Add `astro:before-swap` cleanup array pattern | Low |

### Workarounds

| Issue | Workaround | Permanent Fix Needed |
| ----- | ---------- | -------------------- |
| Astro scoped styles don't apply to JS-toggled classes | Inline styles via JavaScript for mobile menu overlay | Astro `:global()` or CSS-only approach |
| ClientRouter breaks interactive component initialization | `astro:page-load` event listener + double-init pattern | Standardized component lifecycle pattern |

---

## Lessons Learned

### What Works Well

- **Building Minimal Zen first** as the reference theme — established all patterns (page-resolver, scroll-reveal, mobile nav) that subsequent themes reused
- **Compile-time theme resolution** with `satisfies` — catches missing theme registrations at build time, not runtime
- **Cookie-based theme persistence** — zero FOUC, works perfectly with SSR middleware
- **CSS-only decorative art** (shields, diamonds, bubbles, geometric shapes) — no external image dependencies, showcases CSS skills
- **Proactive WCAG AA verification** — Bubbly Clean verified colors against contrast ratios before implementation; only theme to pass accessibility on first attempt
- **E2E testing with Playwright** — found a real production bug (ThemeSwitcher event bubbling) that manual testing missed
- **Scoped CSS class prefixes** — prevented cross-theme style leaking across all 5 themes
- **Thin page routes** — adding a new theme requires zero changes to page files

### What to Avoid

- Don't start with complex themes — build the simplest theme first as the reference implementation
- Don't use `color: var(--color-secondary)` for text on light backgrounds — failed WCAG AA in 4 themes before pattern was recognized
- Don't toggle CSS classes with JavaScript in Astro — scoped styles won't apply; use inline styles instead
- Don't initialize interactive components immediately — use `astro:page-load` event for View Transitions compatibility
- Don't use `querySelectorAll('[data-theme]')` without scoping — matches wrapper divs, not just buttons

### Insights

**From research (2026-02-09)**:

- Best cleaning websites focus on trust-building elements (testimonials, certifications) above the fold
- Color palettes that work: white (cleanliness), blue (freshness), green (eco-friendly), or bold alternatives
- 2026 design trend: warm neutrals over sterile white, typography as hero element
- Astro usage grew to 18% among developers in 2025, surpassing many traditional static site generators
- Page load time 1s→3s increases bounce probability by 32%

**From implementation (2026-02-09 through 2026-02-13)**:

- Astro 5 Content Layer API is a complete rewrite from v4 — loaders, new config location, `src/data/` convention
- Tailwind v4 uses CSS-first config (`@theme` directives), not `tailwind.config.ts`
- ESLint v9 uses flat config arrays, not `.eslintrc.cjs`
- `@astrojs/vercel` adapter with `output: 'server'` required for cookie-based theme switching (static output can't read cookies server-side)
- Self-hosted fonts via `@fontsource/*` perform better than Google Fonts CDN for Lighthouse scores
- CSS `cubic-bezier(0.68, -0.55, 0.265, 1.55)` creates elastic bounce effect without JavaScript
- IntersectionObserver-based scroll-reveal is more performant than scroll event listeners
- Native `<details>`/`<summary>` elements work well for FAQ accordions — no JS needed

**From testing (2026-02-13)**:

- `page.waitForURL(regex)` is more reliable than `waitForLoadState('networkidle')` with ClientRouter
- Setting theme cookie via `context.addCookies()` before navigation prevents FOUC in tests
- axe-core integration found real accessibility issues that manual review missed
- Parameterized `for (const theme of THEMES)` loops scale test coverage without duplication

---

_Updated after each significant task completion._
_See [ARCHITECTURE.md](ARCHITECTURE.md) for system design._
_See [planning/TODO.md](planning/TODO.md) for active tasks._
