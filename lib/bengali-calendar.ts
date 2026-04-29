// Bangladesh Bangabda (Bengali) calendar — government-revised version (2019).
// Rules:
//   • New Year (Pohela Boishakh) = 14 April Gregorian, every year.
//   • Boishakh – Bhadro (months 1–5): 31 days each.
//   • Ashwin – Falgun (months 6–11): 30 days each.
//   • Chaitro (month 12): 30 days, except 31 in years where Gregorian Feb has 29
//     (i.e. when the *upcoming* Gregorian year is a leap year — keeps 1 Boishakh = Apr 14).
//
// This is a different system from the older Indian Bengali calendar; we use the BD one
// because the app is for Bangladesh.

export const BENGALI_MONTHS_EN = [
  "Boishakh",
  "Joishtho",
  "Ashar",
  "Srabon",
  "Bhadro",
  "Ashwin",
  "Kartik",
  "Ogrohayon",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitro",
] as const;

export const BENGALI_MONTHS_BN = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
] as const;

export const BENGALI_WEEKDAYS_EN = [
  "Robibar",
  "Sombar",
  "Mongolbar",
  "Budhbar",
  "Brihospotibar",
  "Shukrobar",
  "Shonibar",
] as const;

export const BENGALI_WEEKDAYS_BN = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
] as const;

export interface BengaliDate {
  day: number;
  month: number; // 1-indexed
  year: number;
  monthEn: string;
  monthBn: string;
  weekdayEn: string;
  weekdayBn: string;
  // Display-ready strings.
  dayBn: string; // "১৬"
  yearBn: string; // "১৪৩২"
}

// English digits → Bangla digits.
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBanglaDigits(input: number | string): string {
  return String(input)
    .split("")
    .map((ch) => (ch >= "0" && ch <= "9" ? BN_DIGITS[Number(ch)] : ch))
    .join("");
}

// True if the *Gregorian* year `y` is a leap year (used for Chaitro length).
function isGregorianLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// Lengths of each Bangabda month for a year that begins on 14 Apr `gYear`.
function bengaliMonthLengths(gYear: number): number[] {
  // Chaitro (month 12) ends on 13 Apr of (gYear+1). It gets 31 days when
  // (gYear+1) is a Gregorian leap year — that's the BD government rule.
  const chaitroLength = isGregorianLeap(gYear + 1) ? 31 : 30;
  return [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, chaitroLength];
}

/**
 * Convert a Gregorian Date (interpreted in Asia/Dhaka) to the Bangladesh
 * Bangabda date. The "current Bangabda year" begins on 14 Apr of the
 * Gregorian year that is `BangabdaYear − 593`.
 */
export function gregorianToBengali(date: Date = new Date()): BengaliDate {
  // Anchor to Asia/Dhaka so the date doesn't flip for users in other timezones.
  const dhakaParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  }).formatToParts(date);

  const get = (t: string) => dhakaParts.find((p) => p.type === t)?.value ?? "";
  const gYear = Number(get("year"));
  const gMonth = Number(get("month")); // 1–12
  const gDay = Number(get("day"));
  const weekdayEnLong = get("weekday"); // e.g. "Wednesday"

  // Map JS weekday names to our 0-indexed Sunday-first arrays.
  const WEEKDAY_INDEX: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const weekdayIdx = WEEKDAY_INDEX[weekdayEnLong] ?? 0;

  // Determine which Bangabda year we're in. The year starts on 14 April.
  // If we're before 14 Apr, we're still in the previous Bangabda year.
  const isBeforeNewYear = gMonth < 4 || (gMonth === 4 && gDay < 14);
  const startGYear = isBeforeNewYear ? gYear - 1 : gYear;
  const bYear = startGYear + 593; // e.g. 2026 → 1432 (then +1 once we cross Apr 14)

  // Days elapsed since 14 Apr `startGYear`.
  const newYearMs = Date.UTC(startGYear, 3, 14); // Apr = month index 3
  const todayMs = Date.UTC(gYear, gMonth - 1, gDay);
  const daysSinceStart = Math.floor((todayMs - newYearMs) / 86_400_000);

  // Walk through month lengths to find current month + day.
  const lengths = bengaliMonthLengths(startGYear);
  let remaining = daysSinceStart;
  let monthIdx = 0;
  for (let i = 0; i < 12; i += 1) {
    if (remaining < lengths[i]) {
      monthIdx = i;
      break;
    }
    remaining -= lengths[i];
  }
  const day = remaining + 1;
  const month = monthIdx + 1;

  return {
    day,
    month,
    year: bYear,
    monthEn: BENGALI_MONTHS_EN[monthIdx],
    monthBn: BENGALI_MONTHS_BN[monthIdx],
    weekdayEn: BENGALI_WEEKDAYS_EN[weekdayIdx],
    weekdayBn: BENGALI_WEEKDAYS_BN[weekdayIdx],
    dayBn: toBanglaDigits(day),
    yearBn: toBanglaDigits(bYear),
  };
}
