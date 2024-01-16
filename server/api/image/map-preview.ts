import fs from "fs";
import {
  mapPreviewImagePath,
  updateMapPreview,
} from "~/server/updateMapPreview";

export default defineEventHandler(async () => {
  // if it doesn't exist, create it
  if (!fs.existsSync(mapPreviewImagePath)) {
    await updateMapPreview();
  }

  return fs.readFileSync(mapPreviewImagePath);
});
