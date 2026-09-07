# Codeglint Software — Website

Static website for **Codeglint Software**, Navi Mumbai. Plain HTML, CSS and JavaScript — no build step, no framework, no database. Upload the folder to any host and it works.

---

## 1. What's included

**26 pages**

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Services overview | `services.html` |
| Web Development | `web-development.html` |
| WordPress Development | `wordpress-development.html` |
| IoT Development | `iot-development.html` |
| Android App Development | `android-app-development.html` |
| iOS App Development | `ios-app-development.html` |
| Custom Software | `custom-software.html` |
| UI/UX Design | `ui-ux-design.html` |
| Maintenance & Support | `maintenance-support.html` |
| Pricing | `pricing.html` |
| Portfolio | `portfolio.html` |
| Process | `process.html` |
| Industries | `industries.html` |
| FAQ | `faq.html` |
| Careers | `careers.html` |
| Insights / Blog | `blog.html` |
| Contact | `contact.html` |
| Thank you | `thank-you.html` |
| Terms of Service | `terms.html` |
| Privacy Policy | `privacy.html` |
| Cookie Policy | `cookie-policy.html` |
| Refund & Cancellation | `refund-policy.html` |
| Disclaimer | `disclaimer.html` |
| 404 | `404.html` |

**Supporting files**

- `assets/css/style.css` — all styling, one file
- `assets/js/main.js` — mobile menu, sticky header, scroll reveal, back-to-top, FAQ accordion, contact form handler
- `assets/img/` — logo mark and lockup (SVG), favicons (SVG + PNG), Apple touch icon, social share image
- `favicon.ico` — root favicon for older browsers
- `sitemap.xml` — all 24 indexable pages
- `robots.txt`
- `.htaccess` — HTTPS + non-www redirect, clean URLs, gzip, caching, HSTS and security headers, 404 mapping (Apache/cPanel only)
- `_to_delete/` — the original zip and the pre-refinement stylesheet backup. Delete this folder before uploading.

---

## 2. Publishing

**cPanel / shared hosting (most common in India)**

1. Log in to cPanel → File Manager → `public_html`
2. Upload the contents of this folder (not the folder itself)
3. Make sure `.htaccess` uploaded — File Manager hides dotfiles until you enable *Show Hidden Files* in Settings
4. Visit `https://codeglintsoftwares.com`

**Netlify / Vercel / Cloudflare Pages**

Drag the folder into the dashboard. No build command, publish directory is the root. `.htaccess` is ignored on these hosts — set redirects in their own config if you need clean URLs.

**Before going live**

