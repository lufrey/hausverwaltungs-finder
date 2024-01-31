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
    e.headers.set("Cache-Control", "public, max-age=86400");
    // apply headers
    e.respondWith(new Response(x?.image, { status: 200, headers: e.headers }));
  } catch (err) {
    console.error(err);
  }

  return null;
});
