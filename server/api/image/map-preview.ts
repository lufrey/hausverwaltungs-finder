import { promises as fs, constants } from "fs";
import {
  mapPreviewImagePath,
  updateMapPreview,
} from "~/server/updateMapPreview";

let cachedContent: null | Buffer = null;

export default defineEventHandler(async () => {
  if (cachedContent) return cachedContent;

  try {
    await fs.access(mapPreviewImagePath, constants.F_OK);
  } catch (error) {
    await updateMapPreview();
  }
  cachedContent = await fs.readFile(mapPreviewImagePath);
  return cachedContent;
});
