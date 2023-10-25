import { getBrowser } from "~/utils/getBrowser";
import { getReanovoFlats, getStadtUndLandFlats } from "./getSpecificFlats";

export default defineEventHandler(async () => {
  const browser = await getBrowser();
  const flats = {
    stadtundland: getStadtUndLandFlats,
    reanovo: getReanovoFlats,
  };

  const data = await Promise.all(
    Object.entries(flats).map(async ([key, fn]) => ({
      [key]: await fn(browser),
    }))
  );

  return data;
});
