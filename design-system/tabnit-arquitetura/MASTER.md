# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Tabnit Arquitetura
**Generated:** 2026-07-21 20:59:40
**Category:** Architecture / Interior

---

## Global Rules

### Color Palette

Curated manually from the raw search results (Architecture/Interior palette) to match the brief's "tons neutros/terrosos" — warm sand background instead of pure white, warm near-black instead of pure black.

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (ink) | `#1C1B19` | `--color-primary` |
| On Primary | `#FAF7F2` | `--color-on-primary` |
| Secondary (charcoal) | `#46433E` | `--color-secondary` |
| Accent/CTA (bronze) | `#A16207` | `--color-accent` |
| Background (sand) | `#FAF7F2` | `--color-background` |
| Foreground | `#201E1B` | `--color-foreground` |
| Muted (warm grey) | `#EFEAE2` | `--color-muted` |
| Muted Foreground | `#6B675F` | `--color-muted-foreground` |
| Border | `#DFD8CB` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#1C1B19` | `--color-ring` |

**Color Notes:** Warm ink black + bronze/gold accent on a sand background — avoids the coldness of pure black/white while staying premium and WCAG AA compliant.

### Typography

- **Heading Font:** Playfair Display (serif — elegant, premium, editorial)
- **Body Font:** Inter (sans — clean, highly legible, neutral)
- **Mood:** elegant, luxury, sophisticated, timeless, premium, editorial
- **Google Fonts:** [Playfair Display + Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

**Rationale:** the auto-search returned Inter/Inter (Swiss/dashboard mood) and separately "Classic Elegant" (Playfair Display + Inter) for luxury/editorial. Picked the latter pairing manually — Playfair's elegance for headings, Inter's neutrality for body — since Inter/Inter alone reads as a SaaS dashboard, not a high-end architecture studio.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #A16207;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #171717;
  border: 2px solid #171717;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #171717;
  outline: none;
  box-shadow: 0 0 0 3px #17171720;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Swiss Modernism 2.0 + editorial minimalism (manually chosen over "Exaggerated Minimalism" — better fit for a multi-section institutional site that needs a clear grid rather than one giant statement headline)

**Keywords:** 12-column grid, generous negative space, mathematical spacing, high contrast, restrained decoration, large project photography as the hero of every section

**Best For:** Architecture, editorial, professional services, museums

**Key Effects:** `display: grid; grid-template-columns: repeat(12, 1fr)`, 8px base spacing unit, full-bleed project imagery, subtle fade/rise scroll reveals (200–400ms, respects `prefers-reduced-motion`)

### Page Pattern

**Pattern Name:** Institutional One-Pager (multi-section)

- **Conversion Strategy:** Build trust through real social proof (5.0★/21 reviews) and portfolio photography before the contact ask. No hard-sell CTAs — premium services sell on credibility, not urgency.
- **CTA Placement:** Sticky header CTA ("Agendar conversa" / WhatsApp) + repeated at Hero and Contact
- **Section Order:** 1. Header/Nav, 2. Hero, 3. Sobre (Janayne + Rafa), 4. Serviços, 5. Portfólio/Galeria, 6. Prova Social, 7. Diferenciais, 8. Contato, 9. Footer

---

## Anti-Patterns (Do NOT Use)

- ❌ Poor imagery
- ❌ Cluttered layout

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
