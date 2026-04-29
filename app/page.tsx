import type { Metadata } from "next";
import { fetchPrayerTimes } from "@/lib/api/prayer-times";
import { fetchAyatOfDay } from "@/lib/api/quran";
import { fetchHadithOfDay } from "@/lib/api/hadith";
import { DEFAULT_CITY } from "@/lib/cities";
import { AyatOfDayCard } from "@/components/dashboard/AyatOfDayCard";
import { HadithOfDayCard } from "@/components/dashboard/HadithOfDayCard";
import { PrayerTimesCard } from "@/components/dashboard/PrayerTimesCard";
import { HijriDateCard } from "@/components/dashboard/HijriDateCard";
import { QiblaCard } from "@/components/dashboard/QiblaCard";
import { getServerTranslator } from "@/lib/i18n/server";
import { gregorianToBengali } from "@/lib/bengali-calendar";
import {
  hijriEraSuffix,
  localizedHijriDay,
  localizedHijriMonth,
  localizedHijriYear,
} from "@/lib/hijri";

// Re-render at most every 30 minutes so the "Next prayer in …" countdown stays fresh
// while still serving from Vercel's CDN for the rest of the time.
export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("nav.dashboard"),
    description: t("dashboard.metaDescription"),
  };
}

export default async function DashboardPage() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const [prayer, ayat, hadith] = await Promise.all([
    fetchPrayerTimes(DEFAULT_CITY.slug),
    fetchAyatOfDay(),
    fetchHadithOfDay(),
  ]);

  const cityName = locale === "bn" ? DEFAULT_CITY.nameBangla : DEFAULT_CITY.name;
  const bengali = gregorianToBengali();
  const bengaliPretty =
    locale === "bn"
      ? `${bengali.dayBn} ${bengali.monthBn} ${bengali.yearBn} বঙ্গাব্দ`
      : `${bengali.day} ${bengali.monthEn} ${bengali.year} BS`;
  const hijriPretty = `${localizedHijriDay(prayer.hijri, locale)} ${localizedHijriMonth(
    prayer.hijri,
    locale
  )} ${localizedHijriYear(prayer.hijri, locale)} ${hijriEraSuffix(locale)}`;

  return (
    <div className="bg-hero-radial">
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-12 sm:px-8 sm:pt-20">
        <p className={`section-title ${fontClass}`}>{t("dashboard.greeting")}</p>
        <h1 className={`mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl ${fontClass}`}>
          {t("dashboard.heroTitle")}
        </h1>
        <p className={`mt-3 max-w-2xl text-base text-ink-muted sm:text-lg ${fontClass}`}>
          {t("dashboard.heroSubtitle")}{" "}
          <span className="text-ink">{hijriPretty}</span>
          <span className="mx-2 text-ink-subtle">·</span>
          <span className="text-ink">{bengaliPretty}</span>
          <span className="mx-2 text-ink-subtle">·</span>
          {cityName}
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 sm:gap-6 lg:grid-cols-3">
        <PrayerTimesCard city={cityName} timings={prayer.timings} />
        <HijriDateCard hijri={prayer.hijri} gregorian={prayer.date} />
        <AyatOfDayCard ayat={ayat} />
        <HadithOfDayCard hadith={hadith} />
        <QiblaCard />
      </section>
    </div>
  );
}
