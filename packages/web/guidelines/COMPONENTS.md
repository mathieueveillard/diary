# COMPONENTS.md — @diary/web

## Creating components

All new components must be created from the template in `src/.templates/Component/`. Copy the folder, rename it to the component name (PascalCase), and replace every occurrence of `Component` with the actual name.

The template contains a `.tsx` implementation file and an `index.ts` re-export — no stories, no tests (app components are integration-tested at the page level).

### Single Responsibility Principle

A component should have only one reason to change. Decompose recursively until each component is a thin composition of its children.

```
Entry/                     ← changes if the entry page layout changes
├── EntryView/             ← changes if how an entry renders in read mode changes
└── (EntryForm)            ← changes if how an entry is edited changes
```

#### What must be extracted

Any JSX that carries its own presentation — an element with a label, its own Tailwind classes, or a fixed piece of copy — is a component, however small. Concretely:

- every button (`EditButton`, `DeleteButton`, `NewEntryButton`)
- every link with its own label (`BackToDiaryLink`)
- every status message (`EntryLoading`, `EntryNotFound`, `ListError`)

Size is not a criterion. A three-line `<button>` has its own reasons to change — its wording, its styling — and belongs in its own file. "It's only one line" is not a reason to inline it.

#### What the parent keeps

A route or parent component is left with only:

- hooks and state (`useParams`, query/mutation hooks, derived values)
- event handlers, passed down as `on*` props
- layout and semantic container elements (`<main>`, `<nav>`, `<header>`, `<ul>`/`<li>`, spacing wrappers)
- conditional rendering

Placement belongs to the parent, never to the child. `BackToDiaryLink` renders the `<Link>` alone; the `<nav>` that positions it stays in `Entry.tsx`. It follows that a child never sets its own outer spacing — `mb-6`, `mt-6`, `gap-*` live on the parent's wrapper, so the same child can be placed anywhere.

```tsx
// Good — the route keeps placement and wiring, children own their presentation
<nav className="mb-6">
  <BackToDiaryLink />
</nav>
{status === "pending" && <EntryLoading />}
{status === "error" && <EntryNotFound />}
<div className="mt-6 flex gap-2">
  <EditButton onClick={() => setSearchParams("edit")} />
  <DeleteButton pending={remove.isPending} onClick={discard} />
</div>

// Bad — presentation inlined in the route
<nav className="mb-6">
  <Link to="/" className="underline">
    ← Back to diary
  </Link>
</nav>
{status === "pending" && <p className="text-gray-500">Loading…</p>}
{status === "error" && <p className="text-red-600">Entry not found.</p>}
<div className="mt-6 flex gap-2">
  <button
    type="button"
    onClick={() => setSearchParams("edit")}
    className="rounded border border-gray-300 px-3 py-1"
  >
    Edit
  </button>
  {/* … */}
</div>
```

#### Naming

Name a component after what it is in the UI, not after the state that renders it. Status components carry their route as a prefix (`EntryLoading`, `ListLoading`) because their copy is route-specific — "Entry not found." and "Failed to load entries." are not the same message. They stay route-local until a second route needs the exact same one, at which point the placement rule below moves them to `src/components/`.

### Component placement in the app

Routes live in `src/routes/`, one folder per route, shaped exactly like a component (same template, same rules below). Nest components as close as possible to where they are used. A component that is only used by one route lives inside that route's `components/` folder. Only move a component up to `src/components/` when it is used by more than one route.

```
src/
├── components/                  ← shared across multiple routes
│   └── EntryForm/               ← used by both Entry and NewEntry
├── api/                         ← shared fetch helpers and query keys
└── routes/
    ├── List/                    ← serves "/"
    │   ├── List.tsx
    │   ├── index.ts
    │   ├── api/                 ← query/mutation hooks used only by this route
    │   ├── hooks/               ← other hooks used only by this route
    │   ├── helpers/
    │   └── components/          ← used only by the list page
    │       └── LoadMoreSentinel/
    ├── Entry/                   ← serves "/entries/:id"
    │   ├── Entry.tsx
    │   ├── api/
    │   └── components/
    │       └── EntryView/
    └── NewEntry/                ← serves "/entries/new"
```

Routes are registered in `src/main.tsx`.

### Sub-component placement

When a component uses sub-components, those sub-components must live in a `components/` subfolder of that component's directory, no exception. This applies at every level of nesting.

```
src/routes/Entry/
├── Entry.tsx
├── index.ts
├── api/
│   ├── use-entry.ts
│   ├── use-update-entry.ts
│   └── use-delete-entry.ts
├── helpers/
│   ├── is-blank-entry.ts
│   └── is-blank-entry.test.ts
└── components/
    ├── BackToDiaryLink/
    │   ├── BackToDiaryLink.tsx
    │   └── index.ts
    ├── DeleteButton/
    ├── EditButton/
    ├── EntryForm/
    ├── EntryLoading/
    ├── EntryNotFound/
    └── EntryView/
```

### Semantic HTML ownership

When a parent–child HTML element pair forms a single semantic structure (e.g. `<ul>` / `<li>`, `<table>` / `<tr>`, `<dl>` / `<dt>`), both elements must live in the same component. Do not split them across parent and child components — this creates implicit coupling where the child _must_ render a specific HTML element but nothing in its API enforces it. The child component should be purely visual and have no knowledge of the list/table context it sits in.

```tsx
// Good — List owns the full list semantics
<ul>
  {items.map(({ id, createdAt, content }) => (
    <li key={id}>
      <Link to={`/entries/${id}`}>
        <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
        <span>{extractTitle(content)}</span>
      </Link>
    </li>
  ))}
</ul>

// Bad — semantic coupling split across components
<ul>
  {items.map((item) => (
    <EntryListItem entry={item} />  {/* EntryListItem renders <li> internally — implicit contract */}
  ))}
</ul>
```

### Helper functions

When a component uses helper functions (formatters, mappers, predicates, etc.), extract each function into its own file inside a `helpers/` subfolder of the component's directory, using kebab-case naming. Do not define helper functions inline in the component file.

```
List/
├── List.tsx
├── helpers/
│   ├── extract-title.ts       ← one function per file
│   └── extract-title.test.ts  ← unit test next to the helper
└── index.ts
```

Every helper must have a co-located `*.test.ts` file. Tests use Vitest (`import { expect, test } from "vitest"`) and follow the project-wide test style (`test(`, `// Given` / `// When` / `// Then` comments).

A helper follows the same placement rule as a component: it only moves up to the shared `src/helpers/` folder once more than one route uses it (`format-date-time.ts` is shared by `List` and `Entry`).

### Law of Demeter for props

When a component receives data via props, pass only the specific values it needs — never a broad object it must reach into. This reduces coupling: the child depends on a shape it actually uses, not on an ancestor's domain type.

```tsx
// Good — EntryView depends only on what it uses
<EntryView createdAt={entry.createdAt} content={entry.content} />

// Bad — EntryView receives the whole Entry but never reads entry.updatedAt
<EntryView entry={entry} />
```

The parent that owns the broad object is the natural decomposition boundary: it destructures the object and passes scalar or narrowly-typed props to its children.
