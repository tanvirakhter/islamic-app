"use client";

import { useEffect, useState, useCallback } from "react";
import { Compass, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  qiblaBearing,
  distanceToKaaba,
  cardinal,
  KAABA_LAT,
  KAABA_LNG,
} from "@/lib/qibla";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import { cn } from "@/lib/utils";

// Status state-machine — simpler than juggling multiple booleans.
type Status =
  | "idle" // before user grants permission
  | "locating"
  | "ready"
  | "denied"
  | "unsupported"
  | "error";

interface Coords {
  lat: number;
  lng: number;
  accuracy?: number;
}

// Safari iOS requires an explicit permission prompt for motion/orientation events.
// Other browsers fire the events immediately once a listener is attached.
interface DeviceOrientationEventStatic extends EventTarget {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export function QiblaCompass() {
  const { locale } = useLanguage();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const num = (n: number | string) =>
    locale === "bn" ? toBanglaDigits(n) : String(n);

  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<Coords | null>(null);
  const [bearing, setBearing] = useState<number>(0);
  // `heading` is the device's compass heading; subtract from bearing to know
  // how many degrees to rotate the needle.
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Subtract the device heading so the needle always points to the Ka'bah,
  // regardless of which way the phone is held.
  const needleAngle = heading == null ? bearing : bearing - heading;

