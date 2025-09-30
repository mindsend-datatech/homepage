"use client";

import React, { useEffect, useState } from "react";
import Hyperspeed from "./Hyperspeed";

export default function HyperspeedBackground() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Show only while hero is in view
        setVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "112vh",
        zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease",
        pointerEvents: "none",
        overflow: "hidden",
        transform: "translateY(-6vh)",
      }}
    >
      <Hyperspeed
        effectOptions={{
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x00f53d,
            brokenLines: 0x00f53d,
            // Heavily weight to light green, fewer purple/brown
            leftCars: [0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x8b49f5, 0xf58850],
            rightCars: [0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x00f53d, 0x627967, 0xf58850],
            sticks: 0x00f53d,
          },
        }}
      />
    </div>
  );
}
