import { CSSProperties, useEffect, useState } from "react";

/* ============================================================
   אנימציית הכניסה של הלוגו (בית הפאזל).
   ------------------------------------------------------------
   באתר הסטטי זה היה public/js/brand-mark.js, שהחליף את תגית
   התמונה ב-DOM בארבעה חלקי פאזל. ב-SPA אי אפשר להשאיר את זה
   כסקריפט חיצוני, משתי סיבות שנצפו בפועל:

   1. הסקריפט קרא replaceWith() על אלמנט ש-React מנהל. אחרי מעבר
      עמוד React רנדר מחדש והסקריפט רץ שוב - והפעם ה-.brand-mark__icon
      הראשון ב-DOM היה זה של הפוטר, כך שגם לוגו הפוטר נבלע.
   2. הסקריפט קידד את שמות האנימציות (bmFly/bmSettle) כמחרוזות,
      אבל בידוד גיליונות הסגנון שינה אותם ל-bmFly-home / bmFly-inner
      (השמות התנגשו בין שני הגיליונות עם ערכים שונים). התוצאה: שם
      אנימציה שלא קיים, ולכן .brand-mark__piece נשאר על opacity:0
      מה-CSS - כלומר לוגו שקוף לגמרי.

   כרכיב React שני הדברים נפתרים: React מחזיק את ה-DOM שלו, ושם
   האנימציה נגזר מה-variant שממילא כבר קובע איזה גיליון פעיל.

   מיקומי החלקים זהים לקובץ העיצוב המקורי, כך שבמצב המנוחה הרכבת
   ארבעת החלקים משחזרת בדיוק את תמונת בית-הפאזל של האייקון השטוח.
   ============================================================ */

const PIECES = [
  { c: "green",  src: "green.png",  left: 16.01, top: 48.94, width: 39.58, origin: "60% 20%", delay: 0,    dur: 0.6,  from: "translate3d(-46%,30%,0) rotate(-16deg)" },
  { c: "orange", src: "orange.png", left: 10.32, top: 10.56, width: 41.06, origin: "70% 90%", delay: 0.12, dur: 0.6,  from: "translate3d(-12%,-58%,0) rotate(13deg)" },
  { c: "blue",   src: "blue.png",   left: 42.53, top: 11.19, width: 44.94, origin: "12% 84%", delay: 0.24, dur: 0.6,  from: "translate3d(46%,-32%,0) rotate(-14deg)" },
  { c: "yellow", src: "yellow.png", left: 52.11, top: 54.88, width: 41.79, origin: "14% 22%", delay: 0.36, dur: 0.68, from: "translate3d(64%,40%,0) rotate(22deg)" },
];

interface BrandMarkProps {
  /* קובע את סיומת שמות האנימציה, בהתאם לגיליון הסגנונות הפעיל */
  variant?: "home" | "inner";
}

export default function BrandMark({ variant = "inner" }: BrandMarkProps) {
  /* מתחילים מהאייקון השטוח - זה גם מה שהשרת מרנדר וגם מצב הסיום
     של האנימציה, כך שהלוגו נראה נכון מהפריים הראשון ולעולם לא
     "נעלם". רק אחרי הידרציה, ואם המשתמש לא ביקש פחות תנועה,
     עוברים לחלקים המונפשים. */
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(true);
    }
  }, []);

  if (!animate) {
    return <img src="/images/logo.png" alt="" className="brand-mark__icon" />;
  }

  const suffix = variant === "home" ? "home" : "inner";

  return (
    <span className="brand-mark__stage" aria-hidden="true">
      {PIECES.map((p) => (
        <img
          key={p.c}
          src={`/images/logo-pieces/${p.src}`}
          alt=""
          className="brand-mark__piece"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}%`,
              transformOrigin: p.origin,
              "--bm-from": p.from,
              animation:
                `bmFly-${suffix} ${p.dur}s cubic-bezier(.18,.86,.24,1) ${p.delay}s both, ` +
                `bmSettle-${suffix} .5s cubic-bezier(.3,1.4,.4,1) ${p.delay + p.dur + 0.05}s both`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
