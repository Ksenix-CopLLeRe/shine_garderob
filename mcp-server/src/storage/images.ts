import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { copyFile, mkdir, rm, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { extname, join, normalize, resolve, sep } from "node:path";
import { promisify } from "node:util";

export const IMAGE_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};
// iPhone photos; converted to JPEG on import.
const HEIC = new Set([".heic", ".heif"]);
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

export class ImageError extends Error {}

/**
 * item.imageUrl in the DB holds either an external URL (https://…) or a storage
 * key (`<user>/<uuid>.jpg`). Keys are turned into URLs only when data leaves the
 * server, so the public host can change without rewriting rows.
 */
export const isStorageKey = (ref: string) => !ref.includes("://");

/**
 * Storage boundary for item photos. The local implementation keeps files on disk
 * and serves them over the HTTP API; swap for S3/R2/Supabase Storage in production.
 */
export interface ImageStorage {
  /** Copies a local file into storage and returns its storage key. */
  importFile(userId: string, sourcePath: string): Promise<string>;
  /** Deletes a stored photo; external URLs are ignored. */
  remove(ref: string): Promise<void>;
  /** Public URL for a key, or the ref itself when it is already a URL. */
  urlFor(ref: string): string;
}

export class LocalImageStorage implements ImageStorage {
  constructor(
    private rootDir: string,
    // "" yields root-relative URLs (/images/…) for the HTTP API.
    private publicBaseUrl: string,
  ) {}

  async importFile(userId: string, sourcePath: string): Promise<string> {
    const path = resolve(sourcePath.replace(/^~(?=$|\/)/, homedir()));
    const ext = extname(path).toLowerCase();
    const heic = HEIC.has(ext);
    if (!IMAGE_TYPES[ext] && !heic)
      throw new ImageError(`Формат ${ext || "без расширения"} не поддерживается. Нужен JPG, PNG, WebP или HEIC.`);

    const info = await stat(path).catch(() => undefined);
    if (!info?.isFile()) throw new ImageError(`Файл не найден: ${path}`);
    if (info.size > MAX_IMAGE_BYTES) throw new ImageError("Файл больше 15 МБ.");

    const dir = encodeURIComponent(userId);
    const key = `${dir}/${randomUUID()}${heic ? ".jpg" : ext}`;
    await mkdir(join(this.rootDir, dir), { recursive: true });
    const dest = join(this.rootDir, key);
    if (heic) await convertHeic(path, dest);
    else await copyFile(path, dest);
    return key;
  }

  async remove(ref: string): Promise<void> {
    if (!isStorageKey(ref)) return;
    const file = normalize(join(this.rootDir, ref));
    if (file.startsWith(this.rootDir + sep)) await rm(file, { force: true });
  }

  urlFor(ref: string): string {
    return isStorageKey(ref) ? `${this.publicBaseUrl}/images/${ref}` : ref;
  }
}

async function convertHeic(src: string, dest: string) {
  if (process.platform !== "darwin")
    throw new ImageError("HEIC поддерживается только на macOS. Сохраните фото как JPG и попробуйте снова.");
  try {
    // sips ships with macOS; execFile passes args without a shell.
    await promisify(execFile)("sips", ["-s", "format", "jpeg", src, "--out", dest]);
  } catch {
    throw new ImageError("Не удалось конвертировать HEIC. Сохраните фото как JPG и попробуйте снова.");
  }
}
