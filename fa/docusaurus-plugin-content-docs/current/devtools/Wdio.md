---
id: wdio
title: WebDriverIO DevTools
description: "سرویس WebdriverIO DevTools را نصب و پیکربندی کنید تا تست‌ها را با بازپخش DOM، اسکرین‌شات‌ها، ضبط شبکه و کنسول و اسکرین‌کست‌ها دیباگ کنید."
---

یک سرویس WebdriverIO که یک رابط کاربری ابزارهای توسعه‌دهنده برای اجرا، دیباگ و بررسی تست‌های اتوماسیون مرورگر فراهم می‌کند. ویژگی‌ها شامل بازپخش تغییرات DOM، اسکرین‌شات برای هر فرمان، بررسی درخواست‌های شبکه، ضبط لاگ‌های کنسول و ضبط اسکرین‌کست نشست است.

## نصب

```sh
npm install @wdio/devtools-service --save-dev
```

## استفاده

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

به یک نشست مرورگر با WebDriver BiDi نیاز دارد (Chrome 114+، Firefox 130+) که WebdriverIO به‌طور خودکار آن را فعال می‌کند. نشست‌های Appium ضبط صفحه‌ای را که به آن نیاز دارد نادیده می‌گیرند؛ در یک بلوک capability مربوط به Appium مقدار `'wdio:enforceWebDriverClassic': true` را تنظیم کنید (به [تست موبایل](/docs/devtools/mobile) مراجعه کنید).

## گزینه‌های سرویس

```ts
services: [['devtools', options]]
```

