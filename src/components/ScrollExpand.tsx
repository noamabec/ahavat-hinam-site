/* ============================================================================
   ScrollExpand — React Bits (React + CSS)
   ----------------------------------------------------------------------------
   שלושה שינויים מול המקור:
   1. mediaType מקבל גם "iframe", שמרנדר את המדיה החוצה-מקור באותה נקודת
      עיגון (mediaRef) שעליה רץ ה-scale הרגיל.
   2. כש-mediaType="iframe" וגם סופק poster: מוצגת תמונת פוסטר משלנו + כפתור
      play מעל ה-iframe, וה-iframe עצמו לא נטען כלל עד קליק — כי פייסבוק לא
      חושף API לקבוע את תמונת הפוסטר הפנימית שלו (תוכן חוצה-מקור), אז הדרך
      היחידה "להחליף" אותה היא לכסות אותה במשהו שלנו לפני שהיא בכלל נטענת.
   3. אם ה-src הוא embed של video.php של פייסבוק: קליק על הפוסטר מרנדר
      <div class="fb-video" data-autoplay="true"> דרך ה-SDK הרשמי של פייסבוק
      (XFBML) במקום iframe גולמי עם autoplay=true בכתובת — כי ה-iframe הגולמי
      מתעלם כמעט תמיד מ-autoplay ומציג מחדש את הפלייבאק/תמונה הפנימית של
      פייסבוק, בעוד ה-SDK הרשמי מכבד autoplay בפועל.
   שאר ההתנהגות זהה למקור.
   ========================================================================== */
import { useCallback, useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import "./ScrollExpand.css";

declare global {
  interface Window {
    FB?: { XFBML?: { parse: (el?: Element) => void } };
  }
}

const FB_SDK_ID = "facebook-jssdk";
function ensureFacebookSdk(locale = "he_IL") {
  if (document.getElementById(FB_SDK_ID)) return;
  if (!document.getElementById("fb-root")) {
    const root = document.createElement("div");
    root.id = "fb-root";
    document.body.appendChild(root);
  }
  const script = document.createElement("script");
  script.id = FB_SDK_ID;
  script.async = true;
  script.defer = true;
  script.crossOrigin = "anonymous";
  script.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v19.0`;
  document.body.appendChild(script);
}

function extractFacebookVideoHref(src: string): string {
  /* ה-SDK של פייסבוק דורש handshake אמיתי דרך postMessage לצורך מדידת הגודל
     שלו — וזה נכשל בשקט תחת file:// (כמו בתצוגה מקדימה מקומית של הקובץ).
     בפריסה אמיתית (https, כמו ב-Lovable) זה עובד כמצופה, אז מפעילים את ה-SDK
     רק שם ומשתמשים ב-iframe הגולמי כגיבוי ל-file://. */
  if (typeof window !== "undefined" && window.location.protocol === "file:") return "";
  try {
    return new URL(src).searchParams.get("href") || "";
  } catch {
    return "";
  }
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

interface ScrollExpandProps {
  src?: string;
  mediaType?: "image" | "video" | "iframe";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  /** סלקטור לאלמנט הדר דביק שיושב מעל (למשל ".ahv-header") — לא בספריית המקור.
      ה-stage ננעל מתחתיו במקום מתחת top:0, כדי שההדר לא יחתוך את המדיה. */
  stickyOffsetSelector?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ScrollExpand = ({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  stickyOffsetSelector = "",
  children,
  className = "",
  style,
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | HTMLIFrameElement | HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const fbContainerRef = useRef<HTMLDivElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const fbHref = mediaType === "iframe" ? extractFacebookVideoHref(src) : "";

  useEffect(() => {
    if (!videoStarted || !fbHref) return;
    ensureFacebookSdk();
    let cancelled = false;
    const tryParse = () => {
      if (cancelled) return;
      if (window.FB?.XFBML && fbContainerRef.current) {
        window.FB.XFBML.parse(fbContainerRef.current);
      } else {
        setTimeout(tryParse, 150);
      }
    };
    tryParse();
    return () => {
      cancelled = true;
    };
  }, [videoStarted, fbHref]);

  const propsRef = useRef<Record<string, number | boolean | string>>({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    stickyOffsetSelector,
  };
  const stickyOffsetRef = useRef(0);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current as {
      startWidth: number;
      startHeight: number;
      startRadius: number;
      endRadius: number;
      mediaZoom: number;
      overlayScrim: number;
    };

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current as {
        useWindowScroll: boolean;
        scrollDistance: number;
        holdDistance: number;
        stickyOffsetSelector: string;
      };
      const offsetEl = c.stickyOffsetSelector ? document.querySelector<HTMLElement>(c.stickyOffsetSelector) : null;
      stickyOffsetRef.current = offsetEl ? offsetEl.getBoundingClientRect().height : 0;
      stage.style.top = `${stickyOffsetRef.current}px`;

      stageH = (c.useWindowScroll ? window.innerHeight : root.clientHeight) - stickyOffsetRef.current;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty("--se-title-size", `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current as { enabled: boolean; scrollDistance: number; useWindowScroll: boolean };
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top - stickyOffsetRef.current;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current as { smoothing: number };
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if ((propsRef.current.smoothing as number) <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller: Window | HTMLDivElement = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  let media: ReactNode;
  if (mediaType === "video") {
    media = (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  } else if (mediaType === "iframe" && poster) {
    media = (
      <div ref={mediaRef as React.RefObject<HTMLDivElement>} className="scroll-expand__media scroll-expand__iframe-wrap">
        {videoStarted ? (
          fbHref ? (
            <div ref={fbContainerRef} className="scroll-expand__fb-wrap">
              <div
                className="fb-video"
                data-href={fbHref}
                data-autoplay="true"
                data-allowfullscreen="true"
                data-show-text="false"
                data-width="560"
                data-height="314"
              />
            </div>
          ) : (
            <iframe
              className="scroll-expand__iframe"
              src={`${src}${src.includes("?") ? "&" : "?"}autoplay=true`}
              title={alt || title || "embedded video"}
              scrolling="no"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          )
        ) : (
          <button
            type="button"
            className="scroll-expand__poster"
            onClick={() => setVideoStarted(true)}
            aria-label={alt || title || "הפעלת הסרטון"}
          >
            <img src={poster} alt="" draggable={false} />
            <span className="scroll-expand__play" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    );
  } else if (mediaType === "iframe") {
    media = (
      <iframe
        ref={mediaRef as React.RefObject<HTMLIFrameElement>}
        className="scroll-expand__media"
        src={src}
        title={alt || title || "embedded video"}
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder={0}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    );
  } else {
    media = (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? "" : "scroll-expand--scroller"} ${className}`.trim()}
      style={style}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
