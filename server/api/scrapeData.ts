import { propertyManagementRouter } from "../trpc/routers/propertyManagement";

export default defineEventHandler(async () => {
  const caller = propertyManagementRouter.createCaller({});
  const data = await caller.update({ return: true });

  return data;
});
