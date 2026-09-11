# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal diary web app, intended to be run locally (`localhost`) by its developer/user â not deployed for public/multi-user access. There is no auth or hosting concern to design around; treat it as a single-user local tool. Entries are written in Markdown.

## Workspace

pnpm workspace (Node >= 24) with two packages:

- `packages/api` (`@diary/api`) â Hono HTTP API on port 8787, SQLite via Node's built-in `node:sqlite` (no native dependency). The database lives at `packages/api/data/diary.db` (gitignored) and its schema is applied on startup in `src/db.ts`.
- `packages/web` (`@diary/web`) â Vite + React + TypeScript SPA, React Router (v8: `RouterProvider` comes from `react-router/dom`, everything else from `react-router`), TanStack Query, Tailwind v4 (no config file, no design system â keep styling light). Vite proxies `/api` to the API.

Shared types are not a third package: `@diary/api` exports `./types` (`packages/api/src/types.ts`) and `web` imports them with `import type { Entry } from "@diary/api/types"`.

## Commands

Two dev processes, started manually in separate terminals:

```
pnpm api:dev        # tsx watch, http://localhost:8787
pnpm web:dev        # vite, http://localhost:5173
pnpm typecheck      # tsc in every package
pnpm test           # vitest in every package
pnpm --filter @diary/web vitest run src/helpers/format-date-time.test.ts   # single test file
pnpm --filter @diary/web build
```

## Documentation

Write all documentation (comments, README, etc.) in English.

## Guidelines

- [CODE-STYLE.md](./guidelines/CODE-STYLE.md) â naming, types, functions, formatting, immutability
- [TEST-STYLE.md](./guidelines/TEST-STYLE.md) â test structure, fixtures, assertions

## Frontend conventions

`packages/web/guidelines/COMPONENTS.md` is the component rulebook (template-based creation, placement under `src/routes/<Route>/` vs `src/components/`, semantic HTML ownership, one helper per file with a co-located test, Law of Demeter for props). Read it before adding or moving a component.

## Things that are not obvious from the code

- **Pagination is keyset-based.** `GET /api/entries?limit=&cursor=` orders by `(created_at DESC, id DESC)`; the cursor is `<createdAt>_<id>` of the last item (see `packages/api/src/cursor.ts`). Do not switch to offset pagination — entries sharing a timestamp would duplicate across pages. An entry has no separate date field: `createdAt` is its date, set by the server at creation and never edited.
- **Scroll restoration on the list is deliberate.** `useEntries` sets a `staleTime` so the cached pages are reused when navigating back from an entry, and `useRestoreScrollPosition` restores `scrollY` once the data is rendered. React Router's `<ScrollRestoration>` is intentionally not used; it would reset the list to the top before its data is there.
- **Full-text search is prepared, not implemented.** The FTS5 table `entries_fts` and its sync triggers already exist so a search endpoint can be added without a migration. Markdown is stored raw; FTS5's tokenizer treats Markdown punctuation as separators, so nothing needs stripping.
