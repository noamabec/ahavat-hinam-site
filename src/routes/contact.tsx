import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { useLegacyScript } from "@/hooks/useLegacyScript";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  /* טופס התרומה/יצירת הקשר. כולל את הגדרות הסליקה של טרנזילה. */
  useLegacyScript("/js/forms.js");

  return (
    <Layout theme="blue" title={"צרו קשר - אהבת חינ\"מ"} description={"יצחק שדה 18, נהריה. צרו קשר עם בית שי - רישום, התנדבות, תרומות, אירועים ופניות תקשורת."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">צרו קשר</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">יצחק שדה 18, נהריה</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>הדלת שלנו</i></span>
                  <span className="ln"><i>תמיד פתוחה.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  רוצים לשמוע על הפעילות, לשאול על מקום לילד שלכם, להתנדב, לתרום או לחגוג אצלנו?
                  כתבו לנו - נחזור אליכם בהקדם.
                </p>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d26.jpg" alt="החצר של בית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d13.jpg" alt="ילדים משחקים בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d31.jpg" alt="מתקני המשחק בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d43.jpg" alt="הכלבים הטיפוליים של בית שי" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== טופס + פרטים ===================== */}
          <section className="sec container">
            <div className="contact-grid">

              <div data-reveal="up">
                <p className="sec__kicker">כתבו לנו</p>
                <h2>נשמח לשמוע מכם</h2>
                <div className="rule"></div>

                <form id="contactForm" novalidate style={{ marginTop: 'clamp(18px,2.222vw,56.89px)' }}>
                  <label className="field">
                    <span>שם מלא *</span>
                    <input type="text" name="name" required autoComplete="name" />
                  </label>
                  <label className="field">
                    <span>טלפון</span>
                    <input type="tel" name="phone" autoComplete="tel" dir="ltr" />
                  </label>
                  <label className="field">
                    <span>אימייל *</span>
                    <input type="email" name="email" required autoComplete="email" dir="ltr" />
                  </label>
                  <label className="field">
                    <span>נושא הפנייה</span>
                    <select name="topic" id="topicSelect">
                      <option>פנייה כללית</option>
                      <option>רישום ילד לבית שי</option>
                      <option>בשביל בראשית</option>
                      <option>תנועת הנוער ואהבת</option>
                      <option>הגלריה שלנו</option>
                      <option>השכרת הגלריה לאירוע</option>
                      <option>התנדבות</option>
                      <option>שותפות עסקית</option>
                      <option>תרומה</option>
                      <option>פניית תקשורת</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>ההודעה שלכם</span>
                    <textarea name="message" rows="5"></textarea>
                  </label>

                  <button type="submit" className="btn btn--wide btn--blue">
                    <span>שליחה</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </button>
                  <p className="form-note" id="formNote">
                    השליחה פותחת הודעת מייל מוכנה בתוכנת הדואר שלכם. אפשר גם לכתוב לנו ישירות
                    ל־<a href="mailto:ah580676369@gmail.com" dir="ltr">ah580676369@gmail.com</a>
                  </p>
                </form>
              </div>

              <aside data-reveal="up">
                <div className="contact-cards">
                  <div className="contact-card">
                    <span className="contact-card__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <div>
                      <h3>הכתובת שלנו</h3>
                      <p>יצחק שדה 18, נהריה</p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <span className="contact-card__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    </span>
                    <div>
                      <h3>טלפון</h3>
                      <p><a href="tel:+972547728223" dir="ltr">054-772-8223</a></p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <span className="contact-card__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    <div>
                      <h3>אימייל</h3>
                      <p><a href="mailto:ah580676369@gmail.com" dir="ltr">ah580676369@gmail.com</a></p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <span className="contact-card__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </span>
                    <div>
                      <h3>שעות פעילות</h3>
                      <p>א׳–ה׳, 8:30–13:00</p>
                    </div>
                  </div>
                </div>

                <div className="map-embed">
                  <iframe
                    title="מפה - יצחק שדה 18, נהריה"
                    src="https://www.google.com/maps?q=%D7%99%D7%A6%D7%97%D7%A7%20%D7%A9%D7%93%D7%94%2018%2C%20%D7%A0%D7%94%D7%A8%D7%99%D7%94&output=embed"
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
                </div>
              </aside>

            </div>
          </section>

          {/* ===================== קיצורי דרך ===================== */}
          <section className="sec container">
            <div className="sec__head sec__head--center" data-reveal="up">
              <h2>אולי חיפשתם את זה</h2>
              <div className="rule"></div>
            </div>
            <div className="pillars" data-stagger="100">
              <Link className="pillar pillar--blue" to="/beit-shai" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
                </span>
                <h3>רישום לבית שי</h3>
                <p>הכירו את הפעילות, החוגים והטיפולים - ואז דברו איתנו על מקום פנוי.</p>
              </Link>
              <Link className="pillar pillar--coral" to="/breshit" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M2 21v-1.5A4.5 4.5 0 0 1 6.5 15h5A4.5 4.5 0 0 1 16 19.5V21"/></svg>
                </span>
                <h3>ליווי לאחים ולהורים</h3>
                <p>„בשביל בראשית” - מרחב רגשי לכל בני המשפחה.</p>
              </Link>
              <Link className="pillar pillar--green" to="/the-gallery#events" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>
                </span>
                <h3>הזמנת אירוע בגלריה</h3>
                <p>ימי הולדת, מפגשים וסדנאות - וכל ההכנסות לילדים.</p>
              </Link>
            </div>
          </section>
    </Layout>
  );
}
