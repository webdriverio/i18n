---
id: lighthouse-service
title: Usługa Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Usługa WebdriverIO umożliwiająca przeprowadzanie testów dostępności i wydajności za pomocą [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Uwaga:** ta usługa obecnie obsługuje tylko testy uruchamiane na Google Chrome lub Chromium! Biorąc pod uwagę, że większość dostawców chmurowych nie udostępnia dostępu do Chrome DevTools Protocol, ta usługa zwykle działa tylko podczas lokalnego uruchamiania testów lub przez [Selenium Grid](https://www.selenium.dev/documentation/grid/) w wersji 4 lub wyższej.

## Instalacja

Najprostszym sposobem jest utrzymywanie `@wdio/lighthouse-service` jako zależności deweloperskiej w pliku `package.json`, poprzez:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Aby korzystać z usługi, wystarczy dodać ją do listy usług w pliku `wdio.conf.js`, na przykład:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Użycie

Usługa `@wdio/lighthouse-service` umożliwia uruchamianie testów dostępności i wydajności Google Lighthouse poprzez WebdriverIO.

### Testy wydajnościowe

Usługa Lighthouse umożliwia przechwytywanie danych o wydajności z każdego ładowania strony lub przejścia strony spowodowanego kliknięciem. Aby ją włączyć, wywołaj `browser.enablePerformanceAudits(<options>)`. Po zakończeniu przechwytywania wszystkich niezbędnych danych o wydajności wyłącz ją, aby przywrócić ustawienia throttlingu, np.:

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

Dostępne są następujące polecenia wraz z ich wynikami:

#### `getMetrics`

Pobiera najczęściej używane metryki wydajności, np.:

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

Pobiera przydatne diagnostyki dotyczące ładowania strony.

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

Zwraca listę z podziałem wszystkich zadań głównego wątku i ich całkowitym czasem trwania.

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

Zwraca [ocenę wydajności Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring), która jest średnią ważoną następujących metryk: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` lub `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Włącza automatyczne audyty wydajności dla wszystkich ładowań stron, które są spowodowane wywołaniem polecenia `url` lub kliknięciem na link, lub czymkolwiek, co powoduje załadowanie strony. Możesz przekazać obiekt konfiguracyjny, aby określić opcje throttlingu. Domyślny profil throttlingu to sieć `Good 3G` z 4-krotnym throttlingiem CPU.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Dostępne są następujące profile throttlingu sieci: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` i `online` (bez throttlingu).

### Testowanie PWA

Za pomocą polecenia `checkPWA` możesz sprawdzić, czy Twoja aplikacja internetowa jest zgodna z najnowszymi standardami internetowymi w zakresie progresywnych aplikacji internetowych. Sprawdza:

- czy Twoja aplikacja może być zainstalowana
- zapewnia service worker
- ma ekran powitalny
- zapewnia ikony Apple Touch i Maskable
- może być używana na urządzeniach mobilnych

Jeśli nie jesteś zainteresowany jednym z tych sprawdzeń, możesz przekazać listę sprawdzeń, które chcesz przeprowadzić. Właściwość `passed` zwróci `true`, jeśli wszystkie sprawdzenia zostaną zaliczone. Jeśli nie powiodą się, możesz użyć właściwości `details`, aby wzbogacić komunikat o błędzie szczegółami niepowodzenia.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Polecenie `startTracing(categories, samplingFrequency)`

Rozpocznij śledzenie przeglądarki. Opcjonalnie możesz przekazać niestandardowe kategorie śledzenia (domyślnie [ta lista](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) i częstotliwość próbkowania (domyślnie `10000`).

```js
await browser.startTracing()
```

### Polecenie `endTracing`

Zatrzymaj śledzenie przeglądarki.

```js
await browser.endTracing()
```

### Polecenie `getTraceLogs`

Zwraca dzienniki śledzenia, które zostały przechwycone w okresie śledzenia. Możesz użyć tego polecenia do przechowywania dzienników śledzenia w systemie plików, aby analizować śledzenie przez interfejs Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Polecenie `getPageWeight`

Zwraca informacje o wadze strony z ostatniego ładowania strony.

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

Więcej informacji na temat WebdriverIO można znaleźć na [stronie głównej](https://webdriver.io).