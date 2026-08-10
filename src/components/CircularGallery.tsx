/* ============================================================================
   CircularGallery — גלריה מעגלית ב-WebGL (מבוסס React Bits, ogl)
   ----------------------------------------------------------------------------
   התאמות מול המקור:
   • התוויות (Title) אופציונליות — כרטיס בלי `text` מרונדר כתמונה בלבד,
     ולכן גם כל מנגנון טעינת הפונט לקנבס לא נדרש כשלא משתמשים בהן.
   • מאזיני הגלגלת והגרירה תחומים לקונטיינר ולא ל-window, אחרת כל גלילה
     בעמוד הייתה מסובבת את הגלריה.
   • הרינדור מושהה כשהסקשן מחוץ למסך (IntersectionObserver).
   • ללא crossOrigin על התמונות — הן מוגשות מאותו origin.

   דורש: npm i ogl
   ========================================================================== */
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef, useState } from "react";

import "./CircularGallery.css";

export interface GalleryItem {
  image: string;
  text?: string;
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

type Screen = { width: number; height: number };
type Viewport = { width: number; height: number };
type Scroll = { ease: number; current: number; target: number; last: number; position?: number };

function debounce<T extends (...args: never[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function getFontSize(font: string) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl: GLContext, text: string, font: string, color: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = font;
  const textWidth = Math.ceil(context.measureText(text).width);
  const textHeight = Math.ceil(getFontSize(font) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

/* ogl אינו מייצא טיפוס להקשר — זה ה-WebGL context עם שדה renderer */
type GLContext = WebGLRenderingContext & { renderer: Renderer };

class Title {
  mesh!: Mesh;

  constructor(
    private gl: GLContext,
    private plane: Mesh,
    text: string,
    textColor: string,
    font: string
  ) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry, program });
    const textHeight = plane.scale.y * 0.15;
    this.mesh.scale.set(textHeight * (width / height), textHeight, 1);
    this.mesh.position.y = -plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(plane);
  }
}

interface MediaOptions {
  geometry: Plane;
  gl: GLContext;
  image: string;
  index: number;
  length: number;
  scene: Transform;
  screen: Screen;
  viewport: Viewport;
  bend: number;
  borderRadius: number;
  text?: string;
  textColor: string;
  font: string;
}

class Media {
  extra = 0;
  plane!: Mesh;
  program!: Program;
  speed = 0;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  isBefore = false;
  isAfter = false;
  readonly image: string;

  private screen: Screen;
  private viewport: Viewport;

  constructor(private o: MediaOptions) {
    this.image = o.image;
    this.screen = o.screen;
    this.viewport = o.viewport;
    this.createShader();
    this.plane = new Mesh(o.gl, { geometry: o.geometry, program: this.program });
    this.plane.setParent(o.scene);
    if (o.text) new Title(o.gl, this.plane, o.text, o.textColor, o.font);
    this.onResize();
  }

