---
id: lighthouse-service
title: Servizio Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un servizio WebdriverIO che ti permette di eseguire test di accessibilità e performance con [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Nota:** questo servizio attualmente supporta solo test in esecuzione su Google Chrome o Chromium! Dato che la maggior parte dei fornitori cloud non espone l'accesso al Chrome DevTools Protocol, questo servizio solitamente funziona solo quando si eseguono test localmente o attraverso un [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 o superiore.

## Installazione

Il modo più semplice è mantenere `@wdio/lighthouse-service` come dipendenza di sviluppo nel tuo `package.json`, tramite:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione

Per utilizzare il servizio devi solo aggiungere il servizio alla tua lista di servizi nel tuo `wdio.conf.js`, così:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Utilizzo

Il `@wdio/lighthouse-service` ti permette di eseguire test di accessibilità e performance di Google Lighthouse attraverso WebdriverIO.

### Test di Performance

Il servizio Lighthouse ti permette di acquisire dati di performance da ogni caricamento di pagina o transizione di pagina causata da un clic. Per abilitarlo chiama `browser.enablePerformanceAudits(<options>)`. Dopo aver acquisito tutti i dati di performance necessari, disabilitalo per ripristinare le impostazioni di throttling, ad esempio:

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

I seguenti comandi con i loro risultati sono disponibili:

#### `getMetrics`

Ottiene le metriche di performance più comunemente utilizzate, ad esempio:

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

Ottiene alcune diagnostiche utili sul caricamento della pagina.

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

Restituisce un elenco con una suddivisione di tutte le attività del thread principale e la loro durata totale.

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

Restituisce il [Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring) che è una media ponderata delle seguenti metriche: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` o `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Abilita gli audit automatici delle prestazioni per tutti i caricamenti di pagina causati dalla chiamata del comando `url` o cliccando su un link o qualsiasi cosa che provochi un caricamento di pagina. Puoi passare un oggetto di configurazione per determinare alcune opzioni di throttling. Il profilo di throttling predefinito è rete `Good 3G` con un throttling CPU 4x.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

I seguenti profili di throttling di rete sono disponibili: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` e `online` (nessun throttling).

### Test PWA

Con il comando `checkPWA`, puoi verificare se la tua web app è conforme agli ultimi standard web per quanto riguarda le progressive web app. Controlla:

- se la tua app è installabile
- fornisce un service worker
- ha una schermata iniziale
- fornisce icone Apple Touch e Maskable
- può essere servita su dispositivi mobili

Se non sei interessato a uno di questi controlli, puoi passare un elenco di controlli che desideri eseguire. La proprietà `passed` restituirà `true` se tutti i controlli passano. Se falliscono, puoi utilizzare la proprietà `details` per arricchire il messaggio di errore con i dettagli del fallimento.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Comando `startTracing(categories, samplingFrequency)`

Inizia a tracciare il browser. Puoi facoltativamente passare categorie di tracciamento personalizzate (predefinito a [questa lista](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) e la frequenza di campionamento (predefinita a `10000`).

```js
await browser.startTracing()
```

### Comando `endTracing`

Interrompe il tracciamento del browser.

```js
await browser.endTracing()
```

### Comando `getTraceLogs`

Restituisce i log di tracciamento che sono stati catturati durante il periodo di tracciamento. Puoi utilizzare questo comando per archiviare i log di tracciamento sul file system per analizzare la traccia tramite l'interfaccia Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Comando `getPageWeight`

Restituisce informazioni sul peso della pagina dell'ultimo caricamento della pagina.

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

Per ulteriori informazioni su WebdriverIO consulta la [homepage](https://webdriver.io).