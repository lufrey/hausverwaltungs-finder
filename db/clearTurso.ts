import { sql } from "drizzle-orm";
import { tursoDb } from "./tursoDb";

const clearDb = async (): Promise<void> => {
  const query = sql<string>`SELECT name FROM sqlite_master WHERE type='table';`;

  const tables = await tursoDb!.run(query);

  for (const table of tables.rows) {
    const query = sql.raw(`DROP TABLE ${table.name};`);
    await tursoDb!.run(query);
  }
};

clearDb();
