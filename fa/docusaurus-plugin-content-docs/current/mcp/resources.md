---
id: resources
title: منابع
description: "وضعیت زنده‌ی نشست، تاریخچه‌ی نشست‌ها و جزئیات راه‌اندازی ارائه‌دهندگان ابری را از طریق منابع فقط‌خواندنی wdio:// در سرور MCP وب‌درایور‌آی‌او بخوانید."
---

منابع MCP دسترسی فقط‌خواندنی به وضعیت زنده‌ی نشست را فراهم می‌کنند. برخلاف ابزارها، منابع هر زمان که مدل هوش مصنوعی بخواهد توسط آن خوانده می‌شوند؛ آن‌ها هیچ عملی را اجرا نمی‌کنند. همه‌ی منابع از طرح URI `wdio://` استفاده می‌کنند.

## چه زمانی از منابع و چه زمانی از ابزارها استفاده کنیم

- **منابع** — وضعیت پیرامونی که با تعامل شما تغییر می‌کند: عناصر فعلی، اسکرین‌شات، کوکی‌ها، درخت دسترسی‌پذیری. پیش از انجام هر عملی آن‌ها را بخوانید تا بفهمید چه چیزی روی صفحه است.
- **ابزارها** — اعمالی که وضعیت را تغییر می‌دهند: کلیک، پیمایش، تنظیم مقدار.

برای کشف عناصر، `wdio://session/current/elements` را به `get_screenshot` ترجیح دهید؛ این منبع انتخابگرهای آماده‌ی استفاده برمی‌گرداند و توکن‌های بسیار کمتری مصرف می‌کند.

## تاریخچه‌ی نشست‌ها

### `wdio://sessions`

فهرست همه‌ی نشست‌های مرورگر و اپلیکیشن به همراه فراداده و تعداد گام‌ها.

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

گزارش گام‌ها با فرمت JSON برای نشست فعال فعلی. شامل همه‌ی گام‌های خودکارسازی ثبت‌شده به همراه نام ابزارها، پارامترها و برچسب‌های زمانی است.

---

### `wdio://session/current/code`

کد جاوااسکریپت WebdriverIO تولیدشده برای نشست فعال فعلی. به‌طور خودکار از گام‌های ثبت‌شده تولید می‌شود. آن را در یک فایل تست WebdriverIO قرار دهید تا نشست دوباره اجرا شود.

---

### `wdio://session/{sessionId}/steps`

گزارش گام‌ها برای یک نشست مشخص بر اساس شناسه. قالب URI — `{sessionId}` را با شناسه‌ی به‌دست‌آمده از `wdio://sessions` جایگزین کنید.

---

### `wdio://session/{sessionId}/code`

کد جاوااسکریپت WebdriverIO تولیدشده برای یک نشست مشخص بر اساس شناسه. قالب URI — `{sessionId}` را با شناسه‌ی به‌دست‌آمده از `wdio://sessions` جایگزین کنید.

## وضعیت زنده‌ی صفحه (نشست فعلی)

### `wdio://session/current/elements`

عناصر قابل تعامل در صفحه‌ی فعلی. انتخابگرهای آماده‌ی استفاده، متن عناصر و اطلاعات نمایان‌بودن را برمی‌گرداند.

**این منبع اصلی برای درک آنچه روی صفحه است محسوب می‌شود.** پیش از کلیک یا تایپ آن را بخوانید. بسیار سریع‌تر و کم‌هزینه‌تر از اسکرین‌شات است.

برای فیلترکردن پیشرفته (فقط ناحیه‌ی دید، کانتینرها، کادرهای محدودکننده، صفحه‌بندی)، به‌جای آن از ابزار `get_elements` استفاده کنید.

---

### `wdio://session/current/accessibility`

درخت دسترسی‌پذیری برای صفحه‌ی فعلی. به‌طور پیش‌فرض همه‌ی گره‌ها را به همراه ویژگی‌های نقش، نام، انتخابگر و وضعیت برمی‌گرداند. فقط برای مرورگر. در موبایل از `wdio://session/current/elements` استفاده کنید.

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

برای نتایج فیلترشده (بر اساس نقش، صفحه‌بندی‌شده)، از ابزار `get_accessibility_tree` استفاده کنید.

---

