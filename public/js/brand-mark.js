/* ============================================================
   אהבת חינ"מ - אנימציית כניסה חד-פעמית ללוגו (בית הפאזל)
   ------------------------------------------------------------
   מחליף את אייקון הלוגו בהאדר (אלמנט עם class="brand-mark__icon")
   בארבעת חלקי הפאזל בנפרד, ומריץ אנימציית כניסה אחת בלבד לכל
   סשן גלישה - לא בכל טעינת עמוד, ולא בלולאה. אחרי ההרצה הראשונה
   (או אם prefers-reduced-motion) האייקון פשוט מוצג במקומו הסופי.
   מבוסס על מיקומי החלקים המדויקים מקובץ העיצוב המקורי.
   ============================================================ */
(function () {
  'use strict';

  var host = document.querySelector('.brand-mark__icon');
  if (!host) return;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PLAYED_KEY = 'ahavatLogoPlayed';

  /* מיקומי החלקים (אחוזים מתוך קופסת האייקון, יחס גובה-רוחב 1493:1600) -
     זהים לקובץ העיצוב המקורי, כך שבמצב המנוחה הרכבת ארבעת החלקים
     משחזרת בדיוק את אותה תמונת בית-הפאזל שהאייקון השטוח מציג. */
  var PIECES = [
    { c: 'green',  src: 'green.png',  left: 16.01, top: 48.94, width: 39.58, origin: '60% 20%', delay: 0,   dur: .6,
      from: 'translate3d(-46%,30%,0) rotate(-16deg)' },
    { c: 'orange', src: 'orange.png', left: 10.32, top: 10.56, width: 41.06, origin: '70% 90%', delay: .12, dur: .6,
      from: 'translate3d(-12%,-58%,0) rotate(13deg)' },
    { c: 'blue',   src: 'blue.png',   left: 42.53, top: 11.19, width: 44.94, origin: '12% 84%', delay: .24, dur: .6,
      from: 'translate3d(46%,-32%,0) rotate(-14deg)' },
    { c: 'yellow', src: 'yellow.png', left: 52.11, top: 54.88, width: 41.79, origin: '14% 22%', delay: .36, dur: .68,
      from: 'translate3d(64%,40%,0) rotate(22deg)' }
  ];

  if (reduce || sessionStorage.getItem(PLAYED_KEY) === '1') {
    return; /* האייקון השטוח הרגיל כבר מציג את המצב הסופי - אין מה להוסיף */
  }

  var box = host.getBoundingClientRect();
  if (!box.width) return;

  var wrap = document.createElement('span');
  wrap.className = 'brand-mark__stage';
  wrap.setAttribute('aria-hidden', 'true');

  PIECES.forEach(function (p) {
    var img = document.createElement('img');
    img.src = './public/images/logo-pieces/' + p.src;
    img.alt = '';
    img.className = 'brand-mark__piece';
    img.style.left = p.left + '%';
    img.style.top = p.top + '%';
    img.style.width = p.width + '%';
    img.style.transformOrigin = p.origin;
    img.style.setProperty('--bm-from', p.from);
    img.style.animation =
      'bmFly ' + p.dur + 's cubic-bezier(.18,.86,.24,1) ' + p.delay + 's both, ' +
      'bmSettle .5s cubic-bezier(.3,1.4,.4,1) ' + (p.delay + p.dur + .05) + 's both';
    wrap.appendChild(img);
  });

  host.replaceWith(wrap);
  sessionStorage.setItem(PLAYED_KEY, '1');
})();
