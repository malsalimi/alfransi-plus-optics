# Brand Asset Kit — الفرنسي بلس / Al-Fransi Plus Optics & Audiology

Derived from the single supplied master logo. No typography, wording,
proportions, or colors were redesigned — every file below is a crop,
export, or resize of the original artwork. See **Limitations** at the
bottom for the two spots where a perfect 1:1 result wasn't possible and
what was done instead.

## Usage map

| Use case | Asset |
|---|---|
| Header — desktop | `logo-primary.png` / `.webp` |
| Header — mobile / small nav | `logo-mark.png` / `.webp` |
| Header — dark background | `logo-header-dark.png` / `.webp` |
| Header — light background | `logo-header-light.png` / `.webp` |
| Footer | `logo-footer.png` / `.webp` |
| About page / loading screens | `logo-primary.png` / `.webp` |
| Favicon (browser tab) | `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png` |
| PWA app icon | `icon-512.png` (also `favicon-192.png`, `favicon-512.png`) |
| Social share / Open Graph | `og-brand.png` / `.webp` (1200×630) |
| Social profile picture / small badges | `logo-mark.png` / `.webp` |
| Marketing — posters, WhatsApp, social posts | `logo-marketing.png` / `.webp` |
| Permanent source file — never edit or ship as-is | `original/logo-master.png` / `.webp` |

## What's in each asset

- **`logo-primary`** — glasses emblem + "الفرنسي بلس" + "للبصريات
  والسمعيات." Slogan line and phone numbers removed (only from this
  derivative) because they become unreadable at header sizes. This is the
  main website logo.
- **`logo-footer`** — same visual content as `logo-primary`, exported with
  slightly more breathing room for a footer's larger layout. Phone numbers
  are intentionally excluded — display real contact info as HTML text in
  the footer rather than baking it into an image.
- **`logo-marketing`** — the complete original composition: emblem,
  wordmark, tagline, slogan, and phone numbers. For social posts, banners,
  and printed/WhatsApp material only — not for site navigation.
- **`logo-mark`** — a compact crop centered on the lens emblem (the gold
  "+" and the two lens shapes), the most compact recognizable fragment of
  the mark. For places too small for the full lockup.
- **`favicon.ico` / `favicon-*.png` / `icon-512.png`** — derived from an
  even tighter, squared crop of the gold lens + "+", the single boldest and
  most legible fragment of the emblem at very small sizes (see Limitations).
- **`og-brand`** — the primary logo centered on a plain white 1200×630
  canvas with a soft contact shadow for depth. Not a stretched logo — the
  original aspect ratio is preserved and it's scaled to fit with margin.
- **`logo-header-dark` / `logo-header-light`** — intentionally identical
  files. The logo's own gradient (white highlight → gray shadow) was tested
  against both a white and a dark navy background and stayed legible on
  both, so no recolor was needed per the brief's instruction not to
  recolor arbitrarily.

## Sizes at a glance

| File | Dimensions |
|---|---|
| `original/logo-master.png` / `.webp` | 707 × 353 (untouched original) |
| `logo-primary.png` / `.webp` | 598 × 267 |
| `logo-header-dark.png` / `.webp` | 598 × 267 |
| `logo-header-light.png` / `.webp` | 598 × 267 |
| `logo-footer.png` / `.webp` | 606 × 273 |
| `logo-marketing.png` / `.webp` | 598 × 333 |
| `logo-mark.png` / `.webp` | 383 × 96 |
| `favicon-16.png` | 16 × 16 |
| `favicon-32.png` | 32 × 32 |
| `favicon-48.png` | 48 × 48 |
| `favicon-192.png` | 192 × 192 |
| `favicon-512.png` | 512 × 512 |
| `favicon.ico` | multi-size (16/32/48/64/128/256) |
| `icon-512.png` | 512 × 512 |
| `og-brand.png` / `.webp` | 1200 × 630 |

## Safe area & minimum sizes

- **Clear space:** keep padding around any logo file equal to at least the
  height of the "الفرنسي بلس" wordmark inside it (~15% of the asset's own
  height) — don't crop further or let other elements touch the glasses
  frame.
- **Minimum digital size:** don't display `logo-primary` narrower than
  ~160px wide — the tagline text starts to break up below that.
  `logo-mark` holds up down to ~60px wide.
- **Recommended header height:** 56–72px (desktop), 40–48px (mobile, use
  `logo-mark`).
- **Recommended footer size:** 64–90px tall.
- **Minimum readable size (full lockup):** ~200px wide. Below that, switch
  to `logo-mark`; below ~40px, use the favicon glyph only.

## Limitations encountered (read before handing to the developer)

1. **Source resolution is 707 × 353px.** That's fine for header/footer/nav
   use at native or near-native size, but `og-brand` (1200×630) required
   upscaling the logo ~1.67× to fill the canvas, and `favicon-512` /
   `icon-512` were upscaled from a ~170px-wide crop. Both were upscaled
   with high-quality (Lanczos) resampling and look clean on screen, but if
   pixel-perfect large-format output is ever needed (e.g. a large printed
   banner), ask the client for a higher-resolution source file.

2. **No SVG was produced.** The master logo is a raster composition with
   photographic gradients, bevels, and soft shadows on both the frame and
   the gold lenses — not flat vector shapes. Auto-tracing it would have
   meant redrawing the typography and shading from scratch, which the brief
   explicitly ruled out ("do not fake or redraw the typography"). PNG and
   WebP are provided at high resolution instead, which covers all listed
   use cases (CSS `background-image`/`<img>`, including in a Next.js
   `<Image>` component).

3. **The glasses frame and the wordmark are visually fused** — the gold
   lenses are literally shaped from the letter "م" and a "+", and the frame
   arcs are wrapped directly around "الفرنسي بلس." There is no clean seam
   to cut a "logo only, zero text" mark without erasing part of the actual
   artwork. `logo-mark` and the favicon glyph solve this by using the
   emblem sub-region (lenses + "+") rather than inventing a new icon —
   this keeps every visible pixel original to the source file.

4. **Favicon legibility at 16×16 is limited by the same fused-detail
   issue.** At 16px the gold lens shape and "+" are still visible as a
   recognizable gold silhouette, but fine edges soften. This is a
   real constraint of the source artwork's detail level, not a processing
   error — flagging it rather than overstating how crisp the 16px icon is.
