// Shared domain types. Kept narrow on purpose — only fields the UI actually consumes.

export type PrayerName =
  | "Fajr"
  | "Sunrise"
  | "Dhuhr"
  | "Asr"
  | "Maghrib"
  | "Isha";

export interface PrayerTime {
  name: PrayerName;
  // 24h "HH:mm" string as returned by the upstream API after we normalize it.
  time: string;
}

export interface HijriDate {
  day: string;
  month: string; // English transliteration, e.g. "Dhū al-Qaʿdah"
  monthNumber: number; // 1–12, used as the stable key for localization
  year: string;
  weekday: string; // English, e.g. "Wednesday"
}

export interface PrayerTimesResponse {
  date: string; // ISO date in Asia/Dhaka
  hijri: HijriDate;
  timings: PrayerTime[];
  location: { city: string; country: string };
}

export interface AyatOfDay {
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  bangla: string;
  english?: string;
}

export interface HadithOfDay {
  collection: string; // e.g. "Sahih al-Bukhari"
  reference: string; // e.g. "Book 2, Hadith 14"
  arabic?: string;
  bangla: string;
  english?: string;
}

export interface BangladeshCity {
  slug: string;
  name: string;
  nameBangla: string;
  // Aladhan API supports city+country lookups; lat/lng kept for future expansion.
  latitude: number;
  longitude: number;
}