  private createShader() {
    const { gl, borderRadius, image } = this.o;
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.src = image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  update(scroll: Scroll, direction: "left" | "right") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const bend = this.o.bend;

    if (bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B = Math.abs(bend);
      const R = (H * H + B * B) / (2 * B);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(next?: { screen: Screen; viewport: Viewport }) {
    if (next) {
      this.screen = next.screen;
      this.viewport = next.viewport;
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.o.length;
    this.x = this.width * this.o.index;
  }
}

class App {
  private renderer: Renderer;
  private gl: GLContext;
  private camera: Camera;
  private scene: Transform;
  private planeGeometry!: Plane;
  private medias: Media[] = [];
  private screen!: Screen;
  private viewport!: Viewport;
  private scroll: Scroll;
  private raf = 0;
  private isDown = false;
  private start = 0;
  private startY = 0;
  private moved = false;
  private visible = true;
  private observer?: IntersectionObserver;
  private onCheckDebounce: () => void;

  private boundResize = () => this.onResize();
  private boundWheel = (e: Event) => this.onWheel(e as WheelEvent);
  private boundDown = (e: Event) => this.onTouchDown(e as MouseEvent | TouchEvent);
  private boundMove = (e: Event) => this.onTouchMove(e as MouseEvent | TouchEvent);
  private boundUp = () => this.onTouchUp();
  private boundKey = (e: Event) => this.onKeyDown(e as KeyboardEvent);
  private boundClick = (e: Event) => this.onClick(e as MouseEvent);

  constructor(
    private container: HTMLElement,
    private opts: Required<Pick<CircularGalleryProps, "bend" | "textColor" | "borderRadius" | "font" | "scrollSpeed" | "scrollEase">> & {
      items: GalleryItem[];
      onTileClick: (image: string) => void;
    }
  ) {
    this.scroll = { ease: opts.scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(() => this.onCheck(), 200);

    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl as GLContext;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();

    this.onResize();
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  private createMedias() {
    /* מכפילים את הרשימה כדי שהלולאה תהיה רציפה בלי חורים */
    const looped = this.opts.items.concat(this.opts.items);
    this.medias = looped.map(
      (item, index) =>
        new Media({
          geometry: this.planeGeometry,
          gl: this.gl,
          image: item.image,
          index,
          length: looped.length,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
          bend: this.opts.bend,
          borderRadius: this.opts.borderRadius,
          text: item.text,
          textColor: this.opts.textColor,
          font: this.opts.font,
        })
    );
  }

  private onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.moved = false;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    this.startY = "touches" in e ? e.touches[0].clientY : e.clientY;
  }

  private onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    /* סף של 10px לפני שמסווגים כגרירה — קליק אמיתי כמעט תמיד נודד
       כמה פיקסלים בין mousedown ל-mouseup */
    if (!this.moved) {
      const dx = x - this.start,
        dy = y - this.startY;
      if (dx * dx + dy * dy > 100) this.moved = true;
    }
    this.scroll.target = (this.scroll.position ?? 0) + (this.start - x) * (this.opts.scrollSpeed * 0.025);
  }

  private onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  private onClick(e: MouseEvent) {
    if (this.moved) return;
    const media = this.hitTest(e.clientX, e.clientY);
    if (media) this.opts.onTileClick(media.image);
  }

  private hitTest(clientX: number, clientY: number): Media | null {
    const rect = this.gl.canvas.getBoundingClientRect();
    const px = clientX - rect.left,
      py = clientY - rect.top;
    /* המצלמה מסתכלת ישר על מישור z=0, אז המיפוי מיחידות עולם לפיקסלים
       ליניארי — אין צורך בפרויקציה מלאה כדי לדעת מה נלחץ */
    const scale = this.screen.width / this.viewport.width;
    const cx = this.screen.width / 2,
      cy = this.screen.height / 2;
    let best: Media | null = null,
      bestDist = Infinity;
    for (const m of this.medias) {
      const sx = cx + m.plane.position.x * scale;
      const sy = cy - m.plane.position.y * scale;
      const halfW = (m.plane.scale.x * scale) / 2,
        halfH = (m.plane.scale.y * scale) / 2;
      if (px >= sx - halfW && px <= sx + halfW && py >= sy - halfH && py <= sy + halfH) {
        const dist = (px - sx) * (px - sx) + (py - sy) * (py - sy);
        if (dist < bestDist) {
          bestDist = dist;
          best = m;
        }
      }
    }
    return best;
  }

  /* בלי preventDefault — הגלילה של העמוד נשארת של העמוד */
  private onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as WheelEvent & { wheelDelta?: number }).wheelDelta || 0;
    this.scroll.target += (delta > 0 ? this.opts.scrollSpeed : -this.opts.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.scroll.target += this.opts.scrollSpeed * 5;
      this.onCheckDebounce();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.scroll.target -= this.opts.scrollSpeed * 5;
      this.onCheckDebounce();
    } else if (e.key === "Home") {
      e.preventDefault();
      this.scroll.target = 0;
      this.onCheckDebounce();
    }
  }

  private onCheck() {
    if (!this.medias.length) return;
    const width = this.medias[0].width;
    const item = width * Math.round(Math.abs(this.scroll.target) / width);
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  private onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  private update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction: "left" | "right" = this.scroll.current > this.scroll.last ? "right" : "left";
    /* מרנדרים רק כשהסקשן על המסך — לא שורפים GPU בשאר העמוד */
    if (this.visible) {
      this.medias.forEach((m) => m.update(this.scroll, direction));
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.update);
  };

  private addEventListeners() {
    window.addEventListener("resize", this.boundResize);
    /* אינטראקציה תחומה לגלריה; move/up על החלון כדי שגרירה לא תיתקע */
    this.container.addEventListener("wheel", this.boundWheel, { passive: true });
    this.container.addEventListener("mousedown", this.boundDown);
    this.container.addEventListener("touchstart", this.boundDown, { passive: true });
    this.container.addEventListener("keydown", this.boundKey);
    this.container.addEventListener("click", this.boundClick);
    window.addEventListener("mousemove", this.boundMove);
    window.addEventListener("mouseup", this.boundUp);
    window.addEventListener("touchmove", this.boundMove, { passive: true });
    window.addEventListener("touchend", this.boundUp);

    if ("IntersectionObserver" in window) {
      this.visible = false;
      this.observer = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0].isIntersecting;
        },
        { rootMargin: "200px 0px" }
      );
      this.observer.observe(this.container);
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.observer?.disconnect();
    window.removeEventListener("resize", this.boundResize);
    this.container.removeEventListener("wheel", this.boundWheel);
    this.container.removeEventListener("mousedown", this.boundDown);
    this.container.removeEventListener("touchstart", this.boundDown);
    this.container.removeEventListener("keydown", this.boundKey);
    this.container.removeEventListener("click", this.boundClick);
    window.removeEventListener("mousemove", this.boundMove);
    window.removeEventListener("mouseup", this.boundUp);
    window.removeEventListener("touchmove", this.boundMove);
    window.removeEventListener("touchend", this.boundUp);
    this.gl.canvas.parentNode?.removeChild(this.gl.canvas);
  }
}

export default function CircularGallery({
  items = [],
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Fb Coherenti Sans",
  scrollSpeed = 2,
  scrollEase = 0.02,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !items.length) return;
    /* מכבדים העדפת תנועה מופחתת — בלי אנימציה אין טעם ב-WebGL כאן */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const app = new App(el, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onTileClick: (image) => setLightboxSrc(image),
    });
    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  useEffect(() => {
    if (!lightboxSrc) return;
    document.body.classList.add("circular-gallery-lightbox-lock");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("circular-gallery-lightbox-lock");
      document.removeEventListener("keydown", onKey);
    };
  }, [lightboxSrc]);

  return (
    <>
      <div
        className="circular-gallery"
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="גלריית תמונות. גררו או השתמשו בחצים ימינה ושמאלה כדי לנווט, לחצו על תמונה כדי להגדיל."
      />
      {lightboxSrc && (
        <div
          className="circular-gallery-lightbox is-open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxSrc(null);
          }}
        >
          <button
            className="circular-gallery-lightbox__close"
            type="button"
            aria-label="סגירה"
            onClick={() => setLightboxSrc(null)}
          >
            &times;
          </button>
          <img src={lightboxSrc} alt="תמונה מהפעילות של אהבת חינ&quot;מ" />
        </div>
      )}
    </>
  );
}
