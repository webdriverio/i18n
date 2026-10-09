---
id: nightwatch
title: DevTools برای Nightwatch
description: "رابط کاربری اشکال‌زدایی DevTools را بدون تغییر در تست‌ها به مجموعه تست Nightwatch اضافه کنید و ضبط صفحه (screencast)، ثبت BiDi و حالت trace را پیکربندی کنید."
---

آداپتور Nightwatch برای [WebdriverIO DevTools](https://github.com/webdriverio/devtools)، همان رابط کاربری اشکال‌زدایی بصری را بدون هیچ تغییری در کد تست‌ها به مجموعه تست Nightwatch شما می‌آورد.

## نصب

```bash
npm install @wdio/nightwatch-devtools
```

## راه‌اندازی

### Nightwatch استاندارد (سبک mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // برای ثبت درخواست‌های شبکه الزامی است
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

تست‌های خود را مثل همیشه اجرا کنید؛ رابط کاربری DevTools به‌طور خودکار در یک پنجره جدید مرورگر باز می‌شود:

```bash
nightwatch
```

> هیچ تغییری در فایل‌های تست شما لازم نیست.

### Cucumber / BDD

`cucumberHooksPath` را در کنار export اصلی import کنید و آن را به گزینه `require` در Cucumber بدهید. این کار هوک‌های سناریوی `Before` / `After` را ثبت می‌کند که رفتار `beforeScenario` / `afterScenario` در سرویس WebdriverIO را بازتاب می‌دهند.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- ثبت هوک‌های Cucumber مربوط به DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## گزینه‌های پیکربندی

| گزینه | نوع | پیش‌فرض | توضیحات |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | پورت سرور بک‌اند DevTools. اگر از قبل در حال استفاده باشد، به‌طور خودکار یک واحد افزایش می‌یابد. |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور بک‌اند به آن متصل می‌شود. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ضبط ویدیوی `.webm` برای هر نشست. به بخش [ضبط صفحه](#screencast) در ادامه مراجعه کنید. |
| `bidi` | `boolean` | `false` | فعال‌سازی اختیاری ثبت WebDriver BiDi برای کنسول مرورگر + استثناهای JS + شبکه. به `webSocketUrl: true` در capabilities و یک chromedriver با پشتیبانی از BiDi نیاز دارد. هنگام اتصال، مسیر شبکه مبتنی بر perf-log کروم برای هر فرمان غیرفعال می‌شود تا درخواست‌ها تکراری نشوند. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` رابط کاربری DevTools را باز می‌کند؛ `trace` آن را نادیده می‌گیرد و به‌جای آن یک فایل خروجی قابل حمل می‌نویسد. به [حالت Trace](/docs/devtools/wdio/trace-mode) مراجعه کنید. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ساختار فایل خروجی trace. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک trace برای هر نشست / فایل spec / تست. `'test'` هر کدام را در `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` می‌نویسد. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. به [حالت Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) مراجعه کنید. **هشدار:** رابط BDD `describe/it` به یک برش واحد در سطح نشست تقلیل می‌یابد (به [برش‌بندی برای هر تست](#per-test-slicing--the-bdd-describeit-caveat) مراجعه کنید). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | اینکه کدام traceها نگه داشته شوند. همراه با `traceGranularity: 'test'` به کار می‌رود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `filmstrip` | `boolean` | `true` | ضبط یک نوار فیلم (filmstrip) پیوسته و متراکم از صفحه در trace برای پخش قابل پیمایش در پخش‌کننده trace — نه فقط یک فریم برای هر اقدام. ضبط‌کننده صفحه (در Nightwatch به حالت polling) را برای نشست اجرا می‌کند. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | اسکرین‌شات برای هر تست. فقط در حالت trace + `traceGranularity: 'test'`. **فقط تولید** — فایل PNG در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شود؛ به‌صورت درون‌خطی به Allure پیوست نمی‌شود (به یادداشت زیر مراجعه کنید). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | برش ویدیویی برای هر تست که طبق سیاست داده‌شده نگه داشته می‌شود (مثلاً `'retain-on-failure'`). فقط در حالت trace + `traceGranularity: 'test'`. مقداری غیر از `off` خودش ضبط‌کننده صفحه را راه‌اندازی می‌کند — **نیازی** به `filmstrip` یا `screencast.enabled` ندارید. **فقط تولید** — فایل `.webm` در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شود؛ به‌صورت درون‌خطی به Allure پیوست نمی‌شود. |
| `emitArtifactsManifest` | `boolean` | `false` | نوشتن manifest با نام `devtools-artifacts-<sessionId>.json` (فهرست عمومی که گزارش‌گرها/CI برای یافتن فایل‌های تولیدشده از آن استفاده می‌کنند) در کنار trace. **برای Nightwatch اختیاری است** — هیچ سیگنال زنده‌ای از Allure برای تشخیص خودکار ندارد، بنابراین برخلاف WDIO/Selenium هرگز به‌طور خودکار فعال نمی‌شود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `captureAssertions` | `boolean` | `true` | ثبت assertionها به‌صورت ردیف‌های اقدام در trace — `node:assert` به همراه `browser.assert`/`browser.verify` بومی، از جمله matcherهای منفی `.not.*`. برای غیرفعال‌سازی، `false` قرار دهید. |

> **پیوست درون‌خطی Allure برای Nightwatch پشتیبانی نمی‌شود.** گزارش‌گر رسمی `nightwatch-allure` آن پس از اجرا کار می‌کند (API پیوست زنده ندارد) و `attachment()` در `allure-js-commons` در اجرای Nightwatch هیچ کاری انجام نمی‌دهد. بنابراین فایل‌های `screenshot` / `video` در پوشه خروجی trace *تولید* می‌شوند (فایل‌ها، به‌علاوه manifest فایل‌ها هنگامی که `emitArtifactsManifest: true` باشد) اما به تست Allure پیوست نمی‌شوند. برش‌بندی برای هر تست — و در نتیجه این فایل‌ها — برای رابط‌های Cucumber و exports-object معنادار است؛ رابط BDD `describe/it` به سطح نشست تقلیل می‌یابد، بنابراین دروازه هر تست در آنجا هیچ کاری انجام نمی‌دهد.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## ضبط صفحه

یک ویدیوی پیوسته `.webm` از نشست مرورگر ضبط کنید. ضبط از اولین نشستی که افزونه می‌بیند آغاز می‌شود و در هوک `after()` در Nightwatch نهایی می‌شود.

**فقط حالت polling.** Nightwatch برخلاف WebdriverIO (`browser.getPuppeteer()`) و Selenium (`driver.createCDPConnection`) راه دسترسی پایداری به CDP ارائه نمی‌دهد، بنابراین ضبط صفحه با فراخوانی `browser.takeScreenshot()` در فواصل زمانی ثابت فریم‌ها را ثبت می‌کند. روی همه مرورگرهایی که Nightwatch پشتیبانی می‌کند کار می‌کند.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| گزینه | نوع | پیش‌فرض | نکات |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | کلید اصلی. |
| `pollIntervalMs` | `number` | `200` | فاصله زمانی اسکرین‌شات‌ها (میلی‌ثانیه). مقدار کمتر = ویدیوی روان‌تر و رفت‌وبرگشت‌های بیشتر WebDriver. ۲۰۰ میلی‌ثانیه ≈ ۵ فریم بر ثانیه. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | قالب پیکسلی هر فریم که پیش از mux نهایی `.webm` به رمزگذار ffmpeg داده می‌شود. در حالت polling اسکرین‌شات‌های منبع همیشه به‌صورت PNG ثبت می‌شوند، بنابراین این گزینه ثبت را تغییر **نمی‌دهد** - فقط قالبی را که رمزگذار برای هر فریم دریافت می‌کند تغییر می‌دهد. |
| `maxWidth` / `maxHeight` / `quality` | - | - | گزینه‌های مخصوص CDP که در حالت polling نادیده گرفته می‌شوند. برای سازگاری ساختاری با آداپتورهای WDIO/Selenium فهرست شده‌اند. |

**پیش‌نیازها:** `fluent-ffmpeg` (که از قبل وابستگی زمان اجرای بسته است) به‌علاوه فایل اجرایی `ffmpeg` در PATH. در macOS: `brew install ffmpeg`. در Linux: `apt install ffmpeg`. بدون ffmpeg ضبط‌کننده همچنان اجرا می‌شود، اما مرحله رمزگذاری یک هشدار ثبت می‌کند و از نوشتن فایل صرف‌نظر می‌کند.

**خروجی:** فایل ویدیو در کنار فایل تستی که اجرا شده نوشته می‌شود (با پوشه `nightwatch.conf.*` به‌عنوان جایگزین، و سپس `process.cwd()` به‌عنوان آخرین گزینه). مسیر کامل در خط لاگ Nightwatch با عنوان `📹 Screencast video: <path>` نمایش داده می‌شود و ویدیو همچنین به زبانه Screencast داشبورد استریم می‌شود.

برای مرجع کامل قابلیت ضبط صفحه (پشتیبانی مرورگرها، مسیرهای خروجی در هر سه آداپتور)، به [صفحه Screencast](/docs/devtools/wdio/screencast) مراجعه کنید.

## ثبت BiDi (اختیاری)

ثبت WebDriver BiDi را برای پیام‌های کنسول مرورگر، استثناهای JS و درخواست‌های شبکه فعال کنید. معادل مسیری است که selenium-devtools استفاده می‌کند - هر دو آداپتور منطق اتصال یکسانی را در `@wdio/devtools-core` به اشتراک می‌گذارند.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

همچنین به `webSocketUrl: true` در capabilities نیاز دارید تا chromedriver واقعاً کانال BiDi را در دسترس قرار دهد:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← فعال‌سازی BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

هنگامی که BiDi متصل است، مسیر ثبت شبکه مبتنی بر performance-log کروم برای هر فرمان غیرفعال می‌شود تا درخواست‌ها دو بار در داشبورد ظاهر نشوند. اگر `webSocketUrl` وجود نداشته باشد یا نسخه chromedriver از BiDi پشتیبانی نکند، اتصال بی‌صدا شکست می‌خورد و مسیر جایگزین perf-log به کار خود ادامه می‌دهد.

## حالت Trace

مسیر ثبت بدون رابط کاربری — هیچ پنجره رابط کاربری DevTools باز نمی‌شود. در پایان نشست، آداپتور یک فایل قابل حمل `trace-<sessionId>.zip` (یا پوشه) را در پوشه `test-results/` (در کنار پوشه تست / پیکربندی شناسایی‌شده) می‌نویسد که ساختاری مشابه فایل خروجی trace در WebdriverIO دارد.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختیاری؛ پیش‌فرض 'zip'
})
```

### سطح جزئیات و Cucumber

`traceGranularity` تعیین می‌کند هر فایل خروجی چه چیزی را پوشش دهد — `'session'` (پیش‌فرض)، `'spec'` یا `'test'`.

Nightwatch پس از هر سناریوی Cucumber مرورگر را می‌بندد. یک trace از نوع `'session'` همه این‌ها را در بر می‌گیرد: یک فایل zip برای کل اجرا، که هر سناریو زیر feature خود تودرتو شده است. `'test'` برای هر سناریو یک فایل zip در پوشه مخصوص خودش می‌نویسد که برای Cucumber توصیه می‌شود — فایل‌های خروجی کوچک‌تر، و سطح جزئیاتی که نگهداری `tracePolicy` بر اساس آن عمل می‌کند.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // یک trace برای هر سناریوی Cucumber
})
```

در رابط BDD `describe/it`، گزینه `'test'` به یک برش واحد در سطح نشست تقلیل می‌یابد: Nightwatch هر `it()` را به‌صورت داخلی اجرا می‌کند و هوک هر تست افزونه را فقط یک بار برای هر ماژول فراخوانی می‌کند. درخت اقدامات همچنان هر `it` را به‌عنوان یک گروه جداگانه نشان می‌دهد.

اتصال پورت بک‌اند، پنجره رابط کاربری و گزینه `screencast` همگی در حالت trace نادیده گرفته می‌شوند. برای مرجع کامل این قابلیت (محتوای فایل خروجی، نمایشگر، تست موبایل، زمان انتخاب `zip` در مقابل `ndjson-directory`)، به [صفحه حالت Trace](/docs/devtools/wdio/trace-mode) مراجعه کنید.

Nightwatch همان خط لوله trace را با آداپتورهای WebdriverIO و Selenium به اشتراک می‌گذارد، بنابراین ساختار فایل خروجی صرف‌نظر از اینکه کدام آداپتور آن را تولید کرده، یکسان است. یک trace از Nightwatch ثبت کامل هر اقدام را در خود دارد — یک اسکرین‌شات، snapshot درخت دسترس‌پذیری با تورفتگی بر اساس عمق، فهرست عناصر قابل تعامل و متن رونوشت Markdown — بنابراین در پخش‌کننده `show-trace` با قابلیت سفر در زمان DOM/snapshot، زبانه‌های **A11y** و **Transcript**، لایه عنصر انتخاب locator و (برای Cucumber) تودرتویی **Feature → Scenario → Step** باز می‌شود.

یک trace را با فایل اجرایی `show-trace` که همراه `@wdio/nightwatch-devtools` ارائه می‌شود (بدون وابستگی اضافی) باز کنید:

```sh
npx show-trace test-results/trace-<sessionId>.zip   # در پروژه‌ای که آداپتور را نصب کرده است
pnpm show-trace test-results/trace-<sessionId>.zip  # از monorepo مربوط به devtools
```

برای راهنمای کامل و میانبرهای صفحه‌کلید، به صفحه [پخش‌کننده Trace](/docs/devtools/trace-player) مراجعه کنید.

### برش‌بندی برای هر تست و هشدار BDD `describe/it`

گزینه‌های مربوط به هر تست — `traceGranularity: 'test'` و گزینه‌های `tracePolicy`، `screenshot` و `video` که همراه آن به کار می‌روند — برای برش زدن بخش مربوط به هر تست به یک هوک برای هر تست نیاز دارند. رابط **exports-object (سبک mocha)** و **Cucumber** (هوک‌های هر سناریو) چنین هوکی را ارائه می‌دهند، بنابراین برش‌بندی واقعی برای هر تست دریافت می‌کنند. رابط **BDD `describe/it`** استثناست: Nightwatch هر `it()` را به‌صورت داخلی اجرا می‌کند و هوک هر تست افزونه را فقط یک بار برای هر ماژول فراخوانی می‌کند، بنابراین `traceGranularity: 'test'` به یک برش واحد **در سطح نشست** تقلیل می‌یابد که به اولین تست مرتبط می‌شود. manifest فایل‌ها همچنان هر testcase را با وضعیت صحیح آن فهرست می‌کند؛ فقط کلیدگذاری برش/فایل هر تست تقلیل می‌یابد. traceهای سطح نشست و سطح spec تحت تأثیر قرار نمی‌گیرند.

## نمونه‌ها

نمونه‌های کاربردی در پوشه سطح بالای `examples/` در مخزن قرار دارند. یک بار workspace را بسازید (`pnpm install && pnpm build`)، سپس از ریشه مخزن اجرا کنید:

| پوشه | اجراکننده | فرمان |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch سبک mocha | `pnpm demo:nightwatch` |

## قابلیت‌ها

آداپتور Nightwatch همان تجربه رابط کاربری DevTools را مانند WebdriverIO ارائه می‌دهد. هر قابلیت زیر با راه‌اندازی پایه `globals: nightwatchDevtools({ port: 3000 })` به‌طور خودکار ثبت می‌شود — بدون پیکربندی جداگانه برای هر قابلیت (لاگ‌های شبکه علاوه بر این به `'goog:loggingPrefs': { performance: 'ALL' }` نیاز دارند که در [راه‌اندازی](#setup) نشان داده شده است). پیوندها به مرجع کامل هر قابلیت می‌روند.

- **[اجرای مجدد تعاملی تست‌ها و بصری‌سازی](/docs/devtools/wdio/interactive-test-rerunning)** - پیش‌نمایش زنده مرورگر، اسکرین‌شات برای هر فرمان و اجرای مجدد تست/مجموعه با یک کلیک
- **[حفظ و اجرای مجدد (مقایسه)](/docs/devtools/wdio/preserve-and-rerun)** - گرفتن snapshot از یک تست ناموفق، اجرای مجدد آن و مقایسه دو اجرا در کنار هم
- **[پشتیبانی از چند فریم‌ورک](/docs/devtools/wdio/multi-framework-support)** - اجراکننده‌های استاندارد (سبک mocha) و Cucumber/BDD
- **[لاگ‌های کنسول](/docs/devtools/wdio/console-logs)** - ثبت و بررسی خروجی کنسول مرورگر (به‌صورت بلادرنگ با `bidi: true`)
- **[لاگ‌های شبکه](/docs/devtools/wdio/network-logs)** - پایش فراخوانی‌های API و فعالیت شبکه
- **[فراداده](/docs/devtools/wdio/metadata)** - capabilities نشست، محیط و زمان‌بندی برای هر نشست مرورگر
- **[TestLens](/docs/devtools/wdio/testlens)** - پرش از هر فرمان به خط کد منبعی که آن را فراخوانی کرده است
- **[ضبط صفحه نشست](/docs/devtools/wdio/screencast)** - ضبط پیوسته `.webm` از نشست مرورگر
- **[حالت Trace](/docs/devtools/wdio/trace-mode)** - ثبت بدون رابط کاربری که یک فایل قابل حمل `trace.zip` تولید می‌کند (بدون پنجره رابط کاربری)

ضبط صفحه تنها قابلیتی است که گزینه‌های مخصوص به خود را دارد (فهرست کامل در بخش [ضبط صفحه](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## محدودیت‌ها

Nightwatch هوک‌های فریم‌ورکی به عمق WebdriverIO ارائه نمی‌دهد، بنابراین چند تفاوت با سرویس WDIO DevTools وجود دارد:

| محدودیت | جزئیات |
|-----------|--------|
| نبود هوک‌های بومی فرمان | Nightwatch هوک `beforeCommand` / `afterCommand` ندارد. به‌جای آن، فرمان‌ها از طریق یک پوشش proxy روی مرورگر رهگیری می‌شوند. |
| زمینه محدود تست | `browser.currentTest` فراداده کمتری نسبت به زمینه اجراکننده WDIO ارائه می‌دهد؛ نام تست‌ها و مسیر فایل‌ها به روش‌های اکتشافی اضافی نیاز دارند. |
| تودرتویی تخت مجموعه‌ها | Nightwatch به‌طور بومی از بلوک‌های `describe` با چند سطح تودرتویی پشتیبانی نمی‌کند؛ افزونه حداکثر دو سطح را گزارش می‌دهد. |
| دسترسی تأخیری به نتایج | نتایج تست فقط در `afterEach` نهایی می‌شوند و در میانه تست در دسترس نیستند. |
| ضبط صفحه فقط در حالت polling | برخلاف WDIO (ارسال CDP از طریق `browser.getPuppeteer()`) و Selenium (ارسال CDP از طریق `driver.createCDPConnection`)، Nightwatch راه دسترسی پایداری به CDP ندارد، بنابراین فریم‌ها با polling روی `browser.takeScreenshot()` ثبت می‌شوند. روی همه مرورگرهایی که Nightwatch پشتیبانی می‌کند کار می‌کند؛ هزینه اندکی برای هر فریم متناسب با فاصله polling دارد. |
| برش‌بندی trace برای هر تست (BDD `describe/it`) | رابط BDD هوک هر تست افزونه را یک بار برای هر ماژول فراخوانی می‌کند، بنابراین `traceGranularity: 'test'` به یک برش در سطح نشست تقلیل می‌یابد. رابط‌های exports-object (سبک mocha) و Cucumber برش‌بندی واقعی برای هر تست دریافت می‌کنند. به [برش‌بندی برای هر تست](#per-test-slicing--the-bdd-describeit-caveat) مراجعه کنید. |
| فایل‌های trace فقط تولیدی | فایل‌های `screenshot` / `video` هر تست در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شوند اما به‌صورت درون‌خطی به Allure پیوست نمی‌شوند — Nightwatch هیچ API پیوست زنده Allure ندارد. |

برابری کلی قابلیت‌ها با سرویس WebdriverIO DevTools تقریباً **۸۰ تا ۹۰ درصد** است.