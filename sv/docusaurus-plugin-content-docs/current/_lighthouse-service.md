---
id: lighthouse-service
title: Lighthouse-tjänst
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-tjänst som låter dig köra tillgänglighets- och prestandatester med [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Observera:** denna tjänst stöder för närvarande endast tester som körs på Google Chrome eller Chromium! Med tanke på att de flesta molnleverantörer inte exponerar tillgång till Chrome DevTools Protocol fungerar denna tjänst vanligtvis endast när du kör tester lokalt eller genom en [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 eller högre.

## Installation

Det enklaste sättet är att behålla `@wdio/lighthouse-service` som ett dev-beroende i din `package.json`, via:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Instruktioner om hur du installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration

För att använda tjänsten behöver du bara lägga till tjänsten i din tjänstlista i din `wdio.conf.js`, som:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Användning

`@wdio/lighthouse-service` låter dig köra Google Lighthouse tillgänglighets- och prestandatester genom WebdriverIO.

### Prestandatestning

Lighthouse-tjänsten låter dig fånga prestandadata från varje sidladdning eller sidövergång som orsakades av ett klick. För att aktivera det anropa `browser.enablePerformanceAudits(<options>)`. När du är klar med att fånga all nödvändig prestandadata, inaktivera det för att återställa begränsningsinställningarna, t.ex.:

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

Följande kommandon med sina resultat är tillgängliga:

#### `getMetrics`

Hämtar de vanligaste prestandamåtten, t.ex.:

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

Få användbar diagnostik om sidladdningen.

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

Returnerar en lista med en uppdelning av alla huvudtrådsuppgifter och deras totala varaktighet.

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

Returnerar [Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring) som är ett vägt medelvärde av följande mätvärden: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` eller `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Aktiverar automatiska prestandarevisioner för alla sidladdningar som orsakas av att anropa kommandot `url` eller klicka på en länk eller något som orsakar en sidladdning. Du kan skicka in ett konfigurationsobjekt för att bestämma vissa begränsningsalternativ. Standardbegränsningsprofilen är `Good 3G`-nätverk med en 4x CPU-begränsning.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Följande nätverksbegränsningsprofiler är tillgängliga: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` och `online` (ingen begränsning).

### PWA-testning

Med kommandot `checkPWA` kan du validera om din webbapp följer de senaste webbstandarderna när det gäller progressiva webbappar. Den kontrollerar:

- om din app kan installeras
- tillhandahåller en service worker
- har en splash screen
- tillhandahåller Apple Touch och Maskable Icons
- kan betjänas på mobila enheter

Om du inte är intresserad av någon av dessa kontroller kan du skicka in en lista med kontroller du vill köra. Egenskapen `passed` kommer att returnera `true` om alla kontroller godkänns. Om de misslyckas kan du använda egenskapen `details` för att berika ditt felmeddelande med detaljer om felet.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)` Kommando

Börja spåra webbläsaren. Du kan eventuellt skicka in anpassade spårningskategorier (standard till [den här listan](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) och samplingsfrekvensen (standard till `10000`).

```js
await browser.startTracing()
```

### `endTracing` Kommando

Stoppa spårning av webbläsaren.

```js
await browser.endTracing()
```

### `getTraceLogs` Kommando

Returnerar spårningsloggarna som fångades under spårningsperioden. Du kan använda detta kommando för att lagra spårningsloggarna på filsystemet för att analysera spårningen via Chrome DevTools-gränssnittet.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight` Kommando

Returnerar information om sidvikt från senaste sidladdningen.

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

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).