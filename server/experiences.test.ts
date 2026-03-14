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

describe("experiences API", () => {
  const ctx = createPublicContext();
  const caller = appRouter.createCaller(ctx);

  describe("experiences.list", () => {
    it("returns experiences for German", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(1);
      const first = result[0];
      expect(first.lang).toBe("de");
      expect(first.slug).toBe("wald-auszeit");
      expect(first.title).toBe("Wald-Auszeit Bad Essen");
      expect(first.isActive).toBe(true);
    });

    it("returns experiences for English", async () => {
      const result = await caller.experiences.list({ lang: "en" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(1);
      const first = result[0];
      expect(first.lang).toBe("en");
      expect(first.slug).toBe("wald-auszeit");
      expect(first.title).toBe("Forest Retreat Bad Essen");
    });

    it("returns correct Wald-Auszeit content for German", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      const waldAuszeit = result.find(e => e.slug === "wald-auszeit");
      expect(waldAuszeit).toBeDefined();
      if (waldAuszeit) {
        expect(waldAuszeit.headline).toBe("Ankommen. Loslassen. Auftanken.");
        expect(waldAuszeit.subtitle).toContain("Wald, Wärme und Stille");
        expect(waldAuszeit.price).toBe("ab 295,00 €");
        expect(waldAuszeit.priceLabel).toContain("2 Personen");
        expect(waldAuszeit.duration).toBe("Freitag – Sonntag");
        expect(waldAuszeit.ctaText).toContain("anfragen");
        // Check includes is valid JSON
        expect(waldAuszeit.includes).toBeTruthy();
        const includes = JSON.parse(waldAuszeit.includes!);
        expect(includes).toBeInstanceOf(Array);
        expect(includes.length).toBe(4);
        expect(includes).toContain("2 Übernachtungen im Doppelzimmer");
        expect(includes).toContain("Waldsauna für 2 Personen am Freitag");
        expect(includes).toContain("Late Check-out am Sonntag inklusive");
        // Check description mentions key points
        expect(waldAuszeit.description).toContain("Waldsauna");
        expect(waldAuszeit.description).toContain("Frühstück");
        expect(waldAuszeit.description).toContain("Late Check-out");
        // Check SEO text
        expect(waldAuszeit.seoText).toContain("Wochenendtrip");
        expect(waldAuszeit.seoText).toContain("Kurzurlaub im Grünen");
      }
    });
  });

  describe("experiences.bySlug", () => {
    it("returns a single experience by slug for German", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "wald-auszeit" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("wald-auszeit");
        expect(result.title).toBe("Wald-Auszeit Bad Essen");
        expect(result.lang).toBe("de");
      }
    });

    it("returns a single experience by slug for English", async () => {
      const result = await caller.experiences.bySlug({ lang: "en", slug: "wald-auszeit" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("wald-auszeit");
        expect(result.title).toBe("Forest Retreat Bad Essen");
        expect(result.lang).toBe("en");
      }
    });

    it("returns null for non-existent slug", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "non-existent" });
      expect(result).toBeNull();
    });
  });

  describe("pages.meta for experiences", () => {
    it("returns page meta for German experiences page", async () => {
      const result = await caller.pages.meta({ lang: "de", slug: "experiences" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.metaTitle).toContain("Erlebnisse");
        expect(result.heroTitle).toBe("Erlebnisse & Arrangements");
        expect(result.introText).toBeTruthy();
      }
    });

    it("returns page meta for English experiences page", async () => {
      const result = await caller.pages.meta({ lang: "en", slug: "experiences" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.metaTitle).toContain("Experiences");
        expect(result.heroTitle).toBe("Experiences & Arrangements");
      }
    });
  });
});
