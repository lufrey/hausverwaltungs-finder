import { router } from "../trpc";
import { flatRouter } from "./flat";

export const appRouter = router({
  flat: flatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
