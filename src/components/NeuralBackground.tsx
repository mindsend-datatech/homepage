"use client";

import React, { useEffect, useRef, useState } from "react";

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Theme detection
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      setTheme(currentTheme || "dark");
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    updateTheme();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      hub: boolean;
      signalIntensity: number;
    }

    interface Signal {
      path: number[];
      currentStep: number;
      progress: number;
      speed: number;
    }

    let particles: Particle[] = [];
    let signals: Signal[] = [];
    const maxDistance = 200;
    const hubDistance = 300;
    const mouseDistance = 250;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const initParticles = () => {
      particles = [];
      signals = [];
      const count = Math.floor((width * height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.5,
          baseAlpha: Math.random() * 0.2 + 0.05,
          hub: Math.random() > 0.94,
          signalIntensity: 0,
        });
      }
    };

    resize();

    const findPath = (startIdx: number, targetIdx: number) => {
      const queue: number[][] = [[startIdx]];
      const visited = new Set<number>([startIdx]);

      while (queue.length > 0) {
        const path = queue.shift()!;
        const nodeIdx = path[path.length - 1];

        if (nodeIdx === targetIdx) return path;

        const p1 = particles[nodeIdx];
        for (let i = 0; i < particles.length; i++) {
          if (visited.has(i)) continue;
          
          const p2 = particles[i];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const currentMaxDist = (p1.hub || p2.hub) ? hubDistance : maxDistance;

          if (distSq < currentMaxDist * currentMaxDist) {
            visited.add(i);
            queue.push([...path, i]);
          }
        }
        if (queue.length > 500) break;
      }
      return null;
    };

    const signalInterval = setInterval(() => {
      if (particles.length < 2) return;
      const startIdx = Math.floor(Math.random() * particles.length);
      let targetIdx = Math.floor(Math.random() * particles.length);
      const path = findPath(startIdx, targetIdx);
      if (path && path.length > 2) {
        signals.push({
          path,
          currentStep: 0,
          progress: 0,
          speed: 0.02 + Math.random() * 0.03,
        });
      }
    }, 2000);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const brandColor = isDark ? "57, 255, 100" : "50, 50, 50"; // Brighter green in dark, Dark gray in light

      particles.forEach(p => p.signalIntensity = 0);

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;

        if (s.progress >= 1) {
          s.progress = 0;
          s.currentStep++;
        }

        if (s.currentStep >= s.path.length - 1) {
          signals.splice(i, 1);
          continue;
        }

        const p1Idx = s.path[s.currentStep];
        const p2Idx = s.path[s.currentStep + 1];
        particles[p1Idx].signalIntensity = Math.max(particles[p1Idx].signalIntensity, 1 - s.progress);
        particles[p2Idx].signalIntensity = Math.max(particles[p2Idx].signalIntensity, s.progress);

        const p1 = particles[p1Idx];
        const p2 = particles[p2Idx];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${brandColor}, 0.8)`;
        ctx.lineWidth = 2;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        let isNearMouse = false;
        if (mdist < mouseDistance) {
            isNearMouse = true;
            ctx.beginPath();
            const alpha = (1 - mdist / mouseDistance) * 0.3;
            ctx.strokeStyle = `rgba(${brandColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const currentMaxDist = (p.hub || p2.hub) ? hubDistance : maxDistance;

          if (dist < currentMaxDist) {
            ctx.beginPath();
            const alpha = 1 - dist / currentMaxDist;
            const intensity = Math.max(p.signalIntensity, p2.signalIntensity);
            if (intensity > 0) {
                ctx.strokeStyle = `rgba(${brandColor}, ${alpha * intensity * 0.5})`;
                ctx.lineWidth = 1.2;
            } else {
                ctx.strokeStyle = `rgba(${brandColor}, ${alpha * 0.1})`;
                ctx.lineWidth = 0.5;
            }
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.hub ? p.radius * 1.5 : p.radius, 0, Math.PI * 2);
        
        if (p.signalIntensity > 0 || (isNearMouse && mdist < 100)) {
          const intensity = Math.max(p.signalIntensity, isNearMouse ? (1 - mdist / 100) : 0);
          ctx.fillStyle = `rgba(${brandColor}, ${intensity})`;
          ctx.shadowBlur = (p.hub ? 20 : 10) * intensity;
          ctx.shadowColor = `rgba(${brandColor}, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(${brandColor}, ${p.baseAlpha})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      clearInterval(signalInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: theme === "dark" 
            ? "radial-gradient(circle at center, #001a10 0%, #000d0a 100%)" 
            : "radial-gradient(circle at center, #f2f2f2 0%, #e0e0e0 100%)"
      }}
    />
  );
};
