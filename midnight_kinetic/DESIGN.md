---
name: Midnight Kinetic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#00788c'
  on-tertiary-container: '#d7f6ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: geist
    fontSize: 14px
    fontWeight: '300'
    lineHeight: 20px
  label-md:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

The design system is defined by a "Digital Luxury" ethos—fusing high-performance technical precision with the exclusivity of a premium dark-mode environment. It targets a sophisticated audience that values clarity, depth, and a forward-leaning aesthetic.

The visual language leans heavily into **Glassmorphism** and **Corporate Modern** styles. It utilizes deep matte surfaces and frosted-glass overlays to create a sense of multi-dimensional space. The UI should evoke a feeling of "quiet power"—minimalist in its structure but rich in its execution through subtle light leaks, background blurs, and high-fidelity micro-interactions.

## Colors

The palette is anchored in a "Matte Black" foundation to ensure maximum depth and contrast. 

- **Primary (Electric Blue):** Used for primary actions and critical UI highlights.
- **Secondary (Violet):** Used for supplementary accents, data visualization, and depth-inducing gradients.
- **Tertiary (Cyan):** Reserved for low-level status indicators and subtle "glow" effects.
- **Neutrals:** A range of deep charcoals and blacks are used to distinguish between base surfaces and elevated containers. 

Avoid high-saturation floods; instead, use these vibrant colors as "light sources" within the dark environment—employing them in thin borders, soft glows, and active states.

## Typography

This design system utilizes **Geist** for its systematic, developer-centric precision and modern geometric proportions. It provides the "SaaS polish" required for high-end interfaces.

**Key Principles:**
- **Hierarchy through Weight:** Use bold weights for primary headlines to create a strong architectural anchor.
- **Elegance through Thinness:** Secondary body text and captions should utilize the lighter weights (300) to maintain a premium, editorial feel.
- **Technical Accents:** **JetBrains Mono** is used sparingly for labels, metadata, and status tags to reinforce the "futuristic/high-tech" narrative.
- **Tight Kerning:** Large display text should feature negative letter spacing to feel "locked in" and deliberate.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop to maintain a controlled, gallery-like presentation. 

- **Grid:** A 12-column grid system with generous 24px gutters. This "breathability" is essential for luxury positioning.
- **Rhythm:** All spacing is derived from an 8px base unit. 
- **Adaptation:** 
    - **Desktop:** Centered layouts with wide margins (48px+) to create focus.
    - **Tablet:** Fluid widths with 32px margins.
    - **Mobile:** Single column stack with 16px margins; display typography scales down significantly to prevent line-wrapping issues.

## Elevation & Depth

Depth is the cornerstone of this design system, achieved through a layered glass effect rather than traditional heavy shadows.

- **Surface Layers:**
    - **Level 0 (Base):** Matte black (#050505).
    - **Level 1 (Card):** Frosted glass. Semi-transparent neutral (white at 3-5% opacity) with a 20px background blur.
    - **Level 2 (Popovers/Modals):** High-opacity glass (white at 8% opacity) with a 40px background blur.
- **Lighting:** Use "Rim Lights"—1px solid borders on the top and left edges of glass cards (white at 10% opacity) to simulate a physical light source hitting the edge of the glass.
- **Glows:** Use secondary and tertiary colors for "Ambient Glows"—large, low-opacity (5-10%) radial gradients positioned behind key components to create a soft neon aura.

## Shapes

The shape language is contemporary and fluid. A `rounded-lg` (16px) or `rounded-xl` (24px) corner radius is standard for all primary containers and cards. 

Smaller elements like buttons and input fields should utilize the 0.5rem (8px) base to maintain a crisp, functional appearance, while larger layout sections can move toward 32px or full-pill shapes for a more organic, futuristic feel.

## Components

- **Buttons:** Primary buttons should feature a subtle gradient (Electric Blue to Violet) with a soft outer glow of the same color on hover. Use a "Glass" variant for secondary actions with a thin 1px border.
- **Glass Cards:** Always include a `backdrop-filter: blur(20px)`. Borders should be 1px wide, using a linear gradient from white (10% opacity) to transparent to simulate directional light.
- **Input Fields:** Dark, recessed backgrounds with a 1px border that illuminates in Electric Blue upon focus. Use JetBrains Mono for placeholder text.
- **Chips/Badges:** Small, pill-shaped elements with a solid background of the accent color at 15% opacity and a high-contrast text label.
- **Floating UI:** Navigation bars and toolbars should be detached from the screen edges, floating with a high z-index and a strong background blur to emphasize the "Glassmorphism" effect.
- **Subtle Neon Highlights:** Use thin (2px) horizontal lines of Cyan or Violet to separate sections or highlight active states in menus.