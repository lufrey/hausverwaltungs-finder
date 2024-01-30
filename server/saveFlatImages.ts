import fs from "fs";
import path from "path";
import { db } from "~/db/db";

export async function saveFlatImages() {
  // load images from db and save them to disk
  await db.query.flat
    .findMany({
      columns: {
        id: true,
        image: true,
      },
    })
    .then((flats) => {
      flats.forEach((flat) => {
        if (flat.image) {
          fs.writeFileSync(
            path.join(process.cwd(), "public", "flat-images", flat.id + ".png"),
            flat.image,
            { flag: "w+" },
          );
        }
      });
    });
}
