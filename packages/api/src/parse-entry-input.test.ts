import { expect, test } from "vitest";
import { parseEntryInput } from "./parse-entry-input";

test("accepts a well-formed input and drops unknown fields", () => {
  // Given
  const body = { content: "# Hi", extra: true };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toEqual({ content: "# Hi" });
});

test("rejects a missing content", () => {
  // Given
  const body = { createdAt: "2026-09-11T08:00:00.000Z" };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toBeNull();
});

test("rejects a body that is not an object", () => {
  // Given
  const body = "Hello";

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toBeNull();
});
