import { fileURLToPath } from "node:url";

// Both src/ (tsx) and dist/ (node) sit one level below the package root.
const dataDir = (name: string) => fileURLToPath(new URL(`../data/${name}`, import.meta.url));

const httpPort = Number(process.env.SHINE_HTTP_PORT) || 8787;

export const config = {
  dbPath: process.env.SHINE_DB_PATH || dataDir("shine.db"),
  imagesDir: process.env.SHINE_IMAGES_DIR || dataDir("images"),
  // stdio is a single-user transport; the user comes from the launcher's env.
  userId: process.env.SHINE_USER_ID || "demo",
  httpPort,
  // Base URL under which the HTTP API serves /images/*. Stored in item.imageUrl.
  publicUrl: process.env.SHINE_PUBLIC_URL || `http://localhost:${httpPort}`,
};
