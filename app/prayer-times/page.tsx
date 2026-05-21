import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { fetchPrayerTimes } from "@/lib/api/prayer-times";
import { BANGLADESH_CITIES, DEFAULT_CITY, findCityBySlug } from "@/lib/cities";
import { cn } from "@/lib/utils";
import { getServerTranslator } from "@/lib/i18n/server";
import { JummaCard } from "@/components/prayer/JummaCard";
import { PrayerTimesCard } from "@/components/dashboard/PrayerTimesCard";

export const revalidate = 1800;

interface Props {
  searchParams: { city?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const city = findCityBySlug(searchParams.city ?? "") ?? DEFAULT_CITY;
  const { t, locale } = getServerTranslator();
  const cityName = locale === "bn" ? city.nameBangla : city.name;
  return {
    title: `${t("page.prayerTimes.titlePrefix")} ${cityName}`,
    description: `${t("page.prayerTimes.titlePrefix")} ${cityName}, Bangladesh.`,
  };
}

export default async function PrayerTimesPage({ searchParams }: Props) {
  const city = findCityBySlug(searchParams.city ?? "") ?? DEFAULT_CITY;
  const data = await fetchPrayerTimes(city.slug);
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const cityName = locale === "bn" ? city.nameBangla : city.name;

  return (
    <>
      <PageHeader
        eyebrow={t("page.prayerTimes.eyebrow")}
        title={`${t("page.prayerTimes.titlePrefix")} ${cityName}`}
        description={`${data.hijri.day} ${data.hijri.month} ${data.hijri.year} AH · ${data.location.country}`}
      />

      <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <p className={`section-title mb-3 ${fontClass}`}>{t("common.chooseCity")}</p>
        <div className="flex flex-wrap gap-2">
          {BANGLADESH_CITIES.map((c) => {
            const active = c.slug === city.slug;
            const primary = locale === "bn" ? c.nameBangla : c.name;
            const secondary = locale === "bn" ? c.name : c.nameBangla;
            return (
              <Link
                key={c.slug}
                href={`/prayer-times?city=${c.slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-brand-600 text-white"
                    : "border border-black/5 bg-white text-ink hover:bg-black/5"
                )}
              >
                <span className={locale === "bn" ? "font-bangla" : ""}>{primary}</span>{" "}
                <span className="text-xs opacity-70">· {secondary}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <JummaCard city={cityName} timings={data.timings} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <PrayerTimesCard city={cityName} timings={data.timings} />
      </section>
    </>
  );
}
