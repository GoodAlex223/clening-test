# Plan: Project Scaffolding & MVP Foundation

**Task**: T-001 through T-005 — Scaffold the Astro project, build theme engine, content collections, and first theme (Minimal Zen)
**Created**: 2026-02-09
**Status**: Phase 1 Complete
**Milestone**: M1 (Scaffolding) → M2 (First Theme)

---

## 1. Goal

Set up the CleanSpark project from zero to a fully functional single-theme cleaning website. This covers project initialization, content system, theme engine architecture, and the complete "Minimal Zen" theme across all 6 pages.

---

## 2. Context

- **Codebase state**: Empty — no source files exist yet
- **Tech stack**: Astro 5.x + TypeScript + Tailwind CSS 4.x
- **Architecture**: Multi-theme with full layout swap (see [ARCHITECTURE.md](../../ARCHITECTURE.md))
- **Key decisions**: Content Collections with Zod, cookie-based themes, islands for interactivity

---

## 3. Implementation Plan

### Phase 1: Project Initialization (T-001)

#### Step 1.1: Astro Project Setup

```bash
pnpm create astro@latest cleanspark -- --template minimal --typescript strict
```

- Choose: Empty template (minimal)
- TypeScript: Strict
- Install dependencies: Yes

#### Step 1.2: Install Core Dependencies

```bash
pnpm add @astrojs/tailwind tailwindcss astro-icon @fontsource/inter @fontsource/playfair-display sharp
pnpm add -D @astrojs/check eslint prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier-plugin-astro vitest @playwright/test
```

#### Step 1.3: Configuration Files

| File                 | Purpose         | Key Settings                                                                                   |
| -------------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| `astro.config.mjs`   | Astro config    | Enable Tailwind integration, output: 'static', site URL from env                               |
| `tailwind.config.ts` | Tailwind config | Content paths, custom theme extensions for each design                                         |
| `tsconfig.json`      | TypeScript      | Strict mode, path aliases (`@components/*`, `@layouts/*`, `@lib/*`, `@content/*`, `@themes/*`) |
| `.prettierrc`        | Formatting      | Semi: false, singleQuote: true, Astro plugin                                                   |
| `.eslintrc.cjs`      | Linting         | TypeScript parser, Astro overrides                                                             |
| `.env`               | Environment     | `PUBLIC_SITE_URL`, `PUBLIC_DEFAULT_THEME=minimal`                                              |
| `.gitignore`         | Git             | node_modules, dist, .astro, .env                                                               |

#### Step 1.4: Directory Structure

Create the following empty directories:

```
src/
├── components/shared/
├── components/minimal/
├── components/bold/
├── components/trust/
├── components/bubbly/
├── components/noir/
├── layouts/minimal/
├── layouts/bold/
├── layouts/trust/
├── layouts/bubbly/
├── layouts/noir/
├── content/services/
├── content/testimonials/
├── content/team/
├── content/gallery/
├── content/pricing/
├── content/config/
├── themes/
├── lib/
├── styles/
├── pages/
└── assets/
```

#### Step 1.5: Verify Dev Server

```bash
pnpm dev
pnpm astro check
```

**Acceptance**: Dev server starts, no TS errors.

---

### Phase 2: Content Collections (T-002)

#### Step 2.1: Define Schemas

Create `src/content/config.ts` with Zod schemas for each collection:

**Services Schema**:

```typescript
const services = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['residential', 'commercial', 'specialty']),
    icon: z.string(),
    shortDescription: z.string(),
    features: z.array(z.string()),
    priceFrom: z.number().optional(),
    order: z.number(),
  }),
})
```

**Testimonials Schema**:

```typescript
const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    service: z.string(),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
  }),
})
```

**Team Schema**:

```typescript
const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    photo: z.string(),
    order: z.number(),
  }),
})
```

**Gallery Schema**:

```typescript
const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    before: z.string(),
    after: z.string(),
    service: z.string(),
    description: z.string(),
  }),
})
```

**Pricing Schema**:

```typescript
const pricing = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    price: z.number(),
    frequency: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    highlighted: z.boolean().default(false),
    ctaText: z.string(),
    order: z.number(),
  }),
})
```

#### Step 2.2: Write Realistic Content

**Services** (6+ entries):

1. Regular House Cleaning — Weekly/biweekly standard clean
2. Deep Cleaning — Thorough top-to-bottom clean
3. Move-In/Move-Out Cleaning — Empty home deep clean
4. Office Cleaning — Commercial workspace maintenance
5. Post-Construction Cleanup — Debris and dust removal
6. Window Cleaning — Interior and exterior windows
7. Carpet & Upholstery — Steam cleaning service

