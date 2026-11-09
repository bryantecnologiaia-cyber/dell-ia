---
name: Obsidian Cinema
colors:
  surface: '#131319'
  surface-dim: '#131319'
  surface-bright: '#39383f'
  surface-container-lowest: '#0e0e14'
  surface-container-low: '#1b1b21'
  surface-container: '#1f1f25'
  surface-container-high: '#2a2930'
  surface-container-highest: '#34343b'
  on-surface: '#e4e1ea'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e4e1ea'
  inverse-on-surface: '#303036'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#ffdb9d'
  on-secondary: '#412d00'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#ffb4aa'
  on-tertiary: '#690003'
  tertiary-container: '#ff6859'
  on-tertiary-container: '#6a0003'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#930007'
  background: '#131319'
  on-background: '#e4e1ea'
  surface-variant: '#34343b'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-badge:
    fontFamily: Montserrat
    fontSize: 10px
    fontWeight: '800'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the atmospheric, high-stakes gravitas of premier film exhibition merged with the sleek immediacy of modern streaming platforms. Crafted for discerning cinephiles, festival followers, and late-night bingers, the interface creates an immersive, theater-dark environment that lets media imagery take center stage while functional controls emit a focused, radiant glow.

### Aesthetic Persona
- **Atmospheric & Immersive:** Deep obsidian and charcoal backdrops evoke the sensory focus of a pitch-black screening room.
- **Cinematic Glow & Volumetric Energy:** Accents borrow from marquee lights, projector beams, and anamorphic lens flares—warm amber-orange primaries supported by golden highlights and vivid cinema-red status indicators.
- **Sleek Glassmorphic Tactility:** Overlays, cards, and modal sheets utilize frosted glass with translucent charcoal layers and whisper-thin amber-tinted borders.
- **Graphic Impact:** Heavyweight, commanding typography commands attention on marquee titles, balanced by razor-sharp utilitarian body text.

## Colors

The palette is engineered exclusively for a dark viewing environment, prioritizing high contrast and reduced eye fatigue while preserving theatrical drama.

### Color Tiers
- **Primary (`#FF6B00`):** Electric Ember. Drives key interaction points, active tabs, play triggers, and high-impact calls to action. Radiates with subtle amber diffusion against dark planes.
- **Secondary (`#FFB800`):** Golden Marquee. Used for critical badges, community curator awards, star ratings, and VIP status indicators.
- **Tertiary (`#E50914`):** Cinema Velvet Red. Reserved for premiere drops, live screenings, recording indicators, and critical alert states.
- **Neutral Surface Hierarchy:**
  - `Canvas Ground`: `#0B0B0F` (True deep obsidian base).
  - `Surface Low`: `#121218` (Recessed trays, card backings).
  - `Surface Mid`: `#1A1A24` (Hover states, elevated modular panels).
  - `Surface High / Glass`: `rgba(26, 26, 36, 0.72)` with a 1px border of `rgba(255, 107, 0, 0.18)`.
- **Text & Content Contrast:**
  - `Text Primary`: `#F4F4F6` (96% brightness off-white for crisp, anti-aliased legibility).
  - `Text Secondary`: `#9E9EA8` (Mid-tone slate for metadata, runtimes, and secondary credits).
  - `Text Muted`: `#5C5C6B` (Tertiary captions, timestamps, and disabled triggers).

## Typography

The type system creates an intentional juxtaposition between theatrical spectacle and modern utilitarian control.

- **Headlines & Titles (Montserrat):** Set with high tracking tension and heavy geometric weights (700/800). All caps is strictly encouraged for category flags, section dividers, and badges (`label-badge`) to produce a stark cinematic cadence.
- **Interface & Longform Content (Inter):** Neutral, hyper-legible geometric grotesque designed to fade into the background, allowing user reviews, synopsis descriptions, and technical video specs (4K UHD, HDR10+, Atmos) to read effortlessly at small scales.
- **Kerning & Formatting:** Tighten letter spacing on hero headlines (`-0.03em`) for a cohesive cinematic poster appearance. Expand letter spacing on metadata badges and tracking codes (`0.06em` to `0.1em`) for immediate scannability.

## Layout & Spacing

The layout model balances edge-to-edge cinematic immersion with structured content discovery grids.

### The Layout Grid
- **Desktop (>= 1200px):** 12-column fluid grid within a 1600px maximum frame. Outer margins of `3rem` (`48px`) and gutters of `1.5rem` (`24px`). Full-bleed treatment is reserved for spotlight backdrops and hero video reels.
- **Tablet (768px - 1199px):** 8-column grid with `2rem` margins and `1rem` gutters. Horizontal scrolling carousels bleed past screen margins to reveal peek content.
- **Mobile (< 768px):** 4-column grid with `1rem` margins and `0.75rem` gutters. Navigation stacks to bottom sticky action bars with tap targets expanded to minimum 48px heights.

### Content Arrangement
- **Media Carousels:** Media posters break standard page padding on mobile to signal horizontal scroll behavior.
- **Community Feeds:** Pinned to a central 8-column column (desktop) to ensure review readability never exceeds a line-length of 75 characters.

