import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import "dotenv/config";

const { TURSO_URL, TURSO_TOKEN } = process.env;
if (!TURSO_URL || !TURSO_TOKEN) {
  throw new Error("TURSO_URL and TURSO_TOKEN must be set");
}

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

const db = drizzle(client);

(async () => {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle",
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
