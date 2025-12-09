# Starbot Landing Page Migration to Astro - Game Plan

## Project Overview
Migrate the Starbot landing page from Next.js to a standalone Astro project, preserving all UI components, animations, and styling while optimizing for performance.

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Astro Project
- [ ] Create new Astro project with TypeScript support
- [ ] Install core dependencies:
  - `astro`
  - `@astrojs/react` (for interactive components)
  - `@astrojs/tailwind`
  - `tailwindcss`
  - `typescript`

### 1.2 Install UI & Animation Libraries
- [ ] **Framer Motion** - For animations (`framer-motion`)
- [ ] **Lucide React** - Icon library (`lucide-react`)
- [ ] **Tabler Icons** - Additional icons (`@tabler/icons-react`)
- [ ] **Class Variance Authority** - For component variants (`class-variance-authority`)
- [ ] **clsx** & **tailwind-merge** - For className utilities
- [ ] **next-themes** - Theme management (works with Astro)

### 1.3 Configure Build Tools
- [ ] Setup Tailwind CSS configuration
- [ ] Configure TypeScript paths (`@/` alias)
- [ ] Setup PostCSS if needed
- [ ] Configure Astro integrations

---

## Phase 2: Styling & Design System

### 2.1 Tailwind Configuration
Copy from Starbot:
- [ ] Custom colors (primary, accent, background, foreground)
- [ ] Custom animations (bar-height, document-scan, etc.)
- [ ] Font configurations
- [ ] Spacing & breakpoints
- [ ] Border radius & shadows

### 2.2 Global Styles
- [ ] Copy `globals.css` styles
- [ ] Setup CSS variables for theming
- [ ] Configure dark/light mode styles
- [ ] Add custom scrollbar styles

### 2.3 Component Utilities
- [ ] Create `lib/utils.ts` with `cn()` function
- [ ] Setup button variants helper
- [ ] Create responsive utility helpers

---

## Phase 3: Core UI Components Migration

### 3.1 shadcn/ui Components
Convert to Astro-compatible versions:
- [ ] **Button** component with variants
- [ ] **Accordion** component (for FAQ)
- [ ] **Background Effects**:
  - Boxes
  - FlickeringGrid
  - DotPattern
  - RippleEffect
- [ ] **RainbowButton** component

### 3.2 MagicUI Components
- [ ] **Icons** component wrapper
- [ ] **Marquee** component (for logos)
- [ ] **Safari** browser mockup
- [ ] **Section** wrapper component
- [ ] **Menu** component (navigation)
- [ ] **Drawer** component (mobile menu)
- [ ] **HeroVideoDialog** component
- [ ] **ChartExample** component
- [ ] **Features** component

### 3.3 Custom Icons
- [ ] **StarfleetLogo** SVG component
- [ ] **ChatbotUISVG** (if needed)
- [ ] Setup icon system

---

## Phase 4: Section-by-Section Migration

### 4.1 Header Section
**File**: `components/sections/Header.astro` or `.tsx` (interactive)

**Requirements**:
- Sticky navigation with scroll effect
- Logo and brand name
- Desktop mega-menu dropdowns:
  - Features dropdown (3 items)
  - Solutions dropdown (6 items)
  - Pricing link
- CTA buttons (Login, Get Started)
- Mobile drawer menu
- Border animation on scroll

**Dependencies**: Menu, Drawer, Icons, Button

**Interactive**: YES - needs client-side JS for scroll detection

---

### 4.2 Hero Section
**File**: `components/sections/Hero.astro` or `.tsx`

**Requirements**:
- Announcement pill with link
- Animated headline (word-by-word animation)
- Subheadline text
- RainbowButton CTA
- Trust badge text
- Video dialog with thumbnail
- Background dot pattern
- All Framer Motion animations

**Dependencies**: HeroVideoDialog, RainbowButton, DotPattern

**Interactive**: YES - needs Framer Motion animations

**Assets Needed**: `/dashboard4.png` thumbnail

---

### 4.3 Logos Section
**File**: `components/sections/Logos.astro`

**Requirements**:
- Title text
- Marquee scrolling animation
- Company logos (8 companies)
- Grayscale effect with gradient fade
- Continuous auto-scroll

**Dependencies**: Marquee component

**Interactive**: YES - auto-scrolling animation

**Assets Needed**: External CDN links to company logos

---

### 4.4 Solution Section
**File**: `components/sections/Solution.astro` or `.tsx`

**Requirements**:
- Section title and description
- 4 feature cards in responsive grid
- Each card has:
  - Title, description
  - Custom hover colors (red, blue, orange, green)
  - Content area (icon, chart, or image)
  - Gradient fade overlay
- Staggered scroll animations

**Dependencies**: Section, FlickeringGrid, Safari, ChartExample

**Interactive**: YES - hover effects and scroll animations

**Assets Needed**: `/dashboard.png`, `/models_view_2.png`

---

### 4.5 How It Works Section
**File**: `components/sections/HowItWorks.astro` or `.tsx`

