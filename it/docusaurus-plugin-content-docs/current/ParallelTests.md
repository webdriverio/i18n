---
id: parallel-tests
title: Test paralleli in un file di spec
description: "Esegui contemporaneamente i test Mocha o gli scenari Cucumber di un file di spec, ciascuno nel proprio browsing context WebDriver BiDi, con mochaOpts.parallelMode o cucumberOpts.parallelMode, una forma di browser pooling simile a fullyParallel di Playwright."
---

Dalla v10, WebdriverIO può eseguire contemporaneamente i test di un file di spec. Ogni `it()` di Mocha o scenario di Cucumber ottiene la propria finestra del browser (un [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context) WebDriver BiDi) all'interno di un unico worker e di un'unica sessione del browser. Usalo per i file di spec con molti test indipendenti: terminano più velocemente e non servono più processi worker o sessioni del browser, perché ogni test paga solo il costo dell'apertura di una finestra.

È una forma di browser pooling: i test condividono un pool di finestre in un unico browser, non un pool di browser. Se provieni da Playwright, `parallelMode: 'userContexts'` è l'equivalente più vicino di [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): ogni test ottiene il proprio contesto isolato. La differenza è che Playwright distribuisce i test di un file tra processi worker, ciascuno con il proprio browser, mentre WebdriverIO li esegue contemporaneamente in un unico worker e in un unico browser.

Questo è distinto da [`maxInstances`](./OrganizingTestSuites.md), che esegue interi file di spec in parallelo, un worker e una sessione per spec. Puoi combinare le due cose: `maxInstances` stabilisce quanti file di spec vengono eseguiti contemporaneamente, e `maxParallelContexts` stabilisce quanti test vengono eseguiti contemporaneamente all'interno di ciascuno di quei file.

