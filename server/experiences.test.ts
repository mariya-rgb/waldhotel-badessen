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
    it("returns at least 2 experiences for German", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
      result.forEach(e => {
        expect(e.lang).toBe("de");
        expect(e.isActive).toBe(true);
      });
    });

    it("returns at least 2 experiences for English", async () => {
      const result = await caller.experiences.list({ lang: "en" });
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(3);
      result.forEach(e => {
        expect(e.lang).toBe("en");
        expect(e.isActive).toBe(true);
      });
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
        // Check gallery images
        expect(waldAuszeit.galleryImages).toBeTruthy();
        const gallery = JSON.parse(waldAuszeit.galleryImages!);
        expect(gallery).toBeInstanceOf(Array);
        expect(gallery.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("returns correct Picknick content for German", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      const picknick = result.find(e => e.slug === "picknick-im-wald");
      expect(picknick).toBeDefined();
      if (picknick) {
        expect(picknick.title).toBe("Picknick im Wald");
        expect(picknick.headline).toContain("Picknick");
        expect(picknick.subtitle).toContain("Genuss unter freiem Himmel");
        expect(picknick.price).toBe("ab 54,00 €");
        expect(picknick.priceLabel).toContain("2 Personen");
        expect(picknick.description).toContain("Picknickkorb");
        expect(picknick.description).toContain("Sekt");
        expect(picknick.description).toContain("Frühstück");
        // Check includes
        expect(picknick.includes).toBeTruthy();
        const includes = JSON.parse(picknick.includes!);
        expect(includes).toBeInstanceOf(Array);
        expect(includes.length).toBe(5);
        expect(includes).toContain("Picknickkorb für 2 Personen");
        expect(includes).toContain("1 Flasche Sekt (gekühlt)");
        expect(includes).toContain("Frühstück oder kalter Lunch nach Wahl");
        // Check gallery images (4 Hochkant-Fotos)
        expect(picknick.galleryImages).toBeTruthy();
        const gallery = JSON.parse(picknick.galleryImages!);
        expect(gallery).toBeInstanceOf(Array);
        expect(gallery.length).toBe(4);
        // Check SEO text
        expect(picknick.seoText).toContain("Picknick im Wald");
        expect(picknick.seoText).toContain("Waldhotel Bad Essen");
      }
    });

    it("returns correct Romantik-Auszeit content for German", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      const romantik = result.find(e => e.slug === "romantik-auszeit");
      expect(romantik).toBeDefined();
      if (romantik) {
        expect(romantik.title).toBe("Romantik-Auszeit im Waldzimmer");
        expect(romantik.headline).toContain("Zeit nur Ihnen gehört");
        expect(romantik.subtitle).toContain("Sekt");
        expect(romantik.price).toBe("ab 49,00 €");
        expect(romantik.priceLabel).toContain("pro Nacht");
        expect(romantik.description).toContain("Frühstück direkt im Bett");
        expect(romantik.description).toContain("Obstkorb");
        // Check includes
        expect(romantik.includes).toBeTruthy();
        const includes = JSON.parse(romantik.includes!);
        expect(includes).toBeInstanceOf(Array);
        expect(includes.length).toBe(5);
        expect(includes).toContain("Romantisch vorbereitetes Zimmer");
        expect(includes).toContain("1 Flasche Sekt (gekühlt) auf dem Zimmer");
        expect(includes).toContain("Frühstück im Bett für 2 Personen");
        expect(includes).toContain("Frischer Obstkorb");
        // Check gallery images
        expect(romantik.galleryImages).toBeTruthy();
        const gallery = JSON.parse(romantik.galleryImages!);
        expect(gallery).toBeInstanceOf(Array);
        expect(gallery.length).toBe(4);
        // Check SEO text
        expect(romantik.seoText).toContain("Romantikwochenende");
        expect(romantik.seoText).toContain("Waldhotel Bad Essen");
      }
    });

    it("returns correct Forest Picnic content for English", async () => {
      const result = await caller.experiences.list({ lang: "en" });
      const picknick = result.find(e => e.slug === "forest-picnic");
      expect(picknick).toBeDefined();
      if (picknick) {
        expect(picknick.title).toBe("Forest Picnic");
        expect(picknick.price).toBe("from 54.00 €");
        expect(picknick.description).toContain("picnic basket");
        expect(picknick.description).toContain("sparkling wine");
        const includes = JSON.parse(picknick.includes!);
        expect(includes).toContain("Picnic basket for 2 persons");
        expect(includes).toContain("1 bottle of sparkling wine (chilled)");
      }
    });
  });

  describe("experiences.bySlug", () => {
    it("returns Wald-Auszeit by slug for German", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "wald-auszeit" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("wald-auszeit");
        expect(result.title).toBe("Wald-Auszeit Bad Essen");
        expect(result.lang).toBe("de");
      }
    });

    it("returns Forest Retreat by slug for English", async () => {
      const result = await caller.experiences.bySlug({ lang: "en", slug: "wald-auszeit" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("wald-auszeit");
        expect(result.title).toBe("Forest Retreat Bad Essen");
        expect(result.lang).toBe("en");
      }
    });

    it("returns Picknick by slug for German", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "picknick-im-wald" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("picknick-im-wald");
        expect(result.title).toBe("Picknick im Wald");
        expect(result.galleryImages).toBeTruthy();
      }
    });

    it("returns Romantik-Auszeit by slug for German", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "romantik-auszeit" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("romantik-auszeit");
        expect(result.title).toBe("Romantik-Auszeit im Waldzimmer");
        expect(result.lang).toBe("de");
        expect(result.galleryImages).toBeTruthy();
      }
    });

    it("returns Romantic Retreat by slug for English", async () => {
      const result = await caller.experiences.bySlug({ lang: "en", slug: "romantic-retreat" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("romantic-retreat");
        expect(result.title).toBe("Romantic Retreat in the Forest Room");
        expect(result.lang).toBe("en");
      }
    });

    it("returns Forest Picnic by slug for English", async () => {
      const result = await caller.experiences.bySlug({ lang: "en", slug: "forest-picnic" });
      expect(result).not.toBeNull();
      if (result) {
        expect(result.slug).toBe("forest-picnic");
        expect(result.title).toBe("Forest Picnic");
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
