import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/the-gallery")({ component: TheGallery });

function TheGallery() {
  return (
    <Layout theme="green" title={"הגלריה שלנו - אהבת חינ\"מ"} description={"בית קפה, יצירה וחצר ירוקה בנהריה. כל ההכנסות מוקדשות לפעילות בית שי. גם להשכרה לאירועים."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">הגלריה שלנו</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">בית קפה · יצירה · קהילה</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>כל ביקור הוא רגע</i></span>
                  <span className="ln"><i>של הנאה - וגם</i></span>
                  <span className="ln"><i>רגע של נתינה.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  מרחב פתוח, חם ומזמין שבו משפחות, חברים והקהילה כולה נפגשים, מבלים ויוצרים זיכרונות -
                  ובאותו הזמן לוקחים חלק במשהו גדול יותר.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <a href="#events" className="btn btn--pill btn--auto btn--green">
                    <span>לחגוג אצלנו</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </a>
                  <Link to="/contact" className="btn btn--pill btn--ghost">
                    <span>איך מגיעים</span>
                  </Link>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d28.jpg" alt="חלל הגלריה עם יצירות על הקירות" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d27.jpg" alt="יצירה של חנה, יוצרת מבית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d53.jpg" alt="שולחנות בחצר הגלריה" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d29.jpg" alt="פינת יצירה בגלריה" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== על הגלריה ===================== */}
          <section className="sec container">
            <div className="split">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">הסיפור של המקום</p>
                <h2>חלום של חנן: מקום שנפגשים בו - ותורמים בלי לשים לב</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>הגלריה שלנו הוקמה על ידי חנן, מייסד בית שי, מתוך חלום ליצור מקום שבו משפחות, חברים
                    והקהילה כולה יוכלו להיפגש, לבלות וליצור זיכרונות - ובאותו הזמן להיות חלק ממשהו גדול יותר.</p>
                  <p>זהו מרחב פתוח, חם ומזמין, שבו ילדים יכולים <strong>לשחק, לחקור וליהנות</strong>, בזמן שההורים
                    עוצרים לרגע של קפה טוב, מאפה או ארוחה קלה באווירה משפחתית.</p>
                  <p>במקום תוכלו למצוא גם <strong>יצירות ייחודיות של חנה</strong>, יוצרת מוכשרת וילדת בית שי,
                    עציצים למכירה, ולעיתים גם תערוכות המציגות את הכישרונות והיצירתיות של ילדי בית שי.</p>
                </div>
              </div>
              <div className="split__media split__media--tall" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d29.jpg" alt="חלל הגלריה עם יצירות ילדי בית שי" loading="lazy" />
                <p className="split__badge">יצירות של ילדי בית שי - למכירה במקום</p>
              </div>
            </div>
          </section>

          {/* ===================== לאן הכסף הולך ===================== */}
          <section className="sec container">
            <div className="quote" data-reveal="scale">
              <p>כל ההכנסות מהגלריה מוקדשות ישירות לפעילות של בית שי ולמען הילדים על הרצף האוטיסטי.</p>
              <cite>כל קפה שנמזג, כל ארוחה שמוגשת, כל חגיגה וכל רכישה - הופכים לעוד פעילות, עוד טיפול, עוד חוויה.</cite>
            </div>
          </section>

          {/* ===================== מה יש במקום ===================== */}
          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">מה מחכה לכם</p>
              <h2>בית קפה, פינת יצירה וחצר לילדים</h2>
              <div className="rule"></div>
            </div>
            <div className="pillars" data-stagger="110">
              <article className="pillar pillar--green" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg>
                </span>
                <h3>קפה ומאפה</h3>
                <p>קפה טוב, מאפים וארוחות קלות באווירה משפחתית - בזמן שהילדים משחקים בחוץ.</p>
              </article>
              <article className="pillar pillar--coral" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="13" r="2"/><circle cx="6" cy="12" r="2.5"/><path d="M12 22a10 10 0 1 1 0-20c1 0 1.5.8 1.2 1.7-.5 1.5.6 2.8 2.1 2.6.9-.1 1.7.6 1.7 1.5 0 3.6 2 3.6 2 6.2A8 8 0 0 1 12 22Z"/></svg>
                </span>
                <h3>יצירות ותערוכות</h3>
                <p>יצירות של חנה ושל ילדי בית שי, עציצים למכירה ותערוכות מתחלפות.</p>
              </article>
              <article className="pillar pillar--blue" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M5 8h14"/><path d="M7 21c0-4 2-7 5-7s5 3 5 7"/></svg>
                </span>
                <h3>חצר ירוקה לילדים</h3>
                <p>מתקנים, מקום לרוץ ולשחק - כדי שגם ההורים יוכלו לנשום רגע.</p>
              </article>
            </div>
          </section>

          {/* ===================== אירועים ===================== */}
          <section className="sec container" id="events">
            <div className="split split--flip">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">🎉 חוגגים איתנו רגעים מיוחדים</p>
                <h2>כל אירוע אצלנו הוא גם תרומה</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>מחפשים מקום חם, ירוק ומשפחתי לחגוג בו? הגלריה שלנו זמינה להשכרה
                    ל<strong>ימי הולדת, אירועים משפחתיים, מפגשים וסדנאות</strong>.</p>
                  <p>וכאן החלק הכי יפה - כל ההכנסות מוקדשות לפעילות בית שי ולילדים על הרצף האוטיסטי.
                    <strong>חוגגים איתנו - ומשמחים גם אותם.</strong></p>
                </div>
                <ul className="checklist" data-reveal="up">
                  <li>ימי הולדת לילדים ולמבוגרים</li>
                  <li>אירועים משפחתיים ומפגשי חברים</li>
                  <li>סדנאות והרצאות</li>
                  <li>אירועי חברה וגיבוש צוותים</li>
                </ul>
                <div className="page-hero__actions">
                  <Link to="/contact?topic=%D7%94%D7%A9%D7%9B%D7%A8%D7%AA%20%D7%94%D7%92%D7%9C%D7%A8%D7%99%D7%94%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2" className="btn btn--wide btn--green">
                    <span>לבדיקת תאריך</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </div>
              <div className="split__media split__media--tall" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d56.jpg" alt="שלט: יומולדת עם ערך מוסף - בואו לחגוג בבית שי" loading="lazy" />
              </div>
            </div>
          </section>

          {/* ===================== מוזאיקה ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <h2>הצצה למקום</h2>
              <div className="rule"></div>
            </div>
            <div className="mosaic" data-stagger="70">
              <a className="mosaic__wide mosaic__tall" href="/images/content/d55.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d55.jpg" alt="הכנות לאירוע בגלריה" loading="lazy" /></a>
              <a href="/images/content/d51.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d51.jpg" alt="עוגות יום הולדת" loading="lazy" /></a>
              <a href="/images/content/d54.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d54.jpg" alt="שולחן כיבוד לאירוע" loading="lazy" /></a>
              <a className="mosaic__wide" href="/images/content/d48.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d48.jpg" alt="החצר עם שולחנות פיקניק" loading="lazy" /></a>
              <a href="/images/content/d52.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d52.jpg" alt="בית עץ ומתקני משחק בחצר" loading="lazy" /></a>
              <a href="/images/content/d63.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d63.jpg" alt="שולחנות ערוכים לאירוע" loading="lazy" /></a>
            </div>
          </section>

          {/* ===================== סיום ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>✨ חוגגים איתנו - ומשמחים גם אותם</h2>
                <p>כל ביקור הוא הרבה יותר מבילוי: הוא דרך לקחת חלק, להשפיע ולהעניק לילדי בית שי עתיד מלא בתקווה.</p>
              </div>
              <Link to="/contact?topic=%D7%94%D7%92%D7%9C%D7%A8%D7%99%D7%94%20%D7%A9%D7%9C%D7%A0%D7%95" className="btn btn--wide btn--white">
                <span>דברו איתנו</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
