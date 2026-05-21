import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchPrayerTimes, getNextPrayer } from "@/lib/api/prayer-times";
import { fetchAyatOfDay } from "@/lib/api/quran";
import { fetchHadithOfDay } from "@/lib/api/hadith";
import { DEFAULT_CITY } from "@/lib/cities";
import { PRAYER_GRADIENTS } from "@/lib/prayer-info";
import { AyatOfDayCard } from "@/components/dashboard/AyatOfDayCard";
import { HadithOfDayCard } from "@/components/dashboard/HadithOfDayCard";
import { HijriDateCard } from "@/components/dashboard/HijriDateCard";
import { ScrollGallery } from "@/components/ScrollGallery";
import { FivePillars } from "@/components/FivePillars";
import { ClosingCta } from "@/components/dashboard/ClosingCta";
import { getServerTranslator } from "@/lib/i18n/server";

// 24h "HH:mm" → "3:49 AM". Inline so the hero stays self-contained.
function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

// Minutes → "1h 39m" / "39m".
function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m}m` : `${h}h ${m}m`;
}

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

  const prayerName = (name: string) =>
    t(`prayer.${name}` as "prayer.Fajr") ?? name;

  // Hero card data, pulled from existing prayer state.
  const next = getNextPrayer(prayer.timings);

  // Headline split into words so each can fade in one after another.
  const headlineWords: { text: string; accent: boolean }[] = [
    ...t("dashboard.heroTitlePre")
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w, accent: false })),
    { text: t("dashboard.heroTitleAccent"), accent: true },
    ...t("dashboard.heroTitlePost")
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w, accent: false })),
  ];

  return (
    <div
      className="-mt-20"
      style={{ backgroundColor: "#f4f6f4" }}
    >
      {/* ───────────────  SPLIT HERO  ─────────────── */}
      {/* Pulled up under the floating navbar (-mt-20); the extra top padding
          keeps the content clear of the bar while the background runs to the top. */}
      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pt-24">
        {/* Faint crosshatch grid, fading out toward the right. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,61,36,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,61,36,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 0% 40%, black, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 0% 40%, black, transparent 75%)",
          }}
        />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* LEFT, marquee tags, headline, body, dual CTA (~45%, min 420px).
              Vertically centered against the taller right column. */}
          <div className="lg:min-w-[420px] lg:flex-[0_0_45%] lg:self-center lg:-translate-y-16">
            {/* Salaam greeting */}
            <p
              className={`mb-5 animate-fade-in-up text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a] ${fontClass}`}
            >
              {t("dashboard.greeting")}
            </p>

            {/* Headline, words fade in one after another */}
            <h1
              className={`max-w-xl text-5xl font-extrabold leading-[1.1] text-[#111111] sm:text-6xl lg:text-[72px] ${fontClass}`}
            >
              {headlineWords.map((word, i) => (
                <Fragment key={i}>
                  <span
                    className="inline-block animate-fade-in-up"
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {word.accent ? (
                      <em className="italic text-[#0f3d24]">{word.text}</em>
                    ) : (
                      word.text
                    )}
                  </span>
                  {i < headlineWords.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h1>

            <p
              className={`mt-6 max-w-[380px] animate-fade-in-up text-base leading-relaxed text-[#6b7280] ${fontClass}`}
              style={{ animationDelay: "160ms" }}
            >
              {t("hero.bodyCopy")}
            </p>

            {/* CTA row */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: "240ms" }}
            >
              {/* Availability chip */}
              <div className="flex items-center gap-2.5 rounded-full border border-[#e5e7eb] bg-white py-2 pl-2 pr-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0f3d24] text-base text-white">
                  ☽
                </span>
                <div className="leading-tight">
                  <p className={`text-[13px] font-semibold text-[#111111] ${fontClass}`}>
                    {t("hero.startJourney")}
                  </p>
                  <p className={`flex items-center gap-1.5 text-[11px] text-[#16a34a] ${fontClass}`}>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    {t("hero.freeToUse")}
                  </p>
                </div>
              </div>

              <p className={`max-w-[180px] text-left text-[13px] leading-snug text-[#6b7280] ${fontClass}`}>
                {t("hero.usedByPre")}{" "}
                <span className="font-bold text-[#111111]">{t("hero.usedByBold")}</span>{" "}
                {t("hero.usedByPost")}
              </p>
            </div>
          </div>

          {/* RIGHT, card area. Two flex columns so cards can have explicit,
              asymmetric heights with Card 5 filling the remaining space (no gap).
              60px→20px downward offset on desktop; columns stack naturally below. */}
          <div className="flex w-full gap-4 lg:mt-[20px]">
            {/* LEFT column (wider): photo (tall) → testimonial (medium) → stat (short) */}
            <div className="flex flex-[1.28] flex-col gap-4">
              {/* Card 1, mosque photo (420px) */}
              <div
                className="relative min-h-[14rem] animate-fade-in-up overflow-hidden rounded-[20px] bg-[#e3e9e4] shadow-card lg:h-[420px] lg:min-h-0"
                style={{ animationDelay: "200ms" }}
              >
                <Image
                  src="/images/kaaba-kiswah.jpeg"
                  alt="The Kiswah, gold-embroidered cover of the Kaaba"
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className="object-cover object-center animate-ken-burns"
                />
              </div>

              {/* Card 2, Next Prayer countdown (200px).
                  Background is the per-wakt sky gradient; a dark scrim keeps
                  the text legible on the lighter horizons. */}
              {next && (
                <Link
                  href="/prayer-times"
                  className="group relative flex min-h-[200px] animate-fade-in-up flex-col justify-between overflow-hidden rounded-[20px] p-5 text-white shadow-card lg:h-[200px] lg:min-h-0"
                  style={{ background: PRAYER_GRADIENTS[next.prayer.name], animationDelay: "280ms" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40"
                  />
                  <div className="relative flex items-start justify-between [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
                    <div>
                      <p className={`text-xs uppercase tracking-[0.14em] text-white/80 ${fontClass}`}>
                        {t("card.nextPrayer")}
                      </p>
                      <p className={`mt-1 text-3xl font-bold tracking-tight ${fontClass}`}>
                        {prayerName(next.prayer.name)}
                      </p>
                      <p className={`text-sm text-white/85 ${fontClass}`}>
                        {t("card.at")} {to12h(next.prayer.time)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs uppercase tracking-[0.14em] text-white/80 ${fontClass}`}>
                        {t("card.in")}
                      </p>
                      <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight">
                        {formatCountdown(next.minutesUntil)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`relative inline-flex items-center gap-1 text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] ${fontClass}`}
                  >
                    {t("common.fullTimetable")}
                  </span>
                </Link>
              )}

              {/* Card 3, Qibla Finder promo over a worshippers background */}
              <Link
                href="/qibla"
                className="group relative flex flex-1 animate-fade-in-up flex-col justify-between overflow-hidden rounded-[20px] bg-[#0f3d24] p-5 text-white shadow-card"
                style={{ animationDelay: "360ms" }}
              >
                <Image
                  src="/images/qibla.jpeg"
                  alt="Worshippers in concentric rows of prayer"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className="object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/70" />
                <div className="relative [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-white/80 ${fontClass}`}>
                    {t("page.qibla.eyebrow")}
                  </p>
                  <p className={`mt-1 text-lg font-bold leading-snug text-white ${fontClass}`}>
                    {t("page.qibla.title")}
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed text-white/85 ${fontClass}`}>
                    {t("page.qibla.description")}
                  </p>
                </div>
                <span className={`relative mt-3 text-sm font-semibold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] ${fontClass}`}>
                  {locale === "bn" ? "কম্পাস খুলুন →" : "Open compass →"}
                </span>
              </Link>
            </div>

            {/* RIGHT column (narrower): date card → minaret (fills rest) */}
            <div className="flex flex-1 flex-col gap-4">
              {/* Card 4, multi-calendar date card (Today / Hijri / Bangla / Gregorian) */}
              <div className="animate-fade-in-up" style={{ animationDelay: "320ms" }}>
                <HijriDateCard hijri={prayer.hijri} gregorian={prayer.date} />
              </div>

              {/* Card 5, minaret photo, fills remaining height (~440px) */}
              <div
                className="relative min-h-[18rem] flex-1 animate-fade-in-up overflow-hidden rounded-[20px] bg-[#e3e9e4] shadow-card lg:min-h-0"
                style={{ animationDelay: "440ms" }}
              >
                <Image
                  src="/images/minarets.jpg"
                  alt="Mosque minarets with a bird in flight"
                  fill
                  sizes="(max-width: 1024px) 50vw, 26vw"
                  className="object-cover animate-ken-burns"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary cards, Hadith of the Day (left) + Quran verse of the Day (right). */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 sm:gap-6 lg:grid-cols-3">
        <HadithOfDayCard hadith={hadith} />
        <AyatOfDayCard ayat={ayat} />
      </section>

      <ScrollGallery />
      <FivePillars />
      <ClosingCta />
    </div>
  );
}
