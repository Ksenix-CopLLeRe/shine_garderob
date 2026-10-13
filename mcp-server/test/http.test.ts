import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createHttpHandler } from "../src/http/handler.js";
import { seed } from "../src/storage/seed.js";
import { SqliteRepository } from "../src/storage/sqlite.js";

let repo: SqliteRepository;
let server: Server;
let base: string;
let tmp: string;

beforeEach(async () => {
  repo = new SqliteRepository(":memory:");
  seed(repo, "demo");
  seed(repo, "other");
  tmp = mkdtempSync(join(tmpdir(), "shine-http-"));
  mkdirSync(join(tmp, "images", "demo"), { recursive: true });
  writeFileSync(join(tmp, "images", "demo", "a.png"), "png-bytes");
  writeFileSync(join(tmp, "secret.png"), "secret");
  server = createServer(createHttpHandler({ repo, imagesDir: join(tmp, "images"), userId: "demo" }));
  await new Promise<void>((r) => server.listen(0, r));
  base = `http://localhost:${(server.address() as AddressInfo).port}`;
});

afterEach(async () => {
  await new Promise((r) => server.close(r));
  repo.close();
  rmSync(tmp, { recursive: true, force: true });
});

const idOf = (name: string) => repo.listItems("demo").find((i) => i.name === name)!.id;
const addPhotoItem = () =>
  repo.addItem("demo", {
    name: "Свитер",
    category: "Верх",
    colors: ["синий"],
    seasons: ["зима"],
    styles: ["Кэжуал"],
    formality: 2,
    imageUrl: "demo/a.png",
  });

describe("HTTP API", () => {
  it("serves the user's items with CORS and root-relative photo URLs", async () => {
    addPhotoItem();
    const res = await fetch(`${base}/api/items`);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
    const { items } = await res.json();
    expect(items.find((i: { name: string }) => i.name === "Свитер").imageUrl).toBe("/images/demo/a.png");
    expect(items.find((i: { name: string }) => i.name === "Лоферы").imageUrl).toMatch(/^https:\/\/images\.unsplash/);

    const shoes = await (await fetch(`${base}/api/items?category=Обувь`)).json();
    expect(shoes.items.map((i: { name: string }) => i.name)).toEqual(["Лоферы", "Коричневые туфли"]);
  });

  it("serves an item with the outfits that use it", async () => {
    const shirt = idOf("Белая рубашка");
    const outfit = repo.saveOutfit("demo", { name: "Тест", situation: "study", itemIds: [shirt, idOf("Прямые джинсы")] });
    const body = await (await fetch(`${base}/api/items/${shirt}`)).json();
    expect(body.item.name).toBe("Белая рубашка");
    expect(body.outfits).toEqual([{ id: outfit.id, name: "Тест", situation: "study" }]);
    expect((await fetch(`${base}/api/items/missing`)).status).toBe(404);
    // Another user's item is invisible.
    const foreign = repo.listItems("other")[0]!.id;
    expect((await fetch(`${base}/api/items/${foreign}`)).status).toBe(404);
  });

  it("serves outfits", async () => {
    const saved = repo.saveOutfit("demo", { name: "Тест", situation: "study", itemIds: [idOf("Белая рубашка"), idOf("Прямые джинсы")] });
    const { outfits } = await (await fetch(`${base}/api/outfits`)).json();
    expect(outfits).toHaveLength(1);
    expect((await (await fetch(`${base}/api/outfits/${saved.id}`)).json()).items).toHaveLength(2);
    expect((await fetch(`${base}/api/outfits/missing`)).status).toBe(404);
  });

  it("deletes items with their photo, and outfits", async () => {
    const item = addPhotoItem();
    const res = await fetch(`${base}/api/items/${item.id}`, { method: "DELETE" });
    expect(res.status).toBe(200);
    expect(existsSync(join(tmp, "images", "demo", "a.png"))).toBe(false);
    expect(repo.getItems("demo", [item.id])).toEqual([]);
    expect((await fetch(`${base}/api/items/${item.id}`, { method: "DELETE" })).status).toBe(404);

    const outfit = repo.saveOutfit("demo", { name: "Тест", situation: "study", itemIds: [idOf("Белая рубашка"), idOf("Прямые джинсы")] });
    expect((await fetch(`${base}/api/outfits/${outfit.id}`, { method: "DELETE" })).status).toBe(200);
    expect(repo.getOutfit("demo", outfit.id)).toBeUndefined();
  });

  it("serves photos but blocks path traversal and other methods", async () => {
    const img = await fetch(`${base}/images/demo/a.png`);
    expect(img.headers.get("content-type")).toBe("image/png");
    expect(await img.text()).toBe("png-bytes");
    expect((await fetch(`${base}/images/..%2Fsecret.png`)).status).toBe(404);
    expect((await fetch(`${base}/api/items`, { method: "POST" })).status).toBe(405);
    expect((await fetch(`${base}/api/items`, { method: "OPTIONS" })).headers.get("access-control-allow-methods")).toContain("DELETE");
  });
});
