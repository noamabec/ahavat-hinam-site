/* ============================================================
   וידג'ט נגישות צף - עצמאי, בלי שירות חיצוני בתשלום.
   שומר העדפות ב-localStorage כך שהן נשארות בין דפים.
   ============================================================ */
(function(){
  var KEY = 'a11yPrefs';
  var root = document.documentElement;

  function loadPrefs(){
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch(e){ return {}; }
  }
  function savePrefs(p){
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch(e){}
  }

  var prefs = loadPrefs();
  var TOGGLES = ['contrast','grayscale','underline','stopAnim'];
  var CLASS_MAP = {
    contrast: 'a11y-contrast',
    grayscale: 'a11y-grayscale',
    underline: 'a11y-underline',
    stopAnim: 'a11y-stop-anim'
  };

  function applyPrefs(){
    TOGGLES.forEach(function(k){
      root.classList.toggle(CLASS_MAP[k], !!prefs[k]);
    });
    root.setAttribute('data-a11y-fs', prefs.fs || 0);
  }
  applyPrefs();

  function buildWidget(){
    var toggle = document.createElement('button');
    toggle.className = 'a11y-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'פתיחת תפריט נגישות');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'a11yPanel');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M19 7h-14M12 7v13M8 12l-3 2M16 12l3 2M9 20l3-6 3 6"/></svg>';

    var panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11yPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'תפריט נגישות');
    panel.innerHTML =
      '<button type="button" class="a11y-close" aria-label="סגירת תפריט נגישות">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<h2>נגישות</h2>' +
      '<p class="a11y-panel__sub">התאימו את התצוגה להעדפותיכם</p>' +
      '<div class="a11y-panel__grid">' +
        '<button type="button" class="a11y-btn" data-a11y-action="fs-up">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>' +
          '<span>הגדלת טקסט</span>' +
        '</button>' +
        '<button type="button" class="a11y-btn" data-a11y-action="fs-down">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 10V4h12v6M10 20h4M12 4v16"/></svg>' +
          '<span>הקטנת טקסט</span>' +
        '</button>' +
        '<button type="button" class="a11y-btn" data-a11y-action="contrast" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor"/></svg>' +
          '<span>ניגודיות גבוהה</span>' +
        '</button>' +
        '<button type="button" class="a11y-btn" data-a11y-action="grayscale" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/></svg>' +
          '<span>גווני אפור</span>' +
        '</button>' +
        '<button type="button" class="a11y-btn" data-a11y-action="underline" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4v7a6 6 0 0 0 12 0V4M4 20h16"/></svg>' +
          '<span>הדגשת קישורים</span>' +
        '</button>' +
        '<button type="button" class="a11y-btn" data-a11y-action="stopAnim" aria-pressed="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' +
          '<span>עצירת אנימציות</span>' +
        '</button>' +
      '</div>' +
      '<button type="button" class="a11y-reset">איפוס להגדרות ברירת מחדל</button>';

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    function syncButtons(){
      TOGGLES.forEach(function(k){
        var btn = panel.querySelector('[data-a11y-action="' + k + '"]');
        if(btn) btn.setAttribute('aria-pressed', String(!!prefs[k]));
      });
    }
    syncButtons();

    function openPanel(){
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      var close = panel.querySelector('.a11y-close');
      if(close) close.focus();
    }
    function closePanel(){
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }

    toggle.addEventListener('click', function(){
      if(panel.classList.contains('is-open')) closePanel(); else openPanel();
    });
    panel.querySelector('.a11y-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });
    document.addEventListener('click', function(e){
      if(!panel.classList.contains('is-open')) return;
      if(panel.contains(e.target) || toggle.contains(e.target)) return;
      closePanel();
    });

    panel.addEventListener('click', function(e){
      var btn = e.target.closest('[data-a11y-action]');
      if(!btn) return;
      var action = btn.getAttribute('data-a11y-action');

      if(action === 'fs-up'){
        prefs.fs = Math.min(3, (prefs.fs || 0) + 1);
      } else if(action === 'fs-down'){
        prefs.fs = Math.max(0, (prefs.fs || 0) - 1);
      } else if(TOGGLES.indexOf(action) > -1){
        prefs[action] = !prefs[action];
      }
      savePrefs(prefs);
      applyPrefs();
      syncButtons();
    });

    panel.querySelector('.a11y-reset').addEventListener('click', function(){
      prefs = {};
      savePrefs(prefs);
      applyPrefs();
      syncButtons();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
