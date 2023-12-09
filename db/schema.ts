import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
  blob,
} from "drizzle-orm/sqlite-core";
import type { tagKeys } from "~/data/tags";

export const signups = sqliteTable("signups", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  districts: text("districts", { mode: "json" }),
  maxPrice: integer("maxPrice").notNull(),
  minRooms: integer("minRooms").notNull(),
});

export const flat = sqliteTable("flat", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  coldRentPrice: integer("coldRentPrice").notNull(),
  warmRentPrice: integer("warmRentPrice"),
  roomCount: integer("roomCount"),
  usableArea: real("usableArea"),
  floor: integer("floor"),
  image: blob("image", { mode: "buffer" }),
  addressId: text("addressId").notNull(),
  propertyManagementId: text("propertyManagementId"),
  firstSeen: integer("firstSeen", { mode: "timestamp" }).notNull(),
  lastSeen: integer("lastSeen", { mode: "timestamp" }).notNull(),
  deleted: integer("deleted", { mode: "timestamp" }),
  url: text("url").notNull(),
  tags: text("tags", { mode: "json" }).$type<typeof tagKeys>().notNull(),
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
  street: text("street").notNull(),
  city: text("city").notNull(),
  streetNumber: text("streetNumber").notNull(),
  postalCode: text("postalCode").notNull(),
  longitude: real("longitude"),
  latitude: real("latitude"),
});

export const addressRelations = relations(address, ({ many }) => ({
  flats: many(flat),
}));

export const propertyManagement = sqliteTable("propertyManagement", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
});

export const propertyManagementRelations = relations(
  propertyManagement,
  ({ many }) => ({
    flats: many(flat),
  }),
);
