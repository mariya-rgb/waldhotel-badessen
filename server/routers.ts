import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getHotelInfo, getRooms, getExtras, getRoomNotes,
  getWellnessOfferings, getWellnessHours, getWellnessPrices,
  getLocationSections, getPageMeta, getAllPagesMeta,
  createContactMessage,
} from "./db";
import { notifyOwner } from "./_core/notification";

const langInput = z.object({ lang: z.enum(["de", "en"]) });

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============================================================
  // Hotel Content API – public procedures
  // ============================================================

  hotel: router({
    /** Get general hotel info for a language */
    info: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getHotelInfo(input.lang);
      }),
  }),

  rooms: router({
    /** Get all room types for a language */
    list: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getRooms(input.lang);
      }),

    /** Get extras/additional services */
    extras: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getExtras(input.lang);
      }),

    /** Get room notes */
    notes: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getRoomNotes(input.lang);
      }),
  }),

  wellness: router({
    /** Get wellness offerings */
    offerings: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getWellnessOfferings(input.lang);
      }),

    /** Get opening hours */
    hours: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getWellnessHours(input.lang);
      }),

    /** Get wellness prices */
    prices: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getWellnessPrices(input.lang);
      }),
  }),

  location: router({
    /** Get location sections (nature, culture, health) */
    sections: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getLocationSections(input.lang);
      }),
  }),

  contact: router({
    /** Submit a contact form message */
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2, "Name ist erforderlich"),
        email: z.string().email("Ungültige E-Mail-Adresse"),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
        lang: z.enum(["de", "en"]).default("de"),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await createContactMessage({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          subject: input.subject || null,
          message: input.message,
          lang: input.lang,
        });

        // Notify hotel owner
        const subjectLine = input.subject || (input.lang === "de" ? "Neue Anfrage" : "New Inquiry");
        await notifyOwner({
          title: `Neue Kontaktanfrage: ${subjectLine}`,
          content: [
            `Name: ${input.name}`,
            `E-Mail: ${input.email}`,
            input.phone ? `Telefon: ${input.phone}` : "",
            `Betreff: ${subjectLine}`,
            `---`,
            input.message,
          ].filter(Boolean).join("\n"),
        });

        return { success: true };
      }),
  }),

  pages: router({
    /** Get meta data for a specific page */
    meta: publicProcedure
      .input(z.object({ lang: z.enum(["de", "en"]), slug: z.string() }))
      .query(async ({ input }) => {
        return getPageMeta(input.lang, input.slug);
      }),

    /** Get all pages meta for a language */
    allMeta: publicProcedure
      .input(langInput)
      .query(async ({ input }) => {
        return getAllPagesMeta(input.lang);
      }),
  }),
});

export type AppRouter = typeof appRouter;
