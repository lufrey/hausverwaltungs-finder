import { drizzle as tursoDrizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import "dotenv/config";

const { TURSO_URL, TURSO_TOKEN } = process.env;

const isLocal = !TURSO_URL || !TURSO_TOKEN;

export const tursoDb = !isLocal
  ? tursoDrizzle(
      createClient({
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_TOKEN,
      }),
      {
        schema,
      },
    )
  : null;
