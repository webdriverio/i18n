---
id: lighthouse-service
title: Service Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---


> Un service WebdriverIO qui vous permet d'exécuter des tests d'accessibilité et de performance avec [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Remarque :** ce service ne prend actuellement en charge que les tests exécutés sur Google Chrome ou Chromium ! Étant donné que la plupart des fournisseurs cloud n'exposent pas l'accès au Protocole Chrome DevTools, ce service ne fonctionne généralement que lors de l'exécution de tests localement ou via un [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 ou supérieur.

## Installation

La façon la plus simple est de garder `@wdio/lighthouse-service` comme dépendance de développement dans votre `package.json`, via :

```sh
npm install @wdio/lighthouse-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration

Pour utiliser le service, vous devez simplement ajouter le service à votre liste de services dans votre `wdio.conf.js`, comme :

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Utilisation

Le `@wdio/lighthouse-service` vous permet d'exécuter des tests d'accessibilité et de performance Google Lighthouse via WebdriverIO.

### Test de performance

Le service Lighthouse vous permet de capturer des données de performance à partir de chaque chargement de page ou transition de page causée par un clic. Pour l'activer, appelez `browser.enablePerformanceAudits(<options>)`. Une fois que vous avez terminé de capturer toutes les données de performance nécessaires, désactivez-le pour rétablir les paramètres de limitation, par exemple :

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

Les commandes suivantes avec leurs résultats sont disponibles :

#### `getMetrics`

Obtient les métriques de performance les plus couramment utilisées, par exemple :

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

Obtenez des diagnostics utiles sur le chargement de la page.

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

Renvoie une liste avec une répartition de toutes les tâches du thread principal et leur durée totale.

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

Renvoie le [Score de Performance Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring) qui est une moyenne pondérée des métriques suivantes : `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` ou `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Active les audits de performance automatiques pour tous les chargements de page qui sont causés par l'appel de la commande `url` ou en cliquant sur un lien ou tout ce qui provoque un chargement de page. Vous pouvez passer un objet de configuration pour déterminer certaines options de limitation. Le profil de limitation par défaut est le réseau `Good 3G` avec une limitation CPU 4x.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Les profils de limitation réseau suivants sont disponibles : `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` et `online` (pas de limitation).

### Test PWA

Avec la commande `checkPWA`, vous pouvez valider si votre application web est conforme aux dernières normes web en matière d'applications web progressives. Elle vérifie :

- si votre application est installable
- fournit un service worker
- a un écran de démarrage
- fournit des icônes Apple Touch et Maskable
- peut être servie sur des appareils mobiles

Si vous n'êtes pas intéressé par l'une de ces vérifications, vous pouvez passer une liste de vérifications que vous souhaitez exécuter. La propriété `passed` renverra `true` si toutes les vérifications passent. Si elles échouent, vous pouvez utiliser la propriété `details` pour enrichir votre message d'échec avec des détails sur l'échec.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Commande `startTracing(categories, samplingFrequency)`

Commencez à tracer le navigateur. Vous pouvez éventuellement passer des catégories de traçage personnalisées (par défaut à [cette liste](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) et la fréquence d'échantillonnage (par défaut à `10000`).

```js
await browser.startTracing()
```

### Commande `endTracing`

Arrêtez le traçage du navigateur.

```js
await browser.endTracing()
```

### Commande `getTraceLogs`

Renvoie les journaux de trace qui ont été capturés pendant la période de traçage. Vous pouvez utiliser cette commande pour stocker les journaux de trace sur le système de fichiers afin d'analyser la trace via l'interface Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Commande `getPageWeight`

Renvoie les informations sur le poids de la page du dernier chargement de page.

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

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).