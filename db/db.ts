import { drizzle as localSqliteDrizzle } from "drizzle-orm/better-sqlite3";

import Database from "better-sqlite3";
import * as schema from "./schema";
import { tursoDb } from "./tursoDb";
import { env } from "~/env";

const { TURSO_URL, TURSO_TOKEN } = env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const db = isLocal
  ? localSqliteDrizzle(new Database(env.LOCAL_SQLITE_PATH ?? "db/sqlite.db"), {
      schema,
    })
  : tursoDb!;