**Requirements**:
- Section title
- 3-step process cards:
  - **Step 1**: Document scanning animation
  - **Step 2**: Network diagram with SVG paths & bar chart
  - **Step 3**: Success checkmark with documents
- Complex SVG gradient animations
- Curved arrow graphics between steps
- Responsive grid layout

**Dependencies**: StarfleetLogo, Section

**Interactive**: YES - CSS animations

**Assets Needed**: `/paper.png`

---

### 4.6 FAQ Section
**File**: `components/sections/FAQ.astro`

**Requirements**:
- Section title
- Accordion component with 5 FAQs
- Contact email link
- Collapsible functionality

**Dependencies**: Accordion, AccordionItem, AccordionTrigger, AccordionContent, Section

**Interactive**: YES - accordion toggle

**Content Source**: `siteConfig.faqs`

---

### 4.7 CTA Section
**File**: `components/sections/CTA.astro`

**Requirements**:
- Section title and subtitle
- CTA button with logo
- FlickeringGrid background
- Radial gradient mask

**Dependencies**: Section, FlickeringGrid, Button, Icons

**Interactive**: YES - background animation

---

### 4.8 Footer Section
**File**: `components/sections/Footer.astro`

**Requirements**:
- Logo and brand name
- 4-column link grid:
  - Product links
  - Company links
  - Resources links
  - Social links (with icons)
- Bottom bar:
  - Copyright notice
  - Privacy & Terms links
- Hover effects on links

**Dependencies**: Icons (social icons)

**Interactive**: NO - static content

**Content Source**: `siteConfig.footer`

---

## Phase 5: Configuration & Content

### 5.1 Site Configuration
**File**: `lib/config.ts` or `config.ts`

**Data to migrate**:
- [ ] Site metadata (name, description, URL, keywords)
- [ ] Links (email, social media)
- [ ] Header navigation structure
- [ ] Pricing tiers (3 plans)
- [ ] FAQ questions & answers
- [ ] Footer link structure

### 5.2 Content Adaptation
- [ ] Replace "acme.ai" references with "Starbot"
- [ ] Update email to actual contact
- [ ] Verify all external links
- [ ] Update social media links
- [ ] Review pricing information

---

## Phase 6: Asset Migration

### 6.1 Images to Copy
From `/public/` directory:
- [ ] `/dashboard.png`
- [ ] `/dashboard2.png`
- [ ] `/dashboard3.png`
- [ ] `/dashboard4.png`
- [ ] `/models_view.png`
- [ ] `/models_view_2.png`
- [ ] `/community_view.png`
- [ ] `/paper.png`
- [ ] Logo files (DARK_BRAND_LOGO.png, LIGHT_BRAND_LOGO.png)

### 6.2 External Assets
- [ ] Company logos (CDN links) - verify accessibility
- [ ] YouTube video embed link
- [ ] Font files (if any custom fonts)

---

## Phase 7: Astro-Specific Adaptations

### 7.1 Component Strategy
**Static Components** (`.astro` files):
- Footer
- Logos section (with client directive)
- FAQ (with client directive for accordion)

**Interactive Components** (`.tsx` with React):
- Header (scroll detection)
- Hero (Framer Motion animations)
- Solution (animations & hover)
- HowItWorks (CSS animations)
- CTA (background animation)

### 7.2 Client Directives
Use appropriate directives:
- `client:load` - For above-the-fold interactive content (Header, Hero)
- `client:visible` - For scroll-triggered animations (Solution, HowItWorks)
- `client:idle` - For non-critical interactions (Footer social links)
- `client:only="react"` - For React-only components

### 7.3 Performance Optimization
- [ ] Image optimization with Astro Image
- [ ] Code splitting for heavy components
- [ ] Lazy load animations below fold
- [ ] Minimize client-side JavaScript
- [ ] Preload critical fonts

---

## Phase 8: Router & Navigation

### 8.1 Page Structure
- [ ] `src/pages/index.astro` - Main landing page
- [ ] `src/pages/pricing.astro` - Pricing page (optional)
- [ ] `src/pages/404.astro` - Error page

### 8.2 Link Updates
- [ ] Replace Next.js `<Link>` with Astro `<a>` tags
- [ ] Update internal navigation paths
- [ ] Handle external links appropriately
- [ ] Add proper `rel` attributes

---

## Phase 9: Testing & Quality Assurance

### 9.1 Functionality Testing
- [ ] Header scroll effect works
- [ ] Mobile menu opens/closes
- [ ] All animations trigger correctly
- [ ] Video dialog plays
- [ ] Accordion expands/collapses
- [ ] All links work
- [ ] Forms submit (if any)

### 9.2 Visual Testing
- [ ] Compare with original Starbot design
- [ ] Test on mobile devices
- [ ] Test on tablet devices
- [ ] Test on desktop (various widths)
- [ ] Dark/light mode switching
- [ ] Hover states work correctly

### 9.3 Performance Testing
- [ ] Lighthouse score > 90
- [ ] Check bundle size
- [ ] Test load times
- [ ] Verify animations don't cause jank
- [ ] Check Time to Interactive (TTI)

### 9.4 Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## Phase 10: Deployment & Launch

