import { updateMapPreview } from "~/server/mapPreview";

export default defineEventHandler(async () => {
  return await updateMapPreview();
});
