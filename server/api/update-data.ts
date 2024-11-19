import { cleanUpCaches } from "../image-cache";
import { createCaller } from "../trpc/routers";
import { env } from "~/env";

export default defineEventHandler(async (e) => {
  const token = getRequestURL(e).searchParams.get("token");

  if (!token || token !== env.CRON_TOKEN) {
    throw new Error("Invalid token");
  }
  const caller = createCaller({
    user: "admin",
  });
  const result = await caller.propertyManagement.update({ return: true });
  cleanUpCaches();
  return result;
});
