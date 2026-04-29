// Locale config — single source of truth. Cookie name shared between client + server.
export const LOCALES = ["en", "bn"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "noor_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "bn";
}
