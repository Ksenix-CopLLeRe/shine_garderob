import { IMGS } from "@/constants/images";

// Saved outfits (mock).
export const SAVED_OUTFITS = [
  {
    n: "Дождливый вторник",
    s: "Учёба",
    d: "10 сентября",
    img: IMGS.editorialBlazer,
    big: true,
  },
  {
    n: "Офисный день",
    s: "Работа",
    d: "8 сентября",
    img: IMGS.editorialBlackJacket,
    big: false,
  },
  {
    n: "Вечерняя прогулка",
    s: "Повседневный",
    d: "5 сентября",
    img: IMGS.editorialFieldDress,
    big: false,
  },
  {
    n: "Тёплый минимализм",
    s: "Учёба",
    d: "1 сентября",
    img: IMGS.editorialBWCoat,
    big: false,
  },
];

// Pieces of the outfit shown on the detail screen.
export const OUTFIT_PIECES = [
  { n: "Бежевый тренч", img: IMGS.itemCoat },
  { n: "Белая рубашка", img: IMGS.itemWhiteShirt },
  { n: "Прямые джинсы", img: IMGS.itemBlackJeans },
  { n: "Лоферы", img: IMGS.itemLoafers },
  { n: "Кожаная сумка", img: IMGS.itemBlackBag },
];

// Alternatives offered when replacing an outfit item.
export const REPLACEMENT_OPTIONS = [
  { n: "Чёрный жакет", img: IMGS.itemBlackPeacoat },
  { n: "Серый жакет", img: IMGS.itemGraySuit },
  { n: "Коричневая рубашка", img: IMGS.itemBrownShirt },
  { n: "Бежевый тренч", img: IMGS.itemCoat },
];
