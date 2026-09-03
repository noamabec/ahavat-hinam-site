import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/breshit")({ component: Breshit });

function Breshit() {
  return (
    <Layout theme="coral" title={"בשביל בראשית - אהבת חינ\"מ"} description={"„בשביל בראשית” - מרחב רגשי בטוח לאחים, לאחיות ולהורים במשפחות לילדים על הרצף האוטיסטי."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">בשביל בראשית</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">מרחב רגשי לאחים, לאחיות ולהורים</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>גם לאחים מגיע</i></span>
                  <span className="ln"><i>מקום משלהם.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  כשילד מאובחן על הרצף האוטיסטי, המשפחה כולה נכנסת למסע חדש.
                  „בשביל בראשית” הוא המקום שבו האחים, האחיות וההורים עוצרים לרגע - ומקבלים מקום משלהם.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <Link to="/contact?topic=%D7%91%D7%A9%D7%91%D7%99%D7%9C%20%D7%91%D7%A8%D7%90%D7%A9%D7%99%D7%AA" className="btn btn--pill btn--coral">
                    <span>דברו איתנו</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </Link>
                  <a href="#offer" className="btn btn--pill btn--ghost">
                    <span>מה יש במרחב</span>
                  </a>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d03.jpg" alt="ילדים יושבים יחד סביב שולחן פעילות" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d17.jpg" alt="ילדה בפעילות בבית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d10.jpg" alt="ילדים מחייכים יחד" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d30.jpg" alt="שתי ילדות מחייכות" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== למה זה נחוץ ===================== */}
          <section className="sec container">
            <div className="split">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">למה הקמנו את בראשית</p>
                <h2>כשכל תשומת הלב הולכת לצד אחד, נשאר צד שמחכה בשקט</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>באופן טבעי, הילד הזקוק לתמיכה רבה מושך חלק גדול מזמנם, מכוחותיהם ומתשומת ליבם של ההורים.
                    בתוך המציאות המורכבת הזאת, <strong>האחים והאחיות עלולים להרגיש שלצרכים ולרגשות שלהם נשאר פחות מקום</strong>.</p>
                  <p>לעיתים הם גם מקבלים על עצמם, במפורש או בלי שנשים לב, אחריות שאינה תואמת את גילם: לעזור לאחיהם,
                    להשגיח עליו, ללוות אותו, להרגיע אותו או לוותר למענו. כך הם עלולים להפוך בהדרגה
                    <strong>„מאחים” ל„מטפלים קטנים”</strong>.</p>
                  <p>בדיוק עבורם הקמנו את „בשביל בראשית” - מרחב רגשי בטוח, חם ומכיל, שבו האחים והאחיות יכולים
                    לעצור לרגע, להיות במרכז, לשתף, לשאול, לפרוק ולהבין שהם אינם לבד.</p>
                </div>
              </div>
              <div className="split__media split__media--tall" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d12.jpg" alt="פעילות קבוצתית בבית שי" loading="lazy" />
                <p className="split__badge">מקום לעצור בו ולהיות במרכז</p>
              </div>
            </div>
          </section>

          {/* ===================== מה אנחנו מעניקים ===================== */}
          <section className="sec container" id="offer">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">במרחב אנו מעניקים</p>
              <h2>ליווי שמחזיק את כל המשפחה</h2>
              <div className="rule"></div>
            </div>
            <ul className="checklist" data-reveal="up">
              <li>ליווי רגשי אישי וקבוצתי לאחים ולאחיות</li>
              <li>מקום לביטוי רגשות כמו אהבה, גאווה, כעס, קנאה, אשמה, מבוכה ודאגה</li>
              <li>כלים להתמודדות עם מצבים משפחתיים וחברתיים</li>
              <li>חיזוק הביטחון העצמי ותחושת השייכות</li>
              <li>הפרדה בריאה בין תפקידו של האח לבין אחריותם של המבוגרים</li>
              <li>ליווי והדרכה להורים, מתוך הבנת צורכיהם של כל ילדי המשפחה</li>
              <li>חיזוק הקשר המשפחתי ויצירת שיח פתוח, קשוב ומאוזן יותר</li>
            </ul>
          </section>

          {/* ===================== ציטוט ===================== */}
          <section className="container">
            <div className="quote" data-reveal="scale">
              <p>אנחנו לא מבקשים מהאחים לאהוב פחות או לעזור פחות. אנחנו מבקשים לאפשר להם להיות קודם כול ילדים.</p>
              <cite>„בשביל בראשית” - נותנים מקום לכל ילד במשפחה</cite>
            </div>
          </section>

          {/* ===================== למי זה מיועד ===================== */}
          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">למי המרחב מיועד</p>
              <h2>שלושה מעגלים, מעטפת אחת</h2>
              <div className="rule"></div>
            </div>
            <div className="pillars" data-stagger="110">
              <article className="pillar pillar--coral" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-1.5A4.5 4.5 0 0 1 6.5 15h5A4.5 4.5 0 0 1 16 19.5V21"/></svg>
                </span>
                <h3>אחים ואחיות</h3>
                <p>מפגשים אישיים וקבוצתיים שבהם הם במרכז - בעלי צרכים, רגשות, חלומות וקול משלהם.</p>
              </article>
              <article className="pillar pillar--blue" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>
                </span>
                <h3>הורים</h3>
                <p>ליווי והדרכה מתוך הבנת צורכיהם של כל ילדי המשפחה - לא רק של הילד המאובחן.</p>
              </article>
              <article className="pillar pillar--green" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M12 21v-5"/></svg>
                </span>
                <h3>המשפחה כולה</h3>
                <p>שיח פתוח, קשוב ומאוזן יותר בבית. כי כאשר רואים ומחזקים את האחים - מחזקים את המשפחה כולה.</p>
              </article>
            </div>
          </section>

          {/* ===================== סיום ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>רוצים לשמוע עוד על „בשביל בראשית”?</h2>
                <p>ספרו לנו קצת על המשפחה שלכם ואנחנו נחזור אליכם עם כל הפרטים.</p>
              </div>
              <Link to="/contact?topic=%D7%91%D7%A9%D7%91%D7%99%D7%9C%20%D7%91%D7%A8%D7%90%D7%A9%D7%99%D7%AA" className="btn btn--wide btn--white">
                <span>צרו קשר</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
