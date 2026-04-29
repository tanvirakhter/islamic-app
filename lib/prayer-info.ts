import type { Locale } from "@/lib/i18n/config";
import type { PrayerName, PrayerTime } from "@/types";
import { toBanglaDigits } from "@/lib/bengali-calendar";

// Rakat structure for the five daily prayers (Sunni Hanafi convention,
// the prevailing fiqh in Bangladesh). Each unit has a count + a category.
export type RakatCategory =
  | "sunnah"      // Sunnah Mu'akkadah / Ghair Mu'akkadah
  | "fard"
  | "nafl"
  | "witr";

export interface RakatUnit {
  count: number;
  category: RakatCategory;
}

const RAKATS: Record<PrayerName, RakatUnit[]> = {
  Fajr: [
    { count: 2, category: "sunnah" },
    { count: 2, category: "fard" },
  ],
  Sunrise: [], // not a prayer — kept so the type stays exhaustive
  Dhuhr: [
    { count: 4, category: "sunnah" },
    { count: 4, category: "fard" },
    { count: 2, category: "sunnah" },
    { count: 2, category: "nafl" },
  ],
  Asr: [
    { count: 4, category: "sunnah" },
    { count: 4, category: "fard" },
  ],
  Maghrib: [
    { count: 3, category: "fard" },
    { count: 2, category: "sunnah" },
    { count: 2, category: "nafl" },
  ],
  Isha: [
    { count: 4, category: "sunnah" },
    { count: 4, category: "fard" },
    { count: 2, category: "sunnah" },
    { count: 2, category: "nafl" },
    { count: 3, category: "witr" },
  ],
};

const CATEGORY_LABEL: Record<RakatCategory, Record<Locale, string>> = {
  sunnah: { en: "Sunnah", bn: "সুন্নাহ" },
  fard: { en: "Fard", bn: "ফরজ" },
  nafl: { en: "Nafl", bn: "নফল" },
  witr: { en: "Witr", bn: "বিতর" },
};

export interface FormattedRakat {
  count: string; // localized digits
  label: string; // localized category
  raw: RakatUnit;
}

export function getRakats(prayer: PrayerName, locale: Locale): FormattedRakat[] {
  return RAKATS[prayer].map((unit) => ({
    count: locale === "bn" ? toBanglaDigits(unit.count) : String(unit.count),
    label: CATEGORY_LABEL[unit.category][locale],
    raw: unit,
  }));
}

export function totalRakats(prayer: PrayerName): number {
  return RAKATS[prayer].reduce((sum, u) => sum + u.count, 0);
}

// "End time" of each prayer = start of the next prayer (or marker, in Fajr's case).
// Sunrise is the cutoff for Fajr; Isha extends until Fajr of the following day.
const ENDS_AT: Record<PrayerName, PrayerName | null> = {
  Fajr: "Sunrise",
  Sunrise: null, // not a prayer
  Dhuhr: "Asr",
  Asr: "Maghrib",
  Maghrib: "Isha",
  Isha: "Fajr", // technically next day's Fajr — caller should label appropriately
};

export function getEndTime(
  prayer: PrayerName,
  timings: PrayerTime[]
): { time: string; nextPrayer: PrayerName } | null {
  const next = ENDS_AT[prayer];
  if (!next) return null;
  const target = timings.find((t) => t.name === next);
  return target ? { time: target.time, nextPrayer: next } : null;
}
