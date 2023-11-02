import { db } from "~/db/db";

export default defineEventHandler(async () => {
  return await db.query.propertyManagement.findMany({
    with: {
      flats: {
        with: { address: true },
      },
    },
  });
});
