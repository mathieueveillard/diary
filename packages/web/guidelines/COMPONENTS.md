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
│   └── use-update-entry.ts
└── components/
    └── EntryView/
        ├── EntryView.tsx
        └── index.ts
```

### Semantic HTML ownership

When a parent–child HTML element pair forms a single semantic structure (e.g. `<ul>` / `<li>`, `<table>` / `<tr>`, `<dl>` / `<dt>`), both elements must live in the same component. Do not split them across parent and child components — this creates implicit coupling where the child _must_ render a specific HTML element but nothing in its API enforces it. The child component should be purely visual and have no knowledge of the list/table context it sits in.

```tsx
// Good — List owns the full list semantics
<ul>
  {items.map(({ id, date, title }) => (
    <li key={id}>
      <Link to={`/entries/${id}`}>
        <time dateTime={date}>{formatDate(date)}</time>
        <span>{title}</span>
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
│   ├── format-date.ts        ← one function per file
│   └── format-date.test.ts   ← unit test next to the helper
└── index.ts
```

Every helper must have a co-located `*.test.ts` file. Tests use Vitest (`import { expect, test } from "vitest"`) and follow the project-wide test style (`test(`, `// Given` / `// When` / `// Then` comments).

### Law of Demeter for props

When a component receives data via props, pass only the specific values it needs — never a broad object it must reach into. This reduces coupling: the child depends on a shape it actually uses, not on an ancestor's domain type.

```tsx
// Good — EntryView depends only on what it uses
<EntryView date={entry.date} title={entry.title} content={entry.content} />

// Bad — EntryView receives the whole Entry but never reads entry.createdAt
<EntryView entry={entry} />
```

The parent that owns the broad object is the natural decomposition boundary: it destructures the object and passes scalar or narrowly-typed props to its children.
