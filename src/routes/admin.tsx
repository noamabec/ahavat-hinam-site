import { createFileRoute } from "@tanstack/react-router";
import { useLegacyScript } from "@/hooks/useLegacyScript";
import "@/styles/admin.scoped.css";

export const Route = createFileRoute("/admin")({ component: AdminPanel });

/* ============================================================
   פאנל הניהול.
   ------------------------------------------------------------
   המבנה והעיצוב הועברו כמות שהם מהאב-טיפוס שאושר, והלוגיקה
   נטענת מ-public/js/admin.js. זה נעשה במכוון: הפאנל כבר בנוי
   ומאושר ויזואלית, ומה שחסר לו הוא חיבור לנתונים אמיתיים -
   לא עיצוב מחדש. הסגנונות מבודדים תחת .admin-app כדי שלא
   יתנגשו עם גיליונות האתר.

   מה עדיין דמו וצריך להפוך לאמיתי:
   - התחברות: כרגע בדיקה בצד לקוח בלבד. צריך Supabase Auth.
   - תרומות/הוראות קבע: מערכי דמו בקוד. צריך שאילתות לטבלאות
     donation_certificates ו-standing_orders הקיימות.
   - אירועים/עמודים/גרסאות: מערכי דמו.
   מסך הגלריה כבר אמיתי לחלוטין (Supabase Storage + gallery_images).
   ============================================================ */
function AdminPanel() {
  useLegacyScript("/js/admin.js");

  return (
    <div className="admin-app">
      {/* ==================== מסך התחברות ==================== */}
      <div id="login">
        <div className="side">
          <img src="/images/logo.png" alt="" />
          <h2>פאנל הניהול<br />של אהבת חינ״מ</h2>
          <p>עדכון תוכן האתר, ניהול האירועים והגלריה, ומעקב אחרי תרומות ותעודות — במקום אחד.</p>
          <span className="bar"><i style={{ background: '#FC543E' }}></i><i style={{ background: '#FDC122' }}></i><i style={{ background: '#4DA831' }}></i><i style={{ background: '#18B1F0' }}></i></span>
        </div>

        <div className="form"><div className="box">
          <h3>כניסה למערכת</h3>
          <p className="sub">התחברו עם החשבון שקיבלתם מהעמותה</p>

          <div className="demo"><b>זהו אב-טיפוס עיצובי.</b> הבדיקה כאן היא בצד הדפדפן בלבד ואינה אבטחה אמיתית — מי שיפתח את קוד המקור יראה את הפרטים. בגרסה האמיתית תהיה התחברות מאובטחת דרך Supabase Auth.</div>

          <p className="err" id="lgErr"></p>

          <form id="loginForm" autoComplete="off">
            <div className="field"><label htmlFor="lgEmail">דוא״ל</label>
              <input id="lgEmail" type="email" dir="ltr" style={{ textAlign: 'left' }} autoComplete="off" /></div>
            <div className="field"><label htmlFor="lgPass">סיסמה</label>
              <input id="lgPass" type="password" dir="ltr" style={{ textAlign: 'left' }} placeholder="••••••••" autoComplete="off" /></div>
            <button className="btn btn--p full" type="submit">כניסה לפאנל</button>
          </form>

          <p className="foot">שכחתם סיסמה? <a href="#" id="lgForgot">איפוס דרך העמותה</a></p>
        </div></div>
      </div>

      <div id="demoBar">תצוגה מקדימה של פאנל הניהול · הנתונים כאן הם נתוני דוגמה בלבד ולא משפיעים על האתר</div>

      <div id="scrim"></div>

      <div id="shell">

        {/* ==================== סרגל צד ==================== */}
        <aside id="side">
          <div className="brand">
            <img src="/images/logo.png" alt="" />
            <span><b>אהבת חינ״מ</b><span>פאנל ניהול</span></span>
          </div>

          <nav className="navlist" id="nav">
            <div className="grp">ראשי</div>
            <a href="#/" data-r="/"><span className="ic"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg></span>סקירה כללית</a>
            <a href="#/donations" data-r="/donations"><span className="ic"><svg viewBox="0 0 24 24"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z"/></svg></span>תרומות</a>
            <a href="#/standing-orders" data-r="/standing-orders"><span className="ic"><svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg></span>הוראות קבע<span className="badge" id="soBadge" style={{ display: 'none' }}>0</span></a>

            <div className="grp">תוכן האתר</div>
            <a href="#/visual" data-r="/visual"><span className="ic"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span>עריכה חזותית</a>
            <a href="#/events" data-r="/events"><span className="ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg></span>אירועים</a>
            <a href="#/gallery" data-r="/gallery"><span className="ic"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5L5 20"/></svg></span>גלריית תמונות</a>
            <a href="#/pages" data-r="/pages"><span className="ic"><svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg></span>עמודים וטקסטים</a>
            <a href="#/versions" data-r="/versions"><span className="ic"><svg viewBox="0 0 24 24"><path d="M3 3v6h6"/><path d="M3.5 9a9 9 0 1 0 2.1-3.4L3 9"/><path d="M12 7v5l3.5 2"/></svg></span>היסטוריית גרסאות</a>

            <div className="grp">הגדרות</div>
            <a href="#/settings" data-r="/settings"><span className="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg></span>פרטי העמותה</a>
          </nav>

          <div className="sideFoot">
            <div className="who"><span className="av">ר</span><span><b>רונית · מנהלת</b><span>ahavat.org.il</span></span>
              <button id="logout" title="יציאה" style={{ marginInlineStart: 'auto', width: '32px', height: '32px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
                <svg viewBox="0 0 24 24" style={{ width: '17px', height: '17px', stroke: '#7D93A9', fill: 'none', strokeWidth: '1.8', strokeLinecap: 'round' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>
              </button>
            </div>
          </div>
        </aside>

        {/* ==================== ראשי ==================== */}
        <div id="main">
          <header id="top">
            <button id="burger" aria-label="תפריט"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
            <h1 id="ttl">סקירה כללית</h1>
            <div className="search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
              <input placeholder="חיפוש תורם, אירוע…" />
            </div>
            <button className="topbtn" aria-label="התראות"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg><span className="dot"></span></button>
          </header>

          <main id="view"></main>
        </div>
      </div>

      <div id="modal"><div className="box">
        <div className="hd"><h3 id="mTtl">עריכה</h3><button id="mX"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
        <div className="bd" id="mBd"></div>
        <div className="ft"><button className="btn btn--p" id="mOk">שמירה</button><button className="btn btn--g" id="mCancel">ביטול</button></div>
      </div></div>

      <div id="toast"></div>
    </div>
  );
}
