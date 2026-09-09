import type { EntrySummary } from "./types";

export type Cursor = Pick<EntrySummary, "date" | "id">;

const SEPARATOR = "_";

export const encodeCursor = ({ date, id }: Cursor): string => `${date}${SEPARATOR}${id}`;

export const decodeCursor = (raw: string): Cursor | null => {
  const [date, rawId, ...rest] = raw.split(SEPARATOR);
  if (!date || !rawId || rest.length > 0) return null;
  const id = Number(rawId);
  if (!Number.isInteger(id)) return null;
  return { date, id };
};
