export type Entry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type EntrySummary = Pick<Entry, "id" | "title" | "createdAt">;

export type EntryInput = Pick<Entry, "title" | "content">;

export type EntryPage = {
  items: EntrySummary[];
  nextCursor: string | null;
};
