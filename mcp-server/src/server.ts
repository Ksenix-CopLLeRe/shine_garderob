import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCreateOutfitPrompt } from "./prompts/createOutfit.js";
import { registerOutfitTools } from "./tools/outfits.js";
import { registerProfileTools } from "./tools/profile.js";
import type { ToolContext } from "./tools/shared.js";
import { registerWardrobeTools } from "./tools/wardrobe.js";

/** Builds a transport-agnostic MCP server bound to one user's wardrobe. */
export function createServer(ctx: ToolContext): McpServer {
  const server = new McpServer(
    { name: "shine", version: "0.1.0" },
    {
      instructions:
        "Shine — сервис гардероба. Через эти инструменты ты видишь вещи пользователя и можешь собирать из них образы. " +
        "Предлагай только вещи, которые есть в гардеробе (list_wardrobe_items), и ссылайся на них по id при сохранении. " +
        "Тексты показываются в мобильном приложении: названия — 2–3 слова, комментарии — 1–2 коротких предложения.",
    },
  );
  registerWardrobeTools(server, ctx);
  registerOutfitTools(server, ctx);
  registerProfileTools(server, ctx);
  registerCreateOutfitPrompt(server);
  return server;
}
