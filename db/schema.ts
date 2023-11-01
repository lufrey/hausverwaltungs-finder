import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  real,
  blob,
} from "drizzle-orm/sqlite-core";

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const flat = sqliteTable("flat", {
  id: integer("id").primaryKey(),
  title: text("title"),
  coldRentPrice: integer("coldRentPrice"),
  warmRentPrice: integer("warmRentPrice"),
  roomCount: integer("roomCount"),
  usableArea: real("usableArea"),
  floor: integer("floor"),
  image: blob("image"),
  addressId: integer("addressId"),
  propertyManagementId: text("propertyManagementId"),
});

export const flatRelations = relations(flat, ({ one }) => ({
  address: one(address, { fields: [flat.addressId], references: [address.id] }),
  propertyManagement: one(propertyManagement, {
    fields: [flat.propertyManagementId],
    references: [propertyManagement.slug],
  }),
}));

export const flatToTags = sqliteTable(
  "flatToTags",
  {
    flatId: integer("flatId")
      .notNull()
      .references(() => flat.id),
    tagId: integer("tagId")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({ pk: primaryKey(table.flatId, table.tagId) }),
);

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

export const propertyManagement = sqliteTable("propertyManagement", {
  slug: text("slug").primaryKey(),
  name: text("name"),
  website: text("website"),
});

export const propertyManagementRelations = relations(
  propertyManagement,
  ({ many }) => ({
    flats: many(flat),
  }),
);
