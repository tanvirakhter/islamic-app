"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

// Pill-style segmented control. Two languages, so a toggle is clearer than a dropdown.
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "inline-flex items-center rounded-full border border-black/5 bg-white/80 p-0.5 shadow-sm backdrop-blur",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          locale === "en" ? "bg-brand-600 text-white" : "text-ink-soft hover:text-ink"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("bn")}
        aria-pressed={locale === "bn"}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          locale === "bn"
            ? "bg-brand-600 text-white"
            : "font-bangla text-ink-soft hover:text-ink"
        )}
      >
        বাং
      </button>
    </div>
  );
}
