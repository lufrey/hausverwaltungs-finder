import { propertyManagementList } from "~/data/propertyManagementList";
import { getBrowser } from "~/utils/getBrowser";

export default defineEventHandler(async () => {
  const browser = await getBrowser();

  const data = await Promise.all(
    propertyManagementList.map(async ({ getFlats, id, name }) => ({
      id,
      name,
      flats: await getFlats(browser),
    }))
  );

  return data;
});
