# Plan: 5 Theme Design Specifications

**Task**: Design specifications for all 5 CleanSpark themes
**Created**: 2026-02-09
**Status**: Not Started
**Related**: T-005, T-006, T-007, T-008, T-009

---

## Purpose

This document provides detailed design specifications for each of the 5 themes. Each theme is a **complete design system** — not just a color swap. Specifications cover color palette, typography, layout patterns, animation behavior, navigation style, and component variations.

All themes render the same 6 pages with identical business content.

---

## Theme 1: Minimal Zen

**Vibe**: Apple-like simplicity. Calm, spacious, premium. Let the whitespace breathe.
**Target audience feel**: "This company is sophisticated and meticulous."

### Color Palette

| Token        | Hex       | Usage                                  |
| ------------ | --------- | -------------------------------------- |
| `background` | `#FAF9F7` | Page background (warm off-white)       |
| `surface`    | `#FFFFFF` | Cards, elevated surfaces               |
| `text`       | `#2D2D2D` | Primary text (soft black)              |
| `textMuted`  | `#6B6B6B` | Secondary text                         |
| `primary`    | `#1A1A2E` | Deep navy — headings, accents          |
| `accent`     | `#E8D5B5` | Warm sand — subtle highlights, borders |
| `cta`        | `#1A1A2E` | Button background                      |
| `ctaText`    | `#FAF9F7` | Button text                            |

### Typography

| Element       | Font  | Weight        | Size (Desktop)  |
| ------------- | ----- | ------------- | --------------- |
| H1 (Hero)     | Inter | 300 (Light)   | 4rem / 64px     |
| H2 (Section)  | Inter | 400 (Regular) | 2.5rem / 40px   |
| H3 (Card)     | Inter | 500 (Medium)  | 1.5rem / 24px   |
| Body          | Inter | 400           | 1rem / 16px     |
| Small/Caption | Inter | 400           | 0.875rem / 14px |
| CTA Button    | Inter | 500           | 1rem / 16px     |

### Layout Patterns

- **Grid**: Simple 12-column, generous gutters (2rem)
- **Sections**: Full-width, 120px vertical padding, centered max-width 1200px
- **Cards**: Minimal border, subtle shadow (`shadow-sm`), no border-radius or 2px max
- **Spacing**: Large gaps between sections (120px), breathing room everywhere
- **Nav**: Horizontal, text-only links, centered, sticky on scroll
- **Footer**: 3-column, minimal text, small font

### Animation Behavior

| Element         | Animation                        | Timing                                       |
| --------------- | -------------------------------- | -------------------------------------------- |
| Sections        | Fade-in on scroll                | `opacity 0→1, translateY 20px→0, 600ms ease` |
| Buttons         | Subtle background shift on hover | `200ms ease`                                 |
| Nav links       | Underline slide from left        | `300ms ease`                                 |
| Images          | Fade-in from opacity 0           | `400ms ease`                                 |
| Page transition | Crossfade (View Transitions)     | `300ms`                                      |

### Page-Specific Layout

**Home**:

```
[Nav - horizontal centered]
[Hero - fullscreen, centered text, single CTA button]
[Services - 3 cards in a row, icon + title + 1-line desc]
[Why Choose Us - 2 columns: text + image]
[Testimonials - 3 quotes in a row]
[CTA banner - centered text + button]
[Footer - 3 columns]
```

**Services**:

```
[Nav]
[Page header - large title, subtitle]
[Service grid - 2 columns, alternating image/text]
[Process steps - 4 numbered steps in a row]
[CTA]
[Footer]
```

---

## Theme 2: Bold Spark

**Vibe**: Energetic, dopamine design. Big, bold, confident. Electric colors that pop.
**Target audience feel**: "This company is modern, dynamic, and gets things done fast."

### Color Palette

| Token        | Hex       | Usage                       |
| ------------ | --------- | --------------------------- |
| `background` | `#FEFFFE` | Clean white base            |
| `surface`    | `#F0FFF4` | Light mint tinted cards     |
| `text`       | `#1A1A1A` | Pure black text             |
| `textMuted`  | `#4A5568` | Secondary text              |
| `primary`    | `#38D9A9` | Neo-mint — main brand color |
| `secondary`  | `#FF6B35` | Electric orange — accent    |
| `accent`     | `#FFD93D` | Warm yellow — highlights    |
| `cta`        | `#FF6B35` | Orange CTA buttons          |
| `ctaText`    | `#FFFFFF` | White button text           |

### Typography

