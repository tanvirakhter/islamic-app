import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { getServerLocale } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

// Bilingual static content, kept inline so it stays close to the page.
const CONTENT = {
  en: {
    eyebrow: "About",
    title: "About Noor Bangladesh",
    description:
      "A modern Islamic companion crafted for the Muslims of Bangladesh.",
    sections: [
      {
        heading: "Our mission",
        body: "Noor Bangladesh brings the essentials of daily worship together in one calm place: accurate prayer times, the Holy Quran with Bangla translation, the Qibla direction, a Zakat calculator, and trusted Hajj and Umrah guides.",
      },
      {
        heading: "Built for Bangladesh",
        body: "Every feature is tuned for Bangladesh, with prayer times for all major cities, the revised Bangabda calendar, Hijri dates, and full Bangla language support throughout the app.",
      },
      {
        heading: "Free, and respectful of you",
        body: "Noor is free to use. Your location is read only on your device to work out prayer times and the Qibla. It is never sent to a server.",
      },
    ],
  },
  bn: {
    eyebrow: "সম্পর্কে",
    title: "নূর বাংলাদেশ সম্পর্কে",
    description: "বাংলাদেশের মুসলিমদের জন্য তৈরি একটি আধুনিক ইসলামিক সঙ্গী।",
    sections: [
      {
        heading: "আমাদের লক্ষ্য",
        body: "নূর বাংলাদেশ দৈনন্দিন ইবাদতের প্রয়োজনীয় সবকিছু এক শান্তিময় জায়গায় নিয়ে আসে: সঠিক নামাজের সময়, বাংলা অনুবাদসহ পবিত্র কুরআন, কিবলার দিক, যাকাত ক্যালকুলেটর এবং নির্ভরযোগ্য হজ্জ ও উমরাহর নির্দেশিকা।",
      },
      {
        heading: "বাংলাদেশের জন্য তৈরি",
        body: "প্রতিটি ফিচার বাংলাদেশের জন্য সাজানো — সব প্রধান শহরের নামাজের সময়, সংশোধিত বঙ্গাব্দ ক্যালেন্ডার, হিজরি তারিখ এবং সম্পূর্ণ বাংলা ভাষার সমর্থন।",
      },
      {
        heading: "বিনামূল্যে ও আপনার প্রতি শ্রদ্ধাশীল",
        body: "নূর ব্যবহার করা সম্পূর্ণ বিনামূল্যে। নামাজের সময় ও কিবলা নির্ণয়ের জন্য আপনার অবস্থান কেবল আপনার ডিভাইসেই পড়া হয়, কোনো সার্ভারে পাঠানো হয় না।",
      },
    ],
  },
};

export function generateMetadata(): Metadata {
  const c = CONTENT[getServerLocale()];
  return { title: c.title, description: c.description };
}

export default function AboutPage() {
  const locale = getServerLocale();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const c = CONTENT[locale];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <div className="grid gap-4">
          {c.sections.map((s) => (
            <Card key={s.heading}>
              <h2 className={cn("text-lg font-semibold text-ink", fontClass)}>{s.heading}</h2>
              <p className={cn("mt-2 leading-relaxed text-ink-soft", fontClass)}>{s.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
