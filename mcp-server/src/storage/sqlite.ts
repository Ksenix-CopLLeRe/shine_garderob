import Database from "better-sqlite3";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type {
  ItemFilter,
  ItemInput,
  Outfit,
  OutfitInput,
  OutfitSummary,
  Situation,
  Style,
  WardrobeItem,
} from "../domain/types.js";
import type { WardrobeRepository } from "./repository.js";

// Ordered, append-only schema migrations. The index + 1 is stored in user_version.
const MIGRATIONS = [
  `
  CREATE TABLE items (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    colors      TEXT NOT NULL,  -- JSON array
    seasons     TEXT NOT NULL,  -- JSON array
    styles      TEXT NOT NULL,  -- JSON array
    formality   INTEGER NOT NULL CHECK (formality BETWEEN 1 AND 5),
    image_url   TEXT,
    created_at  TEXT NOT NULL
  );
  CREATE INDEX items_user ON items (user_id, category);

  CREATE TABLE style_profiles (
    user_id  TEXT PRIMARY KEY,
    styles   TEXT NOT NULL  -- JSON array
  );

  CREATE TABLE outfits (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    name        TEXT NOT NULL,
    situation   TEXT NOT NULL,
    comment     TEXT,
    created_at  TEXT NOT NULL
  );
  CREATE INDEX outfits_user ON outfits (user_id, created_at);

  CREATE TABLE outfit_items (
    outfit_id  TEXT NOT NULL REFERENCES outfits (id) ON DELETE CASCADE,
    item_id    TEXT NOT NULL REFERENCES items (id) ON DELETE CASCADE,
    position   INTEGER NOT NULL,
    PRIMARY KEY (outfit_id, item_id)
  );
  `,
  // Uploaded photos were stored as absolute localhost URLs; keep only the storage key.
  `
  UPDATE items
  SET image_url = substr(image_url, instr(image_url, '/images/') + length('/images/'))
  WHERE image_url LIKE 'http://localhost:%/images/%' OR image_url LIKE 'http://127.0.0.1:%/images/%';
  `,
];

interface ItemRow {
  id: string;
  name: string;
  category: string;
  colors: string;
  seasons: string;
  styles: string;
  formality: number;
  image_url: string | null;
  created_at: string;
}

interface OutfitRow {
  id: string;
  name: string;
  situation: string;
  comment: string | null;
  created_at: string;
}

const toItem = (r: ItemRow): WardrobeItem => ({
  id: r.id,
  name: r.name,
  category: r.category as WardrobeItem["category"],
  colors: JSON.parse(r.colors),
  seasons: JSON.parse(r.seasons),
  styles: JSON.parse(r.styles),
  formality: r.formality,
  ...(r.image_url ? { imageUrl: r.image_url } : {}),
  createdAt: r.created_at,
});

export class SqliteRepository implements WardrobeRepository {
  private db: Database.Database;

  constructor(path: string) {
    if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
    this.db = new Database(path);
    this.db.pragma("journal_mode = WAL");
    this.db.pragma("foreign_keys = ON");
    this.migrate();
  }

  private migrate() {
    const current = this.db.pragma("user_version", { simple: true }) as number;
    for (let v = current; v < MIGRATIONS.length; v++) {
      this.db.transaction(() => {
        this.db.exec(MIGRATIONS[v]!);
        this.db.pragma(`user_version = ${v + 1}`);
      })();
    }
  }

  listItems(userId: string, filter: ItemFilter = {}): WardrobeItem[] {
    const rows = this.db
      .prepare("SELECT * FROM items WHERE user_id = ? AND (? IS NULL OR category = ?) ORDER BY created_at, rowid")
      .all(userId, filter.category ?? null, filter.category ?? null) as ItemRow[];
    const color = filter.color?.toLowerCase();
    return rows
      .map(toItem)
      .filter((i) => !filter.season || i.seasons.includes(filter.season))
      .filter((i) => !filter.style || i.styles.includes(filter.style))
      .filter((i) => !color || i.colors.some((c) => c.toLowerCase().includes(color)));
  }

  getItems(userId: string, ids: string[]): WardrobeItem[] {
    if (!ids.length) return [];
    const placeholders = ids.map(() => "?").join(",");
    const rows = this.db
      .prepare(`SELECT * FROM items WHERE user_id = ? AND id IN (${placeholders})`)
      .all(userId, ...ids) as ItemRow[];
    return rows.map(toItem);
  }

