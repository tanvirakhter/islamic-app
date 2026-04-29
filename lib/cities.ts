import type { BangladeshCity } from "@/types";

// Major Bangladesh divisional cities. Slug is URL-safe; coordinates from public sources.
export const BANGLADESH_CITIES: BangladeshCity[] = [
  { slug: "dhaka", name: "Dhaka", nameBangla: "ঢাকা", latitude: 23.8103, longitude: 90.4125 },
  { slug: "chattogram", name: "Chattogram", nameBangla: "চট্টগ্রাম", latitude: 22.3569, longitude: 91.7832 },
  { slug: "sylhet", name: "Sylhet", nameBangla: "সিলেট", latitude: 24.8949, longitude: 91.8687 },
  { slug: "khulna", name: "Khulna", nameBangla: "খুলনা", latitude: 22.8456, longitude: 89.5403 },
  { slug: "rajshahi", name: "Rajshahi", nameBangla: "রাজশাহী", latitude: 24.3745, longitude: 88.6042 },
  { slug: "barishal", name: "Barishal", nameBangla: "বরিশাল", latitude: 22.701, longitude: 90.3535 },
  { slug: "rangpur", name: "Rangpur", nameBangla: "রংপুর", latitude: 25.7439, longitude: 89.2752 },
  { slug: "mymensingh", name: "Mymensingh", nameBangla: "ময়মনসিংহ", latitude: 24.7471, longitude: 90.4203 },
  { slug: "cumilla", name: "Cumilla", nameBangla: "কুমিল্লা", latitude: 23.4607, longitude: 91.1809 },
  { slug: "narayanganj", name: "Narayanganj", nameBangla: "নারায়ণগঞ্জ", latitude: 23.6238, longitude: 90.4999 },
];

export const DEFAULT_CITY = BANGLADESH_CITIES[0];

export function findCityBySlug(slug: string): BangladeshCity | undefined {
  return BANGLADESH_CITIES.find((c) => c.slug === slug);
}
