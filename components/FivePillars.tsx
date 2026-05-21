import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PILLARS } from "@/lib/pillars";
import { getServerTranslator } from "@/lib/i18n/server";

export function FivePillars() {
  const { t, locale } = getServerTranslator();
  const bn = locale === "bn";
  const fontClass = bn ? "font-bangla" : "";

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-20">
      {/* Centered header */}
      <div className="mb-12 text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280] ${fontClass}`}>
          {t("pillars.eyebrow")}
        </p>
        <h2 className={`mt-3 text-4xl font-bold tracking-tight text-[#0f3d24] sm:text-5xl ${fontClass}`}>
          {t("pillars.title")}
        </h2>
        <p className={`mx-auto mt-3 max-w-md text-[#6b7280] ${fontClass}`}>
          {t("pillars.subtitle")}
        </p>
      </div>

      {/* Row 1: 3 cards · Row 2: 2 cards (left-aligned, third column empty) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <Link
            key={p.number}
            href={`/learn/${p.slug}`}
            className="group overflow-hidden rounded-2xl bg-[#f9fafb] pb-5 transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Image block with a color-tinted overlay */}
            <div className="relative flex h-[220px] items-center justify-center overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover animate-ken-burns"
              />
              <div
                className="absolute inset-0 opacity-70 mix-blend-multiply"
                style={{ backgroundColor: p.color }}
              />
              <span className="absolute left-4 top-4 text-sm font-medium text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                {p.number}
              </span>
              <span className="relative font-arabic text-5xl text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
                {p.arabic}
              </span>
            </div>

            {/* Body */}
            <div className="px-5 pt-5">
              <p className={`text-lg font-bold text-[#0f3d24] ${fontClass}`}>
                {bn ? p.titleBn : p.title}
              </p>
              <p className={`mt-2 text-sm leading-relaxed text-[#6b7280] ${fontClass}`}>
                {bn ? p.descriptionBn : p.description}
              </p>
              <div className="mt-4 flex justify-end">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0f3d24] text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
