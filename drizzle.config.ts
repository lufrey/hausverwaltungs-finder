import type { Config } from "drizzle-kit";
import { env } from "./env";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "libsql",
  dbCredentials: {
    url: env.LOCAL_SQLITE_PATH
      ? `file://${env.LOCAL_SQLITE_PATH}`
      : "file:db/sqlite.db",
  },
} satisfies Config;
