# Brand Asset Inventory & Audit Report

**Brand Name:** نظارات الفرنسي بلس — Al-Fransi Plus Optics & Audiology  
**Primary Color Palette:**
- Primary Gold: `#F8C10C` / `#F4C400`
- Deep Navy: `#071A2B`
- Secondary Navy: `#0B2940`
- Storefront Cyan: `#087E8B`
- Bright Cyan: `#16C7D9`
- Frame Silver Highlight: `#EAEAEF`

---

## 1. Asset Inventory & Usage Mapping

| Asset File | Usage & Purpose | Dimensions | Format | Notes / Optimization |
| :--- | :--- | :--- | :--- | :--- |
| `logo-primary.png` / `.webp` | Primary website logo (Header & Navigation) | 598 × 267 | PNG / WebP | Clean composition: Glasses emblem + "الفرنسي بلس" + "للبصريات والسمعيات". Phone numbers and tiny slogan removed for optimal legibility at header height. |
| `logo-header.png` | Header navigation brand logo | 598 × 267 | PNG | High-density retina rendering with `h-12 sm:h-14` responsive height. |
| `logo-footer.png` / `.webp` | Footer brand presentation logo | 606 × 273 | PNG / WebP | Clean composition formatted for larger footer bounds (~240px width). Excludes phone numbers to rely on accessible HTML text. |
| `logo-marketing.png` / `.webp` | Social marketing, WhatsApp banners & posters | 598 × 333 | PNG / WebP | Complete full lockup featuring glasses emblem, wordmark, tagline, slogan, and phone numbers. |
| `logo-mark.png` / `.webp` | Compact UI, badges, and mobile icons | 383 × 96 | PNG / WebP | Tight crop on the gold glasses emblem (`o+o` + plus sign). |
| `logo-master.png` / `.webp` | Master source artwork | 707 × 353 | PNG / WebP | Permanent master asset file. |
| `icon-512.png` | PWA & App Touch Icon (512px) | 512 × 512 | PNG | High-resolution square app icon for PWA manifest. |
| `icon-192.png` | PWA & App Touch Icon (192px) | 192 × 192 | PNG | Standard Android / Chrome homescreen icon. |
| `apple-icon.png` | Apple Touch Icon | 512 × 512 | PNG | iOS homescreen bookmark icon. |
| `favicon.png` | Browser tab icon | 383 × 96 | PNG | High-contrast favicon glyph. |
| `og-image.png` | Social sharing OpenGraph card | 598 × 333 | PNG | Standard 1200×630 canvas preview for WhatsApp, Twitter, and Facebook sharing. |
| `brand-manifest.json` | JSON specifications of brand tokens and paths | N/A | JSON | Centralized JSON manifest referencing all asset paths and HEX colors. |

---

## 2. Technical Safeguards & Visual QA Rules
1. **Aspect Ratio Protection**: All images use `object-fit: contain` and proportional bounds (`width: auto`, `h-12`, `h-16`) to guarantee zero vertical or horizontal distortion.
2. **Text vs Image Separation**: Phone numbers (`773945678` - `777266692`) and address details are rendered as interactive, accessible HTML text/buttons rather than relying on image rasterization.
3. **Consistent SVG Icons**: All UI iconography (Phone, Clock, Location, Calendar, WhatsApp, Search, Checkmarks) utilizes `lucide-react` vector SVGs for crisp high-DPI scaling across screen resolutions.
4. **Orientation Stability**: The logo maintains its authentic visual orientation across both Arabic (`RTL`) and English (`LTR`) display modes.
