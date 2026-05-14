"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Total splash duration: HOLD_MS show + EXIT_MS fade-out = on-screen time.
// Tuned to be snappy (~1.8 s total) — long enough for the ornament zoom + bismillah
// + wordmark to settle, short enough that returning visitors aren't slowed down.
const HOLD_MS = 1400;
const EXIT_MS = 400;

/**
 * Welcome splash shown on every fresh page load.
 *
 * Visual composition (back to front):
 *   1. Dark emerald gradient backdrop with a subtle radial glow.
 *   2. Twinkling stars scattered at pre-defined positions (no Math.random
 *      so SSR markup matches client; would otherwise cause hydration warnings).
 *   3. Rotating concentric Islamic geometric ornament:
 *      - Outer dotted ring spinning slowly counter-clockwise.
 *      - 8-pointed star (Rub el Hizb) spinning slowly clockwise.
 *      - Inner medallion with a luminous white "Noor" (light) core.
 *   4. Bismillah Arabic calligraphy.
 *   5. Brand name with shimmering gradient text.
 *
 * Auto-dismisses after HOLD_MS, fades out over EXIT_MS, then unmounts.
 */
export function SplashScreen() {
  const { locale } = useLanguage();
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Defensively unstick body scroll in case a previous render (or HMR cycle)
    // left it locked. The splash visually covers the viewport on its own.
    document.body.style.overflow = "";

    const exitTimer = setTimeout(() => setExiting(true), HOLD_MS);
    const unmountTimer = setTimeout(() => setMounted(false), HOLD_MS + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={exiting}
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-brand-800 via-brand-900 to-emerald-950 text-white",
        "transition-opacity duration-[400ms]",
        exiting ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Soft central halo behind everything */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/20 blur-3xl animate-glow"
      />

      <TwinklingStars />

      {/* Geometric ornament — the centerpiece */}
      <div className="relative z-10 h-44 w-44 animate-splash-zoom sm:h-56 sm:w-56">
        {/* Outer dotted ring — counter-rotating */}
        <div className="absolute inset-0 animate-spin-reverse-slower">
          <svg viewBox="0 0 100 100" className="h-full w-full text-white/40">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="1.2 4"
              strokeLinecap="round"
            />
            {/* 8 lights placed at the cardinal & ordinal points */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <circle
                key={deg}
                cx="50"
                cy="2"
                r="1.4"
                fill="white"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* 8-pointed star — two stacked rounded squares, clockwise spin */}
        <div className="absolute inset-[14%] animate-spin-slower">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-300 to-brand-600 shadow-elevated" />
            <div className="absolute inset-0 rotate-45 rounded-2xl bg-gradient-to-tr from-brand-400 to-brand-700 opacity-85" />
          </div>
        </div>

        {/* Inner medallion — Noor (light) at the heart */}
        <div className="absolute inset-[36%] grid place-items-center">
          <span
            aria-hidden
            className="absolute h-full w-full animate-ping rounded-full bg-white/60"
          />
          <span className="relative grid h-full w-full place-items-center rounded-full bg-white shadow-[0_0_28px_rgba(255,255,255,0.9)]">
            <span className="font-arabic text-lg font-semibold text-brand-800 sm:text-xl">
              نور
            </span>
          </span>
        </div>
      </div>

      {/* Bismillah — appears slightly after the ornament settles */}
      <p
        dir="rtl"
        lang="ar"
        className="z-10 mt-10 px-6 text-center font-arabic text-2xl leading-relaxed sm:text-3xl"
        style={{ animation: "fade-in-up 0.6s ease-out 0.25s both" }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>

      {/* Brand wordmark with shimmering gradient sweep */}
      <h1
        className="z-10 mt-8 bg-[linear-gradient(110deg,#ffffff_25%,#a7f3d0_50%,#ffffff_75%)] bg-[length:200%_100%] bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent animate-shimmer sm:text-5xl"
        style={{
          // Fade-in-up runs once; the continuous shimmer takes over after.
          animation:
            "fade-in-up 0.6s ease-out 0.55s both, shimmer 3s linear 0.9s infinite",
        }}
      >
        Noor Bangladesh
      </h1>

      {locale === "bn" && (
        <p
          className="z-10 mt-2 font-bangla text-lg text-brand-100"
          style={{ animation: "fade-in-up 0.5s ease-out 0.75s both" }}
        >
          নূর বাংলাদেশ
        </p>
      )}

      <span className="sr-only">Noor Bangladesh</span>
    </div>
  );
}

function TwinklingStars() {
  // Deterministic positions so SSR/CSR match — Math.random would cause hydration mismatch.
  const STARS = [
    { top: "8%", left: "12%", delay: "0s", size: "h-1 w-1" },
    { top: "18%", left: "78%", delay: "0.3s", size: "h-1.5 w-1.5" },
    { top: "32%", left: "22%", delay: "0.8s", size: "h-1 w-1" },
    { top: "45%", left: "88%", delay: "0.5s", size: "h-1 w-1" },
    { top: "62%", left: "8%", delay: "1.2s", size: "h-1.5 w-1.5" },
    { top: "72%", left: "55%", delay: "0.7s", size: "h-1 w-1" },
    { top: "82%", left: "30%", delay: "1.0s", size: "h-1 w-1" },
    { top: "12%", left: "48%", delay: "1.5s", size: "h-1 w-1" },
    { top: "55%", left: "40%", delay: "0.2s", size: "h-1 w-1" },
    { top: "88%", left: "82%", delay: "1.7s", size: "h-1.5 w-1.5" },
    { top: "26%", left: "60%", delay: "0.9s", size: "h-1 w-1" },
    { top: "76%", left: "72%", delay: "0.4s", size: "h-1 w-1" },
  ] as const;

  return (
    <>
      {STARS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-twinkle ${s.size}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </>
  );
}
