import { ReactNode, useEffect } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import IconSprite from "./IconSprite";
import { useSiteBehaviors } from "@/hooks/useSiteBehaviors";
import { useLegacyScript } from "@/hooks/useLegacyScript";

type Theme = "blue" | "yellow" | "coral" | "green";

interface LayoutProps {
  children: ReactNode;
  /* גוון העמוד. באתר הסטטי זו הייתה מחלקה על <body>; כאן היא יושבת
     על עטיפת העמוד, כי שם גם מבודדים גיליונות הסגנון. */
  theme?: Theme;
  /* עמוד הבית משתמש בגיליון סגנונות נפרד לגמרי מזה של שאר העמודים,
     ושניהם מגדירים סלקטורים חופפים עם ערכים שונים. מחלקת העטיפה היא
     מה שמפריד ביניהם - ראו ההערה ב-src/index.css. */
  variant?: "home" | "inner";
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  theme = "blue",
  variant = "inner",
  title,
  description,
}: LayoutProps) {
  useSiteBehaviors();
  /* וידג'ט הנגישות ואנימציית הלוגו - נטענים בכל עמוד, כמו באתר
     הסטטי שבו כל קובץ HTML קרא לשניהם. אנימציית הלוגו אמורה
     להתנגן מחדש בכל מעבר עמוד, ולכן היא נטענת מחדש עם המסלול. */
  useLegacyScript("/js/accessibility.js");
  useLegacyScript("/js/brand-mark.js");

  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
  }, [title, description]);

  const wrapper = variant === "home" ? "page-home" : "page-inner";

  return (
    <div className={`${wrapper} theme-${theme}`}>
      <div className="progress" aria-hidden="true">
        <div className="progress__bar" id="progressBar"></div>
      </div>

      <IconSprite />

      <a href="#main" className="sr-only">
        דילוג לתוכן המרכזי
      </a>

      <div className="frame">
        {/* ההאדר נגזר מאותו variant של גיליון הסגנונות: לעמוד הבית
            אין כללי CSS לתפריט הנפתח, ולכן הוא מקבל את הניווט השטוח
            שלו. ראו ההערה ב-SiteHeader. */}
        <SiteHeader variant={variant} />
        <main id="main">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
