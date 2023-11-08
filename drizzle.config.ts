import type { Config } from "drizzle-kit";
import { env } from "./env";

const { TURSO_URL, TURSO_TOKEN } = env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: isLocal ? "better-sqlite" : "libsql",
  dbCredentials: {
    url: isLocal ? "./db/sqlite.db" : TURSO_URL,
    authToken: TURSO_TOKEN,
  },
} satisfies Config;
