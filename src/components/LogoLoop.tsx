"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // px/s
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number; // px
  gap?: number; // px
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25 } as const;

const toCssLength = (v?: number | string) => (typeof v === "number" ? `${v}px` : v ?? undefined);

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  deps: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.complete) done();
      else {
        el.addEventListener("load", done, { once: true });
        el.addEventListener("error", done, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
  }, deps);
};

const useResizeObserver = (
  cb: () => void,
  elements: Array<React.RefObject<Element | null>>,
  deps: React.DependencyList
) => {
  useEffect(() => {
    if (!("ResizeObserver" in window)) {
      const onResize = () => cb();
      window.addEventListener("resize", onResize);
      cb();
      return () => window.removeEventListener("resize", onResize);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const ro = new ResizeObserver(cb);
      ro.observe(ref.current);
      return ro;
    });
    cb();
    return () => observers.forEach((ro) => ro?.disconnect());
  }, deps);
};

const useThemeFlag = () => {
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.getAttribute("data-theme") === "dark");
    update();
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return isDark;
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 80,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 24,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);
    const seqCloneRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const isDark = useThemeFlag();

    const measure = useCallback(() => {
      const ul = seqRef.current;
      if (!ul) return;
      const w = Math.round(ul.scrollWidth);
      if (w > 0) setSeqWidth(w);
    }, []);

    useImageLoader(seqRef, measure, [logos, logoHeight, gap]);
    useResizeObserver(measure, [containerRef, seqRef], [logos, logoHeight, gap]);

    const rafRef = useRef<number | null>(null);
    const lastRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
      const track = trackRef.current;
      if (!track || seqWidth === 0) return;
      const prefersReduced =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;

      if (prefersReduced) {
        track.style.transform = "translate3d(0,0,0)";
        return;
      }

      const dirMult = direction === "left" ? 1 : -1;
      const tick = (t: number) => {
        if (lastRef.current == null) lastRef.current = t;
        const dt = Math.max(0, t - lastRef.current) / 1000;
        lastRef.current = t;

        const target = pauseOnHover && isHovered ? 0 : dirMult * Math.abs(speed);
        const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
        velocityRef.current += (target - velocityRef.current) * easing;

        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px,0,0)`;
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        lastRef.current = null;
      };
    }, [seqWidth, speed, direction, pauseOnHover, isHovered]);

    const containerStyle: React.CSSProperties = {
      position: "relative",
      overflowX: "hidden",
      width: toCssLength(width) ?? "100%",
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      display: "flex",
      gap: 0,
      willChange: "transform",
      userSelect: "none",
    };

    const listStyle: React.CSSProperties = {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      margin: 0,
      padding: 0,
      listStyle: "none",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      flex: "none",
      width: seqWidth ? `${seqWidth}px` : undefined,
      columnGap: `${gap}px`,
    } as React.CSSProperties;

    const itemStyle: React.CSSProperties = {
      flex: "none",
      fontSize: `${logoHeight}px`,
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      boxSizing: "border-box",
    };

    const imgStyle: React.CSSProperties = {
      height: `${logoHeight}px`,
      width: "auto",
      display: "block",
      objectFit: "contain",
      filter: isDark ? "invert(1) brightness(1.05)" : undefined,
    };

    const makeContent = (item: LogoItem) => {
      const isNode = (item as any).node !== undefined;
      if (isNode) {
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: `${logoHeight}px`,
              lineHeight: 1,
              color: isDark ? "#fff" : "#000",
            }}
            aria-hidden={(item as any).href && !(item as any).ariaLabel ? true : undefined}
          >
            {(item as any).node}
          </span>
        );
      }
      return (
        <img
          style={imgStyle}
          src={(item as any).src}
          srcSet={(item as any).srcSet}
          sizes={(item as any).sizes}
          width={(item as any).width}
          height={(item as any).height}
          alt={(item as any).alt ?? ""}
          title={(item as any).title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
    };

    const renderLogoItem = (item: LogoItem, key: React.Key) => {
      const aria =
        (item as any).ariaLabel ??
        (("node" in item ? (item as any).title : (item as any).alt) ?? (item as any).title);
      const content = makeContent(item);
      const inner = (item as any).href ? (
        <a
          href={(item as any).href}
          aria-label={aria || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: "none", borderRadius: 4, color: "inherit" }}
        >
          {content}
        </a>
      ) : (
        content
      );
      return (
        <li key={key} role="listitem" style={itemStyle}>
          {inner}
        </li>
      );
    };

    const seq = (
      <ul style={listStyle} ref={seqRef} role="list" aria-label={ariaLabel}>
        {logos.map((item, i) => renderLogoItem(item, `a-${i}`))}
      </ul>
    );
    const seqClone = (
      <ul style={listStyle} ref={seqCloneRef} role="list" aria-hidden>
        {logos.map((item, i) => renderLogoItem(item, `b-${i}`))}
      </ul>
    );

    const fadeLeft: React.CSSProperties = fadeOut
      ? {
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "clamp(24px,8%,120px)",
          background: `linear-gradient(to right, ${
            fadeOutColor ?? (isDark ? "#0b0b0b" : "#ffffff")
          } 0%, rgba(0,0,0,0) 100%)`,
          zIndex: 1,
        }
      : {};
    const fadeRight: React.CSSProperties = fadeOut
      ? {
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "clamp(24px,8%,120px)",
          background: `linear-gradient(to left, ${
            fadeOutColor ?? (isDark ? "#0b0b0b" : "#ffffff")
          } 0%, rgba(0,0,0,0) 100%)`,
          zIndex: 1,
        }
      : {};

    return (
      <div
        ref={containerRef}
        style={{ position: "relative", ...containerStyle }}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        className={className}
      >
        {fadeOut && <div aria-hidden style={fadeLeft} />}
        {fadeOut && <div aria-hidden style={fadeRight} />}

        <div ref={trackRef} style={trackStyle}>
          {seq}
          {seqClone}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;

