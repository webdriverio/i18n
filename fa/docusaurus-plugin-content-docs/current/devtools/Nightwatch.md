---
id: nightwatch
title: DevTools برای Nightwatch
description: "رابط کاربری اشکال‌زدایی DevTools را بدون تغییر در تست‌ها به مجموعه تست Nightwatch اضافه کنید و ضبط صفحه (screencast)، ضبط BiDi و حالت trace را پیکربندی کنید."
---

آداپتور Nightwatch برای [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - همان رابط کاربری اشکال‌زدایی بصری را بدون هیچ تغییری در کد تست‌ها به مجموعه تست Nightwatch شما می‌آورد.

## نصب

```bash
npm install @wdio/nightwatch-devtools
```

به Nightwatch نسخه ۳ یا بالاتر نیاز دارد. برای Cucumber، پکیج `@cucumber/cucumber` باید در پروژه شما نصب باشد؛ آداپتور به‌جای همراه داشتن نسخه‌ای از آن، از نسخه موجود در پروژه شما استفاده می‌کند.

## راه‌اندازی

### Nightwatch استاندارد (به سبک mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // برای ضبط درخواست‌های شبکه الزامی است
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

تست‌های خود را طبق معمول اجرا کنید - رابط کاربری DevTools به‌طور خودکار در یک پنجره مرورگر جدید باز می‌شود:

```bash
nightwatch
```

> هیچ تغییری در فایل‌های تست شما لازم نیست.

در حالت live، اجرا پس از پایان تست‌ها باز می‌ماند تا بتوانید نتایج را بررسی کنید. برای پایان دادن، پنجره DevTools را ببندید، یا Ctrl+C را بزنید تا خارج شوید و پنجره باز بماند.

### Cucumber / BDD

`cucumberHooksPath` را در کنار export اصلی import کنید و آن را به گزینه `require` در Cucumber بدهید. این کار هوک‌های سناریوی `Before` / `After` و هوک‌های گام `BeforeStep` / `AfterStep` را ثبت می‌کند که رفتار `beforeScenario` / `afterScenario` سرویس WebdriverIO را بازتاب می‌دهند. یک هوک `After` پیش از خروج، trace هر سناریو را تا زمانی که نشست مرورگر آن هنوز فعال است ذخیره می‌کند.

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
| `port` | `number` | `3000` | پورت سرور بک‌اند DevTools. اگر از قبل در حال استفاده باشد، به‌طور خودکار افزایش می‌یابد. |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور بک‌اند به آن متصل می‌شود. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ضبط ویدیوی `.webm` برای هر نشست، فقط در حالت live. در حالت trace از `filmstrip` / `video` استفاده کنید. [Screencast](#screencast) را در ادامه ببینید. |
| `bidi` | `boolean` | `false` | فعال‌سازی ضبط WebDriver BiDi برای کنسول مرورگر + استثناهای JS + شبکه. به `webSocketUrl: true` در capabilities و یک chromedriver با پشتیبانی از BiDi نیاز دارد. هنگام اتصال، مسیر شبکه مبتنی بر perf-log کروم برای هر دستور غیرفعال می‌شود تا درخواست‌ها تکراری نشوند. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` رابط کاربری DevTools را باز می‌کند؛ `trace` آن را رد کرده و به‌جای آن یک artifact قابل حمل می‌نویسد. [حالت Trace](/docs/devtools/wdio/trace-mode) را ببینید. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ساختار artifact مربوط به trace. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک trace برای هر نشست / فایل spec / تست. `'test'` هر کدام را در `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` می‌نویسد. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. [حالت Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) را ببینید. **هشدار:** رابط BDD `describe/it` به یک برش واحد در سطح نشست تقلیل می‌یابد ([برش‌بندی به ازای هر تست](#per-test-slicing--the-bdd-describeit-caveat) را ببینید). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | اینکه کدام traceها نگه داشته شوند. همراه با `traceGranularity: 'test'` به کار می‌رود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد؛ تنظیم آن خارج از حالت trace یک هشدار ثبت می‌کند. **هشدار:** در Nightwatch فقط `'retain-on-failure'` قابل اتکاست. سایر سیاست‌های مبتنی بر تلاش مجدد به همین سیاست تنزل می‌یابند، زیرا `--retries` یک testcase را به‌صورت داخلی دوباره اجرا می‌کند، بدون اینکه هوک‌های به ازای هر تستِ پلاگین دوباره فراخوانی شوند. |
| `filmstrip` | `boolean` | `true` | ضبط یک filmstrip متراکم و پیوسته از صفحه در trace برای پخش قابل پیمایش در پخش‌کننده trace — نه فقط یک فریم به ازای هر اقدام. ضبط‌کننده screencast را (در Nightwatch در حالت polling) برای نشست اجرا می‌کند. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | اسکرین‌شات به ازای هر تست. فقط در حالت trace + `traceGranularity: 'test'`. **فقط تولید** — فایل PNG در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شود؛ به‌صورت درون‌خطی به Allure پیوست نمی‌شود (یادداشت زیر را ببینید). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | برش ویدیویی به ازای هر تست، که طبق سیاست داده‌شده نگه داشته می‌شود (مثلاً `'retain-on-failure'`). فقط در حالت trace + `traceGranularity: 'test'`. مقداری غیر از `off` خودش ضبط‌کننده screencast را راه‌اندازی می‌کند — **نیازی** به `filmstrip` یا `screencast.enabled` ندارید. **فقط تولید** — فایل `.webm` در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شود؛ به‌صورت درون‌خطی به Allure پیوست نمی‌شود. |
| `emitArtifactsManifest` | `boolean` | `false` | فایل manifest با نام `devtools-artifacts-<sessionId>.json` (فهرست عمومی‌ای که reporterها/CI برای کشف artifactهای تولیدشده استفاده می‌کنند) را کنار trace می‌نویسد. **در Nightwatch اختیاری است** — هیچ سیگنال زنده‌ای از Allure برای تشخیص خودکار ندارد، بنابراین برخلاف WDIO/Selenium هرگز به‌طور خودکار فعال نمی‌شود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد. |
| `captureAssertions` | `boolean` | `true` | ضبط assertionها به‌عنوان ردیف‌های اقدام در trace — `node:assert` به‌علاوه `browser.assert`/`browser.verify` بومی، شامل matcherهای منفی `.not.*`. برای غیرفعال کردن، آن را `false` قرار دهید. |

> **پیوست درون‌خطی به Allure برای Nightwatch پشتیبانی نمی‌شود.** reporter رسمی `nightwatch-allure` آن پس از اجرا کار می‌کند (هیچ API زنده‌ای برای پیوست ندارد)، و `attachment()` در `allure-js-commons` در اجرای Nightwatch هیچ کاری انجام نمی‌دهد. بنابراین artifactهای `screenshot` / `video` در پوشه خروجی trace *تولید* می‌شوند (فایل‌ها، به‌علاوه manifest مربوط به artifactها هنگامی که `emitArtifactsManifest: true` باشد) اما به یک تست Allure پیوست نمی‌شوند. برش‌بندی به ازای هر تست — و در نتیجه این artifactها — برای رابط‌های Cucumber و exports-object معنادار است؛ رابط BDD `describe/it` به سطح نشست تقلیل می‌یابد، بنابراین کنترل به ازای هر تست در آنجا هیچ اثری ندارد.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

یک ویدیوی پیوسته `.webm` از نشست مرورگر ضبط کنید. هر نشست WebDriver ضبط مخصوص به خود را دارد: یک `browser.end()` در میانه اجرا، یا بسته شدن مرورگر به ازای هر سناریو در Cucumber، ویدیوی فعلی را نهایی کرده و ویدیوی جدیدی را برای نشست بعدی آغاز می‌کند. آخرین ضبط در هوک `after()` در Nightwatch نهایی می‌شود و هر ضبط را می‌توان از منوی کشویی زبانه Screencast انتخاب کرد.

**فقط حالت polling.** Nightwatch برخلاف WebdriverIO (`browser.getPuppeteer()`) و Selenium (`driver.createCDPConnection`) راه دسترسی پایداری به CDP ارائه نمی‌دهد، بنابراین screencast فریم‌ها را با درخواست اسکرین‌شات WebDriver در فواصل زمانی ثابت ضبط می‌کند. این درخواست مستقیماً از طریق انتقال HTTP در WebDriver ارسال می‌شود و صف دستورات Nightwatch را دور می‌زند، بنابراین هرگز پشت دستورات تست شما منتظر نمی‌ماند. روی هر مرورگری که Nightwatch پشتیبانی می‌کند کار می‌کند.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| گزینه | نوع | پیش‌فرض | یادداشت‌ها |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | کلید اصلی. |
| `pollIntervalMs` | `number` | `200` | فاصله زمانی اسکرین‌شات (میلی‌ثانیه). مقدار کمتر = ویدیوی روان‌تر، رفت‌وبرگشت‌های بیشتر WebDriver. ۲۰۰ میلی‌ثانیه ≈ ۵ فریم بر ثانیه. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | قالب پیکسلی هر فریم که پیش از mux نهایی `.webm` به رمزگذار ffmpeg داده می‌شود. در حالت polling، اسکرین‌شات‌های منبع همیشه به‌صورت PNG گرفته می‌شوند، بنابراین این گزینه ضبط را تغییر **نمی‌دهد** - فقط قالبی را که رمزگذار برای هر فریم دریافت می‌کند تغییر می‌دهد. |
| `maxBufferFrames` | `number` | `2000` | سقف تعداد فریم‌های نگه‌داشته‌شده در حافظه. پس از عبور از آن، بافر در جا رقیق می‌شود و اولین و آخرین فریم‌ها حفظ می‌شوند. |
| `maxWidth` / `maxHeight` / `quality` | - | - | گزینه‌های مخصوص CDP، در حالت polling نادیده گرفته می‌شوند. برای سازگاری ساختاری با آداپتورهای WDIO/Selenium فهرست شده‌اند. |

**پیش‌نیازها:** `fluent-ffmpeg` (که از قبل وابستگی زمان اجرای پکیج است) به‌علاوه فایل اجرایی `ffmpeg` در PATH. در macOS: `brew install ffmpeg`. در Linux: `apt install ffmpeg`. بدون ffmpeg ضبط‌کننده همچنان اجرا می‌شود، اما مرحله رمزگذاری یک هشدار ثبت کرده و از نوشتن فایل صرف‌نظر می‌کند.

**خروجی:** فایل `nightwatch-video-<sessionId>.webm` در پوشه `test-results/` کنار فایل تستی که اجرا شده نوشته می‌شود، و در غیر این صورت به پوشه `nightwatch.conf.*` و سپس `process.cwd()` بازمی‌گردد. پوشه‌های زیر `node_modules/` نادیده گرفته می‌شوند، و اگر پوشه انتخاب‌شده قابل نوشتن نباشد، فایل به پوشه موقت سیستم‌عامل می‌رود. مسیر کامل در خط لاگ Nightwatch به‌صورت `📹 Screencast video: <path>` ظاهر می‌شود و ویدیو همچنین به زبانه Screencast در داشبورد استریم می‌شود.

برای مرجع کامل قابلیت screencast (پشتیبانی مرورگرها، مسیرهای خروجی در هر سه آداپتور)، [صفحه Screencast](/docs/devtools/wdio/screencast) را ببینید.

## ضبط BiDi (اختیاری)

ضبط WebDriver BiDi را برای پیام‌های کنسول مرورگر، استثناهای JS و درخواست‌های شبکه فعال کنید. معادل مسیری است که selenium-devtools استفاده می‌کند - هر دو آداپتور منطق اتصال یکسانی را در `@wdio/devtools-core` به اشتراک می‌گذارند.

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

هنگامی که BiDi متصل است، مسیر ضبط شبکه مبتنی بر performance-log کروم برای هر دستور غیرفعال می‌شود تا درخواست‌ها دو بار در داشبورد ظاهر نشوند. اگر `webSocketUrl` موجود نباشد یا نسخه chromedriver از BiDi پشتیبانی نکند، اتصال یک هشدار ثبت می‌کند و جایگزین perf-log همچنان کار می‌کند. collector تزریق‌شده نیز همه درخواست‌ها را از دو منبع متعلق به خود صفحه فهرست می‌کند: فراخوانی `fetch` / `XMLHttpRequest` از وصله آن عبور می‌کند و متد، هدرها، وضعیت و بدنه را در بر دارد، و هر بارگذاری دیگر از بافر Resource Timing صفحه همراه با زمان‌بندی و اندازه‌اش می‌آید. در کروم، performance log سپس این ردیف‌های Resource Timing را در جا با هدرها و وضعیت ارتقا می‌دهد؛ در Safari، یا هر نشستی که Appium ارائه می‌دهد، آن‌ها همان‌طور که صفحه دیده باقی می‌مانند، بدون هدر یا بدنه، و در Safari بدون وضعیت. [لاگ‌های شبکه](/docs/devtools/wdio/network-logs#without-webdriver-bidi) را ببینید.

**`webSocketUrl: true` را حتی بدون `bidi: true` تنظیم کنید.** با آن، آداپتور collector صفحه خود را در ابتدای سند در هر صفحه ثبت می‌کند، بنابراین سفر در زمان DOM در طول ناوبری‌ها دقیق می‌ماند. بدون آن، آداپتور به تزریق collector پس از هر ناوبری بازمی‌گردد، که ممکن است لحظات اولیه یک صفحه جدید را از دست بدهد.

## حالت Trace

مسیر ضبط بدون رابط کاربری — هیچ پنجره رابط کاربری DevTools باز نمی‌شود. در پایان نشست، آداپتور یک فایل قابل حمل `trace-<sessionId>.zip` (یا پوشه) را در پوشه `test-results/` (کنار پوشه تست / پیکربندی تعیین‌شده) می‌نویسد که ساختاری مشابه artifact مربوط به trace در WebdriverIO دارد.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختیاری؛ پیش‌فرض 'zip'
})
```

### دانه‌بندی و Cucumber

`traceGranularity` تعیین می‌کند که هر artifact چه چیزی را پوشش دهد — `'session'` (پیش‌فرض)، `'spec'` یا `'test'`.

Nightwatch پس از هر سناریوی Cucumber مرورگر را می‌بندد. یک trace از نوع `'session'` این را پوشش می‌دهد: یک فایل zip برای کل اجرا، که هر سناریو زیر feature مربوط به خود تودرتو شده است. `'test'` برای هر سناریو یک zip در پوشه مخصوص خودش می‌نویسد، که برای Cucumber توصیه می‌شود — artifactهای کوچک‌تر، و دانه‌بندی‌ای که نگهداری `tracePolicy` بر اساس آن عمل می‌کند.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // یک trace برای هر سناریوی Cucumber
})
```

در رابط BDD `describe/it`، `'test'` به یک برش واحد در سطح نشست تقلیل می‌یابد: Nightwatch هر `it()` را به‌صورت داخلی اجرا می‌کند و هوک به ازای هر تستِ پلاگین را فقط یک بار برای هر ماژول فراخوانی می‌کند. درخت اقدامات همچنان هر `it` را به‌عنوان گروه مستقل خود نشان می‌دهد.

در حالت trace، اتصال پورت بک‌اند و پنجره رابط کاربری نادیده گرفته می‌شوند و `screencast.enabled` نادیده گرفته می‌شود (زمانی که هیچ چیز دیگری به ضبط‌کننده نیاز نداشته باشد، یک هشدار ثبت می‌شود). حالت trace به‌جای آن به‌طور پیش‌فرض `filmstrip` متراکم را ضبط می‌کند، و فیلدهای تنظیم screencast (`pollIntervalMs`، `captureFormat`، `maxBufferFrames`) همچنان روی آن ضبط‌کننده اعمال می‌شوند. برای مرجع کامل قابلیت (محتوای artifact، نمایشگر، تست موبایل، زمان انتخاب `zip` در برابر `ndjson-directory`)، [صفحه حالت Trace](/docs/devtools/wdio/trace-mode) را ببینید.

Nightwatch همان خط لوله trace را با آداپتورهای WebdriverIO و Selenium به اشتراک می‌گذارد، بنابراین ساختار artifact صرف‌نظر از اینکه کدام آداپتور آن را تولید کرده یکسان است. یک trace از Nightwatch ضبط کامل به ازای هر اقدام را در بر دارد — یک اسکرین‌شات، snapshot درخت دسترس‌پذیری با تورفتگی بر اساس عمق، فهرست عناصر قابل تعامل، و رونوشت Markdown — بنابراین در پخش‌کننده `show-trace` با سفر در زمان DOM/snapshot، زبانه‌های **A11y**، **Transcript** و **Errors** (خطاها با پرش به کد منبع)، لایه انتخاب عنصر pick-locator، و (برای Cucumber) تودرتویی **Feature → Scenario** باز می‌شود. گام‌ها در داشبورد زنده ردیابی می‌شوند اما هنوز به‌عنوان گروه‌های مستقل در trace تودرتو نمی‌شوند. locatorهای کپی‌شده CSS ساده را ترجیح می‌دهند که Nightwatch به‌طور پیش‌فرض می‌خواند؛ فقط زمانی که هیچ selector یکتای CSS وجود نداشته باشد، پخش‌کننده XPath را با توضیح `useXpath()` / `locateStrategy: 'xpath'` به شما می‌دهد.

یک trace را با فایل اجرایی `show-trace` که همراه `@wdio/nightwatch-devtools` عرضه می‌شود باز کنید (بدون وابستگی اضافی):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # در پروژه‌ای که آداپتور را نصب کرده است
pnpm show-trace test-results/trace-<sessionId>.zip  # از monorepo مربوط به devtools
```

