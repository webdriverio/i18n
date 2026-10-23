---
id: cross-framework
title: پشتیبانی میان‌فریم‌ورکی
description: "مقایسه کنید که حالت trace در DevTools اجراهای WebdriverIO، Selenium و Nightwatch را تا چه حد کامل ثبت می‌کند و هر آداپتور چه کمبودهایی دارد."
---

قالب trace و پخش‌کنندهٔ `show-trace` در WebdriverIO / Selenium / Nightwatch یکسان هستند؛ این صفحه نشان می‌دهد که کامل بودن ثبت در کجا متفاوت است. برای مرجع کامل حالت trace، به [حالت Trace](/docs/devtools/wdio/trace-mode) مراجعه کنید.

تبدیل‌هایی که یک trace را می‌سازند در [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) قرار دارند، یعنی یک لایه پایین‌تر از آداپتورها، بنابراین **قالب trace و پخش‌کنندهٔ `show-trace` برای همهٔ آداپتورها یکسان است** — همان فایل `.zip` (یا دایرکتوری) صرف‌نظر از اینکه کدام آداپتور آن را تولید کرده باشد، در همان پخش‌کننده باز می‌شود. سه آداپتور زیر علاوه بر این، گزینه‌های اصلی (`mode`، `traceGranularity`، `tracePolicy`، `traceFormat`، `filmstrip`، `emitArtifactsManifest`، `captureAssertions`) را نیز به‌طور مشترک دارند.

با این حال، **کامل بودن ثبت بسته به آداپتور متفاوت است** — WebdriverIO کامل‌ترین است؛ Selenium و Nightwatch جریان اصلی را پوشش می‌دهند و کمبودهایشان در ادامه ذکر شده است. نحوهٔ فعال‌سازی مختص هر فریم‌ورک در صفحهٔ هر آداپتور آمده است — به [Selenium](/docs/devtools/selenium#trace-mode) و [Nightwatch](/docs/devtools/nightwatch#trace-mode) مراجعه کنید.

آداپتور Python (به زبانه‌های **Python** در صفحهٔ [Selenium](/docs/devtools/selenium) مراجعه کنید) همان آرشیو را می‌نویسد و در همان پخش‌کننده باز می‌شود، اما در این جدول نیامده است: این آداپتور هیچ JavaScriptای را در فرایند تست اجرا نمی‌کند، بنابراین backend به‌جای اینکه آداپتور trace را درون فرایند بسازد، آن را از جریان ثبت‌شده می‌سازد. دانه‌بندی و نگهداری معادل‌های Python دارند — `--devtools-trace-granularity session|test` و `--devtools-trace-policy`، که مقادیر آگاه از تلاش مجدد در دومی به `retain-on-failure` تنزل می‌یابند، زیرا هیچ چیزی در آن کانال ارتباطی شمارهٔ تلاش را منتقل نمی‌کند. ردیف‌هایی که معادل Python ندارند، مربوط به مصنوعات هر تست هستند: `screenshot`، `video` و پیوست درون‌خطی Allure. آنچه این آداپتور ثبت می‌کند - سفر در زمان DOM، filmstrip متراکم، درخت A11y و overlay عناصر، دستورات، کنسول، شبکه، assertionها، کنترل‌های اجرا و Preserve & Rerun - در صفحهٔ مخصوص خودش آمده است.

| قابلیت | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| حالت Trace + پخش‌کنندهٔ `show-trace` | ✅ | ✅ | ✅ |
| سفر در زمان DOM (ثبت mutationها) | ✅ | ✅ ¹ | ✅ |
| زبانهٔ A11y + overlay انتخاب locator (پخش‌کنندهٔ trace) | ✅ | ✅ | ✅ |
| تشخیص نشست Appium بومی | ✅ | ✅ | ✅ |
| دنبال کردن اپلیکیشن ترکیبی تا درون webview آن | ✅ | ⚠️ فقط caps هنگام راه‌اندازی | ⚠️ فقط caps هنگام راه‌اندازی |
| Transcript + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` برای هر تست | ✅ Allure درون‌خطی | ✅ Allure درون‌خطی | ⚠️ فقط تولید ² |
| `tracePolicy` آگاه از تلاش مجدد | ✅ | ✅ | ⚠️ فقط `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object؛ BDD `describe/it` به یک برش نشست تبدیل می‌شود |
| تودرتویی Feature→Scenario→Step در Cucumber | Scenario→Step ⁴ | ✅ کامل | Feature→Scenario ⁵ |
| ثبت BiDi (کنسول / شبکه / استثناها) | ✅ خودکار | ✅ خودکار | ⚠️ اختیاری (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / ویدیو) | CDP push | CDP push | فقط polling |
| زبانه‌های A11y و Transcript | فقط پخش‌کنندهٔ trace | فقط پخش‌کنندهٔ trace | فقط پخش‌کنندهٔ trace |

¹ با BiDi، Selenium گردآورندهٔ صفحه را در ابتدای سند ثبت می‌کند، بنابراین هر سند DOM خودش را همانند WebdriverIO لنگر می‌اندازد. بدون BiDi، به تزریق گردآورنده پس از هر ناوبری بازمی‌گردد، و در آن حالت snapshot یک ناوبری ممکن است از دستوری که آن را فعال کرده عقب بماند.
² Nightwatch هیچ API زنده‌ای برای پیوست Allure ندارد، بنابراین مصنوعات هر تست در دایرکتوری خروجی trace نوشته شده و در manifest فهرست می‌شوند، اما به یک تست Allure پیوست نمی‌شوند.
³ گزینهٔ `--retries` در Nightwatch یک تست را به‌صورت داخلی دوباره اجرا می‌کند بدون اینکه hookهای هر تست افزونه را دوباره فراخوانی کند، بنابراین سیاست‌های آگاه از تلاش مجدد (`on-first-retry`، `retain-on-first-failure`، …) به `retain-on-failure` تنزل می‌یابند.
⁴ WebdriverIO هنوز سلسله‌مراتب سطح feature را منتقل نمی‌کند، بنابراین تودرتویی Cucumber آن Scenario→Step است.
⁵ Nightwatch هنوز تودرتویی هر step را ثبت نمی‌کند (فقط Feature→Scenario).