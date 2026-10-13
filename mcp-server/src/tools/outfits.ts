import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { validateOutfit } from "../domain/outfitRules.js";
import { SituationSchema, type Outfit } from "../domain/types.js";
import { outfitWithPhotoUrls } from "../services/wardrobe.js";
import { brief, fail, ok, type ToolContext } from "./shared.js";

const view = (o: Outfit) => ({ ...o, items: o.items.map(brief) });

export function registerOutfitTools(server: McpServer, { repo, images, userId }: ToolContext) {
  server.registerTool(
    "save_outfit",
    {
      title: "Сохранить образ",
      description:
        "Сохраняет образ из вещей гардероба (по их id). Сервер проверяет, что вещи существуют, " +
        "не повторяются по категориям и что есть основа: платье или верх + низ. " +
        "При ошибке исправь подборку и вызови снова.",
      inputSchema: {
        name: z.string().trim().min(1).max(40).describe("Короткое название в 2–3 слова, например «Дождливый вторник»"),
        situation: SituationSchema,
        itemIds: z.array(z.string()).min(2).max(8),
        comment: z
          .string()
          .max(200)
          .optional()
          .describe("1–2 коротких предложения: почему образ подходит к ситуации и погоде"),
      },
    },
    async (input) => {
      const found = repo.getItems(userId, input.itemIds);
      const problems = validateOutfit(input.itemIds, found);
      if (problems.length) return fail(`Образ не сохранён:\n- ${problems.join("\n- ")}`);
      return ok(view(repo.saveOutfit(userId, input)));
    },
  );

  server.registerTool(
    "list_saved_outfits",
    {
      title: "Сохранённые образы",
      description: "Сохранённые образы пользователя, новые сверху.",
      inputSchema: { situation: SituationSchema.optional() },
      annotations: { readOnlyHint: true },
    },
    async ({ situation }) => {
      const outfits = repo.listOutfits(userId, situation);
      return ok({ count: outfits.length, outfits: outfits.map(view) });
    },
  );

  server.registerTool(
    "get_outfit",
    {
      title: "Образ",
      description: "Образ целиком, с фото вещей.",
      inputSchema: { id: z.string() },
      annotations: { readOnlyHint: true },
    },
    async ({ id }) => {
      const outfit = repo.getOutfit(userId, id);
      return outfit ? ok(outfitWithPhotoUrls(images, outfit)) : fail(`Образ ${id} не найден.`);
    },
  );

  server.registerTool(
    "delete_outfit",
    {
      title: "Удалить образ",
      description: "Удаляет сохранённый образ. Сами вещи остаются в гардеробе.",
      inputSchema: { id: z.string() },
      annotations: { destructiveHint: true },
    },
    async ({ id }) => (repo.deleteOutfit(userId, id) ? ok({ deleted: id }) : fail(`Образ ${id} не найден.`)),
  );
}
