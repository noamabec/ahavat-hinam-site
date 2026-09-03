/* ============================================================================
   DomeGallery - vanilla port (no React / @use-gesture). Same math and DOM
   choreography as the React version in src/components/DomeGallery.tsx; drag
   + inertia are hand-rolled with Pointer Events since there's no gesture lib
   in the static preview.
   ========================================================================== */
(function(){
  var host = document.getElementById('domeGallery');
  if(!host) return;

  /* רשימת התמונות נטענת מ-Supabase (אותה טבלה שפאנל הניהול קורא/כותב
     אליה - ראו gallery_images ב-admin.html) כדי שהוספה/הסרה מהפאנל
     תשתקף כאן בלי לגעת בקוד. אם הטעינה נכשלת (רשת/שירות), נופלים
     בחזרה לרשימה הקבועה של 69 התמונות המקוריות כדי שהגלריה תמיד תעבוד. */
  var SB_URL = 'https://zaphyupuufzpfnbgftes.supabase.co';
  var SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcGh5dXB1dWZ6cGZuYmdmdGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzU4NTIsImV4cCI6MjEwMzE1MTg1Mn0.2GZHAH_ZwMppKc-tWbfsHgCHKs9u3zdLKqjC0stHx54';
  var GALLERY_COUNT = 69;

  function localFallbackImages(){
    var arr = [];
    for (var i = 1; i <= GALLERY_COUNT; i++){
      arr.push({
        src: './public/images/gallery-full/d' + String(i).padStart(2, '0') + '.jpg',
        alt: 'תמונה מהפעילות של אהבת חינ"מ'
      });
    }
    return arr;
  }

  fetch(SB_URL + '/rest/v1/gallery_images?select=path,alt&order=sort_order.asc,created_at.asc', {
    headers: { apikey: SB_ANON, Authorization: 'Bearer ' + SB_ANON }
  })
    .then(function(r){ if (!r.ok) throw new Error('bad status ' + r.status); return r.json(); })
    .then(function(rows){
      if (!rows || !rows.length) return localFallbackImages();
      return rows.map(function(row){
        return {
          src: SB_URL + '/storage/v1/object/public/gallery-images/' + row.path,
          alt: row.alt || 'תמונה מהפעילות של אהבת חינ"מ'
        };
      });
    })
    .catch(function(){ return localFallbackImages(); })
    .then(function(images){ start(images); });

  function start(images){
  var opts = {
    fit: 0.65, fitBasis: 'auto', minRadius: 600, maxRadius: Infinity, padFactor: 0.25,
    overlayBlurColor: '#EAF7FE', maxVerticalRotationDeg: 40, dragSensitivity: 20,
    enlargeTransitionMs: 300, segments: 19, dragDampening: 2,
    openedImageWidth: 'min(80vw, 500px)', openedImageHeight: 'min(80vh, 620px)',
    imageBorderRadius: '30px', openedImageBorderRadius: '30px', grayscale: false
  };

  var clamp = function(v, min, max){ return Math.min(Math.max(v, min), max); };
  var normalizeAngle = function(d){ return ((d % 360) + 360) % 360; };
  var wrapAngleSigned = function(deg){ var a = (((deg + 180) % 360) + 360) % 360; return a - 180; };
  var getDataNumber = function(el, name, fallback){
    var attr = el.dataset[name];
    var n = attr == null ? NaN : parseFloat(attr);
    return isFinite(n) ? n : fallback;
  };

  function buildItems(pool, seg){
    var ROWS_PER_COL = 5;
    var xCols = []; for (var i=0;i<seg;i++) xCols.push(-37 + i*2);
    var evenYs = [-4,-2,0,2,4], oddYs = [-3,-1,1,3,5];
    var coords = [];
    xCols.forEach(function(x, c){
      var ys = c % 2 === 0 ? evenYs : oddYs;
      ys.forEach(function(y){ coords.push({ x:x, y:y, sizeX:2, sizeY:2 }); });
    });
    var totalSlots = coords.length;
    if (pool.length === 0) return coords.map(function(c){ return Object.assign({}, c, { src:'', alt:'' }); });

    /* מונע מאותה תמונה לצוץ בשכן קרוב (מעל/משמאל/באלכסון), לא רק
       ברצף הליניארי - כי 69 תמונות לא מתחלקות שווה ב-95 משבצות, וברוב
       הליניארי בלבד תמונות זהות נחתו זו ליד זו על הכיפה. */
    var n = pool.length;
    var neighborOffsets = [-1, -ROWS_PER_COL, -ROWS_PER_COL - 1, -ROWS_PER_COL + 1];
    var used = new Array(totalSlots);
    var ptr = 0;
    for (var idx2 = 0; idx2 < totalSlots; idx2++){
      var pick = ptr % n, tries = 0;
      while (tries < n){
        var candidateSrc = pool[pick].src;
        var conflict = false;
        for (var oi = 0; oi < neighborOffsets.length; oi++){
          var j = idx2 + neighborOffsets[oi];
          if (j >= 0 && j < idx2 && used[j] && used[j].src === candidateSrc){ conflict = true; break; }
        }
        if (!conflict) break;
        pick = (pick + 1) % n; tries++;
      }
      used[idx2] = pool[pick];
      ptr = pick + 1;
    }
    /* תפר העיגול: העמודה האחרונה גובלת שוב בעמודה הראשונה (הכיפה סגורה) */
    for (var r = 0; r < ROWS_PER_COL; r++){
      var iLast = (seg - 1) * ROWS_PER_COL + r, iFirst = r;
      if (used[iLast].src === used[iFirst].src){
        for (var k = (seg - 1) * ROWS_PER_COL; k < totalSlots; k++){
          if (k !== iLast && used[k].src !== used[iFirst].src){
            var tmp2 = used[iLast]; used[iLast] = used[k]; used[k] = tmp2; break;
          }
        }
      }
    }
    return coords.map(function(c, idx){ return Object.assign({}, c, { src: used[idx].src, alt: used[idx].alt }); });
  }

  function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments){
    var unit = 360 / segments / 2;
    return { rotateX: unit * (offsetY - (sizeY - 1) / 2), rotateY: unit * (offsetX + (sizeX - 1) / 2) };
  }

  var items = buildItems(images, opts.segments);

  /* ---------- DOM ---------- */
  host.style.setProperty('--segments-x', opts.segments);
  host.style.setProperty('--segments-y', opts.segments);
  host.style.setProperty('--overlay-blur-color', opts.overlayBlurColor);
  host.style.setProperty('--tile-radius', opts.imageBorderRadius);
  host.style.setProperty('--enlarge-radius', opts.openedImageBorderRadius);
  host.style.setProperty('--image-filter', opts.grayscale ? 'grayscale(1)' : 'none');

  var main = document.createElement('main'); main.className = 'sphere-main';
  var stage = document.createElement('div'); stage.className = 'stage';
  var sphere = document.createElement('div'); sphere.className = 'sphere';
  stage.appendChild(sphere); main.appendChild(stage);

  items.forEach(function(it, i){
    var item = document.createElement('div');
    item.className = 'item';
    item.dataset.src = it.src;
    item.dataset.offsetX = it.x; item.dataset.offsetY = it.y;
    item.dataset.sizeX = it.sizeX; item.dataset.sizeY = it.sizeY;
    item.style.setProperty('--offset-x', it.x);
    item.style.setProperty('--offset-y', it.y);
    item.style.setProperty('--item-size-x', it.sizeX);
    item.style.setProperty('--item-size-y', it.sizeY);

    var img = document.createElement('div');
    img.className = 'item__image';
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', it.alt || 'פתיחת תמונה');

    var im = document.createElement('img');
    im.src = it.src; im.alt = it.alt; im.draggable = false;
    img.appendChild(im);
    item.appendChild(img);
    sphere.appendChild(item);
  });

  ['overlay', 'overlay overlay--blur'].forEach(function(cls){
    var d = document.createElement('div'); d.className = cls; main.appendChild(d);
  });
  ['edge-fade edge-fade--top', 'edge-fade edge-fade--bottom'].forEach(function(cls){
    var d = document.createElement('div'); d.className = cls; main.appendChild(d);
  });

  var viewer = document.createElement('div'); viewer.className = 'viewer';
  var scrim = document.createElement('div'); scrim.className = 'scrim';
  var frameEl = document.createElement('div'); frameEl.className = 'dg-frame';
  viewer.appendChild(scrim); viewer.appendChild(frameEl);
  main.appendChild(viewer);

  host.appendChild(main);

  /* ---------- state ---------- */
  var rotation = { x: 0, y: 0 };
  var startRot = { x: 0, y: 0 };
  var startPos = null;
  var dragging = false, moved = false;
  var inertiaRAF = null;
  var opening = false, openStartedAt = 0, lastDragEndAt = 0;
  var scrollLocked = false;
  var focusedEl = null, originalTilePos = null;
  var lockedRadius = null;

  function lockScroll(){ if(scrollLocked) return; scrollLocked = true; document.body.classList.add('dg-scroll-lock'); }
  function unlockScroll(){
    if(!scrollLocked) return;
    if(host.getAttribute('data-enlarging') === 'true') return;
    scrollLocked = false; document.body.classList.remove('dg-scroll-lock');
  }

  function applyTransform(xDeg, yDeg){
    sphere.style.transform = 'translateZ(calc(var(--radius) * -1)) rotateX(' + xDeg + 'deg) rotateY(' + yDeg + 'deg)';
  }
  applyTransform(0, 0);

  /* ---------- resize / radius ---------- */
  function onResize(){
    var w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
    var minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
    var basis;
    switch(opts.fitBasis){
      case 'min': basis = minDim; break;
      case 'max': basis = maxDim; break;
      case 'width': basis = w; break;
      case 'height': basis = h; break;
      default: basis = aspect >= 1.3 ? w : minDim;
    }
    var radius = basis * opts.fit;
    radius = Math.min(radius, h * 1.35);
    radius = clamp(radius, opts.minRadius, opts.maxRadius);
    lockedRadius = Math.round(radius);
    var viewerPad = Math.max(8, Math.round(minDim * opts.padFactor));
    host.style.setProperty('--radius', lockedRadius + 'px');
    host.style.setProperty('--viewer-pad', viewerPad + 'px');
    applyTransform(rotation.x, rotation.y);

    var enlargedOverlay = viewer.querySelector('.enlarge');
    if (enlargedOverlay){
      var frameR = frameEl.getBoundingClientRect();
      var mainR = main.getBoundingClientRect();
      var tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:absolute;width:' + opts.openedImageWidth + ';height:' + opts.openedImageHeight + ';visibility:hidden;';
      document.body.appendChild(tempDiv);
      var tempRect = tempDiv.getBoundingClientRect();
      document.body.removeChild(tempDiv);
      enlargedOverlay.style.left = (frameR.left - mainR.left + (frameR.width - tempRect.width) / 2) + 'px';
      enlargedOverlay.style.top = (frameR.top - mainR.top + (frameR.height - tempRect.height) / 2) + 'px';
    }
  }
  if ('ResizeObserver' in window){ new ResizeObserver(onResize).observe(host); }
  else { window.addEventListener('resize', onResize); }
  onResize();

  /* ---------- inertia ---------- */
  function stopInertia(){ if(inertiaRAF){ cancelAnimationFrame(inertiaRAF); inertiaRAF = null; } }
  function startInertia(vx, vy){
    var MAX_V = 1.4;
    var vX = clamp(vx, -MAX_V, MAX_V) * 80;
    var vY = clamp(vy, -MAX_V, MAX_V) * 80;
    var frames = 0;
    var d = clamp(opts.dragDampening, 0, 1);
    var frictionMul = 0.94 + 0.055 * d;
    var stopThreshold = 0.015 - 0.01 * d;
    var maxFrames = Math.round(90 + 270 * d);
    function step(){
      vX *= frictionMul; vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold){ inertiaRAF = null; return; }
      if (++frames > maxFrames){ inertiaRAF = null; return; }
      var nextX = clamp(rotation.x - vY / 200, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
      var nextY = wrapAngleSigned(rotation.y + vX / 200);
      rotation = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaRAF = requestAnimationFrame(step);
    }
    stopInertia();
    inertiaRAF = requestAnimationFrame(step);
  }

  /* ---------- drag (pointer events; velocity sampled by hand) ---------- */
  var lastSample = null; /* { t, x, y } for velocity estimate */
  main.addEventListener('pointerdown', function(e){
    if (focusedEl) return;
    stopInertia();
    dragging = true; moved = false;
    startRot = { x: rotation.x, y: rotation.y };
    startPos = { x: e.clientX, y: e.clientY };
    lastSample = { t: performance.now(), x: e.clientX, y: e.clientY };
    /* בלי setPointerCapture בכוונה: הוא מעביר את ה-target של אירוע ה-click
       הבא ל-main עצמו (האלמנט שתפס), כך ש-closest('.item__image') על
       ה-target כבר לא מוצא את האריח - main הוא אב שלו, לא צאצא. זה בדיוק
       מה שהפך את הלחיצה ללא-מגיבה. */
  }, { passive: true });

  main.addEventListener('pointermove', function(e){
    if (focusedEl || !dragging || !startPos) return;
    var dxTotal = e.clientX - startPos.x, dyTotal = e.clientY - startPos.y;
    /* סף של 10px, לא 4px: קליק אמיתי כמעט תמיד נודד כמה פיקסלים
       בין mousedown ל-mouseup, וסף צר מדי מסווג כל קליק כגרירה
       ומבטל את פתיחת התמונה. */
    if (!moved && (dxTotal*dxTotal + dyTotal*dyTotal) > 100) moved = true;
    var nextX = clamp(startRot.x - dyTotal / opts.dragSensitivity, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
    var nextY = wrapAngleSigned(startRot.y + dxTotal / opts.dragSensitivity);
    if (rotation.x !== nextX || rotation.y !== nextY){
      rotation = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
    }
    lastSample = { t: performance.now(), x: e.clientX, y: e.clientY };
  }, { passive: true });

  function endDrag(e){
    if (!dragging) return;
    dragging = false;
    var now = performance.now();
    var vx = 0, vy = 0;
    if (lastSample && e){
      var dt = Math.max(1, now - lastSample.t);
      /* px/ms → normalized velocity, matching @use-gesture's velocity*direction convention */
      vx = clamp(((e.clientX - lastSample.x) / dt) / opts.dragSensitivity * 20, -1.2, 1.2);
      vy = clamp(((e.clientY - lastSample.y) / dt) / opts.dragSensitivity * 20, -1.2, 1.2);
    }
    if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
    if (moved) lastDragEndAt = now;
    moved = false;
  }
  /* window, not main: אם המשתמש משחרר את העכבר מחוץ לתחום הגלריה
     תוך כדי גרירה, pointerup לא היה נורה על main בכלל, dragging
     נשאר תקוע true לצמיתות וכל קליק הבא נחסם כאילו הוא גרירה. */
  window.addEventListener('pointerup', endDrag, { passive: true });
  window.addEventListener('pointercancel', endDrag, { passive: true });

  main.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight'){ e.preventDefault(); startInertia(0.35, 0); }
    else if (e.key === 'ArrowLeft'){ e.preventDefault(); startInertia(-0.35, 0); }
    else if (e.key === 'Home'){ e.preventDefault(); rotation = { x: rotation.x, y: 0 }; applyTransform(rotation.x, rotation.y); }
  });

  /* ---------- open / close ---------- */
  function closeEnlarged(){
    if (performance.now() - openStartedAt < 250) return;
    var el = focusedEl;
    if (!el) return;
    var parent = el.parentElement;
    var overlay = viewer.querySelector('.enlarge');
    if (!overlay) return;
    var refDiv = parent.querySelector('.item__image--reference');
    var originalPos = originalTilePos;
    if (!originalPos){
      overlay.remove(); if (refDiv) refDiv.remove();
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      el.style.visibility = ''; el.style.zIndex = 0;
      focusedEl = null; host.removeAttribute('data-enlarging'); opening = false;
      unlockScroll(); return;
    }
    var currentRect = overlay.getBoundingClientRect();
    var rootRect = host.getBoundingClientRect();
    var fromRoot = {
      left: originalPos.left - rootRect.left, top: originalPos.top - rootRect.top,
      width: originalPos.width, height: originalPos.height
    };
    var overlayFromRoot = {
      left: currentRect.left - rootRect.left, top: currentRect.top - rootRect.top,
      width: currentRect.width, height: currentRect.height
    };
    var animatingOverlay = document.createElement('div');
    animatingOverlay.className = 'enlarge-closing';
    animatingOverlay.style.cssText = 'position:absolute;left:' + overlayFromRoot.left + 'px;top:' + overlayFromRoot.top + 'px;width:' + overlayFromRoot.width + 'px;height:' + overlayFromRoot.height + 'px;z-index:9999;border-radius:var(--enlarge-radius,32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ' + opts.enlargeTransitionMs + 'ms ease-out;pointer-events:none;margin:0;transform:none;';
    var originalImg = overlay.querySelector('img');
    if (originalImg){
      var imgClone = originalImg.cloneNode();
      imgClone.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      animatingOverlay.appendChild(imgClone);
    }
    overlay.remove();
    host.appendChild(animatingOverlay);
    void animatingOverlay.getBoundingClientRect();
    requestAnimationFrame(function(){
      animatingOverlay.style.left = fromRoot.left + 'px';
      animatingOverlay.style.top = fromRoot.top + 'px';
      animatingOverlay.style.width = fromRoot.width + 'px';
      animatingOverlay.style.height = fromRoot.height + 'px';
      animatingOverlay.style.opacity = '0';
    });
    function cleanup(){
      animatingOverlay.remove();
      originalTilePos = null;
      if (refDiv) refDiv.remove();
      parent.style.transition = 'none'; el.style.transition = 'none';
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      requestAnimationFrame(function(){
        el.style.visibility = ''; el.style.opacity = '0'; el.style.zIndex = 0;
        focusedEl = null; host.removeAttribute('data-enlarging');
        requestAnimationFrame(function(){
          parent.style.transition = ''; el.style.transition = 'opacity 300ms ease-out';
          requestAnimationFrame(function(){
            el.style.opacity = '1';
            setTimeout(function(){
              el.style.transition = ''; el.style.opacity = ''; opening = false;
              if (!dragging && host.getAttribute('data-enlarging') !== 'true') document.body.classList.remove('dg-scroll-lock');
            }, 300);
          });
        });
      });
    }
    animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
  }
  scrim.addEventListener('click', closeEnlarged);
  window.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeEnlarged(); });

  function openItemFromElement(el){
    if (opening) return;
    opening = true; openStartedAt = performance.now();
    lockScroll();
    var parent = el.parentElement;
    focusedEl = el; el.setAttribute('data-focused', 'true');
    var offsetX = getDataNumber(parent, 'offsetX', 0), offsetY = getDataNumber(parent, 'offsetY', 0);
    var sizeX = getDataNumber(parent, 'sizeX', 2), sizeY = getDataNumber(parent, 'sizeY', 2);
    var parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, opts.segments);
    var parentY = normalizeAngle(parentRot.rotateY), globalY = normalizeAngle(rotation.y);
    var rotY = -(parentY + globalY) % 360; if (rotY < -180) rotY += 360;
    var rotX = -parentRot.rotateX - rotation.x;
    parent.style.setProperty('--rot-y-delta', rotY + 'deg');
    parent.style.setProperty('--rot-x-delta', rotX + 'deg');

    var refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference';
    refDiv.style.opacity = '0';
    refDiv.style.transform = 'rotateX(' + (-parentRot.rotateX) + 'deg) rotateY(' + (-parentRot.rotateY) + 'deg)';
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;

    var tileR = refDiv.getBoundingClientRect();
    var mainR = main.getBoundingClientRect();
    var frameR = frameEl.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0){
      opening = false; focusedEl = null; parent.removeChild(refDiv); unlockScroll(); return;
    }

    originalTilePos = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
    el.style.visibility = 'hidden'; el.style.zIndex = 0;

    var overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.position = 'absolute';
    overlay.style.left = (frameR.left - mainR.left) + 'px';
    overlay.style.top = (frameR.top - mainR.top) + 'px';
    overlay.style.width = frameR.width + 'px';
    overlay.style.height = frameR.height + 'px';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '30';
    overlay.style.willChange = 'transform, opacity';
    overlay.style.transformOrigin = 'top left';
    overlay.style.transition = 'transform ' + opts.enlargeTransitionMs + 'ms ease, opacity ' + opts.enlargeTransitionMs + 'ms ease';
    var rawSrc = parent.dataset.src || (el.querySelector('img') && el.querySelector('img').src) || '';
    var imgEl = document.createElement('img');
    imgEl.src = rawSrc;
    overlay.appendChild(imgEl);
    viewer.appendChild(overlay);

    var tx0 = tileR.left - frameR.left, ty0 = tileR.top - frameR.top;
    var sx0 = tileR.width / frameR.width, sy0 = tileR.height / frameR.height;
    var validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    var validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
    overlay.style.transform = 'translate(' + tx0 + 'px, ' + ty0 + 'px) scale(' + validSx0 + ', ' + validSy0 + ')';

    setTimeout(function(){
      if (!overlay.parentElement) return;
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
      host.setAttribute('data-enlarging', 'true');
    }, 16);

    var onFirstEnd = function(ev){
      if (ev.propertyName !== 'transform') return;
      overlay.removeEventListener('transitionend', onFirstEnd);
      var prevTransition = overlay.style.transition;
      overlay.style.transition = 'none';
      overlay.style.width = opts.openedImageWidth; overlay.style.height = opts.openedImageHeight;
      var newRect = overlay.getBoundingClientRect();
      overlay.style.width = frameR.width + 'px'; overlay.style.height = frameR.height + 'px';
      void overlay.offsetWidth;
      overlay.style.transition = 'left ' + opts.enlargeTransitionMs + 'ms ease, top ' + opts.enlargeTransitionMs + 'ms ease, width ' + opts.enlargeTransitionMs + 'ms ease, height ' + opts.enlargeTransitionMs + 'ms ease';
      var centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
      var centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
      requestAnimationFrame(function(){
        overlay.style.left = centeredLeft + 'px'; overlay.style.top = centeredTop + 'px';
        overlay.style.width = opts.openedImageWidth; overlay.style.height = opts.openedImageHeight;
      });
      var cleanupSecond = function(){ overlay.removeEventListener('transitionend', cleanupSecond); overlay.style.transition = prevTransition; };
      overlay.addEventListener('transitionend', cleanupSecond, { once: true });
    };
    overlay.addEventListener('transitionend', onFirstEnd);
  }

  sphere.addEventListener('click', function(e){
    if (dragging || moved) return;
    if (performance.now() - lastDragEndAt < 80) return;
    if (opening) return;
    var tile = e.target.closest('.item__image');
    if (tile) openItemFromElement(tile);
  });

  window.addEventListener('beforeunload', function(){ document.body.classList.remove('dg-scroll-lock'); });
  } /* end start() */
})();
