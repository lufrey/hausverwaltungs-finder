import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";
import dotenv from "dotenv";
if (process.env.ENV_FILE_PATH) {
  dotenv.config({
    path: process.env.ENV_FILE_PATH,
  });
}

export const env = createEnv({
  server: {
    GOOGLE_MAPS_API_KEY: z.string().min(1),
    BROWSERLESS_URL: z.string().min(1).optional(),
    BROWSERLESS_TOKEN: z.string().min(1).optional(),
    LOCAL_SQLITE_PATH: z.string().min(1).optional(),
    TURSO_URL: z.string().url().optional(),
    TURSO_TOKEN: z.string().min(1).optional(),
  },
  client: {},
});
