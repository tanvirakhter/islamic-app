import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  // Adds the bangla font when the label is Bengali.
  labelFont?: "default" | "bangla";
  className?: string;
}

const SIZE: Record<NonNullable<LoaderProps["size"]>, string> = {
  sm: "h-12 w-12",
  md: "h-24 w-24",
  lg: "h-36 w-36",
};

/**
 * Noor loader, an Islamic 8-pointed star (Rub el Hizb pattern) layered over
 * a counter-rotating dotted ring and a soft brand halo. Pure CSS animations,
 * so it works inside Server Components too.
 *
 * Visual layers, back to front:
 *   1. Halo: blurred brand-tinted glow, pulses scale & opacity.
 *   2. Outer dotted ring: thin emerald dashes, slow counter-rotation.
 *   3. Eight-pointed star: two stacked rounded squares, one rotated 45°,
 *      slow clockwise rotation, brand gradient.
 *   4. Center "Noor" mark: ping ripple around a steady core dot.
 */
export function Loader({
  size = "lg",
  label,
  labelFont = "default",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className={cn("relative", SIZE[size])}>
        {/* 1. Halo */}
        <div
          aria-hidden
          className="absolute inset-0 -m-6 animate-glow rounded-full bg-brand-400/40 blur-3xl"
        />

        {/* 2. Outer dotted ring, counter-rotating */}
        <div className="absolute inset-0 animate-spin-reverse-slow">
          <svg viewBox="0 0 100 100" className="h-full w-full text-brand-500">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="1.8 5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 3. Eight-pointed star, clockwise rotation */}
        <div className="absolute inset-[14%] animate-spin-slow">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-card" />
            <div className="absolute inset-0 rotate-45 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-800 opacity-80" />
          </div>
        </div>

        {/* 4. Center "Noor", light at the heart of the star */}
        <div className="absolute inset-0 grid place-items-center">
          <span
            aria-hidden
            className="absolute h-3 w-3 animate-ping rounded-full bg-white/90"
          />
          <span
            aria-hidden
            className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          />
        </div>
      </div>

      {label && (
        <p
          className={cn(
            "animate-fade-in text-sm tracking-wide text-ink-muted",
            labelFont === "bangla" && "font-bangla"
          )}
        >
          {label}
        </p>
      )}

      {/* Screen-reader-only fallback text, always present. */}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );
}
