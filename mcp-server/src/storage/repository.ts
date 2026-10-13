import type {
  ItemFilter,
  ItemInput,
  Outfit,
  OutfitInput,
  OutfitSummary,
  Situation,
  Style,
  WardrobeItem,
} from "../domain/types.js";

/**
 * Storage boundary for the wardrobe domain. Every call is scoped to a user,
 * so a multi-user transport (HTTP + OAuth) can reuse it unchanged.
 * Swap the SQLite implementation for Postgres etc. by implementing this interface.
 */
export interface WardrobeRepository {
  listItems(userId: string, filter?: ItemFilter): WardrobeItem[];
  getItems(userId: string, ids: string[]): WardrobeItem[];
  addItem(userId: string, input: ItemInput): WardrobeItem;
  updateItem(userId: string, id: string, patch: Partial<ItemInput>): WardrobeItem | undefined;
  removeItem(userId: string, id: string): boolean;

  listOutfitsWithItem(userId: string, itemId: string): OutfitSummary[];

  getStyleProfile(userId: string): Style[];
  setStyleProfile(userId: string, styles: Style[]): Style[];

  saveOutfit(userId: string, input: OutfitInput): Outfit;
  listOutfits(userId: string, situation?: Situation): Outfit[];
  getOutfit(userId: string, id: string): Outfit | undefined;
  deleteOutfit(userId: string, id: string): boolean;

  close(): void;
}
