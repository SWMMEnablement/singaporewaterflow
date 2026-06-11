# Singapore Water Flow - St. Venant Water Flow for Grandkids

> _README added by Robert Dickinson via Comet._

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000?logo=shadcnui&logoColor=white)

## About

**Singapore Water Flow** (St. Venant Water Flow for Grandkids) is an interactive educational web application that teaches children - primarily under 10, with content up to age 13 - about fluid dynamics, engineering, and the water cycle. It uses metaphors and games to translate complex hydraulics for younger audiences, while offering a "Technical Mode" for older students that reveals the real equations and details.

The app introduces the **Saint-Venant equations** (the foundation of open-channel flow), **SWMM5** stormwater management, Manning's roughness, and real-world case studies comparing monsoon and flash-flood management in Singapore and Dubai.

It is part of the SWMMEnablement collection and is built on a Vite + React + TypeScript frontend with a Supabase backend.

## What's Inside

| Feature | Description |
| --- | --- |
| Dual-mode system | Global toggle between "Kid-Friendly" (simplified) and "Technical Mode" (real equations and details). |
| Slope simulator | Drag-and-build to see how slope angle affects water speed. |
| Roughness simulator | Pick surface types (concrete, grass, etc.) to see how texture slows flow. |
| Drainage race | Animation comparing water speed across different surfaces. |
| Challenge games | Singapore Storm Challenge (SWMM5-themed) and Dubai Flash Flood Challenge (ICM InfoWorks-themed). |
| Quiz engine | 15-question quiz across History, Equations, Roughness, Singapore, and SWMM5, with feedback and a completion certificate. |
| Educational tools | AI-powered mascot (Dr. St. Venant), animated water cycle, and a Parent/Teacher guide with curriculum links. |
| Hands-on activities | Coloring page and a "Build Drain" construction activity. |
| Glossary | Searchable list of 18 hydraulic engineering terms. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript |
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Lovable Cloud (Supabase) |
| State | React Context + TanStack React Query |
| Charts / icons | Recharts, Lucide React |
| Testing | Playwright |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/SWMMEnablement/singaporewaterflow.git
cd singaporewaterflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

This project uses Supabase Cloud features. Provide the required environment variables (see `.env`) for full backend functionality. Then open the local URL printed by Vite (typically http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## License

Released under the MIT License unless otherwise noted in this repository.
