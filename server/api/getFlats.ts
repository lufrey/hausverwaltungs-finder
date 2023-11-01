import { db } from "~/db/db";

export default defineEventHandler(async () => {
  const propertyManagements = await db.query.propertyManagement.findMany({
    with: { flats: true },
  });
  return propertyManagements;
});
