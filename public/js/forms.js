/* ============================================================
   טפסי התרומה ויצירת הקשר - חולצו מ-public/js/pages.js.
   כאן יושבת ההגדרה של חיבור הסליקה לטרנזילה (TRANZILA),
   ולכן זה הקובץ שצריך לגעת בו כשמפעילים PayPal או מחליפים
   מסוף. נטען רק בעמודי התרומה ויצירת הקשר.
   ============================================================ */
(function(){
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

     שם המסוף 'betshay' אומת ישירות מטופס הסליקה האמיתי באתר הישן
     (עמוד order-pay של הזמנה קיימת) - לא ניחוש. השם/מספר "עמותת אהבת
     חינ"מ" ו-5647324 שנוסו קודם היו שם/מספר חשבונאי, לא שם המסוף
     בכתובת - טרנזילה החזירו "הדף שחיפשתם לא נמצא" לשניהם.

     נשאר לבצע תרומת בדיקה אמיתית בסכום קטן כדי לוודא שהחיבור עובד
     מקצה לקצה. בנוסף - כדי שההחזרה לעמודי התודה/הכשלון תעבוד, צריך
     שכתובות ה-success/fail יאושרו גם בהגדרות המסוף בממשק של טרנזילה.

     שדות "חובה" לפי התיעוד של טרנזילה (חוץ מסכום ומטבע): שם איש קשר,
     חברה, אימייל, מדינה, עיר, מיקוד, כתובת. מהתורם עצמו אוספים רק שם
     ואימייל (גם ככה נדרשים בשביל הקבלה) - שאר השדות (חברה/מדינה/עיר/
     מיקוד/כתובת) ממולאים בפרטי העמותה עצמה כברירת מחדל קבועה, כדי לא
     להעמיס על טופס תרומה עם שדות שאין להם שימוש אמיתי אצלנו. */
  var TRANZILA = {
    enabled: true,
    terminal: 'betshay',
    currency: '1',
    orgName: 'עמותת אהבת חינ״מ',
    country: 'Israel',
    city: 'נהריה',
    zip: '2210001',
    address: 'יצחק שדה 18',

    /* ---------- PayPal ----------
       PayPal רץ *דרך* טרנזילה ולא במקביל לה: הדונר לוחץ "תרומה
       מאובטחת" כרגיל, ובעמוד הסליקה של טרנזילה מופיע גם כפתור
       PayPal לצד תשלום בכרטיס. היתרון הגדול - תרומת PayPal עוברת
       בדיוק באותו צינור: אותו דיווח, אותה קבלה, ואותה תעודת תורם
       אוטומטית. כפתור PayPal עצמאי היה עוקף את כל זה ויוצר מערכת
       שנייה שצריך להצליב מולה ידנית.

       כל מה שצריך מהצד שלנו הוא לשלוח ppnewwin=2. אבל זה מופעל רק
       כשהדגל למטה true, כי אם PayPal לא הוגדר בפועל אצל טרנזילה,
       הכפתור יופיע לתורם ויוביל לשגיאה - כלומר תרומה שהולכת לאיבוד.

       להפעלה צריך (בצד שלכם, לא בקוד):
         1. חשבון PayPal *עסקי* (Business).
         2. בטרנזילה: הגדרות עמוד התשלום -> להפעיל את כפתור PayPal.
         3. ב-PayPal: Seller Preferences -> API Access -> "View API
            Signature", ולהעתיק Username / Password / Signature
            להגדרות ה-PayPal של המסוף בטרנזילה, ולסמן את החשבון פעיל.
         4. ב-PayPal: Seller Preferences -> Instant Payment
            Notifications -> להפעיל עם הכתובת:
            https://secure5.tranzila.com/cgi-bin/tranzila31n.cgi?supplier=betshay
         5. בטרנזילה: להגדיר את כתובות ההפניה (הצלחה/כישלון) גם
            בהגדרות המסוף עצמו, לא רק בשדות שאנחנו שולחים.

       שימו לב לאזהרה בתיעוד של טרנזילה: מסוף שעובד מול ה-API המלא
       לא יכול לעבוד עם PayPal, ונדרש מסוף שמוגדר לכך. betshay הוא
       מסוף iframe/redirect ולכן אמור להתאים - אבל כדאי לאמת מולם. */
    paypal: false,
    /* שימו לב: כתובת ה-notify *לא* נמצאת כאן בכוונה.
       ------------------------------------------------------------
       בעבר היא נשלחה מכאן כשדה notify_url_address, יחד עם טוקן
       שנועד להיות סוד. אבל כל מה שנמצא בקובץ הזה מוגש לכל גולש -
       כלומר הטוקן היה גלוי לחלוטין, וכל אדם יכול היה לקרוא לוובהוק
       ולגרום לעמותה לשלוח מייל "תעודת תרומה" רשמי-למראה לכל כתובת
       שירצה, עם טקסט שהוא בחר. ממסר מייל פתוח לכל דבר.

       הפתרון: כתובת ה-notify מוגדרת ישירות בממשק של טרנזילה
       (הגדרות המסוף -> שדה Notify URL), ולא נשלחת מהדפדפן. כך
       הטוקן חי רק בשני מקומות סגורים - אצל טרנזילה וב-Secrets של
       Supabase - ולעולם לא נחשף לגולשים. */
  };

  var donateForm = document.getElementById('donateForm');
  if (donateForm) {
    var submit = document.getElementById('donateSubmit');
    var custom = document.getElementById('customAmount');
    var note = document.getElementById('donateNote');
    var donorName = document.getElementById('donorName');
    var donorEmail = document.getElementById('donorEmail');

    /* כשתשלום ב-PayPal פעיל, מודיעים על כך כבר כאן - התורם צריך לדעת
       שהאפשרות קיימת *לפני* שהוא לוחץ, לא לגלות אותה רק בעמוד הסליקה. */
    if (TRANZILA.paypal && note) {
      note.textContent = note.textContent.replace(/\s*$/, '') +
        ' אפשר לשלם בכרטיס אשראי או ב-PayPal.';
    }
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
    /* כתובת מוחלטת לעמוד באתר, כדי שטרנזילה תדע לאן להחזיר.
       באתר הסטטי זה נגזר משם הקובץ; כאן מדובר במסלולי SPA, ולכן
       בונים מה-origin. שימו לב: את שתי הכתובות האלה צריך לאשר גם
       בהגדרות המסוף בממשק של טרנזילה, אחרת ההחזרה לא תעבוד. */
    function pageUrl(path) {
      return location.origin + path;
    }

    /* הוראת קבע עדיין לא מחוברת: היא דורשת צד-שרת ולא ניתן לממש אותה
       בבטחה באתר סטטי. לכן, במקום לחייב חיוב בודד למי שביקש הוראת קבע -
       מה שהיה מטעה ממש - מסבירים ומפנים ליצירת קשר.

       לקראת השלב שבו זה כן ייבנה: יש מסוף נפרד לחיובים חוזרים -
       'betshaytok' (STO / My Billing API של טרנזילה, לא ה-iframe הרגיל).
       זה עדיין לא מספיק כדי לחבר - צריך גם app-key+secret (חתימת HMAC
       בכל בקשה) וגם שרת שמחזיק אותם בבטחה, כי טרנזילה עצמם אוסרים
       קריאה ל-API הזה ישירות מהדפדפן. */
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
        success_url_address: pageUrl('/thank-you') + '?sum=' + n,
        fail_url_address: pageUrl('/payment-failed')
      };

      /* ppnewwin=2 גורם לכפתור PayPal להופיע בעמוד הסליקה של טרנזילה,
         לצד התשלום בכרטיס. נשלח רק כשהחיבור באמת מוגדר אצלם. */
      if (TRANZILA.paypal) fields.ppnewwin = '2';

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