## Elevation & Depth

Depth is established not through generic grey dropshadows, but via chromatic atmospheric lighting, selective luminescence, and frosted backdrop filters.

### Stacking and Surface Tiers
- **Ground (`#0B0B0F`):** Deep canvas anchor. Receives zero direct shadow; carries faint radial gradients of amber-orange originating behind featured heroes.
- **Layer 1 - Cards and Panels (`#121218`):** 1px border of `rgba(255, 255, 255, 0.05)`. Hover states introduce an outer glow: `0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 16px 0 rgba(255, 107, 0, 0.2)`.
- **Layer 2 - Floating Modals & Glass Rail Nav:** Solid background replaced by `rgba(18, 18, 24, 0.75)` with `backdrop-filter: blur(20px)` and a directional top border of `1px solid rgba(255, 107, 0, 0.3)`.
- **Layer 3 - Active Controls & Glowing Buttons:** Casts an energized ambient aura: `box-shadow: 0 0 20px 0 rgba(255, 107, 0, 0.45)`. Red tertiary badges project a vibrant crimson halo: `0 0 12px rgba(229, 9, 20, 0.5)`.

## Shapes

The design uses a refined rounded silhouette (`roundedness: 2` / base `0.5rem` or `8px`), maintaining a sharp, precision-cut tech feel without being overly rigid.

### Structural Radius Breakdown
- **Base Components (Inputs, Buttons, Badges):** `0.5rem` (`8px`). Offers a clean contour that mirrors high-end media equipment displays.
- **Cards & Media Posters (`rounded-lg`):** `1rem` (`16px`). Softens large imagery edges while framing rich cover art.
- **Sheets, Modals & Trays (`rounded-xl`):** `1.5rem` (`24px`). Generous curves that nest large-scale community discussion trees and screening panels.
- **Avatars & Media Scrubbers:** Full circle (`9999px`) for round profiles and floating media scrub-heads.

## Components

### Buttons
- **Primary CTA ("Watch Now", "Join Premiere"):** Solid `#FF6B00` fill, `#0B0B0F` high-contrast bold typography (`Montserrat`, 600). Elevated with `0 0 20px rgba(255, 107, 0, 0.35)` aura. On hover, background shifts to `#FF7A1A` with a scale transition of `1.02`.
- **Secondary Ghost ("Trailer", "Add to Watchlist"):** Glass backdrop (`rgba(255, 255, 255, 0.06)`), 1px border (`rgba(255, 255, 255, 0.15)`), text `#F4F4F6`. On hover, border switches to `#FF6B00` with subtle amber text tint.
- **Tertiary Cinema Action ("Live Screening"):** Solid `#E50914` background with white text and a pulsing halo for active broadcasts.

### Media Cards & Posters
- **Visual Frame:** Vertical 2:3 ratio for movie titles; 16:9 for livestreams and episodes.
- **Base Style:** Border radius `rounded-lg`, border `1px solid rgba(255, 255, 255, 0.08)`.
- **Hover Motion:** Subtle translateY (`-4px`) with card border color changing to `rgba(255, 107, 0, 0.6)`. An overlay gradient (`from-transparent via-transparent to-[#0B0B0F]`) reveals quick actions: trailer preview, heart/watchlist icon, and Rotten Tomatoes/Community score pill.

### Chips & Badges
- **Format Flags ("4K", "HDR", "IMAX"):** Dark glass pill (`rgba(0, 0, 0, 0.6)`), border `1px solid rgba(255, 255, 255, 0.2)`, text `#9E9EA8`, uppercase `label-badge`.
- **Community Rating Pill:** `#FFB800` text on an ultra-dark amber background (`rgba(255, 184, 0, 0.12)`) paired with a star glyph.

### Form Inputs & Search
- **Search Bar:** Glassmorphic container with 48px height, `rgba(26, 26, 36, 0.6)` fill, 1px border `rgba(255, 255, 255, 0.1)`. Placeholder text in `#5C5C6B`.
- **Focused State:** Border lights up to `#FF6B00`, backdrops expand with `box-shadow: 0 0 0 1px #FF6B00, 0 0 16px rgba(255, 107, 0, 0.25)`. Includes an instant-filter dropdown for live cinema discussions and matching director profiles.

### Checkboxes & Toggle Switches
- **Toggles:** Track utilizes dark slate `#1A1A24` when inactive; transitions to `#FF6B00` on active state. The thumb remains bright `#F4F4F6` with an inner glow.
- **Checkboxes:** Custom 18px square with `rounded: 4px`. Unchecked: border `1px solid #5C5C6B`. Checked: fill `#FF6B00` displaying an SVG dark charcoal checkmark.

### Community Discussion Thread / Review Cards
- Dark surface mid (`#1A1A24`) container with `rounded-lg` borders. Left-hand spine includes a thread indicator that shifts to amber when replying. Top row highlights the user handle, VIP critique badge (in `#FFB800`), followed by a spoiler-tag blur overlay that users click to reveal.