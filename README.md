# Sunrise Multispecialty Clinic & Nursing Home — Website

A modern, responsive static website for a doctor / clinic / nursing home. Built with plain HTML5, CSS3 and vanilla JavaScript — no build step, no backend, no dependencies to install. Ready to deploy to GitHub Pages, Netlify, Vercel, or any static host.

## What's Included

- 8 pages: Home, About Doctor, Services, Facilities (with photo gallery + lightbox), Contact/Appointment, FAQ, Privacy Policy, Terms & Conditions
- A shared design system (`assets/css/style.css`) — colors, type, buttons, cards, forms, accordion, gallery/lightbox, footer, all fully responsive
- Vanilla JS (`assets/js/main.js`) — mobile nav, sticky header, scroll reveal animations, back-to-top, FAQ accordion, gallery lightbox, appointment form validation
- Frontend-only appointment enquiry form with validation and a confirmation message
- Consistent-style SVG placeholder illustrations for the doctor and clinic photos/gallery (see [Replacing Images](#replacing-images))
- SEO: unique titles/descriptions per page, Open Graph tags, canonical URL placeholders, semantic HTML, `Schema.org` JSON-LD (`MedicalClinic`, `Physician`, `FAQPage`)
- Mobile sticky Call / WhatsApp / Appointment bar, plus a floating back-to-top button
- Accessible: skip link, labeled form fields, keyboard-operable nav/accordion/lightbox, visible focus states, `aria-*` attributes

## Project Structure

Every page is a flat `.html` file at the project root, so the site can be opened directly over `file://` (double-click `index.html`) with every link resolving correctly — no local server required.

```text
ClinicWebsite/
├── index.html         Home            → /index.html
├── about.html         About Doctor    → /about.html
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

## Customization Checklist

All placeholder content uses square brackets (`[Clinic Address]`), `XXXXX` phone digits, or an `<em>` note — search each HTML file for these to find what to replace. Every page repeats the same header/footer markup (no templating engine is used), so most global changes need to be made **once per file** — a simple project-wide find & replace works well for values like the clinic name, phone number, and address.

1. **Clinic identity** — replace "Sunrise Multispecialty Clinic & Nursing Home" with the real clinic name across all HTML files (`<title>`, header logo text, footer, JSON-LD `name` fields).
2. **Doctor details** — update name, qualifications (MBBS/MD/etc.), specialization, registration number, years of experience, and biography in `index.html` and `about.html`.
3. **Contact details** — replace every instance of:
   - `+91XXXXXXXXXX` (used in `tel:`/`wa.me` links) and `+91 XXXXX XXXXX` (displayed text)
   - `example@clinic.com`
   - `[Clinic Address]` / `[Clinic Address Line 1]`
   - Working hours in the footer, Contact page, and FAQ page
4. **Google Maps** — in `contact.html`, replace the `<iframe src="...">` URL with your clinic's actual Google Maps embed link (Google Maps → Share → Embed a map → copy the `src` URL).
5. **Services & Facilities** — edit the cards in `services.html` and `facilities.html` to reflect what the clinic actually offers. Remove any facility card that doesn't apply, or replace its "To Confirm" tag once verified.
6. **Structured data (JSON-LD)** — each page has one or more `<script type="application/ld+json">` blocks in `<head>` (including a `BreadcrumbList` on every inner page). Update the address, phone, geo-coordinates and physician details so search engines show accurate local info. Do not add unverified credentials, awards, or claims.
7. **Canonical & Open Graph URLs** — replace `https://www.example-clinic.com/...` with your real domain once deployed. This appears in: every page's `<link rel="canonical">`, `og:url`, and the JSON-LD `url`/`item` fields — **and** in `robots.txt` (`Sitemap:` line) and every `<loc>` in `sitemap.xml`.
8. **Social profile links** — the JSON-LD `sameAs` array in `index.html` and `contact.html` has `[your-page]` placeholders for Facebook/Instagram — fill in real profile URLs or delete the array entirely if the clinic has none.
9. **Appointment form backend** — the form in `contact.html` (`#appointmentForm`) is frontend-only. In `assets/js/main.js`, inside `initAppointmentForm()`, replace the `// TODO (developer)` block with a real submission call (e.g. `fetch()` to your API, or a service like Formspree/Netlify Forms/EmailJS).
10. **Favicon & OG image — action required for social sharing** — `assets/icons/favicon.svg` works fine as a favicon, but `assets/images/og-image.svg` should be replaced with a real **1200×630 PNG or JPG**. Most social platforms (Facebook, LinkedIn, WhatsApp, X/Twitter) do not render SVG for link-preview images, so until this is swapped, shared links will show no preview image. Update the `og:image` and `twitter:image` meta tags on every page to point at the new file.

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

## Deployment

This is a fully static site — drag-and-drop the folder onto Netlify/Vercel, or push to a GitHub repo and enable GitHub Pages (serve from the repository root).
