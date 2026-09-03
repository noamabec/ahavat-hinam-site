import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/event-workshops")({ component: EventWorkshops });

function EventWorkshops() {
  return (
    <Layout theme="blue" title={"סדנאות מיומנויות חברתיות וכישורי חיים - אהבת חינ\"מ"} description={"שתי סדנאות חדשות נפתחו בבית שי: האחת עוסקת בכישורי חיים, והשנייה בפיתוח מיומנויות חברתיות."}>
      <section className="page-hero page-hero--slim">
            <div className="container container--narrow">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <Link to="/events">האירועים שהיו</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">סדנאות מיומנויות חברתיות וכישורי חיים</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">יולי–ספטמבר</span>
              <h1 data-reveal="up">סדנאות מיומנויות חברתיות וכישורי חיים</h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '200ms' }}>שתי סדנאות חדשות נפתחו בבית שי: האחת עוסקת בכישורי חיים, והשנייה בפיתוח מיומנויות חברתיות.</p>
            </div>
          </section>

          <section className="sec sec--tight container container--narrow">
            <figure className="event-figure" data-reveal="up">
              <img src="/images/content/d17.jpg" alt="ילדה עם איפור פנים של פרפר" loading="lazy" />
              <figcaption>תמונה מארכיון הפעילות של בית שי</figcaption>
            </figure>

            <nav className="event-nav" aria-label="ניווט בין אירועים">
              <Link className="event-nav__item" to="/event-puppetry">
                <span className="event-nav__label">האירוע הקודם</span>
                <span className="event-nav__title">סדנת בובנאות</span>
              </Link>
              <Link className="event-nav__item" to="/event-mamanet">
                <span className="event-nav__label">האירוע הבא</span>
                <span className="event-nav__title">אירוע פתיחת ליגת מאמאנט</span>
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
