/* ============================================================
   הלוגיקה הייחודית לעמוד הבית - חולצה מ-<script> פנימי ב-index.html.
   נשמרה כ-JS ואנילה במכוון: כאן יושבים ה-WebGL של רצועת הגלריה
   ואפקט חשיפת הווידאו בגלילה, שנבנו ואומתו מול האתר החי. שכתוב
   שלהם ל-React היה מסכן את הנאמנות בלי להוסיף ערך.
   ============================================================ */
(function(){
  window.GALLERY_IMAGES = [
    '/images/gallery/g01.jpg','/images/gallery/g02.jpg',
    '/images/gallery/g03.jpg','/images/gallery/g04.jpg',
    '/images/gallery/g05.jpg','/images/gallery/g06.jpg',
    '/images/gallery/g07.jpg','/images/gallery/g08.jpg',
    '/images/gallery/g09.jpg','/images/gallery/g10.jpg',
    '/images/gallery/g11.jpg','/images/gallery/g12.jpg',
    '/images/gallery/g13.jpg','/images/gallery/g14.jpg',
    '/images/gallery/g15.jpg','/images/gallery/g16.jpg'
  ];
  window.GALLERY_FALLBACK = function(){
    var el = document.getElementById('galleryStrip');
    if(!el || el.dataset.done) return;
    el.dataset.done = '1';
    el.classList.add('gallery__strip--fallback');
    window.GALLERY_IMAGES.forEach(function(src){
      var img = new Image();
      img.src = src; img.alt = 'תמונה מהפעילות של אהבת חינ"מ'; img.loading = 'lazy';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(){ window.GALLERY_LIGHTBOX_OPEN(src); });
      el.appendChild(img);
    });
  };

  /* ---------- לייטבוקס משותף: תמונה מוגדלת מעל הכל ----------
     משמש גם את ה-WebGL gallery וגם את הרצועה הסטטית, כדי שהתנהגות
     ההגדלה תהיה זהה בין שתי הגרסאות. */
  window.GALLERY_LIGHTBOX_OPEN = function(src){
    var overlay = document.createElement('div');
    overlay.className = 'gallery-lightbox';
    overlay.innerHTML =
      '<button class="gallery-lightbox__close" type="button" aria-label="סגירה">&times;</button>' +
      '<img src="' + src + '" alt="תמונה מהפעילות של אהבת חינ&quot;מ" />';
    document.body.appendChild(overlay);
    document.body.classList.add('gallery-lightbox-lock');
    requestAnimationFrame(function(){ overlay.classList.add('is-open'); });

    function close(){
      overlay.classList.remove('is-open');
      document.body.classList.remove('gallery-lightbox-lock');
      document.removeEventListener('keydown', onKey);
      setTimeout(function(){ overlay.remove(); }, 250);
    }
    function onKey(e){ if(e.key === 'Escape') close(); }
    overlay.addEventListener('click', function(e){
      if(e.target === overlay || e.target.closest('.gallery-lightbox__close')) close();
    });
    document.addEventListener('keydown', onKey);
  };

  /* שומר-סף: הפולבק חייב לחיות בסקריפט קלאסי ולא בתוך סקריפט הגלריה.
     אם סקריפט הגלריה לא רץ בכלל - נחסם או נכשל בפרסור - שום קוד שבתוכו
     לא ירוץ, כולל הפולבק, והסקשן היה נשאר ריק.

     חשוב: בודקים אם הסקריפט *התחיל* (__galleryBooted), ולא אם הוא כבר
     *סיים* (dataset.done). קודם נבדק dataset.done, שנקבע רק בתום האתחול
     המלא - אחרי טעינת ספרייה של 133KB ו-16 תמונות כטקסטורות. בחיבור
     איטי, במכשיר חלש או בכניסה ראשונה בלי מטמון זה עובר 2 שניות, ואז
     שומר-הסף ניצח טעינה תקינה לגמרי והכריח פולבק סטטי לצמיתות.
     זו היתה הסיבה שאצל חלק מהמשתמשים האנימציה "לא עבדה". */
  setTimeout(function(){
    var el = document.getElementById('galleryStrip');
    if(el && !el.dataset.done && !window.__galleryBooted){
      console.warn('CircularGallery: הסקריפט לא רץ כלל - עוברים לרצועה הסטטית.');
      window.GALLERY_FALLBACK();
    }
  }, 2000);

<!-- סקריפט קלאסי, לא type="module": ב-Chrome (ולא רק שם) import() דינמי של
     מודול ES דורש fetch() פנימי, וב-file:// זה נכשל תמיד - לא באופן אקראי,
     אלא כי Chrome חוסם fetch() לכתובות file:// לגמרי (מדיניות אבטחה, לא
     קשור לרשת/CDN). בדפדפן שבו נבדק זה קודם זה עבד כי הוא לא אכף את זה,
     מה שהסווה את הבעיה. הפתרון: ogl.global.js הוא אותו קובץ בדיוק, רק בלי
     import/export - סקריפט קלאסי לגמרי שנטען עם <script src>, בדיוק כמו כל
     סקריפט אחר בעמוד, ותולה את עצמו על window.ogl. טעינת <script src> לא
     עוברת דרך fetch() ולכן עובדת תחת file:// בכל דפדפן. -->
