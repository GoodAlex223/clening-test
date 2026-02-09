# Manual Testing

Manual testing scenarios and checklists for CleanSpark.

**Last Updated**: 2026-02-09

---

## Testing Scenarios

### Scenario 1: Theme Switching

**Purpose**: Verify all 5 themes load correctly and switching works.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open site with no cookie set | Minimal Zen theme loads (default) |
| 2 | Click theme switcher, select "Bold Spark" | Page reloads with Bold Spark design |
| 3 | Navigate to Services page | Bold Spark design persists |
| 4 | Refresh the browser | Bold Spark still active (cookie persisted) |
| 5 | Switch to each remaining theme | Each theme renders correctly |
| 6 | Clear cookies, reload | Falls back to Minimal Zen |

### Scenario 2: Mobile Responsiveness

**Purpose**: Verify all pages render correctly on mobile viewports.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open DevTools, set viewport to 320px | Layout adapts, no horizontal scroll |
| 2 | Test navigation menu | Hamburger/mobile nav works |
| 3 | Check hero section | Text readable, CTA visible |
| 4 | Scroll through all sections | No overlapping elements |
| 5 | Test on 375px (iPhone SE) | Layout correct |
| 6 | Test on 768px (iPad) | Tablet layout renders |
| 7 | Test on 1024px (laptop) | Desktop layout renders |
| 8 | Repeat for all 5 themes | All themes responsive |

### Scenario 3: Page Navigation

**Purpose**: Verify all routes work and content loads.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate Home → Services | Services page loads with service cards |
| 2 | Navigate Services → About | About page loads with team info |
| 3 | Navigate About → Pricing | Pricing page loads with tiers |
| 4 | Navigate Pricing → Gallery | Gallery page loads with photos |
| 5 | Navigate Gallery → Contact | Contact page loads with form |
| 6 | Click logo/brand | Returns to Home |
| 7 | Enter invalid URL (e.g., /xyz) | 404 page displays in current theme |

### Scenario 4: Content Accuracy

**Purpose**: Verify business content renders correctly across themes.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check services on Home page | All services listed with icons |
| 2 | Check Services page detail | Each service has name, description, features |
| 3 | Check testimonials | Names, ratings, review text displayed |
| 4 | Check team on About page | Photos, names, roles, bios visible |
| 5 | Check pricing tiers | 3 tiers with features, prices, CTA |
| 6 | Check contact info | Phone, email, address, hours visible |
| 7 | Repeat for all 5 themes | Same content, different presentation |

### Scenario 5: Interactive Features

**Purpose**: Verify JavaScript islands work correctly.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Theme switcher click | Opens theme selection UI |
| 2 | Contact form — submit empty | Validation errors appear |
| 3 | Contact form — fill required fields | Submit button becomes active |
| 4 | Contact form — submit valid data | Success message appears |
| 5 | Gallery — click filter category | Photos filter to selected category |
| 6 | Gallery — before/after slider | Slider reveals before/after images |

### Scenario 6: Performance

**Purpose**: Verify site meets performance budgets.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run Lighthouse on Home | Performance 90+, Accessibility 90+ |
| 2 | Run Lighthouse on Services | Performance 90+ |
| 3 | Run Lighthouse on Gallery | Performance 85+ (images) |
| 4 | Check JS bundle size | <100KB total |
| 5 | Test with JS disabled | All content visible (progressive enhancement) |
| 6 | Check First Contentful Paint | <1s on fast 3G |

### Scenario 7: Cross-Browser

**Purpose**: Verify compatibility across browsers.

| Browser | Version | Pages to Test | Expected |
|---------|---------|---------------|----------|
| Chrome | Latest | All 6 pages × 5 themes | Fully functional |
| Firefox | Latest | All 6 pages × 5 themes | Fully functional |
| Safari | Latest | All 6 pages × 5 themes | Fully functional |
| Edge | Latest | All 6 pages × 5 themes | Fully functional |
| Mobile Safari | iOS Latest | Home, Services, Contact | Responsive, touch-friendly |
| Chrome Android | Latest | Home, Services, Contact | Responsive, touch-friendly |

---

## Checklists

### Pre-Theme-Completion Checklist

Use before marking any theme as "done":

- [ ] All 6 pages render correctly in this theme
- [ ] Mobile responsive (320px–1920px)
- [ ] Navigation works (all links, mobile menu)
- [ ] All content collections render (services, testimonials, team, pricing, gallery)
- [ ] CTAs visible and properly styled
- [ ] No console errors
- [ ] No layout overflow or broken elements
- [ ] Hover states and animations work
- [ ] Lighthouse 90+ on Home page
- [ ] No TypeScript errors

### Pre-Release Checklist

Use before v1.0 deployment:

- [ ] All 5 themes pass Pre-Theme-Completion checklist
- [ ] Theme switching works reliably (30 theme changes without bugs)
- [ ] All E2E tests passing
- [ ] Accessibility audit passing (WCAG 2.1 AA)
- [ ] Cross-browser tested
- [ ] Performance budgets met (<100KB JS, <1s FCP)
- [ ] 404 page works in all themes
- [ ] Meta tags / Open Graph correct on all pages
- [ ] Favicon and social share images present
- [ ] No console warnings or errors
- [ ] README screenshots current

---

*See [ARCHITECTURE.md](ARCHITECTURE.md) for system design.*
*See [planning/TODO.md](planning/TODO.md) for active tasks.*
