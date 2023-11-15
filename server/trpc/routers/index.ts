import { router } from "../trpc";
import { flatRouter } from "./flat";
import { propertyManagementRouter } from "./propertyManagement";

export const appRouter = router({
  flat: flatRouter,
  propertyManagement: propertyManagementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
