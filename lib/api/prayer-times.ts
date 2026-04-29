import type {
  HijriDate,
  PrayerName,
  PrayerTime,
  PrayerTimesResponse,
} from "@/types";
import { DEFAULT_CITY, findCityBySlug } from "@/lib/cities";

// Aladhan public API. Docs: https://aladhan.com/prayer-times-api
// We use `timingsByCity` so we don't have to maintain lat/lng lookups server-side.
// `method=1` is the University of Islamic Sciences, Karachi calculation —
// the convention typically followed by Bangladesh's Islamic Foundation.
const ALADHAN_BASE = "https://api.aladhan.com/v1";
const CALCULATION_METHOD = 1;

const PRAYER_ORDER: PrayerName[] = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface AladhanDate {
  readable: string;
  gregorian: { date: string; weekday: { en: string } };
  hijri: {
    day: string;
    month: { en: string; ar: string; number: number };
    year: string;
    weekday: { en: string; ar: string };
  };
}

interface AladhanResponse {
  code: number;
  status: string;
  data: { timings: AladhanTimings; date: AladhanDate };
}

// Aladhan returns "HH:mm (BST)" — strip the trailing timezone tag for display logic.
function normalizeTime(raw: string): string {
  return raw.split(" ")[0]?.trim() ?? raw;
}

function toHijri(date: AladhanDate): HijriDate {
  return {
    day: date.hijri.day,
    month: date.hijri.month.en,
    monthNumber: date.hijri.month.number,
    year: date.hijri.year,
    weekday: date.hijri.weekday.en,
  };
}

function toTimings(timings: AladhanTimings): PrayerTime[] {
  return PRAYER_ORDER.map((name) => ({
    name,
    time: normalizeTime(timings[name] ?? ""),
  }));
}

/**
 * Fetch today's prayer times for a Bangladesh city.
 * Cached for 1 hour on the server so we don't hammer the upstream API on every render.
 */
export async function fetchPrayerTimes(
  citySlug: string = DEFAULT_CITY.slug
): Promise<PrayerTimesResponse> {
  const city = findCityBySlug(citySlug) ?? DEFAULT_CITY;

  const url = new URL(`${ALADHAN_BASE}/timingsByCity`);
  url.searchParams.set("city", city.name);
  url.searchParams.set("country", "Bangladesh");
  url.searchParams.set("method", String(CALCULATION_METHOD));

  const res = await fetch(url.toString(), {
    // Next.js will revalidate the cached response every hour.
    next: { revalidate: 3600, tags: [`prayer-times:${city.slug}`] },
  });

  if (!res.ok) {
    throw new Error(`Aladhan request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as AladhanResponse;
  if (json.code !== 200) {
    throw new Error(`Aladhan returned non-200 code: ${json.code}`);
  }

  return {
    date: json.data.date.gregorian.date,
    hijri: toHijri(json.data.date),
    timings: toTimings(json.data.timings),
    location: { city: city.name, country: "Bangladesh" },
  };
}

/**
 * Pick the next upcoming prayer relative to now (Asia/Dhaka).
 * Useful for the "Next prayer in …" hero on the dashboard.
 * Sunrise is intentionally excluded — it's not a prayer, just a marker.
 */
export function getNextPrayer(timings: PrayerTime[], now: Date = new Date()): {
  prayer: PrayerTime;
  minutesUntil: number;
} | null {
  // Convert "now" to Dhaka HH:mm for direct string comparison with API output.
  const dhakaNow = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now); // "HH:mm"

  const [nowH, nowM] = dhakaNow.split(":").map(Number);
  const nowMinutes = nowH * 60 + nowM;

  const candidates = timings.filter((t) => t.name !== "Sunrise");

  for (const prayer of candidates) {
    const [h, m] = prayer.time.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) continue;
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > nowMinutes) {
      return { prayer, minutesUntil: prayerMinutes - nowMinutes };
    }
  }

  // After Isha — next prayer is tomorrow's Fajr.
  const fajr = candidates.find((t) => t.name === "Fajr");
  if (!fajr) return null;
  const [fh, fm] = fajr.time.split(":").map(Number);
  const fajrMinutes = fh * 60 + fm;
  return { prayer: fajr, minutesUntil: 24 * 60 - nowMinutes + fajrMinutes };
}