### 10.1 Build Configuration
- [ ] Configure build output
- [ ] Set up environment variables
- [ ] Optimize for production
- [ ] Generate sitemap
- [ ] Setup meta tags

### 10.2 Deployment Options
Choose one:
- [ ] **Vercel** - Recommended for easy deployment
- [ ] **Netlify** - Good alternative
- [ ] **Cloudflare Pages** - Fast CDN
- [ ] **Static hosting** - S3, GitHub Pages, etc.

### 10.3 Post-Launch
- [ ] Monitor performance metrics
- [ ] Setup analytics (if needed)
- [ ] Test all functionality in production
- [ ] Setup error tracking
- [ ] Create backup

---

## Technical Challenges & Solutions

### Challenge 1: Framer Motion in Astro
**Problem**: Framer Motion is React-specific
**Solution**: Use React components with `client:load` or `client:visible` directives for animated sections

### Challenge 2: Next.js Image Optimization
**Problem**: Next.js `<Image>` component not available
**Solution**: Use Astro's `<Image>` component or regular `<img>` with optimization

### Challenge 3: useRouter & Navigation
**Problem**: Next.js router not available
**Solution**: Use standard anchor tags or Astro's built-in navigation

### Challenge 4: CSS-in-JS Libraries
**Problem**: Some MagicUI components may use styled-components
**Solution**: Convert to Tailwind classes or CSS modules

### Challenge 5: Client-Side State Management
**Problem**: Header scroll state, theme state
**Solution**: Use React hooks within interactive components with proper client directives

---

## File Structure (Final)

```
astro-landing/
├── .nova/
│   └── gameplan.md (this file)
├── public/
│   ├── dashboard.png
│   ├── dashboard4.png
│   ├── models_view_2.png
│   ├── paper.png
│   └── logos/
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── StarfleetLogo.tsx
│   │   │   └── index.ts
│   │   ├── magicui/
│   │   │   ├── accordion.tsx
│   │   │   ├── chart-example.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── features-horizontal.tsx
│   │   │   ├── flickering-grid.tsx
│   │   │   ├── hero-video.tsx
│   │   │   ├── icons.tsx
│   │   │   ├── marquee.tsx
│   │   │   ├── menu.tsx
│   │   │   ├── safari.tsx
│   │   │   └── section.tsx
│   │   ├── sections/
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Logos.astro
│   │   │   ├── Solution.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── FAQ.astro
│   │   │   ├── CTA.tsx
│   │   │   └── Footer.astro
│   │   └── ui/
│   │       ├── background-boxes.tsx
│   │       ├── button.tsx
│   │       ├── dot-pattern.tsx
│   │       ├── flickering-grid.tsx
│   │       └── rainbow-button.tsx
│   ├── lib/
│   │   ├── config.ts
│   │   └── utils.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── globals.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Implementation Order

### Priority 1: Foundation (Do First)
1. Project setup & dependencies
2. Tailwind configuration
3. Utils & basic components (Button, Icons)
4. Site configuration file

### Priority 2: Layout Components
5. Section wrapper component
6. Header component
7. Footer component

### Priority 3: Hero & Above Fold
8. Background effects (DotPattern, FlickeringGrid)
9. Hero section with animations
10. Logos section

### Priority 4: Content Sections
11. Solution section
12. How It Works section
13. FAQ section
14. CTA section

### Priority 5: Polish & Optimization
15. Asset optimization
16. Performance tuning
17. Cross-browser testing
18. Deployment

---

## Success Criteria

✅ **Visual Fidelity**: Landing page looks identical to Starbot original
✅ **Animations**: All animations work smoothly
✅ **Responsive**: Works on all device sizes
✅ **Performance**: Lighthouse score > 90
✅ **Accessibility**: Proper ARIA labels and semantic HTML
✅ **SEO**: Proper meta tags and structure
✅ **Browser Support**: Works on all modern browsers
✅ **Theme Support**: Dark/light mode functional

---

## Estimated Timeline

- **Phase 1-2** (Setup & Styling): 2-3 hours
- **Phase 3** (Core Components): 4-5 hours
- **Phase 4** (Sections): 6-8 hours
- **Phase 5-6** (Config & Assets): 1-2 hours
- **Phase 7** (Astro Adaptations): 2-3 hours
- **Phase 8-9** (Testing): 2-3 hours
- **Phase 10** (Deployment): 1 hour

**Total Estimated Time**: 18-25 hours

---

## Notes & Considerations

1. **Keep React for Complex Animations**: Don't try to convert Framer Motion components to vanilla JS - use React islands
2. **Component Reusability**: Build components to be reusable for future pages
3. **TypeScript First**: Maintain type safety throughout
4. **Performance Budget**: Keep main bundle under 100KB
5. **Progressive Enhancement**: Ensure core content works without JS
6. **Accessibility**: Test with screen readers
7. **SEO**: Add proper meta descriptions and Open Graph tags

---

## Resources & References

- [Astro Documentation](https://docs.astro.build/)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Created**: December 9, 2025
**Project**: Starbot Landing Page → Astro Migration
**Status**: Ready for Implementation
