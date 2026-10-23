---
id: reference
title: مرجع پیکربندی
description: "همه گزینه‌های DevTools برای حالت زنده و حالت ردیابی را در آداپتورهای WebdriverIO، Selenium و Nightwatch به همراه مقادیر پیش‌فرض بیابید."
---

همه گزینه‌های DevTools در یک نگاه، در هر سه آداپتور. گزینه‌های مشترک در همه آداپتورها **نام، نوع و مقدار پیش‌فرض** یکسانی دارند؛ هر جا رفتار یا در دسترس بودن متفاوت باشد، به آن اشاره شده است و گزینه‌های مختص هر آداپتور به‌طور جداگانه فهرست شده‌اند. آداپتور Python هیچ شیء گزینه‌ای نمی‌پذیرد؛ زبانه‌های Python را در صفحه [Selenium](/docs/devtools/selenium#configuration-options) ببینید. برای توضیح کامل هر گزینه ردیابی، بخش پیوند داده‌شده در صفحه [حالت ردیابی](/docs/devtools/wdio/trace-mode) را ببینید.

گزینه‌ها را به همان شکلی که هر آداپتور می‌پذیرد ارسال کنید:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## گزینه‌های حالت و حالت زنده

| گزینه | نوع / مقادیر | پیش‌فرض | توضیحات |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` داشبورد رابط کاربری DevTools را باز می‌کند؛ `'trace'` آن را نادیده می‌گیرد و یک خروجی قابل‌حمل می‌نویسد. این دو با هم ناسازگارند. |
| `port` | `number` | `3000` (اگر اشغال باشد از یک پورت آزاد استفاده می‌شود) | پورتی که رابط کاربری / بک‌اند DevTools به آن متصل می‌شود. فقط در حالت زنده. |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور به آن متصل می‌شود. فقط در حالت زنده. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ویدیوی پیوسته جلسه (`.webm`). فقط در حالت زنده — برای حالت ردیابی از `video` استفاده کنید. شامل `maxBufferFrames` (پیش‌فرض `2000`)، یعنی سقف فریم‌های نگه‌داشته‌شده در حافظه. [Screencast](/docs/devtools/wdio/screencast) را ببینید. |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | قابلیت‌هایی که برای باز کردن پنجره رابط کاربری DevTools استفاده می‌شوند. WebdriverIO، فقط در حالت زنده. |

## گزینه‌های حالت ردیابی

فقط زمانی اعمال می‌شوند که `mode: 'trace'` باشد.

| گزینه | نوع / مقادیر | پیش‌فرض | جزئیات |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | یک بایگانی واحد در برابر یک پوشه باز‌شده. [قالب خروجی](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک ردیابی به ازای هر جلسه / فایل spec / تست. `'test'` برای اسکرین‌شات/ویدیوی هر تست و پیوست درون‌خطی Allure الزامی است. [دانه‌بندی ردیابی](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | کدام ردیابی‌ها نگه داشته شوند. همراه با `traceGranularity: 'test'` به کار می‌رود. [نگهداری](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | screencast متراکم و پیوسته درون ردیابی برای پیمایش روان؛ `false` به ازای هر اقدام یک فریم ضبط می‌کند. هنگام خروجی گرفتن به فریم‌هایی با فاصله حداقل ۱۰۰ میلی‌ثانیه و حداکثر حدود ۶۰۰ فریم کاهش می‌یابد. [نوار فیلم متراکم](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | اسکرین‌شات هر تست (نیازمند `traceGranularity: 'test'`). در WebdriverIO و Selenium به‌صورت درون‌خطی به Allure پیوست می‌شود؛ در Nightwatch فقط تولید می‌شود. [اسکرین‌شات و ویدیوی هر تست](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | بخش ویدیویی هر تست (نیازمند `traceGranularity: 'test'`؛ رمزگذاری نیازمند وجود `ffmpeg` در `PATH` است). در WebdriverIO و Selenium به‌صورت درون‌خطی به Allure پیوست می‌شود؛ در Nightwatch فقط تولید می‌شود. [اسکرین‌شات و ویدیوی هر تست](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | فایل `devtools-artifacts-<sessionId>.json` را می‌نویسد. هنگام تشخیص یک گزارشگر Allure به‌طور خودکار فعال می‌شود (در Nightwatch باید به‌صورت دستی فعال شود). [مانیفست خروجی‌ها](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | `node:assert` (و matcherهای `expect` فریم‌ورک در صورت پشتیبانی) را به‌عنوان اقدامات ردیابی ثبت می‌کند. [Assertionها](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## مختص Selenium (Node.js)

| گزینه | نوع / مقادیر | پیش‌فرض | توضیحات |
|---|---|---|---|
| `openUi` | `boolean` | `true` | پنجره داشبورد را به‌طور خودکار باز می‌کند. برای CI مقدار `false` را تنظیم کنید. |
| `headless` | `boolean` | `false` | مرورگر تست را به‌صورت headless (`--headless=old`) اجرا می‌کند. پنجره داشبورد تحت تأثیر قرار نمی‌گیرد. |
| `rerunCommand` | `string` | خودکار | قالب فرمان برای اجرای دوباره هر تست؛ `{{testName}}` جایگزین می‌شود. در صورت حذف، از argv اجراکننده استخراج می‌شود. |

## مختص Nightwatch

| گزینه | نوع / مقادیر | پیش‌فرض | توضیحات |
|---|---|---|---|
| `bidi` | `boolean` | `false` | فعال‌سازی اختیاری ثبت WebDriver BiDi (کنسول + استثناهای JS + شبکه). نیازمند `webSocketUrl: true` در capabilities است. در WebdriverIO و Selenium، BiDi به‌طور خودکار متصل می‌شود. [Nightwatch → ثبت BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in) را ببینید. |

## تفاوت‌های هر آداپتور

برخی از قابلیت‌های ردیابی در آداپتورهای خاصی محدود می‌شوند — برای تصویر کامل، [ماتریس پشتیبانی میان فریم‌ورک‌ها](/docs/devtools/cross-framework) را ببینید. موارد قابل‌توجه:

- **نگهداری مبتنی بر تلاش مجدد در Nightwatch** — فقط `retain-on-failure` قابل‌اعتماد است؛ سایر مقادیر `tracePolicy` به آن تنزل می‌یابند.
- **`describe/it` به سبک BDD در Nightwatch** — `traceGranularity: 'test'` به یک بخش واحد در سطح جلسه تقلیل می‌یابد.
- **پیوست Allure در Nightwatch** — `screenshot`/`video` هر تست فقط تولید می‌شوند (فایل‌ها + مانیفست) و به‌صورت درون‌خطی پیوست نمی‌شوند.