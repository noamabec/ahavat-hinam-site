import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import CircularGallery, { type GalleryItem } from "./CircularGallery";
import LogoLoop from "./LogoLoop";
import ScrollExpand from "./ScrollExpand";
import "@/styles/ahavat-hinam.css";

const FACEBOOK_VIDEO_SRC =
  "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fhnn.hn.7%2Fvideos%2F222530866458185%2F&show_text=false&width=560&t=0";

/* ---------------------------------------------------------------------------
 * אהבת חינ"מ — landing page
 * Ported 1:1 from the Figma frame "Desktop - 2" (1440 × 5423), RTL.
 * Metrics live in @/styles/ahavat-hinam.css (fluid clamp() values, pixel-exact
 * at 1440px). Brand colours are exposed there as HSL triplets:
 *   --brand-blue | --brand-yellow | --brand-coral
 * Assets live in /public/images and /public/fonts.
 * ------------------------------------------------------------------------- */

export const NAV_RIGHT = [
  { label: "דף הבית", href: "#" },
  { label: "בית ש”י", href: "#" },
  { label: "בראשית", href: "#" },
] as const;

export const NAV_LEFT = [
  { label: "מי אנחנו", href: "#" },
  { label: "תרומות", href: "#" },
  { label: "צרו קשר", href: "#" },
] as const;

type CardItem = {
  key: string;
  title: string;
  tone: "blue" | "yellow" | "coral" | "green";
  thumb: string;
  thumbAlt: string;
};

/* "כל מה שקורה אצלנו" — one card per colour, RTL order (rightmost first) */
const PROGRAMS: CardItem[] = [
  { key: "beit-shai", title: "בית שי", tone: "blue", thumb: "/images/gallery/g05.jpg", thumbAlt: "ילדים בפעילות בבית ש״י" },
  { key: "bereshit", title: "בראשית", tone: "yellow", thumb: "/images/gallery/g07.jpg", thumbAlt: "פעילות יצירה בתוכנית בראשית" },
  { key: "community", title: "פעילויות קהילתיות", tone: "coral", thumb: "/images/gallery/g09.jpg", thumbAlt: "פעילות קהילתית משותפת" },
];

/* גלריה — מוגדר ברמת המודול כדי שההפניה תישאר יציבה בין רינדורים
   (CircularGallery בונה מחדש את סצנת ה-WebGL כש-items משתנה) */
const GALLERY: GalleryItem[] = Array.from({ length: 16 }, (_, i) => ({
  image: `/images/gallery/g${String(i + 1).padStart(2, "0")}.jpg`,
}));

/* "אנחנו בתקשורת" — same card, all green */
const PRESS: CardItem[] = [
  { key: "press-beit-shai", title: "בית שי", tone: "green", thumb: "/images/gallery/g12.jpg", thumbAlt: "בית ש״י בתקשורת" },
  { key: "press-bereshit", title: "בראשית", tone: "green", thumb: "/images/gallery/g14.jpg", thumbAlt: "בראשית בתקשורת" },
  { key: "press-community", title: "פעילויות קהילתיות", tone: "green", thumb: "/images/gallery/g16.jpg", thumbAlt: "פעילויות קהילתיות בתקשורת" },
];

const CARD_TEXT = "בבית שי ילדים על הרצף האוטיסטי מוצאים מקום";

const FOOTER_NAV = [
  {
    title: "מפת האתר",
    links: [
      { label: "דף הבית", href: "/" },
      { label: "בית ש”י", href: "#" },
      { label: "בראשית", href: "#" },
      { label: "מי אנחנו", href: "#" },
      { label: "גלריה", href: "/gallery" },
      { label: "אנחנו בתקשורת", href: "#" },
    ],
  },
  {
    title: "תמכו בנו",
    links: [
      { label: "תרומה חד-פעמית", href: "#" },
      { label: "הוראת קבע", href: "#" },
      { label: "התנדבות", href: "#" },
      { label: "שותפויות ועסקים", href: "#" },
      { label: "הקדשת אירוע", href: "#" },
    ],
  },
] as const;

