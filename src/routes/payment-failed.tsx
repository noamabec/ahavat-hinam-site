import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payment-failed")({ component: PaymentFailed });

function PaymentFailed() {
  return (
    <Layout theme="coral" title={"התרומה לא הושלמה - אהבת חינ\"מ"} description={"התרומה לא הושלמה ולא בוצע חיוב. אפשר לנסות שוב או ליצור קשר."}>
      {/* ===================== HERO ===================== */}
          <section className="page-hero page-hero--slim">
            <div className="container">
              <nav className="crumbs" aria-label="מיקום בעמוד">
                <Link to="/">דף הבית</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">התרומה לא הושלמה</span>
              </nav>
              <span className="eyebrow" data-reveal="fade">משהו השתבש</span>
              <h1 data-reveal="lines">
                <span className="ln"><i>התרומה לא הושלמה.</i></span>
              </h1>
              <p className="page-hero__lead" data-reveal="up" style={{ '--d': '250ms' }}>
                החיוב לא בוצע ולא נגבה מכם דבר. זה קורה לפעמים - כרטיס שנדחה,
                חיבור שנקטע, או פשוט לחיצה על "ביטול".
              </p>
            </div>
          </section>

          {/* ===================== מה עכשיו ===================== */}
          <section className="sec">
            <div className="container">
              <div className="prose">
                <p>אפשר פשוט לנסות שוב - ברוב המקרים זה פותר את זה:</p>
                <ul>
                  <li>ודאו שפרטי הכרטיס והתוקף הוקלדו נכון.</li>
                  <li>אם הכרטיס נדחה, נסו כרטיס אחר או בדקו מול חברת האשראי.</li>
                  <li>אם אתם על חיבור סלולרי חלש, כדאי לנסות שוב מרשת יציבה.</li>
                </ul>
                <p>
                  נתקעתם? אל תוותרו - <Link to="/contact">כתבו לנו</Link> ונשמח לעזור
                  לכם להשלים את התרומה בטלפון או בהעברה בנקאית.
                </p>
              </div>

              <div className="ty-acts">
                <Link to="/donate" className="btn btn--pill btn--coral">
                  <span>לנסות שוב</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
                <Link to="/contact" className="btn btn--pill">
                  <span>צרו קשר</span>
                  <span className="ico ico--sm" aria-hidden="true"><svg viewBox="0 0 19.3848 14.7279" preserveAspectRatio="none"><use href="#arrow" /></svg></span>
                </Link>
              </div>
            </div>
          </section>
    </Layout>
  );
}
