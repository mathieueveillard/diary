import { expect, test } from "vitest";
import { join } from "./join";

test("joins class names with a single space", () => {
  // When & Then
  expect(join(["rounded-md", "px-3 py-1.5", "text-sm"])).toBe("rounded-md px-3 py-1.5 text-sm");
});

test("returns an empty string when there is no class name", () => {
  // When & Then
  expect(join([])).toBe("");
});
