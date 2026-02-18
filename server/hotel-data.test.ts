import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("hotel data API", () => {
  const ctx = createPublicContext();
  const caller = appRouter.createCaller(ctx);

  describe("hotel.info", () => {
    it("returns hotel info for German", async () => {
      const result = await caller.hotel.info({ lang: "de" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.lang).toBe("de");
        expect(result.hotelName).toBe("Waldhotel Bad Essen");
        expect(result.address).toContain("Bad Essen");
        expect(result.phone).toBeTruthy();
        expect(result.email).toContain("@");
      }
    });

    it("returns hotel info for English", async () => {
      const result = await caller.hotel.info({ lang: "en" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.lang).toBe("en");
        expect(result.hotelName).toBe("Waldhotel Bad Essen");
        expect(result.heroSubtitle).toContain("Since 1906");
      }
    });
  });

  describe("rooms.list", () => {
    it("returns rooms for German", async () => {
      const result = await caller.rooms.list({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
      const slugs = result.map(r => r.slug);
      expect(slugs).toContain("double");
      expect(slugs).toContain("single");
      expect(slugs).toContain("suite");
    });

    it("returns rooms for English", async () => {
      const result = await caller.rooms.list({ lang: "en" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
      // English room titles
      const titles = result.map(r => r.title);
      expect(titles).toContain("Double Room");
    });
  });

  describe("rooms.extras", () => {
    it("returns extras for German", async () => {
      const result = await caller.rooms.extras({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(6);
      // Check first extra
      expect(result[0].serviceName).toContain("Frühstück");
    });
  });

  describe("rooms.notes", () => {
    it("returns room notes for German", async () => {
      const result = await caller.rooms.notes({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("wellness.offerings", () => {
    it("returns wellness offerings for German", async () => {
      const result = await caller.wellness.offerings({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(4);
      const titles = result.map(o => o.title);
      expect(titles).toContain("Bio-Sauna");
      expect(titles).toContain("Finnische Sauna");
      expect(titles).toContain("Tauchbecken");
      expect(titles).toContain("Au\u00dfen-Sauna");
      // Dampfbad should NOT be in the list
      expect(titles).not.toContain("Dampfbad");
    });
  });

  describe("wellness.hours", () => {
    it("returns opening hours for German", async () => {
      const result = await caller.wellness.hours({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(4); // Freitag, Sonntag, Damensauna, Gruppen
      const friday = result.find(h => h.dayName === "Freitag");
      expect(friday?.timeRange).toContain("16:00");
      expect(friday?.timeRange).toContain("21:00");
      const sunday = result.find(h => h.dayName === "Sonntag");
      expect(sunday?.timeRange).toContain("13:00");
      expect(sunday?.timeRange).toContain("20:00");
      const damen = result.find(h => h.dayName === "Damensauna");
      expect(damen?.timeRange).toBe("Auf Anfrage");
    });
  });

  describe("wellness.prices", () => {
    it("returns wellness prices for German", async () => {
      const result = await caller.wellness.prices({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("location.sections", () => {
    it("returns location sections for German", async () => {
      const result = await caller.location.sections({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
      const slugs = result.map(s => s.slug);
      expect(slugs).toContain("nature");
      expect(slugs).toContain("culture");
      expect(slugs).toContain("health");
    });

    it("returns location sections with parseable items JSON", async () => {
      const result = await caller.location.sections({ lang: "de" });
      for (const section of result) {
        if (section.items) {
          const items = JSON.parse(section.items);
          expect(items).toBeInstanceOf(Array);
          expect(items.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("pages.meta", () => {
    it("returns page meta for German home", async () => {
      const result = await caller.pages.meta({ lang: "de", slug: "home" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.metaTitle).toContain("Waldhotel");
        expect(result.metaDescription).toBeTruthy();
      }
    });

    it("returns page meta for English rooms", async () => {
      const result = await caller.pages.meta({ lang: "en", slug: "rooms" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.metaTitle).toContain("Rooms");
      }
    });
  });

  describe("pages.allMeta", () => {
    it("returns all page meta for German", async () => {
      const result = await caller.pages.allMeta({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(5);
    });
  });
});
