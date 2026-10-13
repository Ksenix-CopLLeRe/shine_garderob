import { z } from "zod";
import { CATEGORIES, SEASONS, SITUATION_IDS, STYLES } from "./catalog.js";

export const CategorySchema = z.enum(CATEGORIES);
export const SeasonSchema = z.enum(SEASONS);
export const StyleSchema = z.enum(STYLES);
export const SituationSchema = z.enum(SITUATION_IDS);

export type Category = z.infer<typeof CategorySchema>;
export type Season = z.infer<typeof SeasonSchema>;
export type Style = z.infer<typeof StyleSchema>;
export type Situation = z.infer<typeof SituationSchema>;

// Fields a client may set on a wardrobe item.
export const ItemInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(40)
    .describe("Короткое название в 2–3 слова: «Бежевый тренч», «Чёрные сапоги». Детали — в атрибутах, не в названии"),
  category: CategorySchema,
  colors: z.array(z.string().trim().min(1).max(30)).min(1).max(5).describe("Основные цвета"),
  seasons: z.array(SeasonSchema).min(1).describe("Сезоны, в которые вещь уместна"),
  styles: z.array(StyleSchema).min(1).describe("Стилевые направления"),
  formality: z
    .number()
    .int()
    .min(1)
    .max(5)
    .describe("Формальность: 1 — спорт/дом, 3 — повседневно, 5 — строгий дресс-код"),
  // In storage this holds an external URL or a photo storage key (see storage/images.ts).
  imageUrl: z.string().url().optional().describe("Ссылка на фото вещи"),
});

export type ItemInput = z.infer<typeof ItemInputSchema>;

export interface WardrobeItem extends ItemInput {
  id: string;
  createdAt: string;
}

export interface ItemFilter {
  category?: Category;
  season?: Season;
  style?: Style;
  color?: string;
}

export interface OutfitInput {
  name: string;
  situation: Situation;
  itemIds: string[];
  comment?: string;
}

export interface OutfitSummary {
  id: string;
  name: string;
  situation: Situation;
}

export interface Outfit extends Omit<OutfitInput, "itemIds"> {
  id: string;
  items: WardrobeItem[];
  createdAt: string;
}
