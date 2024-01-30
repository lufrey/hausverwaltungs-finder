import { type inferAsyncReturnType } from "@trpc/server";
import { type H3Event } from "h3";
import { getServerToken } from "#auth";
import { authOptions } from "~/server/api/auth/[...]";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const runtimeConfig = useRuntimeConfig();
export const createContext = async (e: H3Event) => {
  const jwt = await getServerToken(e, authOptions, runtimeConfig);
  if (jwt?.sub) return { user: jwt.sub };
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
