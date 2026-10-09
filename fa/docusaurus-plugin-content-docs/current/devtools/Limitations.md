---
id: limitations
title: محدودیت‌های حالت Trace
description: "بررسی مواردی که حالت trace در DevTools عمداً ثبت نمی‌کند و محدودیت‌های شناخته‌شده در آداپترهای WebdriverIO، Selenium و Nightwatch."
---

مواردی که [حالت Trace](/docs/devtools/wdio/trace-mode) عمداً از آن‌ها صرف‌نظر می‌کند، به‌علاوهٔ کمبودهای شناخته‌شده در آداپترها.

## مواردی که حالت trace از آن‌ها صرف‌نظر می‌کند

- **پنجرهٔ رابط کاربری DevTools** — هیچ نمونه‌ای از Chrome برای داشبورد باز نمی‌شود.
- **اتصال پورت بک‌اند** — هیچ پورتی روی localhost رزرو نمی‌شود (از نسخهٔ v1.2+ در هر سه آداپتر یکسان است).
- **`screencast.enabled`** — ضبط پیوستهٔ `.webm` در حالت زنده، در حالت trace نادیده گرفته می‌شود (یک هشدار ثبت می‌شود). در عوض، حالت trace **به‌طور پیش‌فرض** یک [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) متراکم را در آرشیو ضبط می‌کند (برای داشتن یک فریم به ازای هر اقدام، `filmstrip: false` را تنظیم کنید)، به‌علاوهٔ برش‌های [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) به ازای هر تست در صورت فعال بودن. فیلدهای **تنظیم** screencast (`quality`، `maxWidth`، `pollIntervalMs`، …) همچنان روی هر ضبط‌کننده‌ای که اجرا شود اعمال می‌شوند.
- **فایل خروجی `wdio-trace-<sessionId>.json`** — به‌طور کامل حذف شده است. فایل JSON یکپارچهٔ قدیمی که حالت زندهٔ WDIO قبلاً می‌نوشت دیگر وجود ندارد؛ حالت زنده اکنون داده‌ها را به داشبورد استریم می‌کند و چیزی روی دیسک نمی‌نویسد، و `trace.zip` تنها مصنوع trace است.

## محدودیت‌های شناخته‌شده

- **`describe/it` در Nightwatch BDD** — `traceGranularity: 'test'` به **یک برش واحد در محدودهٔ نشست** فرو می‌ریزد: Nightwatch هر `it` را به‌صورت داخلی و بدون هوکی به ازای هر تست که افزونه بتواند ببیند اجرا می‌کند، بنابراین برش به اولین تست کلیدگذاری می‌شود. ثبت فراداده (وضعیت هر testcase در manifest) تحت تأثیر قرار نمی‌گیرد، اما کلیدگذاری trace/screenshot/video به ازای هر `it` و نگهداری آگاه از تلاش مجدد، برای این رابط به محدودهٔ نشست تنزل می‌یابند. رابط‌های **exports-object** و **Cucumber** در Nightwatch هوک‌هایی به ازای هر سناریو/تست ارائه می‌دهند و برش واقعی به ازای هر تست دریافت می‌کنند. (mocha/cucumber در WebdriverIO و mocha در Selenium تحت تأثیر قرار نمی‌گیرند.)
- **نگهداری آگاه از تلاش مجدد در Nightwatch** — فقط `retain-on-failure` کار می‌کند؛ سایر سیاست‌های آگاه از تلاش مجدد تنزل می‌یابند، زیرا Nightwatch با `--retries` یک testcase را به‌صورت داخلی دوباره اجرا می‌کند بدون اینکه هوک‌های هر تست را دوباره فعال کند. به [نگهداری](/docs/devtools/wdio/trace-mode#retention--tracepolicy) مراجعه کنید.
- **پیوست Allure در Nightwatch** — `screenshot`/`video` به ازای هر تست فقط تولید می‌شوند (فایل‌ها + manifest) و به‌صورت درون‌خطی پیوست نمی‌شوند؛ به [یکپارچه‌سازی با Allure](/docs/devtools/allure) مراجعه کنید.
- **video/filmstrip در مرورگرهای غیر Chrome** — در مرورگرهایی که مسیر push مبتنی بر CDP ندارند، ضبط‌کننده `takeScreenshot` را به‌صورت دوره‌ای فراخوانی می‌کند که رفت‌وبرگشت‌های WebDriver اضافه می‌کند و (در Allure) گزارش مراحل را پر می‌کند؛ آن را با گزینه‌های خاموش‌سازی مراحل در reporter همراه کنید.