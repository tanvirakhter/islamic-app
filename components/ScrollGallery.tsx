"use client";

/* eslint-disable @next/next/no-img-element */
// Plain <img> on purpose: natural full-cover images in a fixed 320×400 strip.

import { useEffect, useRef } from "react";

// Famous places of worship. `src` paths are URL-encoded (one filename has a space).
const ITEMS = [
  { src: "/images/makkah.jpeg", label: "Makkah" },
  { src: "/images/al-aqsa.jpeg", label: "Al-Aqsa" },
  { src: "/images/hagia-sophia.jpeg", label: "Hagia Sophia" },
  { src: "/images/nabawi.jpeg", label: "Al-Masjid an-Nabawi" },
  { src: "/images/imam-abdul-wahhab-mosque.jpeg", label: "Imam Muhammad ibn Abd al-Wahhab Mosque" },
];

// Triple the array so the strip never runs out as it slides.
const LOOP = [...ITEMS, ...ITEMS, ...ITEMS];

export function ScrollGallery() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    // Start one set to the left so there's room to move both ways.
    let currentX = -(stripRef.current?.scrollWidth ?? 0) / 3;
    if (stripRef.current) {
      stripRef.current.style.transform = `translateX(${currentX}px)`;
    }

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      currentX -= delta * 0.4; // speed multiplier

      // Wrap around the middle copy so it loops endlessly in both directions.
      const setWidth = (stripRef.current?.scrollWidth ?? 0) / 3;
      if (setWidth > 0) {
        if (currentX <= -setWidth * 2) currentX += setWidth;
        else if (currentX >= 0) currentX -= setWidth;
      }

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${currentX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-hidden
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        marginTop: 56,
        marginBottom: 56,
        width: "100vw",
        height: 560,
        overflow: "hidden",
      }}
    >
      <div
        ref={stripRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          width: "max-content",
          willChange: "transform",
          transition: "transform 0.1s linear",
        }}
      >
        {LOOP.map((item, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              width: 320,
              height: 560,
              flexShrink: 0,
              marginRight: 16,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <img
              src={item.src}
              alt={item.label}
              draggable={false}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                userSelect: "none",
              }}
            />
            {/* darken the bottom so the label reads */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 45%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 18,
                bottom: 16,
                color: "rgba(255,255,255,0.92)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Edge fades, blend the strip into the page background on both sides. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: 140,
          pointerEvents: "none",
          background: "linear-gradient(to right, #f4f6f4, rgba(244,246,244,0))",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: 140,
          pointerEvents: "none",
          background: "linear-gradient(to left, #f4f6f4, rgba(244,246,244,0))",
        }}
      />
    </section>
  );
}
