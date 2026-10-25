---
id: nightwatch
title: Nightwatch DevTools
description: "Aggiungi l'interfaccia di debug DevTools a una suite di test Nightwatch senza modificare i test e configura screencast, cattura BiDi e modalità trace."
---

Adattatore Nightwatch per [WebdriverIO DevTools](https://github.com/webdriverio/devtools): porta la stessa interfaccia di debug visivo nella tua suite di test Nightwatch senza alcuna modifica al codice dei test.

## Installazione

```bash
npm install @wdio/nightwatch-devtools
```

Richiede Nightwatch 3 o successivo. Per Cucumber, `@cucumber/cucumber` deve essere installato nel tuo progetto; l'adattatore usa la tua copia invece di includerne una propria.

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
        // Necessario per la cattura delle richieste di rete
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Esegui i tuoi test come di consueto: l'interfaccia DevTools si apre automaticamente in una nuova finestra del browser:

```bash
nightwatch
```

> Non è necessaria alcuna modifica ai tuoi file di test.

In modalità live l'esecuzione rimane aperta al termine dei test, così puoi esaminare i risultati. Chiudi la finestra DevTools per terminarla, oppure premi Ctrl+C per uscire lasciando la finestra aperta.

### Cucumber / BDD

Importa `cucumberHooksPath` insieme all'export principale e passalo all'opzione `require` di Cucumber. Questo registra gli hook di scenario `Before` / `After` e gli hook di step `BeforeStep` / `AfterStep`, che riproducono il comportamento di `beforeScenario` / `afterScenario` del servizio WebdriverIO. Un hook `After` eseguito prima della chiusura scrive la trace di ogni scenario mentre la sua sessione browser è ancora attiva.

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
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Registrazione video `.webm` per sessione, solo in modalità live. In modalità trace usa `filmstrip` / `video`. Vedi [Screencast](#screencast) più avanti. |
| `bidi` | `boolean` | `false` | Attiva la cattura WebDriver BiDi per console del browser + eccezioni JS + rete. Richiede `webSocketUrl: true` nelle tue capabilities e un chromedriver compatibile con BiDi. Quando è collegato, il percorso di rete basato sul perf-log di Chrome per comando viene disattivato, così le richieste non vengono duplicate. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` apre l'interfaccia DevTools; `trace` la salta e scrive invece un artefatto portabile. Vedi [Modalità Trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Struttura dell'artefatto trace. Si applica solo con `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una trace per sessione / file spec / test. `'test'` scrive ciascuna in `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Si applica solo con `mode: 'trace'`. Vedi [Modalità Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Avvertenza:** l'interfaccia BDD `describe/it` si riduce a un'unica porzione a livello di sessione (vedi [Suddivisione per test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Si abbina a `traceGranularity: 'test'`. Si applica solo con `mode: 'trace'`; impostarla fuori dalla modalità trace genera un avviso. **Avvertenza:** su Nightwatch solo `'retain-on-failure'` è affidabile. Le altre policy basate sui retry ricadono su di essa, perché `--retries` riesegue un testcase internamente senza riattivare gli hook per test del plugin. |
| `filmstrip` | `boolean` | `true` | Registra nella trace un filmstrip screencast denso e continuo per una riproduzione scorrevole nel trace player, non solo un fotogramma per azione. Esegue il registratore screencast (modalità polling su Nightwatch) per la sessione. Si applica solo con `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot per test. Solo in modalità trace + `traceGranularity: 'test'`. **Solo produzione**: il PNG viene scritto nella directory di output della trace (e nel manifest quando `emitArtifactsManifest: true`); non viene allegato inline ad Allure (vedi nota sotto). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Porzione video per test, conservata secondo la policy indicata (es. `'retain-on-failure'`). Solo in modalità trace + `traceGranularity: 'test'`. Un valore diverso da `off` avvia direttamente il registratore screencast: **non** servono anche `filmstrip` o `screencast.enabled`. **Solo produzione**: il `.webm` viene scritto nella directory di output della trace (e nel manifest quando `emitArtifactsManifest: true`); non viene allegato inline ad Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Scrive il manifest `devtools-artifacts-<sessionId>.json` (l'indice generico che reporter/CI consumano per individuare gli artefatti prodotti) accanto alla trace. **Opt-in per Nightwatch**: non c'è alcun segnale Allure live da rilevare automaticamente, quindi a differenza di WDIO/Selenium non si attiva mai da solo. Si applica solo con `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Cattura le asserzioni come righe di azione nella trace: `node:assert` più i nativi `browser.assert`/`browser.verify`, inclusi i matcher negati `.not.*`. Imposta `false` per disattivarla. |

> **L'allegato inline ad Allure non è supportato per Nightwatch.** Il reporter ufficiale `nightwatch-allure` opera a posteriori (nessuna API di allegato live) e `attachment()` di `allure-js-commons` non ha effetto in un'esecuzione Nightwatch. Quindi gli artefatti `screenshot` / `video` vengono *prodotti* (file, più il manifest degli artefatti quando `emitArtifactsManifest: true`) nella directory di output della trace, ma non vengono allegati a un test Allure. La suddivisione per test, e quindi questi artefatti, ha senso per le interfacce Cucumber ed exports-object; l'interfaccia BDD `describe/it` si riduce alla granularità di sessione, quindi lì il filtro per test non ha effetto.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Registra un video `.webm` continuo della sessione del browser. Ogni sessione WebDriver ha la propria registrazione: un `browser.end()` a metà esecuzione, o la chiusura del browser per scenario in Cucumber, finalizza il video corrente e ne avvia uno nuovo per la sessione successiva. L'ultima registrazione viene finalizzata nell'hook `after()` di Nightwatch e ogni registrazione può essere selezionata dal menu a tendina della scheda Screencast.

**Solo modalità polling.** Nightwatch non espone una via d'accesso CDP stabile come fanno WebdriverIO (`browser.getPuppeteer()`) e Selenium (`driver.createCDPConnection`), quindi lo screencast cattura i fotogrammi richiedendo uno screenshot WebDriver a intervalli fissi. La richiesta passa direttamente sul trasporto HTTP di WebDriver, aggirando la coda dei comandi di Nightwatch, quindi non resta mai in attesa dietro i comandi del tuo test. Funziona su tutti i browser supportati da Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opzione | Tipo | Predefinito | Note |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interruttore principale. |
| `pollIntervalMs` | `number` | `200` | Intervallo tra gli screenshot (ms). Valore più basso = video più fluido, più round-trip WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato pixel per fotogramma passato all'encoder ffmpeg prima del mux finale `.webm`. In modalità polling gli screenshot sorgente vengono sempre catturati come PNG, quindi questa opzione **non** cambia la cattura, ma solo il formato che l'encoder riceve per ogni fotogramma. |
| `maxBufferFrames` | `number` | `2000` | Limite di fotogrammi mantenuti in memoria. Superato il limite, il buffer viene sfoltito sul posto, mantenendo il primo e l'ultimo fotogramma. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opzioni solo CDP, ignorate in modalità polling. Elencate per compatibilità di forma con gli adattatori WDIO/Selenium. |

**Prerequisiti:** `fluent-ffmpeg` (già una dipendenza runtime del pacchetto) più il binario `ffmpeg` nel PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Senza ffmpeg il registratore funziona comunque, ma la fase di codifica registra un avviso e salta la scrittura del file.

**Output:** `nightwatch-video-<sessionId>.webm` viene scritto in una cartella `test-results/` accanto al file di test appena eseguito, ripiegando sulla directory di `nightwatch.conf.*` e poi su `process.cwd()`. Le directory sotto `node_modules/` vengono saltate e, se la directory scelta non è scrivibile, il file finisce nella directory temporanea del sistema operativo. Il percorso completo appare nella riga di log di Nightwatch `📹 Screencast video: <path>` e il video viene anche trasmesso alla scheda Screencast della dashboard.

Per il riferimento completo della funzionalità screencast (supporto browser, percorsi di output per tutti e tre gli adattatori), consulta la [pagina Screencast](/docs/devtools/wdio/screencast).

## Cattura BiDi (opt-in)

Abilita la cattura WebDriver BiDi per i messaggi della console del browser, le eccezioni JS e le richieste di rete. È equivalente al percorso usato da selenium-devtools: entrambi gli adattatori condividono la stessa logica di collegamento in `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Serve anche `webSocketUrl: true` nelle tue capabilities, affinché chromedriver esponga effettivamente il canale BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← abilita BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Quando BiDi è collegato, il percorso di cattura di rete basato sul performance log di Chrome per comando viene disattivato, così le richieste non compaiono due volte nella dashboard. Se `webSocketUrl` manca o la versione di chromedriver non espone BiDi, il collegamento registra un avviso e il fallback basato sul perf-log continua a funzionare. Anche il collector iniettato elenca ogni richiesta, da due fonti proprie della pagina: una chiamata `fetch` / `XMLHttpRequest` passa attraverso la sua patch e riporta metodo, header, stato e body, mentre ogni altro caricamento proviene dal buffer Resource Timing della pagina, con tempi e dimensioni. Su Chrome il performance log arricchisce poi sul posto quelle righe Resource Timing con header e stato; su Safari, o in qualsiasi sessione servita da Appium, restano come le ha viste la pagina, senza header né body, e su Safari senza stato. Vedi [Log di rete](/docs/devtools/wdio/network-logs#without-webdriver-bidi).

**Imposta `webSocketUrl: true` anche senza `bidi: true`.** Con questa opzione, l'adattatore registra il suo collector di pagina all'inizio del documento su ogni pagina, così il time-travel del DOM resta accurato tra una navigazione e l'altra. Senza, l'adattatore ripiega sull'iniezione del collector dopo ogni navigazione, il che può far perdere i primi istanti di una nuova pagina.

## Modalità trace

Percorso di cattura headless: non si apre alcuna finestra dell'interfaccia DevTools. Al termine della sessione l'adattatore scrive un file portabile `trace-<sessionId>.zip` (o una directory) in una cartella `test-results/` (accanto alla directory del test / della configurazione risolta), con la stessa struttura dell'artefatto trace di WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opzionale; predefinito 'zip'
})
```

### Granularità e Cucumber

`traceGranularity` determina cosa copre un singolo artefatto: `'session'` (predefinito), `'spec'` o `'test'`.

Nightwatch chiude il browser dopo ogni scenario Cucumber. Una trace `'session'` li abbraccia tutti: un unico zip per l'intera esecuzione, con ogni scenario annidato sotto la sua feature. `'test'` scrive uno zip per scenario nella propria cartella, ed è la scelta consigliata per Cucumber: artefatti più piccoli, ed è la granularità su cui si basa la conservazione di `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // una trace per scenario Cucumber
})
```

Sull'interfaccia BDD `describe/it`, `'test'` si riduce a un'unica porzione a livello di sessione: Nightwatch esegue ogni `it()` internamente e attiva l'hook per test del plugin solo una volta per modulo. L'albero delle azioni mostra comunque ogni `it` come gruppo a sé.

In modalità trace vengono saltati il bind della porta del backend e la finestra dell'interfaccia, e `screencast.enabled` viene ignorato (viene registrato un avviso quando nient'altro richiede il registratore). La modalità trace registra invece per impostazione predefinita il `filmstrip` denso, e i campi di regolazione dello screencast (`pollIntervalMs`, `captureFormat`, `maxBufferFrames`) si applicano comunque a quel registratore. Per il riferimento completo della funzionalità (contenuto dell'artefatto, visualizzatore, test mobile, quando scegliere `zip` o `ndjson-directory`), consulta la [pagina Modalità Trace](/docs/devtools/wdio/trace-mode).

Nightwatch condivide la stessa pipeline di trace degli adattatori WebdriverIO e Selenium, quindi la struttura dell'artefatto è identica indipendentemente dall'adattatore che l'ha prodotto. Una trace Nightwatch contiene la cattura completa per azione (uno screenshot, lo snapshot dell'albero di accessibilità con indentazione per profondità, l'elenco degli elementi interagibili e la trascrizione Markdown), quindi si apre nel player `show-trace` con time-travel di DOM/snapshot, le schede **A11y**, **Transcript** ed **Errors** (errori con salto al sorgente), l'overlay degli elementi per la selezione dei locator e (per Cucumber) l'annidamento **Feature → Scenario**. Gli step vengono tracciati nella dashboard live, ma non sono ancora annidati come gruppi propri nella trace. I locator copiati privilegiano il CSS semplice, che Nightwatch legge per impostazione predefinita; solo quando non esiste un selettore CSS univoco il player fornisce un XPath, accompagnato dall'indicazione `useXpath()` / `locateStrategy: 'xpath'`.

Apri una trace con il binario `show-trace`, incluso in `@wdio/nightwatch-devtools` (nessuna dipendenza aggiuntiva):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in un progetto che installa l'adattatore
pnpm show-trace test-results/trace-<sessionId>.zip  # dal monorepo devtools
```

