# CleanSpark: Multi-Theme Architecture Case Study

**Live Demo**: [cleanspark-virid.vercel.app](https://cleanspark-virid.vercel.app) | **Stack**: Astro 5, TypeScript, Tailwind CSS 4 | **Source**: [GitHub](https://github.com/GoodAlex223/clening-test)

| Metric | Value |
|--------|-------|
| Lighthouse (all pages) | 100 / 100 / 100 / 100 |
| Automated tests | 962 (78 unit + 884 E2E) |
| Cross-browser | Chrome, Firefox, WebKit, Mobile Chrome |
| Accessibility | WCAG 2.1 AA (axe-core, 30 scans) |
| Themes | 5 complete design systems |
| Pages | 6 routes x 5 themes = 30 implementations |

---

## The Challenge

Most portfolio websites demonstrate a single design. I wanted to demonstrate something harder: **serving 5 radically different design systems from one codebase** — not CSS variable swaps, but complete layout systems with different component structures, animations, typography, and UX patterns.

The constraint: all 5 themes render the same business content (services, pricing, testimonials) through completely independent visual identities, while maintaining perfect performance scores and full accessibility compliance.

---

## Architecture Overview

The core innovation is a **compile-time theme resolution system**. The server reads a cookie, resolves it to a complete component tree, and renders static HTML — no client-side theme logic, no flash of wrong content.

```
Request → Middleware (read cookie) → Theme Resolver → Layout + Page Components → Static HTML
            │                            │                      │
        cookie: "bold"           resolveLayout()         BoldLayout.astro
                                 resolvePageContent()    BoldHome.astro
                                                         BoldNav.astro
                                                         BoldFooter.astro
```

Each theme is a **full layout system** — its own nav, footer, page components, fonts, animations, and CSS art. Switching from Minimal Zen to Noir Luxe doesn't just change colors; it swaps the entire component tree.

```
src/
├── components/
│   ├── shared/          # ThemeSwitcher, SEO (3 files)
│   ├── minimal/         # Nav, Footer, 6 pages (8 files)
│   ├── bold/            # Nav, Footer, 6 pages (8 files)
│   ├── trust/           # Nav, Footer, 6 pages (8 files)
│   ├── bubbly/          # Nav, Footer, 6 pages (8 files)
│   └── noir/            # Nav, Footer, 6 pages (8 files)
├── layouts/             # 1 base + 5 theme layouts
├── themes/              # Design tokens per theme
├── lib/                 # Theme engine, validation, utilities
└── pages/               # 6 thin data-fetching routes
```

---

## Deep Dive: Theme Engine

The theme engine has four layers, each designed to be type-safe and zero-overhead at runtime.

**Static Import Maps** — Layouts and page components are mapped at build time using TypeScript's `satisfies` operator. No dynamic `import()`, no runtime lookups:

```typescript
const LAYOUT_MAP = {
  minimal: MinimalLayout,
  bold: BoldLayout,
  trust: TrustLayout,
  bubbly: BubblyLayout,
  noir: NoirLayout,
} as const satisfies Record<ThemeId, unknown>
```

The compiler enforces that every theme has a registered layout. Adding a sixth theme without updating this map is a build error.

**Generic Page Resolution** — Page components use generic narrowing so TypeScript knows the exact return type per page:

```typescript
export function resolvePageContent<P extends PageName>(
  themeId: ThemeId,
  pageName: P
): PageComponentMap[P] {
  return PAGE_COMPONENTS[themeId][pageName]
}
```

**Cookie-Based Persistence** — Theme state lives in a cookie read by Astro middleware before rendering. No FOUC (Flash of Unstyled Content), no client-side hydration needed:

```typescript
// middleware.ts
export const onRequest = defineMiddleware((context, next) => {
  const cookieHeader = context.request.headers.get('cookie')
  context.locals.theme = getThemeFromCookie(cookieHeader)
  return next()
})
```

**CSS Custom Properties** — Design tokens (colors, fonts, spacing) are injected as inline CSS variables on the root element, available to all components instantly:

```typescript
export function buildThemeCssVars(theme: ThemeConfig): string {
  return [
    `--color-primary: ${theme.colors.primary}`,
    `--font-heading: ${theme.fonts.heading}`,
    // ... 18 CSS variables total
  ].join('; ')
}
```

**Thin Page Routes** — Pages are data-fetching shells with zero presentation logic. Adding a new theme requires zero changes to page files:

```astro
---
const Layout = resolveLayout(Astro.locals.theme)
const PageContent = resolvePageContent(Astro.locals.theme, 'home')
const services = await getCollection('services')
---
<Layout><PageContent services={services} /></Layout>
```

---

## Quality & Performance

**Lighthouse** — All 6 pages score 100/100/100/100 (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop. Key metrics: 0.3s FCP desktop, 1.1s FCP mobile, 0ms TBT, 0 CLS.

**Testing** — 962 automated tests across 4 browsers:

| Layer | Tests | Framework | Coverage |
|-------|-------|-----------|----------|
| Unit | 78 | Vitest | Theme store, configs, CSS vars, form validation |
| E2E | 221 x 4 browsers | Playwright | All 30 theme/page combos, theme switching, navigation, forms |
| Accessibility | 30 scans | axe-core | WCAG 2.1 AA on every theme/page combination |

**Islands Architecture** — Only 4 interactive components hydrate client-side (ThemeSwitcher, contact form, gallery filter, mobile nav). Everything else is static HTML.

---

## Key Decisions & Trade-offs

| Decision | Why | Alternative Rejected |
|----------|-----|---------------------|
| Full layout swap (not CSS theming) | Themes differ in structure, animations, UX — not just colors | CSS variables (too limited for radical differences) |
| Cookie state (not localStorage) | Server reads theme before render — zero FOUC | localStorage (requires JS, causes flash) |
| Static import maps (not dynamic imports) | Compile-time completeness checking, better tree-shaking | Dynamic `import()` (runtime overhead, no type safety) |
| Astro islands (not full hydration) | Only 4 interactive components need JS | React/Next.js (ships unnecessary JS for static content) |
| Content Collections with Zod | Type-safe business data, decoupled from design | Hardcoded content (tight coupling), headless CMS (overkill) |

---

## What I Learned

**Proactive accessibility pays off.** After fixing contrast issues in 3 themes post-implementation, I verified all Bubbly Clean colors against WCAG AA *before* writing any components. It passed audits on the first attempt — the only theme to do so.

**Testing found a real production bug.** E2E tests revealed that `querySelectorAll('[data-theme]')` matched both theme buttons and the layout wrapper div, causing event bubbling to break theme switching. Scoped selectors (`.theme-switcher button[data-theme]`) fixed it. Without cross-browser testing, this would have shipped to users.

**View Transitions require re-initialization.** Astro's ClientRouter swaps page content without full reloads, which means interactive components lose their event listeners. Every island needs the `astro:page-load` pattern — a single init function called both immediately and on the View Transitions event.

**Framework constraints shape architecture.** Astro's scoped styles don't apply to classes toggled by JavaScript at runtime. Mobile menu overlays need inline styles via JS rather than CSS class toggles. Understanding this boundary early prevented hours of debugging.

---

*Built in 7 days from empty repo to production deployment with perfect Lighthouse scores.*
