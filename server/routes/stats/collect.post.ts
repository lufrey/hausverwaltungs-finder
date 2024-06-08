export default defineEventHandler(async (e) => {
  const body = await readBody(e);

  // send to speedin.site/stats/collect
  await fetch("https://speedin.site/stats/collect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return { success: true };
});
