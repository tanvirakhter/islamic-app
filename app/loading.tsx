import { Loader } from "@/components/ui/Loader";
import { getServerTranslator } from "@/lib/i18n/server";

// Default loading state for the whole app. Next.js shows this automatically
// during route transitions and on initial navigation while RSC streams.
export default function RootLoading() {
  const { t, locale } = getServerTranslator();
  return (
    <div className="grid min-h-[60vh] place-items-center px-6">
      <Loader
        size="lg"
        label={t("common.loading")}
        labelFont={locale === "bn" ? "bangla" : "default"}
      />
    </div>
  );
}
