import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/event-keren-nashim")({ component: EventKerenNashim });

function EventKerenNashim() {
  return (
    <Layout theme="blue" title={"ביקור קרן “נשי האופן הפנימי” - אהבת חינ\"מ"} description={"כמדי שנה מבקרות אותנו חברות עמותת “קרן נשי האופן הפנימי” מנהריה."}>
      <section className="page-hero page-hero--slim">
            <div className="container container--narrow">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <Link to="/events">האירועים שהיו</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">ביקור קרן “נשי האופן הפנימי”</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">מדי שנה</span>
              <h1 data-reveal="up">ביקור קרן “נשי האופן הפנימי”</h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '200ms' }}>כמדי שנה מבקרות אותנו חברות עמותת “קרן נשי האופן הפנימי” מנהריה.</p>
            </div>
          </section>

          <section className="sec sec--tight container container--narrow">
            <figure className="event-figure" data-reveal="up">
              <img src="/images/content/d56.jpg" alt="שולחן כיבוד חגיגי מוכן לאירוע בחצר" loading="lazy" />
              <figcaption>תמונה מארכיון הפעילות של בית שי</figcaption>
            </figure>

            <nav className="event-nav" aria-label="ניווט בין אירועים">
              <Link className="event-nav__item" to="/event-lecture">
                <span className="event-nav__label">האירוע הקודם</span>
                <span className="event-nav__title">הרצאה: “דלתות מסתובבות - מהכלוב לתא הטייס”</span>
              </Link>
              <Link className="event-nav__item" to="/event-volunteers-usa">
                <span className="event-nav__label">האירוע הבא</span>
                <span className="event-nav__title">מתנדבים מטנסי וג’ורג’יה</span>
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
