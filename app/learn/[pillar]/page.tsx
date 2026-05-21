import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { PILLARS, findPillar } from "@/lib/pillars";
import { getServerTranslator } from "@/lib/i18n/server";
import { toBanglaDigits } from "@/lib/bengali-calendar";

// Pre-render all five pillar pages; reject any other slug.
export const dynamicParams = false;

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

interface Props {
  params: { pillar: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const p = findPillar(params.pillar);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.title}, The Five Pillars`,
    description: p.description,
  };
}

export default function PillarPage({ params }: Props) {
  const pillar = findPillar(params.pillar);
  if (!pillar) notFound();

  const { t, locale } = getServerTranslator();
  const bn = locale === "bn";
  const fontClass = bn ? "font-bangla" : "";
  const num = (n: string) => (bn ? toBanglaDigits(n) : n);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <Link
        href="/"
        className={`inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink ${fontClass}`}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {t("pillars.home")}
      </Link>

      {/* Image hero with a color-tinted overlay and the Arabic name */}
      <header className="relative mt-6 flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl p-8 text-white shadow-elevated">
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover animate-ken-burns"
        />
        <div
          className="absolute inset-0 opacity-75 mix-blend-multiply"
          style={{ backgroundColor: pillar.color }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
          <p className={`text-xs uppercase tracking-[0.2em] text-white/70 ${fontClass}`}>
            {t("pillars.pillarLabel")} {num(pillar.number)} {t("pillars.ofFive")}
          </p>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl ${fontClass}`}>
              {bn ? pillar.titleBn : pillar.title}
            </h1>
            <span dir="rtl" lang="ar" className="font-arabic text-4xl sm:text-5xl">
              {pillar.arabic}
            </span>
          </div>
        </div>
      </header>

      <p className={`mt-8 text-lg leading-relaxed text-ink-soft ${fontClass}`}>
        {bn ? pillar.descriptionBn : pillar.description}
      </p>
      <p className={`mt-4 leading-relaxed text-ink-muted ${fontClass}`}>
        {bn ? pillar.detailsBn : pillar.details}
      </p>

      {pillar.related && (
        <Link
          href={pillar.related.href}
          className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d] ${fontClass}`}
        >
          {bn ? pillar.related.labelBn : pillar.related.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}

      {/* Quick links to the other pillars */}
      <nav className="mt-12 border-t border-black/5 pt-6">
        <p className={`section-title mb-3 ${fontClass}`}>{t("pillars.title")}</p>
        <div className="flex flex-wrap gap-2">
          {PILLARS.map((p) => (
            <Link
              key={p.slug}
              href={`/learn/${p.slug}`}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${fontClass} ${
                p.slug === pillar.slug
                  ? "bg-[#0f3d24] text-white"
                  : "border border-black/5 bg-white text-ink hover:bg-black/5"
              }`}
            >
              {num(p.number)} · {bn ? p.titleBn : p.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
