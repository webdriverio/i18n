---
id: nightwatch
title: Nightwatch DevTools
description: "Aggiungi l'interfaccia di debug DevTools a una suite di test Nightwatch senza modificare i test, e configura screencast, acquisizione BiDi e modalità trace."
---

Adapter Nightwatch per [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - porta la stessa interfaccia di debug visuale nella tua suite di test Nightwatch senza alcuna modifica al codice dei test.

## Installazione

```bash
npm install @wdio/nightwatch-devtools
```

## Configurazione

### Nightwatch standard (stile mocha)

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

Esegui i tuoi test come al solito - l'interfaccia DevTools si apre automaticamente in una nuova finestra del browser:

```bash
nightwatch
```

> Non è necessaria alcuna modifica ai tuoi file di test.

### Cucumber / BDD

Importa `cucumberHooksPath` insieme all'export principale e passalo all'opzione `require` di Cucumber. Questo registra gli hook di scenario `Before` / `After` che replicano il comportamento `beforeScenario` / `afterScenario` del servizio WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- registra gli hook Cucumber di DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Opzioni di configurazione

| Opzione | Tipo | Predefinito | Descrizione |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Porta per il server backend di DevTools. Viene incrementata automaticamente se già in uso. |
| `hostname` | `string` | `'localhost'` | Hostname a cui si associa il server backend. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Registrazione video `.webm` per sessione. Vedi [Screencast](#screencast) più avanti. |
| `bidi` | `boolean` | `false` | Abilita l'acquisizione WebDriver BiDi per console del browser + eccezioni JS + rete. Richiede `webSocketUrl: true` nelle tue capabilities e un chromedriver compatibile con BiDi. Quando è collegato, il percorso di rete basato sul perf-log di Chrome per singolo comando viene disattivato, così le richieste non vengono duplicate. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` apre l'interfaccia DevTools; `trace` la salta e scrive invece un artefatto portabile. Vedi [Modalità Trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Struttura dell'artefatto trace. Si applica solo quando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace per sessione / file spec / test. `'test'` scrive ciascuno in `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Si applica solo quando `mode: 'trace'`. Vedi [Modalità Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Avvertenza:** l'interfaccia BDD `describe/it` si riduce a un'unica porzione a livello di sessione (vedi [Suddivisione per test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Si abbina a `traceGranularity: 'test'`. Si applica solo quando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Registra nel trace un filmstrip screencast denso e continuo per una riproduzione scorrevole nel trace player — non solo un fotogramma per azione. Esegue il registratore screencast (in modalità polling su Nightwatch) per la sessione. Si applica solo quando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot per test. Solo in modalità trace + `traceGranularity: 'test'`. **Solo produzione** — il PNG viene scritto nella directory di output del trace (e nel manifest quando `emitArtifactsManifest: true`); non viene allegato inline ad Allure (vedi nota sotto). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Porzione video per test, conservata secondo la policy indicata (ad es. `'retain-on-failure'`). Solo in modalità trace + `traceGranularity: 'test'`. Un valore diverso da `off` avvia direttamente il registratore screencast — **non** sono necessari anche `filmstrip` o `screencast.enabled`. **Solo produzione** — il `.webm` viene scritto nella directory di output del trace (e nel manifest quando `emitArtifactsManifest: true`); non viene allegato inline ad Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Scrive il manifest `devtools-artifacts-<sessionId>.json` (l'indice generico che reporter/CI utilizzano per individuare gli artefatti prodotti) accanto al trace. **Opt-in per Nightwatch** — non dispone di un segnale Allure live da rilevare automaticamente, quindi, a differenza di WDIO/Selenium, non si abilita mai in automatico. Si applica solo quando `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Acquisisce le asserzioni come righe di azione nel trace — `node:assert` più i nativi `browser.assert`/`browser.verify`, inclusi i matcher negati `.not.*`. Imposta `false` per disattivarla. |

> **L'allegato inline ad Allure non è supportato per Nightwatch.** Il suo reporter ufficiale `nightwatch-allure` è post-hoc (nessuna API di allegato live), e `attachment()` di `allure-js-commons` non ha effetto in un'esecuzione Nightwatch. Quindi gli artefatti `screenshot` / `video` vengono *prodotti* (file, più il manifest degli artefatti quando `emitArtifactsManifest: true`) nella directory di output del trace, ma non allegati a un test Allure. La suddivisione per test — e quindi questi artefatti — è significativa per le interfacce Cucumber ed exports-object; l'interfaccia BDD `describe/it` si riduce alla granularità di sessione, quindi lì il controllo per test non ha effetto.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Registra un video `.webm` continuo della sessione del browser. La registrazione inizia alla prima sessione rilevata dal plugin e viene finalizzata nell'hook `after()` di Nightwatch.

**Solo modalità polling.** Nightwatch non espone una via d'accesso CDP stabile come fanno WebdriverIO (`browser.getPuppeteer()`) e Selenium (`driver.createCDPConnection`), quindi lo screencast acquisisce i fotogrammi chiamando `browser.takeScreenshot()` a intervalli fissi. Funziona su tutti i browser supportati da Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opzione | Tipo | Predefinito | Note |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interruttore principale. |
| `pollIntervalMs` | `number` | `200` | Intervallo tra gli screenshot (ms). Più basso = video più fluido, più round-trip WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato pixel per fotogramma passato all'encoder ffmpeg prima del mux finale `.webm`. In modalità polling gli screenshot sorgente vengono sempre acquisiti come PNG, quindi questa opzione **non** modifica l'acquisizione - solo il formato che l'encoder riceve per ogni fotogramma. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opzioni solo CDP, ignorate in modalità polling. Elencate per compatibilità di struttura con gli adapter WDIO/Selenium. |

**Prerequisiti:** `fluent-ffmpeg` (già una dipendenza runtime del pacchetto) più il binario `ffmpeg` nel PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Senza ffmpeg il registratore funziona comunque, ma la fase di codifica registra un avviso e salta la scrittura del file.

**Output:** il file video viene scritto accanto al file di test appena eseguito (con la directory di `nightwatch.conf.*` come alternativa e `process.cwd()` come ultima risorsa). Il percorso completo appare nella riga di log di Nightwatch `📹 Screencast video: <path>` e il video viene anche trasmesso alla scheda Screencast della dashboard.

Per la documentazione completa della funzionalità screencast (supporto dei browser, percorsi di output per tutti e tre gli adapter), consulta la [pagina Screencast](/docs/devtools/wdio/screencast).

## Acquisizione BiDi (opt-in)

Abilita l'acquisizione WebDriver BiDi per i messaggi della console del browser, le eccezioni JS e le richieste di rete. Equivale al percorso usato da selenium-devtools - entrambi gli adapter condividono la stessa logica di collegamento in `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

È necessario anche `webSocketUrl: true` nelle tue capabilities, affinché chromedriver esponga effettivamente il canale BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← abilita BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Quando BiDi è collegato, il percorso di acquisizione di rete basato sul performance-log di Chrome per singolo comando viene disattivato, così le richieste non appaiono due volte nella dashboard. Se `webSocketUrl` manca o la versione di chromedriver non espone BiDi, il collegamento fallisce silenziosamente e il fallback basato sul perf-log continua a funzionare.

## Modalità trace

Percorso di acquisizione headless — non si apre alcuna finestra dell'interfaccia DevTools. Al termine della sessione l'adapter scrive un file portabile `trace-<sessionId>.zip` (o una directory) in una cartella `test-results/` (accanto alla directory di test / configurazione risolta), con la stessa struttura dell'artefatto trace di WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opzionale; predefinito 'zip'
})
```

### Granularità e Cucumber

`traceGranularity` sceglie cosa copre un singolo artefatto — `'session'` (predefinito), `'spec'` o `'test'`.

Nightwatch chiude il browser dopo ogni scenario Cucumber. Un trace `'session'` li comprende tutti: un unico zip per l'intera esecuzione, con ogni scenario annidato sotto la propria feature. `'test'` scrive uno zip per scenario nella sua cartella, ed è l'opzione consigliata per Cucumber — artefatti più piccoli, e la granularità su cui si basa la conservazione di `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // un trace per scenario Cucumber
})
```

Con l'interfaccia BDD `describe/it`, `'test'` si riduce a un'unica porzione a livello di sessione: Nightwatch esegue internamente ogni `it()` e attiva l'hook per test del plugin solo una volta per modulo. L'albero delle azioni mostra comunque ogni `it` come gruppo separato.

Il bind della porta del backend, la finestra dell'interfaccia e l'opzione `screencast` vengono tutti saltati in modalità trace. Per la documentazione completa della funzionalità (contenuto dell'artefatto, visualizzatore, test su mobile, quando scegliere `zip` o `ndjson-directory`), consulta la [pagina Modalità Trace](/docs/devtools/wdio/trace-mode).

Nightwatch condivide la stessa pipeline di trace degli adapter WebdriverIO e Selenium, quindi la struttura dell'artefatto è identica indipendentemente dall'adapter che l'ha prodotto. Un trace Nightwatch contiene l'acquisizione completa per azione — uno screenshot, lo snapshot dell'albero di accessibilità con indentazione per profondità, l'elenco degli elementi interagibili e la trascrizione Markdown — quindi si apre nel player `show-trace` con il time-travel DOM/snapshot, le schede **A11y** e **Transcript**, l'overlay degli elementi del pick-locator e (per Cucumber) l'annidamento **Feature → Scenario → Step**.

Apri un trace con il binario `show-trace`, fornito con `@wdio/nightwatch-devtools` (nessuna dipendenza aggiuntiva):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in un progetto che installa l'adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # dal monorepo devtools
```

