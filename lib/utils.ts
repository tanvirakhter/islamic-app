// Tiny class-name combiner — keeps Tailwind class lists readable without pulling in clsx.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

// Format a Date in Asia/Dhaka regardless of the visitor's locale.
// Prayer times and Hijri dates are city-anchored, so we always render in BD time.
export function formatDhakaTime(date: Date, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-BD", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...opts,
  }).format(date);
}

// Today's date in YYYY-MM-DD anchored to Dhaka — used as a stable cache key.
export function todayInDhaka(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
