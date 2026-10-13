import { createServer } from "node:http";
import { config } from "../config.js";
import { SqliteRepository } from "../storage/sqlite.js";
import { createHttpHandler } from "./handler.js";

const repo = new SqliteRepository(config.dbPath);
const handler = createHttpHandler({ repo, imagesDir: config.imagesDir, userId: config.userId });

createServer((req, res) => {
  handler(req, res).catch((e) => {
    console.error(e);
    if (!res.headersSent) res.writeHead(500).end();
  });
}).listen(config.httpPort, () => {
  console.error(`Shine API: ${config.publicUrl} (user "${config.userId}")`);
});
