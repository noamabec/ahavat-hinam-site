import { Link } from "@tanstack/react-router";

const SITE_MAP = [
  { to: "/", label: "דף הבית" },
  { to: "/beit-shai", label: "בית שי" },
  { to: "/breshit", label: "בשביל בראשית" },
  { to: "/vahavta", label: "תנועת ואהבת" },
  { to: "/the-gallery", label: "הגלריה שלנו" },
  { to: "/events", label: "האירועים שהיו" },
  { to: "/about", label: "מי אנחנו" },
];

const SUPPORT = [
  { to: "/donate", label: "תרומה חד-פעמית" },
  { to: "/donate#horaat-keva", label: "הוראת קבע" },
  { to: "/contact?topic=%D7%94%D7%AA%D7%A0%D7%93%D7%91%D7%95%D7%AA", label: "התנדבות" },
  { to: "/donate#partners", label: "שותפויות ועסקים" },
  { to: "/the-gallery#events", label: "הקדשת אירוע" },
  { to: "/press", label: "אנחנו בתקשורת" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=%D7%99%D7%A6%D7%97%D7%A7+%D7%A9%D7%93%D7%94+18%2C+%D7%A0%D7%94%D7%A8%D7%99%D7%94";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__band">
          <div className="footer__cta">
            <div className="footer__cta-copy">
              <h2>כל תרומה הופכת לעוד ילד שמרגיש שייך.</h2>
              <p>
                הצטרפו אלינו ותנו לילדים על הרצף האוטיסטי בית שמקבל אותם בדיוק כפי שהם.
              </p>
            </div>
            <Link to="/donate" className="btn btn--wide btn--coral">
              <span>לתרומה מאובטחת</span>
              <span className="ico ico--sm" aria-hidden="true">
                <svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none">
                  <use href="#arrow" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="footer__grid">
            <div className="footer__brand">
              <Link to="/" className="footer__logo" aria-label={'אהבת חינ"מ'}>
                <img src="/images/logo.png" alt="" className="brand-mark__icon" />
              </Link>
              <p className="footer__tagline">
                עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד. מקימים בית שבו כל ילד מתקבל
                בדיוק כפי שהוא.
              </p>
              {/* TODO(לקוח): מספר העמותה עדיין מוסווה - להחליף במספר האמיתי */}
              <p className="footer__amuta">עמותה רשומה 58-070-XXX-X · אישור ניהול תקין</p>
            </div>

            <nav className="footer__col" aria-labelledby="ft-site">
              <h3 id="ft-site" className="footer__title">
                מפת האתר
              </h3>
              <ul className="footer__links">
                {SITE_MAP.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col" aria-labelledby="ft-support">
              <h3 id="ft-support" className="footer__title">
                תמכו בנו
              </h3>
              <ul className="footer__links">
                {SUPPORT.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer__col">
              <h3 className="footer__title">צרו קשר</h3>
              <ul className="footer__contact">
                <li>
                  <span className="footer__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <a href={MAPS_URL} target="_blank" rel="noopener">
                    יצחק שדה 18, נהריה
                  </a>
                </li>
                <li>
                  <span className="footer__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <a href="tel:+972547728223" dir="ltr">
                    054-772-8223
                  </a>
                </li>
                <li>
                  <span className="footer__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <a href="mailto:ah580676369@gmail.com" dir="ltr">
                    ah580676369@gmail.com
                  </a>
                </li>
                <li>
                  <span className="footer__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                  <span>א׳–ה׳, 8:30–13:00</span>
                </li>
              </ul>

              <div className="footer__social">
                <a
                  href="https://www.facebook.com/share/14myQtnN2hC/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener"
                  aria-label="פייסבוק"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/beit_shay_nahariya/"
                  target="_blank"
                  rel="noopener"
                  aria-label="אינסטגרם"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* TODO(לקוח): אין עדיין קישורי יוטיוב/וואטסאפ אמיתיים */}
                <a href="#" aria-label="יוטיוב">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 12s0-3.8-.48-5.62a2.94 2.94 0 0 0-2.07-2.08C18.63 3.82 12 3.82 12 3.82s-6.63 0-8.45.48a2.94 2.94 0 0 0-2.07 2.08C1 8.2 1 12 1 12s0 3.8.48 5.62a2.94 2.94 0 0 0 2.07 2.08c1.82.48 8.45.48 8.45.48s6.63 0 8.45-.48a2.94 2.94 0 0 0 2.07-2.08C23 15.8 23 12 23 12ZM9.82 15.4V8.6L15.7 12l-5.88 3.4Z" />
                  </svg>
                </a>
                <a href="#" aria-label="וואטסאפ">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.16 8.16 0 0 1-1.25-4.37c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12s-.64.8-.78.97c-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__copy-group">
              <p className="footer__copy">
                © <span id="ftYear">{new Date().getFullYear()}</span> אהבת חינ״מ. כל
                הזכויות שמורות.
              </p>
              <a
                className="footer__credit"
                href="https://www.abecweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                האתר עוצב ופותח ע"י נועם אבקסיס | <span dir="ltr">www.Abecweb.com</span>
              </a>
            </div>
            <ul className="footer__legal">
              <li>
                <Link to="/terms">תקנון</Link>
              </li>
              <li>
                <Link to="/privacy">מדיניות פרטיות</Link>
              </li>
              <li>
                <Link to="/accessibility">הצהרת נגישות</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
