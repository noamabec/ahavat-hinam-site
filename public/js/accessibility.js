/* ============================================================
   וידג'ט נגישות - אהבת חינ"מ
   ------------------------------------------------------------
   עצמאי לחלוטין, בלי שירות חיצוני בתשלום. נטען בכל עמודי האתר,
   וההעדפות נשמרות ב-localStorage כך שהן חלות מחדש אוטומטית בכל
   טעינת עמוד - זה מה שמחליף כאן "provider" של אפליקציית SPA:
   האתר בנוי מ-27 עמודי HTML נפרדים, ולכן ההתמדה היא דרך האחסון
   המקומי ולא דרך state בזיכרון.

   תקינה: ת"י 5568 רמה AA, WCAG 2.1 AA.

   הערה על סדר הפעולות: החלת ההעדפות (applyPrefs) רצה מיד, לפני
   בניית ממשק הווידג'ט ולפני DOMContentLoaded, כדי שלא יהיה הבזק
   של תצוגה לא מונגשת בין טעינת הדף להחלת ההגדרות.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'a11yPrefs';
  var root = document.documentElement;

  /* ---------- קריאה/שמירה של ההעדפות ---------- */
  function loadPrefs() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {}
  }

  var prefs = loadPrefs();

  /* ---------- הסבה מהגרסה הקודמת של הווידג'ט ----------
     בגרסה הישנה 'contrast' ו-'grayscale' היו שני מתגים בוליאניים
     נפרדים. עכשיו מצבי התצוגה הם בחירה יחידה (mode), כי ניגודיות
     גבוהה / כהה / בהיר / אפור סותרים זה את זה. מסיבים פעם אחת כדי
     שמשתמש שכבר הגדיר העדפה לא יאבד אותה. */
  if (prefs.contrast !== undefined || prefs.grayscale !== undefined) {
    if (prefs.contrast) prefs.mode = 'contrast';
    else if (prefs.grayscale) prefs.mode = 'mono';
    if (prefs.underline !== undefined) { prefs.links = prefs.underline; }
    delete prefs.contrast; delete prefs.grayscale; delete prefs.underline;
    savePrefs(prefs);
  }

  /* מתגים פשוטים (דלוק/כבוי) -> מחלקה על <html> */
  var TOGGLES = {
    readable:  'a11y-readable',
    invert:    'a11y-invert',
    links:     'a11y-links',
    headings:  'a11y-headings',
    cursor:    'a11y-cursor',
    stopAnim:  'a11y-stop-anim',
    noImages:  'a11y-no-images',
    kbd:       'a11y-kbd',
    guide:     'a11y-guide-on',
    mask:      'a11y-mask-on'
  };
  /* מצבי תצוגה - בחירה יחידה בלבד */
  var MODES = ['contrast', 'dark', 'light', 'mono'];
  /* דרגות - 0 עד max */
  var LEVELS = { fs: 3, lh: 2, sp: 2 };

  function applyPrefs() {
    Object.keys(TOGGLES).forEach(function (k) {
      root.classList.toggle(TOGGLES[k], !!prefs[k]);
    });
    MODES.forEach(function (m) {
      root.classList.toggle('a11y-mode-' + m, prefs.mode === m);
    });
    Object.keys(LEVELS).forEach(function (k) {
      if (prefs[k]) root.setAttribute('data-a11y-' + k, prefs[k]);
      else root.removeAttribute('data-a11y-' + k);
    });
  }
  applyPrefs();

  /* ============================================================
     תיקוני נגישות אוטומטיים - חלים על כל עמוד, בלי לגעת ב-HTML
     ============================================================ */
  function autoFix() {
    /* שפה וכיוון - הבסיס לכל קורא מסך */
    if (!root.getAttribute('lang')) root.setAttribute('lang', 'he');
    if (!root.getAttribute('dir')) root.setAttribute('dir', 'rtl');

    /* אזור תוכן מרכזי + קישור דילוג אליו.
       רוב העמודים כבר מכילים את שניהם ב-HTML; זה רשת ביטחון
       לעמודים שלא (למשל עמוד הבית, שנבנה לפני שאר האתר). */
    var main = document.querySelector('main');
    if (main && !main.id) main.id = 'main';
    if (main && !document.querySelector('a[href="#main"].sr-only')) {
      var skip = document.createElement('a');
      skip.href = '#main';
      skip.className = 'sr-only';
      skip.textContent = 'דילוג לתוכן המרכזי';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    /* ציוני דרך (landmarks) - רק אם חסרים */
    var header = document.querySelector('header');
    if (header && !header.getAttribute('role')) header.setAttribute('role', 'banner');
    var footer = document.querySelector('footer');
    if (footer && !footer.getAttribute('role')) footer.setAttribute('role', 'contentinfo');
    if (main && !main.getAttribute('role')) main.setAttribute('role', 'main');

    /* תמונות בלי alt - מסומנות כדקורטיביות, כדי שקורא מסך ידלג
       עליהן במקום להקריא את שם הקובץ */
    Array.prototype.forEach.call(document.images, function (img) {
      if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
    });

    /* שדות טופס בלי תווית נגישה - נגזרת מה-placeholder או מהטקסט
       הסמוך, כדי שלא יוקראו כ"עריכת טקסט" בלי הקשר */
    var fields = document.querySelectorAll('input,select,textarea');
    Array.prototype.forEach.call(fields, function (el) {
      if (el.type === 'hidden') return;
      if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) return;
      if (el.id && document.querySelector('label[for="' + el.id + '"]')) return;
      if (el.closest('label')) return;   /* תווית עוטפת - תקין */
      var label = el.getAttribute('placeholder') || el.name || '';
      if (label) el.setAttribute('aria-label', label);
    });

    /* קישורים שנפתחים בלשונית חדשה - להודיע על כך מראש */
    var newTab = document.querySelectorAll('a[target="_blank"]');
    Array.prototype.forEach.call(newTab, function (a) {
      if (!a.getAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
      var lbl = a.getAttribute('aria-label') || a.textContent.trim();
      if (lbl && lbl.indexOf('לשונית חדשה') === -1) {
        a.setAttribute('aria-label', lbl + ' (נפתח בלשונית חדשה)');
      }
    });
  }

  /* ============================================================
     בניית הווידג'ט
     ============================================================ */
  function icon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      paths + '</svg>';
  }
  /* כפתור דרגה: מציג גם נקודות מצב, כדי שלא נסתמך על צבע בלבד */
  function levelBtn(action, label, paths, max) {
    var dots = '';
    for (var i = 0; i < max; i++) dots += '<i></i>';
    return '<button type="button" class="a11y-btn" data-a11y-action="' + action + '" aria-pressed="false">' +
      icon(paths) + '<span>' + label + '</span>' +
      '<span class="a11y-level" aria-hidden="true">' + dots + '</span></button>';
  }
  function toggleBtn(action, label, paths) {
    return '<button type="button" class="a11y-btn" data-a11y-action="' + action + '" aria-pressed="false">' +
      icon(paths) + '<span>' + label + '</span></button>';
  }

  function buildWidget() {
    autoFix();

    /* --- הכפתור הצף --- */
    var toggle = document.createElement('button');
    toggle.className = 'a11y-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'תפריט נגישות');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'a11yPanel');
    toggle.innerHTML = '<img src="./public/images/accessibility-icon.svg" alt="" width="52" height="52" />';

    /* --- הפאנל --- */
    var panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11yPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'a11yTitle');

    panel.innerHTML =
      '<button type="button" class="a11y-close" aria-label="סגירת תפריט נגישות">' +
        icon('<path d="M18 6 6 18M6 6l12 12"/>') +
      '</button>' +
      '<h2 id="a11yTitle">נגישות</h2>' +
      '<p class="a11y-panel__sub">התאימו את התצוגה להעדפותיכם</p>' +

      '<h3 class="a11y-group">טקסט</h3>' +
      '<div class="a11y-panel__grid">' +
        levelBtn('fs', 'גודל טקסט', '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>', 3) +
        levelBtn('lh', 'גובה שורה', '<path d="M3 5h18M3 12h18M3 19h18"/>', 2) +
        levelBtn('sp', 'ריווח אותיות', '<path d="M4 8V6h16v2M8 18h8M12 6v12"/>', 2) +
        toggleBtn('readable', 'גופן קריא', '<path d="M4 20V6a2 2 0 0 1 2-2h12M7 20h11M9 12h7M9 8h7"/>') +
      '</div>' +

      '<h3 class="a11y-group">צבע וניגודיות</h3>' +
      '<div class="a11y-panel__grid">' +
        toggleBtn('mode:contrast', 'ניגודיות גבוהה', '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor"/>') +
        toggleBtn('mode:dark', 'מצב כהה', '<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z"/>') +
        toggleBtn('mode:light', 'מצב בהיר', '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>') +
        toggleBtn('mode:mono', 'גווני אפור', '<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>') +
        toggleBtn('invert', 'היפוך צבעים', '<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor"/>') +
        toggleBtn('noImages', 'הסתרת תמונות', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 20 21 4"/>') +
      '</div>' +

      '<h3 class="a11y-group">הדגשה וניווט</h3>' +
      '<div class="a11y-panel__grid">' +
        toggleBtn('links', 'הדגשת קישורים', '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>') +
        toggleBtn('headings', 'הדגשת כותרות', '<path d="M6 4v16M18 4v16M6 12h12"/>') +
        toggleBtn('cursor', 'סמן מוגדל', '<path d="M5 3l6 18 2-7 7-2z"/>') +
        toggleBtn('kbd', 'הדגשת מיקוד', '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>') +
        toggleBtn('guide', 'סרגל קריאה', '<path d="M3 12h18M7 8v8M17 8v8"/>') +
        toggleBtn('mask', 'מסכת קריאה', '<path d="M2 6h20M2 18h20"/><rect x="2" y="10" width="20" height="4" rx="1"/>') +
        toggleBtn('stopAnim', 'עצירת אנימציות', '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>') +
      '</div>' +

      '<button type="button" class="a11y-reset">איפוס להגדרות ברירת מחדל</button>' +
      '<a href="./accessibility.html" class="a11y-statement">הצהרת הנגישות של האתר</a>';

    /* --- סרגל ומסכת קריאה --- */
    var guide = document.createElement('div');
    guide.className = 'a11y-guide';
    guide.setAttribute('aria-hidden', 'true');

    var mask = document.createElement('div');
    mask.className = 'a11y-mask';
    mask.setAttribute('aria-hidden', 'true');
    mask.innerHTML = '<i class="top"></i><i class="bottom"></i>';

    document.body.appendChild(toggle);
    document.body.appendChild(panel);
    document.body.appendChild(guide);
    document.body.appendChild(mask);

    /* ---------- סנכרון מצב הכפתורים ---------- */
    function syncButtons() {
      Object.keys(TOGGLES).forEach(function (k) {
        var b = panel.querySelector('[data-a11y-action="' + k + '"]');
        if (b) b.setAttribute('aria-pressed', String(!!prefs[k]));
      });
      MODES.forEach(function (m) {
        var b = panel.querySelector('[data-a11y-action="mode:' + m + '"]');
        if (b) b.setAttribute('aria-pressed', String(prefs.mode === m));
      });
      Object.keys(LEVELS).forEach(function (k) {
        var b = panel.querySelector('[data-a11y-action="' + k + '"]');
        if (!b) return;
        var val = prefs[k] || 0;
        b.setAttribute('aria-pressed', String(val > 0));
        /* התווית מכריזה על הדרגה, כדי שקורא מסך ידע כמה הוגדל */
        var name = b.querySelector('span').textContent;
        b.setAttribute('aria-label', name + ' - דרגה ' + val + ' מתוך ' + LEVELS[k]);
        var dots = b.querySelectorAll('.a11y-level i');
        Array.prototype.forEach.call(dots, function (d, i) {
          d.classList.toggle('on', i < val);
        });
      });
    }
    syncButtons();

    /* ---------- פתיחה/סגירה + לכידת פוקוס ---------- */
    var lastFocus = null;

    function focusables() {
      return panel.querySelectorAll('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    }
    function openPanel() {
      lastFocus = document.activeElement;
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      var f = focusables();
      if (f.length) f[0].focus();
    }
    function closePanel() {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      /* הפוקוס חוזר למקום שממנו נפתח הפאנל */
      (lastFocus && document.contains(lastFocus) ? lastFocus : toggle).focus();
    }
    function isOpen() { return panel.classList.contains('is-open'); }

    toggle.addEventListener('click', function () {
      if (isOpen()) closePanel(); else openPanel();
    });
    panel.querySelector('.a11y-close').addEventListener('click', closePanel);

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); closePanel(); return; }
      if (e.key !== 'Tab') return;
      /* לכידת פוקוס: Tab לא יוצא מהפאנל כל עוד הוא פתוח */
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      closePanel();
    });

    /* ---------- לחיצה על פעולה ---------- */
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y-action]');
      if (!btn) return;
      var action = btn.getAttribute('data-a11y-action');

      if (action.indexOf('mode:') === 0) {
        var m = action.slice(5);
        prefs.mode = (prefs.mode === m) ? null : m;   /* לחיצה חוזרת מכבה */
      } else if (LEVELS[action] !== undefined) {
        /* מחזוריות: 0 -> 1 -> ... -> max -> 0 */
        prefs[action] = ((prefs[action] || 0) + 1) % (LEVELS[action] + 1);
      } else if (TOGGLES[action]) {
        prefs[action] = !prefs[action];
        /* סרגל ומסכה לא הגיוניים יחד - האחרון שנבחר מנצח */
        if (action === 'guide' && prefs.guide) prefs.mask = false;
        if (action === 'mask' && prefs.mask) prefs.guide = false;
      } else {
        return;
      }
      savePrefs(prefs);
      applyPrefs();
      syncButtons();
    });

    panel.querySelector('.a11y-reset').addEventListener('click', function () {
      prefs = {};
      savePrefs(prefs);
      applyPrefs();
      syncButtons();
      announce('כל הגדרות הנגישות אופסו');
    });

    /* ---------- סרגל/מסכת קריאה: מעקב אחרי עכבר ומקלדת ---------- */
    function place(y) {
      guide.style.top = y + 'px';
      var half = 60;
      mask.querySelector('.top').style.height = Math.max(0, y - half) + 'px';
      mask.querySelector('.bottom').style.height = Math.max(0, window.innerHeight - y - half) + 'px';
    }
    document.addEventListener('mousemove', function (e) {
      if (prefs.guide || prefs.mask) place(e.clientY);
    }, { passive: true });
    /* גם ניווט מקלדת מזיז את הסרגל - אחרת הוא חסר תועלת למי
       שלא משתמש בעכבר כלל */
    document.addEventListener('focusin', function (e) {
      if (!prefs.guide && !prefs.mask) return;
      if (panel.contains(e.target)) return;
      var r = e.target.getBoundingClientRect();
      place(r.top + r.height / 2);
    });
    place(window.innerHeight / 2);

    /* ---------- הכרזה לקורא מסך ---------- */
    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('role', 'status');
    live.className = 'sr-only';
    document.body.appendChild(live);
    function announce(msg) {
      live.textContent = '';
      setTimeout(function () { live.textContent = msg; }, 60);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
