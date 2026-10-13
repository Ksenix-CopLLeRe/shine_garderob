#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { config } from "./config.js";
import { createServer } from "./server.js";
import { LocalImageStorage } from "./storage/images.js";
import { SqliteRepository } from "./storage/sqlite.js";

// stdout carries the MCP protocol — log to stderr only.
const repo = new SqliteRepository(config.dbPath);
const images = new LocalImageStorage(config.imagesDir, config.publicUrl);
const server = createServer({ repo, images, userId: config.userId });

const shutdown = async () => {
  await server.close();
  repo.close();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await server.connect(new StdioServerTransport());
console.error(`Shine MCP server ready (user "${config.userId}", db ${config.dbPath})`);
