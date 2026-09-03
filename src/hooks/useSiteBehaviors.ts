import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/* ============================================================
   ההתנהגויות המשותפות של האתר - פורט 1:1 מ-public/js/pages.js.
   ------------------------------------------------------------
   הבדל מהותי אחד מהמקור: באתר הסטטי הסקריפט רץ פעם אחת לכל טעינת
   עמוד, ולכן לא היה צריך לנקות אחריו. ב-SPA המסלול מתחלף בלי טעינה
   מחדש, ולכן כל מאזין/observer חייב ניקוי - אחרת הם נערמים בכל מעבר
   בין עמודים וגורמים לדליפת זיכרון ולריצה כפולה של אותה לוגיקה.
   ============================================================ */
export function useSiteBehaviors() {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | Document | Element,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    /* ---------- תפריט מובייל ---------- */
    const nav = document.getElementById("nav");
    const toggle = nav?.querySelector<HTMLButtonElement>(".nav__toggle");
    if (nav && toggle) {
      /* אינדקס לכל פריט - ה-CSS משתמש בו לחישוב ההשהיה המדורגת */
      nav.querySelectorAll<HTMLElement>(".nav__links > *").forEach((el, i) => {
        el.style.setProperty("--i", String(i));
      });
      on(toggle, "click", () => {
        const open = nav.dataset.open === "true";
        nav.dataset.open = String(!open);
        toggle.setAttribute("aria-expanded", String(!open));
      });
      on(document, "click", (e) => {
        const t = e.target as Element;
        if (nav.dataset.open === "true" && !nav.contains(t)) {
          nav.dataset.open = "false";
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* ---------- תפריט משנה בדסקטופ (עכבר דרך CSS, מקלדת/מגע כאן) ---------- */
    document.querySelectorAll<HTMLElement>(".nav__group").forEach((group) => {
      const trigger = group.querySelector<HTMLButtonElement>(".nav__trigger");
      if (!trigger) return;
      on(trigger, "click", (e) => {
        e.preventDefault();
        const open = group.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(open));
      });
      on(group, "keydown", (e) => {
        if ((e as KeyboardEvent).key === "Escape") {
          group.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });
      on(document, "click", (e) => {
        if (!group.contains(e.target as Element)) {
          group.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    });

    /* ---------- השהיה מדורגת בתוך קבוצה ---------- */
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const step = parseFloat(group.dataset.stagger || "0") || 0;
      group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
        el.style.setProperty("--d", i * step + "ms");
      });
    });

    /* ---------- חשיפה בגלילה ---------- */
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      );
      targets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- פרלקסה + פס התקדמות: rAF אחד, transform בלבד ---------- */
    const header = document.querySelector(".site-header");
    const bar = document.getElementById("progressBar");
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    let rafId = 0;

    const frame = () => {
      ticking = false;
      const vh = innerHeight;
      if (header) header.classList.toggle("is-stuck", scrollY > 4);
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0) + ")";
      }
      if (reduce) return;
      for (const el of par) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const y = (r.top + r.height / 2 - vh / 2) * (parseFloat(el.dataset.parallax || "0") || 0);
        el.style.transform = "translate3d(0," + y.toFixed(2) + "px,0)";
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(frame);
      }
    };
    on(window, "scroll", onScroll, { passive: true });
    on(window, "resize", onScroll);
    frame();
    cleanups.push(() => cancelAnimationFrame(rafId));

    /* ---------- לייטבוקס לתמונות ---------- */
    const onLightboxClick = (e: Event) => {
      const trigger = (e.target as Element).closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;
      e.preventDefault();
      const img = trigger.querySelector("img");
      openLightbox(trigger.getAttribute("href") || img?.src || "", img?.alt);
    };
    on(document, "click", onLightboxClick);

    return () => {
      cleanups.forEach((fn) => fn());
      /* אם עוזבים את העמוד בזמן שהלייטבוקס פתוח, הנעילה על body
         הייתה נשארת והגלילה באתר הייתה נתקעת. */
      document.body.classList.remove("gallery-lightbox-lock");
      document.querySelectorAll(".gallery-lightbox").forEach((el) => el.remove());
    };
  }, [pathname]);
}

/* לייטבוקס עצמאי - נחשף גם גלובלית כי הגלריה התלת-ממדית קוראת לו */
export function openLightbox(src: string, alt?: string) {
  const overlay = document.createElement("div");
  overlay.className = "gallery-lightbox";
  overlay.innerHTML =
    '<button class="gallery-lightbox__close" type="button" aria-label="סגירה">&times;</button><img src="" alt="" />';
  const img = overlay.querySelector("img")!;
  img.src = src;
  img.alt = alt || "";
  document.body.appendChild(overlay);
  document.body.classList.add("gallery-lightbox-lock");
  requestAnimationFrame(() => overlay.classList.add("is-open"));

  const close = () => {
    overlay.classList.remove("is-open");
    document.body.classList.remove("gallery-lightbox-lock");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => overlay.remove(), 250);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  overlay.addEventListener("click", (e) => {
    const t = e.target as Element;
    if (t === overlay || t.closest(".gallery-lightbox__close")) close();
  });
  document.addEventListener("keydown", onKey);
}
