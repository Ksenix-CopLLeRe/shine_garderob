import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { WardrobeItem } from "../domain/types.js";
import type { ImageStorage } from "../storage/images.js";
import type { WardrobeRepository } from "../storage/repository.js";

export interface ToolContext {
  repo: WardrobeRepository;
  images: ImageStorage;
  userId: string;
}

export const ok = (data: unknown): CallToolResult => ({
  content: [{ type: "text", text: JSON.stringify(data) }],
});

export const fail = (message: string): CallToolResult => ({
  content: [{ type: "text", text: message }],
  isError: true,
});

// Compact view for lists: drops photo URLs and timestamps to save tokens.
export const brief = ({ id, name, category, colors, seasons, styles, formality }: WardrobeItem) => ({
  id,
  name,
  category,
  colors,
  seasons,
  styles,
  formality,
});