Consulta la pagina [Trace Player](/docs/devtools/trace-player) per la guida completa e le scorciatoie da tastiera.

### Suddivisione per test e l'avvertenza su BDD `describe/it`

Le opzioni per test (`traceGranularity: 'test'` e le opzioni `tracePolicy`, `screenshot` e `video` che vi si abbinano) richiedono un hook per test per delimitare la porzione di ciascun test. L'interfaccia **exports-object (stile mocha)** e **Cucumber** (hook per scenario) ne espongono uno, quindi ottengono una vera suddivisione per test. L'interfaccia **BDD `describe/it`** è l'eccezione: Nightwatch esegue ogni `it()` internamente e attiva l'hook per test del plugin solo una volta per modulo, quindi `traceGranularity: 'test'` si riduce a un'unica porzione **a livello di sessione** associata al primo test. Il manifest degli artefatti elenca comunque ogni testcase con il suo stato corretto; si riduce solo l'associazione porzione/artefatto per test. Le trace con granularità di sessione e di spec non sono interessate.

## Esempi

Gli esempi funzionanti si trovano nella directory `examples/` di primo livello del repository. Compila il workspace una volta (`pnpm install && pnpm build`), poi esegui dalla radice del repository:

| Directory | Runner | Comando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (modalità trace per impostazione predefinita; `DEVTOOLS_MODE=live` per l'interfaccia) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` aggiunge `--retries 1`) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (app Orologio di Android; Impostazioni di iOS con `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## Mobile (Appium)

Le sessioni Appium vengono catturate sia in modalità live sia in modalità trace. Dichiara Appium sotto `selenium` con `use_appium: true`, `start_process: false` e `default_path_prefix: ''`. Per un'app nativa imposta `browserName: null`; altrimenti Nightwatch inserisce Firefox e l'adattatore tratta la sessione come se avesse una pagina web. Lascia `bidi` disattivato, poiché Appium non fornisce BiDi. La rete di un'app nativa viene catturata quando `desiredCapabilities` imposta `'appium:intercept': true` e Appium esegue il plugin appium-interceptor; vedi [Rete delle app native](/docs/devtools/mobile#native-app-network).

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

Le sessioni native registrano comandi, screenshot e dati degli elementi dall'albero XML della piattaforma, senza DOM. La webview di un'app ibrida viene catturata come se fosse ancora nativa. Provalo con `pnpm demo:nightwatch:mobile`, eseguito dalla radice di un checkout compilato del repository devtools (passaggi di configurazione in [Eseguire un esempio](/docs/devtools/mobile#running-an-example)). Consulta la [pagina Test Mobile](/docs/devtools/mobile) per il riferimento mobile completo.

## Funzionalità

L'adattatore Nightwatch offre la stessa esperienza dell'interfaccia DevTools di WebdriverIO. Ogni funzionalità elencata di seguito viene catturata automaticamente con la configurazione base `globals: nightwatchDevtools({ port: 3000 })`, senza configurazione per singola funzionalità (i log di rete richiedono inoltre `'goog:loggingPrefs': { performance: 'ALL' }`, mostrato in [Configurazione](#setup)). I link rimandano al riferimento completo di ciascuna funzionalità.

- **[Riesecuzione interattiva dei test e visualizzazione](/docs/devtools/wdio/interactive-test-rerunning)** - Anteprime live del browser, screenshot per comando e riesecuzione di test/suite con un clic
- **[Preserve & Rerun (Confronto)](/docs/devtools/wdio/preserve-and-rerun)** - Cattura uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate. Le riesecuzioni Nightwatch rilanciano la tua configurazione con `DEVTOOLS_RERUN_LABEL` impostato e filtrano fino a quel test; richiedono un `nightwatch.conf.*` individuabile, in assenza del quale il plugin emette un avviso e la riesecuzione non è disponibile
- **[Supporto multi-framework](/docs/devtools/wdio/multi-framework-support)** - Runner standard (stile mocha) e Cucumber/BDD
- **[Log della console](/docs/devtools/wdio/console-logs)** - Cattura e ispeziona l'output della console del browser (in tempo reale con `bidi: true`)
- **[Log di rete](/docs/devtools/wdio/network-logs)** - Monitora le chiamate API e l'attività di rete
- **[Metadati](/docs/devtools/wdio/metadata)** - Capabilities della sessione, ambiente e tempi per ogni sessione del browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta da qualsiasi comando alla riga di codice che l'ha generato
- **[Screencast della sessione](/docs/devtools/wdio/screencast)** - Registrazione `.webm` continua della sessione del browser
- **[Modalità Trace](/docs/devtools/wdio/trace-mode)** - Cattura headless che produce un `trace.zip` portabile (nessuna finestra dell'interfaccia)

Lo screencast è l'unica funzionalità con opzioni proprie (elenco completo in [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitazioni

Nightwatch non offre la stessa profondità di hook del framework di WebdriverIO, quindi ci sono alcune differenze rispetto al servizio WDIO DevTools:

| Limitazione | Dettaglio |
|-----------|--------|
| Nessun hook nativo sui comandi | Nightwatch non ha hook `beforeCommand` / `afterCommand`. I comandi vengono invece intercettati tramite un wrapper proxy del browser. |
| Contesto del test limitato | `browser.currentTest` fornisce meno metadati rispetto al contesto del runner WDIO; nomi dei test e percorsi dei file richiedono euristiche aggiuntive. |
| Annidamento delle suite piatto | Nightwatch non supporta nativamente blocchi `describe` annidati su più livelli; il plugin riporta al massimo due livelli. |
| Disponibilità ritardata dei risultati | I risultati dei test vengono finalizzati solo in `afterEach` e non sono disponibili durante il test. |
| Screencast solo in modalità polling | A differenza di WDIO (push CDP tramite `browser.getPuppeteer()`) e Selenium (push CDP tramite `driver.createCDPConnection`), Nightwatch non dispone di una via d'accesso CDP stabile, quindi i fotogrammi vengono catturati interrogando periodicamente l'endpoint screenshot di WebDriver. Funziona su tutti i browser supportati da Nightwatch; piccolo costo per fotogramma proporzionale all'intervallo di polling. |
| Suddivisione della trace per test (BDD `describe/it`) | L'interfaccia BDD attiva l'hook per test del plugin una volta per modulo, quindi `traceGranularity: 'test'` si riduce a un'unica porzione a livello di sessione. Le interfacce exports-object (stile mocha) e Cucumber ottengono una vera suddivisione per test. Vedi [Suddivisione per test](#per-test-slicing--the-bdd-describeit-caveat). |
| Conservazione basata sui retry | Solo `tracePolicy: 'retain-on-failure'` è affidabile; le altre policy basate sui retry ricadono su di essa. |
| Artefatti trace solo prodotti | I file `screenshot` / `video` per test vengono scritti nella directory di output della trace (e nel manifest quando `emitArtifactsManifest: true`) ma non allegati inline ad Allure: Nightwatch non dispone di un'API di allegato Allure live. |

La parità complessiva di funzionalità con il servizio WebdriverIO DevTools è di circa l'**80-90%**.