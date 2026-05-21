// The Five Pillars of Islam, shared by the homepage section and the
// /learn/[pillar] detail pages. Bilingual (English + Bangla).

export interface Pillar {
  number: string;
  slug: string;
  title: string;
  titleBn: string;
  arabic: string;
  description: string; // short, for the card
  descriptionBn: string;
  details: string; // longer, for the learn page
  detailsBn: string;
  color: string; // overlay tint
  image: string; // public path to the card/hero image
  // Optional related feature in the app (e.g. Salah → prayer times).
  related?: { href: string; label: string; labelBn: string };
}

export const PILLARS: Pillar[] = [
  {
    number: "01",
    slug: "shahada",
    title: "Shahada",
    titleBn: "শাহাদাহ",
    arabic: "الشَّهَادَة",
    description:
      "Declaration of faith, bearing witness that there is no god but Allah, and Muhammad is His messenger.",
    descriptionBn:
      "ঈমানের ঘোষণা, সাক্ষ্য দেওয়া যে আল্লাহ ছাড়া কোনো উপাস্য নেই এবং মুহাম্মদ (সা.) তাঁর রাসূল।",
    details:
      "The Shahada is the Muslim profession of faith: “There is no god but Allah, and Muhammad is the messenger of Allah.” Sincerely declaring it with conviction is what brings a person into Islam, and it underlies every other act of worship.",
    detailsBn:
      "শাহাদাহ হলো মুসলিমের ঈমানের ঘোষণা: “আল্লাহ ছাড়া কোনো উপাস্য নেই, এবং মুহাম্মদ (সা.) আল্লাহর রাসূল।” আন্তরিকভাবে দৃঢ় বিশ্বাসের সাথে এটি উচ্চারণ করাই একজনকে ইসলামে প্রবেশ করায়, এবং এটিই অন্য সকল ইবাদতের ভিত্তি।",
    color: "#0f3d24",
    image: "/images/shahada.jpeg",
  },
  {
    number: "02",
    slug: "salah",
    title: "Salah",
    titleBn: "সালাত",
    arabic: "الصَّلَاة",
    description:
      "The five daily prayers, the direct connection between the worshipper and Allah.",
    descriptionBn: "পাঁচ ওয়াক্ত নামাজ, বান্দা ও আল্লাহর মধ্যে সরাসরি সংযোগ।",
    details:
      "Muslims pray five times a day, Fajr, Dhuhr, Asr, Maghrib, and Isha, facing the Kaaba in Makkah. Salah anchors the day in remembrance of Allah and is a direct, personal connection with the Creator.",
    detailsBn:
      "মুসলিমরা দিনে পাঁচবার নামাজ পড়ে, ফজর, যোহর, আসর, মাগরিব ও ইশা, মক্কার কাবার দিকে মুখ করে। সালাত দিনকে আল্লাহর স্মরণে বেঁধে রাখে এবং স্রষ্টার সাথে সরাসরি ও ব্যক্তিগত সংযোগ গড়ে।",
    color: "#1a6b3c",
    image: "/images/salah.jpeg",
    related: { href: "/prayer-times", label: "View prayer times", labelBn: "নামাজের সময় দেখুন" },
  },
  {
    number: "03",
    slug: "zakat",
    title: "Zakat",
    titleBn: "যাকাত",
    arabic: "الزَّكَاة",
    description:
      "Obligatory almsgiving, purifying wealth by giving a portion to those in need.",
    descriptionBn:
      "ফরজ দান, সম্পদের একটি অংশ অভাবীদের দিয়ে সম্পদকে পবিত্র করা।",
    details:
      "Zakat is the obligatory giving of 2.5% of one’s qualifying wealth each year to the poor and those in need. It purifies wealth, curbs greed, and strengthens the bonds of the community.",
    detailsBn:
      "যাকাত হলো প্রতি বছর নিসাব পরিমাণ সম্পদের ২.৫% অভাবী ও দরিদ্রদের দেওয়ার ফরজ বিধান। এটি সম্পদকে পবিত্র করে, লোভ দমন করে এবং সমাজের বন্ধনকে দৃঢ় করে।",
    color: "#16a34a",
    image: "/images/zakat.jpeg",
    related: { href: "/zakat", label: "Calculate your Zakat", labelBn: "আপনার যাকাত হিসাব করুন" },
  },
  {
    number: "04",
    slug: "sawm",
    title: "Sawm",
    titleBn: "সাওম",
    arabic: "الصَّوْم",
    description:
      "Fasting during Ramadan, abstaining from food and drink from dawn to sunset.",
    descriptionBn:
      "রমজানে রোজা, ভোর থেকে সূর্যাস্ত পর্যন্ত পানাহার থেকে বিরত থাকা।",
    details:
      "During the month of Ramadan, Muslims fast from dawn (Fajr) until sunset (Maghrib), abstaining from food, drink, and other needs. Sawm cultivates self-discipline, gratitude, and empathy for those less fortunate.",
    detailsBn:
      "রমজান মাসে মুসলিমরা ভোর (ফজর) থেকে সূর্যাস্ত (মাগরিব) পর্যন্ত পানাহার ও অন্যান্য চাহিদা থেকে বিরত থাকে। সাওম আত্মসংযম, কৃতজ্ঞতা এবং অভাবীদের প্রতি সহানুভূতি গড়ে তোলে।",
    color: "#166534",
    image: "/images/ramadan.jpeg",
    related: { href: "/ramadan", label: "Sehri & Iftar timings", labelBn: "সেহরি ও ইফতারের সময়" },
  },
  {
    number: "05",
    slug: "hajj",
    title: "Hajj",
    titleBn: "হজ্জ",
    arabic: "الْحَجّ",
    description:
      "The pilgrimage to Mecca, a once-in-a-lifetime obligation for those who are able.",
    descriptionBn:
      "মক্কায় হজ, সামর্থ্যবানদের জন্য জীবনে একবার ফরজ।",
    details:
      "Hajj is the pilgrimage to Makkah performed in the month of Dhul-Hijjah, an obligation once in a lifetime for every Muslim who is physically and financially able. Millions stand together in unity, stripped of all status.",
    detailsBn:
      "হজ হলো জিলহজ মাসে মক্কায় তীর্থযাত্রা, শারীরিক ও আর্থিকভাবে সামর্থ্যবান প্রত্যেক মুসলিমের জন্য জীবনে একবার ফরজ। লক্ষ লক্ষ মানুষ সব মর্যাদা ভুলে একতাবদ্ধ হয়ে দাঁড়ায়।",
    color: "#14532d",
    image: "/images/hajj.jpeg",
    related: { href: "/hajj", label: "Read the Hajj guide", labelBn: "হজ্জের নির্দেশিকা পড়ুন" },
  },
];

export function findPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
