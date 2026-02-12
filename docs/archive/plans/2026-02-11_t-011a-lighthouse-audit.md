# T-011a: Lighthouse Audit for Minimal Zen

**Status**: Complete
**Priority**: P1 — High
**Milestone**: M2
**Depends on**: T-005
**Created**: 2026-02-11
**Completed**: 2026-02-11

---

## 1. Objective

Run Lighthouse on all 6 pages with the Minimal Zen theme and verify 90+ scores for Performance, Accessibility, Best Practices, and SEO. Fix any issues found.

---

## 2. Approach

1. Build project for production and start preview server
2. Run Lighthouse CLI (`npx lighthouse`) on all 6 pages in parallel
3. Analyze results, identify any scores below 90
4. Fix issues found
5. Re-run Lighthouse to verify fixes
6. Clean up temp files

---

## 3. Results

### Initial Audit (Before Fixes)

| Page     | Perf | A11y | BP  | SEO |
| -------- | ---- | ---- | --- | --- |
| Home     | 100  | 100  | 100 | 100 |
| Services | 100  | 95   | 100 | 100 |
| About    | 100  | 95   | 100 | 100 |
| Pricing  | 100  | 100  | 100 | 100 |
| Gallery  | 100  | 100  | 96  | 100 |
| Contact  | 100  | 100  | 100 | 100 |

### Issues Found

1. **Services page — Accessibility 95**: Color contrast failure on `.cat-header__label`. Used `var(--color-accent)` (#E8D5B5) which has only 1.43:1 contrast ratio against white background. WCAG AA requires 4.5:1.

2. **About page — Accessibility 95**: Same color contrast issue on `.label` class. Same `var(--color-accent)` (#E8D5B5) on white.

3. **Gallery page — Best Practices 96**: 16 console 404 errors for missing gallery images referenced in `src/data/gallery.json` (e.g., `/images/gallery/kitchen-before.jpg`).

### Fixes Applied

1. **MinimalServices.astro**: Changed `.cat-header__label` color from `var(--color-accent)` to `var(--color-text-muted)` (#6B6B6B, ~5.4:1 contrast ratio).

2. **MinimalAbout.astro**: Changed `.label` color from `var(--color-accent)` to `var(--color-text-muted)` (#6B6B6B, ~5.4:1 contrast ratio).

3. **Gallery placeholders**: Created 16 SVG placeholder images in `public/images/gallery/` for all before/after pairs (kitchen, bathroom, carpet, office, basement, apartment, windows, sofa). Before images use warm gray (#E8E4E0), after images use light green (#D4E8D4).

### Final Audit (After Fixes)

| Page     | Perf | A11y | BP  | SEO |
| -------- | ---- | ---- | --- | --- |
| Home     | 100  | 100  | 100 | 100 |
| Services | 100  | 100  | 100 | 100 |
| About    | 100  | 100  | 100 | 100 |
| Pricing  | 100  | 100  | 100 | 100 |
| Gallery  | 100  | 100  | 100 | 100 |
| Contact  | 100  | 100  | 100 | 100 |

**All 6 pages: 100/100/100/100** — exceeds the 90+ target.

---

## 4. Key Discoveries

- **Accent color is decorative, not for text**: The Minimal Zen accent (#E8D5B5) is a warm beige meant for decorative elements, not readable text. Using it on small labels fails WCAG contrast. Theme tokens should distinguish between decorative-accent and text-accent colors.
- **Content Collections need real assets**: Gallery collection references image paths but those images didn't exist in `public/`. Placeholder SVGs are a good intermediate solution but should be replaced with real photos.
- **Lighthouse CLI parallel execution**: Running 6 Lighthouse instances in parallel works but requires a fresh preview server per build. Stale servers cause asset 404s that tank Best Practices scores.

---

## 5. Future Improvements

1. **Add text-accent token to theme configs** — Distinguish between decorative accent (backgrounds, borders) and text-accent (readable on white/surface). Prevents future contrast failures when new themes are built. (IDEA)

2. **Add `width`/`height` attributes to gallery images** — Gallery `<img>` elements lack explicit dimensions, which can cause layout shift. Adding width/height or using Astro `<Image>` component would improve CLS. (IDEA)

3. **Automate Lighthouse in CI** — Add a GitHub Actions step to run Lighthouse on PRs and fail if scores drop below 90. Prevents regressions. (IDEA)

4. **Replace SVG placeholders with real photos** — Current gallery uses SVG placeholders saved as .jpg. When real photos are available, integrate Astro `<Image>` for responsive sizes and WebP/AVIF. (IDEA)

---

## Execution Log

### 2026-02-11 14:00 — PHASE: Planning

- Goal: Lighthouse audit all 6 Minimal Zen pages, verify 90+ scores
- Approach: Build → preview → lighthouse CLI → fix → re-verify
- Risks: Preview server instability, flaky lighthouse scores

### 2026-02-11 14:10 — PHASE: Implementation

- Built project successfully (0 errors)
- Started preview server on localhost:4321
- Ran Lighthouse on all 6 pages in parallel

### 2026-02-11 14:20 — PHASE: Sub-Item Complete (Initial Audit)

- Sub-item: Initial Lighthouse audit on all 6 pages
- **Results**: 3 pages had issues: Services (A11y 95), About (A11y 95), Gallery (BP 96)
- **Lessons**: Accent color not suitable for text, gallery needs placeholder assets
- **Problems**: None — audit ran smoothly
- **Improvements**: Theme configs should have text-accent vs decorative-accent distinction

### 2026-02-11 14:30 — PHASE: Sub-Item Complete (Fixes)

- Sub-item: Fixed all 3 issues (color contrast × 2, gallery placeholders × 16)
- **Results**: Changed label colors to textMuted, created 16 SVG placeholders
- **Lessons**: SVG-as-JPG works for placeholders; `color-mix()` in CSS can help compute accessible shades
- **Problems**: Stale preview server caused 404s on first re-run; required full rebuild + restart
- **Improvements**: Automate Lighthouse in CI to catch regressions early

### 2026-02-11 14:48 — PHASE: Sub-Item Complete (Verification)

- Sub-item: Re-ran Lighthouse on all 6 pages after rebuild
- **Results**: All 6 pages score 100/100/100/100
- **Lessons**: Always rebuild and restart preview server before re-auditing
- **Problems**: Initial re-run on stale server showed BP=79 regression (false negative)
- **Improvements**: Add width/height to gallery images for explicit sizing

### 2026-02-11 14:50 — PHASE: Complete

- Final approach: Fix contrast with textMuted token, create SVG placeholders, full rebuild + verify
- Tests passing: Lighthouse 100/100/100/100 on all 6 pages
- User approval: Pending
