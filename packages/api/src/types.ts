export type Entry = {
  id: number;
  date: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type EntrySummary = Pick<Entry, "id" | "date" | "title">;

export type EntryInput = Pick<Entry, "date" | "title" | "content">;

export type EntryPage = {
  items: EntrySummary[];
  nextCursor: string | null;
};
