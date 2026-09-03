import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/reset-password")({ component: ResetPassword });

/* אותם ערכים כמו ב-public/js/admin.js - חייבים להישאר מסונכרנים אם
   הפרויקט עובר בעתיד לפרויקט Supabase אחר. */
const SB_URL = "https://jrpdvfmmzxzcepnrafqr.supabase.co";
const SB_ANON = "sb_publishable_bhE-VCoiE_AILRw2FDb4vA_bMawyxaR";

type Status = "checking" | "ready" | "invalid" | "saving" | "done" | "error";

/* דף עצמאי, לא Layout של האתר: זה יעד טכני שמשתמש מגיע אליו רק דרך
   קישור באימייל של Supabase Auth (איפוס סיסמה בפאנל הניהול), לא חלק
   מהניווט הרגיל. גוטרו שם את הטוקן ב-hash של ה-URL (#access_token=...
   &type=recovery&...) ולא בנתיב או ב-query, כי hash לא נשלח לשרת -
   כך שהטוקן החד-פעמי לא מתגלגל ללוגים של אף שרת באמצע. */
function ResetPassword() {
  const [status, setStatus] = useState<Status>("checking");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
    const token = hash.get("access_token");
    const type = hash.get("type");
    if (token && type === "recovery") {
      setAccessToken(token);
      setStatus("ready");
      /* מנקים את ה-hash מיד כדי שהטוקן לא יישאר גלוי בהיסטוריית הדפדפן
         או ב-URL אם המסך הזה ישותף/יצולם. */
      history.replaceState(null, "", location.pathname);
    } else {
      setStatus("invalid");
    }
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (pass1.length < 6) {
      setErr("הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }
    if (pass1 !== pass2) {
      setErr("הסיסמאות אינן זהות.");
      return;
    }
    setStatus("saving");
    fetch(`${SB_URL}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: SB_ANON,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: pass1 }),
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        setStatus("done");
      })
      .catch(() => {
        setErr("שגיאה בשמירת הסיסמה. ייתכן שהקישור פג תוקף - בקשו קישור חדש מפאנל הניהול.");
        setStatus("error");
      });
  }

  return (
    <div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "24px", fontFamily: "system-ui, sans-serif", direction: "rtl" }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 10px 40px rgba(0,0,0,.1)" }}>
        <h1 style={{ fontSize: 22, marginBottom: 6 }}>איפוס סיסמה</h1>
        <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>פאנל הניהול של אהבת חינ״מ</p>

        {status === "checking" && <p>בודקים את הקישור...</p>}

        {status === "invalid" && (
          <>
            <p style={{ marginBottom: 16 }}>הקישור הזה לא תקין או שהגעתם לכאן ישירות. בקשו קישור איפוס חדש מדף הכניסה לפאנל.</p>
            <Link to="/admin" style={{ color: "#18B1F0", fontWeight: 600 }}>
              חזרה לפאנל הניהול
            </Link>
          </>
        )}

        {(status === "ready" || status === "saving" || status === "error") && (
          <form onSubmit={submit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>סיסמה חדשה</label>
              <input
                type="password"
                dir="ltr"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: 15, textAlign: "left" }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>אימות סיסמה</label>
              <input
                type="password"
                dir="ltr"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: 15, textAlign: "left" }}
              />
            </div>
            {err && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 14 }}>{err}</p>}
            <button
              type="submit"
              disabled={status === "saving"}
              style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: "#18B1F0", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
            >
              {status === "saving" ? "שומר..." : "שמירת סיסמה"}
            </button>
          </form>
        )}

        {status === "done" && (
          <>
            <p style={{ marginBottom: 16 }}>הסיסמה עודכנה בהצלחה.</p>
            <Link to="/admin" style={{ color: "#18B1F0", fontWeight: 600 }}>
              כניסה לפאנל הניהול
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
