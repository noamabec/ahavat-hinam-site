import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/press")({ component: Press });

function Press() {
  return (
    <Layout theme="green" title={"אנחנו בתקשורת - אהבת חינ\"מ"} description={"כתבות וסיקורים על בית שי ועמותת אהבת חינ”מ בתקשורת המקומית."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">אנחנו בתקשורת</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">כתבות וסיקורים</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>כשהקהילה</i></span>
                  <span className="ln"><i>מתגייסת -</i></span>
                  <span className="ln"><i>זה מגיע לחדשות.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  אירועים, הישגים ורגעים מרגשים של ילדי בית שי שקיבלו במה בתקשורת המקומית.
                  כל כתבה כאן היא עדות לכך שנתינה באמת משנה חיים.
                </p>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d21.jpg" alt="ילדה מנגנת בתופים על הבמה" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d36.jpg" alt="תצוגת אופנה של ילדי בית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d53.jpg" alt="אירוע התרמה בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d48.jpg" alt="מתחם הפעילות החדש" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== כתבות ===================== */}
          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">חמש כתבות</p>
              <h2>מה כתבו עלינו</h2>
              <div className="rule"></div>
            </div>

            <div className="press-grid" data-stagger="110">

              <article className="press-card press-card--featured" data-reveal="up">
                <div className="press-card__thumb"><img src="/images/content/d48.jpg" alt="מתחם הפעילות החדש של בית שי" loading="lazy" /></div>
                <div className="press-card__body">
                  <h3>מתחם חדש, תקווה חדשה - בזכות הלב של הקהילה</h3>
                <p>בזכות תרומות של אנשים טובים, נחנך מתחם הפעילות החדש של בית שי - מקום שמעניק לילדים
                  על הרצף האוטיסטי מרחב בטוח, מחבק ומלא אפשרויות לצמיחה. הצטרפו לסיפור שמוכיח שנתינה
                  יכולה לשנות חיים.</p>
                <p className="press-card__src">גליל מערבי אונליין</p>
                <a href="https://www.gmaaravionline.com/%d7%a8%d7%a7-%d7%91%d7%96%d7%9b%d7%95%d7%aa-%d7%94%d7%aa%d7%a8%d7%95%d7%9e%d7%95%d7%aa-%d7%91%d7%91%d7%99%d7%aa-%d7%a9%d7%99-%d7%97%d7%a0%d7%9b%d7%95-%d7%90%d7%aa-%d7%94%d7%9e%d7%aa%d7%97%d7%9d/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>לכתבה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                </div>
              </article>

              <article className="press-card" data-reveal="up">
                <div className="press-card__thumb"><img src="/images/content/d53.jpg" alt="אירוע ההתרמה של בית שי" loading="lazy" /></div>
                <div className="press-card__body">
                  <h3>כשהקהילה מתגייסת - כל כרטיס הוא הזדמנות לשנות חיים</h3>
                <p>השקת מכירת הכרטיסים לאירוע ההתרמה של בית שי מסמלת הרבה יותר מאירוע אחד - זו הזמנה
                  לקחת חלק בעשייה למען ילדים על הרצף האוטיסטי. כל רכישת כרטיס היא צעד נוסף בדרך ליצירת
                  עתיד מלא תקווה, שייכות והזדמנויות.</p>
                <p className="press-card__src">גליל מערבי אונליין</p>
                <a href="https://www.gmaaravionline.com/%d7%94%d7%95%d7%a9%d7%a7%d7%94-%d7%9e%d7%9b%d7%99%d7%a8%d7%aa-%d7%94%d7%9b%d7%a8%d7%98%d7%99%d7%a1%d7%99%d7%9d-%d7%9c%d7%90%d7%99%d7%a8%d7%95%d7%a2-%d7%94%d7%94%d7%aa%d7%a8%d7%9e%d7%94-%d7%94%d7%a8/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>לכתבה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                </div>
              </article>

              <article className="press-card" data-reveal="up">
                <div className="press-card__thumb"><img src="/images/content/d21.jpg" alt="להקת שי־יה בהופעה" loading="lazy" /></div>
                <div className="press-card__body">
                  <h3>כשהכוכבים האמיתיים עלו לבמה</h3>
                <p>בערב ההתרמה של בית שי, להקת שי־יה - המורכבת מילדי בית שי - ריגשה את הקהל והוכיחה
                  שכישרון, התמדה ואמונה יכולים לפרוץ כל גבול. רגעים של גאווה, מוזיקה ואהבה שנשארו בלב
                  של כל מי שהיה שם.</p>
                <p className="press-card__src">גליל מערבי אונליין</p>
                <a href="https://www.gmaaravionline.com/%d7%a2%d7%a8%d7%91-%d7%94%d7%94%d7%aa%d7%a8%d7%9e%d7%94-%d7%9c%d7%91%d7%99%d7%aa-%d7%a9%d7%99-%d7%9c%d7%94%d7%a7%d7%aa-%d7%a9%d7%99-%d7%99%d7%94-%d7%92%d7%a0%d7%91%d7%94-%d7%90%d7%aa-%d7%94%d7%94/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>לכתבה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                </div>
              </article>

              <article className="press-card" data-reveal="up">
                <div className="press-card__thumb"><img src="/images/content/d66.jpg" alt="דמויות מוכרות באירוע של בית שי" loading="lazy" /></div>
                <div className="press-card__body">
                  <h3>כשגם הלבבות המוכרים בוחרים לתת</h3>
                <p>אנשי תקשורת, אמנים ודמויות מוכרות התגייסו למען בית שי והעניקו את קולם למטרה החשובה
                  מכל - יצירת עתיד טוב יותר לילדים על הרצף האוטיסטי. שיתוף הפעולה המרגש מוכיח שכאשר
                  הקהילה מתאחדת, אפשר להגשים חלומות.</p>
                <p className="press-card__src">בלינקר · חדשות נהריה</p>
                <a href="https://blinker.co.il/%D7%A6%D7%A4%D7%95%D7%9F-1-%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%A0%D7%94%D7%A8%D7%99%D7%94/%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%91%D7%A6%D7%A4%D7%95%D7%9F-1-%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%A0%D7%94%D7%A8%D7%99%D7%94/%D7%94%D7%A1%D7%9C%D7%91%D7%A8%D7%99%D7%98%D7%90%D7%99%D7%9D-%D7%A0%D7%A8%D7%AA%D7%9E%D7%99%D7%9D-%D7%9C%D7%9E%D7%A2%D7%9F-%D7%91%D7%99%D7%AA-%D7%A9%D7%99-%D7%91%D7%A0%D7%94%D7%A8%D7%99%D7%94/248664/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>לכתבה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                </div>
              </article>

              <article className="press-card" data-reveal="up">
                <div className="press-card__thumb"><img src="/images/content/d36.jpg" alt="תצוגת האופנה של ילדי בית שי" loading="lazy" /></div>
                <div className="press-card__body">
                  <h3>כשילדים חולמים - הקהילה כולה צועדת איתם</h3>
                <p>בית שי פתח את שעריו ליריד יד שנייה ותצוגת אופנה מיוחדת, שבה הכישרון, היצירתיות
                  והעשייה של הילדים קיבלו מקום של כבוד. אירוע קהילתי מרגש שחיבר בין אנשים, יצירה
                  ואהבה גדולה לילדי בית שי.</p>
                <p className="press-card__src">גליל מערבי אונליין</p>
                <a href="https://www.gmaaravionline.com/%D7%91%D7%99%D7%AA-%D7%A9%D7%99-%D7%9E%D7%A6%D7%99%D7%92-%D7%99%D7%A8%D7%99%D7%93-%D7%99%D7%93-%D7%A9%D7%A0%D7%99%D7%94-%D7%95%D7%AA%D7%A6%D7%95%D7%92%D7%AA-%D7%90%D7%95%D7%A4%D7%A0%D7%94-%D7%A9/" target="_blank" rel="noopener" className="btn btn--rect">
                  <span>לכתבה</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                </div>
              </article>

            </div>
          </section>

          {/* ===================== לעיתונאים ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>עיתונאים ואנשי תקשורת</h2>
                <p>רוצים לסקר את בית שי, לקבל חומרים או לתאם ביקור? נשמח לעזור.</p>
              </div>
              <Link to="/contact?topic=%D7%A4%D7%A0%D7%99%D7%99%D7%AA%20%D7%AA%D7%A7%D7%A9%D7%95%D7%A8%D7%AA" className="btn btn--wide btn--white">
                <span>צרו קשר</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