  // ----- 1. Geolocation -----
  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setCoords({ lat: latitude, lng: longitude, accuracy });
        setBearing(qiblaBearing(latitude, longitude));
        setStatus("ready");
      },
      (err) => {
        setError(err.message);
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 60_000 }
    );
  }, []);

  // ----- 2. Device orientation (compass) -----
  // Run once we know the user's coords. iOS needs an explicit permission grant.
  useEffect(() => {
    if (status !== "ready" || typeof window === "undefined") return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // iOS exposes `webkitCompassHeading` (clockwise from true north).
      // Other browsers expose `alpha` (counter-clockwise from arbitrary north),
      // which we flip to match.
      const iosHeading = (event as DeviceOrientationEvent & {
        webkitCompassHeading?: number;
      }).webkitCompassHeading;

      if (typeof iosHeading === "number") {
        setHeading(iosHeading);
      } else if (typeof event.alpha === "number") {
        setHeading((360 - event.alpha) % 360);
      }
    };

    const Ctor = (window as unknown as { DeviceOrientationEvent?: DeviceOrientationEventStatic })
      .DeviceOrientationEvent;
    const requestPermission = Ctor?.requestPermission;

    let cleanup: (() => void) | undefined;
    const attach = () => {
      window.addEventListener("deviceorientation", handleOrientation, true);
      cleanup = () =>
        window.removeEventListener("deviceorientation", handleOrientation, true);
    };

    if (typeof requestPermission === "function") {
      // Safari iOS — needs to be triggered from a user gesture. Our "Locate me"
      // button counts since this effect runs on its click-driven state change.
      requestPermission()
        .then((res) => res === "granted" && attach())
        .catch(() => {
          /* user declined or browser refused — fallback shows static bearing */
        });
    } else {
      attach();
    }

    return () => cleanup?.();
  }, [status]);

  // ----- Render -----
  if (status === "idle") {
    return (
      <Card className="text-center">
        <Compass className="mx-auto h-10 w-10 text-brand-700" aria-hidden />
        <p className={`mt-4 text-base font-medium text-ink ${fontClass}`}>
          {locale === "bn"
            ? "কিবলার দিক জানতে আপনার অবস্থানের অনুমতি দিন"
            : "Allow location access to find the Qibla direction"}
        </p>
        <p className={`mt-2 text-sm text-ink-muted ${fontClass}`}>
          {locale === "bn"
            ? "আপনার অবস্থান কোথাও পাঠানো হয় না — সবকিছু আপনার ডিভাইসেই চলে।"
            : "Your location stays on your device — nothing is sent to a server."}
        </p>
        <Button onClick={requestLocation} className="mt-6">
          <MapPin className="h-4 w-4" />
          <span className={fontClass}>
            {locale === "bn" ? "আমার অবস্থান শনাক্ত করুন" : "Locate me"}
          </span>
        </Button>
      </Card>
    );
  }

  if (status === "locating") {
    return (
      <Card className="text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand-700" aria-hidden />
        <p className={`mt-4 text-sm text-ink-muted ${fontClass}`}>
          {locale === "bn" ? "অবস্থান শনাক্ত করা হচ্ছে…" : "Getting your location…"}
        </p>
      </Card>
    );
  }

  if (status === "denied" || status === "unsupported" || status === "error") {
    return (
      <Card className="text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-600" aria-hidden />
        <p className={`mt-4 font-medium text-ink ${fontClass}`}>
          {status === "denied"
            ? locale === "bn"
              ? "অবস্থানের অনুমতি দেওয়া হয়নি"
              : "Location permission denied"
            : status === "unsupported"
            ? locale === "bn"
              ? "এই ডিভাইসে অবস্থান সমর্থিত নয়"
              : "Location is not supported on this device"
            : locale === "bn"
            ? "অবস্থান আনতে সমস্যা হয়েছে"
            : "Couldn't get your location"}
        </p>
        {error && <p className="mt-1 text-xs text-ink-muted">{error}</p>}
        <p className={`mt-3 text-sm text-ink-muted ${fontClass}`}>
          {locale === "bn"
            ? "ব্রাউজার সেটিংসে অবস্থান চালু করে আবার চেষ্টা করুন।"
            : "Enable location in your browser settings and try again."}
        </p>
        <Button onClick={requestLocation} variant="secondary" className="mt-5">
          <span className={fontClass}>
            {locale === "bn" ? "আবার চেষ্টা করুন" : "Try again"}
          </span>
        </Button>
      </Card>
    );
  }

  // status === "ready"
  const distanceKm = coords ? distanceToKaaba(coords.lat, coords.lng) : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-5">
      {/* Compass dial — 3/5 of the row on desktop. */}
      <Card className="flex flex-col items-center sm:col-span-3">
        <div className="relative aspect-square w-full max-w-sm">
          {/* Outer ring with cardinal markings — counter-rotates by `heading`
              so N/E/S/W stay anchored to real-world directions when the phone
              turns, only the needle moves relative to it. */}
          <div
            className="absolute inset-0 rounded-full border border-black/10 bg-gradient-to-br from-white to-surface-alt shadow-card transition-transform duration-150"
            style={{
              transform: `rotate(${heading == null ? 0 : -heading}deg)`,
            }}
          >
            {(["N", "E", "S", "W"] as const).map((label, i) => (
              <span
                key={label}
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest",
                  label === "N" ? "text-brand-700" : "text-ink-muted"
                )}
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-46%) rotate(${
                    -i * 90
                  }deg)`,
                }}
              >
                {label}
              </span>
            ))}
            {/* Tick marks every 30°. */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-[6%] w-[1.5px] origin-bottom -translate-x-1/2 bg-ink-muted/40"
                style={{ transform: `rotate(${i * 30}deg) translateY(-46%)` }}
              />
            ))}
          </div>

          {/* Needle — rotated to `needleAngle` (already accounts for heading). */}
          <div
            className="absolute inset-0 grid place-items-center transition-transform duration-150"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            {/* The Ka'bah-side tip (top): brand color, longer. */}
            <div className="flex h-[78%] w-[18px] flex-col items-center">
              <span
                aria-hidden
                className="block w-0 border-x-[9px] border-b-[28px] border-x-transparent border-b-brand-600"
              />
              <span className="block h-1/2 w-1.5 rounded-full bg-brand-600" />
              <span className="block h-1/2 w-1.5 rounded-full bg-ink-muted/40" />
            </div>
          </div>

          {/* Center dot. */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-700 shadow" />
        </div>

        <p className={`mt-6 text-sm text-ink-muted ${fontClass}`}>
          {locale === "bn"
            ? "সবুজ তীর কাবার দিকে নির্দেশ করছে"
            : "The green arrow points toward the Ka'bah"}
        </p>
      </Card>

      {/* Stats / metadata panel. */}
      <div className="grid gap-4 sm:col-span-2">
        <Card>
          <p className={`section-title ${fontClass}`}>
            {locale === "bn" ? "কিবলার দিক" : "Qibla Bearing"}
          </p>
          <p className="mt-2 text-5xl font-semibold tabular-nums tracking-tight">
            {num(bearing.toFixed(1))}°
          </p>
          <p className={`mt-1 text-sm text-ink-muted ${fontClass}`}>
            {locale === "bn" ? "উত্তর থেকে ঘড়ির কাঁটার দিকে" : "Clockwise from true north"}{" "}
            · {cardinal(bearing)}
          </p>
        </Card>

        <Card>
          <p className={`section-title ${fontClass}`}>
            {locale === "bn" ? "মক্কা পর্যন্ত দূরত্ব" : "Distance to Makkah"}
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">
            {num(Math.round(distanceKm).toLocaleString("en-US"))} km
          </p>
          {coords && (
            <p className={`mt-3 text-xs text-ink-muted ${fontClass}`}>
              {locale === "bn" ? "আপনার অবস্থান" : "Your location"}:{" "}
              <span className="font-mono">
                {num(coords.lat.toFixed(3))}, {num(coords.lng.toFixed(3))}
              </span>
            </p>
          )}
          <p className="mt-1 text-xs text-ink-muted">
            <span className={fontClass}>
              {locale === "bn" ? "কাবা" : "Ka'bah"}
            </span>
            : <span className="font-mono">{KAABA_LAT}, {KAABA_LNG}</span>
          </p>
        </Card>

        {heading == null && (
          <Card>
            <p className={`text-sm text-ink-soft ${fontClass}`}>
              {locale === "bn"
                ? "আপনার ডিভাইসে কম্পাস সেন্সর সাড়া দিচ্ছে না। উপরের ডিগ্রি ব্যবহার করে একটি বাহ্যিক কম্পাস দিয়ে দিক নির্ণয় করুন।"
                : "Your device's compass isn't responding. Use the bearing above with an external compass to find the direction."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
