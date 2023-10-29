import { drizzle as localSqliteDrizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as tursoDrizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import Database from "better-sqlite3";

const { TURSO_URL, TURSO_TOKEN } = process.env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;
// export const db = isLocal
//   ? localSqliteDrizzle(new Database("db.sqlite"))
//   : tursoDrizzle(
//       createClient({
//         url: process.env.TURSO_URL!,
//         authToken: process.env.TURSO_TOKEN,
//       }),
//     );
export const db = localSqliteDrizzle(new Database("db.sqlite"));

// export const migrate = isLocal ? localSqliteMigrate : tursoMigrate;
