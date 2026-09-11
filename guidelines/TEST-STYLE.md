# Test style

- Test files must be suffixed with `*.test.ts` / `*.test.tsx`, never `*.spec.ts` / `*.spec.tsx`.
- Use `test(` — never `it(`.
- Structure each test body with `// Given`, `// When`, and `// Then` comments. Two shortcuts are allowed for simple tests:
  - When the input is a trivial literal (a string, a number, etc.), skip the `// Given` section and inline the value directly: `expect(isValidTitle("Paris")).toBe(true);`.
  - When the `// Given` section is needed but the assertion is straightforward, combine `// When` and `// Then` into a single `// When & Then` step: `expect(isEmptyDocument(document)).toBe(true);`.
- In the `// Given` section, always explicitly declare the parameters (inputs, fixtures, dependencies) that will be used in the `// When` section as arguments. This makes the test's inputs visible upfront without requiring the reader to trace through the `// When` section.
- In the `// Given` section, always explicitly override every dependency behaviour that is relevant to the test — even if the value matches the default provided by the factory — so the reader can understand what the test exercises without consulting the factory.
- In the `// Given` section, declare only **input and setup values** — things passed to functions or used to construct test data. Do not declare expected values here; expected values belong inline with assertions in the `// Then` section or declared there.
- Use persona-based fixtures (not inline object literals). Prefer business personas (e.g. a photographer, a gallery visitor) over geek culture references — this reinforces domain understanding. Follow existing test patterns in the same package before inventing new approaches.
- Tests should be self-contained as much as possible: avoid shared constants declarations because they create side effects (implicit coupling between tests, harder to reason about each test in isolation).
- Avoid declaring constants for simple fixture values that don't add semantic clarity (e.g., `const PHOTO_A_ID = "a"` is noise; just inline `"a"`). Extract a constant only when it has semantic meaning or is reused across Given and Then sections (e.g., a timestamp used both as input and in assertions).
- Assertions must be explicit: never compare the result against the input object (e.g. `expect(result.abstract).toEqual(input.abstract)` hides the expected value). Instead, assert against the concrete expected value directly (e.g. `expect(result.abstract).toEqual(NON_EMPTY_ABSTRACT)` or `expect(result.index).toBe("a6")`). This makes the test's requirements visible without requiring the reader to trace through input construction.
