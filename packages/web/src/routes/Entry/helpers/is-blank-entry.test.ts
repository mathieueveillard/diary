import { expect, test } from "vitest";
import { isBlankEntry } from "./is-blank-entry";

test("considers an entry with neither title nor content blank", () => {
  // Given
  const entry = { title: "", content: "" };

  // When
  const blank = isBlankEntry(entry);

  // Then
  expect(blank).toBe(true);
});

test("considers an entry with only a title non-blank", () => {
  // Given
  const entry = { title: "A quiet Sunday", content: "" };

  // When
  const blank = isBlankEntry(entry);

  // Then
  expect(blank).toBe(false);
});

test("considers an entry with only content non-blank", () => {
  // Given
  const entry = { title: "", content: "The garden is finally awake." };

  // When
  const blank = isBlankEntry(entry);

  // Then
  expect(blank).toBe(false);
});
