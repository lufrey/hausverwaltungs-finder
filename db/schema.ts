import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

// export const tagsRelations = relations(tags, ({ many }) => ({
//   flats: many(flat),
// }));

export const flat = sqliteTable("flat", {
  id: integer("id").primaryKey(),
  title: text("title"),
  price: integer("price"),
  roomNumber: integer("roomNumber"),
  usableArea: integer("usableArea"),
  objectNumber: text("objectNumber"),
  objectType: text("objectType"),
  floor: integer("floor"),
  addressId: integer("addressId"),
});

export const flatRelations = relations(flat, ({ many, one }) => ({
  //   tags: many(tags),
  address: one(address, { fields: [flat.addressId], references: [address.id] }),
}));

export const flatToTags = sqliteTable("flatToTags", {
  flatId: integer("flatId")
    .notNull()
    .references(() => flat.id),
  tagId: integer("tagId")
    .notNull()
    .references(() => tags.id),
});

export const tagsToFlatRelations = relations(tags, ({ one }) => ({
  tags: one(tags, {
    fields: [tags.id],
    references: [tags.id],
  }),
  flat: one(flat, {
    fields: [tags.id],
    references: [flat.id],
  }),
}));

export const address = sqliteTable("address", {
  id: integer("id").primaryKey(),
  street: text("street"),
  city: text("city"),
  postalCodeId: text("postalCode"),
});

export const addressRelations = relations(address, ({ one, many }) => ({
  postalCode: one(postalCode, {
    fields: [address.postalCodeId],
    references: [postalCode.code],
  }),
  flats: many(flat),
}));

export const postalCode = sqliteTable("postalCode", {
  code: text("code").primaryKey(),
  districtId: integer("districtId"),
});

export const postalCodeRelations = relations(postalCode, ({ one }) => ({
  district: one(district, {
    fields: [postalCode.districtId],
    references: [district.id],
  }),
}));

export const district = sqliteTable("district", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const districtRelations = relations(district, ({ many }) => ({
  postalCode: many(postalCode),
}));
