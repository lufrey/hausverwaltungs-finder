import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "~/env";

export const db = drizzle(
  createClient({
    url: env.LOCAL_SQLITE_PATH
      ? `file://${env.LOCAL_SQLITE_PATH}`
      : "file:db/sqlite.db",
  }),
  {
    schema,
  },
);
