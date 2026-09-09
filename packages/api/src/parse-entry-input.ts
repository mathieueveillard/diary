import type { EntryInput } from "./types";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const parseEntryInput = (body: unknown): EntryInput | null => {
  if (typeof body !== "object" || body === null) return null;
  const { date, title, content } = body as Record<string, unknown>;
  if (typeof date !== "string" || !ISO_DATE.test(date)) return null;
  if (typeof title !== "string" || typeof content !== "string") return null;
  return { date, title, content };
};
