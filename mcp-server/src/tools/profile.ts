import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CATEGORIES, SEASONS, SITUATIONS, STYLES } from "../domain/catalog.js";
import { StyleSchema } from "../domain/types.js";
import { ok, type ToolContext } from "./shared.js";

export function registerProfileTools(server: McpServer, { repo, userId }: ToolContext) {
  server.registerTool(
    "get_catalog",
    {
      title: "Справочник",
      description: "Допустимые категории вещей, сезоны, ситуации и стили — те же, что в приложении Shine.",
      annotations: { readOnlyHint: true },
    },
    async () => ok({ categories: CATEGORIES, seasons: SEASONS, situations: SITUATIONS, styles: STYLES }),
  );

  server.registerTool(
    "get_style_profile",
    {
      title: "Стиль пользователя",
      description: "Любимые стилевые направления пользователя. Учитывай их при подборе образа.",
      annotations: { readOnlyHint: true },
    },
    async () => ok({ styles: repo.getStyleProfile(userId) }),
  );

  server.registerTool(
    "set_style_profile",
    {
      title: "Изменить стиль",
      description: "Заменяет список любимых стилей пользователя.",
      inputSchema: { styles: z.array(StyleSchema).min(1).max(STYLES.length) },
      annotations: { idempotentHint: true },
    },
    async ({ styles }) => ok({ styles: repo.setStyleProfile(userId, styles) }),
  );
}