برای راهنمای کامل و میان‌برهای صفحه‌کلید، صفحه [پخش‌کننده Trace](/docs/devtools/trace-player) را ببینید.

### برش‌بندی به ازای هر تست و هشدار BDD `describe/it`

گزینه‌های به ازای هر تست — `traceGranularity: 'test'` و گزینه‌های `tracePolicy`، `screenshot` و `video` که همراه آن به کار می‌روند — برای جدا کردن برش هر تست به یک هوک به ازای هر تست نیاز دارند. رابط **exports-object (به سبک mocha)** و **Cucumber** (هوک‌های به ازای هر سناریو) چنین هوکی را ارائه می‌دهند، بنابراین برش‌بندی واقعی به ازای هر تست دریافت می‌کنند. رابط **BDD `describe/it`** استثناست: Nightwatch هر `it()` را به‌صورت داخلی اجرا می‌کند و هوک به ازای هر تستِ پلاگین را فقط یک بار برای هر ماژول فراخوانی می‌کند، بنابراین `traceGranularity: 'test'` به یک برش واحد **در سطح نشست** با کلید اولین تست تقلیل می‌یابد. manifest مربوط به artifactها همچنان هر testcase را با وضعیت درست آن فهرست می‌کند؛ فقط کلیدگذاری برش/artifact به ازای هر تست تقلیل می‌یابد. traceهای با دانه‌بندی نشست و spec تحت تأثیر قرار نمی‌گیرند.

