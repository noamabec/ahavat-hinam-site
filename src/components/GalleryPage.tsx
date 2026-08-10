import { useRef, useState } from "react";
import DomeGallery from "./DomeGallery";
import { NAV_RIGHT, NAV_LEFT, useScrollMotion } from "./AhavatHinamLanding";
import "@/styles/ahavat-hinam.css";

/* ---------------------------------------------------------------------------
 * עמוד גלריה — קשת תמונות תלת-ממדית (DomeGallery), כל 69 התמונות מהפעילות.
 * הכותרת/פוטר משוכפלים מ-AhavatHinamLanding בכוונה (לא הופשטו לרכיב משותף):
 * זה עמוד עצמאי אחד, והכפילות הקטנה פשוטה יותר מתלות חוצת-עמודים.
 * ------------------------------------------------------------------------- */

const GALLERY_COUNT = 69;
const GALLERY_IMAGES = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
  src: `/images/gallery-full/d${String(i + 1).padStart(2, "0")}.jpg`,
  alt: "תמונה מהפעילות של אהבת חינ\"מ",
}));

export default function GalleryPage() {
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

              <a href="/" className="ahv-nav__logo" aria-label="אהבת חינ&quot;מ" data-reveal="scale">
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

        {/* ===================== GALLERY (DOME) ===================== */}
        <section className="ahv-gallery-page">
          <div className="ahv-container">
            <h1 data-reveal="up">גלריה</h1>
            <p className="ahv-gallery-page__lead" data-reveal="up" style={{ "--d": "100ms" } as React.CSSProperties}>
              רגעים מהפעילות שלנו. גררו כדי לסובב, לחצו על תמונה כדי להגדיל.
            </p>
          </div>
          <div className="ahv-gallery-page__dome" data-reveal="fade" style={{ "--d": "200ms" } as React.CSSProperties}>
            <DomeGallery
              images={GALLERY_IMAGES}
              segments={19}
              grayscale={false}
              fit={0.65}
              maxVerticalRotationDeg={40}
              overlayBlurColor="#FFFFFF"
              openedImageWidth="min(80vw, 500px)"
              openedImageHeight="min(80vh, 620px)"
            />
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="ahv-footer">
          <div className="ahv-container">
            <div className="ahv-footer__band" data-reveal="scale" />
          </div>
        </footer>
      </div>
    </div>
  );
}
