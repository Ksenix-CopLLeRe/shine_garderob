import { IMGS } from "@/constants/images";

// Style directions the user can pick.
export const STYLE_OPTIONS = [
  "Минимализм",
  "Классика",
  "Кэжуал",
  "Деловой",
  "Спортивный",
  "Уличный стиль",
  "Романтический",
  "Авангард",
];

// Mood image per style direction.
export const STYLE_MOOD_IMAGES: Record<string, string> = {
  Минимализм: IMGS.editorialBlackJacket,
  Классика: IMGS.editorialBlazer,
  Кэжуал: IMGS.itemBlackJeans,
  Деловой: IMGS.itemGraySuit,
  Спортивный: IMGS.itemJeansDetail,
  "Уличный стиль": IMGS.editorialBWCoat,
  Романтический: IMGS.editorialFieldDress,
  Авангард: IMGS.editorialDarkCoat,
};
