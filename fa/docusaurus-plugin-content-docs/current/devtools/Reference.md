---
id: reference
title: مرجع پیکربندی
description: "همه گزینه‌های DevTools برای حالت زنده و حالت ردیابی را در آداپتورهای WebdriverIO، Selenium و Nightwatch، همراه با مقادیر پیش‌فرض، بیابید."
---

نگاهی یکجا به همه گزینه‌های DevTools در سه آداپتور. **نام، نوع و مقدار پیش‌فرض** گزینه‌ها در همه آداپتورها **یکسان است**؛ هر جا رفتار متفاوت باشد، به آن اشاره شده است. برای توضیح کامل هر گزینه ردیابی، بخش پیوند داده‌شده در صفحه [حالت ردیابی](/docs/devtools/wdio/trace-mode) را ببینید.

گزینه‌ها را به روشی که هر آداپتور می‌پذیرد ارسال کنید:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## گزینه‌های حالت و حالت زنده

| گزینه | نوع / مقادیر | پیش‌فرض | توضیحات |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` داشبورد رابط کاربری DevTools را باز می‌کند؛ `'trace'` از آن صرف‌نظر کرده و یک فایل خروجی قابل‌حمل می‌نویسد. این دو با هم ناسازگارند. |
| `port` | `number` | تصادفی | پورتی که رابط کاربری / بک‌اند DevTools به آن متصل می‌شود. فقط حالت زنده. |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور به آن متصل می‌شود. فقط حالت زنده. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ویدیوی پیوسته از نشست (`.webm`). فقط حالت زنده — برای حالت ردیابی از `video` استفاده کنید. [Screencast](/docs/devtools/wdio/screencast) را ببینید. |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | قابلیت‌هایی که برای باز کردن پنجره رابط کاربری DevTools استفاده می‌شوند. فقط WebdriverIO و حالت زنده. |

## گزینه‌های حالت ردیابی

فقط زمانی اعمال می‌شوند که `mode: 'trace'` باشد.

| گزینه | نوع / مقادیر | پیش‌فرض | جزئیات |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | یک بایگانی واحد در برابر یک پوشه باز‌شده. [قالب خروجی](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک ردیابی به ازای هر نشست / فایل spec / تست. مقدار `'test'` برای اسکرین‌شات/ویدیوی جداگانه برای هر تست و پیوست درون‌خطی Allure الزامی است. [دانه‌بندی ردیابی](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | کدام ردیابی‌ها نگه داشته شوند. همراه با `traceGranularity: 'test'` استفاده می‌شود. [نگهداری](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | ضبط پیوسته و فشرده صفحه در ردیابی برای پیمایش روان؛ `false` به ازای هر اقدام یک فریم ضبط می‌کند. [نوار فیلم فشرده](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | اسکرین‌شات برای هر تست (نیازمند `traceGranularity: 'test'`). گزینه سرویس WebdriverIO. [اسکرین‌شات و ویدیوی هر تست](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | بخش ویدیویی برای هر تست (نیازمند `traceGranularity: 'test'`). گزینه سرویس WebdriverIO. [اسکرین‌شات و ویدیوی هر تست](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | فایل `devtools-artifacts-<sessionId>.json` را می‌نویسد. هنگام شناسایی گزارش‌دهنده Allure به‌طور خودکار فعال می‌شود (در Nightwatch باید دستی فعال شود). [مانیفست فایل‌های خروجی](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | `node:assert` (و در صورت پشتیبانی، تطبیق‌دهنده‌های `expect` فریم‌ورک) را به‌عنوان اقدامات ردیابی ثبت می‌کند. [Assertionها](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## فقط Nightwatch

| گزینه | نوع / مقادیر | پیش‌فرض | توضیحات |
|---|---|---|---|
| `bidi` | `boolean` | `false` | فعال‌سازی ثبت WebDriver BiDi (کنسول + استثناهای JS + شبکه). نیازمند `webSocketUrl: true` در capabilities است. در WebdriverIO و Selenium، BiDi به‌طور خودکار متصل می‌شود. [Nightwatch → ثبت BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in) را ببینید. |

## تفاوت‌های هر آداپتور

برخی قابلیت‌های ردیابی در آداپتورهای خاصی محدودتر عمل می‌کنند — برای تصویر کامل، [ماتریس پشتیبانی میان‌فریم‌ورکی](/docs/devtools/cross-framework) را ببینید. موارد قابل‌توجه:

- **نگهداری مبتنی بر تلاش مجدد در Nightwatch** — فقط `retain-on-failure` قابل‌اعتماد است؛ سایر مقادیر `tracePolicy` به همین مقدار تنزل می‌یابند.
- **`describe/it` به سبک BDD در Nightwatch** — `traceGranularity: 'test'` به یک بخش واحد در سطح نشست تبدیل می‌شود.
- **پیوست Allure در Nightwatch** — `screenshot`/`video` برای هر تست فقط تولید می‌شوند (فایل‌ها + مانیفست) و به‌صورت درون‌خطی پیوست نمی‌شوند.