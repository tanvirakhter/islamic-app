import Link from "next/link";
import { Compass } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getServerTranslator } from "@/lib/i18n/server";

// Server-rendered teaser tile for the Qibla page. The interactive compass lives
// at /qibla (it needs sensors), so the dashboard surfaces a clean call-to-action.
export function QiblaCard() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <Link href="/qibla" className="lg:col-span-1">
      <Card className="group flex h-full flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-elevated">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
            <Compass className="h-5 w-5" aria-hidden />
          </span>
          <span className={`text-xs uppercase tracking-[0.14em] text-ink-muted ${fontClass}`}>
            {t("page.qibla.eyebrow")}
          </span>
        </div>
        <div className="mt-6">
          <p className={`text-lg font-semibold tracking-tight text-ink ${fontClass}`}>
            {t("page.qibla.title")}
          </p>
          <p className={`mt-1 text-sm text-ink-muted ${fontClass}`}>
            {t("page.qibla.description")}
          </p>
        </div>
        <p className={`mt-5 text-sm font-medium text-brand-700 ${fontClass}`}>
          {locale === "bn" ? "কম্পাস খুলুন →" : "Open compass →"}
        </p>
      </Card>
    </Link>
  );
}
