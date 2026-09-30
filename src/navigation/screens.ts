// Every screen of the app. Mirrors the Figma frames.

export type Screen =
  | "splash"
  | "welcome"
  | "personalize"
  | "photo-upload"
  | "ai-reaction"
  | "home-auth"
  | "situation"
  | "wardrobe-source"
  | "template-wardrobe"
  | "wardrobe-filled"
  | "wardrobe-empty"
  | "add-item"
  | "item-recognition"
  | "recognition-result"
  | "recognition-error"
  | "item-card"
  | "outfit-loading"
  | "outfit-result"
  | "outfit-adjustments"
  | "outfit-alternative"
  | "replace-item"
  | "save-success"
  | "save-guest"
  | "register"
  | "login"
  | "saved-outfits"
  | "saved-empty"
  | "outfit-detail"
  | "profile"
  | "style-prefs"
  | "settings"
  | "no-outfit"
  | "load-error"
  | "no-internet"
  | "confirm-modal"
  | "toast-demo"
  | "ui-kit";

export interface ScreenGroup {
  group: string;
  screens: { id: Screen; label: string }[];
}

// Grouped list for the dev screen navigator.
export const SCREEN_GROUPS: ScreenGroup[] = [
  {
    group: "Онбординг",
    screens: [
      { id: "splash", label: "Splash" },
      { id: "welcome", label: "Знакомство" },
      { id: "personalize", label: "Персонализация" },
      { id: "photo-upload", label: "Загрузка фото" },
      { id: "ai-reaction", label: "Реакция ИИ" },
    ],
  },
  { group: "Главная", screens: [{ id: "home-auth", label: "Главная" }] },
  {
    group: "Подбор образа",
    screens: [
      { id: "situation", label: "Ситуация" },
      { id: "wardrobe-source", label: "Источник" },
      { id: "template-wardrobe", label: "Шаблонный гардероб" },
      { id: "outfit-loading", label: "Загрузка образа" },
      { id: "outfit-result", label: "Результат" },
      { id: "outfit-adjustments", label: "Корректировка" },
      { id: "outfit-alternative", label: "Альтернатива" },
      { id: "replace-item", label: "Замена вещи" },
    ],
  },
  {
    group: "Гардероб",
    screens: [
      { id: "wardrobe-filled", label: "Заполненный" },
      { id: "wardrobe-empty", label: "Пустой" },
      { id: "add-item", label: "Добавить вещь" },
      { id: "item-recognition", label: "Распознавание" },
      { id: "recognition-result", label: "Результат" },
      { id: "recognition-error", label: "Ошибка распознавания" },
      { id: "item-card", label: "Карточка вещи" },
    ],
  },
  {
    group: "Образы",
    screens: [
      { id: "saved-outfits", label: "Сохранённые образы" },
      { id: "saved-empty", label: "Пустое состояние" },
      { id: "outfit-detail", label: "Детали образа" },
    ],
  },
  {
    group: "Аккаунт",
    screens: [
      { id: "save-success", label: "Образ сохранён" },
      { id: "save-guest", label: "Сохранение (гость)" },
      { id: "register", label: "Регистрация" },
      { id: "login", label: "Вход" },
    ],
  },
  {
    group: "Профиль",
    screens: [
      { id: "profile", label: "Профиль" },
      { id: "style-prefs", label: "Предпочтения стиля" },
      { id: "settings", label: "Настройки" },
    ],
  },
  {
    group: "Состояния",
    screens: [
      { id: "no-outfit", label: "Нет образа" },
      { id: "load-error", label: "Ошибка загрузки" },
      { id: "no-internet", label: "Нет интернета" },
      { id: "confirm-modal", label: "Подтверждение удаления" },
      { id: "toast-demo", label: "Toast / Success / Error" },
    ],
  },
  { group: "UI Kit", screens: [{ id: "ui-kit", label: "Shine UI Kit" }] },
];

export function screenLabel(id: Screen): string {
  return SCREEN_GROUPS.flatMap((g) => g.screens).find((s) => s.id === id)?.label ?? id;
}

const ALL_IDS = new Set<string>(SCREEN_GROUPS.flatMap((g) => g.screens.map((s) => s.id)));

export function isScreen(value: string): value is Screen {
  return ALL_IDS.has(value);
}
