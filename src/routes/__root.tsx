import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="page-inner theme-blue">
      <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "36ch" }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,64px)" }}>404</h1>
          <h2 style={{ marginTop: "12px" }}>העמוד לא נמצא</h2>
          <p style={{ marginTop: "10px", opacity: 0.75 }}>
            ייתכן שהקישור ישן או שהעמוד הועבר.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Link to="/" className="btn btn--pill btn--blue">
              <span>חזרה לדף הבית</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="page-inner theme-blue">
      <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "40ch" }}>
          <h2>העמוד לא נטען</h2>
          <p style={{ marginTop: "10px", opacity: 0.75 }}>
            משהו השתבש אצלנו. אפשר לנסות שוב או לחזור לדף הבית.
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn--pill btn--blue"
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              <span>נסו שוב</span>
            </button>
            <a href="/" className="btn btn--pill btn--ghost">
              <span>לדף הבית</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: 'אהבת חינ"מ - עמותה לילדים על הרצף האוטיסטי' },
      {
        name: "description",
        content:
          "עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד. מקימים בית שבו כל ילד מתקבל בדיוק כפי שהוא.",
      },
      { property: "og:title", content: 'אהבת חינ"מ - עמותה לילדים על הרצף האוטיסטי' },
      {
        property: "og:description",
        content: "עמותה לילדים על הרצף האוטיסטי והחינוך המיוחד.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  /* עברית וכיוון ימין-לשמאל ברמת המסמך. כל העיצוב של האתר בנוי סביב
     dir="rtl" - שינוי כאן ישבור את כל הפריסות. */
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
