import { z } from "zod";
import { db } from "~/db/db";
import { signups } from "~/db/schema";

export const mailingListSignUpSchema = z.object({
  email: z.string().email("Die E-Mail Adresse ist nicht gültig"),
  district: z.array(z.string()),
  rooms: z.number().int(),
  price: z.number().int(),
});

// export const getMailList = async () => {
//   const allSignups = await db.select().from(signups);
//   console.log(allSignups);
// };
