import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { getServerLocale } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

const CONTENT = {
  en: {
    eyebrow: "Information",
    title: "Terms & Policy",
    description: "The terms for using Noor Bangladesh.",
    sections: [
      {
        heading: "Religious content",
        body: "Prayer times, Hijri dates, and calculations are provided for guidance. For matters of religious obligation, please confirm with your local masjid or a qualified scholar.",
      },
      {
        heading: "Accuracy",
        body: "We strive for accuracy but cannot guarantee that every time or text is free of error. Please treat the app as a helpful reference, not a sole authority.",
      },
      {
        heading: "Acceptable use",
        body: "Noor Bangladesh is offered for personal, non-commercial use. Please use it respectfully and in keeping with its purpose.",
      },
    ],
  },
  bn: {
    eyebrow: "তথ্য",
    title: "শর্তাবলী ও নীতি",
    description: "নূর বাংলাদেশ ব্যবহারের শর্তাবলী।",
    sections: [
      {
        heading: "ধর্মীয় বিষয়বস্তু",
        body: "নামাজের সময়, হিজরি তারিখ ও গণনাগুলো দিকনির্দেশনার জন্য দেওয়া হয়েছে। ধর্মীয় বাধ্যবাধকতার বিষয়ে আপনার স্থানীয় মসজিদ বা যোগ্য আলেমের সাথে নিশ্চিত হয়ে নিন।",
      },
      {
        heading: "নির্ভুলতা",
        body: "আমরা নির্ভুলতার জন্য চেষ্টা করি, তবে প্রতিটি সময় বা লেখা সম্পূর্ণ ত্রুটিমুক্ত থাকার নিশ্চয়তা দিতে পারি না। অ্যাপটিকে সহায়ক তথ্যসূত্র হিসেবে ব্যবহার করুন, একমাত্র কর্তৃপক্ষ হিসেবে নয়।",
      },
      {
        heading: "গ্রহণযোগ্য ব্যবহার",
        body: "নূর বাংলাদেশ ব্যক্তিগত, অবাণিজ্যিক ব্যবহারের জন্য তৈরি। অনুগ্রহ করে এটি শ্রদ্ধার সাথে এবং এর উদ্দেশ্য অনুযায়ী ব্যবহার করুন।",
      },
    ],
  },
};

export function generateMetadata(): Metadata {
  const c = CONTENT[getServerLocale()];
  return { title: c.title, description: c.description };
}

export default function TermsPage() {
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