| Element       | Font          | Weight     | Size (Desktop)  |
| ------------- | ------------- | ---------- | --------------- |
| H1 (Hero)     | Space Grotesk | 700 (Bold) | 5rem / 80px     |
| H2 (Section)  | Space Grotesk | 600        | 3rem / 48px     |
| H3 (Card)     | Space Grotesk | 600        | 1.5rem / 24px   |
| Body          | DM Sans       | 400        | 1.125rem / 18px |
| Small/Caption | DM Sans       | 400        | 0.875rem / 14px |
| CTA Button    | Space Grotesk | 600        | 1.125rem / 18px |

### Layout Patterns

- **Grid**: Dynamic, asymmetric columns, broken grid
- **Sections**: Diagonal dividers (CSS clip-path), overlapping elements
- **Cards**: Bold borders (3px), large border-radius (16px), bright shadows
- **Spacing**: Tight within sections, large between sections
- **Nav**: Sticky, logo left, links right, colored underline on active
- **Footer**: Full-width bold block, 4 columns, mint background

### Animation Behavior

| Element           | Animation                             | Timing           |
| ----------------- | ------------------------------------- | ---------------- |
| Hero text         | Slide in from left, stagger each line | `800ms spring`   |
| Cards             | Scale up + shadow on hover            | `200ms ease-out` |
| Sections          | Slide from alternating sides          | `600ms ease`     |
| Diagonal dividers | Subtle parallax on scroll             | CSS `transform`  |
| CTAs              | Bounce on hover + color shift         | `300ms`          |
| Numbers/stats     | Count-up animation on scroll          | `1000ms`         |
| Page transition   | Slide left/right (View Transitions)   | `400ms`          |

### Page-Specific Layout

**Home**:

```
[Nav - bold, logo left, mint underlines]
[Hero - split: text left (huge headline) + image right, diagonal bottom edge]
[Services - 3 cards overlapping diagonal section, bold borders]
[Stats bar - full-width mint, animated counters]
[Testimonials - carousel with large quotes, orange accents]
[CTA - orange block, white text, oversized button]
[Footer - mint background, 4 columns]
```

---

## Theme 3: Trust Shield

**Vibe**: Corporate reliability. Professional, trustworthy, established. Blue-collar excellence.
**Target audience feel**: "This company is insured, certified, and takes things seriously."

### Color Palette

| Token        | Hex       | Usage                     |
| ------------ | --------- | ------------------------- |
| `background` | `#F8F9FA` | Light grey background     |
| `surface`    | `#FFFFFF` | White cards               |
| `text`       | `#212529` | Near-black text           |
| `textMuted`  | `#6C757D` | Grey secondary text       |
| `primary`    | `#1B4965` | Deep navy blue            |
| `secondary`  | `#5FA8D3` | Mid blue — links, accents |
| `accent`     | `#62B6CB` | Light blue — highlights   |
| `cta`        | `#1B4965` | Navy CTA buttons          |
| `ctaText`    | `#FFFFFF` | White button text         |
| `success`    | `#28A745` | Checkmarks, trust badges  |
| `border`     | `#DEE2E6` | Card borders, dividers    |

### Typography

| Element       | Font          | Weight     | Size (Desktop)  |
| ------------- | ------------- | ---------- | --------------- |
| H1 (Hero)     | Merriweather  | 700 (Bold) | 3.5rem / 56px   |
| H2 (Section)  | Merriweather  | 700        | 2.25rem / 36px  |
| H3 (Card)     | Merriweather  | 700        | 1.25rem / 20px  |
| Body          | Source Sans 3 | 400        | 1rem / 16px     |
| Small/Caption | Source Sans 3 | 400        | 0.875rem / 14px |
| CTA Button    | Source Sans 3 | 600        | 1rem / 16px     |

### Layout Patterns

- **Grid**: Strict 12-column, Bootstrap-like structure
- **Sections**: Bordered, shadowed containers, clear visual hierarchy
- **Cards**: Bordered (`1px solid #DEE2E6`), subtle shadow, 8px radius
- **Spacing**: Consistent 60px section padding, standard gaps
- **Nav**: Traditional: logo left, links center, CTA button right, dropdown for services
- **Footer**: Dark navy background, 4 columns, newsletter signup

### Animation Behavior

