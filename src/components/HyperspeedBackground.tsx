"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Hyperspeed from "./Hyperspeed";
import { Background } from "@/once-ui/components";
import { effects } from "@/app/resources";
import { opacity, SpacingToken } from "@/once-ui/types";

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
        distortion: 'LongRaceDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 5,
        lanesPerRoad: 2,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 50,
        lightPairsPerRoadWay: 50,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.02, 0.05],
        lightStickHeight: [0.3, 0.7],
        movingAwaySpeed: [20, 50],
        movingCloserSpeed: [-150, -230],
        carLightsLength: [400 * 0.05, 400 * 0.15],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.2, 0.2],
        carFloorSeparation: [0.05, 1],
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
        gradient={{
          display: effects.gradient.display,
          opacity: effects.gradient.opacity as opacity,
          x: effects.gradient.x,
          y: effects.gradient.y,
          width: effects.gradient.width,
          height: effects.gradient.height,
          tilt: effects.gradient.tilt,
          colorStart: effects.gradient.colorStart,
          colorEnd: effects.gradient.colorEnd,
        }}
        dots={{
          display: effects.dots.display,
          opacity: effects.dots.opacity as opacity,
          size: effects.dots.size as SpacingToken,
          color: effects.dots.color,
        }}
        grid={{
          display: effects.grid.display,
          opacity: effects.grid.opacity as opacity,
          color: effects.grid.color,
          width: effects.grid.width,
          height: effects.grid.height,
        }}
        lines={{
          display: effects.lines.display,
          opacity: effects.lines.opacity as opacity,
          size: effects.lines.size as SpacingToken,
          thickness: effects.lines.thickness,
          angle: effects.lines.angle,
          color: effects.lines.color,
        }}
      />
    </div>
  );
}
