import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/event-puppetry")({ component: EventPuppetry });

function EventPuppetry() {
  return (
    <Layout theme="blue" title={"סדנת בובנאות - אהבת חינ\"מ"} description={"סדנה שבה המשתתפים לקחו חלק בכל תהליך הכנת הבובות - וסיימו עם תוצרים יפים ומיוחדים משלהם."}>
      <section className="page-hero page-hero--slim">
            <div className="container container--narrow">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <Link to="/events">האירועים שהיו</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">סדנת בובנאות</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">סדנה</span>
              <h1 data-reveal="up">סדנת בובנאות</h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '200ms' }}>סדנה שבה המשתתפים לקחו חלק בכל תהליך הכנת הבובות - וסיימו עם תוצרים יפים ומיוחדים משלהם.</p>
            </div>
          </section>

          <section className="sec sec--tight container container--narrow">
            <figure className="event-figure" data-reveal="up">
              <img src="/images/content/d22.jpg" alt="מבוגרים וילדים יוצרים סביב שולחן צבעים" loading="lazy" />
              <figcaption>תמונה מארכיון הפעילות של בית שי</figcaption>
            </figure>

            <nav className="event-nav" aria-label="ניווט בין אירועים">
              <Link className="event-nav__item" to="/event-jeeps">
                <span className="event-nav__label">האירוע הקודם</span>
                <span className="event-nav__title">סיור ג’יפים בחסות בית שי</span>
              </Link>
              <Link className="event-nav__item" to="/event-workshops">
                <span className="event-nav__label">האירוע הבא</span>
                <span className="event-nav__title">סדנאות מיומנויות חברתיות וכישורי חיים</span>
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
