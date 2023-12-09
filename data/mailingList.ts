import { db } from "~/db/db";
import { signups } from "~/db/schema";

export const getMailList = async () => {
  const allSignups = await db.select().from(signups);
  console.log(allSignups);
  return allSignups;
};
