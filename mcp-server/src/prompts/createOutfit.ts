import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SITUATIONS } from "../domain/catalog.js";

const situationList = SITUATIONS.map((s) => `${s.id} (${s.label})`).join(", ");

export function registerCreateOutfitPrompt(server: McpServer) {
  server.registerPrompt(
    "create_outfit",
    {
      title: "Собрать образ",
      description: "Подобрать образ из гардероба Shine под ситуацию и погоду.",
      argsSchema: {
        situation: z.string().describe(`Ситуация: ${situationList}`),
        weather: z.string().optional().describe("Погода, например «+10, дождь»"),
      },
    },
    ({ situation, weather }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              `Собери мне образ из моего гардероба Shine. Ситуация: ${situation}.`,
              ...(weather ? [`Погода: ${weather}.`] : []),
              "",
              "Как действовать:",
              "1. Узнай мои любимые стили через get_style_profile.",
              "2. Получи вещи через list_wardrobe_items (при необходимости с фильтром по сезону).",
              "3. Выбери вещи только из моего гардероба: основа (платье или верх + низ), обувь, по погоде верхняя одежда, по желанию аксессуары. Учитывай формальность ситуации, сочетание цветов и сезон.",
              "4. Покажи образ списком и коротко объясни выбор.",
              "5. Спроси, сохранить ли образ, и если да — вызови save_outfit.",
            ].join("\n"),
          },
        },
      ],
    }),
  );
}
