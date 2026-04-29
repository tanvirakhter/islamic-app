import type { HadithOfDay } from "@/types";

// Curated, deterministic "Hadith of the Day" pool. Public-domain authentic narrations
// with Bangla translation. Using a static pool keeps the dashboard zero-cost and
// removes a public-API dependency — a real deployment can swap this for a DB table.
const HADITH_POOL: HadithOfDay[] = [
  {
    collection: "Sahih al-Bukhari",
    reference: "Book 1, Hadith 1",
    arabic: "إنما الأعمال بالنيات",
    bangla: "নিশ্চয়ই সকল কাজের ফলাফল নিয়তের উপর নির্ভর করে।",
    english: "Actions are judged by intentions.",
  },
  {
    collection: "Sahih Muslim",
    reference: "Book 1, Hadith 67",
    bangla: "তোমাদের কেউ ততক্ষণ পর্যন্ত প্রকৃত ঈমানদার হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তা-ই পছন্দ করবে যা সে নিজের জন্য পছন্দ করে।",
    english:
      "None of you truly believes until he loves for his brother what he loves for himself.",
  },
  {
    collection: "Sahih al-Bukhari",
    reference: "Book 73, Hadith 47",
    bangla: "যে ব্যক্তি আল্লাহ্‌ ও আখিরাতে বিশ্বাস করে সে যেন উত্তম কথা বলে অথবা চুপ থাকে।",
    english:
      "Whoever believes in Allah and the Last Day should speak good or remain silent.",
  },
  {
    collection: "Sunan Abi Dawud",
    reference: "Book 43, Hadith 4798",
    bangla: "সর্বোত্তম মুমিন তারা, যাদের চরিত্র সবচেয়ে সুন্দর।",
    english: "The best of the believers are those with the best character.",
  },
  {
    collection: "Sahih Muslim",
    reference: "Book 45, Hadith 84",
    bangla: "আল্লাহ্‌ দয়ালু এবং তিনি দয়াকে ভালোবাসেন।",
    english: "Allah is gentle and loves gentleness.",
  },
  {
    collection: "Jami` at-Tirmidhi",
    reference: "Book 27, Hadith 2004",
    bangla: "যেখানেই থাকো আল্লাহকে ভয় করো; খারাপ কাজের পরে ভালো কাজ করো, তা সেটিকে মুছে দেবে।",
    english:
      "Fear Allah wherever you are, and follow up a bad deed with a good one — it will wipe it out.",
  },
  {
    collection: "Sahih al-Bukhari",
    reference: "Book 76, Hadith 437",
    bangla: "দুটি নিয়ামত আছে, অনেক মানুষ যেগুলোতে ক্ষতিগ্রস্ত: সুস্থতা ও অবসর।",
    english:
      "Two blessings which many people waste: good health and free time.",
  },
];

export async function fetchHadithOfDay(): Promise<HadithOfDay> {
  // Same day-of-year scheme used for Ayat — keeps the page deterministic per day.
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start) / 86_400_000);
  return HADITH_POOL[dayOfYear % HADITH_POOL.length];
}
