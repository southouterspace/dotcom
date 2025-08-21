# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a Next.js 15 AI chatbot application built with the AI SDK. The app uses xAI's Grok models by default but supports multiple AI providers. Key architectural components:

- **AI Models**: Configured in `lib/ai/providers.ts` with xAI Grok-2 variants for chat, reasoning, and artifacts
- **Database**: PostgreSQL with Drizzle ORM, schema in `lib/db/schema.ts`, migrations in `lib/db/migrations/`
- **Authentication**: NextAuth.js v5 with email/password and guest authentication
- **Artifacts**: Interactive code/text/image/sheet artifacts in `artifacts/` directory with separate client/server components
- **Storage**: Vercel Blob for file uploads, Redis for caching (optional)
- **Styling**: Tailwind CSS with shadcn/ui components

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production (runs migrations first)
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting and Biome
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Biome
- `pnpm test` - Run Playwright tests (requires `PLAYWRIGHT=True`)

### Database Commands

- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:push` - Push schema changes to database
- `pnpm db:pull` - Pull schema from database

## Testing

Uses Playwright for E2E testing with two test suites:
- `tests/e2e/` - End-to-end user interaction tests
- `tests/routes/` - API route testing
- Run single test: `pnpm exec playwright test --grep "test-name"`
- Test configuration in `playwright.config.ts` (4-minute timeout)

## Code Standards

Uses Biome for linting and formatting with strict rules:
- TypeScript strict mode enabled
- Accessibility rules enforced (some relaxed for UX needs)
- React best practices (fragments, proper hooks usage)
- Import organization disabled (use manual sorting)
- No explicit `any` types allowed in production

## Key File Patterns

- **Actions**: Server Actions in `app/(auth)/actions.ts` and `app/(chat)/actions.ts`
- **API Routes**: RESTful endpoints in `app/api/` with proper schema validation
- **Artifacts**: Each artifact type has client/server split (`artifacts/{type}/client.tsx` & `server.ts`)
- **Database**: Queries in `lib/db/queries.ts`, utilities in `lib/db/utils.ts`
- **AI Tools**: Custom tools in `lib/ai/tools/` for document creation, weather, suggestions

## Environment Variables

Requires `.env.local` with:
- `POSTGRES_URL` - Database connection
- `XAI_API_KEY` - xAI API key for Grok models
- `AUTH_SECRET` - NextAuth secret
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage
- Optional: Redis URL for caching

## AI Model Configuration

- Default models defined in `lib/ai/providers.ts`
- Test environment uses mock models from `lib/ai/models.test.ts`
- Reasoning model uses middleware for `<think>` tag extraction
- Model switching available in UI via `components/model-selector.tsx`

## Artifacts System

Artifacts are interactive components that users can create and edit:
- **Code**: CodeMirror editor with syntax highlighting
- **Text**: ProseMirror rich text editor  
- **Image**: Canvas-based image editor
- **Sheet**: Data grid for CSV/spreadsheet data
- All artifacts use React Server Components pattern with streaming