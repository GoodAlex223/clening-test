# T-003: Theme Engine Core

**Status**: Complete
**Priority**: P0 — Critical
**Milestone**: M1
**Branch**: `feature/t-003-theme-engine`
**Created**: 2026-02-10
**Completed**: 2026-02-10

---

## 1. Goal

Build the foundational theme engine infrastructure: cookie-based persistence, middleware for server-side reading, layout resolver, design token system with CSS custom properties, and ThemeSwitcher interactive island.

## 2. Approach

**Chosen**: Centralized theme registry with CSS custom property injection

- Separate `types.ts` for shared TypeScript interfaces (ThemeId, ThemeConfig)
- 5 individual theme config files exporting design tokens
- `themes/index.ts` as single source of truth (registry, validation, constants)
- Cookie-based store with server-side parsing and client-side writing
- Static layout resolver (import map with `satisfies` for type safety)
- Shared `buildThemeCssVars()` utility to avoid DRY violations in layouts
- Astro middleware reads cookie, stores ThemeId in `Astro.locals`
- ThemeSwitcher: logic-only island, each theme wraps with own UI

**Alternatives considered**:

1. Dynamic imports for layouts — rejected (Astro needs static paths, adds complexity)
2. CSS-only theming — rejected (can't change layout structure, only colors)
3. localStorage instead of cookies — rejected (causes FOUC, server can't read)

## 3. Key Decisions

| Decision          | Choice                                       | Rationale                                                             |
| ----------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| Astro output mode | `output: 'static'` + `@astrojs/node` adapter | Astro 5 removed `hybrid`; pages opt into SSR with `prerender = false` |
| Locals shape      | `Astro.locals.theme: ThemeId` (string only)  | Thin middleware; pages import config when needed                      |
| Token delivery    | CSS custom properties via inline style       | Standard, debuggable, shared components adapt automatically           |
| Theme switch      | Full page reload                             | Reliable for full layout swaps; simple                                |
| ThemeSwitcher UI  | Logic-only (each theme wraps)                | Maximum design flexibility per theme                                  |
| DRY CSS vars      | Shared `buildThemeCssVars()` utility         | Eliminated 5x duplication in theme layouts                            |

## 4. Key Discoveries

- Astro 5 removed `output: 'hybrid'`. The equivalent is `output: 'static'` + adapter + `export const prerender = false` per page.
- `env.d.ts` type augmentation for `App.Locals` requires inline `import()` syntax — top-level `import` turns it into a module and breaks global augmentation.
- Astro `<script>` tags in components are automatically deduplicated — no need for initialization guards.
- `satisfies Record<ThemeId, unknown>` on the layout map provides compile-time exhaustiveness checking.

## 5. Future Improvements

1. **Unit tests for theme-store.ts** — Test cookie parsing edge cases (malformed cookies, missing values, URL-encoded values). Critical for confidence in theme persistence.
2. **Unit tests for isValidThemeId()** — Verify type guard behavior with valid/invalid inputs.
3. **E2E test for theme switching roundtrip** — Playwright test: select theme, verify cookie, reload, verify correct layout renders. (Planned in T-011 but could be pulled forward.)
4. **ThemeSwitcher keyboard navigation** — Current implementation uses buttons (good), but could add arrow-key navigation between theme options for enhanced a11y.
5. **View Transitions integration** — When View Transitions are added (T-010), the theme switch could use a smooth cross-fade instead of hard reload.

## 6. Files Created/Modified

### New files (14)

- `src/themes/types.ts` — ThemeId, ThemeConfig, ThemeColors, ThemeFonts, ThemeSpacing
- `src/themes/minimal.ts` — Minimal Zen design tokens
- `src/themes/bold.ts` — Bold Spark design tokens
- `src/themes/trust.ts` — Trust Shield design tokens
- `src/themes/bubbly.ts` — Bubbly Clean design tokens
- `src/themes/noir.ts` — Noir Luxe design tokens
- `src/themes/index.ts` — Registry, THEME_IDS, isValidThemeId, getThemeConfig
- `src/lib/theme-store.ts` — Cookie read/write/validate
- `src/lib/theme-resolver.ts` — Static layout map
- `src/lib/theme-css-vars.ts` — buildThemeCssVars() utility
- `src/middleware.ts` — Read cookie, set Astro.locals.theme
- `src/components/shared/ThemeSwitcher.astro` — Interactive theme buttons
- `src/layouts/{minimal,bold,trust,bubbly,noir}/{Theme}Layout.astro` — 5 stub layouts

### Modified files (4)

- `astro.config.mjs` — Added @astrojs/node adapter
- `src/env.d.ts` — App.Locals type augmentation
- `src/styles/global.css` — Theme-aware body base styles
- `src/pages/index.astro` — Integrated theme engine

### Execution Log

#### 2026-02-10 — PHASE: Planning

- Explored codebase with code-explorer agent
- Read architecture docs, content collections, existing patterns
- Asked 4 clarifying questions (output mode, switcher UI, switch method, token usage)
- Got architect agent to design clean architecture approach

#### 2026-02-10 — PHASE: Implementation

- Created types.ts foundation, 5 theme configs, registry
- Created theme-store, theme-resolver, middleware
- Created ThemeSwitcher component
- Created 5 stub layouts with inline CSS vars
- Discovered Astro 5 removed `hybrid` output — adapted to static + adapter
- Fixed env.d.ts augmentation (inline import pattern)

#### 2026-02-10 — PHASE: Review

- Code review found DRY violation (CSS vars duplicated 5x in layouts)
- Extracted shared `buildThemeCssVars()` utility
- Moved duplicate global body styles to global.css
- All layouts now use shared utility (18 lines each vs 50)

#### 2026-02-10 — PHASE: Complete

- `pnpm astro check`: 0 errors, 0 warnings, 0 hints
- `pnpm build`: Clean (3.92s)
- `pnpm lint`: Clean
