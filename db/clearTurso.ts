import { sql } from "drizzle-orm";
import { tursoDb as db } from "./db";

const clearDb = async (): Promise<void> => {
  const query = sql<string>`SELECT name FROM sqlite_master WHERE type='table';`;

  const tables = await db.run(query);

  for (const table of tables.rows) {
    const query = sql.raw(`DROP TABLE ${table.name};`);
    await db.run(query);
  }
};

clearDb();
