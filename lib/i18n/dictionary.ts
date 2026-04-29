import type { Locale } from "./config";

// Flat dictionary keyed by string id. Keep keys descriptive so missing-key bugs are obvious.
// Both locales must define every key — TS will catch drift.
export const dictionary = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.quran": "Quran",
    "nav.prayerTimes": "Prayer Times",
    "nav.ramadan": "Ramadan",
    "nav.hajj": "Hajj",
    "nav.umrah": "Umrah",
    "nav.qibla": "Qibla",
    "nav.toggleAria": "Toggle navigation",
    "lang.label": "Language",
    "lang.english": "English",
    "lang.bangla": "বাংলা",

    "common.viewAll": "View all",
    "common.fullTimetable": "Full timetable →",
    "common.readQuran": "Read the Quran →",
    "common.backToDashboard": "Back to Dashboard",
    "common.note": "Note",
    "common.chooseCity": "Choose a city",

    "dashboard.greeting": "Assalamu Alaikum",
    "dashboard.heroTitle": "A peaceful start to your day",
    "dashboard.heroSubtitle": "Today is",
    "dashboard.in": "in",
    "dashboard.metaDescription":
      "Today's Ayat, Hadith, prayer times, and Hijri date — at a glance, designed for Bangladesh.",

    "card.today": "Today",
    "card.gregorian": "Gregorian",
    "card.bengali": "Bangla (BD)",
    "card.bengaliSuffix": "Bangabda",
    "card.prayerTimes": "Prayer Times",
    "card.ayatOfDay": "Ayat of the Day",
    "card.hadithOfDay": "Hadith of the Day",
    "card.surah": "Surah",
    "card.nextPrayer": "Next Prayer",
    "card.in": "In",
    "card.at": "at",

    "prayer.Fajr": "Fajr",
    "prayer.Sunrise": "Sunrise",
    "prayer.Dhuhr": "Dhuhr",
    "prayer.Asr": "Asr",
    "prayer.Maghrib": "Maghrib",
    "prayer.Isha": "Isha",

    "page.quran.eyebrow": "Quran",
    "page.quran.title": "The Holy Quran",
    "page.quran.description": "Read with Bangla translation. Tap any surah to begin.",
    "page.quran.ayahs": "ayahs",

    "page.prayerTimes.eyebrow": "Prayer Timetable",
    "page.prayerTimes.titlePrefix": "Prayer times in",

    "page.ramadan.eyebrow": "Ramadan",
    "page.ramadan.title": "Sehri & Iftar Timetable",
    "page.ramadan.descriptionPrefix": "Today's timings for",
    "page.ramadan.descriptionSuffix":
      ", based on the Islamic Foundation calculation method.",
    "page.ramadan.sehriEnds": "Sehri ends",
    "page.ramadan.sehriHint": "at Fajr · stop eating before this time",
    "page.ramadan.iftar": "Iftar",
    "page.ramadan.iftarHint": "at Maghrib · break your fast",
    "page.ramadan.fullCalendarNote":
      "A full 30-day Ramadan calendar with per-city schedules will be available here once the database tables in Supabase are seeded.",

    "page.hajj.eyebrow": "Hajj",
    "page.hajj.title": "A step-by-step Hajj guide",
    "page.hajj.description":
      "The rites of Hajj follow a fixed sequence over five days. Read each step before you travel.",

    "page.umrah.eyebrow": "Umrah",
    "page.umrah.title": "The rites of Umrah",
    "page.umrah.description":
      "Umrah can be performed any time of the year and is a beautiful, focused act of worship.",

    "page.qibla.eyebrow": "Qibla Finder",
    "page.qibla.title": "Find the direction of the Ka'bah",
    "page.qibla.description":
      "Calculated from your live location using the great-circle bearing — works anywhere in Bangladesh and the world.",

    "footer.tagline":
      "A modern Islamic companion built for Bangladesh — Quran with Bangla translation, prayer times, Ramadan and Hajj guides.",
    "footer.explore": "Explore",
    "footer.guides": "Guides",
    "footer.about": "About",
    "footer.copyright": "Noor Bangladesh. Built with care.",

    "notFound.title": "Page not found",
    "notFound.description":
      "The page you're looking for doesn't exist or may have moved.",

    "hajj.steps": [
      {
        day: "8 Dhul-Hijjah",
        title: "Yawm at-Tarwiyah",
        body: "Enter ihram, travel to Mina, and pray Dhuhr through Fajr there.",
      },
      {
        day: "9 Dhul-Hijjah",
        title: "Yawm Arafah",
        body: "Stand on the plain of Arafah from after Dhuhr until sunset — the essence of Hajj.",
      },
      {
        day: "9 Dhul-Hijjah (night)",
        title: "Muzdalifah",
        body: "Combine Maghrib and Isha, gather pebbles, and rest until Fajr.",
      },
      {
        day: "10 Dhul-Hijjah",
        title: "Yawm an-Nahr",
        body: "Stone Jamarat al-Aqabah, sacrifice, shave/trim, then Tawaf al-Ifadah.",
      },
      {
        day: "11–13 Dhul-Hijjah",
        title: "Days of Tashreeq",
        body: "Stay in Mina, stone the three Jamarat each day after Dhuhr.",
      },
      {
        day: "Before leaving",
        title: "Tawaf al-Wada",
        body: "Perform the farewell Tawaf around the Ka'bah before departing Makkah.",
      },
    ],

    "umrah.steps": [
      {
        title: "Enter Ihram at the Miqat",
        body: "Make ghusl, wear the two white garments (men) or modest clothes (women), and recite the Talbiyah.",
      },
      {
        title: "Tawaf around the Ka'bah",
        body: "Seven circuits beginning at the Black Stone, keeping the Ka'bah on your left.",
      },
      {
        title: "Pray two rak'ahs at Maqam Ibrahim",
        body: "If possible behind Maqam Ibrahim; otherwise anywhere in the Masjid.",
      },
      {
        title: "Sa'i between Safa and Marwah",
        body: "Seven trips between the two hills, beginning at Safa and ending at Marwah.",
      },
      {
        title: "Halq or Taqsir",
        body: "Men shave or trim the head; women trim a fingertip-length from their hair. Umrah is now complete.",
      },
    ],
  },

  bn: {
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.quran": "কুরআন",
    "nav.prayerTimes": "নামাজের সময়",
    "nav.ramadan": "রমজান",
    "nav.hajj": "হজ্জ",
    "nav.umrah": "উমরাহ",
    "nav.qibla": "কিবলা",
    "nav.toggleAria": "মেনু খুলুন",
    "lang.label": "ভাষা",
    "lang.english": "English",
    "lang.bangla": "বাংলা",

    "common.viewAll": "সব দেখুন",
    "common.fullTimetable": "সম্পূর্ণ সময়সূচি →",
    "common.readQuran": "কুরআন পড়ুন →",
    "common.backToDashboard": "ড্যাশবোর্ডে ফিরুন",
    "common.note": "দ্রষ্টব্য",
    "common.chooseCity": "শহর নির্বাচন করুন",

    "dashboard.greeting": "আসসালামু আলাইকুম",
    "dashboard.heroTitle": "আপনার দিনের শান্তিময় সূচনা",
    "dashboard.heroSubtitle": "আজ",
    "dashboard.in": "—",
    "dashboard.metaDescription":
      "আজকের আয়াত, হাদিস, নামাজের সময় ও হিজরি তারিখ — এক নজরে, বাংলাদেশের জন্য তৈরি।",

    "card.today": "আজকের তারিখ",
    "card.gregorian": "গ্রেগরিয়ান",
    "card.bengali": "বাংলা সন",
    "card.bengaliSuffix": "বঙ্গাব্দ",
    "card.prayerTimes": "নামাজের সময়",
    "card.ayatOfDay": "আজকের আয়াত",
    "card.hadithOfDay": "আজকের হাদিস",
    "card.surah": "সূরা",
    "card.nextPrayer": "পরবর্তী নামাজ",
    "card.in": "বাকি",
    "card.at": "—",

    "prayer.Fajr": "ফজর",
    "prayer.Sunrise": "সূর্যোদয়",
    "prayer.Dhuhr": "যোহর",
    "prayer.Asr": "আসর",
    "prayer.Maghrib": "মাগরিব",
    "prayer.Isha": "ইশা",

    "page.quran.eyebrow": "কুরআন",
    "page.quran.title": "পবিত্র কুরআন",
    "page.quran.description": "বাংলা অনুবাদসহ পড়ুন। শুরু করতে যেকোনো সূরায় ক্লিক করুন।",
    "page.quran.ayahs": "আয়াত",

    "page.prayerTimes.eyebrow": "নামাজের সময়সূচি",
    "page.prayerTimes.titlePrefix": "নামাজের সময় —",

    "page.ramadan.eyebrow": "রমজান",
    "page.ramadan.title": "সেহরি ও ইফতারের সময়সূচি",
    "page.ramadan.descriptionPrefix": "আজকের সময়সূচি",
    "page.ramadan.descriptionSuffix":
      ", ইসলামিক ফাউন্ডেশনের গণনা পদ্ধতি অনুযায়ী।",
    "page.ramadan.sehriEnds": "সেহরি শেষ",
    "page.ramadan.sehriHint": "ফজরে · এর আগেই খাওয়া বন্ধ করুন",
    "page.ramadan.iftar": "ইফতার",
    "page.ramadan.iftarHint": "মাগরিবে · রোজা ভাঙুন",
    "page.ramadan.fullCalendarNote":
      "Supabase ডাটাবেসে তথ্য যুক্ত হলে এখানে শহরভিত্তিক ৩০ দিনের পূর্ণ রমজান ক্যালেন্ডার দেখা যাবে।",

    "page.hajj.eyebrow": "হজ্জ",
    "page.hajj.title": "ধাপে ধাপে হজ্জের নির্দেশিকা",
    "page.hajj.description":
      "হজ্জের আনুষ্ঠানিকতা পাঁচ দিনে নির্দিষ্ট ক্রমে সম্পন্ন হয়। যাত্রার আগে প্রতিটি ধাপ পড়ে নিন।",

    "page.umrah.eyebrow": "উমরাহ",
    "page.umrah.title": "উমরাহর আনুষ্ঠানিকতা",
    "page.umrah.description":
      "উমরাহ বছরের যেকোনো সময়ে পালন করা যায় — এটি একটি সুন্দর ও মনোযোগী ইবাদত।",

    "page.qibla.eyebrow": "কিবলা নির্দেশক",
    "page.qibla.title": "কাবার দিক নির্ণয় করুন",
    "page.qibla.description":
      "আপনার লাইভ অবস্থান থেকে গ্রেট-সার্কেল দিকনির্দেশ গণনা করে — বাংলাদেশ ও বিশ্বের যেকোনো জায়গায় কাজ করে।",

    "footer.tagline":
      "বাংলাদেশের জন্য তৈরি একটি আধুনিক ইসলামিক সঙ্গী — বাংলা অনুবাদসহ কুরআন, নামাজের সময়, রমজান ও হজ্জের নির্দেশিকা।",
    "footer.explore": "অন্বেষণ",
    "footer.guides": "নির্দেশিকা",
    "footer.about": "সম্পর্কে",
    "footer.copyright": "নূর বাংলাদেশ। যত্ন সহকারে তৈরি।",

    "notFound.title": "পেজটি পাওয়া যায়নি",
    "notFound.description":
      "আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা স্থানান্তরিত হয়েছে।",

    "hajj.steps": [
      {
        day: "৮ জিলহজ্জ",
        title: "ইয়াওমুত তারওয়িয়াহ",
        body: "ইহরাম পরে মিনায় যান এবং সেখানে যোহর থেকে ফজর পর্যন্ত নামাজ আদায় করুন।",
      },
      {
        day: "৯ জিলহজ্জ",
        title: "ইয়াওমুল আরাফাহ",
        body: "যোহরের পর থেকে সূর্যাস্ত পর্যন্ত আরাফার ময়দানে অবস্থান করুন — এটিই হজ্জের প্রাণ।",
      },
      {
        day: "৯ জিলহজ্জ (রাত)",
        title: "মুজদালিফা",
        body: "মাগরিব ও ইশা একসাথে পড়ুন, পাথর সংগ্রহ করুন এবং ফজর পর্যন্ত বিশ্রাম নিন।",
      },
      {
        day: "১০ জিলহজ্জ",
        title: "ইয়াওমুন নাহর",
        body: "জামরাতুল আকাবায় পাথর নিক্ষেপ করুন, কুরবানি দিন, মাথা মুণ্ডন/ছাঁট দিন, এরপর তাওয়াফুল ইফাদা।",
      },
      {
        day: "১১–১৩ জিলহজ্জ",
        title: "তাশরীকের দিনগুলো",
        body: "মিনায় অবস্থান করে প্রতিদিন যোহরের পর তিন জামরায় পাথর নিক্ষেপ করুন।",
      },
      {
        day: "প্রস্থানের আগে",
        title: "তাওয়াফুল বিদা",
        body: "মক্কা ত্যাগের পূর্বে কাবাঘরের চারপাশে বিদায়ী তাওয়াফ সম্পন্ন করুন।",
      },
    ],

    "umrah.steps": [
      {
        title: "মিকাত থেকে ইহরাম বাঁধুন",
        body: "গোসল করুন, পুরুষরা দুই সাদা কাপড় পরিধান করুন (মহিলারা শালীন পোশাক), এরপর তালবিয়া পাঠ করুন।",
      },
      {
        title: "কাবার চারপাশে তাওয়াফ",
        body: "হাজরে আসওয়াদ থেকে শুরু করে কাবা বাঁ পাশে রেখে সাত চক্কর দিন।",
      },
      {
        title: "মাকামে ইব্রাহিমে দুই রাকাত নামাজ",
        body: "সম্ভব হলে মাকামে ইব্রাহিমের পেছনে; অন্যথায় মসজিদের যেকোনো স্থানে।",
      },
      {
        title: "সাফা ও মারওয়ার মাঝে সাঈ",
        body: "সাফা থেকে শুরু করে মারওয়ায় শেষ — দুই পাহাড়ের মাঝে সাত বার যাতায়াত।",
      },
      {
        title: "হলক বা তাকসীর",
        body: "পুরুষরা মাথা মুণ্ডন বা চুল ছাঁটেন; মহিলারা চুলের অগ্রভাগ থেকে সামান্য কাটেন। উমরাহ সম্পন্ন।",
      },
    ],
  },
} as const;

export type DictionaryKey = keyof (typeof dictionary)["en"];

// Type-safe translator. Returns the value for the current locale, falling back to English
// (which is required to be complete via the `as const` shape above).
export function translate<K extends DictionaryKey>(
  locale: Locale,
  key: K
): (typeof dictionary)["en"][K] {
  const dict = dictionary[locale] as (typeof dictionary)["en"];
  return dict[key] ?? dictionary.en[key];
}
