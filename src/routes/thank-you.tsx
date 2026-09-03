import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({ component: ThankYou });

function ThankYou() {
  return (
    <Layout theme="blue" title={"תודה על התרומה - אהבת חינ\"מ"} description={"תודה על תרומתכם לעמותת אהבת חינ&quot;מ. התרומה התקבלה בהצלחה."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero page-hero--slim">
            <div className="container">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">תודה על התרומה</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">התרומה התקבלה</span>
              <h1 data-reveal="lines">
                <span className="ln"><i>תודה. באמת.</i></span>
              </h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                התרומה שלכם התקבלה בהצלחה, וכבר עכשיו היא הופכת לעוד טיפול, עוד חוג
                ועוד ילד שמרגיש שייך בבית שי.
              </p>
            </div>
          </section>

          {/* ===================== פרטי התרומה ===================== */}
          <section className="sec">
            <div className="container">
              <div className="prose">
                <p id="tyDetails" className="ty-amount" hidden></p>
                <p>
                  קבלה רשמית לצורכי מס לפי סעיף 46 תישלח אליכם במייל בימים הקרובים.
                  אם היא לא מגיעה, או שנפלה טעות כלשהי בתרומה, אנחנו כאן -
                  <Link to="/contact">כתבו לנו</Link> ונטפל בזה מיד.
                </p>
                <p>
                  רוצים להישאר מעודכנים במה שקורה בבית? אתם מוזמנים לעקוב אחרינו
                  <a href="https://www.instagram.com/beit_shay_nahariya/" target="_blank" rel="noopener">באינסטגרם</a>
                  ו<a href="https://www.facebook.com/share/14myQtnN2hC/?mibextid=wwXIfr" target="_blank" rel="noopener">בפייסבוק</a>,
                  או לקרוא על <Link to="/beit-shai">בית שי</Link> ועל מה שקורה בו בכל יום.
                </p>
              </div>

              <div className="ty-acts">
                <Link to="/" className="btn btn--pill btn--blue">
                  <span>חזרה לדף הבית</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
                <Link to="/the-gallery" className="btn btn--pill">
                  <span>הגלריה שלנו</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
              </div>
            </div>
          </section>
    </Layout>
  );
}
