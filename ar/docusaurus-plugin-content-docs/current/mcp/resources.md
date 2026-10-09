---
id: resources
title: الموارد
description: "اقرأ حالة الجلسة المباشرة وسجل الجلسات وتفاصيل إعداد مزودي الخدمات السحابية من خلال موارد wdio:// للقراءة فقط في خادم WebdriverIO MCP."
---

توفر موارد MCP وصولاً للقراءة فقط إلى حالة الجلسة المباشرة. على عكس الأدوات، يسحب نموذج الذكاء الاصطناعي الموارد متى شاء؛ فهي لا تنفذ أي إجراءات. تستخدم جميع الموارد مخطط URI `wdio://`.

## متى تستخدم الموارد مقابل الأدوات

- **الموارد** — حالة محيطة تتغير أثناء تفاعلك: العناصر الحالية، ولقطة الشاشة، وملفات تعريف الارتباط، وشجرة إمكانية الوصول. اقرأها قبل اتخاذ أي إجراء لفهم ما يظهر على الشاشة.
- **الأدوات** — إجراءات تغير الحالة: النقر، والتنقل، وتعيين القيمة.

فضّل استخدام `wdio://session/current/elements` على `get_screenshot` لاكتشاف العناصر؛ فهو يعيد محددات جاهزة للاستخدام ويستهلك رموزاً (tokens) أقل بكثير.

## سجل الجلسات

### `wdio://sessions`

فهرس لجميع جلسات المتصفح والتطبيقات مع البيانات الوصفية وعدد الخطوات.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

سجل خطوات بتنسيق JSON للجلسة النشطة حالياً. يحتوي على جميع خطوات الأتمتة المسجلة مع أسماء الأدوات والمعاملات والطوابع الزمنية.

---

### `wdio://session/current/code`

كود JavaScript الخاص بـ WebdriverIO المُولَّد للجلسة النشطة حالياً. يُولَّد تلقائياً من الخطوات المسجلة. الصقه في ملف اختبار WebdriverIO لإعادة تشغيل الجلسة.

---

### `wdio://session/{sessionId}/steps`

سجل الخطوات لجلسة محددة حسب المعرّف. قالب URI — استبدل `{sessionId}` بالمعرّف من `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

كود JavaScript الخاص بـ WebdriverIO المُولَّد لجلسة محددة حسب المعرّف. قالب URI — استبدل `{sessionId}` بالمعرّف من `wdio://sessions`.

## حالة الصفحة المباشرة (الجلسة الحالية)

### `wdio://session/current/elements`

العناصر القابلة للتفاعل في الصفحة الحالية. يعيد محددات جاهزة للاستخدام ونص العنصر ومعلومات الظهور.

**هذا هو المورد الأساسي لفهم ما يظهر على الشاشة.** اقرأه قبل النقر أو الكتابة. إنه أسرع بكثير وأقل تكلفة من لقطة الشاشة.

للتصفية المتقدمة (منطقة العرض فقط، والحاويات، والمربعات المحيطة، وتقسيم الصفحات)، استخدم أداة `get_elements` بدلاً من ذلك.

---

### `wdio://session/current/accessibility`

شجرة إمكانية الوصول للصفحة الحالية. تعيد جميع العُقد افتراضياً مع سمات الدور والاسم والمحدد والحالة. للمتصفح فقط. على الأجهزة المحمولة، استخدم `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

للحصول على نتائج مُصفّاة (حسب الدور، مع تقسيم الصفحات)، استخدم أداة `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

لقطة شاشة للصفحة أو الشاشة الحالية كصورة مُرمّزة بـ base64. يتم تغيير حجمها تلقائياً (بحد أقصى 2000px) وضغطها (بحد أقصى 1 ميغابايت).

استخدمها للتحقق المرئي أو لتصحيح أخطاء التخطيط. لاكتشاف العناصر، فضّل `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

جميع ملفات تعريف الارتباط لجلسة المتصفح الحالية.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

جميع علامات تبويب المتصفح المفتوحة في الجلسة الحالية. للمتصفح فقط.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

استخدمه قبل `switch_tab` للعثور على المعرّف (handle) أو الفهرس المستهدف.

---

### `wdio://session/current/contexts`

سياقات الأتمتة المتاحة (NATIVE_APP، WEBVIEW). للأجهزة المحمولة فقط.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

سياق الأتمتة النشط حالياً. للأجهزة المحمولة فقط.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

حالة دورة حياة التطبيق لمعرّف حزمة معين. للأجهزة المحمولة فقط. قالب URI — استبدل `{bundleId}` بمعرّف حزمة iOS أو اسم حزمة Android.

يعيد إحدى القيم التالية:
- `0` — غير مثبت
- `1` — غير قيد التشغيل
- `2` — قيد التشغيل في الخلفية (معلّق)
- `3` — قيد التشغيل في الخلفية
- `4` — قيد التشغيل في المقدمة

للحصول على مخرجات بأسماء الحالات، استخدم أداة `get_app_state` بدلاً من ذلك.

---

### `wdio://session/current/geolocation`

تجاوز الموقع الجغرافي الحالي للجهاز الذي تم تعيينه بواسطة `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

سجلات الجلسة الحالية. يعيد رسائل وحدة تحكم المتصفح واستثناءات JavaScript (جلسات Chromium)، أو مخرجات logcat (Android)، أو سجلات الأعطال/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

الإمكانات (capabilities) الخام التي يعيدها خادم WebDriver أو Appium للجلسة الحالية. استخدمها لتصحيح الأخطاء؛ فهي تعرض القيم الفعلية التي قبلها برنامج التشغيل، بما في ذلك القيم الافتراضية التي يطبقها مزود الخدمة السحابية أو Appium.

## مزودو الخدمات السحابية

### `wdio://browserstack/local-binary`

رابط تنزيل خاص بالمنصة وتعليمات إعداد الخدمة الخلفية (daemon) لملف BrowserStack Local التنفيذي. اقرأ هذا قبل استخدام `tunnel: true` أو `tunnel: "external"` مع `provider: "browserstack"`؛ فهو يحتوي على الأوامر الدقيقة لنظام التشغيل والبنية الخاصة بك.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

رابط تنزيل خاص بالمنصة وتعليمات إعداد الخدمة الخلفية (daemon) لـ Sauce Connect Proxy. اقرأ هذا قبل استخدام `tunnel: "external"` مع `provider: "saucelabs"`؛ أما مع `tunnel: true` فإن SDK يدير Sauce Connect تلقائياً.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

رابط تنزيل خاص بالمنصة وتعليمات إعداد الخدمة الخلفية (daemon) لـ TestMu Tunnel. مطلوب فقط مع `tunnel: "external"` و `provider: "testmu"` — أما مع `tunnel: true` فإن SDK يدير النفق تلقائياً عبر `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

رابط التنزيل وتعليمات إعداد الخدمة الخلفية (daemon) لـ TestingBot Tunnel. النفق عبارة عن ملف Java JAR متعدد المنصات (يتطلب Java 11+). مطلوب فقط مع `tunnel: "external"` و `provider: "testingbot"` — أما مع `tunnel: true` فإن SDK يدير النفق تلقائياً عبر `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```