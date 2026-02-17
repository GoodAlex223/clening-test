# PROJECT.md

Project-specific configuration. Universal rules are in [CLAUDE.md](CLAUDE.md).

**Last Updated**: 2026-02-17

---

## Project Overview

**CleanSpark** — A multi-theme cleaning business MVP website built as a developer portfolio piece. Features 5 radically different design themes with real-time switching. Built with Astro 5.x + TypeScript + Tailwind CSS 4.x.

**Live Demo**: [cleanspark-virid.vercel.app](https://cleanspark-virid.vercel.app)
**Purpose**: Portfolio showcase demonstrating frontend architecture, multi-theme systems, production-quality code, and SSR deployment.
**Performance**: Perfect Lighthouse scores (100/100/100/100 mobile and desktop).
**Testing**: 962 automated tests (78 unit + 884 E2E across 4 browsers).

### Tech Stack

| Component       | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Language        | TypeScript 5.x (strict mode)                              |
| Framework       | Astro 5.x (SSR, islands architecture)                     |
| Styling         | Tailwind CSS 4.x (CSS-first config via @tailwindcss/vite) |
| Animations      | CSS animations + View Transitions (ClientRouter)          |
| Icons           | Inline SVG (no icon library)                              |
| Deployment      | Vercel (SSR, serverless, @astrojs/vercel adapter)         |
| Package Manager | pnpm                                                      |
| Linting         | ESLint v9 (flat config) + Prettier                        |
| Testing         | Playwright (E2E, 4 browsers) + Vitest (unit)              |

### Why Astro

- **Not in portfolio yet** — complements existing Next.js, Django, vanilla JS projects
- **Purpose-built** for content/marketing sites — perfect match for cleaning business
- **Islands architecture** — demonstrates understanding of modern performance patterns
- **SSR with cookie-based theme switching** — server reads theme before render (no FOUC)
- **View Transitions (ClientRouter)** — SPA-mode navigation without full page reloads
- **Built-in Content Collections** — type-safe content with Zod schemas

---

## Project Structure

| Component   | Location           | Purpose                                                  |
| ----------- | ------------------ | -------------------------------------------------------- |
| Entry Point | `src/pages/`       | Astro page routes (thin data-fetching shells)            |
| Layouts     | `src/layouts/`     | BaseLayout + 5 theme layouts (`{theme}/`)                |
| Components  | `src/components/`  | Shared (SEO, ThemeSwitcher, BeforeAfterSlider) + per-theme |
| Themes      | `src/themes/`      | Theme design tokens (colors, fonts, spacing)             |
| Content     | `src/data/`        | Content Collections (services, testimonials, etc.)       |
| Library     | `src/lib/`         | Theme engine, validation, utilities                      |
| Public      | `public/`          | Static assets, OG images, screenshots, gallery           |
| Tests       | `tests/`           | Unit (`unit/`) and E2E (`e2e/`) tests                    |
| Scripts     | `scripts/`         | Automation (screenshot capture)                          |
| Config      | `astro.config.mjs` | Astro configuration (SSR, Vercel adapter)                |

---

## Pages (6)

| Page     | Route       | Purpose                                                      |
| -------- | ----------- | ------------------------------------------------------------ |
| Home     | `/`         | Hero, services overview, testimonials, CTA, trust indicators |
| Services | `/services` | Detailed service cards, process steps, what's included       |
| About    | `/about`    | Company story, team, certifications, values                  |
| Pricing  | `/pricing`  | Pricing tiers, comparison, quote form                        |
| Gallery  | `/gallery`  | Before/after photos, filterable by service type              |
| Contact  | `/contact`  | Contact form, map, service areas, booking                    |

---

## 5 Design Themes

| #   | Theme Name       | Visual Identity                   | Key Characteristics                                                                            |
| --- | ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | **Minimal Zen**  | Warm neutrals, Cloud Dancer white | Whitespace-heavy, subtle micro-interactions, oversized clean sans-serif, Apple-like simplicity |
| 2   | **Bold Spark**   | Neo-mint + electric orange        | Parallax scrolling, large expressive type, diagonal sections, dopamine design, dynamic motion  |
| 3   | **Trust Shield** | Professional navy + slate grey    | Traditional grid, trust badges, formal serif headings, structured sections, corporate tone     |
| 4   | **Bubbly Clean** | Soft pastels + rounded shapes     | Custom illustrations, handwritten accents, bouncy CSS animations, friendly casual tone         |
| 5   | **Noir Luxe**    | Dark charcoal + champagne gold    | Elegant serif typography, sophisticated fade-ins, grain texture overlay, premium high-end feel |

Each theme is a **complete layout system** — different component structures, animations, typography, color schemes, and UX patterns. Not just CSS variable swaps.

---

## Commands

### Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Linting
pnpm lint

# Type checking
pnpm astro check

# Format code
pnpm format

# All pre-commit hooks
pre-commit run --all-files
```

### Testing

```bash
# Run E2E tests
pnpm test:e2e

# Run unit tests
pnpm test:unit

# Run all tests
pnpm test
```

---

## Critical Systems (Tier Classification)

| Tier | Description | Examples                             | Modification Rules              |
| ---- | ----------- | ------------------------------------ | ------------------------------- |
| 1    | Critical    | Theme switching engine, routing      | Requires explicit user approval |
| 2    | Important   | Layout systems, content collections  | Requires plan review            |
| 3    | Standard    | Individual components, pages         | Standard workflow               |
| 4    | Low-risk    | Documentation, static content, tests | Proceed with normal care        |

---

## Project-Specific Conventions

### Naming Conventions

| Element          | Convention                         | Example                                       |
| ---------------- | ---------------------------------- | --------------------------------------------- |
| Components       | PascalCase .astro                  | `ThemeSwitcher.astro`                         |
| Theme components | `{Theme}{Component}`               | `MinimalNav.astro`, `BoldFooter.astro`        |
| Page components  | `{Theme}{Page}.astro` in `pages/`  | `MinimalContact.astro`, `BoldHome.astro`      |
| Layouts          | `{Theme}Layout.astro`              | `MinimalLayout.astro`                         |
| CSS classes      | Tailwind utilities + scoped prefix | `.mn`/`.mf` (Minimal), `.bn`/`.bf` (Bold)    |
| Pages            | kebab-case                         | `services.astro`                              |
| Content files    | kebab-case .md or .json            | `deep-cleaning.md`, `testimonials.json`       |
| Theme IDs        | lowercase single word              | `minimal`, `bold`, `trust`, `bubbly`, `noir`  |
| Utilities        | camelCase .ts                      | `theme-store.ts`, `contact-validation.ts`     |

### Code Patterns

- **Theme isolation**: Each theme's components live in `src/components/{theme}/` with page components in `pages/` subdirectory
- **Content separation**: Business content in Content Collections (`src/data/`), design in components
- **Progressive enhancement**: Core content works without JS; `client:load` only for ThemeSwitcher, contact form, gallery filter, mobile nav
- **Mobile-first**: All styles written mobile-first with Tailwind breakpoints
- **Static resolvers**: Layout and page components mapped at build time via `satisfies` operator (compile-time completeness checking)
- **View Transitions**: `ClientRouter` for SPA navigation; interactive islands use `astro:page-load` event for re-initialization

### Error Handling

- Graceful fallback to "Minimal Zen" theme if cookie contains invalid theme ID
- Contact form shows inline Zod validation errors per field on blur/submit
- Theme resolver enforced at compile time via TypeScript `satisfies`

---

## External Dependencies

### APIs

| Service    | Purpose                      | Docs Location |
| ---------- | ---------------------------- | ------------- |
| None (MVP) | Static site, no backend APIs | —             |

### Configuration

| Variable          | Purpose          | Location |
| ----------------- | ---------------- | -------- |
| `PUBLIC_SITE_URL` | Base URL for SEO | `.env`   |

---

## Language Standards

| Language   | Policy                            |
| ---------- | --------------------------------- |
| TypeScript | `.claude/LANGUAGES/typescript.md` |

---

_For universal Claude Code rules, see [CLAUDE.md](CLAUDE.md)._
_For documentation index, see [docs/README.md](docs/README.md)._
