import { eq, asc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  hotelInfo, rooms, extras, roomNotes,
  wellnessOfferings, wellnessHours, wellnessPrices,
  locationSections, pagesMeta,
  contactMessages, InsertContactMessage,
  experiences,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================================
// User helpers (unchanged from template)
// ============================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// Hotel Info
// ============================================================

export async function getHotelInfo(lang: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(hotelInfo).where(eq(hotelInfo.lang, lang)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ============================================================
// Rooms
// ============================================================

export async function getRooms(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rooms).where(eq(rooms.lang, lang)).orderBy(asc(rooms.sortOrder));
}

// ============================================================
// Extras
// ============================================================

export async function getExtras(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(extras).where(eq(extras.lang, lang)).orderBy(asc(extras.sortOrder));
}

// ============================================================
// Room Notes
// ============================================================

export async function getRoomNotes(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roomNotes).where(eq(roomNotes.lang, lang)).orderBy(asc(roomNotes.sortOrder));
}

// ============================================================
// Wellness Offerings
// ============================================================

export async function getWellnessOfferings(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(wellnessOfferings).where(eq(wellnessOfferings.lang, lang)).orderBy(asc(wellnessOfferings.sortOrder));
}

// ============================================================
// Wellness Hours
// ============================================================

export async function getWellnessHours(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(wellnessHours).where(eq(wellnessHours.lang, lang)).orderBy(asc(wellnessHours.dayIndex));
}

// ============================================================
// Wellness Prices
// ============================================================

export async function getWellnessPrices(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(wellnessPrices).where(eq(wellnessPrices.lang, lang)).orderBy(asc(wellnessPrices.sortOrder));
}

// ============================================================
// Location Sections
// ============================================================

export async function getLocationSections(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(locationSections).where(eq(locationSections.lang, lang)).orderBy(asc(locationSections.sortOrder));
}

// ============================================================
// Pages Meta
// ============================================================

export async function getPageMeta(lang: string, pageSlug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(pagesMeta)
    .where(and(eq(pagesMeta.lang, lang), eq(pagesMeta.pageSlug, pageSlug)))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllPagesMeta(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pagesMeta).where(eq(pagesMeta.lang, lang));
}

// ============================================================
// Contact Messages
// ============================================================

export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactMessages).values(data);
  return { success: true };
}

export async function getContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMessages).orderBy(asc(contactMessages.createdAt));
}

// ============================================================
// Experiences / Arrangements
// ============================================================

export async function getExperiences(lang: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(experiences)
    .where(and(eq(experiences.lang, lang), eq(experiences.isActive, true)))
    .orderBy(asc(experiences.sortOrder));
}

export async function getExperienceBySlug(lang: string, slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(experiences)
    .where(and(eq(experiences.lang, lang), eq(experiences.slug, slug), eq(experiences.isActive, true)))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}