| Element         | Animation                       | Timing       |
| --------------- | ------------------------------- | ------------ |
| Sections        | Fade in (minimal)               | `400ms ease` |
| Cards           | Lift on hover (translateY -4px) | `200ms ease` |
| Trust badges    | Subtle glow on scroll-in        | `600ms`      |
| Checkmarks      | Draw-in SVG animation           | `400ms`      |
| Counter stats   | Count up on visibility          | `800ms`      |
| Page transition | Simple fade (View Transitions)  | `200ms`      |

### Unique Elements

- **Trust badges bar**: "Licensed | Insured | Bonded | Background-Checked" with icons
- **Certification logos**: Grid of trust seals
- **Star ratings**: Prominent Google/Yelp rating display
- **Guarantee badge**: "100% Satisfaction Guaranteed" shield icon

---

## Theme 4: Bubbly Clean

**Vibe**: Friendly, approachable, fun. Like a cheerful friend who loves cleaning.
**Target audience feel**: "This company is fun, friendly, and makes cleaning stress-free."

### Color Palette

| Token        | Hex       | Usage                     |
| ------------ | --------- | ------------------------- |
| `background` | `#FFF9F0` | Warm cream                |
| `surface`    | `#FFFFFF` | White cards               |
| `text`       | `#3D3D3D` | Soft dark text            |
| `textMuted`  | `#7A7A7A` | Light grey text           |
| `primary`    | `#7C3AED` | Soft purple               |
| `secondary`  | `#06B6D4` | Cyan blue                 |
| `accent`     | `#F472B6` | Pink — highlights, hearts |
| `cta`        | `#7C3AED` | Purple CTA buttons        |
| `ctaText`    | `#FFFFFF` | White button text         |
| `bubble1`    | `#C4F5FC` | Light cyan bubble         |
| `bubble2`    | `#F5E6FF` | Light purple bubble       |
| `bubble3`    | `#FFE4F0` | Light pink bubble         |

### Typography

| Element            | Font        | Weight | Size (Desktop)  |
| ------------------ | ----------- | ------ | --------------- |
| H1 (Hero)          | Fredoka One | 400    | 4rem / 64px     |
| H2 (Section)       | Fredoka One | 400    | 2.5rem / 40px   |
| H3 (Card)          | Nunito      | 700    | 1.375rem / 22px |
| Body               | Nunito      | 400    | 1rem / 16px     |
| Small/Caption      | Nunito      | 400    | 0.875rem / 14px |
| CTA Button         | Nunito      | 700    | 1rem / 16px     |
| Handwritten accent | Caveat      | 400    | 1.25rem / 20px  |

### Layout Patterns

- **Grid**: Organic, fluid columns, asymmetric
- **Sections**: Wavy SVG dividers between sections, bubble decorations
- **Cards**: Very rounded (24px radius), pastel gradient backgrounds, no hard borders
- **Spacing**: Generous but cozy, consistent padding
- **Nav**: Rounded pill links, logo with sparkle icon, floating feel
- **Footer**: Wavy top edge, purple gradient background, fun icons

### Animation Behavior

| Element          | Animation                         | Timing                                  |
| ---------------- | --------------------------------- | --------------------------------------- |
| Hero text        | Bounce-in from bottom             | `600ms cubic-bezier(.68,-.55,.27,1.55)` |
| Cards            | Wiggle on hover (slight rotate)   | `200ms`                                 |
| Floating bubbles | Slow float up/down (CSS infinite) | `3-5s ease-in-out`                      |
| Stars/sparkles   | Twinkle (opacity pulse)           | `1.5s infinite`                         |
| Buttons          | Jelly squish on click             | `150ms`                                 |
| Section reveal   | Pop-in with slight overshoot      | `500ms spring`                          |
| Page transition  | Morph/scale (View Transitions)    | `400ms`                                 |

### Unique Elements

- **Floating bubble decorations**: Pastel circles floating in background
- **SVG wave dividers**: Between each section
- **Sparkle/star decorations**: Near headings and CTAs
- **Handwritten annotations**: Caveat font for "→ That's us!" style callouts
- **Emoji usage**: Strategic emoji in headings and cards

---

## Theme 5: Noir Luxe

**Vibe**: Premium, exclusive, high-end. For clients who want white-glove service.
**Target audience feel**: "This company is the Rolls-Royce of cleaning services."

### Color Palette

