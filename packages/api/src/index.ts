import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { decodeCursor } from "./cursor";
import { createEntry, getEntry, listEntries, updateEntry } from "./db";
import { parseEntryInput } from "./parse-entry-input";

const PORT = 8787;
const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

const app = new Hono();

app.get("/api/entries", (c) => {
  const rawCursor = c.req.query("cursor");
  const cursor = rawCursor ? decodeCursor(rawCursor) : null;
  if (rawCursor && !cursor) return c.json({ error: "Invalid cursor" }, 400);

  const rawLimit = Number(c.req.query("limit") ?? DEFAULT_LIMIT);
  const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;

  return c.json(listEntries(cursor, limit));
});

app.get("/api/entries/:id", (c) => {
  const entry = getEntry(Number(c.req.param("id")));
  return entry ? c.json(entry) : c.json({ error: "Not found" }, 404);
});

app.post("/api/entries", async (c) => {
  const input = parseEntryInput(await c.req.json());
  if (!input) return c.json({ error: "Invalid entry" }, 400);
  return c.json(createEntry(input), 201);
});

app.put("/api/entries/:id", async (c) => {
  const input = parseEntryInput(await c.req.json());
  if (!input) return c.json({ error: "Invalid entry" }, 400);
  const entry = updateEntry(Number(c.req.param("id")), input);
  return entry ? c.json(entry) : c.json({ error: "Not found" }, 404);
});

serve({ fetch: app.fetch, port: PORT }, ({ port }) => {
  console.log(`API listening on http://localhost:${port}`);
});
