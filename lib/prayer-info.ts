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
  Sunrise: [], // not a prayer, kept so the type stays exhaustive
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
  Isha: "Fajr", // technically next day's Fajr, caller should label appropriately
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

// Per-prayer "sky" gradients, vertical sweep from zenith to horizon, matching
// each prayer's natural lighting. Applied to the "Next Prayer" hero banner.
// Sunrise is included as a graceful fallback even though `getNextPrayer()`
// filters it out (it's not a prayer, just a marker).
export const PRAYER_GRADIENTS: Record<PrayerName, string> = {
  Fajr:
    "linear-gradient(180deg, #050714 0%, #0D1333 25%, #1A1A4A 45%, #2D2060 65%, #6B3A7D 82%, #C4607A 93%, #E8A090 100%)",
  Sunrise:
    "linear-gradient(180deg, #1A1A4A 0%, #6B3A7D 30%, #C4607A 60%, #E8A090 85%, #F5D090 100%)",
  Dhuhr:
    "linear-gradient(180deg, #0A3D7A 0%, #1565C0 18%, #2196C9 38%, #5BB8D4 58%, #A8D8E8 75%, #D4EEF7 88%, #F0F8FF 100%)",
  Asr:
    "linear-gradient(180deg, #1A4A7A 0%, #2B72A8 22%, #4A9BAD 42%, #7EC8A0 60%, #C9B86A 76%, #E8C94A 88%, #F5E090 100%)",
  Maghrib:
    "linear-gradient(180deg, #1A0A3A 0%, #3D1560 20%, #7B2560 40%, #C0403A 58%, #E8702A 72%, #F5A030 84%, #F5C84A 94%, #F5E0A0 100%)",
  Isha:
    "linear-gradient(180deg, #020408 0%, #050D1A 20%, #080F2E 40%, #0C1845 58%, #0F1F5C 75%, #102040 88%, #0A1828 100%)",
};
