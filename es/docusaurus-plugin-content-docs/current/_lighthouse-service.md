---
id: lighthouse-service
title: Servicio Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---


> Un servicio de WebdriverIO que te permite ejecutar pruebas de accesibilidad y rendimiento con [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Nota:** actualmente este servicio solo es compatible con pruebas que se ejecutan en Google Chrome o Chromium. Dado que la mayoría de los proveedores en la nube no exponen acceso al Protocolo de DevTools de Chrome, este servicio generalmente solo funciona cuando se ejecutan pruebas localmente o a través de [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 o superior.

## Instalación

La forma más sencilla es mantener `@wdio/lighthouse-service` como una dependencia de desarrollo en tu `package.json`, mediante:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración

Para utilizar el servicio solo necesitas agregarlo a tu lista de servicios en tu `wdio.conf.js`, así:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Uso

El servicio `@wdio/lighthouse-service` te permite ejecutar pruebas de accesibilidad y rendimiento de Google Lighthouse a través de WebdriverIO.

### Pruebas de Rendimiento

El servicio Lighthouse te permite capturar datos de rendimiento de cada carga de página o transición de página causada por un clic. Para habilitarlo, llama a `browser.enablePerformanceAudits(<options>)`. Después de capturar todos los datos de rendimiento necesarios, desactívalo para revertir la configuración de limitación, por ejemplo:

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

Los siguientes comandos con sus resultados están disponibles:

#### `getMetrics`

Obtiene las métricas de rendimiento más utilizadas, por ejemplo:

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

Obtiene diagnósticos útiles sobre la carga de la página.

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

Devuelve una lista con un desglose de todas las tareas del hilo principal y su duración total.

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

Devuelve la [Puntuación de Rendimiento de Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring) que es una media ponderada de las siguientes métricas: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` o `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Habilita auditorías automáticas de rendimiento para todas las cargas de páginas causadas por llamar al comando `url` o hacer clic en un enlace o cualquier cosa que cause una carga de página. Puedes pasar un objeto de configuración para determinar algunas opciones de limitación. El perfil de limitación predeterminado es la red `Good 3G` con una limitación de CPU de 4x.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Los siguientes perfiles de limitación de red están disponibles: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` y `online` (sin limitación).

### Pruebas PWA

Con el comando `checkPWA`, puedes validar si tu aplicación web cumple con los últimos estándares web en lo que se refiere a aplicaciones web progresivas. Comprueba:

- si tu aplicación es instalable
- proporciona un trabajador de servicio
- tiene una pantalla de presentación
- proporciona iconos Apple Touch y Maskable
- puede ser servida en dispositivos móviles

Si no estás interesado en alguna de estas comprobaciones, puedes pasar una lista de las comprobaciones que quieres ejecutar. La propiedad `passed` devolverá `true` si todas las comprobaciones pasan. Si fallan, puedes usar la propiedad `details` para enriquecer tu mensaje de error con detalles del fallo.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Comando `startTracing(categories, samplingFrequency)`

Empieza a rastrear el navegador. Opcionalmente puedes pasar categorías de rastreo personalizadas (por defecto [esta lista](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) y la frecuencia de muestreo (por defecto `10000`).

```js
await browser.startTracing()
```

### Comando `endTracing`

Detiene el rastreo del navegador.

```js
await browser.endTracing()
```

### Comando `getTraceLogs`

Devuelve los registros de rastreo que fueron capturados dentro del período de rastreo. Puedes usar este comando para almacenar los registros de rastreo en el sistema de archivos para analizar el rastreo a través de la interfaz de Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Comando `getPageWeight`

Devuelve información del peso de la página de la última carga de página.

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

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).