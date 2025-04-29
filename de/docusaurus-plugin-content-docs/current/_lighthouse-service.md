---
id: lighthouse-service
title: Lighthouse Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---


> Ein WebdriverIO-Service, der es Ihnen ermöglicht, Zugänglichkeits- und Performance-Tests mit [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) durchzuführen.

**Hinweis:** Dieser Service unterstützt derzeit nur Tests, die auf Google Chrome oder Chromium laufen! Da die meisten Cloud-Anbieter keinen Zugriff auf das Chrome DevTools Protocol bieten, funktioniert dieser Service in der Regel nur, wenn Tests lokal oder über ein [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 oder höher ausgeführt werden.

## Installation

Am einfachsten ist es, `@wdio/lighthouse-service` als Dev-Abhängigkeit in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Anleitungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Um den Service zu nutzen, müssen Sie ihn einfach zu Ihrer Service-Liste in Ihrer `wdio.conf.js` hinzufügen, wie:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Verwendung

Der `@wdio/lighthouse-service` ermöglicht es Ihnen, Google Lighthouse-Zugänglichkeits- und Performance-Tests über WebdriverIO durchzuführen.

### Performance-Tests

Der Lighthouse-Service ermöglicht es Ihnen, Performance-Daten von jedem Seitenaufruf oder Seitenübergang zu erfassen, der durch einen Klick verursacht wurde. Um ihn zu aktivieren, rufen Sie `browser.enablePerformanceAudits(<options>)` auf. Nachdem Sie alle notwendigen Performance-Daten erfasst haben, deaktivieren Sie ihn, um die Drosselungseinstellungen zurückzusetzen, z.B.:

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

Die folgenden Befehle mit ihren Ergebnissen sind verfügbar:

#### `getMetrics`

Liefert die am häufigsten verwendeten Performance-Metriken, z.B.:

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

Liefert einige nützliche Diagnoseinformationen über den Seitenaufbau.

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

Gibt eine Liste mit einer Aufschlüsselung aller Hauptthread-Aufgaben und ihrer Gesamtdauer zurück.

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

Gibt den [Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring) zurück, der ein gewichteter Mittelwert der folgenden Metriken ist: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` oder `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Aktiviert automatische Performance-Audits für alle Seitenaufrufe, die durch Aufrufen des `url`-Befehls oder Klicken auf einen Link oder alles, was einen Seitenaufruf verursacht, entstehen. Sie können ein Konfigurationsobjekt übergeben, um einige Drosselungsoptionen festzulegen. Das Standard-Drosselungsprofil ist ein `Good 3G`-Netzwerk mit 4-facher CPU-Drosselung.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Die folgenden Netzwerk-Drosselungsprofile sind verfügbar: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` und `online` (keine Drosselung).

### PWA-Tests

Mit dem Befehl `checkPWA` können Sie prüfen, ob Ihre Web-App den neuesten Webstandards für Progressive Web Apps entspricht. Es wird geprüft:

- ob Ihre App installierbar ist
- einen Service Worker bereitstellt
- einen Splash Screen hat
- Apple Touch und Maskierbare Icons bereitstellt
- auf mobilen Geräten bereitgestellt werden kann

Wenn Sie an einem dieser Prüfungen nicht interessiert sind, können Sie eine Liste mit den Prüfungen übergeben, die Sie durchführen möchten. Die Eigenschaft `passed` gibt `true` zurück, wenn alle Prüfungen bestanden wurden. Wenn sie fehlschlagen, können Sie die Eigenschaft `details` verwenden, um Ihre Fehlermeldung mit Details zum Fehler anzureichern.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)` Befehl

Startet die Nachverfolgung des Browsers. Sie können optional benutzerdefinierte Trace-Kategorien übergeben (standardmäßig [diese Liste](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) und die Abtastfrequenz (standardmäßig `10000`).

```js
await browser.startTracing()
```

### `endTracing` Befehl

Beendet die Nachverfolgung des Browsers.

```js
await browser.endTracing()
```

### `getTraceLogs` Befehl

Gibt die Trace-Logs zurück, die während des Nachverfolgungszeitraums erfasst wurden. Sie können diesen Befehl verwenden, um die Trace-Logs im Dateisystem zu speichern, um den Trace über die Chrome DevTools-Schnittstelle zu analysieren.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight` Befehl

Gibt Informationen über das Seitengewicht des letzten Seitenaufrufs zurück.

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

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).