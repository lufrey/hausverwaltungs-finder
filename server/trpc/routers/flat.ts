import { publicProcedure, router } from "../trpc";
import { db } from "~/db/db";

export const flatRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.query.propertyManagement.findMany({
      with: {
        flats: {
          with: { address: true },
          columns: {
            id: true,
            addressId: true,
            coldRentPrice: true,
            floor: true,
            propertyManagementId: true,
            tags: true,
            title: true,
            firstSeen: true,
            lastSeen: true,
            roomCount: true,
            usableArea: true,
            warmRentPrice: true,
            url: true,
          },
        },
      },
    });
  }),
});
