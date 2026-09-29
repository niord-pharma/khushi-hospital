# Khushi Hospital & Laparoscopy Centre — Website

A modern, responsive static website for Khushi Hospital & Laparoscopy Centre, Dalsinghsarai (Samastipur), Bihar. Built with plain HTML5, CSS3 and vanilla JavaScript — no build step, no backend, no dependencies to install. Deployed via GitHub Pages at `https://niord-pharma.github.io/khushi-hospital/`.

> **Content status:** the site has been populated with the hospital's real name, registration number (100/22 (R)), address, phone numbers (+91 99342 55831, +91 70046 99355), doctors and staff, 24/7 emergency, and Ayushman Bharat (PM-JAY) empanelment. Items still needing the hospital's input are marked in-page with `[square-bracket]` notes or a `To Confirm` tag — see the checklist below.

## What's Included

- 8 pages: Home, About Us, Services, Facilities (with photo gallery + lightbox), Contact/Appointment, FAQ, Privacy Policy, Terms & Conditions
- A shared design system (`assets/css/style.css`) — colors, type, buttons, cards, forms, accordion, gallery/lightbox, footer, all fully responsive
- Vanilla JS (`assets/js/main.js`) — mobile nav, sticky header, scroll reveal animations, back-to-top, FAQ accordion, gallery lightbox, appointment form validation
- Frontend-only appointment enquiry form with validation and a confirmation message
- Consistent-style SVG placeholder illustrations for the doctor and clinic photos/gallery (see [Replacing Images](#replacing-images))
- SEO: unique titles/descriptions per page, Open Graph tags, canonical URLs, semantic HTML, `Schema.org` JSON-LD (`Hospital`, `Physician`, `FAQPage`, `BreadcrumbList`)
- Mobile sticky Call / WhatsApp / Appointment bar, plus a floating back-to-top button
- Accessible: skip link, labeled form fields, keyboard-operable nav/accordion/lightbox, visible focus states, `aria-*` attributes

## Project Structure

Every page is a flat `.html` file at the project root, so the site can be opened directly over `file://` (double-click `index.html`) with every link resolving correctly — no local server required.

```text
ClinicWebsite/
├── index.html         Home            → /index.html
├── about.html         About Us        → /about.html
├── services.html      Services        → /services.html
├── facilities.html    Facilities      → /facilities.html
├── contact.html       Contact         → /contact.html
├── faq.html           FAQ             → /faq.html
├── privacy.html       Privacy Policy  → /privacy.html
├── terms.html         Terms           → /terms.html
├── 404.html           Not found page
├── robots.txt         Crawler rules + sitemap pointer
├── sitemap.xml        Sitemap of the 6 indexable pages
├── assets/
│   ├── css/style.css  All site styling (design tokens at the top)
│   ├── js/main.js     All site behavior
│   ├── icons/         Logo & favicon (SVG)
│   └── images/
│       ├── doctor/    Doctor hero + profile illustration placeholders
│       ├── clinic/     (reserved for additional clinic photos)
│       ├── gallery/     6 gallery placeholder illustrations
│       └── services/    (reserved for service-specific images/icons)
└── README.md
```

**How the links work:** every page links to every other page with a plain flat filename (`about.html`, `services.html#general-consultation`, …) and to `index.html` for Home, with assets referenced as `assets/...` from the root. Because paths are relative rather than absolute (no leading `/`), the site works correctly whether opened directly over `file://`, deployed at a domain root (`example.com/`), or a subpath (`example.com/reponame/`, as GitHub Pages project sites use) — nothing to reconfigure either way.

**Adding a new page:** create `newpage.html` following the pattern of an existing page, add a `newpage.html` link to the nav/footer blocks on every other page, and give its `<a class="nav-link">` a `data-nav="newpage"` attribute so `assets/js/main.js` can highlight it correctly when active.

## Quick Start

No build tools and no local server required — just open `index.html` directly in a browser (double-click it, or drag it into a browser tab) and click through the site normally.

You can still serve it with a local web server if you prefer (e.g. for testing under `http://` instead of `file://`):

```powershell
# Python
python -m http.server 8080
# or Node
npx serve .
```

Then visit `http://localhost:8080`.

## Still To Do (needs the hospital's input)

Search the HTML files for `[` (square-bracket notes) and `To Confirm` to find every spot. The hospital name, registration number, address, phone numbers, doctors/staff, hours and Ayushman empanelment are already filled in.

1. **Doctor profile** — `about.html` / `index.html` have a bracketed note where Dr. Amit Kumar's experience summary can be added. Add only verified details (years of experience, registration number, special interests). Do not add unverified credentials or claims.
2. **Procedure lists** — `services.html` has `[Confirm ...]` notes on General Surgery, Laparoscopic Surgery and Diagnostics. Replace with the exact procedures the hospital performs.
3. **Facilities marked "To Confirm"** — in `facilities.html`: Pharmacy, Laboratory / Diagnostics, Ambulance. Mark each Available or remove the card.
4. **OPD timings** — currently shown as "call to confirm" on the Contact page and FAQ. Add real OPD days/hours per doctor if they are fixed.
5. ~~**Google Maps**~~ — done. `contact.html` embeds the exact "Embed a map" URL from the hospital's Google Business Profile listing, and the `geo` latitude/longitude in the `contact.html` and `index.html` JSON-LD match it.
6. **Appointment form delivery** — the form in `contact.html` posts to [Web3Forms](https://web3forms.com) with a hidden `access_key`. That key is still tied to the *original* email it was created with, not `rambharoshpatel418@gmail.com` — Web3Forms access keys can't be repointed to a new inbox without re-verifying, since Web3Forms itself sends a confirmation to the address. To have enquiries land in `rambharoshpatel418@gmail.com`: sign up / log in at [web3forms.com](https://web3forms.com) with that address, copy the new access key it gives you, and swap it into the `value` of `<input type="hidden" name="access_key" ...>` in `contact.html` (line ~218).
7. **Logo, favicon & OG image** — the HTML now references raster files that must be added:
   - `assets/icons/logo.png` — header + footer mark (use the square emblem version; square, ideally 256px+).
   - `assets/icons/favicon.png` — browser-tab icon (same emblem; square, 48–256px). Optionally also add `favicon.ico` at the site root.
   - `assets/images/og-image.png` — social-share image (the full round seal works; a 1200×630 version is ideal but not required).
   Until these files exist the logo/favicon/preview will be broken. The old `.svg` placeholders in `assets/icons/` are now unused and can be deleted.
8. **Real photos** — replace the placeholder SVGs in `assets/images/` (see *Replacing Images* below).
9. **Google Search Console** — after GitHub Pages is live, verify the property `https://niord-pharma.github.io/khushi-hospital/` and submit `https://niord-pharma.github.io/khushi-hospital/sitemap.xml` directly (robots.txt auto-discovery does not work on a project subpath). Create a Google Business Profile for local search.

## Replacing Images

All photos are currently lightweight, brand-colored SVG illustrations so the site works immediately with **zero external image dependencies** and loads fast. Replace them with real photographs when available:

| File | Used on | Replace with |
|---|---|---|
| `assets/images/doctor/doctor-hero.svg` | Home hero | A high-quality photo of the doctor |
| `assets/images/doctor/doctor-profile.svg` | Home + About | A professional portrait of the doctor |
| `assets/images/gallery/*.svg` (6 files) | Facilities gallery | Real photos of the exterior, reception, consultation room, patient room, equipment, waiting area |

Keep the same filenames (or update the `src` attributes) and use similarly cropped/oriented images (portrait for doctor photos, 4:3 landscape for gallery photos) so the existing layout doesn't shift. Compress photos (JPEG/WebP, ~150–300 KB) before adding them, and keep `loading="lazy"` on gallery `<img>` tags.

## Design System

Design tokens (colors, spacing, radii, shadows) live at the top of `assets/css/style.css` under `:root`. Change the values there to re-theme the entire site — e.g. `--color-primary` and `--color-accent` control the two main brand colors used throughout.

## Important Notes (Healthcare Content)

- No guaranteed-outcome claims, fake reviews, invented awards, or invented credentials are included — keep it that way when you customize.
- The appointment form is clearly labeled as an **enquiry**, not a confirmed booking, per healthcare-site best practice.
- An emergency disclaimer is included on the Contact and FAQ pages — do not remove it.
- Replace `[Medical Council Registration Number]` and similar fields only with verified, accurate information.

## Browser & Performance Notes

- No JS frameworks or CSS frameworks are loaded — only Font Awesome (icons) via CDN and the site's own CSS/JS.
- Images are SVG (tiny, resolution-independent) until replaced with real photos; keep replacements optimized for web.
- `IntersectionObserver` powers scroll-reveal animations with a plain-CSS fallback for unsupported browsers.
- Respects `prefers-reduced-motion`.

## Offline Support (PWA)

`sw.js` is a service worker that pre-caches every page and asset (CSS, JS, icons, images, and the Google Fonts/Font Awesome CDN files once fetched once) on first visit. After that, the site keeps working with no internet connection — useful given patchy connectivity in the area — and `manifest.json` lets visitors "Add to Home Screen" for an app-like icon.

- Registered from `assets/js/main.js`, so every page picks it up automatically. Registration is wrapped in a feature check and a silent `.catch()`, so it's a no-op (not an error) on browsers without service worker support or when the site is opened directly via `file://` (service workers require `http(s)`).
- Page loads use network-first (fresh content when online, cached copy when offline); other assets use cache-first with a background refresh.
- **When you change any site file, bump `CACHE_VERSION` in `sw.js`** so returning visitors get the update instead of a stale cached copy. If you add/rename/remove a file, also update the `PRECACHE_PATHS` list in `sw.js`.
- Works at a domain root or a GitHub Pages subpath, since it's registered and builds all cache URLs relative to the page/scope rather than absolute paths.

## Deployment

This is a fully static site — drag-and-drop the folder onto Netlify/Vercel, or push to a GitHub repo and enable GitHub Pages (serve from the repository root).
