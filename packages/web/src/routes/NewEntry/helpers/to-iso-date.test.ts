import { expect, test } from "vitest";
import { toIsoDate } from "./to-iso-date";

test("formats a local date as YYYY-MM-DD with zero padding", () => {
  // Given
  const date = new Date(2026, 0, 5);

  // When
  const isoDate = toIsoDate(date);

  // Then
  expect(isoDate).toBe("2026-01-05");
});
