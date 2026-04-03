

## Lighthouse Optimization Plan

10 changes across 8 files. No visual/layout alterations.

---

### 1. Contrast fixes (`src/index.css`)

Adjust 3 CSS custom properties for WCAG 4.5:1 compliance:

- `--brand-gold-500: 40 54% 50%` → `38 80% 30%` (darker gold, ~#8A7008, passes on white bg)
- `--brand-primary-400: 199 46% 42%` → `200 50% 65%` (lighter blue, passes on dark bg)
- `--brand-primary-500: 199 56% 32%` → `200 55% 55%` (lighter blue, passes on dark bg)

### 2. Remove `role="list"` (`src/components/Services.tsx`)

Line 67: remove `role="list"` from the grid div. Cards are not semantic list items.

### 3. Unique `aria-label` on WhatsApp links

- **Hero.tsx** line 55: add `aria-label="Falar com a Dra. Kelly no WhatsApp — Hero"`
- **Services.tsx** line 84: add `aria-label="Falar no WhatsApp — Serviços"` (inside map, append service title for uniqueness: `aria-label={\`Falar no WhatsApp — ${title}\`}`)
- **CTAFinal.tsx** line 28: add `aria-label="Falar no WhatsApp — CTA final"`
- **Header.tsx**: add `aria-label="Falar no WhatsApp — menu"` on both desktop and mobile nav links
- **WhatsAppButton.tsx**: already has aria-label; update desktop to `"Falar no WhatsApp — botão flutuante"` and mobile to `"Falar no WhatsApp — botão flutuante mobile"`
- **MobileStickyBar.tsx**: add `aria-label="Falar no WhatsApp — barra fixa mobile"`

### 4. Font loading optimization (`index.html`)

Replace the current Google Fonts `<link rel="stylesheet">` with a preload pattern:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@500;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@500;600&display=swap" /></noscript>
```

Font families already have `&display=swap`. System fallbacks already configured in `tailwind.config.ts`.

### 5. Lazy loading — already done

`Index.tsx` already uses `React.lazy` for FAQ, CTAFinal, InstitutionalContact, Footer, WhatsApp buttons, ScrollToTop, MobileStickyBar. No change needed.

### 6. Hero image — already optimized

Already has `loading="eager"`, `fetchPriority="high"`, `decoding="async"`, `width`, `height`. No change needed.

### 7. Tailwind content config — already correct

Content array already covers `./src/**/*.{ts,tsx}`. No change needed.

### 8. Defer GTM (`index.html`)

Move GTM script from `<head>` to end of `<body>`, wrapped in `window.addEventListener('load', ...)` with 1500ms delay. Keep the `<noscript>` iframe after `<body>` opening.

### 9. Create `netlify.toml`

New file at project root with security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, HSTS, CSP), cache headers for `/assets/*`, build config, and SPA redirect.

### 10. Create `vercel.json`

New file at project root with equivalent security headers and SPA rewrite.

---

### Files touched

| File | Action |
|---|---|
| `src/index.css` | Modify 3 color values |
| `src/components/Services.tsx` | Remove `role="list"` |
| `src/components/Hero.tsx` | Add aria-label |
| `src/components/CTAFinal.tsx` | Add aria-label |
| `src/components/Header.tsx` | Add aria-labels |
| `src/components/WhatsAppButton.tsx` | Update aria-labels |
| `src/components/MobileStickyBar.tsx` | Add aria-label |
| `index.html` | Preload fonts + defer GTM |
| `netlify.toml` | Create |
| `vercel.json` | Create |

