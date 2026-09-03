import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/event-jeeps")({ component: EventJeeps });

function EventJeeps() {
  return (
    <Layout theme="blue" title={"סיור ג’יפים בחסות בית שי - אהבת חינ\"מ"} description={"סיור ג’יפים לתלמידי בית הספר “התומר” שבעכו, בחסות בית שי - שלוש כיתות ובהן 12 ילדים על הרצף."}>
      <section className="page-hero page-hero--slim">
            <div className="container container--narrow">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <Link to="/events">האירועים שהיו</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">סיור ג’יפים בחסות בית שי</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">14.8.22</span>
              <h1 data-reveal="up">סיור ג’יפים בחסות בית שי</h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '200ms' }}>סיור ג’יפים לתלמידי בית הספר “התומר” שבעכו, בחסות בית שי - שלוש כיתות ובהן 12 ילדים על הרצף.</p>
            </div>
          </section>

          <section className="sec sec--tight container container--narrow">
            <figure className="event-figure" data-reveal="up">
              <img src="/images/content/d49.jpg" alt="ילדים משחקים בבועות סבון בחצר" loading="lazy" />
              <figcaption>תמונה מארכיון הפעילות של בית שי</figcaption>
            </figure>

            <nav className="event-nav" aria-label="ניווט בין אירועים">
              <Link className="event-nav__item" to="/event-hanukkah">
                <span className="event-nav__label">האירוע הקודם</span>
                <span className="event-nav__title">פעילויות חנוכה עם בתי הספר</span>
              </Link>
              <Link className="event-nav__item" to="/event-puppetry">
                <span className="event-nav__label">האירוע הבא</span>
                <span className="event-nav__title">סדנת בובנאות</span>
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
