import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <Layout theme="green" title={"מי אנחנו - אהבת חינ\"מ"} description={"הסיפור שמאחורי עמותת אהבת חינ”מ ובית שי - החזון, המייסדות, וחנן חן שהוביל את הדרך."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">מי אנחנו</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">הסיפור שמאחורי העמותה</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>יש מקומות שנבנים</i></span>
                  <span className="ln"><i>מקירות, ויש מקומות</i></span>
                  <span className="ln"><i>שנבנים מאהבה.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  בית שי נולד מתוך אמונה עמוקה שלכל ילד מגיע להרגיש שייך. מקום שבו רואים אותו באמת,
                  מקבלים אותו כפי שהוא, ומעניקים לו הזדמנות לצמוח, לחלום ולבנות קשרים חברתיים משמעותיים.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <a href="#story" className="btn btn--pill btn--green">
                    <span>איך זה התחיל</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </a>
                  <Link to="/beit-shai" className="btn btn--pill btn--ghost">
                    <span>על בית שי</span>
                  </Link>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d16.jpg" alt="צוות בית שי והילדים בתמונה קבוצתית" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d24.jpg" alt="קהילה מתאספת באירוע של בית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d23.jpg" alt="משפחות יושבות יחד בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d09.jpg" alt="אירוע קהילתי של בית שי" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== מספרים ===================== */}
          <section className="sec--tight container">
            <div className="stats" data-stagger="90">
              <div className="stat stat--green" data-reveal="up">
                <p className="stat__num">2019</p>
                <p className="stat__label">שנת הקמת העמותה</p>
              </div>
              <div className="stat stat--blue" data-reveal="up">
                <p className="stat__num">7</p>
                <p className="stat__label">אמהות מייסדות, יחד עם חנן חן</p>
              </div>
              <div className="stat stat--yellow" data-reveal="up">
                <p className="stat__num stat__num--word">נהריה</p>
                <p className="stat__label">הבית הראשון - ומודל לבתים נוספים בפריפריה</p>
              </div>
              <div className="stat stat--coral" data-reveal="up">
                <p className="stat__num stat__num--word">קבוצות קטנות</p>
                <p className="stat__label">כל פעילות חוגית־טיפולית, תמיד</p>
              </div>
            </div>
          </section>

          {/* ===================== הסיפור ===================== */}
          <section className="sec container" id="story">
            <div className="split">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">האיש שמוביל את הדרך</p>
                <h2>הדרך אל הקמת בית שי החלה במפגש מיוחד עם ילד מיוחד</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>מאחורי הקמת בית שי עומד <strong>חנן חן</strong>, איש חינוך ותושב נהריה, בעל תואר ראשון בחינוך
                    ותואר שני במנהל עסקים, סגן־אלוף במילואים (בדימוס), לשעבר מפקד בסיס מחווה אלון וראש מנהל
                    החינוך במועצה האזורית מרום הגליל. לאורך עשרות שנים הקדיש את חייו לחינוך, להובלת אנשים
                    ולהקמת מסגרות המאפשרות לכל אדם לממש את יכולותיו. בנוסף, הוסמך בטכניון לטיפול בהפרעות
                    קשב וריכוז ומשמש כמנטור וכמאמן אישי.</p>
                  <p>במשך שנתיים ליווה חנן את <strong>שי</strong> - ילד חכם, רגיש ובעל חיוך כובש. הקשר שנרקם ביניהם
                    חשף בפניו מציאות כואבת: ילדים רבים על הרצף האוטיסטי מתמודדים לא רק עם אתגרי היומיום,
                    אלא גם עם בדידות וחוסר במסגרות חברתיות המותאמות לצורכיהם. משפחות רבות נאלצות לנסוע
                    שעות ארוכות כדי למצוא עבור ילדיהן מקום מתאים, ובאזור הצפון כמעט שלא קיימים פתרונות
                    קהילתיים המשלבים טיפול, שייכות וחיי חברה.</p>
                  <p>יחד עם הוריו של שי נולד חלום - <strong>להקים בית שיהיה הרבה יותר ממרכז טיפולי</strong>.
                    בית שבו ילדים יוכלו לצחוק, לשחק, ליצור חברויות אמיתיות ולהרגיש חלק מקהילה שמאמינה בהם.</p>
                  <p>כך הוקם בית שי - מקום הנושא בגאווה את שמו של שי, שהיווה את ההשראה להגשמת החזון
                    והפך לסמל של תקווה, אהבה ועשייה למען ילדים ומשפחותיהם.</p>
                </div>
              </div>
              <div className="split__media split__media--frameless" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/hanan-story.png" alt="חנן חן, מייסד בית שי" loading="lazy" />
                <p className="split__badge">בית שי נושא את שמו של שי</p>
              </div>
            </div>
          </section>

          {/* ===================== ציטוט ===================== */}
          <section className="container">
            <div className="quote" data-reveal="scale">
              <p>סיפור שהתחיל בילד אחד, והפך לבית עבור רבים.</p>
            </div>
          </section>

          {/* ===================== העמותה ===================== */}
          <section className="sec container">
            <div className="split split--flip">
              <div className="split__copy" data-reveal="up">
                <p className="sec__kicker">עמותת אהבת חינ”מ (חינוך מיוחד)</p>
                <h2>את פעילות בית שי מובילה שותפות אמיתית עם המשפחות</h2>
                <div className="rule"></div>
                <div className="prose">
                  <p>העמותה הוקמה במרץ 2019 על ידי <strong>שבע אמהות לילדים על הרצף האוטיסטי</strong>, יחד עם חנן חן.
                    היא פועלת מתוך שותפות אמיתית עם המשפחות, מתוך הקשבה לצרכים העולים מהשטח ומתוך
                    מחויבות להעניק לילדי הצפון את המענים הראויים להם. האמהות משפיעות על התהליכים במרכז,
                    כולל קבלת התרומות.</p>
                  <p>כיום מהווה בית שי מרחב קהילתי ייחודי המשלב טיפול מקצועי, פעילות חברתית וחוויות
                    יומיומיות בסביבה בטוחה, מכילה ואוהבת. במרכז פועלים חדרי טיפול ומשחק, חצר עשירה
                    במתקנים, פינת חי, כלבים טיפוליים, חוגים ופעילויות מגוונות - כל אלה נועדו להעניק
                    לילדים תחושת מסוגלות, ביטחון, שמחה וחיבור אמיתי לאחרים.</p>
                  <p>אבל מעל הכול, בית שי הוא <strong>בית של אנשים</strong>. מקום שבו ילדים אינם מוגדרים על פי
                    האבחנה שלהם, אלא על פי האישיות, הכוחות והאור שהם מביאים איתם.</p>
                  <p>אנחנו מאמינים שחברה טובה יותר מתחילה בקבלה, בהכלה ובערבות הדדית. כאשר יוצרים מקום
                    שבו כל ילד מרגיש שייך - לא רק החיים שלו משתנים, אלא גם החברה כולה הופכת אנושית,
                    מחבקת וטובה יותר.</p>
                </div>
              </div>
              <div className="split__media split__media--tall" data-reveal="fade" data-parallax="-0.03">
                <img src="/images/content/d40.jpg" alt="קהילת בית שי באירוע משותף" loading="lazy" />
              </div>
            </div>
          </section>

          {/* ===================== דבר המנהל ===================== */}
          <section className="sec container">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">דבר המנהל</p>
              <h2>מילה מחנן</h2>
              <div className="rule"></div>
            </div>
            <div className="person person--portrait" data-reveal="up">
              <div className="person__portrait">
                <img src="/images/hanan-cutout.png" width="620" height="736"
                     alt="חנן חן, מייסד בית שי" loading="lazy" />
              </div>
              <svg className="person__quote-icon" viewBox="133 169.5 246.3 173" aria-hidden="true"><path d="m207 316.1c-1.9 6.8-6.8 11.2-14.7 13.3s-14.5 3.1-19.6 3.1-10.1-.6-15-1.7c-9.8-2.6-14.7-7.6-14.7-14.7v-119.6c0-6.8 8.1-11.7 24.4-14.7 7.9-1.5 16.1-2.3 24.4-2.3s16.6.8 24.9 2.3c16.2 3 24.4 7.9 24.4 14.7-.1 0-34.1 119.6-34.1 119.6zm128.1 0c-1.9 6.8-6.8 11.2-14.7 13.3s-14.5 3.1-19.6 3.1-10.1-.6-15-1.7c-9.8-2.6-14.7-7.6-14.7-14.7v-119.6c0-6.8 8.1-11.7 24.4-14.7 7.9-1.5 16.1-2.3 24.4-2.3s16.6.8 25 2.3c16.2 3 24.4 7.9 24.4 14.7z" fill="currentColor"/></svg>
              <div className="person__copy">
                <p className="person__quote">בבית שי אנחנו מתעסקים בכוחות של הילדים ופועלים להעצמת הזריחות שהם
                  מביאים לעולם. כשילד מרגיש בטוח, עטוף באהבה ובאמונה - הוא פשוט מתחיל לזרוח.</p>
                <p className="person__name">חנן חן</p>
                <p className="person__role">איש חינוך, יזם, חולם - ובעיקר מגשים חלומות</p>
              </div>
            </div>
          </section>

          {/* ===================== סיום ===================== */}
          <section className="sec container">
            <div className="cta-band" data-reveal="up">
              <div className="cta-band__copy">
                <h2>רוצים להיות חלק מהסיפור?</h2>
                <p>תרומה, התנדבות או שותפות עסקית - כל דרך מביאה עוד ילד למקום שבו הוא מרגיש שייך.</p>
              </div>
              <Link to="/donate" className="btn btn--wide btn--white">
                <span>לעמוד התרומות</span>
                <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
