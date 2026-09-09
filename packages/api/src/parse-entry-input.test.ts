import { expect, test } from "vitest";
import { parseEntryInput } from "./parse-entry-input";

test("accepts a well-formed input and drops unknown fields", () => {
  // Given
  const body = { date: "2026-09-09", title: "Hello", content: "# Hi", extra: true };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toEqual({ date: "2026-09-09", title: "Hello", content: "# Hi" });
});

test("rejects a date that is not YYYY-MM-DD", () => {
  // Given
  const body = { date: "09/09/2026", title: "", content: "" };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toBeNull();
});

test("rejects a missing content", () => {
  // Given
  const body = { date: "2026-09-09", title: "Hello" };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toBeNull();
});
