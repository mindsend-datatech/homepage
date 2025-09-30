"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Hyperspeed from "./Hyperspeed";

export default function HyperspeedBackground() {
  const [opacity, setOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const FADE_START = 0.85; // begin fading earlier
    const FADE_END = 0.45;   // fully transparent by ~45% visible

    const calc = () => {
      const vh = window.innerHeight;
      const rect = hero.getBoundingClientRect();
      const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const ratio = rect.height > 0 ? visible / rect.height : 0;
      const norm = Math.max(0, Math.min(1, (ratio - FADE_END) / (FADE_START - FADE_END)));
      setOpacity(norm);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calc);
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "120vh",
        zIndex: 0,
        opacity,
        transition: "opacity 160ms ease-out",
        pointerEvents: "none",
        overflow: "hidden",
        transform: "translateY(-10vh)",
        willChange: "opacity, transform",
        backgroundColor: "#000",
      }}
    >
      <Hyperspeed paused={opacity < 0.06} effectOptions={useMemo(() => ({
        colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0x000000,
          shoulderLines: 0x8b49f5,
          brokenLines: 0x8b49f5,
          // Heavily weight to light green, fewer purple/brown
          leftCars: [
            0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d,
            0x8b49f5, 0xf58850,
          ],
          rightCars: [
            0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d,
            0x8b49f5, 0xf58850,
          ],
          sticks: 0x00f53d,
        }
      }), [])} />
    </div>
  );
}
