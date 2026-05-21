import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  fontClass?: string;
  // Optional trailing slot (e.g. a "View all →" link). Ignored when `centered`.
  action?: React.ReactNode;
  // Center the title + subtitle (no action row).
  centered?: boolean;
}

// Shared heading for homepage sections, keeps spacing/typography consistent.
export function SectionHeading({
  title,
  subtitle,
  fontClass = "",
  action,
  centered = false,
}: Props) {
  if (centered) {
    return (
      <div className="mb-8 text-center">
        <h2 className={cn("text-2xl font-semibold tracking-tight text-ink sm:text-3xl", fontClass)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mx-auto mt-1 max-w-xl text-sm text-ink-muted", fontClass)}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className={cn("text-2xl font-semibold tracking-tight text-ink sm:text-3xl", fontClass)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mt-1 text-sm text-ink-muted", fontClass)}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
