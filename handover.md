# St. Venant Water Flow for Grandkids — Handover Document

> **Last Updated:** 2026-03-08  
> **Published URL:** https://singaporewaterflow.lovable.app  
> **Platform:** Lovable (with Lovable Cloud / Supabase backend)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & File Structure](#3-architecture--file-structure)
4. [Routing & Pages](#4-routing--pages)
5. [Component Inventory](#5-component-inventory)
6. [Design System](#6-design-system)
7. [State Management & Contexts](#7-state-management--contexts)
8. [Custom Hooks](#8-custom-hooks)
9. [Data Layer](#9-data-layer)
10. [Backend (Lovable Cloud)](#10-backend-lovable-cloud)
11. [Assets](#11-assets)
12. [Key Features Deep Dive](#12-key-features-deep-dive)
13. [SEO & Meta](#13-seo--meta)
14. [Testing](#14-testing)
15. [Environment Variables](#15-environment-variables)
16. [Deployment](#16-deployment)
17. [Known Considerations](#17-known-considerations)
18. [Future Enhancement Ideas](#18-future-enhancement-ideas)

---

## 1. Project Overview

**St. Venant Water Flow for Grandkids** is an interactive educational web application that teaches children (primarily under 10, with content extending to age 13) about:

- **The Saint-Venant equations** — the mathematical foundation of open-channel water flow
- **SWMM5** (Storm Water Management Model) — how engineers simulate drainage systems
- **Real-world stormwater management** — case studies from Singapore and Dubai
- **Manning's roughness coefficient** — how surface texture affects water flow
- **The water cycle** — evaporation, condensation, precipitation, and runoff

The app transforms complex hydraulic engineering concepts into tangible, interactive experiences using metaphors like "bumpy slides" and "water races."

### Target Audience

| Audience | Experience |
|----------|-----------|
| Children 5–7 | Visual animations, simple language, emoji-rich content |
| Children 8–10 | Interactive simulators, quizzes, challenge games |
| Children 11–13 | Technical mode toggle reveals real equations |
| Parents/Teachers | Dedicated guide with curriculum connections, discussion questions, activities |

### Dual-Mode System

A global **Kid-Friendly / Technical Mode** toggle (accessible from the navbar) switches between simplified explanations and real engineering equations/details throughout the entire app.

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^18.3.1 |
| Build Tool | Vite | ^5.4.19 |
| Language | TypeScript | ^5.8.3 |
| Styling | Tailwind CSS | ^3.4.17 |
| UI Components | shadcn/ui (Radix primitives) | Multiple packages |
| Routing | React Router DOM | ^6.30.1 |
| State Management | React Context + TanStack React Query | ^5.83.0 |
| Charts | Recharts | ^2.15.4 |
| Icons | Lucide React | ^0.462.0 |
| Forms | React Hook Form + Zod | ^7.61.1 / ^3.25.76 |
| Backend | Lovable Cloud (Supabase) | ^2.91.0 |
| Testing | Playwright | ^1.57.0 |
| Linting | ESLint + TypeScript ESLint | ^9.32.0 |

### Fonts

- **Display:** Fredoka (weights 400–700) — used for headings, buttons, playful UI
- **Body:** Nunito (weights 400–800) — used for paragraph text and descriptions

Loaded via Google Fonts in `src/index.css`.

---

## 3. Architecture & File Structure

```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/                    # Static images (drainage photos)
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives (30+ components)
│   │   ├── parents-guide/         # Parent/Teacher guide sub-components
│   │   └── *.tsx                  # Feature components
│   ├── contexts/                  # React Context providers
│   ├── data/                      # Static data (quiz questions)
│   ├── hooks/                     # Custom React hooks
│   ├── integrations/supabase/     # Auto-generated Supabase client & types
│   ├── lib/                       # Utility functions
│   ├── pages/                     # Route-level page components
│   ├── App.tsx                    # Root component with routing
│   ├── App.css                    # Additional styles
│   ├── index.css                  # Tailwind base + design tokens
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts              # Vite type declarations
├── supabase/
│   └── config.toml                # Supabase project configuration (auto-managed)
├── tailwind.config.ts             # Tailwind configuration + custom theme
├── vite.config.ts                 # Vite configuration
├── components.json                # shadcn/ui configuration
├── tsconfig.json                  # TypeScript config (base)
├── tsconfig.app.json              # TypeScript config (app)
├── tsconfig.node.json             # TypeScript config (node/build)
├── playwright.config.ts           # Playwright test configuration
├── playwright-fixture.ts          # Playwright test fixtures
└── package.json
```

---

## 4. Routing & Pages

Defined in `src/App.tsx`. All routes are client-side via React Router.

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `Index.tsx` | Main landing page — hero, story, simulators, quiz, city studies |
| `/glossary` | `Glossary.tsx` | Searchable glossary of hydraulic engineering terms |
| `/coloring` | `ColoringPage.tsx` | Interactive coloring activity for younger children |
| `/build-drain` | `BuildDrain.tsx` | Drag-and-build drainage system construction activity |
| `/storm-challenge` | `StormChallenge.tsx` | Singapore monsoon management game (SWMM5-themed) |
| `/dubai-challenge` | `DubaiChallenge.tsx` | Dubai flash flood management game (ICM InfoWorks-themed) |
| `/parents-guide` | `ParentsGuide.tsx` | Comprehensive educator/parent resource center |
| `*` | `NotFound.tsx` | 404 fallback page |

### Index Page Section Order

The main page (`/`) is composed of these sections in order:

1. **Navbar** (fixed, scrolling)
2. **HeroSection** — animated hero with water drops and CTA
3. **StVenantStory** — narrative about who Saint-Venant was
4. **EquationExplainer** — interactive equation breakdown
5. **Interactive Simulators** — SlopeSimulator, RoughnessSimulator, DrainageRace, DrainageGallery
6. **DrStVenant** — AI-powered Q&A character (ask questions about water flow)
7. **WaterCycleSection** — animated water cycle with rain ambience audio
8. **SWMM5Section** — what is SWMM5 and how engineers use it
9. **City Case Studies** — tabbed Singapore/Dubai sections with RainfallComparison
10. **QuizSection** — 15-question categorized quiz
11. **Challenge Games CTA** — links to StormChallenge and DubaiChallenge
12. **Footer**

---

## 5. Component Inventory

### Feature Components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Fixed top navigation with hash-scroll support and mobile menu |
| `HeroSection.tsx` | Animated landing section with water theme |
| `StVenantStory.tsx` | Storytelling section about the historical figure |
| `EquationExplainer.tsx` | Interactive equation breakdown with mode-aware content |
| `EquationCard.tsx` | Individual equation display card |
| `SlopeSimulator.tsx` | Interactive slider showing how slope affects water speed |
| `RoughnessSimulator.tsx` | Surface type picker showing Manning's n effect on flow |
| `DrainageRace.tsx` | Animated race between different drainage surface types |
| `DrainageGallery.tsx` | Photo gallery of real-world drainage infrastructure |
| `DrainageAnimation.tsx` | Animated drainage pipe visualization |
| `PipeFlowAnimation.tsx` | Water flowing through a pipe animation |
| `WaterCycleSection.tsx` | Animated water cycle diagram with rain ambient audio toggle |
| `WaterAnimation.tsx` | Reusable water flow animation component |
| `WaterWave.tsx` | CSS wave animation for decorative use |
| `RainDrops.tsx` | Falling rain animation overlay |
| `CloudDecoration.tsx` | Decorative cloud elements |
| `SWMM5Section.tsx` | SWMM5 software explanation section |
| `SingaporeSection.tsx` | Singapore's Marina Barrage and drainage story |
| `DubaiSection.tsx` | Dubai's flash flood challenges and solutions |
| `RainfallComparison.tsx` | Visual comparison of rainfall between cities |
| `DrStVenant.tsx` | AI-powered Q&A mascot character |
| `DroppyMascot.tsx` | Animated water drop mascot |
| `QuizSection.tsx` | Full quiz engine with category selection, scoring, and results |
| `CompletionCertificate.tsx` | Printable certificate awarded after quiz completion |
| `FunFact.tsx` | Reusable fun-fact callout box |
| `TechnicalAnnotation.tsx` | Conditionally-rendered technical details (visible only in Grown-Up Mode) |
| `GrownUpToggle.tsx` | Kid/Adult mode toggle switch with tooltip |
| `TutorialOverlay.tsx` | First-time user tutorial overlay |
| `NavLink.tsx` | Reusable navigation link component |
| `Footer.tsx` | Site footer with links and credits |

### Parent/Teacher Guide Sub-Components (`src/components/parents-guide/`)

| Component | Purpose |
|-----------|---------|
| `LearningObjectivesByAge.tsx` | Age-banded learning objectives (5–7, 8–10, 11–13) |
| `ExpandedDiscussionQuestions.tsx` | Accordion-based discussion question bank |
| `ExtensionActivities.tsx` | Hands-on experiments with time estimates and materials |
| `FacilitationTips.tsx` | Sub-tabbed tips for parents vs. teachers |
| `CurriculumConnections.tsx` | Mapping to curriculum standards |
| `VocabularyGlossary.tsx` | Searchable glossary with technical definition toggle (18 terms) |

### UI Primitives (`src/components/ui/`)

Full shadcn/ui component library including: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle`, `toggle-group`, `tooltip`.

---

## 6. Design System

### Color Palette (HSL — defined in `src/index.css`)

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--primary` | `200 85% 45%` | `200 80% 55%` | Ocean blue — buttons, links, active states |
| `--secondary` | `45 95% 60%` | `45 90% 50%` | Sunny yellow — highlights, badges |
| `--accent` | `160 70% 45%` | `160 65% 40%` | Tropical green — success states, grown-up mode |
| `--background` | `200 30% 98%` | `210 50% 10%` | Page background |
| `--foreground` | `210 60% 20%` | `200 30% 95%` | Primary text |
| `--muted` | `200 30% 92%` | `210 40% 20%` | Subdued backgrounds |
| `--card` | `200 40% 99%` | `210 45% 15%` | Card surfaces |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | Error states |

### Custom Domain Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--water-light` | `195 90% 75%` | Light water accents |
| `--water-dark` | `205 80% 35%` | Deep water elements |
| `--rain` | `200 85% 60%` | Rain drop animations |
| `--sunshine` | `45 100% 55%` | Sun/warm elements |
| `--grass` | `140 60% 50%` | Nature/roughness elements |
| `--sand` | `35 50% 85%` | Desert/Dubai theme |
| `--cloud` | `200 20% 95%` | Cloud decorations |

### Typography

```
font-display: Fredoka      → Headings, buttons, playful text
font-body:    Nunito        → Body copy, descriptions, paragraphs
```

### Border Radius

- `--radius: 1rem` (base)
- Extended: `4xl: 2rem`

### Custom Shadows

- `--shadow-soft`: Subtle elevation for interactive elements
- `--shadow-card`: Medium elevation for cards
- `--shadow-glow`: Blue glow effect for water-themed highlights

### Gradients

- `--gradient-sky`: Vertical sky-blue gradient
- `--gradient-water`: Deep water gradient
- `--gradient-sunshine`: Warm diagonal gradient

---

## 7. State Management & Contexts

### GrownUpModeContext (`src/contexts/GrownUpModeContext.tsx`)

Global context controlling the **Kid-Friendly vs. Technical Mode** toggle.

```typescript
interface GrownUpModeContextType {
  isGrownUpMode: boolean;       // false = kid mode (default), true = technical mode
  toggleGrownUpMode: () => void;
}
```

**Usage pattern:**
- Wrapped at the app root in `App.tsx` via `<GrownUpModeProvider>`
- Consumed via `useGrownUpMode()` hook in any component
- `TechnicalAnnotation` component renders only when `isGrownUpMode === true`

### React Query

`QueryClient` is instantiated in `App.tsx` with default settings. Available for any data-fetching needs via `@tanstack/react-query`.

---

## 8. Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useGrownUpMode` | `src/contexts/GrownUpModeContext.tsx` | Access kid/adult mode state |
| `useRainAmbience` | `src/hooks/useRainAmbience.ts` | Procedural rain sound generation using Web Audio API. Layers: steady pink noise (800Hz LP), patter band-pass (3kHz), random drip oscillators (600–1200Hz). Returns `{ isPlaying, toggle, stop }` |
| `useSoundEffects` | `src/hooks/useSoundEffects.ts` | General UI sound effects hook |
| `useIsMobile` | `src/hooks/use-mobile.tsx` | Responsive breakpoint detection |
| `useToast` | `src/hooks/use-toast.ts` | Toast notification management |

---

## 9. Data Layer

### Quiz Questions (`src/data/quizQuestions.ts`)

15 questions organized by:

**Categories:** `History`, `Equations`, `Roughness`, `Singapore`, `SWMM5`

**Difficulty levels:** `easy` (⭐), `medium` (⭐⭐), `hard` (⭐⭐⭐)

Each question includes:
```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
  category: QuizCategory;
  difficulty: Difficulty;
  wrongAnswerFeedback: Record<number, string>;  // Specific feedback per wrong choice
  technicalNote?: string;                        // Shown only in grown-up mode
}
```

Category and difficulty metadata (`CATEGORY_META`, `DIFFICULTY_META`) provide emoji and color styling.

---

## 10. Backend (Lovable Cloud)

The project is connected to **Lovable Cloud** (powered by Supabase under the hood).

- **Project ID:** `utkdsnyyylledhriyifo`
- **Client:** Auto-generated at `src/integrations/supabase/client.ts` (DO NOT EDIT)
- **Types:** Auto-generated at `src/integrations/supabase/types.ts` (DO NOT EDIT)

### Current Database Schema

The database currently has **no custom tables** — the schema shows empty `Tables`, `Views`, `Functions`, `Enums`, and `CompositeTypes`. The backend is available for future features like:

- User progress tracking / achievements
- Quiz score leaderboards
- Saved drainage designs from Build Drain
- Teacher classroom management

### Auto-Managed Files (DO NOT EDIT)

- `supabase/config.toml`
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `.env`

---

## 11. Assets

### Static Images (`src/assets/`)

| File | Description |
|------|-------------|
| `drainage-brick.jpg` | Brick channel drainage photo |
| `drainage-concrete.jpg` | Concrete drainage infrastructure |
| `drainage-culvert.jpg` | Culvert/pipe drainage system |
| `drainage-forest.jpg` | Natural forest drainage |
| `drainage-grass.jpg` | Grass swale drainage |
| `drainage-rocky.jpg` | Rocky stream bed drainage |
| `dubai-drainage.jpg` | Dubai drainage infrastructure |

These are used in `DrainageGallery.tsx` to show real-world examples of different drainage surface types.

### Public Assets

- `public/favicon.ico` — Browser tab icon
- `public/placeholder.svg` — Fallback placeholder image
- `public/robots.txt` — Search engine crawl directives

---

## 12. Key Features Deep Dive

### 12.1 Interactive Simulators

**Slope Simulator** (`SlopeSimulator.tsx`)
- Drag/slider interface to adjust pipe angle
- Real-time animation shows water speed changing with slope
- Connects to Manning's equation concept

**Roughness Simulator** (`RoughnessSimulator.tsx`)
- Pick from surface types: smooth concrete, grass, rocky, etc.
- Each surface has a Manning's n value
- Visual animation shows how rougher surfaces slow water

**Drainage Race** (`DrainageRace.tsx`)
- Animated race between water flowing over different surfaces
- Visual demonstration of Manning's equation in action

### 12.2 Quiz Engine

- Pre-quiz **category selection** screen (pick which topics to include)
- **Progress bar** and score counter during quiz
- **Per-answer feedback** — each wrong option has a specific explanation
- **Technical notes** visible only in grown-up mode
- **Results breakdown** by category with percentage scores
- **Completion certificate** generation

### 12.3 City Case Studies

**Singapore** — Marina Barrage, monsoon drainage, tropical rainfall management
**Dubai** — Flash flood preparedness, arid-to-extreme rainfall challenges

**Rainfall Comparison** (`RainfallComparison.tsx`) — visual bar chart comparing annual rainfall between cities.

### 12.4 Challenge Games

**Singapore Storm Challenge** (`/storm-challenge`) — Monsoon management simulation testing SWMM5 concepts
**Dubai Flash Flood Challenge** (`/dubai-challenge`) — Flash flood preparation testing ICM InfoWorks knowledge

### 12.5 Rain Ambient Audio

Web Audio API procedural generation (no audio files needed):
- **Steady rain layer:** Pink noise → 800Hz low-pass filter
- **Patter layer:** White noise → 3kHz band-pass filter
- **Random drips:** Sine oscillators at 600–1200Hz with frequency ramps
- Toggle button in Water Cycle section

### 12.6 Parent & Teacher Guide (`/parents-guide`)

Tabbed interface with 6 sections:
1. **Learning Objectives by Age** — 3 age bands with specific goals
2. **Discussion Questions** — Expandable accordion with conversation starters
3. **Extension Activities** — Hands-on experiments with time/materials
4. **Facilitation Tips** — Sub-tabs for parents vs. teachers
5. **Curriculum Connections** — Standards alignment
6. **Vocabulary Glossary** — 18 searchable terms with simple/technical definition toggle

### 12.7 Dr. St. Venant AI Character

Interactive Q&A mascot (`DrStVenant.tsx`) where children can ask questions about water flow and receive educational responses.

### 12.8 Coloring Page & Build Drain

- **Coloring Page** (`/coloring`) — Creative activity for younger children
- **Build Drain** (`/build-drain`) — Construction/design activity for drainage systems

---

## 13. SEO & Meta

- Title and meta description set in `index.html`
- `robots.txt` present in `public/`
- Semantic HTML used throughout (sections, headings hierarchy)
- Single H1 per page
- Published at: `https://singaporewaterflow.lovable.app`

---

## 14. Testing

### Playwright

- Configuration: `playwright.config.ts`
- Fixtures: `playwright-fixture.ts`
- Framework: `@playwright/test ^1.57.0`

No extensive test suite has been written yet. The infrastructure is in place for end-to-end testing.

---

## 15. Environment Variables

Managed automatically by Lovable Cloud. **DO NOT edit `.env` manually.**

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_PROJECT_ID` | Backend project identifier |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key for client-side auth |
| `VITE_SUPABASE_URL` | Backend API endpoint |

---

## 16. Deployment

- **Platform:** Lovable
- **Publish:** Via Lovable dashboard → Share → Publish
- **Custom Domain:** Configurable via Project → Settings → Domains
- **Current Published URL:** https://singaporewaterflow.lovable.app
- **Build Command:** `vite build`
- **Dev Server:** `vite` (HMR enabled)

---

## 17. Known Considerations

1. **No authentication implemented** — The database has no tables and no user accounts. Adding features like progress tracking will require implementing auth.
2. **No persistent state** — All quiz scores, game progress, and settings are session-only (lost on page refresh).
3. **Audio requires user interaction** — Web Audio API rain ambience needs a user click to start (browser autoplay policy).
4. **Large component count** — The `ui/` directory has 40+ shadcn components; many may be unused. A tree-shaking audit could reduce bundle size.
5. **Image assets are local** — All drainage photos are bundled in `src/assets/`. Consider CDN or Supabase Storage for optimization.
6. **Dark mode** — CSS variables are defined for dark mode but the theme toggle mechanism (via `next-themes`) may not be explicitly exposed in the UI.

---

## 18. Future Enhancement Ideas

| Feature | Complexity | Description |
|---------|-----------|-------------|
| Progress Tracking | Medium | Save quiz scores and activity completion per user (requires auth + DB tables) |
| Achievement Badges | Medium | Award badges for milestones (all categories completed, perfect score, etc.) |
| Leaderboard | Medium | Anonymous or authenticated score rankings |
| More Cities | Low | Add Tokyo, Amsterdam, New Orleans case studies |
| Printable Worksheets | Low | PDF generation of activities for classroom use |
| Multiplayer Race | High | Real-time drainage race between students |
| Teacher Dashboard | High | Classroom management, assign activities, view student progress |
| Accessibility Audit | Medium | WCAG 2.1 AA compliance review |
| i18n / Localization | High | Multi-language support for global classrooms |
| Mobile App (PWA) | Medium | Service worker + manifest for offline access |

---

*This document was generated on 2026-03-08 as a comprehensive handover reference for the St. Venant Water Flow for Grandkids project.*
