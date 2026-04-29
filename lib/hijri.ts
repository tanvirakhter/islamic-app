import type { Locale } from "@/lib/i18n/config";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import type { HijriDate } from "@/types";

// Bangla names for the 12 Hijri months. Indexed 1–12 to match Aladhan's month.number.
// Spellings follow Bangladesh Islamic Foundation conventions.
const HIJRI_MONTHS_BN: Record<number, string> = {
  1: "মুহাররম",
  2: "সফর",
  3: "রবিউল আউয়াল",
  4: "রবিউস সানি",
  5: "জমাদিউল আউয়াল",
  6: "জমাদিউস সানি",
  7: "রজব",
  8: "শাবান",
  9: "রমজান",
  10: "শাওয়াল",
  11: "জিলকদ",
  12: "জিলহজ্জ",
};

// English weekday (as Aladhan returns it) → Bangla weekday.
const WEEKDAYS_BN: Record<string, string> = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

export function localizedHijriMonth(hijri: HijriDate, locale: Locale): string {
  if (locale === "bn") {
    return HIJRI_MONTHS_BN[hijri.monthNumber] ?? hijri.month;
  }
  return hijri.month;
}

export function localizedHijriDay(hijri: HijriDate, locale: Locale): string {
  return locale === "bn" ? toBanglaDigits(hijri.day) : hijri.day;
}

export function localizedHijriYear(hijri: HijriDate, locale: Locale): string {
  return locale === "bn" ? toBanglaDigits(hijri.year) : hijri.year;
}

export function localizedHijriWeekday(hijri: HijriDate, locale: Locale): string {
  if (locale === "bn") {
    return WEEKDAYS_BN[hijri.weekday] ?? hijri.weekday;
  }
  return hijri.weekday;
}

// "AH" suffix — কেপ্টে "হিজরি" reads more natural in Bangla.
export function hijriEraSuffix(locale: Locale): string {
  return locale === "bn" ? "হিজরি" : "AH";
}
