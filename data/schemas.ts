import { z } from "zod";

export const mailingListSignUpSchema = z.object({
  email: z.string().email("Die E-Mail Adresse ist nicht gültig"),
  district: z.array(z.string()),
  rooms: z.number().int(),
  price: z.number().int(),
});
