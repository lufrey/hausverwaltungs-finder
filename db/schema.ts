import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
  blob,
} from "drizzle-orm/sqlite-core";
import type { tagKeys } from "~/data/tags";

export const flat = sqliteTable("flat", {
  id: text("id").primaryKey(),
  title: text("title"),
  coldRentPrice: integer("coldRentPrice"),
  warmRentPrice: integer("warmRentPrice"),
  roomCount: integer("roomCount"),
  usableArea: real("usableArea"),
  floor: integer("floor"),
  image: blob("image"),
  addressId: text("addressId"),
  propertyManagementId: text("propertyManagementId"),
  firstSeen: integer("firstSeen", { mode: "timestamp" }),
  lastSeen: integer("lastSeen", { mode: "timestamp" }),
  tags: text("tags", { mode: "json" }).$type<typeof tagKeys>(),
});

export const flatRelations = relations(flat, ({ one }) => ({
  address: one(address, { fields: [flat.addressId], references: [address.id] }),
  propertyManagement: one(propertyManagement, {
    fields: [flat.propertyManagementId],
    references: [propertyManagement.slug],
  }),
}));

export const address = sqliteTable("address", {
  id: text("id").primaryKey(),
  street: text("street"),
  city: text("city"),
  streetNumber: text("streetNumber"),
  postalCode: text("postalCode"),
  longitude: real("longitude"),
  latitude: real("latitude"),
});

export const addressRelations = relations(address, ({ one, many }) => ({
  postalCode: one(postalCode, {
    fields: [address.postalCode],
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
