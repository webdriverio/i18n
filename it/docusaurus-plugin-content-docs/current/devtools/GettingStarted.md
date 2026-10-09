---
id: getting-started
title: Per Iniziare
description: "Installa WebdriverIO DevTools ed esegui il tuo primo test in live mode o trace mode per riprodurre il DOM, gli screenshot, la rete e l'output della console."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools offre ai tuoi test end-to-end nel browser un'interfaccia in stile developer tools per eseguire, fare il debug e ispezionare l'automazione: replay del DOM, screenshot per ogni comando, acquisizione di rete e console e screencast delle sessioni. Funziona in due modalità. La **live mode** apre una [dashboard](/docs/devtools/dashboard) interattiva in una finestra del browser mentre i tuoi test vengono eseguiti, così puoi osservarli e rieseguirli in tempo reale. La **trace mode** salta l'interfaccia e scrive un [trace artifact](/docs/devtools/wdio/trace-mode) (`trace.zip`) portabile e offline che puoi aprire in seguito nel player `show-trace`, ideale per la CI. Questa pagina ti permette di iniziare rapidamente con la live mode; la trace mode è a una sola opzione di distanza.

## Installazione e prima esecuzione

Scegli il tuo adapter, installalo e aggiungi la configurazione minima riportata di seguito. Esegui i tuoi test come al solito: la dashboard di DevTools si apre automaticamente in una nuova finestra del browser.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Installa il service:

```sh
npm install @wdio/devtools-service --save-dev
```

Aggiungilo alla configurazione del tuo test runner:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Esegui i tuoi test WebdriverIO normalmente: l'interfaccia di DevTools si apre automaticamente e i test iniziano subito a essere visualizzati.

</TabItem>
<TabItem value="selenium">

Funziona con Mocha, Jest, Cucumber o un semplice script `node`: il plugin rileva automaticamente il runner. Installalo:

```bash
npm install @wdio/selenium-devtools
```

Aggiungi un singolo import e una chiamata a `configure` all'inizio del tuo file di test (nell'esempio, Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Eseguilo: l'interfaccia di DevTools si apre in una nuova finestra di Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Consulta la [pagina di Selenium](/docs/devtools/selenium) per le configurazioni con Jest, Cucumber e Node semplice.

</TabItem>
<TabItem value="nightwatch">

Installa l'adapter:

```bash
npm install @wdio/nightwatch-devtools
```

Collegalo alla tua configurazione di Nightwatch tramite `globals`, senza bisogno di modificare i file di test:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Necessario per l'acquisizione delle richieste di rete
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Esegui i tuoi test normalmente: l'interfaccia di DevTools si apre automaticamente:

```bash
nightwatch
```

Consulta la [pagina di Nightwatch](/docs/devtools/nightwatch) per la configurazione con Cucumber/BDD.

</TabItem>
</Tabs>

## Prossimi passi

- **[Trace Mode](/docs/devtools/wdio/trace-mode)**: imposta `mode: 'trace'` per saltare l'interfaccia e produrre un trace artifact portabile e offline per la CI.
- **[Riferimento della configurazione](/docs/devtools/reference)**: tutte le opzioni per tutti e tre gli adapter.
- **Framework**: guide complete per ogni adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).