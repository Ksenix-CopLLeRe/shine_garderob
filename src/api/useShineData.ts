import { useEffect, useState } from "react";
import { IMGS } from "@/constants/images";
import { OUTFIT_PIECES, SAVED_OUTFITS } from "@/data/outfits";
import { SITUATIONS } from "@/data/situations";
import { WARDROBE_ITEMS } from "@/data/wardrobe";
import {
  fetchItem,
  fetchItems,
  fetchOutfit,
  fetchOutfits,
  photoUrl,
  type ApiItem,
  type ApiOutfit,
} from "./shine";

// Screens keep their mock-shaped props; API data is mapped into the same shape.
// `id` is absent on mocks, so detail screens opened from them show mock content.
export type WardrobeView = {
  id?: string;
  n: string;
  img: string;
  category?: string;
};
export type OutfitView = {
  id?: string;
  n: string;
  s: string;
  d: string;
  img: string;
  big: boolean;
};
export type Attr = { k: string; v: string };
export type ItemDetailView = {
  name: string;
  img: string;
  attrs: Attr[];
  outfits: { id?: string; name: string }[];
};
export type OutfitDetailView = {
  name: string;
  subtitle: string;
  comment?: string;
  cover: string;
  items: { id?: string; name: string; img: string }[];
};

/** loading → api | mock (API unreachable, lists only) | error (a specific record failed to load). */
export type Source = "loading" | "api" | "mock" | "error";

function useLoad<T>(
  load: (() => Promise<T>) | null,
  fallback: T | null,
  deps: unknown[],
) {
  const [state, setState] = useState<{ data: T | null; source: Source }>(() =>
    load
      ? { data: null, source: "loading" }
      : { data: fallback, source: "mock" },
  );
  useEffect(() => {
    if (!load) return;
    let alive = true;
    load()
      .then((data) => alive && setState({ data, source: "api" }))
      .catch(
        () =>
          alive &&
          setState(
            fallback
              ? { data: fallback, source: "mock" }
              : { data: null, source: "error" },
          ),
      );
    return () => {
      alive = false;
    };
  }, deps);
  return state;
}

const situationLabel = (id: string) =>
  SITUATIONS.find((s) => s.id === id)?.l ?? id;
const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const imgOf = (i: ApiItem) =>
  i.imageUrl ? photoUrl(i.imageUrl) : IMGS.hangers;

// Cover photo: outerwear or a dress reads best as a thumbnail, otherwise the first item.
const coverItem = (o: ApiOutfit) =>
  o.items.find(
    (i) =>
      (i.category === "Верхняя одежда" || i.category === "Платья") &&
      i.imageUrl,
  ) ?? o.items.find((i) => i.imageUrl);

const SEASON_ORDER = ["зима", "весна", "лето", "осень"];
const seasonsLabel = (seasons: string[]) =>
  capitalize(
    [...seasons]
      .sort((a, b) => SEASON_ORDER.indexOf(a) - SEASON_ORDER.indexOf(b))
      .join(", "),
  );

const FORMALITY = [
  "",
  "Спорт / дом",
  "Расслабленно",
  "Повседневно",
  "Смарт-кэжуал",
  "Строго",
];

export function useWardrobeItems() {
  return useLoad<WardrobeView[]>(
    () =>
      fetchItems().then((items) =>
        items.map((i) => ({
          id: i.id,
          n: i.name,
          img: imgOf(i),
          category: i.category,
        })),
      ),
    WARDROBE_ITEMS,
    [],
  );
}

export function useSavedOutfits() {
  return useLoad<OutfitView[]>(
    () =>
      fetchOutfits().then((outfits) =>
        outfits.map((o, i) => {
          const cover = coverItem(o);
          return {
            id: o.id,
            n: o.name,
            s: situationLabel(o.situation),
            d: dateLabel(o.createdAt),
            img: cover ? imgOf(cover) : IMGS.hangers,
            big: i === 0,
          };
        }),
      ),
    SAVED_OUTFITS,
    [],
  );
}

const MOCK_ITEM: ItemDetailView = {
  name: "Чёрный жакет",
  img: IMGS.itemBlackPeacoat,
  attrs: [
    { k: "Категория", v: "Верх" },
    { k: "Тип", v: "Жакет" },
    { k: "Цвет", v: "Чёрный" },
    { k: "Стиль", v: "Классический" },
    { k: "Сезон", v: "Демисезон" },
  ],
  outfits: [{ name: "Офисный день" }, { name: "Деловая встреча" }],
};

export function useItemDetail(id?: string) {
  return useLoad<ItemDetailView>(
    id
      ? () =>
          fetchItem(id).then(({ item, outfits }) => ({
            name: item.name,
            img: imgOf(item),
            attrs: [
              { k: "Категория", v: item.category },
              { k: "Цвет", v: capitalize(item.colors.join(", ")) },
              { k: "Стиль", v: item.styles.join(", ") },
              { k: "Сезон", v: seasonsLabel(item.seasons) },
              {
                k: "Формальность",
                v: FORMALITY[item.formality] ?? String(item.formality),
              },
            ],
            outfits: outfits.map((o) => ({ id: o.id, name: o.name })),
          }))
      : null,
    id ? null : MOCK_ITEM,
    [id],
  );
}

const MOCK_OUTFIT: OutfitDetailView = {
  name: "Дождливый вторник",
  subtitle: "Учёба · +14° · 10 сентября",
  cover: IMGS.itemCoat,
  items: OUTFIT_PIECES.map((p) => ({ name: p.n, img: p.img })),
};

export function useOutfitDetail(id?: string) {
  return useLoad<OutfitDetailView>(
    id
      ? () =>
          fetchOutfit(id).then((o) => {
            const cover = coverItem(o);
            // Cover first, the rest keep the order Claude chose.
            const ordered = cover
              ? [cover, ...o.items.filter((i) => i !== cover)]
              : o.items;
            return {
              name: o.name,
              subtitle: `${situationLabel(o.situation)} · ${dateLabel(o.createdAt)}`,
              comment: o.comment,
              cover: cover ? imgOf(cover) : IMGS.hangers,
              items: ordered.map((i) => ({
                id: i.id,
                name: i.name,
                img: imgOf(i),
              })),
            };
          })
      : null,
    id ? null : MOCK_OUTFIT,
    [id],
  );
}