- [ ] Install an SSL certificate (free via Let's Encrypt in cPanel)
- [ ] Point `codeglintsoftwares.com` and `www` at the host
- [ ] Verify the site in Google Search Console and submit `sitemap.xml`
- [ ] Add the Google Analytics 4 snippet (see section 5)

---

## 3. Making the contact form actually deliver email

Right now `contact.html` opens the visitor's email client with the details pre-filled (`mailto:`). It works everywhere with zero setup, but it depends on the visitor having an email app configured. To receive submissions server-side, pick one:

**Option A — Web3Forms (free, no backend)**

1. Get an access key at web3forms.com
2. In `contact.html`, change the form tag to:
   ```html
   <form action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR-KEY-HERE">
     <input type="hidden" name="redirect" value="https://codeglintsoftwares.com/thank-you.html">
   ```
3. Delete `id="enquiry-form"` from the form tag so the JavaScript handler stops intercepting it.

**Option B — PHP on your own hosting**

Create `send.php` in the root with a `mail()` or PHPMailer handler, set `action="send.php" method="POST"`, and remove `id="enquiry-form"`. Every field already has a `name` attribute.

Either way, `thank-you.html` is ready as the success page.

---

## 4. Editing content

Everything is plain HTML — open a file in any editor and change the text.

**Details that appear on every page** (header, footer, contact blocks): search and replace across all `.html` files.

- Email: `codeglintsoftware@gmail.com`
- Phone display: `+91 96730 18702`
- Phone link: `+919673018702`
- Address: `SS/3, Room No. 454, 2nd Floor` / `Sector 8, Koparkhairane` / `Navi Mumbai, Maharashtra 400709, India`

**Social links** — in the footer of every page, the four `<a href="#">` inside `<div class="social">`. Replace `#` with your real LinkedIn, Facebook, X and Instagram URLs.

**Logo** — currently the letters "CG" in a blue rounded square (`<span class="logo-mark">`). To use an image instead, replace that span with `<img src="assets/img/logo.png" alt="Codeglint Software" style="height:38px">` in the header and footer.

**Favicon** — an inline SVG data URI in each page's `<link rel="icon">`. To use a file, drop `favicon.ico` in the root and change that line to `<link rel="icon" href="favicon.ico">`.

**Colours** — the whole palette is defined once at the top of `assets/css/style.css` under `:root`. Change `--brand` and everything follows.

---

## 5. Adding Google Analytics

Paste your GA4 snippet immediately before `</head>` in every page:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

A quick way to do it across all files on Mac or Linux:
`for f in *.html; do sed -i '' 's#</head>#<!-- paste snippet -->\n</head>#' "$f"; done`

---

## 6. Things worth doing next

1. **Replace the portfolio placeholders.** `portfolio.html` currently describes representative project types with a note saying so. Swap in real named case studies with client permission, screenshots and results — that page converts more than any other.
2. **Add testimonials.** There are deliberately none in the build, because invented ones do more harm than good. Collect two or three real quotes and add them using the `.quote` component already in the stylesheet.
3. **Write the blog posts.** `blog.html` lists nine planned article titles with a "coming soon" notice. Each one can become its own page reusing the structure of any legal page.
4. **Have a lawyer review the legal pages.** Terms, Privacy, Cookies, Refund and Disclaimer are written for an Indian sole proprietorship serving domestic and overseas clients, but they are working drafts, not legal advice.
5. **Add real photos.** The site uses icons and colour rather than stock photography. Office and team photos in the About page will lift it considerably.
6. **Confirm the pricing.** All figures are in USD and reflect standard offshore agency rates. Adjust in `pricing.html` and in the "From $X" figures on each service page and on `services.html`.

---

## 7. Browser support

Chrome, Edge, Firefox and Safari, current and previous versions, on desktop and mobile. Layout is responsive from 320px upwards, with a hamburger menu below 900px. Respects `prefers-reduced-motion`.

---

## 8. Brand assets

Everything sits in `assets/img/`:

| File | Use |
|---|---|
| `logo-mark.svg` | Square mark on its own — app icons, social avatars, favicons |
| `logo.svg` | Full lockup (mark + "Codeglint Software") — letterheads, email signature, invoices |
| `favicon.svg` / `favicon-32.png` / `favicon-192.png` / `favicon-512.png` | Browser tabs and Android home screen |
| `apple-touch-icon.png` | iOS home screen (180×180) |
| `og-image.png` | The preview card shown when the site is shared on WhatsApp, LinkedIn or X (1200×630) |

The mark in the header and footer is inline SVG, so it stays sharp at any zoom and costs no extra request. To swap in a different logo later, replace the `<span class="logo-mark">…</span>` block in the header and footer of each page with `<img src="assets/img/your-logo.svg" alt="Codeglint Software" style="height:38px">`.

The whole colour system is defined once at the top of `assets/css/style.css` under `:root`. Change `--brand` and every button, icon, link and gradient follows.

---

## 9. What changed in the refinement pass

- New brand mark (chevrons + spark), real favicon set, Apple touch icon and a social share image
- Restored `.htaccess` (macOS unzip drops dotfiles), now also with non-www redirect and HSTS
- Refined type scale, balanced headline wrapping, tighter letter-spacing, no orphan words
- Layered shadows and a proper elevation scale in place of flat borders
- Sticky header that tightens and casts a shadow on scroll, with an active-page underline
- Fade-up scroll reveal with staggered cards, fully disabled under `prefers-reduced-motion`
- Icons that fill with brand gradient on card hover; cards lift on hover
- Back-to-top button, animated hamburger, one-open-at-a-time FAQ accordions
- Subtle grid textures on the hero, brand bands and CTA blocks
- Zebra-striped tables, refined pricing cards, gradient footer top border
- Print stylesheet, focus-visible outlines, custom scrollbar on desktop
