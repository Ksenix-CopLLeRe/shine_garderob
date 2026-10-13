import type { Category, WardrobeItem } from "./types.js";

// Categories that may appear more than once in one outfit.
const STACKABLE: ReadonlySet<Category> = new Set(["Аксессуары"]);

/**
 * Checks that the picked items form a wearable outfit.
 * Returns a list of human-readable problems; empty means the outfit is valid.
 */
export function validateOutfit(requestedIds: string[], found: WardrobeItem[]): string[] {
  const problems: string[] = [];

  const unique = new Set(requestedIds);
  if (unique.size !== requestedIds.length) problems.push("Одна и та же вещь указана несколько раз.");

  const foundIds = new Set(found.map((i) => i.id));
  const missing = [...unique].filter((id) => !foundIds.has(id));
  if (missing.length) problems.push(`Вещи не найдены в гардеробе: ${missing.join(", ")}.`);

  const counts = new Map<Category, number>();
  for (const item of found) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  for (const [category, n] of counts) {
    if (n > 1 && !STACKABLE.has(category)) problems.push(`Больше одной вещи в категории «${category}».`);
  }

  const has = (c: Category) => counts.has(c);
  const hasBase = has("Платья") || (has("Верх") && has("Низ"));
  if (!hasBase) problems.push("Нужна основа образа: платье или верх + низ.");
  if (has("Платья") && (has("Верх") || has("Низ")))
    problems.push("Платье не сочетается с отдельными верхом и низом в одном образе.");

  return problems;
}
