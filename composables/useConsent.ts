import { z } from "zod";

export const useConsent = () =>
  useLocalStorage(
    "consent",
    z.object({
      maps: z.boolean().optional(),
    }),
  );
