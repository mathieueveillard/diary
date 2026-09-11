import { expect, test } from "vitest";
import { formatDateTime } from "./format-date-time";

test("formats a timestamp as a weekday, a date and the time of day", () => {
  // Given
  const isoTimestamp = new Date(2026, 8, 9, 14, 32).toISOString();

  // When
  const formatted = formatDateTime(isoTimestamp);

  // Then
  expect(formatted).toBe("Wed 9 Sep 2026, 14:32");
});

test("pads the hours and the minutes", () => {
  // Given
  const isoTimestamp = new Date(2026, 8, 9, 8, 5).toISOString();

  // When
  const formatted = formatDateTime(isoTimestamp);

  // Then
  expect(formatted).toBe("Wed 9 Sep 2026, 08:05");
});

test("returns the input unchanged when it is not a timestamp", () => {
  // Given
  const isoTimestamp = "not-a-timestamp";

  // When
  const formatted = formatDateTime(isoTimestamp);

  // Then
  expect(formatted).toBe("not-a-timestamp");
});
