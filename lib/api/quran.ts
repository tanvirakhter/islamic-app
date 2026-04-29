import type { AyatOfDay } from "@/types";

// alquran.cloud is free and supports a Bangla translation edition (`bn.bengali`).
// We use deterministic "ayat of the day" so the same verse shows for everyone on a given day.
const QURAN_BASE = "https://api.alquran.cloud/v1";
const TOTAL_AYAH = 6236;

// Pull both Arabic + Bangla in one batched request via the `editions` endpoint.
const EDITIONS = ["quran-uthmani", "bn.bengali", "en.sahih"].join(",");

function ayahForToday(): number {
  // Day-of-year based pick — stable per day, varies across the year.
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = now.getTime() - start;
  const dayOfYear = Math.floor(diff / 86_400_000);
  return (dayOfYear % TOTAL_AYAH) + 1;
}

interface AyahEdition {
  number: number;
  text: string;
  numberInSurah: number;
  surah: { number: number; name: string; englishName: string };
  edition: { identifier: string; language: string };
}

export async function fetchAyatOfDay(): Promise<AyatOfDay> {
  const ayah = ayahForToday();
  const res = await fetch(`${QURAN_BASE}/ayah/${ayah}/editions/${EDITIONS}`, {
    next: { revalidate: 60 * 60 * 6 }, // refresh a few times a day; content rarely changes
  });
  if (!res.ok) throw new Error(`Quran API failed: ${res.status}`);
  const json = (await res.json()) as { data: AyahEdition[] };

  const arabic = json.data.find((e) => e.edition.identifier === "quran-uthmani");
  const bangla = json.data.find((e) => e.edition.identifier === "bn.bengali");
  const english = json.data.find((e) => e.edition.identifier === "en.sahih");

  if (!arabic || !bangla) {
    throw new Error("Quran API returned incomplete editions");
  }

  return {
    surah: arabic.surah.englishName,
    surahNumber: arabic.surah.number,
    ayahNumber: arabic.numberInSurah,
    arabic: arabic.text,
    bangla: bangla.text,
    english: english?.text,
  };
}
