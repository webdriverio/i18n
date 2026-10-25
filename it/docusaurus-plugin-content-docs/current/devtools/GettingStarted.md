---
id: getting-started
title: Per iniziare
description: "Installa WebdriverIO DevTools ed esegui il tuo primo test in modalità live o in modalità trace per riprodurre il DOM, gli screenshot, la rete e l'output della console."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools offre ai tuoi test end-to-end nel browser un'interfaccia in stile strumenti per sviluppatori per eseguire, fare il debug e ispezionare l'automazione: replay del DOM, screenshot per ogni comando, acquisizione di rete e console e screencast delle sessioni. Funziona in due modalità. La **modalità live** apre una [dashboard](/docs/devtools/dashboard) interattiva in una finestra del browser mentre i tuoi test vengono eseguiti, così puoi osservarli e rieseguirli in tempo reale. La **modalità trace** salta l'interfaccia e scrive un [artefatto di trace](/docs/devtools/wdio/trace-mode) (`trace.zip`) portabile e offline che puoi aprire in seguito nel player `show-trace`, ideale per la CI. Questa pagina ti porta rapidamente alla modalità live; la modalità trace è a una sola opzione di distanza.

## Installazione e prima esecuzione

Scegli il tuo adapter, installalo e aggiungi la configurazione minima riportata di seguito. Esegui i tuoi test come al solito: la dashboard di DevTools si apre automaticamente in una nuova finestra del browser.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
{label: 'Python', value: 'python'},
]}
>
<TabItem value="wdio">

Installa il servizio:

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

Esegui i tuoi test WebdriverIO come di consueto: l'interfaccia di DevTools si apre automaticamente e i test iniziano subito a essere visualizzati.

</TabItem>
<TabItem value="selenium">

Funziona con Mocha, Jest, Cucumber o un semplice script `node`: il plugin rileva automaticamente il runner. Installalo:

```bash
npm install @wdio/selenium-devtools
```

Aggiungi un singolo import e una chiamata a `configure` all'inizio del tuo file di test (esempio con Mocha):

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

Collegalo alla configurazione di Nightwatch tramite `globals`, senza bisogno di modificare i file di test:

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

Esegui i tuoi test come di consueto: l'interfaccia di DevTools si apre automaticamente:

```bash
nightwatch
```

Consulta la [pagina di Nightwatch](/docs/devtools/nightwatch) per la configurazione con Cucumber/BDD.

</TabItem>
<TabItem value="python">

Richiede Python 3.10+, `selenium>=4.44` e Node.js 22.19+ nel `PATH` (il backend della dashboard è un'applicazione Node). Installa l'adapter, poi il backend una sola volta:

```bash
pip install selenium-devtools-py
selenium-devtools install-backend
```

Con pytest non serve aggiungere nulla ai file di test. Attiva l'acquisizione con un flag:

```bash
pytest --devtools tests/          # dashboard live
pytest --devtools-trace tests/    # scrive invece un archivio di trace
```

Consulta le schede Python nella [pagina di Selenium](/docs/devtools/selenium) per script semplici, opzioni ini e variabili d'ambiente.

</TabItem>
</Tabs>

## Prossimi passi

- **[Modalità Trace](/docs/devtools/wdio/trace-mode)**: imposta `mode: 'trace'` per saltare l'interfaccia e produrre un artefatto di trace portabile e offline per la CI.
- **[Riferimento di configurazione](/docs/devtools/reference)**: tutte le opzioni di tutti gli adapter.
- **[Test su dispositivi mobili](/docs/devtools/mobile)**: acquisisci le sessioni Appium.
- **Framework**: guide complete per ciascun adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).