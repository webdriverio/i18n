---
id: lighthouse-service
title: خدمة Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---


> خدمة WebdriverIO تسمح لك بتشغيل اختبارات إمكانية الوصول والأداء مع [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**ملاحظة:** هذه الخدمة تدعم حاليًا فقط الاختبارات التي تعمل على Google Chrome أو Chromium! نظرًا لأن معظم مزودي الخدمات السحابية لا يوفرون وصولًا إلى بروتوكول Chrome DevTools، فإن هذه الخدمة عادة ما تعمل فقط عند تشغيل الاختبارات محليًا أو من خلال [Selenium Grid](https://www.selenium.dev/documentation/grid/) الإصدار 4 أو أعلى.

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/lighthouse-service` كتبعية تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/lighthouse-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين

لاستخدام الخدمة، تحتاج فقط إلى إضافة الخدمة إلى قائمة الخدمات في ملف `wdio.conf.js` الخاص بك، مثل:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## الاستخدام

تسمح لك خدمة `@wdio/lighthouse-service` بتشغيل اختبارات إمكانية الوصول والأداء من Google Lighthouse من خلال WebdriverIO.

### اختبار الأداء

تسمح لك خدمة Lighthouse بالتقاط بيانات الأداء من كل تحميل للصفحة أو انتقال صفحة ناتج عن نقرة. لتمكينها، قم باستدعاء `browser.enablePerformanceAudits(<options>)`. بعد الانتهاء من التقاط جميع بيانات الأداء اللازمة، قم بتعطيلها لإلغاء إعدادات التقييد، على سبيل المثال:

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

الأوامر التالية مع نتائجها متاحة:

#### `getMetrics`

يحصل على مقاييس الأداء الأكثر استخدامًا، على سبيل المثال:

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

الحصول على بعض التشخيصات المفيدة حول تحميل الصفحة.

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

يعيد قائمة مع تفصيل لجميع مهام الخيط الرئيسي ومدتها الإجمالية.

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

يُرجع [درجة أداء Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring) وهي متوسط مرجح للمقاييس التالية: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` أو `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

يمكّن تدقيقات الأداء التلقائية لجميع تحميلات الصفحة التي تسببها مكالمة أمر `url` أو النقر على رابط أو أي شيء يسبب تحميل الصفحة. يمكنك تمرير كائن تكوين لتحديد بعض خيارات التقييد. ملف تعريف التقييد الافتراضي هو شبكة `Good 3G` مع تقييد وحدة المعالجة المركزية 4x.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

تتوفر ملفات تعريف تقييد الشبكة التالية: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` و `online` (بدون تقييد).

### اختبار PWA

باستخدام أمر `checkPWA`، يمكنك التحقق مما إذا كان تطبيق الويب الخاص بك متوافقًا مع أحدث معايير الويب عندما يتعلق الأمر بتطبيقات الويب التقدمية. يتحقق من:

- ما إذا كان تطبيقك قابلاً للتثبيت
- يوفر خدمة عامل
- لديه شاشة بداية
- يوفر أيقونات Apple Touch وقناع
- يمكن استخدامه على الأجهزة المحمولة

إذا لم تكن مهتمًا بإحدى هذه الفحوصات، يمكنك تمرير قائمة الفحوصات التي ترغب في تشغيلها. ستعيد خاصية `passed` القيمة `true` إذا نجحت جميع الفحوصات. إذا فشلت، يمكنك استخدام خاصية `details` لإثراء رسالة الفشل بتفاصيل الفشل.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### أمر `startTracing(categories, samplingFrequency)`

ابدأ تتبع المتصفح. يمكنك اختياريًا تمرير فئات تتبع مخصصة (الافتراضي إلى [هذه القائمة](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) وتردد أخذ العينات (الافتراضي إلى `10000`).

```js
await browser.startTracing()
```

### أمر `endTracing`

توقف عن تتبع المتصفح.

```js
await browser.endTracing()
```

### أمر `getTraceLogs`

يُرجع سجلات التتبع التي تم التقاطها خلال فترة التتبع. يمكنك استخدام هذا الأمر لتخزين سجلات التتبع على نظام الملفات لتحليل التتبع عبر واجهة Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### أمر `getPageWeight`

يُرجع معلومات وزن الصفحة من آخر تحميل للصفحة.

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

لمزيد من المعلومات حول WebdriverIO راجع [الصفحة الرئيسية](https://webdriver.io).