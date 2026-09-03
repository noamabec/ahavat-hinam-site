import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { useLegacyScript } from "@/hooks/useLegacyScript";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/donate")({ component: Donate });

function Donate() {
  /* טופס התרומה/יצירת הקשר. כולל את הגדרות הסליקה של טרנזילה. */
  useLegacyScript("/js/forms.js");

  return (
    <Layout theme="coral" title={"תרומה - אהבת חינ\"מ"} description={"תרמו לבית שי - כל תרומה הופכת לעוד טיפול, עוד חוג ועוד ילד שמרגיש שייך. תרומה מאובטחת וקבלה לפי סעיף 46."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero">
            <div className="container page-hero__inner">
              <div className="page-hero__copy">
                <nav className="crumbs" aria-label="מיקום בעמוד">
                  <Link to="/">דף הבית</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">תרומה</span>
                </nav>
                <span className="eyebrow" data-reveal="fade">❤️ משנים חיים. יחד.</span>
                <h1 data-reveal="lines">
                  <span className="ln"><i>לא צריך לשנות עולם</i></span>
                  <span className="ln"><i>שלם כדי לשנות</i></span>
                  <span className="ln"><i>עולם של ילד אחד.</i></span>
                </h1>
                <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                  התרומה שלכם מאפשרת לילדי בית שי לקבל את הכלים, התמיכה והאהבה שמגיעים להם.
                  כל תרומה, קטנה או גדולה, הופכת לעוד חיוך, עוד הצלחה, עוד חבר חדש ועוד ילד שמרגיש שהוא שייך.
                </p>
                <div className="page-hero__actions" data-reveal="up" style={{ '--d': '380ms' }}>
                  <a href="#amounts" className="btn btn--pill btn--auto btn--coral">
                    <span>לתרומה מאובטחת</span>
                    <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                  </a>
                  <a href="#partners" className="btn btn--pill btn--ghost">
                    <span>שותפויות ועסקים</span>
                  </a>
                </div>
              </div>

              <div className="hero-cluster" data-reveal="fade">
                <div className="hero-cluster__shot hero-cluster__shot--a"><img src="/images/content/d34.jpg" alt="ילדים חוגגים סביב שולחן בבית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--b"><img src="/images/content/d49.jpg" alt="ילדים משחקים בבריכה בחצר" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--c"><img src="/images/content/d19.jpg" alt="פעילות שמחה בבית שי" /></div>
                <div className="hero-cluster__shot hero-cluster__shot--d"><img src="/images/content/d05.jpg" alt="פעילות בחדר הטיפולים" /></div>
                <span className="dot dot--coral" aria-hidden="true"></span>
                <span className="dot dot--green" aria-hidden="true"></span>
                <span className="dot dot--yellow" aria-hidden="true"></span>
                <span className="dot dot--blue" aria-hidden="true"></span>
              </div>
            </div>
          </section>

          {/* ===================== סכומים ===================== */}
          <section className="sec container" id="amounts">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">לאן הכסף הולך</p>
              <h2>כל סכום - פעולה אמיתית בבית שי</h2>
              <div className="rule"></div>
              <p className="sec__sub">
                כל תרומה לבית שי מעניקה לילדים על הרצף האוטיסטי הזדמנות לקבל טיפול מקצועי, להשתתף
                בפעילויות חברתיות, לפתח כישורים ולגדול בסביבה בטוחה, אוהבת ומכילה.
              </p>
            </div>

            <div className="tiers-grid" data-stagger="110">
              <article className="tier-card tier-card--coral" data-reveal="up">
                <span className="tier-card__emoji" aria-hidden="true">❤️</span>
                <p className="tier-card__amount">50 ₪</p>
                <p className="tier-card__text">מסייעים במימון פעילות חברתית לילד.</p>
                <a href="#donate-form" className="btn btn--wide"><span>לתרומה</span></a>
              </article>
              <article className="tier-card tier-card--yellow" data-reveal="up">
                <span className="tier-card__emoji" aria-hidden="true">🎨</span>
                <p className="tier-card__amount">150 ₪</p>
                <p className="tier-card__text">מסייעים ברכישת ציוד לפעילויות טיפול והעשרה.</p>
                <a href="#donate-form" className="btn btn--wide"><span>לתרומה</span></a>
              </article>
              <article className="tier-card tier-card--blue" data-reveal="up">
                <span className="tier-card__emoji" aria-hidden="true">🤝</span>
                <p className="tier-card__amount">250 ₪</p>
                <p className="tier-card__text">מסייעים במימון טיפולים וליווי מקצועי לילדים ולמשפחות.</p>
                <a href="#donate-form" className="btn btn--wide"><span>לתרומה</span></a>
              </article>
              <article className="tier-card tier-card--green" data-reveal="up">
                <span className="tier-card__emoji" aria-hidden="true">✨</span>
                <p className="tier-card__amount">סכום חופשי</p>
                <p className="tier-card__text">כל סכום מתקבל באהבה ומגיע ישירות לילדים.</p>
                <a href="#donate-form" className="btn btn--wide"><span>לבחירת סכום</span></a>
              </article>
            </div>
          </section>

          {/* ===================== טופס בחירת סכום ===================== */}
          <section className="sec container" id="donate-form">
            <div className="donate-box" data-reveal="up">
              <div className="donate-box__copy">
                <h2>בחרו סכום ואופן תרומה</h2>
                <p>בזכותכם, עוד ילדים ירגישו בבית. התרומות מאפשרות לבית שי להמשיך להיות בית -
                  מקום שבו ילדים על הרצף האוטיסטי ומשפחותיהם מוצאים תמיכה, קבלה ותקווה.</p>
                <ul className="checklist checklist--plain">
                  <li>תרומה מאובטחת בכרטיס אשראי</li>
                  <li>קבלה מוכרת לצורכי מס לפי סעיף 46</li>
                  <li>אפשרות להוראת קבע חודשית</li>
                </ul>
              </div>

              <form className="donate-box__form" id="donateForm" novalidate>
                <fieldset className="seg" id="freqSeg">
                  <legend className="sr-only">תדירות התרומה</legend>
                  <label><input type="radio" name="freq" value="חד-פעמית" defaultChecked /><span>חד־פעמית</span></label>
                  <label id="horaat-keva"><input type="radio" name="freq" value="הוראת קבע חודשית" /><span>הוראת קבע</span></label>
                </fieldset>

                <fieldset className="seg seg--amounts" id="amountSeg">
                  <legend className="sr-only">סכום התרומה</legend>
                  <label><input type="radio" name="amount" value="50" /><span>50 ₪</span></label>
                  <label><input type="radio" name="amount" value="150" defaultChecked /><span>150 ₪</span></label>
                  <label><input type="radio" name="amount" value="250" /><span>250 ₪</span></label>
                  <label><input type="radio" name="amount" value="500" /><span>500 ₪</span></label>
                </fieldset>

                <label className="field">
                  <span>או סכום אחר (₪)</span>
                  <input type="number" min="1" step="1" inputMode="numeric" name="custom" id="customAmount" placeholder="לדוגמה: 360" />
                </label>

                <label className="field">
                  <span>שם מלא</span>
                  <input type="text" name="donorName" id="donorName" autoComplete="name" placeholder="לקבלה על שמכם" />
                </label>

                <label className="field">
                  <span>אימייל</span>
                  <input type="email" name="donorEmail" id="donorEmail" autoComplete="email" dir="ltr" style={{ textAlign: 'left' }} placeholder="לשליחת הקבלה" />
                </label>

                <a href="#" className="btn btn--wide btn--coral donate-box__submit" id="donateSubmit">
                  <span>לתרומה מאובטחת</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </a>
                <p className="form-note" id="donateNote">התרומה מתבצעת בעמוד סליקה מאובטח.</p>
              </form>
            </div>
          </section>

          {/* ===================== ציטוט ===================== */}
          <section className="container">
            <div className="quote" data-reveal="scale">
              <p>כל תרומה הופכת לעוד חיוך, עוד הצלחה, עוד חבר חדש ועוד ילד שמרגיש שהוא שייך.</p>
            </div>
          </section>

          {/* ===================== דרכים נוספות ===================== */}
          <section className="sec container" id="partners">
            <div className="sec__head" data-reveal="up">
              <p className="sec__kicker">דרכים נוספות לתמוך</p>
              <h2>לא רק בכסף</h2>
              <div className="rule"></div>
            </div>
            <div className="pillars" data-stagger="110">
              <article className="pillar pillar--blue" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
                </span>
                <h3>התנדבות</h3>
                <p>שעות של ליווי, חוגים, עזרה בחצר או בגלריה - כל זוג ידיים משנה את היומיום כאן.</p>
                <p style={{ marginTop: '.8em' }}><Link to="/contact?topic=%D7%94%D7%AA%D7%A0%D7%93%D7%91%D7%95%D7%AA" className="btn btn--rect btn--ghost btn--auto"><span>לפרטים</span></Link></p>
              </article>
              <article className="pillar pillar--yellow" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </span>
                <h3>שותפויות ועסקים</h3>
                <p>חסות לאירוע, אימוץ חוג, תרומת ציוד או יום התנדבות של הצוות שלכם.</p>
                <p style={{ marginTop: '.8em' }}><Link to="/contact?topic=%D7%A9%D7%95%D7%AA%D7%A4%D7%95%D7%AA%20%D7%A2%D7%A1%D7%A7%D7%99%D7%AA" className="btn btn--rect btn--ghost btn--auto"><span>לפרטים</span></Link></p>
              </article>
              <article className="pillar pillar--green" data-reveal="up">
                <span className="pillar__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-8-4.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5.5-8 10-8 10Z"/></svg>
                </span>
                <h3>הקדשת אירוע</h3>
                <p>יום הולדת, בר/בת מצווה או אירוע חברה - חוגגים בגלריה שלנו, וההכנסות הולכות לילדים.</p>
                <p style={{ marginTop: '.8em' }}><Link to="/the-gallery#events" className="btn btn--rect btn--ghost btn--auto"><span>לפרטים</span></Link></p>
              </article>
            </div>
          </section>

          {/* ===================== שאלות נפוצות ===================== */}
          <section className="sec container container--narrow">
            <div className="sec__head sec__head--center" data-reveal="up">
              <h2>שאלות נפוצות</h2>
              <div className="rule"></div>
            </div>
            <div className="faq" data-reveal="up">
              <details>
                <summary>האם התרומה מוכרת לצורכי מס?</summary>
                <p>כן. עמותת אהבת חינ”מ פועלת עם אישור ניהול תקין, וניתן לקבל קבלה מוכרת לצורכי מס לפי סעיף 46 לפקודת מס הכנסה.</p>
              </details>
              <details>
                <summary>לאן בדיוק הולך הכסף?</summary>
                <p>ישירות לפעילות השוטפת של בית שי: טיפולים פרא־רפואיים, רגשיים וחברתיים, חוגים והעשרה, ציוד, אחזקת החצר ופינת החי, וליווי למשפחות.</p>
              </details>
              <details>
                <summary>אפשר לתרום ציוד במקום כסף?</summary>
                <p>בהחלט. אנחנו שמחים לקבל ציוד לחוגים, למשחק ולטיפול. צרו איתנו קשר ונתאם מה נחוץ כרגע.</p>
              </details>
              <details>
                <summary>אפשר לקבוע הוראת קבע חודשית?</summary>
                <p>כן - וזו הדרך שהכי עוזרת לנו לתכנן קדימה. בחרו „הוראת קבע” בטופס התרומה, או דברו איתנו ונסדר את זה יחד.</p>
              </details>
            </div>
          </section>
    </Layout>
  );
}