## مثال‌ها

مثال‌های کاربردی در پوشه سطح بالای `examples/` در مخزن قرار دارند. یک بار workspace را build کنید (`pnpm install && pnpm build`)، سپس از ریشه مخزن اجرا کنید:

| پوشه | اجراکننده | دستور |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (به‌طور پیش‌فرض حالت trace؛ `DEVTOOLS_MODE=live` برای رابط کاربری) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` گزینه `--retries 1` را اضافه می‌کند) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (برنامه Clock در Android؛ Settings در iOS با `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## موبایل (Appium)

نشست‌های Appium در حالت live و trace ضبط می‌شوند. Appium را زیر `selenium` با `use_appium: true`، `start_process: false` و `default_path_prefix: ''` تعریف کنید. برای یک برنامه بومی `browserName: null` را تنظیم کنید؛ در غیر این صورت Nightwatch مقدار Firefox را پر می‌کند و آداپتور با نشست به‌عنوان نشستی دارای صفحه وب رفتار می‌کند. `bidi` را خاموش بگذارید، چون Appium هیچ BiDi ارائه نمی‌دهد. شبکه یک برنامه بومی زمانی ضبط می‌شود که `desiredCapabilities` مقدار `'appium:intercept': true` را تنظیم کند و Appium پلاگین appium-interceptor را اجرا کند؛ [شبکه برنامه بومی](/docs/devtools/mobile#native-app-network) را ببینید.

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

نشست‌های بومی دستورات، اسکرین‌شات‌ها و داده‌های عناصر را از درخت XML پلتفرم، بدون DOM، ضبط می‌کنند. webview یک برنامه ترکیبی (hybrid) طوری ضبط می‌شود که گویی هنوز بومی است. آن را با `pnpm demo:nightwatch:mobile` امتحان کنید، که از ریشه یک checkout ساخته‌شده از مخزن devtools اجرا می‌شود (مراحل راه‌اندازی در [اجرای یک مثال](/docs/devtools/mobile#running-an-example)). برای مرجع کامل موبایل، [صفحه تست موبایل](/docs/devtools/mobile) را ببینید.

## قابلیت‌ها

آداپتور Nightwatch همان تجربه رابط کاربری DevTools را مانند WebdriverIO ارائه می‌دهد. هر قابلیت زیر با راه‌اندازی پایه `globals: nightwatchDevtools({ port: 3000 })` به‌طور خودکار ضبط می‌شود — بدون پیکربندی جداگانه برای هر قابلیت (لاگ‌های شبکه علاوه بر آن به `'goog:loggingPrefs': { performance: 'ALL' }` نیاز دارند، که در [راه‌اندازی](#setup) نشان داده شده است). پیوندها به مرجع کامل هر قابلیت می‌روند.

- **[اجرای مجدد تعاملی تست و بصری‌سازی](/docs/devtools/wdio/interactive-test-rerunning)** - پیش‌نمایش زنده مرورگر، اسکرین‌شات به ازای هر دستور، و اجرای مجدد تست/مجموعه با یک کلیک
- **[حفظ و اجرای مجدد (مقایسه)](/docs/devtools/wdio/preserve-and-rerun)** - از یک تست ناموفق snapshot بگیرید، آن را دوباره اجرا کنید، و دو اجرا را کنار هم مقایسه کنید. اجراهای مجدد Nightwatch پیکربندی شما را با تنظیم `DEVTOOLS_RERUN_LABEL` دوباره راه‌اندازی کرده و به همان تست فیلتر می‌کنند؛ آن‌ها به یک `nightwatch.conf.*` قابل کشف نیاز دارند، که بدون آن پلاگین هشدار می‌دهد و اجرای مجدد در دسترس نیست
- **[پشتیبانی از چند فریم‌ورک](/docs/devtools/wdio/multi-framework-support)** - اجراکننده‌های استاندارد (به سبک mocha) و Cucumber/BDD
- **[لاگ‌های کنسول](/docs/devtools/wdio/console-logs)** - ضبط و بررسی خروجی کنسول مرورگر (به‌صورت بلادرنگ با `bidi: true`)
- **[لاگ‌های شبکه](/docs/devtools/wdio/network-logs)** - پایش فراخوانی‌های API و فعالیت شبکه
- **[فراداده](/docs/devtools/wdio/metadata)** - capabilities نشست، محیط و زمان‌بندی برای هر نشست مرورگر
- **[TestLens](/docs/devtools/wdio/testlens)** - پرش از هر دستور به خط کد منبعی که آن را فراخوانده است
- **[Screencast نشست](/docs/devtools/wdio/screencast)** - ضبط پیوسته `.webm` از نشست مرورگر
- **[حالت Trace](/docs/devtools/wdio/trace-mode)** - ضبط بدون رابط کاربری که یک `trace.zip` قابل حمل تولید می‌کند (بدون پنجره رابط کاربری)

Screencast تنها قابلیتی است که گزینه‌های مخصوص خود را دارد (فهرست کامل در [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## محدودیت‌ها

Nightwatch به اندازه WebdriverIO هوک‌های عمیق فریم‌ورکی ارائه نمی‌دهد، بنابراین چند تفاوت با سرویس WDIO DevTools وجود دارد:

| محدودیت | جزئیات |
|-----------|--------|
| نبود هوک‌های بومی دستور | Nightwatch هیچ هوک `beforeCommand` / `afterCommand` ندارد. دستورات به‌جای آن از طریق یک wrapper پراکسی مرورگر رهگیری می‌شوند. |
| زمینه محدود تست | `browser.currentTest` فراداده کمتری نسبت به زمینه اجراکننده WDIO ارائه می‌دهد؛ نام تست‌ها و مسیر فایل‌ها به روش‌های اکتشافی اضافی نیاز دارند. |
| تودرتویی مسطح مجموعه‌ها | Nightwatch به‌طور بومی از بلوک‌های `describe` چندسطحی پشتیبانی نمی‌کند؛ پلاگین حداکثر دو سطح را گزارش می‌دهد. |
| دسترسی تأخیری به نتایج | نتایج تست فقط در `afterEach` نهایی می‌شوند و در میانه تست در دسترس نیستند. |
| Screencast فقط در حالت polling | برخلاف WDIO (ارسال CDP از طریق `browser.getPuppeteer()`) و Selenium (ارسال CDP از طریق `driver.createCDPConnection`)، Nightwatch راه دسترسی پایداری به CDP ندارد، بنابراین فریم‌ها با polling روی endpoint اسکرین‌شات WebDriver ضبط می‌شوند. روی هر مرورگری که Nightwatch پشتیبانی می‌کند کار می‌کند؛ هزینه اندکی به ازای هر فریم متناسب با فاصله polling دارد. |
| برش‌بندی trace به ازای هر تست (BDD `describe/it`) | رابط BDD هوک به ازای هر تستِ پلاگین را یک بار برای هر ماژول فراخوانی می‌کند، بنابراین `traceGranularity: 'test'` به یک برش در سطح نشست تقلیل می‌یابد. رابط‌های exports-object (به سبک mocha) و Cucumber برش‌بندی واقعی به ازای هر تست دریافت می‌کنند. [برش‌بندی به ازای هر تست](#per-test-slicing--the-bdd-describeit-caveat) را ببینید. |
| نگهداری مبتنی بر تلاش مجدد | فقط `tracePolicy: 'retain-on-failure'` قابل اتکاست؛ سایر سیاست‌های مبتنی بر تلاش مجدد به همین سیاست تنزل می‌یابند. |
| artifactهای trace فقط-تولیدی | فایل‌های `screenshot` / `video` به ازای هر تست در پوشه خروجی trace (و در manifest هنگامی که `emitArtifactsManifest: true` باشد) نوشته می‌شوند اما به‌صورت درون‌خطی به Allure پیوست نمی‌شوند — Nightwatch هیچ API زنده‌ای برای پیوست به Allure ندارد. |

برابری کلی قابلیت‌ها با سرویس WebdriverIO DevTools تقریباً **۸۰ تا ۹۰ درصد** است.