(async function(){
  var host = document.getElementById('galleryStrip');
  if(!host) return;

  /* מסמנים מיד שהסקריפט רץ, כדי ששומר-הסף (2 שניות) לא יכפה פולבק
     בזמן שהטעינה עדיין מתקדמת כרגיל. אם משהו בהמשך נכשל, ה-catch
     למטה עדיין קורא ל-GALLERY_FALLBACK. */
  window.__galleryBooted = true;

  /* בלי WebGL - רצועה סטטית.

     הערה חשובה: קודם גם prefers-reduced-motion הפיל לרצועה הסטטית, וזו
     היתה הסיבה שהגלריה "לא עבדה" בכמה מחשבים שונים. ההעדפה הזו דלוקה
     בלא מעט מכונות (ב-Windows: הגדרות > נגישות > אפקטים חזותיים >
     אנימציות = כבוי; לעיתים קרובות מוגדר כך ע"י IT או בחיסכון בסוללה),
     ולכן זה נראה אקראי - אבל היה דטרמיניסטי לגמרי לכל מחשב.

     הגלריה הזו לא זזה מעצמה בכלל: scroll.target משתנה רק בגרירה,
     בגלגלת או במקלדת של המשתמש. prefers-reduced-motion נועד לאנימציה
     אוטומטית שהמשתמש לא יזם, ולא לתגובה ישירה לפעולה שלו - ולכן אין
     סיבה לבטל את הרכיב. במקום זה, כשההעדפה דלוקה מאפסים את ההשהיה
     (scrollEase=1 למטה) כך שהתמונות עוקבות אחרי האצבע מיידית, בלי
     תנופה והחלקה. */
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var probe  = document.createElement('canvas');
  var hasGL  = !!(probe.getContext('webgl') || probe.getContext('experimental-webgl'));
  if(!hasGL){ window.GALLERY_FALLBACK(); return; }

  /* מגבלת זמן נדיבה (15 שניות) על טעינת הספרייה: מספיקה בשפע גם
     לחיבור סלולרי איטי, אבל מונעת מצב שבו הבקשה נתקעת בלי onload
     ובלי onerror והסקשן נשאר תקוע לנצח. */
  function loadClassicScript(src){
    return new Promise(function(resolve, reject){
      var done = false;
      var s = document.createElement('script');
      var timer = setTimeout(function(){
        if(done) return;
        done = true;
        reject(new Error('timeout loading ' + src));
      }, 15000);
      s.src = src;
      s.onload = function(){ if(done) return; done = true; clearTimeout(timer); resolve(); };
      s.onerror = function(){ if(done) return; done = true; clearTimeout(timer); reject(new Error('failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  var ogl;
  try{
    if(!window.ogl) await loadClassicScript('/vendor/ogl.global.js');
    ogl = window.ogl;
    if(!ogl) throw new Error('window.ogl not defined after load');
  }catch(e){
    console.warn('CircularGallery: ogl לא נטען, נופלים לרצועה סטטית', e);
    window.GALLERY_FALLBACK();
    return;
  }
  var Camera = ogl.Camera, Mesh = ogl.Mesh, Plane = ogl.Plane,
      Program = ogl.Program, Renderer = ogl.Renderer, Texture = ogl.Texture,
      Transform = ogl.Transform;

  function debounce(fn, wait){
    var t; return function(){ var a = arguments, c = this;
      clearTimeout(t); t = setTimeout(function(){ fn.apply(c, a); }, wait); };
  }
  function lerp(p1, p2, t){ return p1 + (p2 - p1) * t; }

  /* ---------- כרטיס בודד ---------- */
  function Media(o){
    this.extra = 0;
    this.geometry = o.geometry; this.gl = o.gl; this.image = o.image;
    this.index = o.index; this.length = o.length;
    this.scene = o.scene; this.screen = o.screen; this.viewport = o.viewport;
    this.bend = o.bend; this.borderRadius = o.borderRadius;
    this.createShader(); this.createMesh(); this.onResize();
  }
  Media.prototype.createShader = function(){
    var texture = new Texture(this.gl, { generateMipmaps:true });
    this.program = new Program(this.gl, {
      depthTest:false, depthWrite:false,
      vertex:[
        'precision highp float;',
        'attribute vec3 position; attribute vec2 uv;',
        'uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;',
        'uniform float uTime; uniform float uSpeed;',
        'varying vec2 vUv;',
        'void main(){',
        '  vUv = uv;',
        '  vec3 p = position;',
        '  p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
        '}'
      ].join('\n'),
      fragment:[
        'precision highp float;',
        'uniform vec2 uImageSizes; uniform vec2 uPlaneSizes;',
        'uniform sampler2D tMap; uniform float uBorderRadius;',
        'varying vec2 vUv;',
        'float roundedBoxSDF(vec2 p, vec2 b, float r){',
        '  vec2 d = abs(p) - b;',
        '  return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;',
        '}',
        'void main(){',
        '  vec2 ratio = vec2(',
        '    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),',
        '    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)',
        '  );',
        '  vec2 uv = vec2(',
        '    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,',
        '    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5',
        '  );',
        '  vec4 color = texture2D(tMap, uv);',
        '  float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);',
        '  float edgeSmooth = 0.002;',
        '  float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);',
        '  gl_FragColor = vec4(color.rgb, alpha);',
        '}'
      ].join('\n'),
      uniforms:{
        tMap:{ value:texture },
        uPlaneSizes:{ value:[0,0] }, uImageSizes:{ value:[0,0] },
        uSpeed:{ value:0 }, uTime:{ value:100 * Math.random() },
        uBorderRadius:{ value:this.borderRadius }
      },
      transparent:true
    });
    var img = new Image(), self = this;
    /* בלי crossOrigin - התמונות מקומיות, וב-file:// הדגל הזה מכשיל את הטעינה */
    img.src = this.image;
    img.onload = function(){
      texture.image = img;
      self.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  };
  Media.prototype.createMesh = function(){
    this.plane = new Mesh(this.gl, { geometry:this.geometry, program:this.program });
    this.plane.setParent(this.scene);
  };
  Media.prototype.update = function(scroll, direction){
    this.plane.position.x = this.x - scroll.current - this.extra;
    var x = this.plane.position.x, H = this.viewport.width / 2;

    if(this.bend === 0){
      this.plane.position.y = 0; this.plane.rotation.z = 0;
    }else{
      var B = Math.abs(this.bend);
      var R = (H * H + B * B) / (2 * B);
      var ex = Math.min(Math.abs(x), H);
      var arc = R - Math.sqrt(R * R - ex * ex);
      if(this.bend > 0){
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(ex / R);
      }else{
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(ex / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    var planeOffset = this.plane.scale.x / 2;
    var viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter  = this.plane.position.x - planeOffset >  viewportOffset;
    if(direction === 'right' && this.isBefore){ this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if(direction === 'left'  && this.isAfter ){ this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  };
  Media.prototype.onResize = function(o){
    o = o || {};
    if(o.screen) this.screen = o.screen;
    if(o.viewport) this.viewport = o.viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width  * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  };

  /* ---------- האפליקציה ---------- */
  function App(container, opts){
    var self = this;
    this.container = container;
    this.scrollSpeed = opts.scrollSpeed;
    this.scroll = { ease:opts.scrollEase, current:0, target:0, last:0 };
    this.onCheckDebounce = debounce(function(){ self.onCheck(); }, 200);

    this.renderer = new Renderer({ alpha:true, antialias:true, dpr:Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();

    this.onResize();
    this.planeGeometry = new Plane(this.gl, { heightSegments:50, widthSegments:100 });
    this.createMedias(opts.items, opts.bend, opts.borderRadius);
    this.update();
    this.addEventListeners();
  }
  App.prototype.createMedias = function(items, bend, borderRadius){
    var self = this;
    /* מכפילים את הרשימה כדי שהלולאה תהיה רציפה בלי חורים */
    this.mediasImages = items.concat(items);
    this.medias = this.mediasImages.map(function(src, index){
      return new Media({
        geometry:self.planeGeometry, gl:self.gl, image:src, index:index,
        length:self.mediasImages.length, scene:self.scene,
        screen:self.screen, viewport:self.viewport,
        bend:bend, borderRadius:borderRadius
      });
    });
  };
  App.prototype.onTouchDown = function(e){
    this.isDown = true;
    this.moved = false;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
    this.startY = e.touches ? e.touches[0].clientY : e.clientY;
  };
  App.prototype.onTouchMove = function(e){
    if(!this.isDown) return;
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    var y = e.touches ? e.touches[0].clientY : e.clientY;
    /* סף של 10px לפני שמסווגים כגרירה - קליק אמיתי כמעט תמיד נודד
       כמה פיקסלים בין mousedown ל-mouseup */
    if(!this.moved){
      var dx = x - this.start, dy = y - this.startY;
      if(dx*dx + dy*dy > 100) this.moved = true;
    }
    /* RTL: גרירה ימינה מקדמת את הגלריה ימינה */
    this.scroll.target = this.scroll.position + (this.start - x) * (this.scrollSpeed * 0.025);
  };
  App.prototype.onTouchUp = function(){ this.isDown = false; this.onCheck(); };
  App.prototype.onClick = function(e){
    if(this.moved) return;
    var media = this.hitTest(e.clientX, e.clientY);
    if(media) window.GALLERY_LIGHTBOX_OPEN(media.image);
  };
  App.prototype.hitTest = function(clientX, clientY){
    var rect = this.gl.canvas.getBoundingClientRect();
    var px = clientX - rect.left, py = clientY - rect.top;
    /* המצלמה מסתכלת ישר על מישור z=0, אז המיפוי מיחידות עולם לפיקסלים
       ליניארי - אין צורך בפרויקציה מלאה כדי לדעת מה נלחץ */
    var scale = this.screen.width / this.viewport.width;
    var cx = this.screen.width / 2, cy = this.screen.height / 2;
    var best = null, bestDist = Infinity;
    for(var i = 0; i < this.medias.length; i++){
      var m = this.medias[i];
      var sx = cx + m.plane.position.x * scale;
      var sy = cy - m.plane.position.y * scale;
      var halfW = (m.plane.scale.x * scale) / 2, halfH = (m.plane.scale.y * scale) / 2;
      if(px >= sx - halfW && px <= sx + halfW && py >= sy - halfH && py <= sy + halfH){
        var dist = (px - sx) * (px - sx) + (py - sy) * (py - sy);
        if(dist < bestDist){ bestDist = dist; best = m; }
      }
    }
    return best;
  };
  App.prototype.onWheel = function(e){
    /* גלגלת אנכית מעל הגלריה מסובבת אותה - בלי preventDefault,
       כדי לא לחטוף את גלילת העמוד */
    var delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  };
  App.prototype.onKeyDown = function(e){
    if(e.key === 'ArrowRight'){ e.preventDefault(); this.scroll.target += this.scrollSpeed * 5; this.onCheckDebounce(); }
    else if(e.key === 'ArrowLeft'){ e.preventDefault(); this.scroll.target -= this.scrollSpeed * 5; this.onCheckDebounce(); }
    else if(e.key === 'Home'){ e.preventDefault(); this.scroll.target = 0; this.onCheckDebounce(); }
  };
  App.prototype.onCheck = function(){
    if(!this.medias || !this.medias[0]) return;
    var width = this.medias[0].width;
    var item = width * Math.round(Math.abs(this.scroll.target) / width);
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  };
  App.prototype.onResize = function(){
    this.screen = { width:this.container.clientWidth, height:this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect:this.screen.width / this.screen.height });
    var fov = (this.camera.fov * Math.PI) / 180;
    var height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width:height * this.camera.aspect, height:height };
    if(this.medias){
      var s = this.screen, v = this.viewport;
      this.medias.forEach(function(m){ m.onResize({ screen:s, viewport:v }); });
    }
  };
  App.prototype.update = function(){
    var self = this;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    var direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    /* מרנדרים רק כשהסקשן על המסך - לא שורפים GPU בשאר העמוד */
    if(this.visible && this.medias){
      this.medias.forEach(function(m){ m.update(self.scroll, direction); });
      this.renderer.render({ scene:this.scene, camera:this.camera });
    }
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(function(){ self.update(); });
  };
  App.prototype.addEventListeners = function(){
    var self = this;
    this.boundResize    = function(){ self.onResize(); };
    this.boundWheel     = function(e){ self.onWheel(e); };
    this.boundTouchDown = function(e){ self.onTouchDown(e); };
    this.boundTouchMove = function(e){ self.onTouchMove(e); };
    this.boundTouchUp   = function(){ self.onTouchUp(); };
    this.boundKeyDown   = function(e){ self.onKeyDown(e); };
    this.boundClick     = function(e){ self.onClick(e); };

    addEventListener('resize', this.boundResize);
    /* אינטראקציה תחומה לגלריה בלבד; move/up על החלון כדי שגרירה לא תיתקע */
    this.container.addEventListener('wheel', this.boundWheel, { passive:true });
    this.container.addEventListener('mousedown', this.boundTouchDown);
    this.container.addEventListener('touchstart', this.boundTouchDown, { passive:true });
    this.container.addEventListener('keydown', this.boundKeyDown);
    this.container.addEventListener('click', this.boundClick);
    addEventListener('mousemove', this.boundTouchMove);
    addEventListener('mouseup', this.boundTouchUp);
    addEventListener('touchmove', this.boundTouchMove, { passive:true });
    addEventListener('touchend', this.boundTouchUp);

    /* דגל נראוּת עבור לולאת הרינדור */
    this.visible = true;
    if('IntersectionObserver' in window){
      this.visible = false;
      new IntersectionObserver(function(entries){
        self.visible = entries[0].isIntersecting;
      }, { rootMargin:'200px 0px' }).observe(this.container);
    }
  };

  host.dataset.done = '1';
  /* במובייל: פחות בנד (יותר ישר) וגרירה מהירה/מגיבה יותר */
  var isMobileGallery = window.innerWidth <= 899;
  new App(host, {
    items: window.GALLERY_IMAGES,
    bend: isMobileGallery ? 1 : 3,
    borderRadius: 0.05,
    scrollSpeed: isMobileGallery ? 3.5 : 2,
    /* reduce=1 -> בלי השהיה/תנופה, מעקב מיידי אחרי הגרירה */
    scrollEase: reduce ? 1 : (isMobileGallery ? 0.065 : 0.02)
  });
})();
})();
