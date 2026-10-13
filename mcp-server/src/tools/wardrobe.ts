import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CategorySchema, ItemInputSchema, SeasonSchema, StyleSchema } from "../domain/types.js";
import { removeItemWithPhoto, withPhotoUrl } from "../services/wardrobe.js";
import { ImageError } from "../storage/images.js";
import { brief, fail, ok, type ToolContext } from "./shared.js";

const notFound = (id: string) => fail(`Вещь ${id} не найдена в гардеробе.`);
const SHORT_NAME = "Название — 2–3 слова, без подробностей.";

export function registerWardrobeTools(server: McpServer, { repo, images, userId }: ToolContext) {
  server.registerTool(
    "list_wardrobe_items",
    {
      title: "Гардероб",
      description:
        "Список вещей из гардероба пользователя с атрибутами (категория, цвета, сезоны, стили, формальность 1–5). " +
        "Используй перед тем, как собирать образ. Фильтры необязательны.",
      inputSchema: {
        category: CategorySchema.optional(),
        season: SeasonSchema.optional(),
        style: StyleSchema.optional(),
        color: z.string().optional().describe("Подстрока цвета, например «беж»"),
      },
      annotations: { readOnlyHint: true },
    },
    async (filter) => {
      const items = repo.listItems(userId, filter);
      return ok({ count: items.length, items: items.map(brief) });
    },
  );

  server.registerTool(
    "get_wardrobe_item",
    {
      title: "Вещь",
      description: "Полная карточка вещи, включая ссылку на фото.",
      inputSchema: { id: z.string() },
      annotations: { readOnlyHint: true },
    },
    async ({ id }) => {
      const [item] = repo.getItems(userId, [id]);
      return item ? ok(withPhotoUrl(images, item)) : notFound(id);
    },
  );

  server.registerTool(
    "add_wardrobe_item",
    {
      title: "Добавить вещь",
      description: `Добавляет новую вещь в гардероб пользователя. ${SHORT_NAME}`,
      inputSchema: ItemInputSchema.shape,
    },
    async (input) => ok(repo.addItem(userId, input)),
  );

  server.registerTool(
    "add_item_from_photo",
    {
      title: "Добавить вещь по фото",
      description:
        "Добавляет вещь в гардероб вместе с фото из локального файла (JPG, PNG, WebP или HEIC до 15 МБ). " +
        "Если пользователь приложил фото в чат, сам определи по нему категорию, цвета, сезоны, стили и формальность, " +
        `а путь к файлу спроси у пользователя. ${SHORT_NAME}`,
      inputSchema: {
        filePath: z.string().min(1).describe("Абсолютный путь к файлу, можно с ~, например ~/Downloads/jacket.jpg"),
        ...ItemInputSchema.omit({ imageUrl: true }).shape,
      },
    },
    async ({ filePath, ...input }) => {
      try {
        const key = await images.importFile(userId, filePath);
        return ok(withPhotoUrl(images, repo.addItem(userId, { ...input, imageUrl: key })));
      } catch (e) {
        if (e instanceof ImageError) return fail(e.message);
        throw e;
      }
    },
  );

  server.registerTool(
    "update_wardrobe_item",
    {
      title: "Изменить вещь",
      description: "Меняет указанные поля вещи. Не переданные поля остаются как есть.",
      inputSchema: { id: z.string(), ...ItemInputSchema.partial().shape },
      annotations: { idempotentHint: true },
    },
    async ({ id, ...patch }) => {
      const [before] = repo.getItems(userId, [id]);
      const item = repo.updateItem(userId, id, patch);
      if (!item) return notFound(id);
      // A replaced photo would otherwise stay in storage forever.
      if (patch.imageUrl && before?.imageUrl && before.imageUrl !== patch.imageUrl) await images.remove(before.imageUrl);
      return ok(withPhotoUrl(images, item));
    },
  );

  server.registerTool(
    "remove_wardrobe_item",
    {
      title: "Удалить вещь",
      description: "Удаляет вещь из гардероба. Сохранённые образы с этой вещью потеряют её.",
      inputSchema: { id: z.string() },
      annotations: { destructiveHint: true },
    },
    async ({ id }) => ((await removeItemWithPhoto(repo, images, userId, id)) ? ok({ removed: id }) : notFound(id)),
  );
}
