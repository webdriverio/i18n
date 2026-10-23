---
id: trace-mode
title: حالت Trace
description: "ثبت آرتیفکت‌های trace به‌صورت headless با حالت trace در DevTools و پیکربندی فرمت، دانه‌بندی، نگهداشت، اسکرین‌شات‌ها، ویدیو و assertionها."
---

مسیر ثبت headless — هیچ پنجره‌ی رابط کاربری DevTools باز نمی‌شود. در پایان نشست، آداپتر آرتیفکت‌های trace را در پوشه‌ی `test-results/` می‌نویسد: در WebdriverIO زیر `outputDir` (یا `rootDir`)، و در Selenium و Nightwatch در کنار فایل تست، و در صورت عدم امکان در پوشه‌ی پیکربندی و سپس پوشه‌ی جاری. برای دانه‌بندی `session` / `spec` خروجی یک `trace-<sessionId>.zip` (یا یک پوشه‌ی `trace-<sessionId>/`) است؛ برای دانه‌بندی `test` هر تست زیرپوشه‌ی مخصوص خود را دارد (به [دانه‌بندی Trace](#trace-granularity--tracegranularity) مراجعه کنید). این آرتیفکت قابل‌حمل است و هر آنچه برای بازپخش آفلاین، مقایسه (diff) توسط عامل‌های هوش مصنوعی، یا هر مصرف‌کننده‌ای که فایل را به رابط کاربری زنده ترجیح می‌دهد لازم است، در خود دارد.

حالت trace **با حالت live ناسازگار است**. برای هر نشست یکی را انتخاب کنید: انسان‌هایی که به‌صورت تعاملی دیباگ می‌کنند حالت live را می‌خواهند؛ عامل‌هایی که اجراها را مقایسه می‌کنند یا ربات‌های CI که آرتیفکت جمع‌آوری می‌کنند حالت trace را.

## فعال‌سازی

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

حالت trace به WebDriver BiDi (Chrome 114+، Firefox 130+) نیاز دارد که WebdriverIO آن را به‌طور خودکار فعال می‌کند.

برای امتحان، نمونه‌ی mocha را در حالت trace با `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha` اجرا کنید؛ برای نگهداشت به‌ازای هر تست، `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` را اضافه کنید. پیکربندی در [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts) قرار دارد.

Selenium و Nightwatch همان خط لوله‌ی trace را ارائه می‌دهند — برای نحوه‌ی فعال‌سازی مختص هر فریم‌ورک به صفحات آداپتر آن‌ها مراجعه کنید: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## محتویات آرتیفکت

| فایل | محتوا |
|---|---|
| `trace.trace` | رویدادهای NDJSON شامل `context-options` و رویدادهای اکشن `before` / `after`؛ هر رکورد در یک خط |
| `trace.network` | ورودی‌های شبکه به سبک HAR، هر کدام در یک خط؛ ورودی‌ای که از بافر Resource Timing صفحه خوانده شده باشد (بدون BiDi، مثلاً Safari یا Appium) دارای `_source: "resource-timing"` و `_resourceType` است |
| `trace.mutations` | جریان NDJSON تغییرات DOM که پشتوانه‌ی سفر در زمان DOM است؛ در صورتی که چیزی ثبت نشده باشد حذف می‌شود |
| `transcript.md` | خلاصه‌ی Markdown قابل‌خواندن برای انسان/LLM همراه با زمان‌بندی، selectorها و توضیحات مقادیر |
| `resources/page@<id>-<ts>.jpeg` | اسکرین‌شات گرفته‌شده در هر اکشن کاربرمحور |
| `resources/page@<id>-<ts>-elements.json` | فهرست تخت عناصر قابل‌تعامل در آن اکشن |
| `resources/page@<id>-<ts>-snapshot.txt` | اسنپ‌شات درخت دسترس‌پذیری با تورفتگی بر اساس عمق (مناسب برای AI) |
| `resources/<sha1>.jpeg` | فریم‌های فشرده‌ی filmstrip، آدرس‌دهی‌شده بر اساس محتوا |
| `resources/src@<sha1>.txt` | سورس تست ثبت‌شده برای تب Source |
| `resources/<sha1>` | بدنه‌ی پاسخ‌های شبکه، آدرس‌دهی‌شده بر اساس محتوا |

### چه چیزی «اکشن» محسوب می‌شود

دستورها پیش از تولید ورودی‌های trace از یک فهرست مجاز (allow-list) عبور داده می‌شوند. نمونه‌هایی که در trace ثبت می‌شوند:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`، `clear`، `selectByVisibleText`، …

یافتن locatorها (`$`، `$$`، `findElement(s)`)، polling مربوط به `executeScript` در Selenium و `clearValue` که `setValue` به‌صورت داخلی فراخوانی می‌کند، عمداً کنار گذاشته شده‌اند: این‌ها بیانگر قصد کاربر نیستند و خط زمانی را شلوغ می‌کنند. انتظارهای صریح (`waitFor*`، `waitUntil`، `waitForElement*` در Nightwatch)، خواندن عناصر (`getText`، `isDisplayed`، …) و `execute` نمایش داده می‌شوند. فهرست مجاز، `ACTION_MAP` در [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts) است.

## فرمت خروجی — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (پیش‌فرض) — یک آرشیو واحد در `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — همان فایل‌ها به‌صورت باز شده در `test-results/trace-<sessionId>/`. یک مرحله‌ی unzip کمتر برای مصرف‌کننده‌های اسکریپتی یا عامل‌محور که می‌خواهند NDJSON را مستقیماً grep یا stream کنند.

فایل `zip` در [پخش‌کننده‌ی `show-trace`](/docs/devtools/trace-player) رسمی باز می‌شود؛ trace با فرمت `ndjson-directory` در سایر نمایشگرهای سازگار trace باز می‌شود، یا ابتدا آن را zip کنید تا در `show-trace` باز شود.

## دانه‌بندی Trace — `traceGranularity`

تعداد آرتیفکت‌های trace که یک اجرا تولید می‌کند:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| مقدار | خروجی |
|---|---|
| `session` (پیش‌فرض) | یک trace برای هر worker/نشست — `test-results/trace-<sessionId>.zip`. |
| `spec` | یک trace برای هر فایل spec، در `test-results/trace-<spec>-<hash>-<sessionId8>.zip`. کوچک‌تر و پیمایش آن آسان‌تر. |
| `test` | یک trace **برای هر تست**، هر کدام در پوشه‌ی مخصوص خود: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

برای دانه‌بندی `test` نام پوشه از نام پایه‌ی spec، یک slug از عنوان تست، مرورگر، و پسوند `-retry<N>` برای تلاش‌های مجدد ساخته می‌شود — مثلاً `test-results/login_e2e-logs-in-chrome/trace.zip`، و اولین تلاش مجدد در `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. traceهای به‌ازای هر تست بیشترین قابلیت پیمایش را دارند و بهترین ترکیب را با یک سیاست نگهداشت دارند تا فقط traceهایی که برایتان مهم‌اند نوشته شوند.

## نگهداشت — `tracePolicy`

به‌طور پیش‌فرض همه‌ی traceها نگه داشته می‌شوند (`'on'`). برای نگه‌داشتن فقط موارد جالب — ایده‌آل همراه با `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| سیاست | trace را نگه می‌دارد وقتی… |
|---|---|
| `'on'` (پیش‌فرض) | همیشه — همه‌ی traceها نوشته می‌شوند. |
| `'retain-on-failure'` | تلاش **نهایی** تست شکست خورده باشد. دنباله‌ی شکست-سپس-موفقیت با `passed` پایان می‌یابد، بنابراین نگه داشته *نمی‌شود* — یک تست ناپایدار (flake) را که در نهایت سبز شده بیش از حد نگه نمی‌دارید. |
| `'retain-on-first-failure'` | **تلاش 0** شکست خورده باشد، صرف‌نظر از اینکه تلاش مجدد بعدی موفق شده باشد یا نه. |
| `'on-first-retry'` | تست حداقل یک بار مجدداً اجرا شده باشد (تلاش 1 وجود داشته باشد). |
| `'on-all-retries'` | هر تلاش مجددی (تلاش ≥ 1) وجود داشته باشد. |
| `'retain-on-failure-and-retries'` | تلاش نهایی شکست خورده باشد **یا** تست مجدداً اجرا شده باشد. |

برشی که نگه داشته نمی‌شود، رد شده و هرگز روی دیسک نوشته نمی‌شود. سیاست‌های آگاه از تلاش مجدد بر اساس یک **دفتر نتایج** به‌ازای هر تلاش عمل می‌کنند که آداپتر برای هر شناسه‌ی تست پایدار در برابر تلاش مجدد نگه می‌دارد، تا `retain-on-failure` و `retain-on-first-failure` تلاش درست را ارزیابی کنند. در جایی که runner اطلاعات تلاش مجدد به‌ازای هر تلاش را در اختیار نمی‌گذارد، همه‌ی سیاست‌ها به‌جز `retain-on-failure` به `retain-on-failure` تنزل می‌یابند؛ اجرایی که هیچ نتیجه‌ای در آن مشاهده نشده (مثلاً یک اسکریپت مستقل ساده) به‌صورت **باز** شکست می‌خورد و trace را نگه می‌دارد تا خطر حذف traceی که نیاز دارید وجود نداشته باشد.

> نگهداشت آگاه از تلاش مجدد به‌صورت end-to-end برای **WebdriverIO** (mocha / cucumber) و **Selenium** (mocha) تأیید شده است. برای **Nightwatch**، `retain-on-failure` کار می‌کند، اما سایر سیاست‌های آگاه از تلاش مجدد به آن تنزل می‌یابند، زیرا `--retries` در Nightwatch یک testcase را به‌صورت داخلی دوباره اجرا می‌کند بدون اینکه hookهای به‌ازای هر تست را دوباره فراخوانی کند. `specFileRetries` بین‌پردازه‌ای WDIO نیز خارج از دفتر (به‌ازای هر worker) قرار می‌گیرد. برای جزئیات به [صفحه‌ی آداپتر Nightwatch](/docs/devtools/nightwatch#trace-mode) مراجعه کنید.

## Filmstrip فشرده — `filmstrip`

**به‌طور پیش‌فرض** trace یک screencast **فشرده و پیوسته** ضبط می‌کند تا پخش‌کننده هنگام جابه‌جایی، پخشی روان ارائه دهد به‌جای پرش از فریمی به فریم دیگر. فریم‌های فشرده در کنار فریم‌های به‌ازای هر اکشن (که اسنپ‌شات‌های DOM را در خود دارند) قرار می‌گیرند. برای ضبط فقط یک فریم به‌ازای هر اکشن، `filmstrip: false` را تنظیم کنید — یک trace کوچک‌تر بدون ضبط‌کننده‌ی پیوسته:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- فریم‌های فشرده **در کنار** فریم‌های به‌ازای هر اکشن (که اسنپ‌شات‌های DOM را در خود دارند) اضافه می‌شوند، بنابراین هیچ داده‌ی DOM از دست نمی‌رود — وقتی فریم‌های فشرده وجود دارند، برای جابه‌جایی جایگزین filmstrip پراکنده‌ی به‌ازای هر اکشن می‌شوند.
- فریم‌ها هنگام export کم می‌شوند (حداقل ۱۰۰ میلی‌ثانیه فاصله) و بر اساس محتوا آدرس‌دهی می‌شوند، بنابراین فریم‌های یکسان (یک انتظار ایستا) به یک منبع تبدیل می‌شوند. بافر نشست زنده با `screencast.maxBufferFrames` (پیش‌فرض 2000) محدود می‌شود.
- ضبط از ضبط‌کننده‌ی screencast استفاده می‌کند — push از طریق CDP در Chrome/Chromium، و polling اسکرین‌شات در جاهای دیگر. در مرورگرهای غیر Chrome، polling دستورهای `takeScreenshot` زیادی صادر می‌کند؛ آن را با گزینه‌ی بی‌صدا کردن گام‌ها در reporter خود ترکیب کنید (به [یکپارچه‌سازی Allure](/docs/devtools/allure) مراجعه کنید).

`filmstrip` در هر سه آداپتر (WebdriverIO / Selenium / Nightwatch) در دسترس است.

## اسکرین‌شات و ویدیو به‌ازای هر تست — `screenshot` / `video`

در `traceGranularity: 'test'` هر تست می‌تواند یک اسکرین‌شات مستقل و/یا یک برش ویدیویی به‌ازای هر تست نیز تولید کند، مشابه کارکرد آشنای اسکرین‌شات/ویدیو هنگام شکست:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| گزینه | مقادیر | رفتار |
|---|---|---|
| `screenshot` | `'off'` (پیش‌فرض) · `'on'` · `'only-on-failure'` | `'on'` پس از هر تست ثبت می‌کند؛ `'only-on-failure'` فقط پس از یک تست ناموفق. PNG. |
| `video` | `'off'` (پیش‌فرض) · هر مقدار `tracePolicy` | screencast را به‌صورت پیوسته ضبط می‌کند و برش هر تست را طبق همان معناشناسی نگهداشت `tracePolicy` نگه می‌دارد. WebM؛ رمزگذاری نیازمند `ffmpeg` روی `PATH` است. تنظیم یک مقدار غیر `off` به‌تنهایی ضبط‌کننده را راه‌اندازی می‌کند — نیازی به `filmstrip` یا `screencast.enabled` ندارید. |

هر دو به حالت trace + `traceGranularity: 'test'` (محدوده‌ی به‌ازای هر تست که به آن متصل می‌شوند) محدود هستند. در دانه‌بندی‌های درشت‌تر هیچ کاری انجام نمی‌دهند.

- **WebdriverIO** — `screenshot` / `video` گزینه‌های سرویس هستند؛ وقتی `@wdio/allure-reporter` وجود داشته باشد به‌صورت درون‌خطی به Allure پیوست می‌شوند.
- **Selenium** — همین گزینه‌ها در `DevToolsOptions` آن؛ وقتی یک آداپتر runner مربوط به Allure فعال باشد، از طریق `allure-js-commons` به‌صورت درون‌خطی به Allure پیوست می‌شوند.
- **Nightwatch** — **فقط تولید**: فایل‌ها در پوشه‌ی خروجی trace نوشته می‌شوند (و در manifest فهرست می‌شوند)، اما به‌صورت درون‌خطی به Allure پیوست نمی‌شوند — Nightwatch هیچ API زنده‌ای برای پیوست به Allure ندارد. به [محدودیت‌های حالت Trace](/docs/devtools/limitations) مراجعه کنید.

> `screencast.enabled` ضبط پیوسته‌ی جداگانه‌ی `.webm` در **حالت live** است و در حالت trace نادیده گرفته می‌شود. در حالت trace از `filmstrip` (فریم‌های فشرده درون trace) یا `video` به‌ازای هر تست استفاده کنید؛ فیلدهای تنظیم screencast (`quality`، `maxWidth`، `pollIntervalMs`، …) همچنان برای هر ضبط‌کننده‌ای که اجرا شود اعمال می‌شوند.

## Manifest آرتیفکت‌ها — `emitArtifactsManifest`

یک فایل `devtools-artifacts-<sessionId>.json` در کنار trace می‌نویسد — یک فهرست عمومی که reporterها و CI برای یافتن آرتیفکت‌های تولیدشده (همه‌ی traceها / اسکرین‌شات‌ها / ویدیوها، به‌علاوه‌ی وضعیت هر تست) از آن استفاده می‌کنند:

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **به‌طور پیش‌فرض خاموش است.** وقتی یک reporter مربوط به Allure شناسایی شود **به‌طور خودکار فعال می‌شود** — `@wdio/allure-reporter` در پیکربندی WebdriverIO، یا یک runtime فعال `allure-js-commons` در Selenium.
- **Nightwatch اختیاری است**: هیچ سیگنال زنده‌ای از Allure برای شناسایی خودکار ندارد (`nightwatch-allure` پس از اجرا عمل می‌کند)، بنابراین هرگز به‌طور خودکار فعال نمی‌شود — اگر manifest را می‌خواهید، آن را صراحتاً تنظیم کنید.

## Assertionها — `captureAssertions`

Assertionها به‌صورت ردیف‌های اکشن درجه‌یک در trace نمایش داده می‌شوند (به‌طور پیش‌فرض فعال؛ برای غیرفعال کردن `captureAssertions: false` را تنظیم کنید):

- **`node:assert`** — در هر سه آداپتر به‌صورت ردیف‌های `assert.<method>` ثبت می‌شود.
- **`expect` در WebdriverIO** — matcherهای `expect(...)` موفق *و* ناموفق (`expect($el).toHaveText(...)`، `toBeExisting()`، …) به‌صورت ردیف‌های `expect.<matcher>` نمایش داده می‌شوند که مقدار مورد انتظار، محل سورس عنصر و یک اسنپ‌شات را در خود دارند؛ دستورهای polling داخلی matcher سرکوب می‌شوند تا فقط assertion نمایش داده شود.
- **`browser.assert.*` / `browser.verify.*` در Nightwatch** — assertionهای بومی به‌صورت ردیف‌های `assert.<m>` / `verify.<m>` نمایش داده می‌شوند.

Assertionهای موفق سبز و assertionهای ناموفق قرمز همراه با پیام خطا نمایش داده می‌شوند.

## تست موبایل

نشست‌های Appium در حالت live و trace ثبت می‌شوند. عامل تمایز، **نام مرورگر** در capabilityهاست، نه دستگاه:

- **وب موبایل** (Chrome در Android، Safari در iOS): همان خط لوله‌ی اسنپ‌شات مبتنی بر DOM مانند دسکتاپ.
- **اپلیکیشن بومی** (بدون `browserName`): اسکریپت‌های DOM تزریق‌شده به صفحه غیرفعال می‌شوند؛ به‌جای آن درخت XML مربوط به Appium به serializer اسنپ‌شات داده می‌شود.
- **اپلیکیشن هیبریدی**: فقط WebdriverIO نشست را به درون webview آن دنبال می‌کند؛ سایر آداپترها بر اساس capabilityهای زمان راه‌اندازی تصمیم می‌گیرند.

`context-options` در trace، پلتفرم، مدل و نسخه‌ی سیستم‌عامل را ثبت می‌کند تا نمایشگر فریم‌ها را به‌درستی برچسب‌گذاری کند. نمونه‌ها را با `pnpm demo:wdio:mobile` (و همچنین `:selenium:mobile`، `:nightwatch:mobile`، `:python:mobile`) اجرا کنید. برای مرجع کامل به **[تست موبایل](/docs/devtools/mobile)** مراجعه کنید.

## مشاهده‌ی آرتیفکت

یک trace را در **[پخش‌کننده‌ی Trace](/docs/devtools/trace-player)** رسمی باز کنید — رابط کاربری WebdriverIO DevTools در یک حالت پخش‌کننده‌ی اختصاصی فقط‌خواندنی:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

پخش‌کننده امکان سفر در زمان DOM، تب A11y و لایه‌ی انتخاب locator، تب Transcript همراه با Copy-for-LLM، تب‌های Errors / Console / Network / Source و یک خط زمانی قابل جابه‌جایی را در اختیارتان می‌گذارد. همان فایل قابل‌حمل `.zip` در سایر نمایشگرهای مستقل trace و در نمایشگر جاسازی‌شده‌ی گزارش Allure نیز باز می‌شود. برای راهنمای کامل، ویژگی‌ها و میانبرهای صفحه‌کلید به صفحه‌ی **[پخش‌کننده‌ی Trace](/docs/devtools/trace-player)** مراجعه کنید.

## Locatorها در تب A11y

bin مربوط به `show-trace` که هر آداپتر ارائه می‌دهد، همان آرشیو را در پخش‌کننده‌ی DevTools باز می‌کند که علاوه بر آن یک **تب A11y** نیز دارد: درخت دسترس‌پذیری ثبت‌شده به‌ازای هر اکشن، که با کلیک روی یک ردیف، locator آن عنصر کپی می‌شود.

این locatorها به گویش خود runner ضبط‌کننده نوشته می‌شوند، بنابراین مستقیماً در فریم‌ورکی که trace را تولید کرده قابل paste هستند. عنصری که فقط با متنش شناسایی می‌شود در WebdriverIO به‌صورت `a*=Logout` و در Selenium به‌صورت `//a[contains(., "Logout")]` است — همراه با عنوان فراخوانی‌ای که آن را resolve می‌کند، یعنی `By.xpath()`. Nightwatch یک locator بومی CSS مانند `button[type="submit"]` را ترجیح می‌دهد، زیرا تنها runnerی است که یک رشته‌ی selector ساده را تحت استراتژی پیش‌فرض CSS می‌خواند، و فقط زمانی که هیچ locator یکتای CSS وجود نداشته باشد به XPath (با عنوان `useXpath()` / `locateStrategy: 'xpath'`) بازمی‌گردد. سایر locatorها CSS قابل‌حمل هستند.

برای مصرف توسط LLM / عامل‌ها، `transcript.md` را مستقیماً بخوانید — یک نمایش فشرده‌ی Markdown از اکشن‌ها همراه با selectorها و مقادیر است.

## بیشتر بدانید

- **[پخش‌کننده‌ی Trace](/docs/devtools/trace-player)** — راهنمای کامل پخش‌کننده‌ی `show-trace`، ویژگی‌ها و میانبرهای صفحه‌کلید.
- **[یکپارچه‌سازی Allure](/docs/devtools/allure)** — نحوه‌ی پیوست آرتیفکت‌های trace / اسکرین‌شات / ویدیو به گزارش Allure.
- **[پشتیبانی چندفریم‌ورکی](/docs/devtools/cross-framework)** — ماتریس قابلیت‌ها به‌ازای هر آداپتر (WebdriverIO / Selenium / Nightwatch).
- **[محدودیت‌های حالت Trace](/docs/devtools/limitations)** — آنچه حالت trace نادیده می‌گیرد و کمبودهای شناخته‌شده‌ی هر آداپتر.
- **[مرجع پیکربندی](/docs/devtools/reference)** — همه‌ی گزینه‌ها در یک نگاه.