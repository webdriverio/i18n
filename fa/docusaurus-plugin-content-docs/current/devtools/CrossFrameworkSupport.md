---
id: cross-framework
title: پشتیبانی از فریم‌ورک‌های مختلف
description: "مقایسه میزان کامل بودن ثبت اجراهای WebdriverIO، Selenium و Nightwatch توسط حالت ردیابی (trace mode) در DevTools، و کمبودهای هر آداپتور."
---

قالب ردیابی (trace) و پخش‌کننده `show-trace` در WebdriverIO / Selenium / Nightwatch یکسان هستند؛ این صفحه نشان می‌دهد که میزان کامل بودن ثبت در کجا متفاوت است. برای مرجع کامل حالت ردیابی، به [حالت ردیابی](/docs/devtools/wdio/trace-mode) مراجعه کنید.

تبدیل‌هایی که یک ردیابی را می‌سازند در [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) قرار دارند، یعنی یک لایه پایین‌تر از آداپتورها، بنابراین **قالب ردیابی و پخش‌کننده `show-trace` برای همه آداپتورها یکسان است** — همان فایل `.zip` (یا دایرکتوری) صرف‌نظر از اینکه کدام آداپتور آن را تولید کرده باشد، در همان پخش‌کننده باز می‌شود. سه آداپتور زیر علاوه بر این، گزینه‌های اصلی (`mode`، `traceGranularity`، `tracePolicy`، `traceFormat`، `filmstrip`، `emitArtifactsManifest`، `captureAssertions`) را نیز به‌صورت مشترک دارند.

با این حال، **میزان کامل بودن ثبت بسته به آداپتور متفاوت است** — WebdriverIO کامل‌ترین است؛ Selenium و Nightwatch جریان اصلی را پوشش می‌دهند و کمبودهای آن‌ها در ادامه ذکر شده است. نحوه فعال‌سازی مختص هر فریم‌ورک در صفحه هر آداپتور آمده است — به [Selenium](/docs/devtools/selenium#trace-mode) و [Nightwatch](/docs/devtools/nightwatch#trace-mode) مراجعه کنید.

آداپتور Python (به زبانه‌های **Python** در صفحه [Selenium](/docs/devtools/selenium) مراجعه کنید) همان آرشیو را می‌نویسد و در همان پخش‌کننده باز می‌شود، اما در این جدول قرار ندارد: این آداپتور هیچ کد JavaScript را در فرایند تست اجرا نمی‌کند، بنابراین به‌جای اینکه آداپتور ردیابی را درون فرایند بسازد، بک‌اند آن را از جریان ثبت‌شده می‌سازد. گزینه‌های دانه‌بندی (granularity) و نگهداری (retention) معادل‌هایی در Python دارند — `--devtools-trace-granularity session|test` و `--devtools-trace-policy`، که در مورد دومی، مقادیر وابسته به تلاش مجدد به `retain-on-failure` تنزل می‌یابند، زیرا هیچ چیزی در آن کانال ارتباطی شماره تلاش را منتقل نمی‌کند. ردیف‌هایی که معادل Python ندارند، ردیف‌های مربوط به مصنوعات هر تست هستند: `screenshot`، `video` و پیوست درون‌خطی Allure. آنچه این آداپتور ثبت می‌کند - سفر در زمان DOM، نوار فیلم متراکم، درخت A11y و پوشش عنصر، دستورات، کنسول، شبکه، assertionها، کنترل‌های اجرا و Preserve & Rerun - در صفحه مخصوص خودش آمده است.

| قابلیت | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| حالت ردیابی + پخش‌کننده `show-trace` | ✅ | ✅ | ✅ |
| سفر در زمان DOM (ثبت تغییرات) | ✅ | ✅ ¹ | ✅ |
| زبانه A11y + پوشش انتخاب locator (پخش‌کننده ردیابی) | ✅ | ✅ | ✅ |
| رونوشت + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` برای هر تست | ✅ Allure درون‌خطی | ✅ Allure درون‌خطی | ⚠️ فقط تولید ² |
| تشخیص خودکار `emitArtifactsManifest` | ✅ | ✅ | ⚠️ فقط با فعال‌سازی دستی |
| `tracePolicy` وابسته به تلاش مجدد | ✅ | ✅ | ⚠️ فقط `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object؛ در BDD، `describe/it` به یک برش session فشرده می‌شود |
| تودرتویی Feature→Scenario→Step در Cucumber | Scenario→Step ⁴ | ✅ کامل | Feature→Scenario ⁵ |
| ثبت BiDi (کنسول / شبکه / استثناها) | ✅ خودکار | ✅ خودکار | ⚠️ با فعال‌سازی دستی (`bidi: true` + `webSocketUrl`) |
| Screencast (نوار فیلم / ویدیو) | CDP push | CDP push | فقط polling |
| زبانه A11y + پوشش در داشبورد زنده | ✅ | فقط پخش‌کننده ردیابی | فقط پخش‌کننده ردیابی |

¹ Selenium، DOM را برای هر ناوبری بازسازی می‌کند؛ زمان‌بندی نقاط اتصال تقریبی است (snapshot یک ناوبری ممکن است از دستوری که آن را آغاز کرده عقب بماند).
² Nightwatch هیچ API زنده‌ای برای پیوست Allure ندارد، بنابراین مصنوعات هر تست در دایرکتوری خروجی ردیابی نوشته و در manifest فهرست می‌شوند، اما به یک تست Allure پیوست نمی‌شوند.
³ گزینه `--retries` در Nightwatch یک تست را به‌صورت داخلی دوباره اجرا می‌کند بدون اینکه hookهای هر تست افزونه را دوباره فراخوانی کند، بنابراین سیاست‌های وابسته به تلاش مجدد (`on-first-retry`، `retain-on-first-failure`، …) به `retain-on-failure` تنزل می‌یابند.
⁴ WebdriverIO هنوز اطلاعات سلسله‌مراتب در سطح feature را منتقل نمی‌کند، بنابراین تودرتویی Cucumber در آن به‌صورت Scenario→Step است.
⁵ Nightwatch هنوز تودرتویی در سطح هر step را ثبت نمی‌کند (فقط Feature→Scenario).