Consulta la pagina [Trace Player](/docs/devtools/trace-player) per la guida completa e le scorciatoie da tastiera.

### Suddivisione per test e l'avvertenza su BDD `describe/it`

Le opzioni per test — `traceGranularity: 'test'`, e le opzioni `tracePolicy`, `screenshot` e `video` che si abbinano ad essa — necessitano di un hook per test per delimitare la porzione di ciascun test. L'interfaccia **exports-object (stile mocha)** e **Cucumber** (hook per scenario) ne espongono uno, quindi ottengono una vera suddivisione per test. L'interfaccia **BDD `describe/it`** è l'eccezione: Nightwatch esegue internamente ogni `it()` e attiva l'hook per test del plugin solo una volta per modulo, quindi `traceGranularity: 'test'` si riduce a un'unica porzione **a livello di sessione** associata al primo test. Il manifest degli artefatti elenca comunque ogni testcase con il suo stato corretto; solo l'associazione delle porzioni/artefatti per test viene compressa. I trace con granularità di sessione e di spec non sono interessati.

## Esempi

Gli esempi funzionanti si trovano nella directory `examples/` di primo livello del repository. Compila il workspace una volta (`pnpm install && pnpm build`), quindi esegui dalla radice del repository:

| Directory | Runner | Comando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch stile mocha | `pnpm demo:nightwatch` |

