import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/beit-shai")({ component: BeitShai });

function BeitShai() {
  return (
    <Layout theme="blue" title={"בית שי - אהבת חינ\"מ"} description={"בית שי בנהריה - מרכז קהילתי, חברתי וטיפולי לילדים על הרצף האוטיסטי. חוגים, טיפולים, חצר, כלבים טיפוליים וליווי למשפחות."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">בית שי</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">מרכז קהילתי, חברתי וטיפולי · נהריה</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>בית שי הוא הרבה</i></span>
                  <span className="ln"><i>יותר ממרכז טיפולי - הוא בית.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  מקום שבו ילדים על הרצף האוטיסטי זוכים לאהבה, להכלה ולמרחב להיות מי שהם,
                  ומשפחותיהם מוצאות תמיכה, תקווה ושותפים לדרך.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <Link to="/donate" className="btn btn--pill btn--blue">
                    <span>תרמו לנו</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                  <a href="#activity" className="btn btn--pill btn--ghost">
                    <span>מה קורה אצלנו</span>
                  </a>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d13.jpg" alt="ילדים משחקים בחצר של בית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d21.jpg" alt="ילדה מנגנת בתופים בחוג התיפוף" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d01.jpg" alt="ילדים עם הכלבים הטיפוליים בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d14.jpg" alt="ילד מטפל בעציץ בגינת הבית" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== מי אנחנו ===================== */}
          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">בית שי</p>
              <h2>לכל ילד מגיעה הזכות לחיות בכבוד, להרגיש שייך ולממש את הפוטנציאל שבו</h2>
              <div className="rule"></div>
            </div>
            <div className="prose prose--2col" data-reveal="up">
              <p>בית שי הוקם מתוך אמונה שלכל ילד ולכל אדם מגיעה הזכות לחיות בכבוד, להרגיש שייך ולממש את הפוטנציאל הייחודי שבו. אנו מאמינים ש<strong>קבלה, אהבה והזדמנות שווה</strong> הן הבסיס לאיכות חיים טובה ולשילוב אמיתי בקהילה.</p>
              <p>העמותה נוסדה על ידי <strong>אימהות ואחיות לילדים על הרצף האוטיסטי</strong>, מתוך היכרות אישית עם האתגרים, החלומות והצורך במקום שהוא הרבה יותר ממסגרת - מקום שהוא בית. בית שי מעניק מעטפת חינוכית, טיפולית וחברתית, בסביבה בטוחה, מקצועית ומכילה, שבה כל ילד מתקבל בדיוק כפי שהוא.</p>
              <p>הפעילות בבית שי מתקיימת ב<strong>קבוצות קטנות ואינטימיות</strong>, בהובלת אנשי מקצוע ומטפלים מנוסים, מתוך אמונה שקשרים אישיים, יחס מותאם וליווי מקצועי מאפשרים לכל ילד להתפתח, להתחזק וליצור קשרים משמעותיים.</p>
              <p>לצד הפעילות היומיומית, העמותה פועלת לקידום שילובם של ילדים ואנשים עם מוגבלויות בקהילה, לפיתוח שירותים חדשניים, לקידום הכשרות מקצועיות ולהעלאת המודעות הציבורית - מתוך חזון לחברה שמקבלת את השונה, רואה את האדם לפני האבחנה ומעניקה לכל אחד ואחת הזדמנות שווה להשתייך.</p>
            </div>
          </section>

          {/* ===================== משפט מרגש ===================== */}
          <section className="container">
            <div className="quote" data-reveal="scale">
              <p>לא צריך להשתנות כדי להיות שייך. צריך רק מקום שמקבל אותך.</p>
            </div>
          </section>

          {/* ===================== להסתכל מעבר לאבחנה ===================== */}
          <section className="sec container">
            <div className="split">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">להסתכל מעבר לאבחנה</p>
                <h2>אוטיזם הוא חלק מהסיפור של הילד, אבל לעולם לא כל הסיפור</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>מאחורי כל אבחנה יש עולם שלם - <strong>אישיות, רגשות, חלומות, כוחות ודרך ייחודית לראות את העולם</strong>.</p>
                  <p>בבית שי אנחנו מאמינים שלא צריך לשנות ילדים כדי שיתאימו לעולם. צריך ליצור עבורם עולם שמקבל אותם, מכבד אותם ונותן להם את החופש להיות בדיוק מי שהם.</p>
                </div>
              </div>
              <div className="split__media" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d20.jpg" alt="ילד בפעילות איפור פנים בבית שי" loading="lazy" />
                <p className="split__badge">רואים את הילד - לפני האבחנה</p>
              </div>
            </div>
          </section>

          {/* ===================== הפעילות שלנו ===================== */}
          <section className="sec container" id="activity">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">הפעילות שלנו</p>
              <h2>מה קורה בבית שי</h2>
              <div className="rule"></div>
              <p className="sec__sub">
                באזור נהריה והפריפריה קיים מחסור במסגרות, חוגים ופעילויות המותאמים לילדים על הרצף
                האוטיסטי. מתוך הצורך הזה הוקם בית שי - מקום המעניק לילדים מסגרת בטוחה, מקצועית
                ומלאת אהבה, שבה הם יכולים ליהנות, ליצור חברויות, להתפתח ולהיות בדיוק מי שהם.
              </p>
            </div>

            <div className="pillars pillars--4" data-stagger="110">
              <article className="pillar pillar--blue" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
                </span>
                <h3>טיפולים פרא־רפואיים</h3>
                <p>טיפול פיזי, רגשי וחברתי בהובלת צוות רב־מקצועי ומנוסה - תמיד בקבוצות קטנות ובקצב של כל ילד.</p>
              </article>

              <article className="pillar pillar--yellow" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>
                </span>
                <h3>חוגים והעשרה</h3>
                <p>תיפוף, אימון כלבים, יצירה, טיפול בגינת הבית ודאגה לרווחת החיות שבחצר - פעילות שמייצרת מסוגלות וגאווה.</p>
              </article>

              <article className="pillar pillar--coral" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <h3>חיי חברה</h3>
                <p>מפגשים, אינטראקציה עם חברים וקבוצות קטנות - כי חברויות אמיתיות הן חלק בלתי נפרד מהטיפול.</p>
              </article>

              <article className="pillar pillar--green" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>
                </span>
                <h3>ליווי למשפחות</h3>
                <p>אנחנו מלווים גם את המשפחות ומבקשים להיות עבורן עוגן, מקור לתמיכה ושותפים אמיתיים לדרך.</p>
              </article>
            </div>
          </section>

          {/* ===================== החצר ===================== */}
          <section className="sec container">
            <div className="split split--flip">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">הבית והחצר</p>
                <h2>גן עדן לילדים על הרצף, בלב נהריה</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>בית שי בנהריה כולל <strong>חדר משחקים, חדר טיפולים, חצר עם משחקים ונדנדות, כלבים ופינת חי</strong>.</p>
                  <p>הילדים מגיעים למשך מספר שעות ומקבלים חוויה יומית בלתי רגילה: טיפול פיזי ורגשי, אינטראקציה עם חברים, חוגים כמו תיפוף ואימון כלבים, טיפול בגינת הבית ודאגה לרווחת החיות שבחצר.</p>
                </div>
                <ul className="checklist" data-reveal="up">
                  <li>חדר משחקים וחדר טיפולים</li>
                  <li>חצר, נדנדות ומתקנים</li>
                  <li>כלבים טיפוליים ופינת חי</li>
                  <li>גינה שהילדים מטפלים בה</li>
                </ul>
              </div>
              <div className="split__media split__media--tall" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d48.jpg" alt="החצר של בית שי עם שולחנות ומתקנים" loading="lazy" />
              </div>
            </div>
          </section>

          {/* ===================== מוזאיקה ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <h2>רגעים מהיומיום שלנו</h2>
              <div className="rule"></div>
            </div>
            <div className="mosaic" data-stagger="70">
              <a className="mosaic__wide mosaic__tall" href="/images/content/d15.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d15.jpg" alt="פעילות יצירה סביב שולחן" loading="lazy" /></a>
              <a href="/images/content/d07.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d07.jpg" alt="ידיים של ילדים בפעילות יצירה" loading="lazy" /></a>
              <a href="/images/content/d19.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d19.jpg" alt="דמות מחופשת מבקרת בבית שי" loading="lazy" /></a>
              <a className="mosaic__wide" href="/images/content/d33.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d33.jpg" alt="ילדים חוגגים בחצר" loading="lazy" /></a>
              <a href="/images/content/d43.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d43.jpg" alt="ילד עם הכלבים הטיפוליים" loading="lazy" /></a>
              <a href="/images/content/d05.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d05.jpg" alt="פעילות בחדר הטיפולים" loading="lazy" /></a>
            </div>
            <div className="page-hero__actions" style={{ justifyContent: 'center', marginTop: 'clamp(18px,2.222vw,56.89px)' }}>
              <Link to="/gallery" className="btn btn--pill btn--blue btn--auto" data-reveal="up">
                <span>לגלריית התמונות המלאה</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>

          {/* ===================== המשך לעמודים אחרים ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>גם לאחים ולהורים מגיע מקום משלהם</h2>
                <p>„בשביל בראשית” - מרחב רגשי בטוח לאחים, לאחיות ולהורים במשפחות לילדים על הרצף.</p>
              </div>
              <Link to="/breshit" className="btn btn--wide btn--white">
                <span>לעמוד בראשית</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
