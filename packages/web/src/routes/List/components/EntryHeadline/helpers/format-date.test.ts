import { expect, test } from "vitest";
import { formatDate } from "./format-date";

test("formats an ISO date with its weekday", () => {
  // Given
  const isoDate = "2026-09-09";

  // When
  const formatted = formatDate(isoDate);

  // Then
  expect(formatted).toBe("Wed 9 Sep 2026");
});

test("returns the input unchanged when it is not an ISO date", () => {
  // Given
  const isoDate = "not-a-date";

  // When
  const formatted = formatDate(isoDate);

  // Then
  expect(formatted).toBe("not-a-date");
});