## Funzionalità

L'adapter Nightwatch offre la stessa esperienza dell'interfaccia DevTools di WebdriverIO. Ogni funzionalità elencata di seguito viene acquisita automaticamente con la configurazione di base `globals: nightwatchDevtools({ port: 3000 })` — nessuna configurazione per singola funzionalità (i log di rete richiedono inoltre `'goog:loggingPrefs': { performance: 'ALL' }`, mostrato in [Configurazione](#setup)). I link portano alla documentazione completa di ciascuna funzionalità.

- **[Riesecuzione interattiva dei test e visualizzazione](/docs/devtools/wdio/interactive-test-rerunning)** - Anteprime live del browser, screenshot per comando e riesecuzione di test/suite con un clic
- **[Preserve & Rerun (Confronto)](/docs/devtools/wdio/preserve-and-rerun)** - Salva uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate
- **[Supporto multi-framework](/docs/devtools/wdio/multi-framework-support)** - Runner standard (stile mocha) e Cucumber/BDD
- **[Log della console](/docs/devtools/wdio/console-logs)** - Acquisisci e ispeziona l'output della console del browser (in tempo reale con `bidi: true`)
- **[Log di rete](/docs/devtools/wdio/network-logs)** - Monitora le chiamate API e l'attività di rete
- **[Metadati](/docs/devtools/wdio/metadata)** - Capabilities della sessione, ambiente e tempi per ogni sessione del browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Passa da qualsiasi comando alla riga di codice sorgente che lo ha attivato
- **[Screencast della sessione](/docs/devtools/wdio/screencast)** - Registrazione `.webm` continua della sessione del browser
- **[Modalità Trace](/docs/devtools/wdio/trace-mode)** - Acquisizione headless che produce un `trace.zip` portabile (nessuna finestra dell'interfaccia)

Lo screencast è l'unica funzionalità con opzioni proprie (elenco completo in [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitazioni

Nightwatch non offre la stessa profondità di hook del framework di WebdriverIO, quindi ci sono alcune differenze rispetto al servizio WDIO DevTools:

| Limitazione | Dettaglio |
|-----------|--------|
| Nessun hook nativo per i comandi | Nightwatch non dispone degli hook `beforeCommand` / `afterCommand`. I comandi vengono invece intercettati tramite un wrapper proxy del browser. |
| Contesto dei test limitato | `browser.currentTest` fornisce meno metadati rispetto al contesto del runner WDIO; i nomi dei test e i percorsi dei file richiedono euristiche aggiuntive. |
| Annidamento delle suite piatto | Nightwatch non supporta nativamente blocchi `describe` annidati su più livelli; il plugin riporta al massimo due livelli. |
| Disponibilità ritardata dei risultati | I risultati dei test vengono finalizzati solo in `afterEach` e non sono disponibili durante il test. |
| Screencast solo in modalità polling | A differenza di WDIO (push CDP tramite `browser.getPuppeteer()`) e Selenium (push CDP tramite `driver.createCDPConnection`), Nightwatch non dispone di una via d'accesso CDP stabile, quindi i fotogrammi vengono acquisiti tramite polling di `browser.takeScreenshot()`. Funziona su tutti i browser supportati da Nightwatch; piccolo costo per fotogramma proporzionale all'intervallo di polling. |
| Suddivisione del trace per test (BDD `describe/it`) | L'interfaccia BDD attiva l'hook per test del plugin una volta per modulo, quindi `traceGranularity: 'test'` si riduce a un'unica porzione a livello di sessione. Le interfacce exports-object (stile mocha) e Cucumber ottengono una vera suddivisione per test. Vedi [Suddivisione per test](#per-test-slicing--the-bdd-describeit-caveat). |
| Artefatti trace solo in produzione | I file `screenshot` / `video` per test vengono scritti nella directory di output del trace (e nel manifest quando `emitArtifactsManifest: true`) ma non vengono allegati inline ad Allure — Nightwatch non dispone di un'API di allegato Allure live. |

La parità complessiva di funzionalità con il servizio WebdriverIO DevTools è di circa l'**80-90%**.