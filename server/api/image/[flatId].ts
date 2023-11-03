import { db } from "~/db/db";

export default defineEventHandler(async (e) => {
  const flatId = getRouterParam(e, "flatId");

  if (!flatId) {
    return null;
  }
  try {
    const x = await db.query.flat.findFirst({
      where: (f, { eq }) => eq(f.id, flatId),

      columns: { image: true, id: true },
    });
    return x?.image;
  } catch (err) {
    console.error(err);
  }

  return null;
});
