import { z } from "zod";
import { typedObjectKeys } from "@/utils/typeHelper";

export const tags = {
  new: "Neueintrag",
  wbs: "WBS",
  altbau: "Altbau",
  zentral: "Zentral",
  schoeneAussicht: "Schöne Aussicht",
  parkplatz: "Parkplatz",
  garage: "Garage",
  stellplatz: "Stellplatz",
};

export const tagKeys = typedObjectKeys(tags);

// this is necessary for the type to be inferred correctly
const [firstKey, ...restOfKeys] = typedObjectKeys(tags);

export const tagsSchema = z.array(z.enum([firstKey, ...restOfKeys]));
export type Tags = z.infer<typeof tagsSchema>;
