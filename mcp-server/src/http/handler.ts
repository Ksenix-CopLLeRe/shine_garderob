import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { CategorySchema, SituationSchema } from "../domain/types.js";
import { outfitWithPhotoUrls, removeItemWithPhoto, withPhotoUrl } from "../services/wardrobe.js";
import { IMAGE_TYPES, LocalImageStorage } from "../storage/images.js";
import type { WardrobeRepository } from "../storage/repository.js";

export interface HttpContext {
  repo: WardrobeRepository;
  imagesDir: string;
  // Single-user for now; replace with the user from an auth token.
  userId: string;
}

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
};

const notFound = (res: ServerResponse) => send(res, 404, { error: "Not found" });

/** REST API for the Shine app plus static item photos. */
export function createHttpHandler({ repo, imagesDir, userId }: HttpContext) {
  // Root-relative photo URLs (/images/…): the client prefixes its own API base,
  // so the same data works from localhost and from a phone on the LAN.
  const images = new LocalImageStorage(imagesDir, "");

  return async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
    if (req.method === "OPTIONS") return res.writeHead(204).end();

    const url = new URL(req.url ?? "/", "http://localhost");
    const path = url.pathname;
    const method = req.method;
    const item = path.match(/^\/api\/items\/([\w-]+)$/)?.[1];
    const outfit = path.match(/^\/api\/outfits\/([\w-]+)$/)?.[1];

    if (method === "DELETE") {
      if (item) return (await removeItemWithPhoto(repo, images, userId, item)) ? send(res, 200, { deleted: item }) : notFound(res);
      if (outfit) return repo.deleteOutfit(userId, outfit) ? send(res, 200, { deleted: outfit }) : notFound(res);
      return send(res, 405, { error: "Method not allowed" });
    }
    if (method !== "GET") return send(res, 405, { error: "Method not allowed" });

    if (path === "/api/health") return send(res, 200, { ok: true });

    if (path === "/api/items") {
      const category = CategorySchema.safeParse(url.searchParams.get("category") ?? undefined);
      const items = repo.listItems(userId, category.success ? { category: category.data } : {});
      return send(res, 200, { items: items.map((i) => withPhotoUrl(images, i)) });
    }

    if (item) {
      const [found] = repo.getItems(userId, [item]);
      if (!found) return notFound(res);
      return send(res, 200, { item: withPhotoUrl(images, found), outfits: repo.listOutfitsWithItem(userId, item) });
    }

    if (path === "/api/outfits") {
      const situation = SituationSchema.safeParse(url.searchParams.get("situation") ?? undefined);
      const outfits = repo.listOutfits(userId, situation.success ? situation.data : undefined);
      return send(res, 200, { outfits: outfits.map((o) => outfitWithPhotoUrls(images, o)) });
    }

    if (outfit) {
      const found = repo.getOutfit(userId, outfit);
      return found ? send(res, 200, outfitWithPhotoUrls(images, found)) : notFound(res);
    }

    if (path.startsWith("/images/")) {
      // Resolve inside imagesDir only; rejects ../ traversal.
      const file = normalize(join(imagesDir, decodeURIComponent(path.slice("/images/".length))));
      const type = IMAGE_TYPES[extname(file).toLowerCase()];
      const info = await stat(file).catch(() => undefined);
      if (!file.startsWith(imagesDir + sep) || !type || !info?.isFile()) return notFound(res);
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Length": info.size,
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      return createReadStream(file).pipe(res);
    }

    notFound(res);
  };
}