| گزینه | نوع | پیش‌فرض | توضیحات |
|---|---|---|---|
| `port` | `number` | `3000` (اگر اشغال باشد از یک پورت آزاد استفاده می‌شود) | پورتی که سرور رابط کاربری DevTools روی آن گوش می‌دهد |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور رابط کاربری DevTools به آن متصل می‌شود |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilityهایی که برای باز کردن پنجره رابط کاربری DevTools استفاده می‌شوند |
| `screencast` | `ScreencastOptions` | - | ضبط ویدیوی نشست ([به Screencast مراجعه کنید](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` رابط کاربری DevTools را باز می‌کند؛ `trace` آن را نادیده گرفته و به‌جای آن یک artifact قابل‌حمل می‌نویسد ([به Trace Mode مراجعه کنید](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ساختار artifact مربوط به trace — یک آرشیو واحد در مقابل یک دایرکتوری استخراج‌شده. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک trace برای هر نشست / فایل spec / تست. `'test'` هر کدام را در `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` می‌نویسد. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد ([به Trace Mode مراجعه کنید](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | اینکه کدام traceها نگه داشته شوند. همراه با `traceGranularity: 'test'` استفاده می‌شود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد |
| `filmstrip` | `boolean` | `true` | یک filmstrip اسکرین‌کست متراکم و پیوسته را *درون* trace ضبط می‌کند تا پخش روان و قابل جابه‌جایی در player فراهم شود — فریم‌های متراکم در کنار فریم‌های مربوط به هر action که هنگام export کم‌حجم و بر اساس محتوا آدرس‌دهی می‌شوند. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | اسکرین‌شات برای هر تست که به‌صورت درون‌خطی به Allure پیوست می‌شود (`image/png`). نیازمند `mode: 'trace'` + `traceGranularity: 'test'` است |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | ویدیوی اسکرین‌کست برای هر تست که طبق سیاست داده‌شده نگه داشته شده و به‌صورت درون‌خطی به Allure پیوست می‌شود (`video/webm`). نیازمند `mode: 'trace'` + `traceGranularity: 'test'` است |
| `emitArtifactsManifest` | `boolean` | `false` | فایل `devtools-artifacts-<sessionId>.json` را می‌نویسد — یک فهرست عمومی از همه artifactهای تولیدشده به‌همراه وضعیت هر تست، برای reporterها/CI. زمانی که `@wdio/allure-reporter` در پیکربندی باشد به‌طور خودکار فعال می‌شود. فقط زمانی اعمال می‌شود که `mode: 'trace'` باشد |
| `captureAssertions` | `boolean` | `true` | ضبط assertionها به‌عنوان ردیف‌های action در trace — `node:assert` به‌همراه matcherهای موفق/ناموفق `expect(...)`. برای غیرفعال کردن، مقدار `false` را تنظیم کنید |

## اسنپ‌شات زمان اجرا

این سرویس یک فرمان `browser.getSnapshot()` اضافه می‌کند که یک درخت دسترسی‌پذیری قابل‌خواندن برای هوش مصنوعی از صفحه فعلی (`text`) به‌همراه یک نگاشت `elements` از ارجاع‌های کوتاه (`e1`، `e2`، …) به selectorها برمی‌گرداند:

```ts
const { text, elements } = await browser.getSnapshot({ inViewportOnly: true })
```

این فرمان صفحه زنده را مستقیماً و بدون سربار trace mode می‌خواند. locatorهای آن همیشه از CSS / XPath قابل‌حمل استفاده می‌کنند، بنابراین یک locator متنی ممکن است با locator به گویش WebdriverIO که تب A11y در trace player نشان می‌دهد متفاوت باشد.

## شروع به کار

1. تست‌های WebdriverIO خود را اجرا کنید
2. رابط کاربری DevTools به‌طور خودکار در یک پنجره مرورگر خارجی باز می‌شود
3. تست‌ها بلافاصله با نمایش بلادرنگ شروع به اجرا می‌کنند
4. پیش‌نمایش زنده مرورگر، پیشرفت تست و اجرای فرمان‌ها را مشاهده کنید
5. پس از اتمام اجرای اولیه، از دکمه‌های پخش برای اجرای مجدد تست‌ها یا suiteهای جداگانه استفاده کنید
6. در هر زمان روی دکمه توقف کلیک کنید تا تست‌های در حال اجرا متوقف شوند
7. actionها، فراداده، لاگ‌های کنسول و کد منبع را در تب‌های workbench بررسی کنید

## ویژگی‌ها

ویژگی‌های WebDriverIO DevTools را با جزئیات بررسی کنید:

- **[اجرای مجدد تعاملی تست‌ها و نمایش بصری](/docs/devtools/wdio/interactive-test-rerunning)** - پیش‌نمایش بلادرنگ مرورگر همراه با اجرای مجدد تست‌ها
- **[حفظ و اجرای مجدد (مقایسه)](/docs/devtools/wdio/preserve-and-rerun)** - از یک تست ناموفق اسنپ‌شات بگیرید، آن را دوباره اجرا کنید و دو اجرا را در کنار هم مقایسه کنید
- **[پشتیبانی از چند فریم‌ورک](/docs/devtools/wdio/multi-framework-support)** - با Mocha، Jasmine و Cucumber کار می‌کند
- **[لاگ‌های کنسول](/docs/devtools/wdio/console-logs)** - ضبط و بررسی خروجی کنسول مرورگر
- **[لاگ‌های شبکه](/docs/devtools/wdio/network-logs)** - نظارت بر فراخوانی‌های API و فعالیت شبکه
- **[فراداده](/docs/devtools/wdio/metadata)** - capabilityهای نشست، محیط و زمان‌بندی برای هر نشست مرورگر
- **[TestLens](/docs/devtools/wdio/testlens)** - پیمایش به کد منبع با ناوبری هوشمند کد
- **[اسکرین‌کست نشست](/docs/devtools/wdio/screencast)** - ضبط خودکار ویدیوی نشست‌های مرورگر
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - مسیر ضبط headless که یک artifact قابل‌حمل `trace.zip` تولید می‌کند (بدون پنجره رابط کاربری)؛ از فرمت‌های خروجی `zip` و `ndjson-directory`، دانه‌بندی برای هر نشست/spec/تست، سیاست‌های نگهداری آگاه از retry و یک `filmstrip` متراکم اختیاری پشتیبانی می‌کند که همگی در player رسمی `show-trace` قابل مشاهده هستند

## Trace Player

یک trace ضبط‌شده با `mode: 'trace'` در player رسمی `show-trace` باز می‌شود (`npx show-trace path/to/trace.zip`) — سفر در زمان DOM، تب A11y و پوشش عنصر pick-locator، تب Transcript با قابلیت Copy-for-LLM، تب‌های Errors / Console / Network / Source و یک خط زمانی قابل جابه‌جایی (filmstrip متراکم، تودرتویی Scenario → Step در Cucumber).

برای راهنمای کامل و سایر نمایشگرهای سازگار، به صفحه **[Trace Player](/docs/devtools/trace-player)** مراجعه کنید.

## گزارش‌دهی Allure

با وجود `@wdio/allure-reporter` در پیکربندی، artifactهای trace mode (فایل zip مربوط به trace، به‌همراه اسکرین‌شات و ویدیوی هر تست در حالت `traceGranularity: 'test'`) به‌طور خودکار به گزارش Allure پیوست می‌شوند و `emitArtifactsManifest` به‌طور خودکار فعال می‌شود.

برای جزئیات پیوست‌ها و گزینه‌های بی‌صدا کردن stepهای reporter، به **[یکپارچه‌سازی با Allure](/docs/devtools/allure)** مراجعه کنید.