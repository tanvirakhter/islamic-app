import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { dictionary, translate, type DictionaryKey } from "./dictionary";

// Server-side locale resolver. Reads the cookie set by the client toggle.
export function getServerLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

// Convenience: returns a bound `t` function for use in Server Components / metadata.
export function getServerTranslator() {
  const locale = getServerLocale();
  return {
    locale,
    t: <K extends DictionaryKey>(key: K) => translate(locale, key),
    raw: dictionary[locale],
  };
}
