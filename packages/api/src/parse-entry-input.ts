import type { EntryInput } from "./types";

export const parseEntryInput = (body: unknown): EntryInput | null => {
  if (typeof body !== "object" || body === null) return null;
  const { title, content } = body as Record<string, unknown>;
  if (typeof title !== "string" || typeof content !== "string") return null;
  return { title, content };
};
