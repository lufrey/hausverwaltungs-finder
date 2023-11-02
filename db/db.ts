import { drizzle as localSqliteDrizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as tursoDrizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import * as schema from "./schema";
import "dotenv/config";

const { TURSO_URL, TURSO_TOKEN } = process.env;
const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const tursoDb = tursoDrizzle(
  createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN,
  }),
  {
    schema,
  },
);

export const db = isLocal
  ? localSqliteDrizzle(new Database("db/sqlite.db"), {
      schema,
    })
  : tursoDb;
