# Plan: Content Collections & Schemas

**Task**: T-002 — Content Collections & Schemas
**Created**: 2026-02-09
**Status**: Complete
**Milestone**: M1 (Scaffolding)
**Depends on**: T-001

---

## 1. Goal

Define Astro 5 Content Collections with Zod schemas for all business content (services, testimonials, team, gallery, pricing) and write realistic cleaning business marketing copy. Create a typed site config for company information.

---

## 2. Context

- **Codebase state**: Astro 5.17.1 scaffolded (T-001 complete), empty `src/content/` dirs with `.gitkeep`
- **Key discovery**: Astro 5 uses Content Layer API — `src/content.config.ts` (not `src/content/config.ts`), `glob()`/`file()` loaders (not `type: 'content'`/`type: 'data'`)
- **Architecture**: Content-design separation — business data in collections, consumed by theme components via props

---

## 3. Implementation Plan

### Phase 1: Schema Definition

- Create `src/content.config.ts` with 5 collections:
  - **services**: `glob()` loader for Markdown files (rich body text)
  - **testimonials**: `file()` loader for single JSON
  - **team**: `file()` loader for single JSON
  - **gallery**: `file()` loader for single JSON
  - **pricing**: `file()` loader for single JSON
- Zod schemas with strict validation, enums for categories, defaults for booleans

### Phase 2: Content Creation

- 7 service Markdown files with full marketing copy (3 residential, 1 commercial, 3 specialty)
- 10 testimonials with varied ratings, locations, service references
- 5 team members with bios and certifications
- 8 gallery items (before/after pairs across services)
- 3 pricing tiers (Essential $99, Premium $179, Ultimate $299)
- Site config TypeScript file with company info, SEO defaults

### Phase 3: Migration & Cleanup

- Migrate from `src/content/` to `src/data/` (Astro 5 convention)
- Update tsconfig path alias `@content/*` → `@data/*`
- Remove old empty `src/content/` directory

---

## 4. Key Discoveries

1. **Astro 5 Breaking Changes**: Content Layer API completely changed from v4. Config file moved to `src/content.config.ts`, loaders replace `type:` property, `render()` is standalone import, data files can live anywhere.
2. **`z.string().date()`**: Zod supports date string validation out of the box — better than plain `z.string()` for ISO date fields.
3. **`file()` loader requires `id` field**: JSON arrays used with `file()` loader must include an `id` field in each object for Astro to use as entry identifier.
4. **`astro/zod` re-export**: No need to install `zod` separately — Astro re-exports it from `astro/zod`.

---

## 5. Future Improvements

1. **Add image optimization pipeline** — When real photos are added, integrate Astro's `<Image>` component with sharp for automatic optimization, responsive sizes, and WebP/AVIF conversion. Currently using placeholder paths.
2. **Add content schema unit tests** — Write Vitest tests that validate sample content against schemas programmatically, catching schema regressions before build time. Could test edge cases like empty arrays, boundary ratings, etc.
3. **Consider content versioning** — As content grows, a lightweight CMS (Decap CMS, Keystatic) could manage content edits without code changes. Already in BACKLOG.md as an idea.

---

## 6. Acceptance Criteria

- [x] Zod schema for Services collection defined
- [x] Zod schema for Testimonials collection defined
- [x] Zod schema for Team collection defined
- [x] Zod schema for Gallery collection defined
- [x] Zod schema for Pricing collection defined
- [x] Site config schema defined (TypeScript interface + typed object)
- [x] Sample content entries created (at least 1 per collection)
- [x] Realistic cleaning business content (7 services, 10 testimonials, 5 team, 3 pricing)
- [x] All schemas compile and validate (`pnpm astro check`: 0 errors)
- [x] Build succeeds (`pnpm build`: success)
- [x] Lint clean (`pnpm lint`: no issues)

---

### Execution Log

#### 2026-02-09 — PHASE: Planning

- Goal understood: Define content collections with Zod schemas and write realistic content
- Research completed: Astro 5 Content Layer API via Context7 docs
- Key finding: Astro 5 uses completely different API from v4 (loaders, new config location)
- Approach chosen: `src/data/` with `glob()` for Markdown services, `file()` for JSON collections

#### 2026-02-09 — PHASE: Implementation

- Created `src/content.config.ts` with 5 collection schemas
- Created 7 service Markdown files with professional marketing copy
- Created 4 JSON data files (testimonials, team, gallery, pricing)
- Created `src/lib/site-config.ts` with typed company config
- Migrated from `src/content/` to `src/data/`, updated tsconfig alias

#### 2026-02-09 — PHASE: Sub-Item Complete — All Content Collections

- Sub-item: All 5 collections + site config + content files
- **Results obtained**: 15 new files, 1055 lines of content, all schemas validate
- **Lessons learned**: Astro 5 Content Layer API is a complete rewrite from v4; always check framework docs for latest version before implementing
- **Problems encountered**: Initial plan assumed Astro 4 patterns (`type: 'content'`, `src/content/config.ts`); resolved by researching Astro 5 docs
- **Improvements identified**: Add content schema unit tests, add image optimization when real photos available
- **Technical debt noted**: Placeholder image paths — no actual images yet
- **Related code needing changes**: T-003 (theme engine) and T-004 (pages) will consume these collections

#### 2026-02-09 — PHASE: Quality Review

- Code review: Schema quality validated, date validation improved (`z.string().date()`), address DRY fix applied
- Content review: All data passes validation, references consistent, no typos detected
- All 10 testimonials have valid service references matching actual service names

#### 2026-02-09 — PHASE: Complete

- Final approach: Astro 5 Content Layer API with `src/data/` convention
- Tests passing: `pnpm astro check` — 0 errors, `pnpm build` — success, `pnpm lint` — clean
- User approval: received

#### 2026-02-09 — PHASE: Task Completion Documentation

- **Step 1 EXTRACT**: 2 improvements → BACKLOG.md
- **Step 2 ARCHIVE**: Plan moved to docs/archive/plans/
- **Step 3 TRANSITION**: Task moved TODO.md → DONE.md
- **Step 4 COMMIT**: Documentation commit
- **Step 5 MEMORY**: Session and decision entities created/updated
