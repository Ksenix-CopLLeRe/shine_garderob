import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createServer } from "../src/server.js";
import { LocalImageStorage } from "../src/storage/images.js";
import { seed } from "../src/storage/seed.js";
import { SqliteRepository } from "../src/storage/sqlite.js";

let repo: SqliteRepository;
let client: Client;
let tmp: string;

beforeEach(async () => {
  repo = new SqliteRepository(":memory:");
  seed(repo, "demo");
  tmp = mkdtempSync(join(tmpdir(), "shine-test-"));
  const images = new LocalImageStorage(join(tmp, "images"), "http://api.test");
  const server = createServer({ repo, images, userId: "demo" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  client = new Client({ name: "test", version: "0.0.0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
});

afterEach(async () => {
  await client.close();
  repo.close();
  rmSync(tmp, { recursive: true, force: true });
});

const call = async (name: string, args: Record<string, unknown> = {}) => {
  const res = (await client.callTool({ name, arguments: args })) as CallToolResult;
  const text = res.content[0]?.type === "text" ? res.content[0].text : "";
  return { isError: !!res.isError, text, json: () => JSON.parse(text) };
};

describe("Shine MCP server", () => {
  it("exposes the wardrobe tools and the create_outfit prompt", async () => {
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(
      [
        "add_item_from_photo",
        "add_wardrobe_item",
        "delete_outfit",
        "get_catalog",
        "get_outfit",
        "get_style_profile",
        "get_wardrobe_item",
        "list_saved_outfits",
        "list_wardrobe_items",
        "remove_wardrobe_item",
        "save_outfit",
        "set_style_profile",
        "update_wardrobe_item",
      ].sort(),
    );
    expect(tools.find((t) => t.name === "delete_outfit")?.annotations?.destructiveHint).toBe(true);

    const prompt = await client.getPrompt({ name: "create_outfit", arguments: { situation: "study", weather: "+10, дождь" } });
    const text = prompt.messages[0]?.content.type === "text" ? prompt.messages[0].content.text : "";
    expect(text).toContain("+10, дождь");
  });

  it("lists items compactly with filters", async () => {
    const { count, items } = (await call("list_wardrobe_items", { category: "Обувь" })).json();
    expect(count).toBe(2);
    expect(items[0]).not.toHaveProperty("imageUrl");
  });

  it("rejects invalid input", async () => {
    const res = await call("add_wardrobe_item", { name: "Кеды", category: "Носки" });
    expect(res.isError).toBe(true);
  });

  it("composes, saves and lists an outfit", async () => {
    const { items } = (await call("list_wardrobe_items")).json();
    const id = (name: string) => items.find((i: { name: string }) => i.name === name).id;

    const bad = await call("save_outfit", { name: "x", situation: "study", itemIds: [id("Белая рубашка"), id("Лоферы")] });
    expect(bad.isError).toBe(true);
    expect(bad.text).toContain("Нужна основа образа");

    const saved = await call("save_outfit", {
      name: "Дождливый вторник",
      situation: "study",
      itemIds: [id("Белая рубашка"), id("Прямые джинсы"), id("Бежевый тренч"), id("Лоферы")],
      comment: "Тренч от дождя",
    });
    expect(saved.isError).toBe(false);

    const { outfits } = (await call("list_saved_outfits", { situation: "study" })).json();
    expect(outfits).toHaveLength(1);
    expect(outfits[0].items.map((i: { name: string }) => i.name)).toEqual([
      "Белая рубашка",
      "Прямые джинсы",
      "Бежевый тренч",
      "Лоферы",
    ]);
  });

  it("adds an item and updates the style profile", async () => {
    const added = (
      await call("add_wardrobe_item", {
        name: "Белые кеды",
        category: "Обувь",
        colors: ["белый"],
        seasons: ["лето"],
        styles: ["Кэжуал"],
        formality: 2,
      })
    ).json();
    expect((await call("get_wardrobe_item", { id: added.id })).json().name).toBe("Белые кеды");
    expect((await call("set_style_profile", { styles: ["Кэжуал"] })).json().styles).toEqual(["Кэжуал"]);
  });

  it("adds an item from a local photo", async () => {
    const photo = join(tmp, "jacket.jpg");
    writeFileSync(photo, "fake-jpeg");
    const attrs = { name: "Джинсовка", category: "Верхняя одежда", colors: ["синий"], seasons: ["весна"], styles: ["Кэжуал"], formality: 2 };

    const added = (await call("add_item_from_photo", { filePath: photo, ...attrs })).json();
    expect(added.imageUrl).toMatch(/^http:\/\/api\.test\/images\/demo\/[\w-]+\.jpg$/);
    const stored = join(tmp, "images", added.imageUrl.replace("http://api.test/images/", ""));
    expect(existsSync(stored)).toBe(true);

    expect((await call("add_item_from_photo", { filePath: join(tmp, "nope.jpg"), ...attrs })).text).toContain("Файл не найден");
    writeFileSync(join(tmp, "doc.pdf"), "x");
    expect((await call("add_item_from_photo", { filePath: join(tmp, "doc.pdf"), ...attrs })).text).toContain("не поддерживается");

    writeFileSync(join(tmp, "broken.heic"), "not-a-heic");
    expect((await call("add_item_from_photo", { filePath: join(tmp, "broken.heic"), ...attrs })).text).toMatch(/HEIC/);

    await call("remove_wardrobe_item", { id: added.id });
    expect(existsSync(stored)).toBe(false);
  });

  it("rejects long names", async () => {
    const res = await call("add_wardrobe_item", {
      name: "Чёрные высокие сапоги на тракторной подошве с пряжками",
      category: "Обувь",
      colors: ["чёрный"],
      seasons: ["осень"],
      styles: ["Кэжуал"],
      formality: 2,
    });
    expect(res.isError).toBe(true);
  });
});
