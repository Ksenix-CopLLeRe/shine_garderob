import { IMGS } from "@/constants/images";

// Filter tabs on the wardrobe screen.
export const WARDROBE_CATEGORIES = [
  "Все",
  "Верх",
  "Низ",
  "Платья",
  "Верхняя одежда",
  "Обувь",
  "Аксессуары",
];

// User's wardrobe (mock).
export const WARDROBE_ITEMS = [
  { n: "Белая рубашка", img: IMGS.itemWhiteShirt },
  { n: "Прямые джинсы", img: IMGS.itemBlackJeans },
  { n: "Бежевый тренч", img: IMGS.itemCoat },
  { n: "Лоферы", img: IMGS.itemLoafers },
  { n: "Кожаная сумка", img: IMGS.itemBlackBag },
  { n: "Чёрный жакет", img: IMGS.itemBlackPeacoat },
  { n: "Серый жакет", img: IMGS.itemGraySuit },
  { n: "Коричневые туфли", img: IMGS.itemBrownShoes },
  { n: "Шёлковый шарф", img: IMGS.itemBeltDetail },
];

// Sample wardrobe for users without their own items.
export const TEMPLATE_WARDROBE = [
  { l: "Верх", s: "Белая рубашка", img: IMGS.itemWhiteShirt, span: true },
  { l: "Низ", s: "Прямые джинсы", img: IMGS.itemBlackJeans, span: false },
  {
    l: "Верхняя одежда",
    s: "Бежевый тренч",
    img: IMGS.itemCoat,
    span: false,
  },
  { l: "Обувь", s: "Лоферы", img: IMGS.itemLoafers, span: false },
  { l: "Аксессуар", s: "Кожаная сумка", img: IMGS.itemBlackBag, span: false },
];
