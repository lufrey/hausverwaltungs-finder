import { type inferAsyncReturnType } from "@trpc/server";
import { type H3Event } from "h3";
import { env } from "~/env";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (e: H3Event) => {
  // get username from basic auth
  const creds = e.headers?.get("authorization")?.split(" ")[1];
  if (creds) {
    const [username, password] = Buffer.from(creds, "base64")
      .toString("utf-8")
      .split(":");
    if (
      username === env.NUXT_BASIC_AUTH_USER &&
      password === env.NUXT_BASIC_AUTH_PASSWORD
    ) {
      return {
        user: username,
      };
    }
  }
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
