---
id: screencast
title: ضبط ویدیویی نشست
description: "نشست‌های مرورگر را با قابلیت screencast در DevTools به‌صورت ویدیوهای ‎.webm ضبط کنید، گزینه‌های ضبط را پیکربندی کنید و فایل‌های خروجی را پیدا کنید."
---

نشست‌های مرورگر را به‌صورت ویدیوهای `.webm` ضبط می‌کند. ویدیوها در رابط کاربری DevTools در کنار نماهای snapshot و تغییرات DOM نمایش داده می‌شوند.

در هر سه آداپتور در دسترس است - **WebdriverIO**، **[Selenium WebDriver](/docs/devtools/selenium)** و **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. حالت ضبط در هر فریم‌ورک متفاوت است (در صورت امکان CDP push و در غیر این صورت polling - بخش [پشتیبانی مرورگرها](#browser-support) را در ادامه ببینید).

## نسخهٔ نمایشی

![Screencast Demo](/img/devtools/screencast.gif)

## راه‌اندازی

رمزگذاری screencast به **ffmpeg** در `PATH` و بستهٔ `fluent-ffmpeg` نیاز دارد:

```sh
# نصب ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# نصب fluent-ffmpeg
npm install fluent-ffmpeg
```

## پیکربندی

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## گزینه‌ها

| گزینه | نوع | پیش‌فرض | توضیحات |
|---|---|---|---|
| `enabled` | `boolean` | `false` | فعال‌سازی ضبط نشست |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | قالب تصویر فریم. **فقط Chrome/Chromium** - قالبی را که Chrome از طریق CDP ارسال می‌کند کنترل می‌کند. در حالت polling (Firefox، Safari) که اسکرین‌شات‌ها همیشه PNG هستند نادیده گرفته می‌شود. بر کانتینر ویدیوی خروجی که همیشه `.webm` است تأثیری ندارد |
| `quality` | `number` | `70` | کیفیت فشرده‌سازی JPEG بین ۰ تا ۱۰۰. فقط در حالت CDP مربوط به Chrome/Chromium با `captureFormat: 'jpeg'` اعمال می‌شود |
| `maxWidth` | `number` | `1280` | حداکثر عرض فریم بر حسب پیکسل. **فقط Chrome/Chromium** - Chrome فریم‌ها را پیش از ارسال از طریق CDP مقیاس‌دهی می‌کند. در حالت polling نادیده گرفته می‌شود |
| `maxHeight` | `number` | `720` | حداکثر ارتفاع فریم بر حسب پیکسل. **فقط Chrome/Chromium** - مانند مورد بالا |
| `pollIntervalMs` | `number` | `200` | فاصلهٔ زمانی گرفتن اسکرین‌شات بر حسب میلی‌ثانیه برای مرورگرهای غیر Chrome (حالت polling). مقدار کمتر = ویدیوی روان‌تر اما رفت‌وبرگشت‌های WebDriver بیشتر در حین اجرای تست |

## پشتیبانی مرورگرها

ضبط با انتخاب خودکار حالت، در همهٔ مرورگرهای اصلی کار می‌کند:

| مرورگر | حالت | نکات |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome فریم‌ها را از طریق DevTools Protocol ارسال می‌کند. کارآمد - بدون تأثیر بر زمان‌بندی دستورات تست |
| Firefox / Safari / سایر مرورگرها | **BiDi polling** | به فراخوانی `browser.takeScreenshot()` در فواصل `pollIntervalMs` بازمی‌گردد. هر جا که اسکرین‌شات WebDriver پشتیبانی شود کار می‌کند؛ سربار کوچکی متناسب با فاصلهٔ زمانی اضافه می‌کند |

برای تغییر حالت نیازی به تغییر پیکربندی نیست - سرویس به‌طور خودکار قابلیت‌های مرورگر را تشخیص می‌دهد و حالت فعال را در لاگ ثبت می‌کند.

## رفتار

- ضبط با باز شدن نشست مرورگر شروع و با بسته شدن آن متوقف می‌شود.
- فریم‌های خالی ابتدایی (که پیش از اولین پیمایش URL ضبط شده‌اند) به‌طور خودکار حذف می‌شوند تا ویدیوها از اولین اقدام معنادار صفحه شروع شوند.
- اگر `browser.reloadSession()` در میانهٔ اجرا فراخوانی شود، سرویس ضبط فعلی را نهایی کرده و ضبط جدیدی برای نشست تازه آغاز می‌کند. هر نشست فایل `.webm` مخصوص به خود را تولید می‌کند.
- وقتی چند ضبط وجود داشته باشد، رابط کاربری DevTools یک منوی کشویی **Recording N** برای جابه‌جایی بین آن‌ها نمایش می‌دهد.

### محل قرارگیری فایل‌های خروجی

پوشه‌ای که هر آداپتور انتخاب می‌کند کمی متفاوت است - همهٔ آن‌ها از یک resolver مشترک در `@wdio/devtools-core` استفاده می‌کنند اما ورودی‌های متفاوتی به آن می‌دهند:

| آداپتور | محل خروجی |
|---|---|
| **WebdriverIO** | `outputDir` اگر به‌طور صریح در `wdio.conf.ts` تنظیم شده باشد، در غیر این صورت `rootDir` (پوشهٔ حاوی فایل پیکربندی). از تنظیم `outputDir` صرفاً برای کنترل مسیر ویدیوها خودداری کنید - WDIO لاگ‌های worker را نیز به آنجا هدایت می‌کند. |
| **Selenium** | پوشهٔ فایل تستی که همین حالا اجرا شده است، و در صورت نبود آن `process.cwd()`. |
| **Nightwatch** | پوشهٔ فایل تست، و در صورت نبود آن پوشهٔ حاوی `nightwatch.conf.*` و سپس `process.cwd()`. |

پوشه‌های زیر `node_modules/` در مسیر Selenium/Nightwatch نادیده گرفته می‌شوند تا workspaceهای symlink‌شده ویدیوها را در پوشهٔ وابستگی‌ها قرار ندهند.

## فایل‌های خروجی

حالت live داده‌های ضبط‌شده را از طریق WebSocket به داشبورد استریم می‌کند و **هیچ فایل trace روی دیسک نمی‌نویسد** — برای داشتن یک خروجی قابل حمل، از [حالت trace](/docs/devtools/wdio/trace-mode) (`trace.zip`) استفاده کنید. تنها فایلی که حالت live می‌نویسد ویدیوی screencast است، آن هم فقط زمانی که `screencast.enabled: true` باشد. نام فایل‌ها به آداپتور بستگی دارد (نام فریم‌ورک در پیشوند آمده است):

| آداپتور | ویدیوی screencast |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |