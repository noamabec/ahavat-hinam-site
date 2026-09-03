import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({ component: Events });

function Events() {
  return (
    <Layout theme="blue" title={"האירועים שהיו - אהבת חינ\"מ"} description={"פעילויות ואירועים של בית שי ועמותת אהבת חינ”מ - סדנאות, חגים, מפגשי קהילה ואירועים מיוחדים."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">האירועים שהיו</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">פעילויות ואירועים</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>כל אירוע כאן</i></span>
                  <span className="ln"><i>הוא עוד יום</i></span>
                  <span className="ln"><i>שבו מישהו הרגיש שייך.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  סדנאות, חגים, מפגשי קהילה ואורחים שבאו לשמח. אלה הרגעים שמרכיבים את
                  החיים בבית שי - ואת הסיבה שהעמותה קמה מלכתחילה.
                </p>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d26.jpg" alt="ילדים ומבוגרים חוגגים יחד בחצר בית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d13.jpg" alt="קבוצת ילדים עם דגלי ישראל באירוע ערב בעיר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d22.jpg" alt="מבוגרים וילדים יוצרים סביב שולחן צבעים" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d02.jpg" alt="בני נוער בפעילות שתילה בחצר" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== האירועים ===================== */}
          {/* אירועים קרובים. מוסתר (hidden) עד שיוזן אירוע אמיתי. */}
          <section className="sec container" id="upcomingSection" hidden>
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">מה קורה בקרוב</p>
              <h2>אירועים קרובים</h2>
              <div className="rule"></div>
            </div>

            <div className="upcoming" data-stagger="90">

              <article className="upcoming__card" data-reveal="up">
                <div className="upcoming__when" aria-hidden="true">
                  <span className="upcoming__day">12</span>
                  <span className="upcoming__month">בספטמבר</span>
                </div>
                <div className="upcoming__body">
                  <p className="upcoming__badge">אירוע קרוב</p>
                  <h3 className="upcoming__title">שם האירוע</h3>
                  <ul className="upcoming__meta">
                    <li>יום שישי, 12.9.26</li>
                    <li>18:00</li>
                    <li>בית שי, יצחק שדה 18, נהריה</li>
                  </ul>
                  <p className="upcoming__text">תיאור קצר של האירוע - מה קורה בו ולמי הוא מיועד.</p>
                </div>
                <Link to="/contact" className="btn btn--rect upcoming__cta">
                  <span>לפרטים והרשמה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
              </article>

            </div>
          </section>

          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">אחת-עשרה פעילויות</p>
              <h2>מה היה אצלנו</h2>
              <div className="rule"></div>
            </div>

            <div className="event-grid" data-stagger="90">

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d26.jpg" alt="ילדים ומבוגרים חוגגים יחד בחצר בית שי" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">ראש השנה</span>
                  <h3>אירוע פתיחת בית שי</h3>
                  <p>אירוע השקת בית שי והרמת כוסית לרגל פתיחת הבית ולכבוד השנה החדשה.</p>
                  <Link to="/event-opening" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d13.jpg" alt="קבוצת ילדים עם דגלי ישראל באירוע ערב בעיר" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">17.10.19 · חוה”מ סוכות</span>
                  <h3>מרוץ הלילה של נהריה</h3>
                  <p>מרוץ הלילה של נהריה התקיים זו השנה השישית ברציפות, בהשתתפות ילדי העמותה ומשפחותיהם.</p>
                  <Link to="/event-night-race" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d08.jpg" alt="ילד אוחז בדגל ישראל באירוע ערב בנהריה" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">חנוכה</span>
                  <h3>פעילויות חנוכה עם בתי הספר</h3>
                  <p>בכל אחד משמונת ימי החנוכה התארחו בבית שי להדלקת נר חגיגית עשרות אורחים מבתי הספר בנהריה.</p>
                  <Link to="/event-hanukkah" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d49.jpg" alt="ילדים משחקים בבועות סבון בחצר" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">14.8.22</span>
                  <h3>סיור ג’יפים בחסות בית שי</h3>
                  <p>סיור ג’יפים לתלמידי בית הספר “התומר” שבעכו, בחסות בית שי - שלוש כיתות ובהן 12 ילדים על הרצף.</p>
                  <Link to="/event-jeeps" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d22.jpg" alt="מבוגרים וילדים יוצרים סביב שולחן צבעים" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">סדנה</span>
                  <h3>סדנת בובנאות</h3>
                  <p>סדנה שבה המשתתפים לקחו חלק בכל תהליך הכנת הבובות - וסיימו עם תוצרים יפים ומיוחדים משלהם.</p>
                  <Link to="/event-puppetry" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d17.jpg" alt="ילדה עם איפור פנים של פרפר" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">יולי–ספטמבר</span>
                  <h3>סדנאות מיומנויות חברתיות וכישורי חיים</h3>
                  <p>שתי סדנאות חדשות נפתחו בבית שי: האחת עוסקת בכישורי חיים, והשנייה בפיתוח מיומנויות חברתיות.</p>
                  <Link to="/event-workshops" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d38.jpg" alt="קבוצת נשים יושבות סביב שולחן בדוכן מאפים" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">עונה שביעית</span>
                  <h3>אירוע פתיחת ליגת מאמאנט</h3>
                  <p>פתיחת העונה השביעית של ליגת מאמאנט התקיימה בסימן העלאת המודעות לאוטיזם.</p>
                  <Link to="/event-mamanet" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d44.jpg" alt="רולאפ תודה של בית שי נהריה" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">22.1</span>
                  <h3>הרצאה: “דלתות מסתובבות - מהכלוב לתא הטייס”</h3>
                  <p>התכנסנו להרצאה מרתקת של כרמית הובר על הגברת המודעות לשילובם של אנשים עם מוגבלויות.</p>
                  <Link to="/event-lecture" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d56.jpg" alt="שולחן כיבוד חגיגי מוכן לאירוע בחצר" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">מדי שנה</span>
                  <h3>ביקור קרן “נשי האופן הפנימי”</h3>
                  <p>כמדי שנה מבקרות אותנו חברות עמותת “קרן נשי האופן הפנימי” מנהריה.</p>
                  <Link to="/event-keren-nashim" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d31.jpg" alt="מתקן קפיצה מתנפח בחצר בית שי" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">אחרי השיטפונות</span>
                  <h3>מתנדבים מטנסי וג’ורג’יה</h3>
                  <p>קבוצת מתנדבים מטנסי ומג’ורג’יה שבארה”ב הגיעה לנהריה כדי לסייע לעיר - לתקן, לצבוע ולעזור בתיקון נזקי השיטפונות.</p>
                  <Link to="/event-volunteers-usa" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

              <article className="event-card" data-reveal="up">
                <img className="event-card__img" src="/images/content/d02.jpg" alt="בני נוער בחולצות ״הערבות ההדדית״ בפעילות שתילה" loading="lazy" />
                <span className="event-card__scrim" aria-hidden="true"></span>
                <div className="event-card__body">
                  <span className="event-card__date">ט”ו בשבט</span>
                  <h3>מעגל נשים נהריה בבית שי</h3>
                  <p>לכבוד ט”ו בשבט הגיעו בנות מעגל נשים נהריה לשמח את ילדי הבית בפעילות מיוחדת.</p>
                  <Link to="/event-tu-bishvat" className="btn btn--rect">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                </div>
              </article>

            </div>
          </section>

          {/* ===================== רוצים לארח אירוע ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>רוצים לארח אצלנו אירוע?</h2>
                <p>קבוצות, עסקים ומתנדבים מוזמנים להגיע לבית שי - לפעילות, לסדנה או ליום התנדבות.</p>
              </div>
              <Link to="/contact?topic=%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D" className="btn btn--wide btn--white">
                <span>צרו קשר</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
