# Project Context

Accumulated knowledge, decisions, and patterns for CleanSpark.

**Last Updated**: 2026-02-09

---

## Overview

CleanSpark is a multi-theme cleaning business MVP website serving as a developer portfolio piece. It demonstrates frontend architecture through 5 radically different design themes, built with Astro + TypeScript + Tailwind CSS.

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
│   ├── shared/           # Cross-theme (ThemeSwitcher, SEO, etc.)
│   ├── minimal/          # Minimal Zen theme components
│   ├── bold/             # Bold Spark theme components
│   ├── trust/            # Trust Shield theme components
│   ├── bubbly/           # Bubbly Clean theme components
│   └── noir/             # Noir Luxe theme components
├── layouts/
│   ├── minimal/          # Minimal Zen layouts
│   ├── bold/             # Bold Spark layouts
│   ├── trust/            # Trust Shield layouts
│   ├── bubbly/           # Bubbly Clean layouts
│   └── noir/             # Noir Luxe layouts
├── content/              # Content Collections
├── themes/               # Theme config (tokens, fonts, colors)
├── lib/                  # Utilities (theme-store, theme-resolver)
├── styles/               # Global CSS, Tailwind base
└── pages/                # Routes (shared across themes)
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

_No technical debt yet — project not started._

### Workarounds

| Issue | Workaround | Permanent Fix Needed |
| ----- | ---------- | -------------------- |

_No workarounds yet._

---

## Lessons Learned

### What Works Well

_To be populated after implementation begins._

### What to Avoid

- Don't start with complex themes — build "Minimal Zen" first as the reference implementation
- Don't optimize images before all themes are done — batch optimization at the end
- Don't add JS interactivity until the static version is complete

### Insights

**From research (2026-02-09)**:

- Best cleaning websites focus on trust-building elements (testimonials, certifications) above the fold
- Color palettes that work: white (cleanliness), blue (freshness), green (eco-friendly), or bold alternatives
- 2026 design trend: warm neutrals over sterile white, typography as hero element
- Astro usage grew to 18% among developers in 2025, surpassing many traditional static site generators
- Page load time 1s→3s increases bounce probability by 32%

---

_Updated after each significant task completion._
_See [ARCHITECTURE.md](ARCHITECTURE.md) for system design._
_See [planning/TODO.md](planning/TODO.md) for active tasks._
