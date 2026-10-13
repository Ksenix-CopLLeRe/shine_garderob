import type { Outfit, WardrobeItem } from "../domain/types.js";
import type { ImageStorage } from "../storage/images.js";
import type { WardrobeRepository } from "../storage/repository.js";

// Use cases shared by the MCP tools and the HTTP API.

export const withPhotoUrl = (images: ImageStorage, item: WardrobeItem): WardrobeItem =>
  item.imageUrl ? { ...item, imageUrl: images.urlFor(item.imageUrl) } : item;

export const outfitWithPhotoUrls = (images: ImageStorage, outfit: Outfit): Outfit => ({
  ...outfit,
  items: outfit.items.map((i) => withPhotoUrl(images, i)),
});

/** Deletes an item and its stored photo. Returns false if the item does not exist. */
export async function removeItemWithPhoto(
  repo: WardrobeRepository,
  images: ImageStorage,
  userId: string,
  id: string,
): Promise<boolean> {
  const [item] = repo.getItems(userId, [id]);
  if (!item || !repo.removeItem(userId, id)) return false;
  if (item.imageUrl) await images.remove(item.imageUrl);
  return true;
}
