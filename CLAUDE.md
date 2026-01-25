# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 personal portfolio/landing site using the App Router with Tailwind CSS v4 and Framer Motion.

### Key Structure

- `app/page.tsx` - Server component that reads markdown content from `skills-instructions-contexts/FAI_final_drafts/` and passes it to the client shell
- `components/app-shell.tsx` - Main client component containing all UI sections (mission, about, letter, inspiration, links, making-of) with sidebar navigation and animated content switching
- `lib/utils.ts` - Utility for className merging using `clsx` + `tailwind-merge` (the `cn()` function)

### Styling

- Tailwind v4 with `@tailwindcss/typography` plugin
- Brand colors defined in `app/globals.css` via CSS custom properties (`--brand-fuchsia`, `--brand-pink`)
- Uses `@theme inline` directive for Tailwind v4 theme configuration
- Dark mode via `prefers-color-scheme` media query
- Geist Sans and Geist Mono fonts loaded via `next/font/google`

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`)
