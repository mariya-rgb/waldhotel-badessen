import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

describe("hotel data API", () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe("hotel.info", () => {
    it("returns the German positioning for work and holiday stays", async () => {
      const result = await caller.hotel.info({ lang: "de" });
      expect(result).not.toBeNull();
      expect(result?.hotelName).toBe("Waldhotel Bad Essen");
      expect(result?.aboutText1).toContain("Monteure");
      expect(result?.aboutText1).toContain("Handwerker");
      expect(result?.aboutText2).toContain("Gruppen");
      expect(result?.aboutText2).toContain("Ein reguläres Frühstück bieten wir nicht an");
    });

    it("returns the English positioning", async () => {
      const result = await caller.hotel.info({ lang: "en" });
      expect(result).not.toBeNull();
      expect(result?.hotelName).toBe("Waldhotel Bad Essen");
      expect(result?.aboutText1).toContain("tradespeople");
      expect(result?.aboutText2).toContain("regular breakfast");
    });
  });

  describe("rooms.list", () => {
    it("returns all room types for German and English", async () => {
      const german = await caller.rooms.list({ lang: "de" });
      const english = await caller.rooms.list({ lang: "en" });
      expect(german.map(room => room.slug)).toEqual(expect.arrayContaining(["double", "single", "suite"]));
      expect(english.map(room => room.title)).toContain("Double Room");
    });
  });

  describe("rooms.extras", () => {
    it("contains only currently available additional services", async () => {
      const result = await caller.rooms.extras({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.map(extra => extra.serviceName)).toEqual(expect.arrayContaining(["Hund", "Zustellbett"]));
      expect(result.map(extra => extra.serviceName).join(" ")).not.toMatch(/Frühstück|Sauna/i);
    });
  });

  describe("rooms.notes", () => {
    it("returns room notes", async () => {
      const result = await caller.rooms.notes({ lang: "de" });
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result.map(note => note.noteText).join(" ")).toContain("Parkplätze");
    });
  });

  describe("location.sections", () => {
    it("returns nature, culture and health sections", async () => {
      const result = await caller.location.sections({ lang: "de" });
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result.map(section => section.slug)).toEqual(expect.arrayContaining(["nature", "culture", "health"]));
    });
  });

  describe("pages.meta", () => {
    it("returns current home metadata", async () => {
      const result = await caller.pages.meta({ lang: "de", slug: "home" });
      expect(result?.metaTitle).toContain("Waldhotel");
      expect(result?.metaDescription).toContain("Monteure");
    });

    it("does not return a wellness page", async () => {
      const result = await caller.pages.meta({ lang: "de", slug: "wellness" });
      expect(result).toBeNull();
    });

    it("returns current page metadata for English rooms", async () => {
      const result = await caller.pages.meta({ lang: "en", slug: "rooms" });
      expect(result?.metaTitle).toContain("Rooms");
    });
  });
});
