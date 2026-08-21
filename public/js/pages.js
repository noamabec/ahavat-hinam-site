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

  /* ---------- טופס תרומה: בונה את הקישור לעמוד הסליקה ----------
     כשיהיה עמוד סליקה אמיתי, מחליפים כאן את DONATE_ENDPOINT בכתובת שלו
     והפרמטרים amount/freq יעברו אליו כמו שהם. */
  var DONATE_ENDPOINT = '';   /* לדוגמה: 'https://pay.example.co.il/ahavat-hinam' */
  var donateForm = document.getElementById('donateForm');
  if (donateForm) {
    var submit = document.getElementById('donateSubmit');
    var custom = document.getElementById('customAmount');
    var note = document.getElementById('donateNote');

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

    submit.addEventListener('click', function (e) {
      var amount = currentAmount();
      var freq = (donateForm.querySelector('input[name="freq"]:checked') || {}).value || '';
      if (!amount) {
        e.preventDefault();
        note.textContent = 'בחרו סכום או הקלידו סכום אחר, ואז המשיכו לתרומה.';
        custom.focus();
        return;
      }
      if (!DONATE_ENDPOINT) {
        e.preventDefault();
        note.textContent = 'תודה! עמוד הסליקה המאובטח עדיין בהקמה. בינתיים אפשר לתרום ' +
          amount + ' ₪ (' + freq + ') דרך יצירת קשר - ונחזור אליכם מיד.';
        return;
      }
      submit.href = DONATE_ENDPOINT +
        '?amount=' + encodeURIComponent(amount) +
        '&freq=' + encodeURIComponent(freq);
    });
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
