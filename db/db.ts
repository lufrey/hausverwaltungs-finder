import { drizzle as localSqliteDrizzle } from "drizzle-orm/better-sqlite3";

import Database from "better-sqlite3";
import * as schema from "./schema";
import { tursoDb } from "./tursoDb";

const { TURSO_URL, TURSO_TOKEN } = process.env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const db = isLocal
  ? localSqliteDrizzle(new Database("db/sqlite.db"), {
      schema,
    })
  : tursoDb!;
