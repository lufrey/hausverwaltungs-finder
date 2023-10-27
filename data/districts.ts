import { z } from "zod";

const berlinDistricts = {
  mitte: {
    title: "Mitte",
    zipCodes: [],
  },
  friedrichshain: {
    title: "Friedrichshain",
    zipCodes: [],
  },

  prenzlauerBerg: {
    title: "Prenzlauer Berg",
    zipCodes: [],
  },
  charlottenburg: {
    title: "Charlottenburg",
    zipCodes: [],
  },
  neukoelln: {
    title: "Neukölln",
    zipCodes: [],
  },
  kreuzberg: {
    title: "Kreuzberg",
    zipCodes: [],
  },
  moabit: {
    title: "Moabit",
    zipCodes: [],
  },
  wedding: {
    title: "Wedding",
    zipCodes: [],
  },
  tempelhof: {
    title: "Tempelhof",
    zipCodes: [],
  },
  schoeneberg: {
    title: "Schöneberg",
    zipCodes: [],
  },
  tiergarten: {
    title: "Tiergarten",
    zipCodes: [],
  },
  wilmersdorf: {
    title: "Wilmersdorf",
    zipCodes: [],
  },
  spandau: {
    title: "Spandau",
    zipCodes: [],
  },
  steglitz: {
    title: "Steglitz",
    zipCodes: [],
  },
  lichtenberg: {
    title: "Lichtenberg",
    zipCodes: [],
  },
  reinickendorf: {
    title: "Reinickendorf",
    zipCodes: [],
  },
  marzahn: {
    title: "Marzahn",
    zipCodes: [],
  },
  hellersdorf: {
    title: "Hellersdorf",
    zipCodes: [],
  },
  treptow: {
    title: "Treptow",
    zipCodes: [],
  },
  koepenick: {
    title: "Köpenick",
    zipCodes: [],
  },
  pankow: {
    title: "Pankow",
    zipCodes: [],
  },
  weissensee: {
    title: "Weißensee",
    zipCodes: [],
  },
} as const;

// this is necessary for the type to be inferred correctly
const [firstKey, ...restOfKeys] = typedObjectKeys(berlinDistricts);

export const districtIdSchema = z.enum([firstKey, ...restOfKeys]);
export const districtSchema = z.object({
  title: z.string(),
  zipCodes: z.array(z.string()),
});
