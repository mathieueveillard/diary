export type Entry = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type EntrySummary = Pick<Entry, "id" | "content" | "createdAt">;

export type EntryInput = Pick<Entry, "content">;

export type EntryPage = {
  items: EntrySummary[];
  nextCursor: string | null;
};
