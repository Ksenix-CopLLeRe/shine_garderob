import Database from "better-sqlite3";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { validateOutfit } from "../src/domain/outfitRules.js";
import { seed } from "../src/storage/seed.js";
import { SqliteRepository } from "../src/storage/sqlite.js";

let repo: SqliteRepository;
beforeEach(() => {
  repo = new SqliteRepository(":memory:");
});
afterEach(() => repo.close());

const byName = (userId: string, name: string) => repo.listItems(userId).find((i) => i.name === name)!;

describe("SqliteRepository", () => {
  it("seeds once and keeps users isolated", () => {
    expect(seed(repo, "alice")).toBeGreaterThan(0);
    expect(seed(repo, "alice")).toBe(0);
    expect(repo.listItems("bob")).toEqual([]);
    expect(repo.getItems("bob", [byName("alice", "Лоферы").id])).toEqual([]);
  });

  it("filters items by category, season, style and color", () => {
    seed(repo, "u");
    expect(repo.listItems("u", { category: "Обувь" }).map((i) => i.name)).toEqual(["Лоферы", "Коричневые туфли"]);
    expect(repo.listItems("u", { season: "лето" }).every((i) => i.seasons.includes("лето"))).toBe(true);
    expect(repo.listItems("u", { style: "Романтический" }).map((i) => i.name)).toEqual(["Шёлковый шарф"]);
    expect(repo.listItems("u", { color: "беж" }).map((i) => i.name)).toEqual(["Бежевый тренч", "Шёлковый шарф"]);
  });

  it("updates and removes items", () => {
    seed(repo, "u");
    const shirt = byName("u", "Белая рубашка");
    expect(repo.updateItem("u", shirt.id, { formality: 2 })?.formality).toBe(2);
    expect(repo.updateItem("other", shirt.id, { formality: 1 })).toBeUndefined();
    expect(repo.removeItem("u", shirt.id)).toBe(true);
    expect(repo.removeItem("u", shirt.id)).toBe(false);
  });

  it("saves outfits with ordered items and cascades item removal", () => {
    seed(repo, "u");
    const ids = ["Белая рубашка", "Прямые джинсы", "Лоферы"].map((n) => byName("u", n).id);
    const outfit = repo.saveOutfit("u", { name: "Учёба", situation: "study", itemIds: ids });
    expect(outfit.items.map((i) => i.id)).toEqual(ids);
    expect(repo.listOutfits("u", "work")).toEqual([]);
    expect(repo.listOutfits("u", "study")).toHaveLength(1);

    repo.removeItem("u", ids[2]!);
    expect(repo.getOutfit("u", outfit.id)?.items).toHaveLength(2);
    expect(repo.deleteOutfit("u", outfit.id)).toBe(true);
    expect(repo.getOutfit("u", outfit.id)).toBeUndefined();
  });

  it("lists outfits that use an item", () => {
    seed(repo, "u");
    const ids = ["Белая рубашка", "Прямые джинсы"].map((n) => byName("u", n).id);
    const outfit = repo.saveOutfit("u", { name: "Учёба", situation: "study", itemIds: ids });
    expect(repo.listOutfitsWithItem("u", ids[0]!)).toEqual([{ id: outfit.id, name: "Учёба", situation: "study" }]);
    expect(repo.listOutfitsWithItem("u", byName("u", "Лоферы").id)).toEqual([]);
    expect(repo.listOutfitsWithItem("other", ids[0]!)).toEqual([]);
  });

  it("stores a deduplicated style profile", () => {
    expect(repo.getStyleProfile("u")).toEqual([]);
    expect(repo.setStyleProfile("u", ["Кэжуал", "Кэжуал", "Деловой"])).toEqual(["Кэжуал", "Деловой"]);
    expect(repo.getStyleProfile("u")).toEqual(["Кэжуал", "Деловой"]);
  });
});

describe("validateOutfit", () => {
  beforeEach(() => seed(repo, "u"));
  const check = (names: string[], extraIds: string[] = []) => {
    const ids = [...names.map((n) => byName("u", n).id), ...extraIds];
    return validateOutfit(ids, repo.getItems("u", ids));
  };

  it("accepts top + bottom + shoes + accessories", () => {
    expect(check(["Белая рубашка", "Прямые джинсы", "Лоферы", "Кожаная сумка", "Шёлковый шарф"])).toEqual([]);
  });

  it("rejects missing base, duplicate categories and unknown ids", () => {
    expect(check(["Белая рубашка", "Лоферы"])).toContain("Нужна основа образа: платье или верх + низ.");
    expect(check(["Белая рубашка", "Прямые джинсы", "Лоферы", "Коричневые туфли"])).toContain(
      "Больше одной вещи в категории «Обувь».",
    );
    expect(check(["Белая рубашка", "Прямые джинсы"], ["nope"]).join()).toContain("nope");
  });
});

describe("migrations", () => {
  it("rewrites absolute localhost photo URLs into storage keys", () => {
    const dir = mkdtempSync(join(tmpdir(), "shine-mig-"));
    const path = join(dir, "db.sqlite");
    new SqliteRepository(path).close();
    const raw = new Database(path);
    raw.pragma("user_version = 1");
    const insert = raw.prepare(
      `INSERT INTO items VALUES (?, 'u', 'x', 'Верх', '["a"]', '["лето"]', '["Кэжуал"]', 2, ?, '2026-01-01')`,
    );
    insert.run("local", "http://localhost:8787/images/demo/a.jpg");
    insert.run("remote", "https://images.unsplash.com/photo-1?w=1");
    raw.close();

    const migrated = new SqliteRepository(path);
    const urls = Object.fromEntries(migrated.listItems("u").map((i) => [i.id, i.imageUrl]));
    migrated.close();
    rmSync(dir, { recursive: true, force: true });
    expect(urls).toEqual({ local: "demo/a.jpg", remote: "https://images.unsplash.com/photo-1?w=1" });
  });
});
