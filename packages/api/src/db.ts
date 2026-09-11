import { randomUUIDv7 } from "node:crypto";
import { mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import type { Entry, EntryInput, EntryPage, EntrySummary } from "./types";

const dataDir = fileURLToPath(new URL("../data/", import.meta.url));
mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(`${dataDir}diary.db`);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS entries (
    id         TEXT PRIMARY KEY,
    content    TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL UNIQUE,
    updated_at TEXT NOT NULL
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS entries_fts USING fts5(
    id UNINDEXED, content
  );

  CREATE TRIGGER IF NOT EXISTS entries_ai AFTER INSERT ON entries BEGIN
    INSERT INTO entries_fts(id, content) VALUES (new.id, new.content);
  END;

  CREATE TRIGGER IF NOT EXISTS entries_ad AFTER DELETE ON entries BEGIN
    DELETE FROM entries_fts WHERE id = old.id;
  END;

  CREATE TRIGGER IF NOT EXISTS entries_au AFTER UPDATE ON entries BEGIN
    UPDATE entries_fts SET content = new.content WHERE id = new.id;
  END;
`);

const ENTRY_COLUMNS = "id, content, created_at AS createdAt, updated_at AS updatedAt";

const SUMMARY_COLUMNS = "id, content, created_at AS createdAt";

const selectEntry = db.prepare(`SELECT ${ENTRY_COLUMNS} FROM entries WHERE id = ?`);

const selectFirstPage = db.prepare(
  `SELECT ${SUMMARY_COLUMNS} FROM entries ORDER BY created_at DESC LIMIT ?`,
);

const selectPageAfter = db.prepare(
  `SELECT ${SUMMARY_COLUMNS} FROM entries
   WHERE created_at < ?
   ORDER BY created_at DESC LIMIT ?`,
);

const insertEntry = db.prepare(
  `INSERT INTO entries (id, content, created_at, updated_at)
   VALUES (?, ?, ?, ?)`,
);

const updateEntryById = db.prepare(
  `UPDATE entries SET content = ?, updated_at = ? WHERE id = ?`,
);

const deleteEntryById = db.prepare(`DELETE FROM entries WHERE id = ?`);

export const listEntries = (cursor: string | null, limit: number): EntryPage => {
  const rows = (
    cursor ? selectPageAfter.all(cursor, limit + 1) : selectFirstPage.all(limit + 1)
  ) as EntrySummary[];
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const nextCursor = rows.length > limit && last ? last.createdAt : null;
  return { items, nextCursor };
};

export const getEntry = (id: string): Entry | null =>
  (selectEntry.get(id) as Entry | undefined) ?? null;

export const createEntry = ({ content }: EntryInput): Entry => {
  const id = randomUUIDv7();
  const now = new Date().toISOString();
  insertEntry.run(id, content, now, now);
  return getEntry(id)!;
};

export const updateEntry = (id: string, { content }: EntryInput): Entry | null => {
  const now = new Date().toISOString();
  const { changes } = updateEntryById.run(content, now, id);
  return changes === 0 ? null : getEntry(id);
};

export const deleteEntry = (id: string): boolean => {
  const { changes } = deleteEntryById.run(id);
  return changes > 0;
};
