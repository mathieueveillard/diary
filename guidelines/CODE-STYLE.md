# Code style

## Casing

- kebab-case for all directories (`user-management/`, `api-clients/`), except React component directories which use PascalCase (`UserProfile/`).
- kebab-case for all files (`user-service.ts`, `api-client.ts`), except React component files which use PascalCase (`UserProfile.tsx`).
- camelCase for variables, functions, and acronyms (e.g. `iban`, `generateIban`).
- SCREAMING_SNAKE_CASE for constants, environment variables, and string constants (statuses, error codes, event names, etc.) — e.g. `"SLUG_NOT_AVAILABLE"`, not `"SlugNotAvailable"`.
- PascalCase for type declarations; camelCase for their attributes.
- PascalCase for classes; camelCase for their attributes and methods.
- PascalCase for React component names (`UserProfile`).

## Naming

- No abbreviations, unless they are business-meaningful (e.g. VAT). For example, use `context` not `c`, `error` not `err`, `request` not `req`.
- Name things for what they _are_ (their intrinsic behavior or trait), never for _where_ they are used. A name tied to a call site goes stale when the caller changes and obscures the actual distinction. For example, a `Link` variant that suppresses the hover underline is `block-quiet` (the trait), not `panel` (the one place it happens to appear); a spacing token is `spacing-lg`, not `spacing-sidebar`.
- Use comments as a last resort only. Always prefer conveying intent through naming and architecture first.

## Functions

- Arrow functions only — no `function` declarations or expressions.
- Functions should be curried, with the most stable arguments first (e.g. dependencies, configuration) and the most variable arguments last (e.g. per-call input). Example: `const createSeries = (dependencies: Dependencies) => async (input: Input): Promise<Series> => { ... }`
- Avoid creating Input types when they only contain a single parameter or a domain identifier. Pass parameters directly.
- Input types are appropriate only when multiple logically related parameters (beyond a single domain identifier) need grouping for clarity.
- Avoid side effects as much as possible. When a side effect is unavoidable, warn the user and ask for guidance before proceeding.
- Use destructuring as much as possible, for both parameters and local variables.
- Respect the Law of Demeter: a function should accept the narrowest data it actually needs, not a larger aggregate it would have to reach into. Prefer `(photographs: ReadonlyArray<Photograph>, ids: ...)` over `(series: Series, ids: ...)` when only the photographs are used. Callers extract the substructure at the call site (e.g. `requireKnownPhotographIds(getPhotographs(series), ids)`).

## Immutability

Prefer immutable data throughout the codebase. Use the following techniques, from weakest to strongest:

- `const` prevents reassignment of a binding but does not protect object contents.
- `Readonly<T>` makes all direct properties readonly, but is not recursive — nested objects remain mutable.
- `DeepReadonly<T>` (defined in `@portfolio/utils`) applies `readonly` recursively to all nested properties. Prefer this for domain entities and value objects.
- The spread operator (`{ ...obj }`, `[...arr]`) produces a shallow copy — use it to derive updated values instead of mutating in place.

## Types

- TypeScript only — no JavaScript files anywhere in the codebase.
- Never use `interface` — always use `type` for type declarations.
- Never use TypeScript `as` type assertions. Use proper type narrowing instead.
- All functions must have an explicit return type, **except** when the return type is fully constrained by a type the function must satisfy — e.g. methods in an object typed as `SeriesRepository`, or callbacks passed to `router.get()` / `router.post()` etc.
- Define types explicitly rather than inlining them in function signatures.
- Avoid primitive obsession: use nominal/branded types instead of raw primitives for domain identifiers. Example: `SeriesId` (defined in `domain/entities/series.ts`) instead of `string` wherever a series ID is expected. The pattern uses a Symbol to emulate nominal typing at the TypeScript level. Adapters are responsible for serializing branded types to/from primitives at the infrastructure boundary.

## Formatting

- Always use curly brackets for `if` blocks, even for single-line bodies — never write `if (condition) return value;` on a single line.
- Add a blank line after each statement in a function body.

## File structure

- Structure files with helper functions first, then the main function.

## Imports and exports

- Prefer named exports over default exports. Export each symbol at its declaration site — do not group exports in a separate section at the bottom of the file.
- Never use plain HTTP status code literals (e.g. `404`). Import the named constants from `utils/http-codes.ts` (e.g. `HTTP_CODES.NOT_FOUND`) to make intent explicit at call sites.
