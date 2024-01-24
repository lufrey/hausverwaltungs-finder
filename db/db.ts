import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "~/env";

const { TURSO_URL, TURSO_TOKEN } = env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const db = drizzle(
  createClient(
    isLocal
      ? {
          url: env.LOCAL_SQLITE_PATH
            ? `file://${env.LOCAL_SQLITE_PATH}`
            : "file:db/sqlite.db",
        }
      : {
          url: TURSO_URL,
          authToken: TURSO_TOKEN,
        },
  ),
  {
    schema,
  },
);
