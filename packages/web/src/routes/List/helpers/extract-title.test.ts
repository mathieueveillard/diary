import { expect, test } from "vitest";
import { extractTitle } from "./extract-title";

test("reads the level-1 heading opening the entry", () => {
  expect(extractTitle("# A quiet Sunday\n\nThe garden is finally awake.")).toBe("A quiet Sunday");
});

test("reads a level-1 heading that comes after some prose", () => {
  // Given
  const content = "A note to myself.\n\n# Repotting the ficus\n\nIt outgrew its pot again.";

  // When & Then
  expect(extractTitle(content)).toBe("Repotting the ficus");
});

test("ignores deeper headings", () => {
  expect(extractTitle("## Groceries\n\nOlives, bread.")).toBe("");
});

test("ignores a hash that is not a heading", () => {
  expect(extractTitle("#hashtag\n\nStill not a title.")).toBe("");
});

test("returns nothing when the entry has no heading", () => {
  expect(extractTitle("The garden is finally awake.")).toBe("");
});

test("returns nothing for an empty entry", () => {
  expect(extractTitle("")).toBe("");
});
