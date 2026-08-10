/* ============================================================================
   LogoLoop — רצועת לוגואים בגלילה אינסופית (מבוסס React Bits)
   ----------------------------------------------------------------------------
   שינוי מול המקור: רק הווריאנט האופקי נשמר. הרצועה בעמוד הזה אופקית, והקוד
   האנכי גרר ניהול גובה מול ה-parent שלא היה בשימוש. `direction` עדיין נתמך
   ל-left/right. אין תלויות חיצוניות.
   ========================================================================== */
import { useCallback, useEffect, useMemo, useRef, useState, memo, type CSSProperties, type ReactNode } from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

export type LogoItem =
  | { node: ReactNode; title?: string; href?: string; ariaLabel?: string }
  | { src: string; alt?: string; title?: string; href?: string; srcSet?: string; sizes?: string; width?: number; height?: number };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const toCssLength = (value?: number | string) => (typeof value === "number" ? `${value}px` : value);

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  hoverSpeed = 0,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const observers = [containerRef, seqRef]
      .map((ref) => {
        if (!ref.current) return null;
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(ref.current);
        return observer;
      })
      .filter(Boolean) as ResizeObserver[];
    updateDimensions();
    return () => observers.forEach((o) => o.disconnect());
  }, [updateDimensions, logos, gap, logoHeight]);

  /* התמונות משנות את רוחב הרצף כשהן נטענות — נמדוד שוב אחרי כל טעינה */
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      updateDimensions();
      return;
    }
    let remaining = images.length;
    const onSettled = () => {
      remaining -= 1;
      if (remaining === 0) updateDimensions();
    };
    images.forEach((img) => {
      if (img.complete) onSettled();
      else {
        img.addEventListener("load", onSettled, { once: true });
        img.addEventListener("error", onSettled, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onSettled);
        img.removeEventListener("error", onSettled);
      });
    };
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    let lastTimestamp: number | null = null;
    let offset = 0;
    let velocity = 0;

    if (seqWidth > 0) {
      offset = ((offset % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const target = isHovered ? hoverSpeed : targetVelocity;
      velocity += (target - velocity) * (1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU));

      if (seqWidth > 0) {
        offset = (((offset + velocity * deltaTime) % seqWidth) + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [targetVelocity, seqWidth, isHovered, hoverSpeed]);

  const rootClassName = [
    "logoloop",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderLogoItem = (item: LogoItem, key: string, isFirstCopy: boolean) => {
    const isNodeItem = "node" in item;
    const content = isNodeItem ? (
      <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
        {item.node}
      </span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        /* רק העותק הראשון נקרא למקריא מסך — השאר מסומנים aria-hidden ברמת הרשימה */
        alt={isFirstCopy ? (item.alt ?? "") : ""}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
    const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
    return (
      <li className="logoloop__item" key={key}>
        {item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  };

  const containerStyle: CSSProperties = {
    width: toCssLength(width) ?? "100%",
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
    ...style,
  } as CSSProperties;

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`, copyIndex === 0))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoop;
