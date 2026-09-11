import { mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { encodeCursor, type Cursor } from "./cursor";
import type { Entry, EntryInput, EntryPage, EntrySummary } from "./types";

const dataDir = fileURLToPath(new URL("../data/", import.meta.url));
mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(`${dataDir}diary.db`);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS entries (
    id         INTEGER PRIMARY KEY,
    title      TEXT NOT NULL DEFAULT '',
    content    TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS entries_created_at_id ON entries(created_at DESC, id DESC);

  CREATE VIRTUAL TABLE IF NOT EXISTS entries_fts USING fts5(
    title, content, content='entries', content_rowid='id'
  );

  CREATE TRIGGER IF NOT EXISTS entries_ai AFTER INSERT ON entries BEGIN
    INSERT INTO entries_fts(rowid, title, content) VALUES (new.id, new.title, new.content);
  END;

  CREATE TRIGGER IF NOT EXISTS entries_ad AFTER DELETE ON entries BEGIN
    INSERT INTO entries_fts(entries_fts, rowid, title, content)
      VALUES ('delete', old.id, old.title, old.content);
  END;

  CREATE TRIGGER IF NOT EXISTS entries_au AFTER UPDATE ON entries BEGIN
    INSERT INTO entries_fts(entries_fts, rowid, title, content)
      VALUES ('delete', old.id, old.title, old.content);
    INSERT INTO entries_fts(rowid, title, content) VALUES (new.id, new.title, new.content);
  END;
`);

const ENTRY_COLUMNS =
  "id, title, content, created_at AS createdAt, updated_at AS updatedAt";

const SUMMARY_COLUMNS = "id, title, created_at AS createdAt";

const selectEntry = db.prepare(`SELECT ${ENTRY_COLUMNS} FROM entries WHERE id = ?`);

const selectFirstPage = db.prepare(
  `SELECT ${SUMMARY_COLUMNS} FROM entries ORDER BY created_at DESC, id DESC LIMIT ?`,
);

const selectPageAfter = db.prepare(
  `SELECT ${SUMMARY_COLUMNS} FROM entries
   WHERE created_at < ? OR (created_at = ? AND id < ?)
   ORDER BY created_at DESC, id DESC LIMIT ?`,
);

const insertEntry = db.prepare(
  `INSERT INTO entries (title, content, created_at, updated_at)
   VALUES (?, ?, ?, ?)`,
);

const updateEntryById = db.prepare(
  `UPDATE entries SET title = ?, content = ?, updated_at = ? WHERE id = ?`,
);

export const listEntries = (cursor: Cursor | null, limit: number): EntryPage => {
  const rows = (
    cursor
      ? selectPageAfter.all(cursor.createdAt, cursor.createdAt, cursor.id, limit + 1)
      : selectFirstPage.all(limit + 1)
  ) as EntrySummary[];
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const nextCursor = rows.length > limit && last ? encodeCursor(last) : null;
  return { items, nextCursor };
};

export const getEntry = (id: number): Entry | null =>
  (selectEntry.get(id) as Entry | undefined) ?? null;

export const createEntry = ({ title, content }: EntryInput): Entry => {
  const now = new Date().toISOString();
  const { lastInsertRowid } = insertEntry.run(title, content, now, now);
  return getEntry(Number(lastInsertRowid))!;
};

export const updateEntry = (id: number, { title, content }: EntryInput): Entry | null => {
  const now = new Date().toISOString();
  const { changes } = updateEntryById.run(title, content, now, id);
  return changes === 0 ? null : getEntry(id);
};
