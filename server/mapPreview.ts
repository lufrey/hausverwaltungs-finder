import fs from "fs";
import path from "path";
import { and, isNotNull, isNull } from "drizzle-orm";
import { db } from "~/db/db";
import { flat } from "~/db/schema";
import { env } from "~/env";

export async function updateMapPreview() {
  const imagePath = path.join(process.cwd(), "public", "map-preview.png");

  const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
  url.searchParams.set("center", "52.520008,13.404954");
  url.searchParams.set("zoom", "11");
  url.searchParams.set("size", "640x640");
  url.searchParams.set("scale", "2");
  url.searchParams.set("map_id", "1110d0dace06c35");
  url.searchParams.set("key", env.GOOGLE_MAPS_API_KEY);

  // get location of all flats
  const flats = await db.query.flat.findMany({
    with: {
      address: true,
    },
    where: and(isNull(flat.deleted), isNotNull(flat.addressId)),
  });

  const markers = flats
    .map((f) => `${f.address.latitude},${f.address.longitude}`)
    .join("|");

  url.searchParams.set("markers", markers);
  // load image and save it to disk
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  const image = Buffer.from(buffer);

  fs.writeFileSync(imagePath, image);
  return true;
}
