import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";
import { tursoDb } from "./db";

const { TURSO_URL, TURSO_TOKEN } = process.env;
if (!TURSO_URL || !TURSO_TOKEN) {
  throw new Error("TURSO_URL and TURSO_TOKEN must be set");
}

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

(async () => {
  try {
    await migrate(tursoDb, {
      migrationsFolder: "drizzle",
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