| Token        | Hex                      | Usage                        |
| ------------ | ------------------------ | ---------------------------- |
| `background` | `#0F0F0F`                | Deep charcoal (near black)   |
| `surface`    | `#1A1A1A`                | Slightly lighter cards       |
| `text`       | `#E8E6E3`                | Warm off-white text          |
| `textMuted`  | `#8A8A8A`                | Medium grey text             |
| `primary`    | `#C9A96E`                | Champagne gold — brand color |
| `secondary`  | `#D4AF37`                | Brighter gold — accents      |
| `accent`     | `#8B7355`                | Muted bronze                 |
| `cta`        | `#C9A96E`                | Gold CTA buttons             |
| `ctaText`    | `#0F0F0F`                | Dark button text             |
| `border`     | `#2A2A2A`                | Subtle borders               |
| `glow`       | `rgba(201,169,110,0.15)` | Gold glow effect             |

### Typography

| Element       | Font             | Weight        | Size (Desktop)                                 |
| ------------- | ---------------- | ------------- | ---------------------------------------------- |
| H1 (Hero)     | Playfair Display | 400 (Regular) | 4.5rem / 72px                                  |
| H2 (Section)  | Playfair Display | 400           | 2.75rem / 44px                                 |
| H3 (Card)     | Playfair Display | 600           | 1.5rem / 24px                                  |
| Body          | Lato             | 300 (Light)   | 1rem / 16px                                    |
| Small/Caption | Lato             | 300           | 0.875rem / 14px                                |
| CTA Button    | Lato             | 400           | 0.875rem / 14px, letter-spacing 2px, uppercase |

### Layout Patterns

- **Grid**: Elegant, wide margins, content centered in narrow column (max 900px)
- **Sections**: Separated by thin gold lines or generous dark space
- **Cards**: Dark surface, thin gold border, subtle gold glow on hover
- **Spacing**: Very generous — luxury means space
- **Nav**: Thin, transparent, logo centered, links split left/right, gold on hover
- **Footer**: Minimal, centered, thin gold rule above, small text

### Animation Behavior

| Element         | Animation                             | Timing        |
| --------------- | ------------------------------------- | ------------- |
| Everything      | Slow, elegant, never rushed           | —             |
| Hero text       | Fade up letter-by-letter (stagger)    | `1200ms ease` |
| Sections        | Smooth fade-in from opacity 0         | `800ms ease`  |
| Gold lines      | Draw from left to right               | `600ms ease`  |
| Cards           | Gold border glow intensifies on hover | `400ms ease`  |
| Images          | Grayscale → color on hover            | `600ms ease`  |
| Background      | Subtle grain texture overlay (CSS)    | Static        |
| Page transition | Smooth fade (View Transitions)        | `500ms`       |

### Unique Elements

- **Film grain overlay**: CSS noise texture on background
- **Gold line separators**: Thin animated lines between sections
- **Grayscale imagery**: Photos default to B&W, color on hover
- **Letter spacing**: Generous on headings (0.05em)
- **Testimonial styling**: Large italic serif quotes with gold quotation marks
- **CTA style**: Uppercase, tracked, gold border buttons (outlined, not filled)

---

## Cross-Theme Component Matrix

Each theme needs these components. Implementations differ completely.

| Component        | Minimal Zen                 | Bold Spark                       | Trust Shield              | Bubbly Clean              | Noir Luxe                   |
| ---------------- | --------------------------- | -------------------------------- | ------------------------- | ------------------------- | --------------------------- |
| **Nav**          | Horizontal text centered    | Bold left-aligned + mint accents | Traditional dropdown      | Rounded pills floating    | Split centered transparent  |
| **Hero**         | Centered text, minimal      | Split-screen, diagonal           | Image left, text right    | Bouncy text, bubbles      | Cinematic fade-in, centered |
| **Service Card** | Icon + text, minimal border | Bold border, bright shadow       | Bordered, checkmarks      | Rounded, pastel gradient  | Dark card, gold border      |
| **Testimonial**  | Simple quote block          | Large colored quote              | Star-rated card           | Bubble-shaped card        | Italic serif, gold quotes   |
| **CTA**          | Centered text + button      | Full-width orange block          | Navy banner + trust icons | Purple pill with sparkles | Gold outlined uppercase     |
| **Footer**       | 3-col minimal text          | 4-col mint background            | 4-col navy background     | Wavy purple gradient      | Centered minimal gold       |
| **Pricing**      | Clean comparison table      | Bold cards, orange highlight     | Feature checklist style   | Rounded cards, fun icons  | Elegant cards, gold accents |

---

### Execution Log

#### 2026-02-09 — PHASE: Planning

- All 5 theme specifications documented with colors, typography, layout, and animation details
- Cross-theme component matrix created for consistency tracking
- Design research incorporated from cleaning website best practices and 2026 design trends
