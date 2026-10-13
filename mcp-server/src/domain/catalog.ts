// Reference values shared with the app. Keep in sync with src/data/wardrobe.ts,
// src/data/situations.ts and src/data/styles.ts in the frontend.

export const CATEGORIES = [
  "Верх",
  "Низ",
  "Платья",
  "Верхняя одежда",
  "Обувь",
  "Аксессуары",
] as const;

export const SEASONS = ["зима", "весна", "лето", "осень"] as const;

export const SITUATIONS = [
  { id: "work", label: "Работа", hint: "Деловая встреча, офис" },
  { id: "study", label: "Учёба", hint: "Университет, занятия" },
  { id: "date", label: "Свидание", hint: "Вечер, особый повод" },
  { id: "sport", label: "Спорт", hint: "Тренировка, активность" },
  { id: "casual", label: "Повседневный", hint: "Прогулка, встреча с друзьями" },
] as const;

export const STYLES = [
  "Минимализм",
  "Классика",
  "Кэжуал",
  "Деловой",
  "Спортивный",
  "Уличный стиль",
  "Романтический",
  "Авангард",
] as const;

export const SITUATION_IDS = SITUATIONS.map((s) => s.id) as [
  (typeof SITUATIONS)[number]["id"],
  ...(typeof SITUATIONS)[number]["id"][],
];
