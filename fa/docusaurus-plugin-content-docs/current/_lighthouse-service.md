---
id: lighthouse-service
title: سرویس لایت‌هاوس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---


> یک سرویس WebdriverIO که به شما امکان می‌دهد تا آزمون‌های دسترسی‌پذیری و عملکرد را با [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) اجرا کنید.

**توجه:** این سرویس در حال حاضر فقط از آزمون‌هایی که روی Google Chrome یا Chromium اجرا می‌شوند پشتیبانی می‌کند! با توجه به اینکه اکثر ارائه‌دهندگان ابری دسترسی به پروتکل Chrome DevTools را فراهم نمی‌کنند، این سرویس معمولاً فقط هنگامی کار می‌کند که آزمون‌ها به صورت محلی یا از طریق [Selenium Grid](https://www.selenium.dev/documentation/grid/) نسخه 4 یا بالاتر اجرا شوند.

## نصب

ساده‌ترین راه این است که `@wdio/lighthouse-service` را به عنوان وابستگی توسعه در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/lighthouse-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

برای استفاده از این سرویس، فقط کافی است آن را به لیست سرویس‌های خود در فایل `wdio.conf.js` اضافه کنید، مانند:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## استفاده

سرویس `@wdio/lighthouse-service` به شما امکان می‌دهد آزمون‌های دسترسی‌پذیری و عملکرد Google Lighthouse را از طریق WebdriverIO اجرا کنید.

### آزمون عملکرد

سرویس Lighthouse به شما امکان می‌دهد داده‌های عملکرد را از هر بارگذاری صفحه یا انتقال صفحه که با کلیک ایجاد شده است، ضبط کنید. برای فعال‌سازی آن، `browser.enablePerformanceAudits(<options>)` را فراخوانی کنید. پس از اتمام ضبط تمام داده‌های عملکرد مورد نیاز، آن را غیرفعال کنید تا تنظیمات محدودسازی بازگردانده شوند، مثلاً:

```js
import assert from 'node:assert'

describe('JSON.org page', () => {
    before(async () => {
        await browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        await browser.url('http://json.org')

        let metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = await browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(async () => {
        await browser.disablePerformanceAudits()
    })
})
```

دستورات زیر به همراه نتایج آنها در دسترس هستند:

#### `getMetrics`

رایج‌ترین معیارهای عملکرد را دریافت می‌کند، مثلاً:

```js
console.log(await browser.getMetrics())
/**
 * { timeToFirstByte: 566,
 *   serverResponseTime: 566,
 *   domContentLoaded: 3397,
 *   firstVisualChange: 2610,
 *   firstPaint: 2822,
 *   firstContentfulPaint: 2822,
 *   firstMeaningfulPaint: 2822,
 *   largestContentfulPaint: 2822,
 *   lastVisualChange: 15572,
 *   interactive: 6135,
 *   load: 8429,
 *   speedIndex: 3259,
 *   totalBlockingTime: 31,
 *   maxPotentialFID: 161,
 *   cumulativeLayoutShift: 2822 }
 */
```

#### `getDiagnostics`

اطلاعات تشخیصی مفیدی درباره بارگذاری صفحه دریافت می‌کند.

```js
console.log(await browser.getDiagnostics())
/**
 * { numRequests: 8,
 *   numScripts: 0,
 *   numStylesheets: 0,
 *   numFonts: 0,
 *   numTasks: 237,
 *   numTasksOver10ms: 5,
 *   numTasksOver25ms: 2,
 *   numTasksOver50ms: 2,
 *   numTasksOver100ms: 0,
 *   numTasksOver500ms: 0,
 *   rtt: 147.20600000000002,
 *   throughput: 47729.68474448835,
 *   maxRtt: 176.085,
 *   maxServerLatency: 1016.813,
 *   totalByteWeight: 62929,
 *   totalTaskTime: 254.07899999999978,
 *   mainDocumentTransferSize: 8023 }
 */
```

#### getMainThreadWorkBreakdown

فهرستی با تفکیک همه وظایف thread اصلی و مدت زمان کل آنها را برمی‌گرداند.

```js
console.log(await browser.getMainThreadWorkBreakdown())
/**
 * [ { group: 'styleLayout', duration: 130.59099999999998 },
 *   { group: 'other', duration: 44.819 },
 *   { group: 'paintCompositeRender', duration: 13.732000000000005 },
 *   { group: 'parseHTML', duration: 3.9080000000000004 },
 *   { group: 'scriptEvaluation', duration: 2.437999999999999 },
 *   { group: 'scriptParseCompile', duration: 0.20800000000000002 } ]
 */
```

#### getPerformanceScore

[امتیاز عملکرد Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring) را برمی‌گرداند که میانگین وزنی معیارهای زیر است: `firstContentfulPaint`، `speedIndex`، `largestContentfulPaint`، `cumulativeLayoutShift`، `totalBlockingTime`، `interactive`، `maxPotentialFID` یا `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

ممیزی خودکار عملکرد را برای تمام بارگذاری‌های صفحه که با فراخوانی دستور `url` یا کلیک روی پیوند یا هر چیزی که باعث بارگذاری صفحه می‌شود، فعال می‌کند. می‌توانید یک شیء پیکربندی را برای تعیین برخی گزینه‌های محدودسازی وارد کنید. پروفایل محدودسازی پیش‌فرض شبکه `Good 3G` با محدودسازی 4 برابری CPU است.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

پروفایل‌های محدودسازی شبکه زیر در دسترس هستند: `offline`، `GPRS`، `Regular 2G`، `Good 2G`، `Regular 3G`، `Good 3G`، `Regular 4G`، `DSL`، `Wifi` و `online` (بدون محدودسازی).

### آزمون PWA

با دستور `checkPWA`، می‌توانید بررسی کنید که آیا برنامه وب شما با آخرین استانداردهای وب در زمینه برنامه‌های وب پیشرفته مطابقت دارد یا خیر. این موارد را بررسی می‌کند:

- آیا برنامه شما قابل نصب است
- یک سرویس ورکر ارائه می‌دهد
- صفحه اسپلش دارد
- آیکون Apple Touch و Maskable ارائه می‌دهد
- قابلیت ارائه روی دستگاه‌های موبایل را دارد

اگر به یکی از این بررسی‌ها علاقه‌مند نیستید، می‌توانید فهرستی از بررسی‌هایی را که می‌خواهید اجرا کنید، وارد کنید. ویژگی `passed` در صورت موفقیت همه بررسی‌ها، `true` را برمی‌گرداند. اگر شکست بخورند، می‌توانید از ویژگی `details` برای غنی‌سازی پیام شکست خود با جزئیات شکست استفاده کنید.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### دستور `startTracing(categories, samplingFrequency)`

ردیابی مرورگر را شروع کنید. می‌توانید به صورت اختیاری دسته‌های ردیابی سفارشی (پیش‌فرض [این لیست](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) و فرکانس نمونه‌برداری (پیش‌فرض `10000`) را وارد کنید.

```js
await browser.startTracing()
```

### دستور `endTracing`

ردیابی مرورگر را متوقف کنید.

```js
await browser.endTracing()
```

### دستور `getTraceLogs`

لاگ‌های ردیابی را که در دوره ردیابی ضبط شده‌اند، برمی‌گرداند. می‌توانید از این دستور برای ذخیره لاگ‌های ردیابی در سیستم فایل استفاده کنید تا ردیابی را از طریق رابط Chrome DevTools تجزیه و تحلیل کنید.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### دستور `getPageWeight`

اطلاعات وزن صفحه از آخرین بارگذاری صفحه را برمی‌گرداند.

```js
await browser.startTracing()
await browser.url('https://webdriver.io')
await browser.endTracing()

console.log(await browser.getPageWeight())
// outputs:
// { pageWeight: 2438485,
//   transferred: 1139136,
//   requestCount: 72,
//   details: {
//       Document: { size: 221705, encoded: 85386, count: 11 },
//       Stylesheet: { size: 52712, encoded: 50130, count: 2 },
//       Image: { size: 495023, encoded: 482433, count: 36 },
//       Script: { size: 1073597, encoded: 322854, count: 15 },
//       Font: { size: 84412, encoded: 84412, count: 5 },
//       Other: { size: 1790, encoded: 1790, count: 2 },
//       XHR: { size: 509246, encoded: 112131, count: 1 } }
// }
```

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.