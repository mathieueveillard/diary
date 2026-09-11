import { expect, test } from "vitest";
import { decodeCursor, encodeCursor } from "./cursor";

test("encodes and decodes a cursor symmetrically", () => {
  // Given
  const cursor = { createdAt: "2026-09-09T14:32:10.123Z", id: 42 };

  // When
  const decoded = decodeCursor(encodeCursor(cursor));

  // Then
  expect(decoded).toEqual(cursor);
});

test("rejects a cursor with a non-numeric id", () => {
  // Given
  const raw = "2026-09-09T14:32:10.123Z_abc";

  // When
  const decoded = decodeCursor(raw);

  // Then
  expect(decoded).toBeNull();
});

test("rejects a cursor with missing parts", () => {
  // Given
  const raw = "2026-09-09T14:32:10.123Z";

  // When
  const decoded = decodeCursor(raw);

  // Then
  expect(decoded).toBeNull();
});
