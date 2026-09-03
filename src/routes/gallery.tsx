import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { useLegacyScript } from "@/hooks/useLegacyScript";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({ component: Gallery });

function Gallery() {
  /* הגלריה התלת-ממדית. שואבת את רשימת התמונות מ-Supabase, כך
     שהוספה/הסרה בפאנל הניהול משתקפת כאן מיד. */
  useLegacyScript("/js/dome-gallery.js");

  return (
    <Layout theme="blue" title={"גלריית תמונות - אהבת חינ\"מ"} description={"רגעים מהפעילות של בית שי: חוגים, טיולים, אירועים ויצירה. גררו כדי לסובב את קשת התמונות."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero page-hero--slim">
            <div className="container">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">גלריית תמונות</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">69 רגעים מהיומיום שלנו</span>
              <h1 data-reveal="lines">
                <span className="ln"><i>הכי קל להבין מה</i></span>
                <span className="ln"><i>קורה כאן דרך</i></span>
                <span className="ln"><i>העיניים שלהם.</i></span>
              </h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                חוגים, טיולים, אירועים, יצירה וחברויות. גררו כדי לסובב את קשת התמונות,
                ולחצו על תמונה כדי להגדיל אותה.
              </p>
            </div>
          </section>

          {/* ===================== קשת התמונות (DomeGallery) ===================== */}
          <section className="sec--tight">
            <div className="container">
              <div className="dome-wrap" data-reveal="fade">
                <div id="domeGallery" className="sphere-root" tabIndex="0"
                     role="region" aria-label="קשת תמונות מהפעילות. גררו כדי לסובב, לחצו על תמונה כדי להגדיל."></div>
              </div>
              <p className="dome-hint" aria-hidden="true">
                <span className="dome-hint__ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m9 6-6 6 6 6"/><path d="m15 6 6 6-6 6"/></svg>
                </span>
                גררו לצדדים כדי לסובב
              </p>
            </div>
          </section>

          {/* ===================== לאן ממשיכים מכאן ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <p className="sec__kicker">מה שרואים בתמונות</p>
              <h2>קורה כל יום, בבית שי</h2>
              <div className="rule"></div>
            </div>
            <div className="pillars" data-stagger="110">
              <Link className="pillar pillar--blue" to="/beit-shai" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>
                </span>
                <h3>בית שי</h3>
                <p>החוגים, הטיפולים, החצר, הכלבים ופינת החי שמאחורי רוב התמונות כאן.</p>
              </Link>
              <Link className="pillar pillar--yellow" to="/vahavta" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <h3>תנועת ואהבת</h3>
                <p>ימי שיא, תהלוכות והתנדבויות של ילדי התנועה, יחד עם ילדי הקהילה.</p>
              </Link>
              <Link className="pillar pillar--green" to="/the-gallery" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg>
                </span>
                <h3>הגלריה שלנו</h3>
                <p>בית הקפה, התערוכות והאירועים שכל ההכנסות מהם חוזרות לילדים.</p>
              </Link>
            </div>
          </section>

          {/* ===================== סיום ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>הרגעים האלה עולים כסף.</h2>
                <p>כל תרומה מממנת עוד חוג, עוד טיפול ועוד יום שמסתיים בתמונה כזאת.</p>
              </div>
              <Link to="/donate" className="btn btn--wide btn--white">
                <span>לתרומה מאובטחת</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
