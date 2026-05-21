import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { getServerLocale } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

const CONTENT = {
  en: {
    eyebrow: "Information",
    title: "Privacy Policy",
    description: "How Noor Bangladesh handles your information.",
    sections: [
      {
        heading: "Your location stays on your device",
        body: "When you use the Qibla finder, your location is read in your browser to compute the direction to the Ka'bah. It is never transmitted to or stored on any server.",
      },
      {
        heading: "No tracking",
        body: "We do not sell your data or use invasive trackers. Prayer times are fetched from a public API based on the city you choose.",
      },
      {
        heading: "Cookies",
        body: "We store a single small cookie only to remember your language preference (English or Bangla). Nothing more.",
      },
    ],
  },
  bn: {
    eyebrow: "তথ্য",
    title: "গোপনীয়তা নীতি",
    description: "নূর বাংলাদেশ আপনার তথ্য কীভাবে ব্যবহার করে।",
    sections: [
      {
        heading: "আপনার অবস্থান আপনার ডিভাইসেই থাকে",
        body: "কিবলা নির্ণয়ের সময় আপনার অবস্থান কেবল আপনার ব্রাউজারে পড়া হয় কাবার দিক গণনার জন্য। এটি কোনো সার্ভারে পাঠানো বা সংরক্ষণ করা হয় না।",
      },
      {
        heading: "কোনো ট্র্যাকিং নেই",
        body: "আমরা আপনার তথ্য বিক্রি করি না বা কোনো ক্ষতিকর ট্র্যাকার ব্যবহার করি না। আপনার নির্বাচিত শহর অনুযায়ী একটি পাবলিক API থেকে নামাজের সময় আনা হয়।",
      },
      {
        heading: "কুকি",
        body: "শুধু আপনার ভাষার পছন্দ (ইংরেজি বা বাংলা) মনে রাখতে আমরা একটি ছোট কুকি সংরক্ষণ করি। এর বেশি কিছু নয়।",
      },
    ],
  },
};

export function generateMetadata(): Metadata {
  const c = CONTENT[getServerLocale()];
  return { title: c.title, description: c.description };
}

export default function PrivacyPage() {
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
