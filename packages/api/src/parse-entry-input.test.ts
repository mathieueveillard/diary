import { expect, test } from "vitest";
import { parseEntryInput } from "./parse-entry-input";

test("accepts a well-formed input and drops unknown fields", () => {
  // Given
  const body = { title: "Hello", content: "# Hi", extra: true };

  // When
  const input = parseEntryInput(body);

  // Then
  expect(input).toEqual({ title: "Hello", content: "# Hi" });
});

test("rejects a missing content", () => {
  // Given
  const body = { title: "Hello" };

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
