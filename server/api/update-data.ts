import { propertyManagementRouter } from "../trpc/routers/propertyManagement";
import { env } from "~/env";

export default defineEventHandler(async (e) => {
  const token = getRequestURL(e).searchParams.get("token");
  if (!token || token !== env.CRON_TOKEN) {
    throw new Error("Invalid token");
  }
  const caller = propertyManagementRouter.createCaller({});
  return await caller.update({ return: true });
});
