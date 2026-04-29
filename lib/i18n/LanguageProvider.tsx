"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LOCALE_COOKIE, type Locale } from "./config";
import { dictionary, translate, type DictionaryKey } from "./dictionary";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <K extends DictionaryKey>(key: K) => (typeof dictionary)["en"][K];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface ProviderProps {
  initialLocale: Locale;
  children: ReactNode;
}

// Wraps the app in client-side language state. The server has already chosen
// `initialLocale` from the cookie, so the first paint matches user preference.
export function LanguageProvider({ initialLocale, children }: ProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Reflect locale on <html lang="…"> for accessibility / SEO.
  useEffect(() => {
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // 1-year cookie; SameSite=Lax so it survives normal navigation.
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      // Re-render Server Components with the new cookie applied.
      router.refresh();
    },
    [router]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key),
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