**Testimonials** (8+ entries): Varied names, ratings (4-5 stars), specific service mentions, different tones.

**Team** (4+ members): Founder, Operations Manager, Lead Cleaner, Customer Service.

**Pricing** (3 tiers): Essential ($99), Premium ($179), Ultimate ($299).

**Gallery**: 6+ before/after pairs across different services.

---

### Phase 3: Theme Engine (T-003)

#### Step 3.1: Theme Configuration

Create `src/themes/index.ts` with ThemeConfig type and configs for all 5 themes:

```typescript
export const THEMES = ['minimal', 'bold', 'trust', 'bubbly', 'noir'] as const
export type ThemeName = (typeof THEMES)[number]
export const DEFAULT_THEME: ThemeName = 'minimal'
```

Each theme file (`src/themes/minimal.ts`, etc.) exports design tokens.

#### Step 3.2: Theme Store

`src/lib/theme-store.ts`:

- `getTheme(cookies): ThemeName` — read from cookie, validate, fallback
- `setTheme(theme: ThemeName): void` — write cookie
- Cookie name: `cleanspark-theme`
- Max-age: 1 year

#### Step 3.3: Theme Resolver

`src/lib/theme-resolver.ts`:

- `resolveLayout(theme: ThemeName, page: string)` — returns correct Astro layout component
- Dynamic import pattern for lazy loading non-active themes

#### Step 3.4: Middleware

`src/middleware.ts`:

- Read `cleanspark-theme` cookie from request
- Validate against THEMES array
- Set `Astro.locals.theme` for page access

#### Step 3.5: ThemeSwitcher Component

`src/components/shared/ThemeSwitcher.astro`:

- Floating button/dropdown showing all 5 themes
- Each option shows theme name + color preview
- On click: set cookie + reload page
- `client:load` directive for interactivity

---

### Phase 4: Page Routes (T-004)

#### Step 4.1: Page Structure

Each page file follows this pattern:

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content'
import { getTheme } from '@lib/theme-store'

const theme = Astro.locals.theme
const services = await getCollection('services')
const testimonials = await getCollection('testimonials')
// ... fetch relevant content

// Dynamic layout resolution
const Layout = await import(`@layouts/${theme}/HomeLayout.astro`)
---

<Layout.default {services} {testimonials} {theme} />
```

#### Step 4.2: Shared Components

- `src/components/shared/SEOHead.astro` — meta tags, Open Graph, canonical URL
- `src/components/shared/ThemeSwitcher.astro` — theme selection UI
- `src/components/shared/SkipToContent.astro` — accessibility skip link

---

### Phase 5: Minimal Zen Theme (T-005)

#### Design Specifications

| Property          | Value                                               |
| ----------------- | --------------------------------------------------- |
| **Primary color** | `#1a1a2e` (deep navy)                               |
| **Background**    | `#faf9f7` (warm off-white, Cloud Dancer)            |
| **Accent**        | `#e8d5b5` (warm sand)                               |
| **Text**          | `#2d2d2d` (soft black)                              |
| **Heading font**  | Inter (clean sans-serif)                            |
| **Body font**     | Inter                                               |
| **Border radius** | 0–2px (minimal)                                     |
| **Spacing**       | Generous, lots of whitespace                        |
| **Animations**    | Subtle fade-in on scroll, minimal hover transitions |
| **Nav style**     | Horizontal, text-only, centered                     |

#### Components to Create

| Component       | File                           | Purpose                                  |
| --------------- | ------------------------------ | ---------------------------------------- |
| Layout          | `MinimalLayout.astro`          | Base layout with nav + footer            |
| Nav             | `MinimalNav.astro`             | Horizontal text navigation               |
| Footer          | `MinimalFooter.astro`          | Minimal footer with columns              |
| Hero            | `MinimalHero.astro`            | Large headline, subtitle, CTA            |
| ServiceCard     | `MinimalServiceCard.astro`     | Clean card with icon, title, description |
| TestimonialCard | `MinimalTestimonialCard.astro` | Quote, name, rating                      |
| TeamCard        | `MinimalTeamCard.astro`        | Photo, name, role                        |
| PricingCard     | `MinimalPricingCard.astro`     | Tier with features list                  |
| GalleryGrid     | `MinimalGalleryGrid.astro`     | Clean grid of before/after               |
| ContactForm     | `MinimalContactForm.astro`     | Simple clean form                        |
| Section         | `MinimalSection.astro`         | Reusable section wrapper                 |
| CTA             | `MinimalCTA.astro`             | Call-to-action banner                    |

