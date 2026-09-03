import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/vahavta")({ component: Vahavta });

function Vahavta() {
  return (
    <Layout theme="yellow" title={"תנועת הנוער ואהבת - אהבת חינ\"מ"} description={"תנועת הנוער ואהבת - ילדים על הרצף האוטיסטי וילדים מהקהילה נפגשים, מתנדבים וגדלים יחד."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">תנועת הנוער ואהבת</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">תנועת הנוער שלנו</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>העולם מחלק ילדים</i></span>
                  <span className="ln"><i>לקבוצות. אנחנו</i></span>
                  <span className="ln"><i>מחברים ביניהם.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  „ואהבת לרעך כמוך” - זו לא רק סיסמה. זו הדרך שלנו.
                  בתנועה נפגשים ילדים על הרצף האוטיסטי וילדים מהקהילה, ויחד הם יוצרים חברויות אמיתיות.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <a href="#join" className="btn btn--pill btn--auto btn--blue">
                    <span>רוצים להצטרף?</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </a>
                  <a href="#values" className="btn btn--pill btn--ghost">
                    <span>הערכים שלנו</span>
                  </a>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d16.jpg" alt="חניכי תנועת ואהבת בתמונה קבוצתית" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d08.jpg" alt="ילד מניף דגל ישראל בפעילות התנועה" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d35.jpg" alt="ילדים בתהלוכה חגיגית" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d41.jpg" alt="ילדים עם בלונים בפעילות התנועה" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== על התנועה ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <p className="sec__kicker">תנועת הנוער ואהבת</p>
              <h2>שם שנולד מערך - אהבת האדם, קבלת האחר ועשיית טוב</h2>
              <div className="rule"></div>
            </div>
            <div className="prose prose--2col" data-reveal="up">
              <p>תנועת הנוער ואהבת הוקמה מתוך בית שי ומתוך אמונה ש<strong>כל ילד ראוי להרגיש שייך</strong>.
                שמה של התנועה נולד מהערך „ואהבת לרעך כמוך” - אהבת האדם, קבלת האחר, נתינה ועשיית טוב,
                ללא הבדלים וללא תנאים.</p>
              <p>בתנועה נפגשים ילדים על הרצף האוטיסטי וילדים מהקהילה, ויחד הם יוצרים חברויות אמיתיות,
                משתתפים בפעילויות ערכיות וחווייתיות, מתנדבים למען הקהילה ולומדים <strong>להוביל מתוך כבוד,
                אכפתיות ואחריות</strong>.</p>
              <p>דרך משחקים, יצירה, התנדבויות, ימי שיא ויוזמות קהילתיות, אנחנו מחנכים דור שמאמין באהבת
                האדם, באהבת הארץ ובעשיית טוב. עבורנו, <strong>כל ילד יכול להשפיע</strong>, וכל מעשה קטן של
                נתינה יכול לשנות עולם שלם.</p>
              <p>ב־ואהבת אנחנו לא רק יוצרים תנועת נוער - אנחנו בונים קהילה שבה כל ילד מרגיש אהוב,
                שייך ויכול להיות בדיוק מי שהוא.</p>
            </div>
          </section>

          {/* ===================== שלושת הערכים ===================== */}
          <section className="sec container" id="values">
            <div className="pillars" data-stagger="120">
              <article className="pillar pillar--blue" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>
                </span>
                <h3>חברות אמיתית</h3>
                <p>יוצרים קשרים בין ילדים על הרצף האוטיסטי לילדים מהקהילה.</p>
              </article>
              <article className="pillar pillar--yellow" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17 6.5 12.5a2.83 2.83 0 0 1 4-4L12 10l1.5-1.5a2.83 2.83 0 0 1 4 4L13 17"/><path d="M2 12h3M19 12h3"/></svg>
                </span>
                <h3>ערכים ונתינה</h3>
                <p>מחנכים לאהבת האדם, אהבת הארץ, קבלת האחר ועשיית טוב.</p>
              </article>
              <article className="pillar pillar--green" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V9"/><path d="M12 9C12 6 9.5 3 6 3c0 3.5 2.5 6 6 6Z"/><path d="M12 12c0-3 2.5-6 6-6 0 3.5-2.5 6-6 6Z"/></svg>
                </span>
                <h3>צומחים יחד</h3>
                <p>כל ילד הוא חלק מהתנועה, וכל אחד תורם בדרך הייחודית שלו.</p>
              </article>
            </div>
          </section>

          {/* ===================== מוזאיקה ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <h2>ככה זה נראה אצלנו</h2>
              <div className="rule"></div>
            </div>
            <div className="mosaic" data-stagger="70">
              <a className="mosaic__wide mosaic__tall" href="/images/content/d24.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d24.jpg" alt="פעילות קהילתית של התנועה" loading="lazy" /></a>
              <a href="/images/content/d02.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d02.jpg" alt="חניכים בפעילות בחוץ" loading="lazy" /></a>
              <a href="/images/content/d13.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d13.jpg" alt="ילדים משחקים בחצר" loading="lazy" /></a>
              <a className="mosaic__wide" href="/images/content/d26.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d26.jpg" alt="מפגש חברתי בחצר" loading="lazy" /></a>
              <a href="/images/content/d42.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d42.jpg" alt="ילדים רצים בפעילות" loading="lazy" /></a>
              <a href="/images/content/d09.jpg" data-lightbox data-reveal="fade"><img src="/images/content/d09.jpg" alt="יום שיא של התנועה" loading="lazy" /></a>
            </div>
            <p className="form-note" style={{ textAlign: 'center' }} data-reveal="fade">תמונות נוספות מפעילות התנועה יתווספו בקרוב.</p>
          </section>

          {/* ===================== הצטרפות ===================== */}
          <section className="sec container" id="join">
            <div className="quote" data-reveal="scale">
              <p>רוצים להצטרף אלינו?</p>
              <cite>ההרשמה פתוחה לילדים על הרצף ולילדים מהקהילה - יחד, באותה קבוצה.</cite>
              <div className="page-hero__actions" style={{ justifyContent: 'center', marginTop: 'clamp(18px,2.222vw,30px)' }}>
                <Link to="/contact?topic=%D7%AA%D7%A0%D7%95%D7%A2%D7%AA%20%D7%94%D7%A0%D7%95%D7%A2%D7%A8%20%D7%95%D7%90%D7%94%D7%91%D7%AA" className="btn btn--wide btn--white">
                  <span>להצטרפות לתנועה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
              </div>
            </div>
          </section>
    </Layout>
  );
}
