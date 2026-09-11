import type { EntrySummary } from "./types";

export type Cursor = Pick<EntrySummary, "createdAt" | "id">;

const SEPARATOR = "_";

export const encodeCursor = ({ createdAt, id }: Cursor): string => `${createdAt}${SEPARATOR}${id}`;

export const decodeCursor = (raw: string): Cursor | null => {
  const [createdAt, rawId, ...rest] = raw.split(SEPARATOR);
  if (!createdAt || !rawId || rest.length > 0) return null;
  const id = Number(rawId);
  if (!Number.isInteger(id)) return null;
  return { createdAt, id };
};
