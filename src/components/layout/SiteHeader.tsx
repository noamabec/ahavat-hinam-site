import { Link, useLocation } from "@tanstack/react-router";

/* ============================================================
   ההאדר של האתר - שתי וריאציות, בכוונה.
   ------------------------------------------------------------
   באתר המקורי יש שני האדרים שונים, ולא בטעות:

   - עמוד הבית (variant="home"): שמונה קישורים שטוחים עם תוויות
     מקוצרות (בראשית, ואהבת, גלריה), בלי תפריט נפתח.
   - 26 העמודים הפנימיים (variant="inner"): חמישה מהקישורים
     מקובצים תחת תפריט נפתח "מה אנחנו עושים", עם תוויות מלאות.

   זה לא ניתן לאיחוד סתם כך: גיליון הסגנונות של עמוד הבית
   (home.scoped.css) לא מכיל כלל את הכללים של .nav__group /
   .nav__trigger / .nav__menu, כי הם מעולם לא היו שם. הצגת התפריט
   הנפתח בעמוד הבית תרנדר אותו בלי עיצוב - שורת קישורים רצופה
   וחץ ענק. אם רוצים להאחיד, צריך גם להעביר את הכללים האלה
   ל-home.scoped.css, וזו החלטת עיצוב - לא תיקון.
   ============================================================ */

const GROUP_LINKS = [
  { to: "/beit-shai", nav: "beit-shai", label: "בית שי" },
  { to: "/breshit", nav: "breshit", label: "בשביל בראשית" },
  { to: "/vahavta", nav: "vahavta", label: "תנועת הנוער ואהבת" },
  { to: "/the-gallery", nav: "the-gallery", label: "הגלריה שלנו" },
  { to: "/events", nav: "events", label: "האירועים שהיו" },
];

const MAIN_LINKS = [
  { to: "/about", nav: "about", label: "מי אנחנו" },
  { to: "/gallery", nav: "gallery", label: "גלריית תמונות" },
  { to: "/press", nav: "press", label: "בתקשורת" },
  { to: "/contact", nav: "contact", label: "צרו קשר" },
];

/* עמוד הבית - תוויות מקוצרות, סדר משלו, בלי קיבוץ */
const HOME_LINKS = [
  { to: "/beit-shai", label: "בית שי" },
  { to: "/breshit", label: "בראשית" },
  { to: "/vahavta", label: "ואהבת" },
  { to: "/events", label: "אירועים" },
  { to: "/about", label: "מי אנחנו" },
  { to: "/gallery", label: "גלריה" },
  { to: "/press", label: "בתקשורת" },
  { to: "/contact", label: "צרו קשר" },
];

/* התפריט הנייד זהה בשני העמודים מבחינת רשימת היעדים; מה שמשתנה
   הוא רק כותרת הקבוצה והסיווג is-sub, שקיימים בעמודים הפנימיים. */
const MOBILE_LINKS = [
  { to: "/beit-shai", label: "בית שי" },
  { to: "/breshit", label: "בשביל בראשית" },
  { to: "/vahavta", label: "תנועת הנוער ואהבת" },
  { to: "/the-gallery", label: "הגלריה שלנו" },
  { to: "/events", label: "האירועים שהיו" },
  { to: "/about", label: "מי אנחנו" },
  { to: "/gallery", label: "גלריית תמונות" },
  { to: "/press", label: "בתקשורת" },
  { to: "/contact", label: "צרו קשר" },
  { to: "/donate", label: "לתרומות" },
];

function ArrowIcon() {
  return (
    <span className="ico ico--sm" aria-hidden="true">
      <svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none">
        <use href="#arrow" />
      </svg>
    </span>
  );
}

interface SiteHeaderProps {
  variant?: "home" | "inner";
}

export default function SiteHeader({ variant = "inner" }: SiteHeaderProps) {
  const { pathname } = useLocation();
  /* הסימון הפעיל נגזר מהמסלול. באתר הסטטי זה היה aria-current ידני
     בכל קובץ HTML - כאן זה נגזר אוטומטית, כך שאי אפשר לשכוח לעדכן. */
  const isCurrent = (to: string) => (pathname === to ? "page" : undefined);

  return (
    <header className="site-header">
      <div className="container">
        {variant === "home" ? (
          /* ---------- ההאדר של עמוד הבית ---------- */
          <nav className="nav" id="nav" data-stagger="70" aria-label="ניווט ראשי">
            <button className="nav__toggle" type="button" aria-label="תפריט" aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link to="/" className="nav__logo" aria-label={'אהבת חינ"מ'} data-reveal="scale">
              <img src="/images/logo.png" alt="" className="brand-mark__icon" />
            </Link>

            {HOME_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav__link"
                data-reveal="fade"
                aria-current={isCurrent(l.to)}
              >
                {l.label}
              </Link>
            ))}

            <Link to="/donate" className="btn btn--pill btn--blue nav__cta" data-reveal="fade">
              <span>לתרומות</span>
              <ArrowIcon />
            </Link>

            <div className="nav__links">
              {MOBILE_LINKS.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : (
          /* ---------- ההאדר של העמודים הפנימיים ---------- */
          <nav className="nav" id="nav" data-open="false" aria-label="ניווט ראשי">
            <button className="nav__toggle" type="button" aria-label="תפריט" aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link to="/" className="nav__logo" aria-label={'אהבת חינ"מ - לעמוד הבית'}>
              <img src="/images/logo.png" alt="" className="brand-mark__icon" />
            </Link>

            <div className="nav__group">
              <button className="nav__trigger" type="button" aria-expanded="false">
                <span>מה אנחנו עושים</span>
                <svg viewBox="0 0 12 8" fill="none" aria-hidden="true">
                  <path
                    d="M1 1.5 6 6.5l5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="nav__menu">
                {GROUP_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} data-nav={l.nav}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {MAIN_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav__link"
                data-nav={l.nav}
                aria-current={isCurrent(l.to)}
              >
                {l.label}
              </Link>
            ))}

            <Link to="/donate" className="btn btn--pill btn--blue nav__cta" data-nav="donate">
              <span>לתרומות</span>
              <ArrowIcon />
            </Link>

            {/* תפריט המובייל. סדר הפריטים כאן קובע את ההשהיה המדורגת
                שה-CSS מחשב לפי --i, ולכן הוא חייב להישאר כפי שהוא. */}
            <div className="nav__links">
              <span className="is-group-title">מה אנחנו עושים</span>
              {GROUP_LINKS.map((l) => (
                <Link key={l.to} className="is-sub" to={l.to}>
                  {l.label}
                </Link>
              ))}
              {MAIN_LINKS.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
              <Link to="/donate">לתרומות</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
