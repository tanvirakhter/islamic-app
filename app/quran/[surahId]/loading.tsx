import { Loader } from "@/components/ui/Loader";
import { getServerTranslator } from "@/lib/i18n/server";

// Per-route loading for surah pages — Aladhan fetch can take ~500-1500 ms.
// A focused label tells the reader what's happening instead of generic "loading".
export default function SurahLoading() {
  const { t, locale } = getServerTranslator();
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <Loader
        size="lg"
        label={t("common.loadingSurah")}
        labelFont={locale === "bn" ? "bangla" : "default"}
      />
    </div>
  );
}
