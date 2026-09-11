// Node 24.19 ships `crypto.randomUUIDv7()`, but the v24 line of @types/node does not declare it
// yet (it appears in v26). Delete this file once @types/node catches up.
declare module "node:crypto" {
  export function randomUUIDv7(options?: { disableEntropyCache?: boolean }): string;
}
