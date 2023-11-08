import { drizzle as tursoDrizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { env } from "~/env";

const { TURSO_URL, TURSO_TOKEN } = env;

const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const tursoDb = !isLocal
  ? tursoDrizzle(
      createClient({
        url: TURSO_URL,
        authToken: TURSO_TOKEN,
      }),
      {
        schema,
      },
    )
  : null;