#### Page Layouts (Minimal Zen)

**Home**: Hero → Services Grid (3 featured) → "Why Us" section → Testimonials (3 featured) → CTA → Footer

**Services**: Header → Service cards grid → Process steps (1-2-3-4) → CTA → Footer

**About**: Header → Story section → Team grid → Values/certifications → CTA → Footer

**Pricing**: Header → 3 tier cards → Feature comparison → FAQ-style details → CTA → Footer

**Gallery**: Header → Filter tabs → Photo grid → CTA → Footer

**Contact**: Header → Two-column (form + info) → Service area list → Map placeholder → Footer

---

## 4. Edge Cases & Risks

| Risk                                                          | Mitigation                                             |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| Astro dynamic imports for layouts may not work in static mode | Test early; fallback to conditional rendering          |
| Cookie not available on first visit (no middleware in static) | Default to "minimal" in page logic                     |
| Tailwind purging removes theme-specific classes               | Ensure all theme files are in content paths            |
| Google Fonts slow loading                                     | Use @fontsource for self-hosted fonts                  |
| Image optimization in dev is slow                             | Use placeholder images initially, optimize later       |
| 5 themes × 6 pages = 30 layout combinations to maintain       | Build shared patterns where possible, document clearly |

---

## 5. Future Improvements

1. [ ] Add `@astrojs/sitemap` integration for auto-generated sitemap and update robots.txt dynamically
2. [ ] Configure Vitest path alias resolution to mirror tsconfig.json aliases for unit tests
3. [ ] Add `.editorconfig` for cross-editor consistency (tabs/spaces, line endings)
4. [ ] Consider adding Husky + lint-staged for pre-commit hooks (referenced in PROJECT.md but not configured)

---

## 6. Acceptance Criteria

### Phase 1 (M1: Scaffolding)

- [x] `pnpm dev` starts without errors
- [x] `pnpm astro check` passes
- [ ] All content collections validate (T-002)
- [ ] Theme engine selects correct layout (T-003)
- [ ] Cookie persists theme choice (T-003)
- [ ] All 6 routes return 200 (T-004)

### Phase 5 (M2: First Theme)

- [ ] All 6 pages fully styled in Minimal Zen
- [ ] Mobile responsive 320px–1920px
- [ ] ThemeSwitcher visible and functional
- [ ] Lighthouse 90+ on Home
- [ ] No TypeScript errors
- [ ] Content matches realistic cleaning business

---

### Execution Log

#### 2026-02-09 — PHASE: Planning

- Goal understood: Create project scaffolding plan covering T-001 through T-005
- Approach chosen: Phased implementation — scaffold → content → engine → pages → theme
- Risks identified: Dynamic imports in static mode, cookie availability, Tailwind purging
- Research completed: Cleaning website best practices, Astro architecture patterns, 2026 design trends

#### 2026-02-09 — PHASE: Implementation (T-001 Only)

- Scaffolded Astro 5.17.1 in-place into existing docs-only repo
- Used @tailwindcss/vite for Tailwind v4 (not @astrojs/tailwind v3)
- Used ESLint v9 flat config array (not deprecated tseslint.config())
- Used vitest/config defineConfig (Astro's getViteConfig had typing issues with test property)
- Used process.env in astro.config.mjs (import.meta.env unavailable at config load time)
- pnpm required shamefully-hoist=true and corepack activation
- Ran Prettier format on all existing docs for consistency
- Deviation from plan: No tailwind.config.ts (v4 uses CSS-first @theme)
- Deviation from plan: No .eslintrc.cjs (v9 uses eslint.config.js flat config)

#### 2026-02-09 — PHASE: Sub-Item Complete — T-001 Project Scaffolding

- Sub-item: T-001 Project Scaffolding
- **Results obtained**: Full Astro 5 project running with all tooling (TS, TW4, ESLint, Prettier, Vitest, Playwright)
- **Lessons learned**: Tailwind v4 and ESLint v9 have breaking changes from plan assumptions; always research latest versions before scaffolding
- **Problems encountered**: vitest.config.ts typing issue with getViteConfig; ESLint triple-slash-reference rule conflicts with Astro env.d.ts; process global not defined in ESLint for config files
- **Improvements identified**: Add sitemap integration, configure Vitest path aliases, add .editorconfig, set up pre-commit hooks
- **Technical debt noted**: Content collection warnings (empty dirs auto-generate); will resolve in T-002
- **Related code needing changes**: vitest.config.ts will need path aliases when unit tests are written (T-011)
