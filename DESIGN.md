---
name: Paper Tactile Dashboard
colors:
  surface: '#f4f3ef'
  surface-dim: '#e0d9d1'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ea'
  surface-container: '#f5ede5'
  surface-container-high: '#efe7df'
  surface-container-highest: '#e9e1d9'
  on-surface: '#252422'
  on-surface-variant: '#66615b'
  inverse-surface: '#212120'
  inverse-on-surface: '#f8efe7'
  outline: '#e3e1dc'
  outline-variant: '#f0f0f0'
  surface-tint: '#51cbce'
  primary: '#51cbce'
  on-primary: '#ffffff'
  primary-container: '#e6f7f8'
  on-primary-container: '#1f8688'
  secondary: '#ef8157'
  on-secondary: '#ffffff'
  secondary-container: '#fdeee9'
  on-secondary-container: '#c84a22'
  tertiary: '#6bd098'
  on-tertiary: '#ffffff'
  tertiary-container: '#e6f8ef'
  on-tertiary-container: '#1b7a48'
  warning: '#fbc658'
  warning-container: '#fef7e6'
  on-warning-container: '#946800'
  info: '#51bcda'
  info-container: '#e8f6fb'
  on-info-container: '#1a7690'
  error: '#ba1a1a'
  on-error: '#ffffff'
  paper-bg: '#f4f3ef'
  sidebar-dark: '#212120'
  sidebar-slate: '#2b303a'
  sidebar-white: '#ffffff'
  text-muted: '#9a9a9a'
  border-subtle: '#e3e1dc'
typography:
  display:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '300'
    lineHeight: 48px
    letterSpacing: -0.5px
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.15px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 1px
  label-md:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.5px
  metric-headline:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 1.875rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

# Paper Tactile Dashboard Design System

Derived directly from Stitch Design System (`assets/75f4c7148420447eb5841ff782cfe915`) and Creative Tim Paper Dashboard PRO specs.

## 1. Brand & Aesthetic Principles

This design system blends tactile, physical paper warmth with modern corporate dashboard precision.
- **Warm Paper Canvas**: Foundation built upon natural, warm off-white tones (`#F4F3EF`), evoking premium stationery and architectural craft paper rather than cold clinical white.
- **Floating Crisp Sheets**: Content elevated on brilliant white cards with gentle, diffused, tinted drop shadows, creating clear spatial layers.
- **Deep Contrast Sidebar**: Grounded by a rich carbon charcoal navigation panel, providing anchored visual framing and effortless orientation.
- **Vibrant Accent Codification**: Cyan teal (`#51CBCE`), warm coral orange (`#EF8157`), fresh mint green (`#6BD098`), and radiant sunflower amber (`#FBC658`).

## 2. Color Palette & Roles

- **Primary (`#51CBCE`)**: Cyan teal for active navigation indicators, key conversion actions, and primary chart series.
- **Secondary (`#EF8157`)**: Warm coral-orange assigned to negative deltas, destructive actions, high-priority notifications, and secondary data metrics.
- **Tertiary (`#6BD098`)**: Fresh mint green used for positive trends, completed statuses, financial gains, and affirmative badges.
- **Warning (`#FBC658`)**: Radiant golden yellow for caution pills and tertiary chart series.
- **Info (`#51BCDA`)**: Sky blue for technical alerts, secondary links, and status badges.
- **Neutral Dark (`#252422`)**: Earthy charcoal slate used for primary headings and prominent data points.
- **Neutral Body (`#66615B`)**: Soft graphite for body copy and readable typography.
- **Muted (`#9A9A9A`)**: Neutral tone for metadata, inactive states, and timestamps.

## 3. Elevation & Depth

- **Base Canvas (Level 0)**: Flat `#F4F3EF` warm paper background.
- **Resting Cards (Level 1)**: White cards (`#FFFFFF`) with ultra-soft diffused drop shadow:
  `box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.08), 0 4px 15px 0 rgba(0, 0, 0, 0.05);`
  Hairline border: `1px solid rgba(227, 225, 220, 0.7)` (`#E3E1DC`).
- **Hover Lift (Level 2)**:
  `box-shadow: 0 12px 19px -7px rgba(0, 0, 0, 0.12), 0 8px 20px 0 rgba(0, 0, 0, 0.08);`
  Accompanied by a subtle `-2px` to `-4px` translateY lift.
- **Floating Overlays & Configurator (Level 3)**:
  `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05);`

## 4. Typography & Responsive Scale

- **Headings & Quantitative Readouts**: `Montserrat` (Light 300 for huge numbers, SemiBold 600 / Bold 700 for headings, uppercase tracking for labels).
- **Body & Editorial Text**: `Inter` (Regular 400, Medium 500) for prolonged reading without fatigue.

### Responsive Breakpoints Scale:
- **Mobile (< 768px)**:
  - Base root font size: `15px`
  - H1 / Display: `1.5rem` (24px)
  - H2 / Metrics: `1.25rem` – `1.5rem` (20px – 24px)
  - H3 / Sections: `1.125rem` (18px)
  - Body: `text-xs` to `text-sm` (12px – 14px)
  - Micro tags / Labels: `text-[10px]` to `text-[11px]`
- **Tablet (768px – 1023px, `md:`)**:
  - Base root font size: `16px` (scaled up)
  - H1 / Display: `1.875rem` (30px)
  - H2 / Metrics: `1.5rem` – `1.875rem` (24px – 30px)
  - H3 / Sections: `1.25rem` (20px)
  - Body: `text-sm` (14px)
  - Micro tags / Labels: `text-xs` (12px)
- **Desktop (>= 1024px, `lg:` / `xl:`)**:
  - Base root font size: `16px`
  - H1 / Display: `2.25rem` (36px)
  - H2 / Metrics: `1.75rem` – `2.25rem` (28px – 36px)
  - H3 / Sections: `1.375rem` – `1.5rem` (22px – 24px)
  - Body: `text-sm` to `text-base` (14px – 16px)
  - Micro tags / Labels: `text-xs` to `text-sm` (12px – 13px)

## 5. Sidebar Active Triangle Notch

The trademark Paper Dashboard active navigation indicator:
```css
.nav-item-active::after {
  content: " ";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #f4f3ef;
  display: inline-block;
}
```
This notch seamlessly marries the active item to the adjacent paper canvas.
