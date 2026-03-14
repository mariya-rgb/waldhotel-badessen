/**
 * Custom hook to fetch hotel data from the database via tRPC.
 * Falls back to static i18n data while loading or on error.
 */
import { useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import type { Lang } from '@/lib/i18n';

export function useHotelInfo(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.hotel.info.useQuery(langInput);
}

export function useRooms(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.rooms.list.useQuery(langInput);
}

export function useExtras(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.rooms.extras.useQuery(langInput);
}

export function useRoomNotes(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.rooms.notes.useQuery(langInput);
}

export function useWellnessOfferings(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.wellness.offerings.useQuery(langInput);
}

export function useWellnessHours(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.wellness.hours.useQuery(langInput);
}

export function useWellnessPrices(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.wellness.prices.useQuery(langInput);
}

export function useLocationSections(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.location.sections.useQuery(langInput);
}

export function usePageMeta(lang: Lang, slug: string) {
  const input = useMemo(() => ({ lang, slug }), [lang, slug]);
  return trpc.pages.meta.useQuery(input);
}

export function useExperiences(lang: Lang) {
  const langInput = useMemo(() => ({ lang }), [lang]);
  return trpc.experiences.list.useQuery(langInput);
}

export function useExperienceBySlug(lang: Lang, slug: string) {
  const input = useMemo(() => ({ lang, slug }), [lang, slug]);
  return trpc.experiences.bySlug.useQuery(input);
}
