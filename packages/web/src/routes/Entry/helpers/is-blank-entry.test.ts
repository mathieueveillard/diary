import { expect, test } from "vitest";
import { isBlankEntry } from "./is-blank-entry";

test("considers an entry without content blank", () => {
  // Given
  const entry = { content: "" };

  // When & Then
  expect(isBlankEntry(entry)).toBe(true);
});

test("considers an entry with only a title non-blank", () => {
  // Given
  const entry = { content: "# A quiet Sunday" };

  // When & Then
  expect(isBlankEntry(entry)).toBe(false);
});

test("considers an entry with content non-blank", () => {
  // Given
  const entry = { content: "The garden is finally awake." };

  // When & Then
  expect(isBlankEntry(entry)).toBe(false);
});
