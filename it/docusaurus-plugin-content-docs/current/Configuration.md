---
id: configuration
title: Configurazione
---

Basato sul [tipo di configurazione](/docs/setuptypes) (ad esempio utilizzando i binding del protocollo raw, WebdriverIO come pacchetto standalone o il testrunner WDIO) c'è un diverso insieme di opzioni disponibili per controllare l'ambiente.

## Opzioni WebDriver

Le seguenti opzioni sono definite quando si utilizza il pacchetto di protocollo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocollo da utilizzare per comunicare con il server driver.

Tipo: `String`<br />
Predefinito: `http`

### hostname

Host del tuo server driver.

Tipo: `String`<br />
Predefinito: `0.0.0.0`

### port

Porta su cui si trova il tuo server driver.

Tipo: `Number`<br />
Predefinito: `undefined`

### path

Percorso dell'endpoint del server driver.

Tipo: `String`<br />
Predefinito: `/`

### queryParams

Parametri di query che vengono propagati al server driver.

Tipo: `Object`<br />
Predefinito: `undefined`

### user

Il tuo nome utente del servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Predefinito: `undefined`

### key

La tua chiave di accesso o chiave segreta del servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Predefinito: `undefined`

### capabilities

Definisce le funzionalità che desideri eseguire nella tua sessione WebDriver. Per maggiori dettagli, consulta il [Protocollo WebDriver](https://w3c.github.io/webdriver/#capabilities). Se esegui un driver più vecchio che non supporta il protocollo WebDriver, dovrai utilizzare le [capabilities JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) per eseguire correttamente una sessione.

Oltre alle capabilities basate su WebDriver, puoi applicare opzioni specifiche per browser e fornitore che consentono una configurazione più approfondita del browser remoto o del dispositivo. Queste sono documentate nei rispettivi documenti del fornitore, ad esempio:

- `goog:chromeOptions`: per [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: per [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: per [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: per [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: per [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: per [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Inoltre, un'utilità utile è il [Configuratore di Test Automatizzati](https://docs.saucelabs.com/basics/platform-configurator/) di Sauce Labs, che ti aiuta a creare questo oggetto selezionando le capacità desiderate.

Tipo: `Object`<br />
Predefinito: `null`

**Esempio:**

```js
{
    browserName: 'chrome', // opzioni: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versione del browser
    platformName: 'Windows 10' // piattaforma OS
}
```

Se stai eseguendo test web o nativi su dispositivi mobili, `capabilities` differisce dal protocollo WebDriver. Consulta la [Documentazione di Appium](https://appium.io/docs/en/latest/guides/caps/) per maggiori dettagli.

### logLevel

Livello di verbosità dei log.

Tipo: `String`<br />
Predefinito: `info`<br />
Opzioni: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Directory per archiviare tutti i file di log del testrunner (inclusi i log del reporter e i log `wdio`). Se non impostato, tutti i log vengono trasmessi a `stdout`. Poiché la maggior parte dei reporter è progettata per scrivere su `stdout`, si consiglia di utilizzare questa opzione solo per reporter specifici dove ha più senso inviare il report in un file (come il reporter `junit`, ad esempio).

Quando si esegue in modalità standalone, l'unico log generato da WebdriverIO sarà il log `wdio`.

Tipo: `String`<br />
Predefinito: `null`

### connectionRetryTimeout

Timeout per qualsiasi richiesta WebDriver a un driver o grid.

Tipo: `Number`<br />
Predefinito: `120000`

### connectionRetryCount

Numero massimo di tentativi di richiesta al server Selenium.

Tipo: `Number`<br />
Predefinito: `3`

### agent

Consente di utilizzare un agente personalizzato `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) per effettuare richieste.

Tipo: `Object`<br />
Predefinito:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Specifica `headers` personalizzati da passare in ogni richiesta WebDriver. Se il tuo Selenium Grid richiede l'autenticazione di base, ti consigliamo di passare un'intestazione `Authorization` attraverso questa opzione per autenticare le tue richieste WebDriver, ad esempio:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Tipo: `Object`<br />
Predefinito: `{}`

### transformRequest

Funzione che intercetta le [opzioni di richiesta HTTP](https://github.com/sindresorhus/got#options) prima che venga effettuata una richiesta WebDriver

Tipo: `(RequestOptions) => RequestOptions`<br />
Predefinito: *nessuno*

### transformResponse

Funzione che intercetta gli oggetti di risposta HTTP dopo l'arrivo di una risposta WebDriver. La funzione riceve l'oggetto di risposta originale come primo argomento e le corrispondenti `RequestOptions` come secondo argomento.

Tipo: `(Response, RequestOptions) => Response`<br />
Predefinito: *nessuno*

### strictSSL

Se non richiede che il certificato SSL sia valido.
Può essere impostato tramite variabili d'ambiente come `STRICT_SSL` o `strict_ssl`.

Tipo: `Boolean`<br />
Predefinito: `true`

### enableDirectConnect

Se abilitare la [funzionalità di connessione diretta di Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Non fa nulla se la risposta non ha chiavi appropriate mentre il flag è abilitato.

Tipo: `Boolean`<br />
Predefinito: `true`

### cacheDir

Il percorso alla radice della directory della cache. Questa directory viene utilizzata per memorizzare tutti i driver che vengono scaricati quando si tenta di avviare una sessione.

Tipo: `String`<br />
Predefinito: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Per una registrazione più sicura, le espressioni regolari impostate con `maskingPatterns` possono offuscare informazioni sensibili dal log.
 - Il formato della stringa è un'espressione regolare con o senza flag (ad es. `/.../i`) e separata da virgole per più espressioni regolari.
 - Per maggiori dettagli sui modelli di mascheramento, consulta la [sezione Masking Patterns nel README di WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Tipo: `String`<br />
Predefinito: `undefined`

**Esempio:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Le seguenti opzioni (incluse quelle elencate sopra) possono essere utilizzate con WebdriverIO in modalità standalone:

### automationProtocol

Definisci il protocollo che desideri utilizzare per l'automazione del browser. Attualmente è supportato solo [`webdriver`](https://www.npmjs.com/package/webdriver), in quanto è la principale tecnologia di automazione del browser utilizzata da WebdriverIO.

Se desideri automatizzare il browser utilizzando una tecnologia di automazione diversa, assicurati di impostare questa proprietà a un percorso che si risolve in un modulo che aderisce alla seguente interfaccia:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Tipo: `String`<br />
Predefinito: `webdriver`

### baseUrl

Abbrevia le chiamate al comando `url` impostando un URL base.
- Se il tuo parametro `url` inizia con `/`, allora `baseUrl` viene anteposto (tranne il percorso `baseUrl`, se ne ha uno).
- Se il tuo parametro `url` inizia senza uno schema o `/` (come `some/path`), allora il `baseUrl` completo viene anteposto direttamente.

Tipo: `String`<br />
Predefinito: `null`

### waitforTimeout

Timeout predefinito per tutti i comandi `waitFor*`. (Nota la 'f' minuscola nel nome dell'opzione.) Questo timeout __solo__ influisce sui comandi che iniziano con `waitFor*` e sul loro tempo di attesa predefinito.

Per aumentare il timeout per un _test_, consulta la documentazione del framework.

Tipo: `Number`<br />
Predefinito: `5000`

### waitforInterval

Intervallo predefinito per tutti i comandi `waitFor*` per verificare se è stato modificato uno stato previsto (ad esempio, visibilità).

Tipo: `Number`<br />
Predefinito: `100`

### region

Se esegui su Sauce Labs, puoi scegliere di eseguire i test tra diversi data center: US o EU.
Per cambiare la tua regione in EU, aggiungi `region: 'eu'` alla tua configurazione.

__Nota:__ Questo ha effetto solo se fornisci le opzioni `user` e `key` che sono collegate al tuo account Sauce Labs.

Tipo: `String`<br />
Predefinito: `us`

*(solo per vm e/o em/simulatori)*

---

## Opzioni Testrunner

Le seguenti opzioni (incluse quelle elencate sopra) sono definite solo per l'esecuzione di WebdriverIO con il testrunner WDIO:

### specs

Definisci le specifiche per l'esecuzione dei test. Puoi specificare un pattern glob per abbinare più file contemporaneamente o racchiudere un glob o un insieme di percorsi in un array per eseguirli all'interno di un singolo processo di lavoro. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

Tipo: `(String | String[])[]`<br />
Predefinito: `[]`

### exclude

Escludi le specifiche dall'esecuzione dei test. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

Tipo: `String[]`<br />
Predefinito: `[]`

### suites

Un oggetto che descrive varie suite, che puoi poi specificare con l'opzione `--suite` sulla CLI `wdio`.

Tipo: `Object`<br />
Predefinito: `{}`

### capabilities

Lo stesso della sezione `capabilities` descritta sopra, con l'opzione di specificare un oggetto [`multiremote`](/docs/multiremote), o più sessioni WebDriver in un array per l'esecuzione parallela.

Puoi applicare le stesse capabilities specifiche per fornitore e browser come definito [sopra](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Predefinito: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Numero massimo totale di worker paralleli in esecuzione.

__Nota:__ che potrebbe essere un numero alto fino a `100`, quando i test vengono eseguiti su alcuni fornitori esterni come le macchine di Sauce Labs. Lì, i test non vengono testati su una singola macchina, ma piuttosto su più VM. Se i test devono essere eseguiti su una macchina di sviluppo locale, usa un numero più ragionevole, come `3`, `4` o `5`. In sostanza, questo è il numero di browser che verranno avviati contemporaneamente ed eseguiranno i tuoi test allo stesso tempo, quindi dipende da quanta RAM c'è sulla tua macchina e quante altre app sono in esecuzione sulla tua macchina.

Puoi anche applicare `maxInstances` all'interno dei tuoi oggetti di capabilities utilizzando la capability `wdio:maxInstances`. Questo limiterà la quantità di sessioni parallele per quella particolare capability.

Tipo: `Number`<br />
Predefinito: `100`

### maxInstancesPerCapability

Numero massimo di worker paralleli in esecuzione per capability.

Tipo: `Number`<br />
Predefinito: `100`

### injectGlobals

Inserisce i globali di WebdriverIO (ad esempio `browser`, `$` e `$$`) nell'ambiente globale.
Se impostato su `false`, dovresti importare da `@wdio/globals`, ad esempio:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO non gestisce l'iniezione di globali specifici del framework di test.

Tipo: `Boolean`<br />
Predefinito: `true`

### bail

Se desideri che l'esecuzione del test si interrompa dopo un numero specifico di test falliti, usa `bail`.
(Per impostazione predefinita è `0`, il che esegue tutti i test indipendentemente da ciò.) **Nota:** Un test in questo contesto sono tutti i test all'interno di un singolo file di spec (quando si utilizza Mocha o Jasmine) o tutti i passaggi all'interno di un file di feature (quando si utilizza Cucumber). Se vuoi controllare il comportamento di bail all'interno dei test di un singolo file di test, dai un'occhiata alle opzioni di [framework](frameworks) disponibili.

Tipo: `Number`<br />
Predefinito: `0` (non interrompere; esegui tutti i test)

### specFileRetries

Il numero di volte per riprovare un intero file di spec quando fallisce nel suo complesso.

Tipo: `Number`<br />
Predefinito: `0`

### specFileRetriesDelay

Ritardo in secondi tra i tentativi di riprova del file di spec

Tipo: `Number`<br />
Predefinito: `0`

### specFileRetriesDeferred

Se i file di spec riprovati devono essere riprovati immediatamente o rinviati alla fine della coda.

Tipo: `Boolean`<br />
Predefinito: `true`

### groupLogsByTestSpec

Scegli la vista di output dei log.

Se impostato su `false`, i log di diversi file di test verranno stampati in tempo reale. Si noti che ciò potrebbe comportare la mescolanza delle uscite di log da diversi file quando si esegue in parallelo.

Se impostato su `true`, le uscite di log saranno raggruppate per Test Spec e stampate solo quando il Test Spec è completato.

Per impostazione predefinita, è impostato su `false` quindi i log vengono stampati in tempo reale.

Tipo: `Boolean`<br />
Predefinito: `false`

### autoAssertOnTestEnd

Controlla se WebdriverIO verifica automaticamente tutte le asserzioni soft alla fine di ogni test. Quando impostato su `true`, tutte le asserzioni soft accumulate verranno controllate automaticamente e causeranno il fallimento del test se alcune asserzioni hanno fallito. Quando impostato su `false`, è necessario chiamare manualmente il metodo assert per verificare le asserzioni soft.

Tipo: `Boolean`<br />
Predefinito: `true`

### services

I servizi si occupano di un lavoro specifico di cui non vuoi occuparti. Migliorano la configurazione del test con quasi nessuno sforzo.

Tipo: `String[]|Object[]`<br />
Predefinito: `[]`

### framework

Definisce il framework di test da utilizzare dal testrunner WDIO.

Tipo: `String`<br />
Predefinito: `mocha`<br />
Opzioni: `mocha` | `jasmine`

### mochaOpts, jasmineOpts e cucumberOpts

Opzioni specifiche del framework. Vedi la documentazione dell'adattatore del framework per sapere quali opzioni sono disponibili. Leggi di più su questo in [Frameworks](frameworks).

Tipo: `Object`<br />
Predefinito: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Elenco delle funzionalità di cucumber con numeri di riga (quando si utilizza [il framework cucumber](./Frameworks.md#using-cucumber)).

Tipo: `String[]`
Predefinito: `[]`

### reporters

Elenco dei reporter da utilizzare. Un reporter può essere una stringa o un array di
`['reporterName', { /* reporter options */}]` dove il primo elemento è una stringa con il nome del reporter e il secondo elemento un oggetto con le opzioni del reporter.

Tipo: `String[]|Object[]`<br />
Predefinito: `[]`

Esempio:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Determina in quale intervallo il reporter dovrebbe verificare se sono sincronizzati se riportano i loro log in modo asincrono (ad esempio, se i log vengono trasmessi a un fornitore di terze parti).

Tipo: `Number`<br />
Predefinito: `100` (ms)

### reporterSyncTimeout

Determina il tempo massimo che i reporter hanno per terminare il caricamento di tutti i loro log fino a quando il testrunner genera un errore.

Tipo: `Number`<br />
Predefinito: `5000` (ms)

### execArgv

Argomenti Node da specificare quando si lanciano processi figlio.

Tipo: `String[]`<br />
Predefinito: `null`

### filesToWatch

Un elenco di pattern di stringhe che supportano glob che dicono al testrunner di osservare anche altri file, ad esempio file dell'applicazione, quando lo si esegue con il flag `--watch`. Per impostazione predefinita, il testrunner osserva già tutti i file spec.

Tipo: `String[]`<br />
Predefinito: `[]`

### updateSnapshots

Imposta su true se vuoi aggiornare i tuoi snapshot. Idealmente utilizzato come parte di un parametro CLI, ad es. `wdio run wdio.conf.js --s`.

Tipo: `'new' | 'all' | 'none'`<br />
Predefinito: `none` se non fornito e i test vengono eseguiti in CI, `new` se non fornito, altrimenti ciò che è stato fornito

### resolveSnapshotPath

Sovrascrive il percorso predefinito degli snapshot. Ad esempio, per memorizzare gli snapshot accanto ai file di test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Tipo: `(testPath: string, snapExtension: string) => string`<br />
Predefinito: memorizza i file di snapshot nella directory `__snapshots__` accanto al file di test

### tsConfigPath

WDIO utilizza `tsx` per compilare i file TypeScript. La tua configurazione TSConfig viene rilevata automaticamente dalla directory di lavoro corrente, ma puoi specificare un percorso personalizzato qui o impostando la variabile d'ambiente TSX_TSCONFIG_PATH.

Vedi i documenti di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Tipo: `String`<br />
Predefinito: `null`<br />

## Hook

Il testrunner WDIO ti consente di impostare hook da attivare in momenti specifici del ciclo di vita del test. Ciò consente azioni personalizzate (ad esempio, acquisire uno screenshot se un test fallisce).

Ogni hook ha come parametro informazioni specifiche sul ciclo di vita (ad esempio, informazioni sulla suite di test o sul test). Leggi di più su tutte le proprietà degli hook nel [nostro esempio di configurazione](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alcuni hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) vengono eseguiti in un processo diverso e quindi non possono condividere dati globali con gli altri hook che risiedono nel processo worker.

### onPrepare

Viene eseguito una volta prima che tutti i worker vengano avviati.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `param` (`object[]`): elenco dei dettagli delle capabilities

### onWorkerStart

Viene eseguito prima che un processo worker venga generato e può essere utilizzato per inizializzare un servizio specifico per quel worker e modificare gli ambienti di runtime in modo asincrono.

Parametri:

- `cid` (`string`): id capability (ad es. 0-0)
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specifiche da eseguire nel processo worker
- `args` (`object`): oggetto che verrà unito alla configurazione principale una volta che il worker è inizializzato
- `execArgv` (`string[]`): elenco di argomenti di stringa passati al processo worker

### onWorkerEnd

Viene eseguito subito dopo che un processo worker è terminato.

Parametri:

- `cid` (`string`): id capability (ad es. 0-0)
- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `specs` (`string[]`): specifiche da eseguire nel processo worker
- `retries` (`number`): numero di tentativi a livello di spec utilizzati come definito in [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Viene eseguito appena prima di inizializzare la sessione webdriver e il framework di test. Consente di manipolare le configurazioni in base alla capability o alla spec.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specifiche da eseguire nel processo worker

### before

Viene eseguito prima dell'inizio dell'esecuzione del test. A questo punto puoi accedere a tutte le variabili globali come `browser`. È il posto perfetto per definire comandi personalizzati.

Parametri:

- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specifiche da eseguire nel processo worker
- `browser` (`object`): istanza della sessione browser/dispositivo creata

### beforeSuite

Hook che viene eseguito prima dell'avvio della suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### beforeHook

Hook che viene eseguito *prima* di un hook all'interno della suite (ad esempio, viene eseguito prima di chiamare beforeEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)

### afterHook

Hook che viene eseguito *dopo* che un hook all'interno della suite termina (ad esempio, viene eseguito dopo aver chiamato afterEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funzione da eseguire prima di un test (solo in Mocha/Jasmine).

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto scope con cui è stato eseguito il test

### beforeCommand

Viene eseguito prima dell'esecuzione di un comando WebdriverIO.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe

### afterCommand

Viene eseguito dopo l'esecuzione di un comando WebdriverIO.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe
- `result` (`number`): 0 - comando riuscito, 1 - errore del comando
- `error` (`Error`): oggetto errore se presente

### afterTest

Funzione da eseguire dopo che un test (in Mocha/Jasmine) termina.

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto scope con cui è stato eseguito il test
- `result.error` (`Error`): oggetto errore in caso di fallimento del test, altrimenti `undefined`
- `result.result` (`Any`): oggetto di ritorno della funzione di test
- `result.duration` (`Number`): durata del test
- `result.passed` (`Boolean`): true se il test è passato, altrimenti false
- `result.retries` (`Object`): informazioni sui tentativi relativi a singoli test come definito per [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) e [Cucumber](./Retry.md#rerunning-in-cucumber), ad es. `{ attempts: 0, limit: 0 }`, vedi
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook che viene eseguito dopo che la suite è terminata (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### after

Viene eseguito dopo che tutti i test sono stati completati. Hai ancora accesso a tutte le variabili globali dal test.

Parametri:

- `result` (`number`): 0 - test passato, 1 - test fallito
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specifiche da eseguire nel processo worker

### afterSession

Viene eseguito subito dopo la terminazione della sessione webdriver.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specifiche da eseguire nel processo worker

### onComplete

Viene eseguito dopo che tutti i worker sono stati spenti e il processo sta per terminare. Un errore generato nell'hook onComplete causerà il fallimento dell'esecuzione del test.

Parametri:

- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `result` (`object`): oggetto dei risultati contenente i risultati dei test

### onReload

Viene eseguito quando si verifica un aggiornamento.

Parametri:

- `oldSessionId` (`string`): ID sessione della vecchia sessione
- `newSessionId` (`string`): ID sessione della nuova sessione

### beforeFeature

Viene eseguito prima di una Feature di Cucumber.

Parametri:

- `uri` (`string`): percorso al file feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto feature di Cucumber

### afterFeature

Viene eseguito dopo una Feature di Cucumber.

Parametri:

- `uri` (`string`): percorso al file feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto feature di Cucumber

### beforeScenario

Viene eseguito prima di uno Scenario di Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni su pickle e test step
- `context` (`object`): oggetto World di Cucumber

### afterScenario

Viene eseguito dopo uno Scenario di Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni su pickle e test step
- `result` (`object`): oggetto dei risultati contenente i risultati dello scenario
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errore se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto World di Cucumber

### beforeStep

Viene eseguito prima di uno Step di Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto step di Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario di Cucumber
- `context` (`object`): oggetto World di Cucumber

### afterStep

Viene eseguito dopo uno Step di Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto step di Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario di Cucumber
- `result`: (`object`): oggetto dei risultati contenente i risultati dello step
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errore se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto World di Cucumber

### beforeAssertion

Hook che viene eseguito prima che avvenga un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher (ad es. `toHaveTitle`)
- `params.expectedValue`: valore che viene passato al matcher
- `params.options`: opzioni di asserzione

### afterAssertion

Hook che viene eseguito dopo che è avvenuta un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher (ad es. `toHaveTitle`)
- `params.expectedValue`: valore che viene passato al matcher
- `params.options`: opzioni di asserzione
- `params.result`: risultati dell'asserzione