:::warning Sperimentale
La modalità parallela richiede la capability sperimentale `'wdio:experimentalBiDiCommands'`, che cambia il modo in cui i comandi sugli elementi sono implementati in ogni test, non solo in quelli paralleli. Vedi [Cambiamenti di comportamento dei comandi BiDi sugli elementi](#behavior-changes-of-the-bidi-element-commands).
:::

## Abilitare la modalità parallela

Ti servono:

- una sessione WebDriver BiDi (il default, a meno che tu non imposti `'wdio:enforceWebDriverClassic': true`),
- la capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` o `@wdio/cucumber-framework`. Jasmine non supporta la modalità parallela.

Se la sessione non usa BiDi, o la capability manca, WebdriverIO registra un avviso ed esegue i test uno dopo l'altro. Senza `parallelMode`, non cambia nulla.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Il file di spec non richiede modifiche:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

Entrambi i test vengono eseguiti contemporaneamente, ciascuno nella propria finestra. `browser.url()`, `$()` ed `expect()` agiscono sulla finestra del test che li chiama.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Ogni scenario di un feature file viene eseguito nella propria finestra. I profili (`cucumberOpts.profiles`, `cucumberOpts.file`), le spec con numeri di riga (`--spec ./features/login.feature:5`) e le opzioni `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` e `retryTagFilter` funzionano come in un'esecuzione sequenziale. Feature, scenari, step e hook vengono riportati come in un'esecuzione sequenziale, anche con `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` e `scenarioLevelReporter`.

## Opzioni

| Opzione | Valori | Default | Descrizione |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | non impostato (sequenziale) | Attiva la modalità parallela e sceglie quanto condividono i test. |
| `maxParallelContexts` | numero | `os.cpus().length` | Quanti test vengono eseguiti contemporaneamente. |

Imposta entrambe in `mochaOpts` o in `cucumberOpts`.

`maxParallelContexts` imposta il numero di slot. Ogni slot esegue un test alla volta, apre la finestra per il test successivo mentre il test corrente è in esecuzione e chiude la finestra precedente in background. Pertanto possono essere aperte per breve tempo fino a 3 × `maxParallelContexts` finestre, più la prima finestra della sessione: ogni slot può contenere una finestra attiva, una precaricata e una in chiusura. La modalità parallela chiude solo le finestre che ha aperto.

## Scegliere tra `contexts` e `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Finestra per test | sì | sì |
| Cookie, `localStorage`, service worker | condivisi da tutti i test | isolati per test ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Login | una volta, se i test riutilizzano il cookie di sessione | in ogni test |
| Supporto del driver | qualsiasi browser BiDi | richiede il supporto di `browser.createUserContext()`, altrimenti l'esecuzione fallisce |

Scegli `'contexts'` come default. Scegli `'userContexts'` quando i test non devono vedere i cookie o lo storage degli altri, ad esempio test che effettuano il login con utenti diversi. Come `'contexts'`, anche `'userContexts'` ripiega su un'esecuzione sequenziale con un avviso quando la sessione non è WebDriver BiDi o quando `'wdio:experimentalBiDiCommands'` manca dalle capability. Se il driver non supporta `browser.createUserContext`, l'esecuzione fallisce invece di ripiegare.

Una scheda o finestra che un test apre con `browser.newWindow(url)` si apre a partire dalla finestra del test, quindi ha i cookie e lo storage del test. Per aprire una finestra al di fuori dell'isolamento di cookie e storage del test, creala con `browser.browsingContextCreate()` e ottieni il suo browsing context da `browser.browsingContexts()`:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## Cosa appartiene a ciascun test

All'interno di un test parallelo, questi comandi agiscono sulla finestra del test stesso:

- navigazione: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- comandi sugli elementi: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, i comandi `waitFor*` e altri
- `execute`, `actions`, `addInitScript`
- cookie: `getCookies`, `setCookies`, `deleteCookies` usano la partizione dei cookie del test
- `mock()`: un mock creato in un test parallelo intercetta e registra solo le richieste della finestra di quel test e dei suoi frame, quindi due test possono fare il mock dello stesso URL
- screenshot: `saveScreenshot`, `takeElementScreenshot`

## Comandi che lanciano un errore in modalità parallela

Alcuni comandi agiscono sull'intero browser o sull'intera sessione, quindi non possono riferirsi alla finestra di un singolo test. All'interno di un test parallelo lanciano un errore invece di influenzare un altro test:

| Comandi | Perché | Alternativa |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | la finestra del sistema operativo è condivisa | usa `browser.setViewport()` per dimensionare la pagina di un test. I test paralleli condividono un'unica finestra del sistema operativo |
| `throttleNetwork`, `throttleCPU` | si applicano all'intero browser | esegui quei test senza la modalità parallela |
| `closeWindow`, `switchToParentFrame` | cambiano la finestra con il focus, condivisa da tutti i test | mantieni ogni test nella propria finestra |
| `reloadSession`, `setTimeout` | cambiano la sessione condivisa da tutti i test | chiamali nell'hook `before` in `wdio.conf.ts` |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | gli alert appartengono a un browsing context | chiamali sul contesto restituito da `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Usa `page.acceptAlert(text)` invece di `sendAlertText(text)`. Anche `dismissAlert()` e `getAlertText()` funzionano sul contesto |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi non può leggerli | esegui quei test senza la modalità parallela |

`switchWindow` è stato rimosso per tutte le sessioni WebDriver BiDi nella v10, non solo in modalità parallela. Lancia l'errore ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Conserva l'oggetto del contesto invece di passare ad esso.

WebdriverIO chiude automaticamente i prompt a meno che qualcosa non sia in ascolto dell'evento `dialog`, quindi registra un listener (`browser.on('dialog', () => {})`) prima di rispondere a un prompt da un test.

Anche ogni altro comando WebDriver Classic lancia un errore. Sono consentiti solo `status`, `getTimeouts` e `getWindowHandles`. Se un comando WebdriverIO ripiega su WebDriver Classic in modalità parallela senza che tu abbia chiamato un comando Classic, per favore [segnalalo](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hook e timeout

### Mocha

- `before()` e `after()` in un file di spec vengono eseguiti **una volta per test**, non una volta per `describe`, perché ogni test ha la propria finestra. Ogni test esegue `before`, `beforeEach`, il test, `afterEach` e `after` nella propria finestra. Inserisci il setup che deve essere eseguito una volta per file di spec negli hook `beforeSuite` / `afterSuite` in `wdio.conf.ts`. Questi vengono eseguiti una sola volta, al di fuori di qualsiasi finestra di test.
- Poiché ogni test esegue i propri hook, un hook che fallisce influisce solo sul proprio test. Un `before()` che fallisce viene riportato una volta per ciascun test, non una volta per il `describe`. Un `beforeEach()` o `afterEach()` che fallisce non ferma gli altri test del `describe`. In un'esecuzione sequenziale, Mocha li salta. Con `failHookAffectedTests` (il default), il test saltato da un `before()` o `beforeEach()` fallito fallisce con lo stesso testo di un'esecuzione sequenziale. Solo il titolo dell'hook può differire: un `beforeEach()` fallito nomina il test della propria finestra (`"before each" hook for "t2"`), mentre un'esecuzione sequenziale nomina il primo test per tutti.
- Si applica solo `mochaOpts.timeout`. `this.timeout()` in un test o hook lancia un errore, e `it(...).timeout()` o un timeout di `describe` viene ignorato con un avviso. Vedi [Timeout di Mocha e hook di WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` e i retry di Mocha non sono supportati e fanno fallire l'esecuzione: `mochaOpts.retries`, `this.retries(n)` in un `describe` e `it(...).retries(n)`. `this.retries()` in un test o hook lancia un errore. I [retry di WebdriverIO](./Retry.md) (`it(title, fn, retries)`) funzionano in modalità parallela.
- `.only()`, `this.skip()`, `grep`, `fgrep` e `invert` funzionano come in un'esecuzione sequenziale.
- Un errore che nessun test attende (ad esempio un timer che lancia un errore) fa fallire il test o l'hook della finestra da cui proviene, e gli altri test proseguono. Come in un'esecuzione sequenziale, una unhandled rejection non fa fallire un test, e con `mochaOpts.allowUncaught` l'errore termina il worker. Un errore che arriva dopo la fine del proprio test, mentre altri test sono ancora in esecuzione, fa fallire l'esecuzione e viene registrato nei log, ma nessun test lo mostra (un'esecuzione sequenziale lo mostra sul test in esecuzione in quel momento). Dopo la chiusura dell'ultima finestra, un errore di questo tipo termina il worker, come in un'esecuzione sequenziale. Lo stesso vale per un errore proveniente da un event emitter creato dal tuo codice al di fuori di un test e, su Node.js 22, per un errore da `queueMicrotask()`, perché lì la finestra del test non è nota.
- `mochaOpts.dryRun`, `forbidPending` e `checkLeaks` non si applicano ancora in modalità parallela: i test vengono eseguiti, un test pending non fallisce e un leak globale non viene segnalato.

### Cucumber

- `BeforeAll` / `AfterAll` e gli hook `beforeFeature` / `afterFeature` in `wdio.conf.ts` vengono eseguiti una volta per worker, non una volta per feature. `beforeFeature` / `afterFeature` ricevono l'uri e la feature solo del primo feature file, il che è rilevante quando un worker esegue diversi feature file, ad esempio spec raggruppate. Vengono eseguiti al di fuori della finestra di qualsiasi scenario, quindi non devono usare comandi che ne richiedono una.
- `Before` / `After`, `BeforeStep` / `AfterStep` e gli hook di scenario e di step in `wdio.conf.ts` vengono eseguiti per ogni scenario, nella finestra di quello scenario.
- `cucumberOpts.strict` ha come default `false` in WebdriverIO. Uno step pending fa fallire lo scenario solo con `strict: true`.
- Con `failFast`, gli scenari già in esecuzione in altre finestre terminano dopo il primo fallimento. Gli scenari che non sono stati avviati vengono riportati come saltati, come in un'esecuzione sequenziale.
- Con `ignoreUndefinedDefinitions: true`, uno step ambiguo (con `failAmbiguousDefinitions: false`) o uno step pending con `strict: true` fa fallire l'esecuzione. Un'esecuzione sequenziale in quel caso passa.
- I formatter di Cucumber (`format`, `formatOptions`, `publish`) non vengono eseguiti, quindi non scrivono alcun file.

### Entrambi i framework

La finestra di un test si chiude non appena il test termina. Non avviare timer o promise che continuano a essere eseguiti dopo la fine del test.

## Cambiamenti di comportamento dei comandi BiDi sugli elementi

`'wdio:experimentalBiDiCommands': true` sostituisce l'implementazione di diversi comandi sugli elementi in ogni test della sessione, sequenziale o parallelo:

- `addValue` e `clearValue` inviano eventi DOM sintetici, non eventi di tastiera trusted.
- `getAttribute` segue le regole WebDriver per i valori di proprietà e attributi.
- `click` viene inviato tramite l'Actions API.

Esegui la tua suite una volta con la capability e senza `parallelMode` per trovare i test che dipendono dal comportamento Classic.

## Reporter

I reporter che estendono [`@wdio/reporter`](./CustomReporter.md) riportano i test paralleli sotto la suite corretta e associano un comando al test il cui browsing context lo ha inviato.

`@wdio/allure-reporter` supporta la modalità parallela con Mocha. Scrive il risultato di un test quando il test e i suoi hook `afterEach()` e `after()` terminano. Gli hook `before()` e `after()` vengono eseguiti una volta per test in modalità parallela, quindi il report mostra le loro fixture una volta per test. Con Cucumber, Allure non supporta ancora la modalità parallela: risultati, step e allegati di scenari sovrapposti possono finire sotto lo scenario sbagliato, quindi usalo con esecuzioni sequenziali.

`@wdio/spec-reporter` non supporta ancora la modalità parallela: un blocco `describe` di Mocha che segue un altro, o uno scenario Cucumber che inizia mentre un altro è in esecuzione, viene mostrato annidato sotto di esso, e con `retry` di Cucumber il conteggio dei test superati può essere errato. I risultati dei test e l'exit code sono corretti.

`@wdio/cucumberjs-json-reporter` non supporta ancora la modalità parallela: step e allegati di scenari sovrapposti possono finire nello scenario sbagliato, e il reporter registra un avviso. Usalo con esecuzioni sequenziali.

`@wdio/html-reporter` non supporta ancora la modalità parallela: i log, gli screenshot e i video che un test invia dopo l'avvio di un altro test possono finire sotto il test sbagliato. Usalo con esecuzioni sequenziali.

`@wdio/video-reporter` registra ogni test parallelo nel proprio video. Con Cucumber, non allega i video ad Allure.

Un reporter personalizzato non deve presumere che un test termini prima dell'inizio del successivo. Vedi [Reporter e test paralleli](./CustomReporter.md#reporters-and-parallel-tests).

## Cloud vendor

I cloud vendor registrano un video, un insieme di log e uno stato del test per sessione del browser. In modalità parallela, molti test condividono quella sessione, quindi la dashboard del vendor non può suddividere il video, i log o lo stato pass/fail per test. `userContexts` richiede inoltre che la grid del vendor supporti `browser.createUserContext` (e `browser.removeUserContext` con Mocha). La modalità parallela non è ancora stata testata su alcun cloud vendor.

Ti consigliamo di lasciare disattivata la modalità parallela quando esegui su un cloud vendor e di usare [`maxInstances`](./OrganizingTestSuites.md) per eseguire i file di spec in parallelo. Per disattivarla, rimuovi `parallelMode` dalle opzioni del framework. Se rimuovi solo `'wdio:experimentalBiDiCommands'`, i test vengono eseguiti uno dopo l'altro e ogni esecuzione registra un avviso.

## Risoluzione dei problemi

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Aggiungi `'wdio:experimentalBiDiCommands': true` alla capability. Senza di essa, i test vengono eseguiti uno dopo l'altro. Con Cucumber, il messaggio è `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

La sessione usa WebDriver Classic. Rimuovi `'wdio:enforceWebDriverClassic': true` dalla capability, oppure usa un browser e un driver con supporto WebDriver BiDi. Con Cucumber, il messaggio è `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

Il driver non può creare user context. Usa `parallelMode: 'contexts'` o aggiorna il browser e il driver. Con Cucumber, il messaggio è `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` o `... is not supported in parallel mode`

Il test ha chiamato un comando elencato in [Comandi che lanciano un errore in modalità parallela](#commands-that-throw-in-parallel-mode). Usa l'alternativa indicata nella tabella.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Rimuovi `mochaOpts.bail` o `mochaOpts.retries`, oppure `this.retries(n)` / `.retries(n)` del test indicato dall'errore, oppure esegui il file di spec senza `parallelMode`. Per ripetere un test in modalità parallela, usa i [retry di WebdriverIO](./Retry.md) (`it(title, fn, retries)`).

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Il file di spec contiene hook `before()` o `after()`. Vengono eseguiti per ogni test. Sposta il setup che deve essere eseguito una sola volta in `beforeSuite` / `afterSuite` in `wdio.conf.ts`.

## Pagine correlate

- [Organizzare le suite di test](./OrganizingTestSuites.md): esegui i file di spec in parallelo con `maxInstances`
- [Sharding](./Sharding.md): suddividi la suite tra più macchine
- [Framework](./Frameworks.md): tutte le opzioni di Mocha e Cucumber
- [Protocolli di automazione](./AutomationProtocols.md): WebDriver BiDi e WebDriver Classic