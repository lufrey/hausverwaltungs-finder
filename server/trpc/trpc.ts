/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { type Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create();
const isAuthed = t.middleware(({ ctx, next }) => {
  if (ctx.user) return next({ ctx });
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "You must be logged in to do that",
  });
});
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