/* Partner logos — cut individually from the source strip (image 3.png), black
   backdrops removed via flood-fill (not AI background-removal: it hallucinated
   the Hebrew text at high scale) and upscaled 3x with plain bicubic + a light
   unsharp mask, so no AI ever touched the actual glyphs. RTL DOM order here
   matches the strip's original left-to-right reading order. */
const PARTNER_LOGOS = [
  { file: "partner-goodly.png", alt: "גוי-לי נחפים" },
  { file: "partner-ariel.png", alt: "מאפיית אריאל שקד" },
  { file: "partner-pinguin.png", alt: "פינגוין אוכל מנות עוף" },
  { file: "partner-telefon.png", alt: "טלרון — חברת את השירות לחשמל, ויצמן 71 נהריה" },
  { file: "partner-klavlaklev.png", alt: "כלבו לכלב — אוהבים את החיה שלך" },
] as const;

const TIERS = [50, 150, 200] as const;

/* --- icons: exact Figma arrow geometry (18.385px / 25px shaft, ↖) --------- */
const ARROW_SM_PATH =
  "M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z";
const ARROW_MD_PATH =
  "M25.7071 8.07107C26.0976 7.68054 26.0976 7.04738 25.7071 6.65685L19.3431 0.292893C18.9526 -0.097631 18.3194 -0.097631 17.9289 0.292893C17.5384 0.683418 17.5384 1.31658 17.9289 1.70711L23.5858 7.36396L17.9289 13.0208C17.5384 13.4113 17.5384 14.0445 17.9289 14.435C18.3194 14.8256 18.9526 14.8256 19.3431 14.435L25.7071 8.07107ZM0 7.36396V8.36396H25V7.36396V6.36396H0V7.36396Z";
const ARROW_LG_PATH =
  "M82.7678 20.1777C83.7441 19.2014 83.7441 17.6184 82.7678 16.6421L66.8579 0.732233C65.8816 -0.244078 64.2986 -0.244078 63.3223 0.732233C62.346 1.70854 62.346 3.29146 63.3223 4.26777L77.4645 18.4099L63.3223 32.552C62.346 33.5283 62.346 35.1113 63.3223 36.0876C64.2986 37.0639 65.8816 37.0639 66.8579 36.0876L82.7678 20.1777ZM0 18.4099V20.9099H81V18.4099V15.9099H0V18.4099Z";

export function ArrowSm() {
  return (
    <span className="ahv-ico ahv-ico--sm" aria-hidden="true">
      <svg viewBox="0 0 19.3848 14.7279" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d={ARROW_SM_PATH} fill="currentColor" />
      </svg>
    </span>
  );
}

function ArrowMd() {
  return (
    <span className="ahv-ico ahv-ico--md" aria-hidden="true">
      <svg viewBox="0 0 26 14.7279" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d={ARROW_MD_PATH} fill="currentColor" />
      </svg>
    </span>
  );
}

