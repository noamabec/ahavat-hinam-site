import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { useLegacyScript } from "@/hooks/useLegacyScript";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  /* רצועת הגלריה המעגלית (WebGL) ואפקט חשיפת הווידאו בגלילה */
  useLegacyScript("/js/home-page.js");

  return (
    <Layout variant="home" theme="blue" title={"אהבת חינ\"מ - עמותה לילדים על הרצף האוטיסטי"} description={""}>
      {/* ===================== HERO ===================== */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <h1 data-reveal="lines">
                <span className="ln"><i>לכל ילד מגיע</i></span>
                <span className="ln"><i>מקום שבו הוא לא צריך</i></span>
                <span className="ln"><i>להסביר את עצמו.</i></span>
              </h1>
              <p className="hero__lead" data-reveal="up" style={{ '--d': '300ms' }}>אצלנו ילדים על הרצף האוטיסטי מוצאים מקום שמקבל אותם בדיוק כפי שהם. מקום שבו הם יכולים להרגיש בטוחים, שייכים, אהובים וחופשיים להיות הם.</p>
              <div className="hero__actions" data-reveal="up" style={{ '--d': '450ms' }}>
                <Link to="/donate" className="btn btn--pill btn--blue">
                  <span>תרמו לנו</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </Link>
                <Link to="/about" className="btn btn--pill btn--ghost-yellow"><span>הכירו אותנו</span></Link>
              </div>
            </div>
            <div className="hero__media" data-reveal="fade" style={{ '--d': '150ms' }}>
              <img src="/images/hero.png" alt="אם מחבקת את בתה, ויד של מבוגר אוחזת ביד של ילד" data-parallax="-0.05" />
              <span className="hero__dot hero__dot--blue" aria-hidden="true"></span>
              <span className="hero__dot hero__dot--green" aria-hidden="true"></span>
              <span className="hero__dot hero__dot--yellow" aria-hidden="true"></span>
              <span className="hero__dot hero__dot--coral" aria-hidden="true"></span>
            </div>
          </div>
        </section>

        {/* ============ PARTNERS - רצועת הלוגואים ============ */}
        <section className="partners">
          <div className="container">
            <div id="partnersLoop" className="logoloop logoloop--scale-hover"
                 role="region" aria-label="לוגואים של שותפים ותומכים"></div>
          </div>
        </section>

        {/* ============ VIDEO - נפתח על הגלילה, פייסבוק, בין הלוגואים ל"כל מה שקורה אצלנו" ============ */}
        <section className="video-reveal" id="videoReveal">
          <div className="video-reveal__track" id="videoRevealTrack">
            <div className="video-reveal__stage" id="videoRevealStage">
              <div className="video-reveal__frame" id="videoRevealFrame">
                <div className="video-reveal__media video-reveal__iframe-wrap" id="videoRevealMedia">
                  <button type="button" className="video-reveal__poster" id="videoRevealPoster" aria-label="הפעלת הסרטון">
                    <img src="/images/video-poster.jpg" alt="" draggable="false" />
                    <span className="video-reveal__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </span>
                  </button>
                </div>
                <div className="video-reveal__scrim" id="videoRevealScrim"></div>
              </div>
              <div className="video-reveal__hint" id="videoRevealHint">גללו לצפייה</div>
            </div>
          </div>
        </section>

        {/* ===================== PROGRAMS ===================== */}
        <section className="programs">
          <div className="container">
            <h2 data-reveal="up">כל מה שקורה אצלנו</h2>
            <div className="cards" data-stagger="120">

              <article data-reveal="up" className="card card--blue">
                <div className="card__thumb"><img src="/images/gallery/g05.jpg" alt="ילדים בפעילות בבית שי" loading="lazy" /></div>
                <h3 className="card__title">בית שי</h3>
                <p className="card__text">מרכז קהילתי, חברתי וטיפולי בנהריה - חוגים, טיפולים, חצר וכלבים טיפוליים.</p>
                <div className="card__spacer"></div>
                <Link to="/beit-shai" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </Link>
              </article>

              <article data-reveal="up" className="card card--yellow">
                <div className="card__thumb"><img src="/images/gallery/g07.jpg" alt="פעילות יצירה בתוכנית בראשית" loading="lazy" /></div>
                <h3 className="card__title">בשביל בראשית</h3>
                <p className="card__text">מרחב רגשי לאחים, לאחיות ולהורים - כי גם להם מגיע מקום משלהם.</p>
                <div className="card__spacer"></div>
                <Link to="/breshit" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </Link>
              </article>

              <article data-reveal="up" className="card card--coral">
                <div className="card__thumb"><img src="/images/gallery/g09.jpg" alt="פעילות קהילתית משותפת" loading="lazy" /></div>
                <h3 className="card__title">תנועת הנוער ואהבת</h3>
                <p className="card__text">ילדים על הרצף וילדים מהקהילה נפגשים, מתנדבים וגדלים יחד.</p>
                <div className="card__spacer"></div>
                <Link to="/vahavta" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </Link>
              </article>

            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section className="about">
          <div className="container">
            <h2 className="about__heading" data-reveal="up">אהבת חינ”מ (חינוך מיוחד) לכולם</h2>
            <div className="about__row">
              <div className="about__col about__col--right" data-reveal="up">
                <p>עמותת אהבת חינ"מ לכולם הינה עמותה ,שהוקמה מתוך <strong>צורך אמיתי של ילדים על הספקטרום האוטיסטי</strong> ובני משפחותיהם.</p>
                <p>יסוד העמותה באמונה <strong>שלכל אדם הזכות לחיות בכבוד</strong> תוך מתן אמצעים וכלים לאנשים עם מוגבלויות, לחיות באיכות חיים טובה יותר ובשותפות , ככל הניתן בחיי קהילה. כל זאת באמצעות פיתוח ומתן שירותים חינוכיים, טיפולים חדשניים, פעילות מחקר והכשרה מקצועית . הקמת מערך תקשורתי ליצירת שינוי עמדות חברתי והמשך העלאת הנושא  על סדר היום הציבורי.</p>
              </div>
              <div className="about__collage" data-parallax="-0.045">
                <div className="about__collage-photo about__collage-photo--main">
                  <img src="/images/content/d10.jpg" alt="ילד מבית שי מחייך" loading="lazy" />
                </div>
                <div className="about__collage-photo about__collage-photo--top">
                  <img src="/images/content/d15.jpg" alt="ילדות מבית שי מחייכות" loading="lazy" />
                </div>
                <div className="about__collage-photo about__collage-photo--bottom">
                  <img src="/images/content/d01.jpg" alt="ילדים מבית שי נהנים יחד" loading="lazy" />
                </div>
                <span className="about__dot about__dot--coral" aria-hidden="true"></span>
                <span className="about__dot about__dot--ring" aria-hidden="true"></span>
                <span className="about__dot about__dot--green" aria-hidden="true"></span>
              </div>
              <div className="about__col about__col--left" data-reveal="up">
                <p>העמותה נוסדה על ידי אמהות  ואחיות לילדים על הרצף האוטיסטי יחד עם יזמים חברתיים. העמותה שמה עצמה למטרה <strong>להקים מרכז קהילתי טיפולי</strong>, תוך שהמקום מהווה למעשה בית,  אך העשייה בו מתנהלת כל העת על ידי אנשי מקצוע ומטפלים מוכשרים ומוסמכים בתחום. כמו כן, הצורך בשילוב ושיפור מיומנויות תקשורת וכישורים חברתיים, בא לידי ביטוי בכך שהפעילות החוגית טיפולית תתקיים <strong>תמיד בקבוצות קטנות</strong>.</p>
                <p><strong>בית שי יהיה מודל לבתים נוספים בפריפריה.</strong></p>
              </div>
            </div>
            <div className="about__cta" data-reveal="up">
              <Link to="/about" className="btn btn--pill btn--blue">
                <span>קראו עוד</span>
                <span className="ico ico--sm" aria-hidden="true">
                  <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== EVENTS ===================== */}
        <section className="events">
          <div className="container">
            <h2 data-reveal="up">האירועים שהיו ושיהיו</h2>

            {/* אירועים קרובים. מוסתר (hidden) עד שיוזן אירוע אמיתי - כדי שלא יתפרסם
                 אירוע שאינו קיים. הסרת ה-hidden מציגה את הסקשן. */}
            <div className="events__group" id="upcomingGroup" hidden>
              <h3 className="events__sub">אירועים קרובים</h3>

              <div className="upcoming" data-stagger="110">

                <article className="upcoming__card" data-reveal="up">
                  <div className="upcoming__when" aria-hidden="true">
                    <span className="upcoming__day">12</span>
                    <span className="upcoming__month">בספטמבר</span>
                  </div>
                  <div className="upcoming__body">
                    <p className="upcoming__badge">אירוע קרוב</p>
                    <h4 className="upcoming__title">שם האירוע</h4>
                    <ul className="upcoming__meta">
                      <li>יום שישי, 12.9.26</li>
                      <li>18:00</li>
                      <li>בית שי, יצחק שדה 18, נהריה</li>
                    </ul>
                    <p className="upcoming__text">תיאור קצר של האירוע - מה קורה בו ולמי הוא מיועד.</p>
                  </div>
                  <Link to="/contact" className="btn btn--rect upcoming__cta">
                    <span>לפרטים והרשמה</span>
                    <span className="ico ico--sm" aria-hidden="true">
                      <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                    </span>
                  </Link>
                </article>

              </div>
            </div>

            <h3 className="events__sub">אירועים שהיו</h3>

            <div className="events__grid" id="eventsGrid" data-stagger="110">

              <article className="event" data-reveal="up">
                <img className="event__img" src="/images/content/d26.jpg" alt="ילדים ומבוגרים חוגגים יחד בחצר בית שי" loading="lazy" />
                <span className="event__scrim" aria-hidden="true"></span>
                <div className="event__body">
                  <h4 className="event__title">אירוע פתיחת בית שי</h4>
                  <p className="event__text">אירוע השקת בית שי והרמת כוסית לרגל פתיחת הבית ולכבוד השנה החדשה.</p>
                  <div className="event__foot">
                  <Link to="/event-opening" className="btn btn--rect event__btn">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true">
                      <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                    </span>
                  </Link>
                  <span className="event__date">ראש השנה</span>
                </div>
                </div>
              </article>

              <article className="event" data-reveal="up">
                <img className="event__img" src="/images/content/d49.jpg" alt="ילדים משחקים ונהנים בפעילות חוץ בבית שי" loading="lazy" />
                <span className="event__scrim" aria-hidden="true"></span>
                <div className="event__body">
                  <h4 className="event__title">פעילויות חנוכה עם בתי הספר</h4>
                  <p className="event__text">בכל אחד משמונת ימי החנוכה התארחו בבית שי להדלקת נר חגיגית עשרות אורחים מבתי הספר בנהריה.</p>
                  <div className="event__foot">
                  <Link to="/event-hanukkah" className="btn btn--rect event__btn">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true">
                      <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                    </span>
                  </Link>
                  <span className="event__date">חנוכה</span>
                </div>
                </div>
              </article>

              <article className="event" data-reveal="up">
                <img className="event__img" src="/images/content/d08.jpg" alt="ילד בפעילות חוץ בנהריה עם דגל ישראל" loading="lazy" />
                <span className="event__scrim" aria-hidden="true"></span>
                <div className="event__body">
                  <h4 className="event__title">סיור ג’יפים בחסות בית שי</h4>
                  <p className="event__text">סיור ג’יפים לתלמידי בית הספר “התומר” שבעכו, בחסות בית שי - שלוש כיתות ובהן 12 ילדים על הרצף.</p>
                  <div className="event__foot">
                  <Link to="/event-jeeps" className="btn btn--rect event__btn">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true">
                      <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                    </span>
                  </Link>
                  <span className="event__date">14.8.22</span>
                </div>
                </div>
              </article>

              <article className="event" data-reveal="up">
                <img className="event__img" src="/images/content/d38.jpg" alt="מתנדבות ותומכות העמותה בפעילות קהילתית" loading="lazy" />
                <span className="event__scrim" aria-hidden="true"></span>
                <div className="event__body">
                  <h4 className="event__title">מרוץ הלילה של נהריה</h4>
                  <p className="event__text">מרוץ הלילה של נהריה התקיים זו השנה השישית ברציפות, בהשתתפות ילדי העמותה ומשפחותיהם.</p>
                  <div className="event__foot">
                  <Link to="/event-night-race" className="btn btn--rect event__btn">
                    <span>קראו עוד</span>
                    <span className="ico ico--sm" aria-hidden="true">
                      <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                    </span>
                  </Link>
                  <span className="event__date">17.10.19</span>
                </div>
                </div>
              </article>

            </div>

            {/* RTL: the first child lands on the right, same convention as the press carousel. */}
            <div className="events__nav" data-reveal="up">
              <button type="button" aria-label="הקודם" data-events-prev>
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path className="press-arrow__fill" d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028z"/><path d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028zm15.801 18.009-17.12 15.03c-.401.354-.821.22-.983.146-.133-.061-.566-.302-.566-.885v-6.029c0-.553-.447-1-1-1h-35.004c-.552 0-1-.448-1-1v-14c0-.552.448-1 1-1h35.002c.553 0 1-.447 1-1v-6.029c0-.583.434-.824.566-.885.163-.072.584-.207.983.146l17.121 15.029c.208.183.327.451.327.738s-.119.556-.327.738z" fill="currentColor"/></svg>
              </button>
              <button type="button" aria-label="הבא" data-events-next>
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path className="press-arrow__fill" transform="scale(-1,1) translate(-60,0)" d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028z"/><path d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028zm15.801 18.009-17.12 15.03c-.401.354-.821.22-.983.146-.133-.061-.566-.302-.566-.885v-6.029c0-.553-.447-1-1-1h-35.004c-.552 0-1-.448-1-1v-14c0-.552.448-1 1-1h35.002c.553 0 1-.447 1-1v-6.029c0-.583.434-.824.566-.885.163-.072.584-.207.983.146l17.121 15.029c.208.183.327.451.327.738s-.119.556-.327.738z" fill="currentColor" transform="scale(-1,1) translate(-60,0)"/></svg>
              </button>
            </div>

            <Link to="/events" className="btn btn--pill btn--blue events__cta">
              <span>לעמוד האירועים</span>
              <span className="ico ico--sm" aria-hidden="true">
                <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
              </span>
            </Link>
          </div>
        </section>

        {/* ===================== DONATE ===================== */}
        <section className="donate container">
          <img className="donate__boy" src="/images/donate-boy.png" alt="ילד יושב על קצה השלט" />

          <div className="donate__card" data-reveal="up">
            <h2>לא צריך לשנות <br className="donate__br" />עולם שלם כדי לשנות <br className="donate__br" />עולם של ילד אחד.</h2>
            <p className="donate__text">התרומה שלכם מאפשרת לילדי בית שי לקבל את הכלים, התמיכה והאהבה שמגיעים להם. כל תרומה, קטנה כגדולה, הופכת להזדמנות אמיתית עבור ילד ומשפחתו כל תרומה, קטנה או גדולה, הופכת לעוד חיוך, עוד הצלחה, עוד חבר חדש ועוד ילד שמרגיש שהוא שייך.</p>
            <Link to="/donate" className="btn btn--wide btn--coral">
              <span>לעמוד התרומות</span>
              <span className="ico ico--sm" aria-hidden="true">
                <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
              </span>
            </Link>
          </div>

          <div className="tiers" data-stagger="110">
            <article className="tier" data-reveal="up">
              <p className="tier__label">לתרומה מהירה <br />של 50 ש”ח</p>
              <Link to="/donate" className="btn btn--wide">
                <span>לחצו כאן</span>
                <span className="ico ico--md" aria-hidden="true">
                  <svg viewBox="0 0 26 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M25.7071 8.07107C26.0976 7.68054 26.0976 7.04738 25.7071 6.65685L19.3431 0.292893C18.9526 -0.097631 18.3194 -0.097631 17.9289 0.292893C17.5384 0.683418 17.5384 1.31658 17.9289 1.70711L23.5858 7.36396L17.9289 13.0208C17.5384 13.4113 17.5384 14.0445 17.9289 14.435C18.3194 14.8256 18.9526 14.8256 19.3431 14.435L25.7071 8.07107ZM0 7.36396V8.36396H25V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                </span>
              </Link>
            </article>

            <article className="tier" data-reveal="up">
              <p className="tier__label">לתרומה מהירה <br />של 150 ש”ח</p>
              <Link to="/donate" className="btn btn--wide">
                <span>לחצו כאן</span>
                <span className="ico ico--md" aria-hidden="true">
                  <svg viewBox="0 0 26 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M25.7071 8.07107C26.0976 7.68054 26.0976 7.04738 25.7071 6.65685L19.3431 0.292893C18.9526 -0.097631 18.3194 -0.097631 17.9289 0.292893C17.5384 0.683418 17.5384 1.31658 17.9289 1.70711L23.5858 7.36396L17.9289 13.0208C17.5384 13.4113 17.5384 14.0445 17.9289 14.435C18.3194 14.8256 18.9526 14.8256 19.3431 14.435L25.7071 8.07107ZM0 7.36396V8.36396H25V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                </span>
              </Link>
            </article>

            <article className="tier" data-reveal="up">
              <p className="tier__label">לתרומה מהירה <br />של 200 ש”ח</p>
              <Link to="/donate" className="btn btn--wide">
                <span>לחצו כאן</span>
                <span className="ico ico--md" aria-hidden="true">
                  <svg viewBox="0 0 26 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M25.7071 8.07107C26.0976 7.68054 26.0976 7.04738 25.7071 6.65685L19.3431 0.292893C18.9526 -0.097631 18.3194 -0.097631 17.9289 0.292893C17.5384 0.683418 17.5384 1.31658 17.9289 1.70711L23.5858 7.36396L17.9289 13.0208C17.5384 13.4113 17.5384 14.0445 17.9289 14.435C18.3194 14.8256 18.9526 14.8256 19.3431 14.435L25.7071 8.07107ZM0 7.36396V8.36396H25V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                </span>
              </Link>
            </article>
          </div>
        </section>

        {/* ===================== GALLERY ===================== */}
        <section className="gallery">
          <div className="container">
            <h2 data-reveal="up">גלריה</h2>
            <div id="galleryStrip" className="gallery__strip" tabIndex="0" role="region"
                 aria-label="גלריית תמונות. גררו או השתמשו בחצים ימינה ושמאלה כדי לנווט."></div>
            <Link to="/gallery" className="btn btn--pill btn--blue gallery__cta">
              <span>לעמוד הגלריה</span>
              <span className="ico ico--sm" aria-hidden="true">
                <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
              </span>
            </Link>
          </div>
        </section>

        {/* ===================== PRESS ===================== */}
        <section className="press">
          <div className="container">
            <h2 data-reveal="up">אנחנו בתקשורת</h2>

            <div className="cards" data-stagger="120" id="pressCards">
              <article className="card card--green">
                <div className="card__thumb"><img src="/images/content/d05.jpg" alt="מתחם חדש, תקווה חדשה" loading="lazy" /></div>
                <h3 className="card__title">מתחם חדש, תקווה חדשה</h3>
                <p className="card__text">בזכות תרומות של אנשים טובים נחנך מתחם הפעילות החדש של בית שי – מרחב בטוח ומלא אפשרויות לצמיחה.</p>
                <a href="https://www.gmaaravionline.com/%d7%a8%d7%a7-%d7%91%d7%96%d7%9b%d7%95%d7%aa-%d7%94%d7%aa%d7%a8%d7%95%d7%9e%d7%95%d7%aa-%d7%91%d7%91%d7%99%d7%aa-%d7%a9%d7%99-%d7%97%d7%a0%d7%9b%d7%95-%d7%90%d7%aa-%d7%94%d7%9e%d7%aa%d7%97%d7%9e/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </a>
              </article>

              <article className="card card--green">
                <div className="card__thumb"><img src="/images/content/d20.jpg" alt="כל כרטיס הוא הזדמנות לשנות חיים" loading="lazy" /></div>
                <h3 className="card__title">כל כרטיס הוא הזדמנות לשנות חיים</h3>
                <p className="card__text">מכירת הכרטיסים לאירוע ההתרמה של בית שי יוצאת לדרך – הזמנה לקחת חלק בעשייה למען ילדים על הרצף האוטיסטי.</p>
                <a href="https://www.gmaaravionline.com/%d7%94%d7%95%d7%a9%d7%a7%d7%94-%d7%9e%d7%9b%d7%99%d7%a8%d7%aa-%d7%94%d7%9b%d7%a8%d7%98%d7%99%d7%a1%d7%99%d7%9d-%d7%9c%d7%90%d7%99%d7%a8%d7%95%d7%a2-%d7%94%d7%94%d7%aa%d7%a8%d7%9e%d7%94-%d7%94%d7%a8/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </a>
              </article>

              <article className="card card--green">
                <div className="card__thumb"><img src="/images/content/d33.jpg" alt="כשהכוכבים האמיתיים עלו לבמה" loading="lazy" /></div>
                <h3 className="card__title">כשהכוכבים האמיתיים עלו לבמה</h3>
                <p className="card__text">להקת שי־יה, המורכבת מילדי בית שי, ריגשה את הקהל בערב ההתרמה והוכיחה שכישרון ואמונה יכולים לפרוץ כל גבול.</p>
                <a href="https://www.gmaaravionline.com/%d7%a2%d7%a8%d7%91-%d7%94%d7%94%d7%aa%d7%a8%d7%9e%d7%94-%d7%9c%d7%91%d7%99%d7%aa-%d7%a9%d7%99-%d7%9c%d7%94%d7%a7%d7%aa-%d7%a9%d7%99-%d7%99%d7%94-%d7%92%d7%a0%d7%91%d7%94-%d7%90%d7%aa-%d7%94%d7%94/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </a>
              </article>

              <article className="card card--green">
                <div className="card__thumb"><img src="/images/content/d45.jpg" alt="גם הלבבות המוכרים בחרו לתת" loading="lazy" /></div>
                <h3 className="card__title">גם הלבבות המוכרים בחרו לתת</h3>
                <p className="card__text">אנשי תקשורת, אמנים ודמויות מוכרות התגייסו למען בית שי והעניקו את קולם למען עתיד טוב יותר לילדים על הרצף האוטיסטי.</p>
                <a href="https://blinker.co.il/%D7%A6%D7%A4%D7%95%D7%9F-1-%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%A0%D7%94%D7%A8%D7%99%D7%94/%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%91%D7%A6%D7%A4%D7%95%D7%9F-1-%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%A0%D7%94%D7%A8%D7%99%D7%94/%D7%94%D7%A1%D7%9C%D7%91%D7%A8%D7%99%D7%98%D7%90%D7%99%D7%9D-%D7%A0%D7%A8%D7%AA%D7%9E%D7%99%D7%9D-%D7%9C%D7%9E%D7%A2%D7%9F-%D7%91%D7%99%D7%AA-%D7%A9%D7%99-%D7%91%D7%A0%D7%94%D7%A8%D7%99%D7%94/248664/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </a>
              </article>

              <article className="card card--green">
                <div className="card__thumb"><img src="/images/content/d60.jpg" alt="כשילדים חולמים הקהילה כולה צועדת איתם" loading="lazy" /></div>
                <h3 className="card__title">כשילדים חולמים הקהילה כולה צועדת איתם</h3>
                <p className="card__text">בית שי פתח שעריו ליריד יד שנייה ותצוגת אופנה מיוחדת, אירוע קהילתי שחיבר בין יצירה, כישרון ואהבה גדולה.</p>
                <a href="https://www.gmaaravionline.com/%D7%91%D7%99%D7%AA-%D7%A9%D7%99-%D7%9E%D7%A6%D7%99%D7%92-%D7%99%D7%A8%D7%99%D7%93-%D7%99%D7%93-%D7%A9%D7%A0%D7%99%D7%94-%D7%95%D7%AA%D7%A6%D7%95%D7%92%D7%AA-%D7%90%D7%95%D7%A4%D7%A0%D7%94-%D7%A9/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>קראו עוד</span>
                  <span className="ico ico--sm" aria-hidden="true">
                    <svg viewBox="0 0 19.3848 14.7279" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M19.0919 8.07107C19.4824 7.68054 19.4824 7.04738 19.0919 6.65685L12.7279 0.292893C12.3374 -0.097631 11.7042 -0.097631 11.3137 0.292893C10.9232 0.683418 10.9232 1.31658 11.3137 1.70711L16.9706 7.36396L11.3137 13.0208C10.9232 13.4113 10.9232 14.0445 11.3137 14.435C11.7042 14.8256 12.3374 14.8256 12.7279 14.435L19.0919 8.07107ZM0 7.36396V8.36396H18.3848V7.36396V6.36396H0V7.36396Z" fill="currentColor"/></svg>
                  </span>
                </a>
              </article>
            </div>

            {/* RTL: the first child lands on the right. Design shows → on the right, ← on the left. */}
            <div className="press__nav" data-reveal="up">
              <button type="button" aria-label="הקודם" data-press-prev>
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path className="press-arrow__fill" d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028z"/><path d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028zm15.801 18.009-17.12 15.03c-.401.354-.821.22-.983.146-.133-.061-.566-.302-.566-.885v-6.029c0-.553-.447-1-1-1h-35.004c-.552 0-1-.448-1-1v-14c0-.552.448-1 1-1h35.002c.553 0 1-.447 1-1v-6.029c0-.583.434-.824.566-.885.163-.072.584-.207.983.146l17.121 15.029c.208.183.327.451.327.738s-.119.556-.327.738z" fill="currentColor"/></svg>
              </button>
              <button type="button" aria-label="הבא" data-press-next>
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path className="press-arrow__fill" transform="scale(-1,1) translate(-60,0)" d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028z"/><path d="m41.872 12.729c-.869-.766-2.068-.945-3.128-.466-1.074.486-1.742 1.523-1.742 2.707v5.029h-34.002c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h34.002v5.029c0 1.184.668 2.221 1.742 2.707.394.178.807.265 1.214.265.69 0 1.367-.249 1.914-.729l17.12-15.029c.641-.562 1.008-1.379 1.008-2.242s-.368-1.681-1.008-2.242l-17.12-15.028zm15.801 18.009-17.12 15.03c-.401.354-.821.22-.983.146-.133-.061-.566-.302-.566-.885v-6.029c0-.553-.447-1-1-1h-35.004c-.552 0-1-.448-1-1v-14c0-.552.448-1 1-1h35.002c.553 0 1-.447 1-1v-6.029c0-.583.434-.824.566-.885.163-.072.584-.207.983.146l17.121 15.029c.208.183.327.451.327.738s-.119.556-.327.738z" fill="currentColor" transform="scale(-1,1) translate(-60,0)"/></svg>
              </button>
            </div>
          </div>
        </section>
    </Layout>
  );
}
