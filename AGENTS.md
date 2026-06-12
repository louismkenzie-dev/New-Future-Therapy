<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NewFuture Therapy — Design System (HARD RULES)

These rules come from the official NewFuture Therapy design system (Claude Design handoff bundle) and are non-negotiable for all UI work in this repo.

## Brand facts
- Practice location is **Wakefield & Online** — never Leicester (Leicester appears only in the founders' biography: "born and raised in Leicester").
- Esther = therapist in the **green blouse** photos; Laura = **white top** (founder-unconfirmed; if corrected, swap everywhere).
- Logo is the `<Logo />` component ([src/components/Logo.tsx](src/components/Logo.tsx)): line-veined leaf glyph + stacked "NewFuture / THERAPY" wordmark. `onDark` variant for footer/dark bands. Never plain-text the brand name in chrome.

## Color (tokens in src/app/globals.css @theme)
- Pages are warm cream `#F5F3EF` — **never pure white or black** page backgrounds.
- One green family only: sage-pale `#EBF2EC` (tinted bands), sage-light `#C4D9C6` (accents on dark), sage `#6B8C6F` (eyebrows, secondary CTAs), sage-dark `#3A5A40` (primary buttons, quote bands).
- Text: charcoal `#2D2926` headings, muted `#5C5651` body. Footer background is charcoal.
- Error red only in form validation.

## Type
- Cormorant Garamond for ALL headings — large sizes at weight 300 (light); italic for pull quotes. DM Sans for everything else.
- Scale: hero 72px, page titles 60px, sections 48px, card titles 20px medium. Body 16px/1.65; long-form prose 18px/1.9.

## Layout & components
- Pages are stacks of full-width bands alternating cream → sage-pale → sage-dark/charcoal, 96px vertical padding, content max-w-6xl, prose max-w-3xl.
- Pages open with a centered sage-pale header band: eyebrow → serif title → optional lede.
- Buttons: always pill (`rounded-full`), 14px DM Sans; most CTAs carry trailing lucide `arrow-right`.
- Corners: cards 16px, panels 12px, inputs 8px, buttons/tags pill. **Nothing square.**
- Borders: 1px grey-light `#E4E0DB` does most separation; hover shifts to sage-light. Shadows barely-there (`shadow-sm`; `shadow-lg` only on hero photo). No inner shadows.
- Cards: white on cream/pale, 16px radius, 1px border, `shadow-sm`, 24–32px padding. Tinted variant: sage-pale with 50%-alpha sage-light border. Area cards open with a 32×2px sage dash.
- Hover: color shifts only, 200ms ease. **No press/scale effects.** Motion: 200ms color, 300–400ms accordion/header. No entrance animations, no parallax.
- Blur/transparency: only the sticky header after scroll (cream 95% + blur).
- Forms: uppercase 12px tracked labels, white fields, grey-light border → sage on focus, sage asterisks for required.

## Imagery
- Real photos live in `public/photos/` — warm natural light, candid (never posed studio). Crop `object-fit: cover`, faces in upper third.
- `PhotoPlaceholder` (sage gradient + ellipses) is the fallback for empty slots; pass `src` for real photos.
- Decoration: large soft ellipses + line-veined leaf SVG at 10–30% opacity behind heroes/CTA bands. No patterns, textures, or hard gradients.

## Iconography
- **lucide only** (lucide-react) — 24×24, 2px stroke, `currentColor`. Used sparingly. **No icon fonts, no emoji ever, no unicode-as-icon.**

## Copy
- First-person plural "we" to "you". Warm, professional, British English ("specialising", "non-judgemental").
- **No contractions in body copy** ("You do not need a diagnosis"). Constant reassurance ("no pressure", "free 15-minute initial consultation").
- Title Case headings/buttons; UPPERCASE only for tracked eyebrows; sentence case body.
- Key phrases: "growth begins with understanding", "compassion, curiosity and connection", "Wakefield & Online", "Registered with BACP".
