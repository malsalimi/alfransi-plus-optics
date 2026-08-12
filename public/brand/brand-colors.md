# Brand Colors — الفرنسي بلس (Al-Fransi Plus Optics & Audiology)

Colors below were extracted directly from the supplied master logo
(`/brand/original/logo-master.png`) by sampling its opaque pixels. Nothing
here is invented or assumed — these are the actual colors present in the
artwork.

## Primary Gold (emblem, brand name, tagline)

| Format | Value |
|---|---|
| HEX | `#F8C10C` |
| RGB | `248, 193, 12` |
| HSL | `46°, 94%, 51%` |

The logo's gold is not flat — it ranges from a light highlight (~`#FFE58C`)
to a deeper amber shadow (~`#B85E00`) as part of its gradient/bevel effect.
`#F8C10C` is the dominant mid-tone and the correct single value to use for
flat digital use (buttons, links, icons, text).

## Frame Silver / White (glasses frame)

| Variant | HEX | RGB | HSL |
|---|---|---|---|
| Highlight (lightest) | `#EAEAEF` | `234, 234, 239` | `240°, 14%, 93%` |
| Mid-tone | `#E8E9ED` | `232, 233, 237` | `228°, 12%, 92%` |
| Shadow (darkest) | `#747275` | `116, 114, 117` | `280°, 1%, 45%` |

The frame is a white-to-gray gradient with soft shadow modeling, not a flat
white. This is what gives it enough contrast to stay visible on a plain
white background — treat the shadow gray (`#747275`) as the "ink" value
whenever the mark needs to work as a flat single-color asset (e.g. a 1-color
stamp or engraving mockup).

## White

| Format | Value |
|---|---|
| HEX | `#FFFFFF` |
| RGB | `255, 255, 255` |
| HSL | `0°, 0%, 100%` |

Used as the base of the frame highlights and as the recommended website
background color behind the logo (verified for contrast — see note below).

## Supporting Neutral (deep shadow / outline)

| Format | Value |
|---|---|
| HEX | `#1A1A1A` |
| RGB | `26, 26, 26` |

Appears only in the thin dark outline strokes that separate the frame from
the gold lenses. Useful as a text/border color if a near-black is needed
elsewhere on the site, but it is a structural line color in the logo, not a
brand color meant for large surfaces.

---

## Recommended usage

| Role | Color | Notes |
|---|---|---|
| Primary (brand accent, CTA buttons, active states) | `#F8C10C` (gold) | The brand's signature color — use for anything that should feel "on-brand." |
| Secondary / structure (headings, icons paired with gold) | `#747275` (frame shadow) | Reads as the brand's "metal" tone; pairs naturally with the gold. |
| Background (default site background) | `#FFFFFF` | Confirmed: the logo's frame gradient has enough shadow contrast to stay legible directly on white — no white outline/glow needed. |
| Text on light background | `#1A1A1A` or `#222222` | Not extracted from a large logo area, but matches the logo's own outline ink — safe for body copy. |
| Text / accents on dark background | `#FFFFFF` + `#F8C10C` | The gold and white highlight both read clearly on a dark navy/charcoal background (tested at ~`#0F1B2B`) — see `/brand/logo-header-dark.png`. |
| Border / divider | `#E8E9ED` | Very light neutral, taken from the frame's mid-tone — good for subtle card borders or section dividers on a white background. |
| Accent / hover state | `#B85E00` (deep gold shadow tone, sampled from the emblem's gradient edge) | Use sparingly for a pressed/hover variant of the primary gold. |

**Contrast note:** the logo was tested directly on both a white (`#FFFFFF`)
and a dark navy (`#0F1B2B`) background at full opacity. Both read clearly
without modification, which is why no recolored variant was produced for
`logo-header-dark` / `logo-header-light` — they are intentionally identical
files (see README).
