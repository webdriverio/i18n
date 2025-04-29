---
id: lighthouse-service
title: Serviço de Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um serviço do WebdriverIO que permite executar testes de acessibilidade e desempenho com o [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Nota:** este serviço atualmente só suporta testes em execução no Google Chrome ou Chromium! Considerando que a maioria dos fornecedores de nuvem não expõe acesso ao Chrome DevTools Protocol, este serviço geralmente só funciona quando se executa testes localmente ou através de um [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 ou superior.

## Instalação

A maneira mais fácil é manter o `@wdio/lighthouse-service` como uma dependência de desenvolvimento no seu `package.json`, via:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração

Para usar o serviço, você apenas precisa adicioná-lo à sua lista de serviços no seu `wdio.conf.js`, como:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Uso

O `@wdio/lighthouse-service` permite executar testes de acessibilidade e desempenho do Google Lighthouse através do WebdriverIO.

### Teste de Desempenho

O serviço Lighthouse permite capturar dados de desempenho de cada carregamento de página ou transição de página causada por um clique. Para habilitá-lo, chame `browser.enablePerformanceAudits(<options>)`. Depois que você terminar de capturar todos os dados de desempenho necessários, desabilite-o para reverter as configurações de throttling, por exemplo:

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

Os seguintes comandos com seus resultados estão disponíveis:

#### `getMetrics`

Obtém as métricas de desempenho mais comumente usadas, por exemplo:

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

Obter alguns diagnósticos úteis sobre o carregamento da página.

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

Retorna uma lista com um detalhamento de todas as tarefas da thread principal e sua duração total.

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

Retorna o [Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring) que é uma média ponderada das seguintes métricas: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` ou `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Habilita auditorias automáticas de desempenho para todos os carregamentos de página causados pelo comando `url` ou clicar em um link ou qualquer coisa que cause um carregamento de página. Você pode passar um objeto de configuração para determinar algumas opções de throttling. O perfil de throttling padrão é rede `Good 3G` com 4x de throttling de CPU.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Os seguintes perfis de throttling de rede estão disponíveis: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` e `online` (sem throttling).

### Teste de PWA

Com o comando `checkPWA`, você pode validar se sua aplicação web está em conformidade com os mais recentes padrões web quando se trata de aplicativos web progressivos. Ele verifica:

- se seu aplicativo é instalável
- fornece um service worker
- tem uma tela de splash
- fornece ícones Apple Touch e Maskable
- pode ser servido em dispositivos móveis

Se você não estiver interessado em uma dessas verificações, você pode passar uma lista de verificações que deseja executar. A propriedade `passed` retornará `true` se todas as verificações passarem. Se falharem, você pode usar a propriedade `details` para enriquecer sua mensagem de falha com detalhes da falha.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Comando `startTracing(categories, samplingFrequency)`

Inicia o rastreamento do navegador. Você pode opcionalmente passar categorias de rastreamento personalizadas (o padrão é [esta lista](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) e a frequência de amostragem (o padrão é `10000`).

```js
await browser.startTracing()
```

### Comando `endTracing`

Interrompe o rastreamento do navegador.

```js
await browser.endTracing()
```

### Comando `getTraceLogs`

Retorna os logs de rastreamento que foram capturados durante o período de rastreamento. Você pode usar este comando para armazenar os logs de rastreamento no sistema de arquivos para analisar o trace via interface do Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Comando `getPageWeight`

Retorna informações sobre o peso da página do último carregamento de página.

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

Para mais informações sobre o WebdriverIO, consulte a [homepage](https://webdriver.io).