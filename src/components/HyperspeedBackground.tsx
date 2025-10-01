"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Hyperspeed from "./Hyperspeed";
import { Background } from "@/once-ui/components";
import { effects } from "@/app/resources";

export default function HyperspeedBackground() {
  const [opacity, setOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);

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

  // Track theme from data-theme so background respects light/dark
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const t = root.getAttribute("data-theme");
      if (t === "light") setIsDark(false);
      else setIsDark(true);
    };
    update();
    const mo = new MutationObserver(() => update());
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
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
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      <Hyperspeed paused={opacity < 0.06} effectOptions={useMemo(() => ({
        colors: {
          roadColor: isDark ? 0x080808 : 0xE6E6E6,
          islandColor: isDark ? 0x0a0a0a : 0xF2F2F2,
          background: isDark ? 0x000000 : 0xffffff,
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
      // theme-aware options update on isDark change
      }), [isDark])} />
      {/* Overlay the same global background effects above hyperspeed */}
      <Background
        position="fixed"
        top="0"
        left="0"
        fill
        pointerEvents="none"
        mask={{ ...effects.mask, radius: 120 }}
        gradient={effects.gradient}
        dots={effects.dots}
        grid={effects.grid}
        lines={effects.lines}
      />
    </div>
  );
}
