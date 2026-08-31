/* ============================================================
   אהבת חינ"מ - התנהגות משותפת לכל העמודים הפנימיים
   ------------------------------------------------------------
   סקריפט קלאסי בכוונה (לא type="module") - כדי שהעמודים יעבדו גם
   כשפותחים אותם ישירות מהדיסק (file://), שם דפדפנים חוסמים fetch
   של מודולים.
   ============================================================ */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- שנה נוכחית בפוטר ---------- */
  var yr = document.getElementById('ftYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- תפריט מובייל ---------- */
  var nav = document.getElementById('nav');
  var toggle = nav && nav.querySelector('.nav__toggle');
  if (nav && toggle) {
    /* אינדקס לכל פריט בתפריט - ה-CSS משתמש בו לחישוב ההשהיה המדורגת */
    Array.prototype.forEach.call(nav.querySelectorAll('.nav__links > *'), function (el, i) {
      el.style.setProperty('--i', i);
    });
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- תפריט משנה בדסקטופ: עכבר פותח דרך CSS, מקלדת/מגע דרך כאן ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.nav__group'), function (group) {
    var trigger = group.querySelector('.nav__trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var open = group.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    group.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        group.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!group.contains(e.target)) {
        group.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- ההאדר מקבל קו הפרדה רק אחרי שגללו ---------- */
  var header = document.querySelector('.site-header');

  /* ---------- השהיה מדורגת בתוך קבוצה ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-stagger]'), function (group) {
    var step = parseFloat(group.dataset.stagger) || 90;
    Array.prototype.forEach.call(group.querySelectorAll('[data-reveal]'), function (el, i) {
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', (i * step) + 'ms');
    });
  });

  /* ---------- חשיפה בגלילה ---------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ---------- פרלקסה + פס התקדמות: rAF אחד, transform בלבד ---------- */
  var bar = document.getElementById('progressBar');
  var par = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function frame() {
    ticking = false;
    var vh = innerHeight;

    if (header) header.classList.toggle('is-stuck', scrollY > 4);

    if (bar) {
      var max = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
    }
    if (reduce) return;

    for (var i = 0; i < par.length; i++) {
      var el = par[i], r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var y = (r.top + r.height / 2 - vh / 2) * (parseFloat(el.dataset.parallax) || 0);
      el.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  /* ---------- לייטבוקס לתמונות (אותה התנהגות כמו בעמוד הבית) ---------- */
  function openLightbox(src, alt) {
    var overlay = document.createElement('div');
    overlay.className = 'gallery-lightbox';
    overlay.innerHTML =
      '<button class="gallery-lightbox__close" type="button" aria-label="סגירה">&times;</button>' +
      '<img src="" alt="" />';
    overlay.querySelector('img').src = src;
    overlay.querySelector('img').alt = alt || '';
    document.body.appendChild(overlay);
    document.body.classList.add('gallery-lightbox-lock');
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });

    function close() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('gallery-lightbox-lock');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { overlay.remove(); }, 250);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.gallery-lightbox__close')) close();
    });
    document.addEventListener('keydown', onKey);
  }
  window.GALLERY_LIGHTBOX_OPEN = openLightbox;

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;
    e.preventDefault();
    var img = trigger.querySelector('img');
    openLightbox(trigger.getAttribute('href') || (img && img.src), img && img.alt);
  });

  /* ---------- טופס תרומה: מעבר לעמוד הסליקה של טרנזילה ----------
     הסליקה עצמה מתבצעת אצל טרנזילה, בעמוד המאובטח שלהם (iframe/הפניה
     מתועדת - לא ה-API המלא שדורש מפתח סודי בצד-שרת). פרטי האשראי לא
     עוברים דרך האתר הזה ולא נשמרים בו בשום שלב - אנחנו רק שולחים טופס
     עם הסכום ופרטי התורם לכתובת שלהם.

     כל מה שצריך לשנות אם משהו מתחלף נמצא כאן, ב-TRANZILA:
       enabled  - מתג ראשי. כל עוד הוא false, כפתור התרומה לא שולח לסליקה
                  אלא מציג הודעה ומפנה ליצירת קשר.
       terminal - *שם* המסוף כפי שטרנזילה נתנו, כמו שהוא מופיע בכתובת
                  הסליקה שלהם. זה בדרך כלל מזהה באנגלית/ספרות - ולא
                  בהכרח מספר המסוף החשבונאי.
       currency - 1 = שקל.

     למה enabled=false כרגע: נוסה כאן המספר 5647324, וטרנזילה החזירו
     "הדף שחיפשתם לא נמצא" - כלומר זה לא שם המסוף שהכתובת שלהם מצפה לו.
     עד שיתקבל השם הנכון, עדיף להציג הודעה מנומסת מאשר לשלוח תורמים
     לעמוד שגיאה ולאבד את התרומה בשקט.

     כדי להפעיל: להחליף terminal בשם הנכון, לשנות enabled ל-true, ולבצע
     תרומת בדיקה אמיתית בסכום קטן. בנוסף - כדי שההחזרה לעמודי התודה/
     הכשלון תעבוד, צריך שכתובות ה-success/fail יאושרו גם בהגדרות המסוף
     בממשק של טרנזילה.

     שדות "חובה" לפי התיעוד של טרנזילה (חוץ מסכום ומטבע): שם איש קשר,
     חברה, אימייל, מדינה, עיר, מיקוד, כתובת. מהתורם עצמו אוספים רק שם
     ואימייל (גם ככה נדרשים בשביל הקבלה) - שאר השדות (חברה/מדינה/עיר/
     מיקוד/כתובת) ממולאים בפרטי העמותה עצמה כברירת מחדל קבועה, כדי לא
     להעמיס על טופס תרומה עם שדות שאין להם שימוש אמיתי אצלנו. */
  var TRANZILA = {
    enabled: false,
    terminal: '',
    currency: '1',
    orgName: 'עמותת אהבת חינ״מ',
    country: 'Israel',
    city: 'נהריה',
    zip: '2210001',
    address: 'יצחק שדה 18'
  };

  var donateForm = document.getElementById('donateForm');
  if (donateForm) {
    var submit = document.getElementById('donateSubmit');
    var custom = document.getElementById('customAmount');
    var note = document.getElementById('donateNote');
    var donorName = document.getElementById('donorName');
    var donorEmail = document.getElementById('donorEmail');
    var noteDefault = note ? note.textContent : '';

    /* סכום חופשי מבטל את הבחירה מהכפתורים, וההפך */
    custom.addEventListener('input', function () {
      if (custom.value) {
        Array.prototype.forEach.call(donateForm.querySelectorAll('input[name="amount"]'), function (r) { r.checked = false; });
      }
    });
    Array.prototype.forEach.call(donateForm.querySelectorAll('input[name="amount"]'), function (r) {
      r.addEventListener('change', function () { custom.value = ''; });
    });

    function currentAmount() {
      if (custom.value) return custom.value;
      var checked = donateForm.querySelector('input[name="amount"]:checked');
      return checked ? checked.value : '';
    }
    function currentFreq() {
      var el = donateForm.querySelector('input[name="freq"]:checked');
      return el ? el.value : '';
    }
    function isStandingOrder() {
      return /קבע/.test(currentFreq());
    }
    /* כתובת מוחלטת לעמוד באתר, כדי שטרנזילה תדע לאן להחזיר */
    function pageUrl(name) {
      return location.href.replace(/[^/]*$/, '') + name;
    }

    /* הוראת קבע עדיין לא מחוברת: היא דורשת צד-שרת ולא ניתן לממש אותה
       בבטחה באתר סטטי. לכן, במקום לחייב חיוב בודד למי שביקש הוראת קבע -
       מה שהיה מטעה ממש - מסבירים ומפנים ליצירת קשר. */
    function paintFreqNote() {
      if (!note) return;
      if (isStandingOrder()) {
        note.innerHTML = 'הוראת קבע חודשית מוקמת אצלנו ידנית - ' +
          '<a href="./contact.html?topic=%D7%AA%D7%A8%D7%95%D7%9E%D7%94">השאירו פרטים</a>' +
          ' ונחזור אליכם להסדרה. לתרומה חד־פעמית מיידית, בחרו "חד־פעמית".';
      } else {
        note.textContent = noteDefault;
      }
    }
    Array.prototype.forEach.call(donateForm.querySelectorAll('input[name="freq"]'), function (r) {
      r.addEventListener('change', paintFreqNote);
    });
    paintFreqNote();

    submit.addEventListener('click', function (e) {
      e.preventDefault();

      if (isStandingOrder()) { paintFreqNote(); return; }

      var amount = currentAmount();
      /* בדיקת שפיות על הסכום לפני שמעבירים לסליקה */
      var n = Number(amount);
      if (!amount || !isFinite(n) || n <= 0) {
        note.textContent = 'בחרו סכום או הקלידו סכום אחר, ואז המשיכו לתרומה.';
        custom.focus();
        return;
      }

      var name = (donorName.value || '').trim();
      if (!name) {
        note.textContent = 'צריך שם מלא כדי להנפיק את הקבלה - נא למלא ולנסות שוב.';
        donorName.focus();
        return;
      }
      var email = (donorEmail.value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'צריך אימייל תקין כדי לשלוח את הקבלה - נא למלא ולנסות שוב.';
        donorEmail.focus();
        return;
      }

      /* הסליקה עוד לא פעילה - לא שולחים תורמים לעמוד שבור */
      if (!TRANZILA.enabled || !TRANZILA.terminal) {
        note.innerHTML = 'עמוד הסליקה נמצא בהקמה אחרונה מול חברת האשראי. ' +
          'בינתיים נשמח לקבל את התרומה שלכם (' + n + ' ₪) - ' +
          '<a href="./contact.html?topic=%D7%AA%D7%A8%D7%95%D7%9E%D7%94">השאירו פרטים</a>' +
          ' ונחזור אליכם מיד.';
        return;
      }

      /* POST מומלץ ע"י טרנזילה על פני GET (בין השאר כדי לא לחשוף
         את פרטי התורם בכתובת/בהיסטוריית הדפדפן) - בונים טופס חבוי
         ושולחים אותו, בדיוק כמו בדוגמת האינטגרציה שלהם. */
      var fields = {
        sum: n,
        currency: TRANZILA.currency,
        contact: name,
        company: TRANZILA.orgName,
        email: email,
        country: TRANZILA.country,
        zip: TRANZILA.zip,
        address: TRANZILA.address,
        city: TRANZILA.city,
        cred_type: '1',
        lang: 'il',
        pdesc: 'תרומה ל' + TRANZILA.orgName,
        success_url_address: pageUrl('thank-you.html') + '?sum=' + n,
        fail_url_address: pageUrl('payment-failed.html')
      };

      var f = document.createElement('form');
      f.method = 'POST';
      f.action = 'https://directng.tranzila.com/' + TRANZILA.terminal + '/iframenew.php';
      Object.keys(fields).forEach(function (key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        f.appendChild(input);
      });
      document.body.appendChild(f);
      f.submit();
    });
  }

  /* ---------- עמוד התודה: מציג את הסכום שנתרם ----------
     טרנזילה מחזירה את פרטי העסקה בכתובת. מציגים רק את הסכום, ורק אם
     הוא באמת מספר - לא מהדהדים טקסט חופשי מה-URL אל תוך העמוד. */
  var tyDetails = document.getElementById('tyDetails');
  if (tyDetails) {
    var p = new URLSearchParams(location.search);
    var sum = Number(p.get('sum') || p.get('sum1') || '');
    if (isFinite(sum) && sum > 0) {
      tyDetails.textContent = 'תרמתם ' + sum.toLocaleString('he-IL') + ' ₪';
      tyDetails.hidden = false;
    }
  }

  /* ---------- עמוד יצירת קשר: בחירת נושא מראש דרך ?topic= ---------- */
  var topicSelect = document.getElementById('topicSelect');
  if (topicSelect) {
    var wanted = new URLSearchParams(location.search).get('topic');
    if (wanted) {
      var match = Array.prototype.filter.call(topicSelect.options, function (o) {
        return o.text.replace(/[”"']/g, '') === wanted.replace(/[”"']/g, '');
      })[0];
      if (match) topicSelect.value = match.value || match.text;
    }
  }

  /* ---------- טופס יצירת קשר: אין שרת, אז פותחים מייל מוכן ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body =
        'שם: ' + (d.get('name') || '') + '\n' +
        'טלפון: ' + (d.get('phone') || '') + '\n' +
        'אימייל: ' + (d.get('email') || '') + '\n' +
        'נושא: ' + (d.get('topic') || '') + '\n\n' +
        (d.get('message') || '');
      location.href = 'mailto:info@ahavat-hinam.org.il' +
        '?subject=' + encodeURIComponent('פנייה מהאתר - ' + (d.get('topic') || 'כללי')) +
        '&body=' + encodeURIComponent(body);
      var note = document.getElementById('formNote');
      if (note) note.textContent = 'נפתחה עבורכם הודעת מייל מוכנה לשליחה. אם היא לא נפתחה - כתבו לנו ישירות ל-info@ahavat-hinam.org.il';
    });
  }
})();
