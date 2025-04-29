---
id: lighthouse-service
title: Сервіс Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервіс WebdriverIO, який дозволяє вам запускати тести доступності та продуктивності за допомогою [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Примітка:** цей сервіс наразі підтримує лише тести, що виконуються на Google Chrome або Chromium! Зважаючи на те, що більшість хмарних постачальників не надають доступ до Chrome DevTools Protocol, цей сервіс зазвичай працює лише при локальному запуску тестів або через [Selenium Grid](https://www.selenium.dev/documentation/grid/) версії 4 або вище.

## Встановлення

Найпростіший спосіб — тримати `@wdio/lighthouse-service` як dev-залежність у вашому `package.json`, через:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Конфігурація

Щоб використовувати сервіс, вам просто потрібно додати сервіс до списку сервісів у вашому `wdio.conf.js`, наприклад:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Використання

`@wdio/lighthouse-service` дозволяє запускати тести доступності та продуктивності Google Lighthouse через WebdriverIO.

### Тестування продуктивності

Сервіс Lighthouse дозволяє збирати дані про продуктивність кожного завантаження сторінки або переходу на сторінку, викликаного кліком. Щоб увімкнути його, викличте `browser.enablePerformanceAudits(<options>)`. Після завершення збору всіх необхідних даних про продуктивність вимкніть його, щоб повернути налаштування обмеження, наприклад:

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

Доступні наступні команди з їхніми результатами:

#### `getMetrics`

Отримує найчастіше використовувані показники продуктивності, наприклад:

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

Отримує корисну діагностику про завантаження сторінки.

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

Повертає список з розбивкою всіх завдань головного потоку та їх загальною тривалістю.

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

Повертає [оцінку продуктивності Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring), яка є зваженим середнім наступних метрик: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` або `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Вмикає автоматичні перевірки продуктивності для всіх завантажень сторінок, спричинених викликом команди `url` або кліком на посилання, або будь-чим, що викликає завантаження сторінки. Ви можете передати об'єкт конфігурації для визначення деяких параметрів обмеження. Профіль обмеження за замовчуванням - мережа `Good 3G` з 4x обмеженням CPU.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Доступні такі профілі обмеження мережі: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` та `online` (без обмеження).

### Тестування PWA

За допомогою команди `checkPWA` ви можете перевірити, чи відповідає ваш веб-додаток останнім веб-стандартам прогресивних веб-додатків. Вона перевіряє:

- чи можна встановити ваш додаток
- чи надає він service worker
- чи має екран заставки
- чи надає Apple Touch та Maskable Icons
- чи може він обслуговуватися на мобільних пристроях

Якщо ви не зацікавлені в якійсь із цих перевірок, ви можете передати список перевірок, які ви хочете виконати. Властивість `passed` поверне `true`, якщо всі перевірки пройдуть успішно. Якщо вони не пройдуть, ви можете використати властивість `details` для доповнення повідомлення про помилку деталями невдачі.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Команда `startTracing(categories, samplingFrequency)`

Починає трасування браузера. Ви можете додатково передати власні категорії трасування (за замовчуванням [цей список](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) та частоту вибірки (за замовчуванням `10000`).

```js
await browser.startTracing()
```

### Команда `endTracing`

Зупиняє трасування браузера.

```js
await browser.endTracing()
```

### Команда `getTraceLogs`

Повертає журнали трасування, які були захоплені протягом періоду трасування. Ви можете використовувати цю команду для збереження журналів трасування у файловій системі для аналізу трасування через інтерфейс Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Команда `getPageWeight`

Повертає інформацію про вагу сторінки останнього завантаження сторінки.

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

Для отримання додаткової інформації про WebdriverIO відвідайте [домашню сторінку](https://webdriver.io).