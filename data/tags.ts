import { z } from "zod";
import { typedObjectKeys } from "@/utils/typeHelper";

export const tags = {
  new: "Neueintrag",
  wbs: "WBS",
  altbau: "Altbau",
  neubau: "Neubau",
  zentral: "Zentral",
  schoeneAussicht: "Schöne Aussicht",
  parkplatz: "Parkplatz",
  garage: "Garage",
  stellplatz: "Stellplatz",
  erstbezug: "Erstbezug",
  dachgeschoss: "Dachgeschoss",
};

// this is necessary for the type to be inferred correctly
const [firstKey, ...restOfKeys] = typedObjectKeys(tags);

export const tagsSchema = z.array(z.enum([firstKey, ...restOfKeys]));
export type Tags = z.infer<typeof tagsSchema>;

export const titleToTagsMap = {
  altbau: ["altbau"],
  neubau: ["neubau"],
  wbs: ["wbs"],
  wohnberechtigungsschein: ["wbs"],
  garage: ["garage"],
  stellplatz: ["stellplatz"],
  parkplatz: ["parkplatz"],
  erstbezug: ["erstbezug"],
  dachgeschoss: ["dachgeschoss"],
} as const;

export const tagKeys = typedObjectKeys(tags);
export const getTagsForTitle = (
  title: string,
  customTagsMap?: Record<string, Tags>,
): Tags => {
  const titleToTagsKeys = typedObjectKeys(customTagsMap ?? titleToTagsMap);
  return titleToTagsKeys.reduce((acc, key) => {
    if (title.toLowerCase().includes(key)) {
      acc.push(...titleToTagsMap[key]);
    }
    return acc;
  }, [] as Tags);
};
