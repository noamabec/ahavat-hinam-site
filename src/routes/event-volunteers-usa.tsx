import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/event-volunteers-usa")({ component: EventVolunteersUsa });

function EventVolunteersUsa() {
  return (
    <Layout theme="blue" title={"מתנדבים מטנסי וג’ורג’יה - אהבת חינ\"מ"} description={"קבוצת מתנדבים מטנסי ומג’ורג’יה שבארה”ב הגיעה לנהריה כדי לסייע לעיר - לתקן, לצבוע ולעזור בתיקון נזקי השיטפונות."}>
      <section className="page-hero page-hero--slim">
            <div className="container container--narrow">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <Link to="/events">האירועים שהיו</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">מתנדבים מטנסי וג’ורג’יה</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">אחרי השיטפונות</span>
              <h1 data-reveal="up">מתנדבים מטנסי וג’ורג’יה</h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '200ms' }}>קבוצת מתנדבים מטנסי ומג’ורג’יה שבארה”ב הגיעה לנהריה כדי לסייע לעיר - לתקן, לצבוע ולעזור בתיקון נזקי השיטפונות.</p>
            </div>
          </section>

          <section className="sec sec--tight container container--narrow">
            <figure className="event-figure" data-reveal="up">
              <img src="/images/content/d31.jpg" alt="מתקן קפיצה מתנפח בחצר בית שי" loading="lazy" />
              <figcaption>תמונה מארכיון הפעילות של בית שי</figcaption>
            </figure>

            <nav className="event-nav" aria-label="ניווט בין אירועים">
              <Link className="event-nav__item" to="/event-keren-nashim">
                <span className="event-nav__label">האירוע הקודם</span>
                <span className="event-nav__title">ביקור קרן “נשי האופן הפנימי”</span>
              </Link>
              <Link className="event-nav__item" to="/event-tu-bishvat">
                <span className="event-nav__label">האירוע הבא</span>
                <span className="event-nav__title">מעגל נשים נהריה בבית שי</span>
              </Link>
            </nav>
          </section>

          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>רוצים לראות את שאר האירועים?</h2>
                <p>כל הפעילויות, הסדנאות והמפגשים שהיו אצלנו - במקום אחד.</p>
              </div>
              <Link to="/events" className="btn btn--wide btn--white">
                <span>לכל האירועים</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
