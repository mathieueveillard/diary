import type { EntryInput } from "./types";

export const parseEntryInput = (body: unknown): EntryInput | null => {
  if (typeof body !== "object" || body === null) return null;
  const { content } = body as Record<string, unknown>;
  if (typeof content !== "string") return null;
  return { content };
};
