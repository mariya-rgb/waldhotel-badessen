import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Hotel information – general data about the hotel
 */
export const hotelInfo = mysqlTable("hotel_info", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(), // 'de' or 'en'
  hotelName: varchar("hotelName", { length: 255 }).notNull(),
  tagline: text("tagline"),
  heroTitle: varchar("heroTitle", { length: 255 }),
  heroSubtitle: text("heroSubtitle"),
  heroCta: varchar("heroCta", { length: 128 }),
  aboutLabel: varchar("aboutLabel", { length: 128 }),
  aboutTitle: varchar("aboutTitle", { length: 255 }),
  aboutText1: text("aboutText1"),
  aboutText2: text("aboutText2"),
  aboutCta: varchar("aboutCta", { length: 128 }),
  address: varchar("address", { length: 255 }),
  phone: varchar("phone", { length: 64 }),
  email: varchar("email", { length: 255 }),
  latitude: varchar("latitude", { length: 32 }),
  longitude: varchar("longitude", { length: 32 }),
  instagramUrl: varchar("instagramUrl", { length: 512 }),
  facebookUrl: varchar("facebookUrl", { length: 512 }),
  bookingComUrl: varchar("bookingComUrl", { length: 512 }),
  tripadvisorUrl: varchar("tripadvisorUrl", { length: 512 }),
  agodaUrl: varchar("agodaUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HotelInfo = typeof hotelInfo.$inferSelect;
export type InsertHotelInfo = typeof hotelInfo.$inferInsert;

/**
 * Rooms – hotel room types
 */
export const rooms = mysqlTable("rooms", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull(), // 'double', 'single', 'suite'
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priceFrom: decimal("priceFrom", { precision: 10, scale: 2 }),
  priceLabel: varchar("priceLabel", { length: 128 }),
  imageUrl: varchar("imageUrl", { length: 1024 }),
  amenities: text("amenities"), // JSON array of amenities
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = typeof rooms.$inferInsert;

/**
 * Extras – additional services and prices
 */
export const extras = mysqlTable("extras", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(),
  serviceName: varchar("serviceName", { length: 255 }).notNull(),
  price: varchar("price", { length: 128 }).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Extra = typeof extras.$inferSelect;
export type InsertExtra = typeof extras.$inferInsert;

/**
 * Location sections – points of interest categories
 */
export const locationSections = mysqlTable("location_sections", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull(), // 'nature', 'culture', 'health'
  title: varchar("title", { length: 255 }).notNull(),
  items: text("items"), // JSON array of strings
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LocationSection = typeof locationSections.$inferSelect;
export type InsertLocationSection = typeof locationSections.$inferInsert;

/**
 * Pages meta – SEO metadata for each page
 */
export const pagesMeta = mysqlTable("pages_meta", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(),
  pageSlug: varchar("pageSlug", { length: 64 }).notNull(), // 'home', 'rooms', 'location', 'booking'
  metaTitle: varchar("metaTitle", { length: 512 }),
  metaDescription: text("metaDescription"),
  heroTitle: varchar("heroTitle", { length: 255 }),
  heroSubtitle: text("heroSubtitle"),
  introText: text("introText"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageMeta = typeof pagesMeta.$inferSelect;
export type InsertPageMeta = typeof pagesMeta.$inferInsert;

/**
 * Room notes – special notes about rooms
 */
export const roomNotes = mysqlTable("room_notes", {
  id: int("id").autoincrement().primaryKey(),
  lang: varchar("lang", { length: 5 }).notNull(),
  noteText: text("noteText").notNull(),
  iconName: varchar("iconName", { length: 64 }),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RoomNote = typeof roomNotes.$inferSelect;
export type InsertRoomNote = typeof roomNotes.$inferInsert;

/**
 * Contact messages – guest inquiries via contact form
 */
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  lang: varchar("lang", { length: 5 }).default("de"),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