### `wdio://session/current/screenshot`

اسکرین‌شات صفحه یا نمایشگر فعلی به‌صورت تصویر کدگذاری‌شده با base64. به‌طور خودکار تغییر اندازه داده می‌شود (حداکثر 2000 پیکسل) و فشرده می‌شود (حداکثر 1 مگابایت).

برای تأیید بصری یا اشکال‌زدایی چیدمان استفاده کنید. برای کشف عناصر، `wdio://session/current/elements` را ترجیح دهید.

---

### `wdio://session/current/cookies`

همه‌ی کوکی‌های نشست مرورگر فعلی.

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

همه‌ی زبانه‌های باز مرورگر در نشست فعلی. فقط برای مرورگر.

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

پیش از `switch_tab` از آن استفاده کنید تا handle یا اندیس زبانه‌ی هدف را پیدا کنید.

---

### `wdio://session/current/contexts`

زمینه‌های خودکارسازی موجود (NATIVE_APP، WEBVIEW). فقط برای موبایل.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

زمینه‌ی خودکارسازی فعال فعلی. فقط برای موبایل.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

وضعیت چرخه‌ی حیات اپلیکیشن برای یک bundle ID مشخص. فقط برای موبایل. قالب URI — `{bundleId}` را با یک bundle ID در iOS یا نام بسته در Android جایگزین کنید.

یکی از مقادیر زیر را برمی‌گرداند:
- `0` — نصب نشده
- `1` — در حال اجرا نیست
- `2` — در حال اجرا در پس‌زمینه (معلق)
- `3` — در حال اجرا در پس‌زمینه
- `4` — در حال اجرا در پیش‌زمینه

برای خروجی با نام‌های توصیفی، به‌جای آن از ابزار `get_app_state` استفاده کنید.

---

### `wdio://session/current/geolocation`

موقعیت جغرافیایی جایگزین فعلی دستگاه که توسط `set_geolocation` تنظیم شده است.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

لاگ‌های نشست فعلی. پیام‌های کنسول مرورگر و استثناهای جاوااسکریپت (نشست‌های Chromium)، خروجی logcat (Android) یا crash/syslog (iOS) را برمی‌گرداند.

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

قابلیت‌های (capabilities) خامی که سرور WebDriver یا Appium برای نشست فعلی برگردانده است. برای اشکال‌زدایی استفاده کنید؛ مقادیر واقعی پذیرفته‌شده توسط درایور، از جمله مقادیر پیش‌فرض اعمال‌شده توسط ارائه‌دهنده‌ی ابری یا Appium را نشان می‌دهد.

## ارائه‌دهندگان ابری

### `wdio://browserstack/local-binary`

URL دانلود مخصوص هر پلتفرم و دستورالعمل‌های راه‌اندازی daemon برای فایل اجرایی BrowserStack Local. پیش از استفاده از `tunnel: true` یا `tunnel: "external"` همراه با `provider: "browserstack"` این را بخوانید؛ این منبع دستورات دقیق مربوط به سیستم‌عامل و معماری شما را در بر دارد.

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

URL دانلود مخصوص هر پلتفرم و دستورالعمل‌های راه‌اندازی daemon برای Sauce Connect Proxy. پیش از استفاده از `tunnel: "external"` همراه با `provider: "saucelabs"` این را بخوانید؛ برای `tunnel: true`، SDK به‌طور خودکار Sauce Connect را مدیریت می‌کند.

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

URL دانلود مخصوص هر پلتفرم و دستورالعمل‌های راه‌اندازی daemon برای TestMu Tunnel. فقط برای `tunnel: "external"` همراه با `provider: "testmu"` لازم است — برای `tunnel: true`، SDK به‌طور خودکار تونل را از طریق `@lambdatest/node-tunnel` مدیریت می‌کند.

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

URL دانلود و دستورالعمل‌های راه‌اندازی daemon برای TestingBot Tunnel. این تونل یک فایل JAR جاوای چندسکویی است (به Java 11 یا بالاتر نیاز دارد). فقط برای `tunnel: "external"` همراه با `provider: "testingbot"` لازم است — برای `tunnel: true`، SDK به‌طور خودکار تونل را از طریق `testingbot-tunnel-launcher` مدیریت می‌کند.

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