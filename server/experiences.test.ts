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

describe("experiences API", () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe("experiences.list", () => {
    it("returns only the active German picnic experience", async () => {
      const result = await caller.experiences.list({ lang: "de" });
      expect(result).toHaveLength(1);
      const picnic = result[0];
      expect(picnic.slug).toBe("picknick-im-wald");
      expect(picnic.isActive).toBe(true);
      expect(picnic.price).toBe("ab 54,00 €");
      expect(picnic.priceLabel).toContain("2 Personen");
      expect(picnic.description).toContain("kaltem Lunch");
      expect(picnic.description).not.toMatch(/Sauna|Frühstück/i);
      const includes = JSON.parse(picnic.includes ?? "[]") as string[];
      expect(includes).toContain("Kalter Lunch");
      expect(includes.join(" ")).not.toMatch(/Sauna|Frühstück/i);
      expect(picnic.seoText).toContain("Wanderungen");
      expect(picnic.seoText).toContain("Radtouren");
    });

    it("returns only the active English forest picnic", async () => {
      const result = await caller.experiences.list({ lang: "en" });
      expect(result).toHaveLength(1);
      const picnic = result[0];
      expect(picnic.slug).toBe("forest-picnic");
      expect(picnic.title).toBe("Forest Picnic");
      expect(picnic.description).toContain("cold lunch");
      expect(picnic.description).not.toMatch(/sauna|breakfast/i);
      expect(JSON.parse(picnic.includes ?? "[]")).toContain("Cold lunch");
    });
  });

  describe("experiences.bySlug", () => {
    it("returns the German picnic landing page", async () => {
      const result = await caller.experiences.bySlug({ lang: "de", slug: "picknick-im-wald" });
      expect(result?.title).toBe("Picknick im Wald");
      expect(result?.galleryImages).toBeTruthy();
    });

    it("does not expose the retired sauna and breakfast arrangements", async () => {
      const waldAuszeit = await caller.experiences.bySlug({ lang: "de", slug: "wald-auszeit" });
      const romantik = await caller.experiences.bySlug({ lang: "de", slug: "romantik-auszeit" });
      expect(waldAuszeit).toBeNull();
      expect(romantik).toBeNull();
    });

    it("returns the English picnic landing page", async () => {
      const result = await caller.experiences.bySlug({ lang: "en", slug: "forest-picnic" });
      expect(result?.title).toBe("Forest Picnic");
    });
  });
});