function ArrowLg({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={flip ? "is-prev" : undefined}
      viewBox="0 0 83.5 36.8198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={ARROW_LG_PATH} fill="currentColor" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * Motion. Everything is opt-in through data attributes on the markup:
 *   data-reveal="up|fade|scale|mask|lines"  — scroll-in reveal
 *   data-stagger="<ms>"                     — cascade the children of a group
 *   data-parallax="<factor>" [data-pscale]  — drift on scroll
 * The `ahv-motion` class is only added after mount, so the page renders fully
 * visible without JS and nothing can get stuck hidden.
 * ------------------------------------------------------------------------- */
/* runs before paint on the client (no flash of the un-hidden page), falls back
   to useEffect during SSR where layout effects are a no-op anyway */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useScrollMotion(root: RefObject<HTMLDivElement>) {
  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.classList.add("ahv-motion");

    /* cascade delays inside each group */
    el.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const step = parseFloat(group.dataset.stagger || "") || 90;
      group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((kid, i) => {
        if (!kid.style.getPropertyValue("--d")) kid.style.setProperty("--d", `${i * step}ms`);
      });
    });

    /* reveal on scroll */
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io!.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
      );
      targets.forEach((t) => io!.observe(t));
    }

    /* parallax + progress bar — a single rAF, transform only */
    const bar = el.querySelector<HTMLElement>(".ahv-progress__bar");
    const par = Array.from(el.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;

    const frame = () => {
      ticking = false;
      const vh = innerHeight;
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      }
      if (reduce) return;
      for (const node of par) {
        const r = node.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue; /* out of range — skip the math */
        const y = (r.top + r.height / 2 - vh / 2) * (parseFloat(node.dataset.parallax || "") || 0);
        const s = node.dataset.pscale;
        node.style.transform = `translate3d(0,${y.toFixed(2)}px,0)${s ? ` scale(${s})` : ""}`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    /* the static scale must land on the first frame, or the gallery edges gap */
    if (!reduce) {
      par.forEach((n) => {
        if (n.dataset.pscale) n.style.transform = `scale(${n.dataset.pscale})`;
      });
    }

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    frame();

    return () => {
      io?.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [root]);
}

/* --- footer icons: stroke icons for contact, filled glyphs for the socials -- */
const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const IconPin = () => (
  <svg {...strokeProps}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconPhone = () => (
  <svg {...strokeProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const IconMail = () => (
  <svg {...strokeProps}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconClock = () => (
  <svg {...strokeProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 12s0-3.8-.48-5.62a2.94 2.94 0 0 0-2.07-2.08C18.63 3.82 12 3.82 12 3.82s-6.63 0-8.45.48a2.94 2.94 0 0 0-2.07 2.08C1 8.2 1 12 1 12s0 3.8.48 5.62a2.94 2.94 0 0 0 2.07 2.08c1.82.48 8.45.48 8.45.48s6.63 0 8.45-.48a2.94 2.94 0 0 0 2.07-2.08C23 15.8 23 12 23 12ZM9.82 15.4V8.6L15.7 12l-5.88 3.4Z" />
  </svg>
);
const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.16 8.16 0 0 1-1.25-4.37c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12s-.64.8-.78.97c-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

/** The card used by both "כל מה שקורה אצלנו" and "אנחנו בתקשורת". */
function ProgramCard({ item }: { item: CardItem }) {
  return (
    <article data-reveal="up" className={`ahv-card ahv-card--${item.tone}`}>
      <div className="ahv-card__thumb">
        <img src={item.thumb} alt={item.thumbAlt} loading="lazy" />
      </div>
      <h3 className="ahv-card__title">{item.title}</h3>
      <p className="ahv-card__text">{CARD_TEXT}</p>
      <a href="#" className="ahv-btn ahv-btn--rect">
        <span>קראו עוד</span>
        <ArrowSm />
      </a>
    </article>
  );
}

export default function AhavatHinamLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollMotion(pageRef);

  return (
    <div className="ahv-page" dir="rtl" lang="he" ref={pageRef}>
      <div className="ahv-progress" aria-hidden="true">
        <div className="ahv-progress__bar" />
      </div>
      <div className="ahv-frame">

        {/* ===================== HEADER ===================== */}
        <header className="ahv-header">
          <div className="ahv-container">
            <nav className="ahv-nav" data-stagger="70">
              <button
                type="button"
                className="ahv-nav__toggle"
                aria-label="תפריט"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span /><span /><span />
              </button>

              {NAV_RIGHT.map((item) => (
                <a key={item.label} href={item.href} data-reveal="fade">{item.label}</a>
              ))}

              <a href="#" className="ahv-nav__logo" aria-label="אהבת חינ&quot;מ" data-reveal="scale">
                <img
                  src="/images/logo.png"
                  alt="לוגו אהבת חינ&quot;מ — עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד"
                />
              </a>

              {NAV_LEFT.map((item) => (
                <a key={item.label} href={item.href} data-reveal="fade">{item.label}</a>
              ))}

              {menuOpen && (
                <div className="ahv-nav__drawer">
                  {[...NAV_RIGHT, ...NAV_LEFT].map((item) => (
                    <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </header>

        {/* ===================== HERO ===================== */}
        <section className="ahv-hero">
          <div className="ahv-container ahv-hero__inner">
            <div className="ahv-hero__copy">
              {/* each line rides in from behind its own mask — the wrappers
                  collapse back to inline below 1024px so the text can wrap */}
              <h1 data-reveal="lines">
                <span className="ahv-ln"><i>לכל ילד מגיע</i></span>{" "}
                <span className="ahv-ln"><i>מקום שבו הוא לא צריך</i></span>{" "}
                <span className="ahv-ln"><i>להסביר את עצמו.</i></span>
              </h1>
              <p className="ahv-hero__lead" data-reveal="up" style={{ "--d": "300ms" } as CSSProperties}>
                אצלנו ילדים על הרצף האוטיסטי מוצאים מקום שמקבל אותם בדיוק כפי שהם. מקום שבו הם
                יכולים להרגיש בטוחים, שייכים, אהובים וחופשיים להיות הם.
              </p>
              <div className="ahv-hero__actions" data-reveal="up" style={{ "--d": "450ms" } as CSSProperties}>
                <a href="#" className="ahv-btn ahv-btn--pill ahv-btn--blue">
                  <span>תרמו לנו</span>
                  <ArrowSm />
                </a>
                <a href="#" className="ahv-btn ahv-btn--pill ahv-btn--ghost-yellow">
                  <span>הכירו אותנו</span>
                </a>
              </div>
            </div>

            <div className="ahv-hero__media" data-reveal="fade" style={{ "--d": "150ms" } as CSSProperties}>
              <img src="/images/hero.png" alt="אם מחבקת את בתה, ויד של מבוגר אוחזת ביד של ילד" data-parallax="-0.05" />
              <span className="ahv-hero__dot ahv-hero__dot--blue" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ============ PARTNERS — logo strip in the band under the hero ============ */}
        <section className="ahv-partners">
          <div className="ahv-container">
            <LogoLoop
              logos={PARTNER_LOGOS.map((logo) => ({ src: `/images/partners/${logo.file}`, alt: logo.alt }))}
              speed={55}
              hoverSpeed={0}
              logoHeight={108}
              gap={47}
              fadeOut
              fadeOutColor="#FFFFFF"
              scaleOnHover
              ariaLabel="לוגואים של שותפים ותומכים"
            />
          </div>
        </section>

        {/* ============ VIDEO — נפתח על הגלילה, פייסבוק, בין הלוגואים ל"כל מה שקורה אצלנו" ============ */}
        <section className="ahv-video-reveal">
          <ScrollExpand
            src={FACEBOOK_VIDEO_SRC}
            mediaType="iframe"
            poster="/images/video-poster.jpg"
            alt="סרטון מפייסבוק — אהבת חינ״מ"
            scrollHint="גללו לצפייה"
            startWidth={50}
            startHeight={52}
            mediaZoom={1.15}
            scrollDistance={1}
            holdDistance={0.25}
            useWindowScroll
            stickyOffsetSelector=".ahv-header"
          />
        </section>

        {/* ===================== PROGRAMS ===================== */}
        <section className="ahv-programs">
          <div className="ahv-container">
            <h2 data-reveal="up">כל מה שקורה אצלנו</h2>
            <div className="ahv-cards" data-stagger="120">
              {PROGRAMS.map((item) => (
                <ProgramCard key={item.key} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section className="ahv-about">
          <div className="ahv-about__collage">
            <img src="/images/about-collage.png" alt="קולאז' תמונות של ילדים מחייכים" data-parallax="-0.045" />
          </div>
          <div className="ahv-container">
            <div className="ahv-about__copy" data-reveal="up">
              <h2>אהבת חינ”מ (חינוך מיוחד) לכולם</h2>
              <div className="ahv-about__body">
                <p>
                  עמותת אהבת חינ"מ לכולם הינה עמותה ,שהוקמה מתוך צורך אמיתי של ילדים על הספקטרום
                  האוטיסטי ובני משפחותיהם.
                </p>
                <p>
                  יסוד העמותה באמונה שלכל אדם הזכות לחיות בכבוד תוך מתן אמצעים וכלים לאנשים עם
                  מוגבלויות, לחיות באיכות חיים טובה יותר ובשותפות , ככל הניתן בחיי קהילה. כל זאת
                  באמצעות פיתוח ומתן שירותים חינוכיים, טיפולים חדשניים, פעילות מחקר והכשרה מקצועית .
                  הקמת מערך תקשורתי ליצירת שינוי עמדות חברתי והמשך העלאת הנושא  על סדר היום הציבורי.
                </p>
                <p>
                  העמותה נוסדה על ידי אמהות  ואחיות לילדים על הרצף האוטיסטי יחד עם יזמים חברתיים.
                </p>
                <p>
                  העמותה שמה עצמה למטרה להקים מרכז קהילתי טיפולי, תוך שהמקום מהווה למעשה בית,  אך
                  העשייה בו מתנהלת כל העת על ידי אנשי מקצוע ומטפלים מוכשרים ומוסמכים בתחום. כמו כן,
                  הצורך בשילוב ושיפור מיומנויות תקשורת וכישורים חברתיים, בא לידי ביטוי בכך שהפעילות
                  החוגית טיפולית תתקיים תמיד בקבוצות קטנות.
                </p>
                <p>בית ש"י יהיה מודל לבתים נוספים בפריפריה.</p>
                <p>
                  מטרות העמותה הן:
                  <br />– לפעול לשילובם של ילדי החינוך המיוחד במרקם החיים הכולל, מתוך תפיסה של שיויון
                  זכויות והזדמנויות.
                  <br />– הקמת מרכז פנאי וטיפול לילדים שאובחנו על הרצף האוטיסטי.
                  <br />– לפעול להעלאת התודעה לשילוב אנשים בקהילה בסדר היום הציבורי.{" "}
                </p>
              </div>
              <a href="#" className="ahv-btn ahv-btn--pill ahv-btn--blue">
                <span>קראו עוד</span>
                <ArrowSm />
              </a>
            </div>
          </div>
        </section>

        {/* ===================== DONATE ===================== */}
        <section className="ahv-donate ahv-container">
          <img className="ahv-donate__boy" src="/images/donate-boy.png" alt="ילד יושב על קצה השלט" />

          <div className="ahv-donate__card" data-reveal="up">
            <h2>לא צריך לשנות עולם שלם כדי לשנות עולם של ילד אחד.</h2>
            <p className="ahv-donate__text">
              התרומה שלכם מאפשרת לילדי בית שי לקבל את הכלים, התמיכה והאהבה שמגיעים להם. כל תרומה,
              קטנה כגדולה, הופכת להזדמנות אמיתית עבור ילד ומשפחתו כל תרומה, קטנה או גדולה, הופכת
              לעוד חיוך, עוד הצלחה, עוד חבר חדש ועוד ילד שמרגיש שהוא שייך.
            </p>
            <a href="#" className="ahv-btn ahv-btn--wide ahv-btn--coral">
              <span>לעמוד התרומות</span>
              <ArrowSm />
            </a>
          </div>

          <div className="ahv-tiers" data-stagger="110">
            {TIERS.map((amount) => (
              <article key={amount} className="ahv-tier" data-reveal="up">
                <p className="ahv-tier__label">
                  לתרומה מהירה <br />
                  של {amount} ש”ח
                </p>
                <a href="#" className="ahv-btn ahv-btn--wide">
                  <span>לחצו כאן</span>
                  <ArrowMd />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== GALLERY ===================== */}
        <section className="ahv-gallery">
          <div className="ahv-container">
            <h2 data-reveal="up">גלריה</h2>
            <div className="ahv-gallery__strip">
              <CircularGallery items={GALLERY} bend={3} borderRadius={0.05} scrollEase={0.02} />
            </div>
            <a href="/gallery" className="ahv-btn ahv-btn--pill ahv-btn--blue ahv-gallery__cta">
              <span>לעמוד הגלריה</span>
              <ArrowSm />
            </a>
          </div>
        </section>

        {/* ===================== PRESS ===================== */}
        <section className="ahv-press">
          <div className="ahv-container">
            <h2 data-reveal="up">אנחנו בתקשורת</h2>
            <div className="ahv-cards" data-stagger="120">
              {PRESS.map((item) => (
                <ProgramCard key={item.key} item={item} />
              ))}
            </div>
            {/* RTL: the first child lands on the right. Design shows → on the right, ← on the left. */}
            <div className="ahv-press__nav" data-reveal="up">
              <button type="button" aria-label="הקודם"><ArrowLg /></button>
              <button type="button" aria-label="הבא"><ArrowLg flip /></button>
            </div>
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="ahv-footer">
          <div className="ahv-container">
            <div className="ahv-footer__band" data-reveal="scale">

              <div className="ahv-footer__cta">
                <div className="ahv-footer__cta-copy">
                  <h2>כל תרומה הופכת לעוד ילד שמרגיש שייך.</h2>
                  <p>הצטרפו אלינו ותנו לילדים על הרצף האוטיסטי בית שמקבל אותם בדיוק כפי שהם.</p>
                </div>
                <a href="#" className="ahv-btn ahv-btn--wide ahv-btn--coral">
                  <span>לתרומה מאובטחת</span>
                  <ArrowSm />
                </a>
              </div>

              <div className="ahv-footer__grid">
                <div className="ahv-footer__brand">
                  <a href="/" className="ahv-footer__logo" aria-label="אהבת חינ&quot;מ">
                    <img
                      src="/images/logo.png"
                      alt="לוגו אהבת חינ&quot;מ — עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד"
                    />
                  </a>
                  <p className="ahv-footer__tagline">
                    עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד. מקימים בית שבו כל ילד מתקבל
                    בדיוק כפי שהוא.
                  </p>
                  <p className="ahv-footer__amuta">עמותה רשומה 58-070-XXX-X · אישור ניהול תקין</p>
                </div>

                {FOOTER_NAV.map((col) => (
                  <nav key={col.title} className="ahv-footer__col">
                    <h3 className="ahv-footer__title">{col.title}</h3>
                    <ul className="ahv-footer__links">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}

                <div className="ahv-footer__col">
                  <h3 className="ahv-footer__title">צרו קשר</h3>
                  <ul className="ahv-footer__contact">
                    <li>
                      <span className="ahv-footer__ico" aria-hidden="true"><IconPin /></span>
                      <span>ויצמן 71, נהריה</span>
                    </li>
                    <li>
                      <span className="ahv-footer__ico" aria-hidden="true"><IconPhone /></span>
                      <a href="tel:+972500000000" dir="ltr">050-000-0000</a>
                    </li>
                    <li>
                      <span className="ahv-footer__ico" aria-hidden="true"><IconMail /></span>
                      <a href="mailto:info@ahavat-hinam.org.il" dir="ltr">info@ahavat-hinam.org.il</a>
                    </li>
                    <li>
                      <span className="ahv-footer__ico" aria-hidden="true"><IconClock /></span>
                      <span>א׳–ה׳, 09:00–17:00</span>
                    </li>
                  </ul>

                  <div className="ahv-footer__social">
                    <a href="#" aria-label="פייסבוק"><IconFacebook /></a>
                    <a href="#" aria-label="אינסטגרם"><IconInstagram /></a>
                    <a href="#" aria-label="יוטיוב"><IconYoutube /></a>
                    <a href="#" aria-label="וואטסאפ"><IconWhatsapp /></a>
                  </div>
                </div>
              </div>

              <div className="ahv-footer__bottom">
                <p className="ahv-footer__copy">
                  © {new Date().getFullYear()} אהבת חינ״מ. כל הזכויות שמורות.
                </p>
                <ul className="ahv-footer__legal">
                  <li><a href="#">תקנון</a></li>
                  <li><a href="#">מדיניות פרטיות</a></li>
                  <li><a href="#">הצהרת נגישות</a></li>
                </ul>
              </div>

            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
