# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo using npm workspaces with Turbo for build optimization. The structure follows a standard apps/packages pattern:

- **apps/web/** - Next.js 15 application using Bun as package manager
- **apps/api/** - Backend API (empty, ready for implementation)
- **apps/docs/** - Documentation site (empty, ready for implementation) 
- **packages/** - Shared packages for UI components, utilities, and configuration

The web app uses Ultracite for zero-configuration linting/formatting via Biome, with strict TypeScript, accessibility, and React best practices enforced.

## Development Commands

### Monorepo Level (run from root)
- `npm run dev` - Start all development servers via Turbo
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all workspaces
- `npm run test` - Run all tests
- `npm run type-check` - Type check all workspaces
- `npm run clean` - Clean all build artifacts

### Web App Level (run from apps/web/)
- `bun dev` - Start Next.js development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run Next.js linting

Note: The web app specifically uses Bun (`packageManager: "bun@1.0.0"`) while the monorepo root uses npm for workspace management.

## Code Standards

The project enforces strict code quality through Ultracite configuration:

### Key Requirements
- **TypeScript**: Strict type safety, no `any` types
- **Accessibility**: Full WCAG compliance - always include alt text, proper ARIA roles, keyboard navigation
- **React**: Use hooks correctly, avoid index keys, prefer fragments over divs
- **Performance**: Use `for...of` over `forEach`, prefer `flatMap()`, use arrow functions
- **Next.js**: Use `next/image` instead of `<img>`, proper `next/head` usage

### Formatting and Linting
- Biome handles all formatting and linting automatically
- Rules are inherited from `ultracite` configuration
- Git hooks via Lefthook (configured but not active)

## Dependencies

### Web App Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Animation**: tw-animate-css
- **Development**: TypeScript 5, Biome, Ultracite

### Build System
- **Monorepo**: Turbo with task dependency graph
- **Package Manager**: Mixed (npm for root, Bun for web app)
- **Caching**: Turbo handles build caching, dev servers run persistently

## File Structure Notes

- Web app follows Next.js 15 App Router structure (`src/app/`)
- Shared utilities go in `src/lib/`
- Components follow shadcn/ui conventions (see `components.json`)
- Public assets in `public/` directory
- TypeScript configured for strict mode with path mapping