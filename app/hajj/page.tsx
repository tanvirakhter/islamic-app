import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { getServerTranslator } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.hajj.title"),
    description: t("page.hajj.description"),
  };
}

export default function HajjPage() {
  const { t, raw, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const steps = raw["hajj.steps"];

  return (
    <>
      <PageHeader
        eyebrow={t("page.hajj.eyebrow")}
        title={t("page.hajj.title")}
        description={t("page.hajj.description")}
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8">
        {steps.map((s, i) => (
          <Card key={s.title}>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                {i + 1}
              </span>
              <div>
                <p className={`text-xs uppercase tracking-[0.14em] text-ink-muted ${fontClass}`}>
                  {s.day}
                </p>
                <p className={`mt-1 text-lg font-semibold text-ink ${fontClass}`}>{s.title}</p>
                <p className={`mt-1 text-sm leading-relaxed text-ink-soft ${fontClass}`}>
                  {s.body}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