  addItem(userId: string, input: ItemInput): WardrobeItem {
    const item: WardrobeItem = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    this.db
      .prepare(
        `INSERT INTO items (id, user_id, name, category, colors, seasons, styles, formality, image_url, created_at)
         VALUES (@id, @userId, @name, @category, @colors, @seasons, @styles, @formality, @imageUrl, @createdAt)`,
      )
      .run({
        ...item,
        userId,
        colors: JSON.stringify(item.colors),
        seasons: JSON.stringify(item.seasons),
        styles: JSON.stringify(item.styles),
        imageUrl: item.imageUrl ?? null,
      });
    return item;
  }

  updateItem(userId: string, id: string, patch: Partial<ItemInput>): WardrobeItem | undefined {
    const [existing] = this.getItems(userId, [id]);
    if (!existing) return undefined;
    const next = { ...existing, ...patch };
    this.db
      .prepare(
        `UPDATE items SET name = @name, category = @category, colors = @colors, seasons = @seasons,
           styles = @styles, formality = @formality, image_url = @imageUrl
         WHERE id = @id AND user_id = @userId`,
      )
      .run({
        id,
        userId,
        name: next.name,
        category: next.category,
        colors: JSON.stringify(next.colors),
        seasons: JSON.stringify(next.seasons),
        styles: JSON.stringify(next.styles),
        formality: next.formality,
        imageUrl: next.imageUrl ?? null,
      });
    return next;
  }

  removeItem(userId: string, id: string): boolean {
    return this.db.prepare("DELETE FROM items WHERE id = ? AND user_id = ?").run(id, userId).changes > 0;
  }

  listOutfitsWithItem(userId: string, itemId: string): OutfitSummary[] {
    return this.db
      .prepare(
        `SELECT o.id, o.name, o.situation FROM outfits o JOIN outfit_items oi ON oi.outfit_id = o.id
         WHERE o.user_id = ? AND oi.item_id = ? ORDER BY o.created_at DESC, o.rowid DESC`,
      )
      .all(userId, itemId) as OutfitSummary[];
  }

  getStyleProfile(userId: string): Style[] {
    const row = this.db.prepare("SELECT styles FROM style_profiles WHERE user_id = ?").get(userId) as
      | { styles: string }
      | undefined;
    return row ? JSON.parse(row.styles) : [];
  }

  setStyleProfile(userId: string, styles: Style[]): Style[] {
    const unique = [...new Set(styles)];
    this.db
      .prepare(
        `INSERT INTO style_profiles (user_id, styles) VALUES (?, ?)
         ON CONFLICT (user_id) DO UPDATE SET styles = excluded.styles`,
      )
      .run(userId, JSON.stringify(unique));
    return unique;
  }

  saveOutfit(userId: string, input: OutfitInput): Outfit {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    this.db.transaction(() => {
      this.db
        .prepare("INSERT INTO outfits (id, user_id, name, situation, comment, created_at) VALUES (?, ?, ?, ?, ?, ?)")
        .run(id, userId, input.name, input.situation, input.comment ?? null, createdAt);
      const link = this.db.prepare("INSERT INTO outfit_items (outfit_id, item_id, position) VALUES (?, ?, ?)");
      input.itemIds.forEach((itemId, position) => link.run(id, itemId, position));
    })();
    return this.getOutfit(userId, id)!;
  }

  listOutfits(userId: string, situation?: Situation): Outfit[] {
    const rows = this.db
      .prepare(
        "SELECT * FROM outfits WHERE user_id = ? AND (? IS NULL OR situation = ?) ORDER BY created_at DESC, rowid DESC",
      )
      .all(userId, situation ?? null, situation ?? null) as OutfitRow[];
    return rows.map((r) => this.hydrateOutfit(r));
  }

  getOutfit(userId: string, id: string): Outfit | undefined {
    const row = this.db.prepare("SELECT * FROM outfits WHERE id = ? AND user_id = ?").get(id, userId) as
      | OutfitRow
      | undefined;
    return row && this.hydrateOutfit(row);
  }

  deleteOutfit(userId: string, id: string): boolean {
    return this.db.prepare("DELETE FROM outfits WHERE id = ? AND user_id = ?").run(id, userId).changes > 0;
  }

  close() {
    this.db.close();
  }

  private hydrateOutfit(r: OutfitRow): Outfit {
    const items = (
      this.db
        .prepare(
          `SELECT i.* FROM outfit_items oi JOIN items i ON i.id = oi.item_id
           WHERE oi.outfit_id = ? ORDER BY oi.position`,
        )
        .all(r.id) as ItemRow[]
    ).map(toItem);
    return {
      id: r.id,
      name: r.name,
      situation: r.situation as Situation,
      ...(r.comment ? { comment: r.comment } : {}),
      items,
      createdAt: r.created_at,
    };
  }
}
