import { pathToFileURL } from "node:url";
import { config } from "../config.js";
import type { ItemInput, Style } from "../domain/types.js";
import type { WardrobeRepository } from "./repository.js";
import { SqliteRepository } from "./sqlite.js";

// Same Unsplash photos as src/constants/images.ts in the app.
const U = (id: string, w = 400, h = 520) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

// Demo wardrobe based on the app mocks (src/data/wardrobe.ts), enriched with the
// attributes an assistant needs to compose outfits.
export const DEMO_ITEMS: ItemInput[] = [
  {
    name: "Белая рубашка",
    category: "Верх",
    colors: ["белый"],
    seasons: ["весна", "лето", "осень", "зима"],
    styles: ["Классика", "Минимализм", "Деловой"],
    formality: 4,
    imageUrl: U("1612889002991-fbfaf775d231"),
  },
  {
    name: "Коричневая рубашка",
    category: "Верх",
    colors: ["коричневый"],
    seasons: ["весна", "осень"],
    styles: ["Кэжуал", "Классика"],
    formality: 3,
    imageUrl: U("1586689311267-e88bb0509995"),
  },
  {
    name: "Прямые джинсы",
    category: "Низ",
    colors: ["чёрный"],
    seasons: ["весна", "лето", "осень", "зима"],
    styles: ["Кэжуал", "Минимализм", "Уличный стиль"],
    formality: 2,
    imageUrl: U("1718252540511-e958742e4165", 400, 400),
  },
  {
    name: "Бежевый тренч",
    category: "Верхняя одежда",
    colors: ["бежевый"],
    seasons: ["весна", "осень"],
    styles: ["Классика", "Минимализм"],
    formality: 4,
    imageUrl: U("1664029593173-183fbb854642"),
  },
  {
    name: "Чёрный жакет",
    category: "Верхняя одежда",
    colors: ["чёрный"],
    seasons: ["весна", "осень", "зима"],
    styles: ["Деловой", "Минимализм", "Классика"],
    formality: 5,
    imageUrl: U("1639270601211-9265bafae0f9"),
  },
  {
    name: "Серый жакет",
    category: "Верхняя одежда",
    colors: ["серый"],
    seasons: ["весна", "осень"],
    styles: ["Деловой", "Классика"],
    formality: 5,
    imageUrl: U("1622114684497-a9820f5ebc41"),
  },
  {
    name: "Лоферы",
    category: "Обувь",
    colors: ["коричневый"],
    seasons: ["весна", "лето", "осень"],
    styles: ["Классика", "Минимализм", "Деловой"],
    formality: 4,
    imageUrl: U("1616406432452-07bc5938759d", 400, 380),
  },
  {
    name: "Коричневые туфли",
    category: "Обувь",
    colors: ["коричневый"],
    seasons: ["весна", "осень", "зима"],
    styles: ["Классика", "Деловой"],
    formality: 5,
    imageUrl: U("1675947258177-aa8120ddefa3", 400, 380),
  },
  {
    name: "Кожаная сумка",
    category: "Аксессуары",
    colors: ["чёрный"],
    seasons: ["весна", "лето", "осень", "зима"],
    styles: ["Классика", "Минимализм", "Деловой"],
    formality: 4,
    imageUrl: U("1758542988969-39a10168b2ce", 400, 440),
  },
  {
    name: "Шёлковый шарф",
    category: "Аксессуары",
    colors: ["бежевый", "коричневый"],
    seasons: ["весна", "осень"],
    styles: ["Романтический", "Классика"],
    formality: 3,
    imageUrl: U("1755214832310-074c4cc45372", 400, 400),
  },
];

export const DEMO_STYLES: Style[] = ["Минимализм", "Классика"];

/** Fills an empty wardrobe with demo data. Returns the number of items added. */
export function seed(repo: WardrobeRepository, userId: string): number {
  if (repo.listItems(userId).length) return 0;
  DEMO_ITEMS.forEach((item) => repo.addItem(userId, item));
  repo.setStyleProfile(userId, DEMO_STYLES);
  return DEMO_ITEMS.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const repo = new SqliteRepository(config.dbPath);
  const added = seed(repo, config.userId);
  repo.close();
  console.error(
    added
      ? `Добавлено ${added} вещей для пользователя "${config.userId}" в ${config.dbPath}`
      : `Гардероб пользователя "${config.userId}" уже заполнен, пропускаю.`,
  );
}
