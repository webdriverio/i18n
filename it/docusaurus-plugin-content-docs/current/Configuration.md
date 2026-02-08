---
id: configuration
title: Configurazione
---

Basato sul [tipo di configurazione](/docs/setuptypes) (ad esempio, usando i binding del protocollo raw, WebdriverIO come pacchetto standalone o il test runner WDIO) è disponibile un diverso insieme di opzioni per controllare l'ambiente.

## Opzioni WebDriver

Le seguenti opzioni sono definite quando si utilizza il pacchetto di protocollo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocollo da utilizzare per comunicare con il server driver.

Tipo: `String`<br />
Default: `http`

### hostname

Host del tuo server driver.

Tipo: `String`<br />
Default: `0.0.0.0`

### port

Porta su cui si trova il tuo server driver.

Tipo: `Number`<br />
Default: `undefined`

### path

Percorso dell'endpoint del server driver.

Tipo: `String`<br />
Default: `/`

### queryParams

Parametri di query che vengono propagati al server driver.

Tipo: `Object`<br />
Default: `undefined`

### user

Il tuo nome utente del servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questo può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Default: `undefined`

### key

La tua chiave di accesso al servizio cloud o chiave segreta (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questo può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Default: `undefined`

### capabilities

Definisce le capacità che desideri eseguire nella tua sessione WebDriver. Controlla il [Protocollo WebDriver](https://w3c.github.io/webdriver/#capabilities) per ulteriori dettagli. Se esegui un driver più vecchio che non supporta il protocollo WebDriver, dovrai utilizzare le [capacità JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) per eseguire con successo una sessione.

Oltre alle capacità basate su WebDriver, puoi applicare opzioni specifiche del browser e del fornitore che consentono una configurazione più profonda del browser o dispositivo remoto. Queste sono documentate nei corrispondenti documenti del fornitore, ad esempio:

- `goog:chromeOptions`: per [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: per [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: per [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: per [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: per [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: per [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Inoltre, un'utilità utile è il [Configuratore di Test Automatizzati](https://docs.saucelabs.com/basics/platform-configurator/) di Sauce Labs, che ti aiuta a creare questo oggetto cliccando insieme le capacità desiderate.

Tipo: `Object`<br />
Default: `null`

**Esempio:**

```js
{
    browserName: 'chrome', // opzioni: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versione del browser
    platformName: 'Windows 10' // piattaforma OS
}
```

Se stai eseguendo test web o nativi su dispositivi mobili, `capabilities` differisce dal protocollo WebDriver. Vedi la [Documentazione di Appium](https://appium.io/docs/en/latest/guides/caps/) per ulteriori dettagli.

### logLevel

Livello di verbosità del logging.

Tipo: `String`<br />
Default: `info`<br />
Opzioni: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Directory per memorizzare tutti i file di log del testrunner (inclusi i log dei reporter e i log `wdio`). Se non impostato, tutti i log vengono trasmessi a `stdout`. Poiché la maggior parte dei reporter è progettata per scrivere su `stdout`, si consiglia di utilizzare questa opzione solo per reporter specifici dove ha più senso inviare il report in un file (come il reporter `junit`, per esempio).

Quando si esegue in modalità standalone, l'unico log generato da WebdriverIO sarà il log `wdio`.

Tipo: `String`<br />
Default: `null`

### connectionRetryTimeout

Timeout per qualsiasi richiesta WebDriver a un driver o grid.

Tipo: `Number`<br />
Default: `120000`

### connectionRetryCount

Conteggio massimo di tentativi di richiesta al server Selenium.

Tipo: `Number`<br />
Default: `3`

### agent

Consente di utilizzare un `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) personalizzato per effettuare richieste.

Tipo: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Specifica `headers` personalizzati da passare in ogni richiesta WebDriver. Se la tua Selenium Grid richiede l'Autenticazione di Base, ti consigliamo di passare un'intestazione `Authorization` attraverso questa opzione per autenticare le tue richieste WebDriver, ad esempio:

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
Default: `{}`

### transformRequest

Funzione che intercetta le [opzioni della richiesta HTTP](https://github.com/sindresorhus/got#options) prima che venga effettuata una richiesta WebDriver

Tipo: `(RequestOptions) => RequestOptions`<br />
Default: *nessuno*

### transformResponse

Funzione che intercetta gli oggetti di risposta HTTP dopo che è arrivata una risposta WebDriver. La funzione riceve l'oggetto di risposta originale come primo argomento e le corrispondenti `RequestOptions` come secondo argomento.

Tipo: `(Response, RequestOptions) => Response`<br />
Default: *nessuno*

### strictSSL

Se non richiede che il certificato SSL sia valido.
Può essere impostato tramite variabili d'ambiente come `STRICT_SSL` o `strict_ssl`.

Tipo: `Boolean`<br />
Default: `true`

### enableDirectConnect

Se abilitare la [funzione di connessione diretta di Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Non fa nulla se la risposta non ha le chiavi appropriate mentre il flag è abilitato.

Tipo: `Boolean`<br />
Default: `true`

### cacheDir

Il percorso alla radice della directory della cache. Questa directory viene utilizzata per memorizzare tutti i driver che vengono scaricati quando si tenta di avviare una sessione.

Tipo: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Per un logging più sicuro, le espressioni regolari impostate con `maskingPatterns` possono offuscare le informazioni sensibili dal log.
 - Il formato stringa è un'espressione regolare con o senza flag (es. `/.../i`) e separata da virgole per più espressioni regolari.
 - Per ulteriori dettagli sui pattern di mascheramento, consulta la [sezione Masking Patterns nel README di WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Tipo: `String`<br />
Default: `undefined`

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

Se desideri automatizzare il browser utilizzando una tecnologia di automazione diversa, assicurati di impostare questa proprietà a un percorso che si risolva in un modulo che aderisce alla seguente interfaccia:

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
Default: `webdriver`

### baseUrl

Abbrevia le chiamate del comando `url` impostando un URL base.
- Se il parametro `url` inizia con `/`, allora viene anteposto `baseUrl` (eccetto il percorso `baseUrl`, se ne ha uno).
- Se il parametro `url` inizia senza uno schema o `/` (come `some/path`), allora l'intero `baseUrl` viene anteposto direttamente.

Tipo: `String`<br />
Default: `null`

### waitforTimeout

Timeout predefinito per tutti i comandi `waitFor*`. (Nota la "f" minuscola nel nome dell'opzione.) Questo timeout influisce __solo__ sui comandi che iniziano con `waitFor*` e sul loro tempo di attesa predefinito.

Per aumentare il timeout per un _test_, consulta la documentazione del framework.

Tipo: `Number`<br />
Default: `5000`

### waitforInterval

Intervallo predefinito per tutti i comandi `waitFor*` per verificare se è cambiato uno stato previsto (ad esempio, visibilità).

Tipo: `Number`<br />
Default: `100`

### region

Se esegui su Sauce Labs, puoi scegliere di eseguire i test tra diversi data center: US o EU.
Per cambiare la regione in EU, aggiungi `region: 'eu'` alla tua configurazione.

__Nota:__ Questo ha effetto solo se fornisci le opzioni `user` e `key` che sono collegate al tuo account Sauce Labs.

Tipo: `String`<br />
Default: `us`

*(solo per vm e/o em/simulatori)*

---

## Opzioni Testrunner

Le seguenti opzioni (comprese quelle elencate sopra) sono definite solo per l'esecuzione di WebdriverIO con il testrunner WDIO:

### specs

Definisce le specifiche per l'esecuzione del test. Puoi specificare un pattern glob per abbinare più file contemporaneamente o racchiudere un glob o un insieme di percorsi in un array per eseguirli all'interno di un singolo processo worker. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

Tipo: `(String | String[])[]`<br />
Default: `[]`

### exclude

Esclude le specifiche dall'esecuzione del test. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

Tipo: `String[]`<br />
Default: `[]`

### suites

Un oggetto che descrive varie suite, che puoi quindi specificare con l'opzione `--suite` sulla CLI `wdio`.

Tipo: `Object`<br />
Default: `{}`

### capabilities

Lo stesso della sezione `capabilities` descritta sopra, tranne per la possibilità di specificare un oggetto [`multiremote`](/docs/multiremote) o più sessioni WebDriver in un array per l'esecuzione parallela.

Puoi applicare le stesse capacità specifiche del fornitore e del browser come definito [sopra](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Numero massimo totale di worker in esecuzione parallela.

__Nota:__ che può essere un numero fino a `100`, quando i test vengono eseguiti su alcuni fornitori esterni come le macchine di Sauce Labs. In questo caso, i test non vengono eseguiti su una singola macchina, ma piuttosto su più macchine virtuali. Se i test devono essere eseguiti su una macchina di sviluppo locale, usa un numero più ragionevole come `3`, `4` o `5`. Essenzialmente, questo è il numero di browser che verranno avviati contemporaneamente ed eseguiranno i tuoi test nello stesso momento, quindi dipende dalla quantità di RAM presente sulla tua macchina e da quante altre app sono in esecuzione sulla tua macchina.

Puoi anche applicare `maxInstances` all'interno dei tuoi oggetti capability utilizzando la capacità `wdio:maxInstances`. Questo limiterà la quantità di sessioni parallele per quella particolare capacità.

Tipo: `Number`<br />
Default: `100`

### maxInstancesPerCapability

Numero massimo di worker in esecuzione parallela per capacità.

Tipo: `Number`<br />
Default: `100`

### injectGlobals

Inserisce i global di WebdriverIO (es. `browser`, `$` e `$$`) nell'ambiente globale.
Se impostato su `false`, dovresti importare da `@wdio/globals`, ad esempio:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO non gestisce l'iniezione di global specifici del framework di test.

Tipo: `Boolean`<br />
Default: `true`

### bail

Se vuoi che l'esecuzione del test si interrompa dopo un numero specifico di fallimenti dei test, usa `bail`.
(Il valore predefinito è `0`, che esegue tutti i test indipendentemente dal risultato.) **Nota:** Un test in questo contesto sono tutti i test all'interno di un singolo file spec (quando si utilizza Mocha o Jasmine) o tutti i passaggi all'interno di un file di funzionalità (quando si utilizza Cucumber). Se vuoi controllare il comportamento di bail all'interno dei test di un singolo file di test, dai un'occhiata alle opzioni [framework](frameworks) disponibili.

Tipo: `Number`<br />
Default: `0` (non interrompere; esegui tutti i test)

### specFileRetries

Il numero di volte per riprovare un intero file di specifiche quando fallisce nel suo complesso.

Tipo: `Number`<br />
Default: `0`

### specFileRetriesDelay

Ritardo in secondi tra i tentativi di riprova del file di specifiche

Tipo: `Number`<br />
Default: `0`

### specFileRetriesDeferred

Se i file di specifiche riprovati debbano essere riprovati immediatamente o differiti alla fine della coda.

Tipo: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

Scegli la vista dell'output del log.

Se impostato su `false`, i log da diversi file di test verranno stampati in tempo reale. Tieni presente che ciò potrebbe comportare la miscelazione degli output di log da file diversi quando si esegue in parallelo.

Se impostato su `true`, gli output del log verranno raggruppati per Spec Test e stampati solo quando la Spec Test è completata.

Per impostazione predefinita, è impostato su `false`, quindi i log vengono stampati in tempo reale.

Tipo: `Boolean`<br />
Default: `false`

### autoAssertOnTestEnd

Controlla se WebdriverIO verifica automaticamente tutte le asserzioni soft alla fine di ogni test. Quando è impostato su `true`, tutte le asserzioni soft accumulate verranno controllate automaticamente e causeranno il fallimento del test se alcune asserzioni sono fallite. Quando è impostato su `false`, è necessario chiamare manualmente il metodo assert per verificare le asserzioni soft.

Tipo: `Boolean`<br />
Default: `true`

### services

I servizi si occupano di un compito specifico di cui non vuoi occuparti. Migliorano la tua configurazione di test con uno sforzo minimo.

Tipo: `String[]|Object[]`<br />
Default: `[]`

### framework

Definisce il framework di test da utilizzare dal testrunner WDIO.

Tipo: `String`<br />
Default: `mocha`<br />
Opzioni: `mocha` | `jasmine`

### mochaOpts, jasmineOpts e cucumberOpts

Opzioni specifiche del framework. Consulta la documentazione dell'adattatore del framework per conoscere le opzioni disponibili. Leggi di più su questo in [Frameworks](frameworks).

Tipo: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Elenco di funzionalità cucumber con numeri di riga (quando [si utilizza il framework cucumber](./Frameworks.md#using-cucumber)).

Tipo: `String[]`
Default: `[]`

### reporters

Elenco di reporter da utilizzare. Un reporter può essere una stringa o un array di
`['reporterName', { /* opzioni reporter */}]` dove il primo elemento è una stringa con il nome del reporter e il secondo elemento è un oggetto con le opzioni del reporter.

Tipo: `String[]|Object[]`<br />
Default: `[]`

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
Default: `100` (ms)

### reporterSyncTimeout

Determina il tempo massimo che i reporter hanno per terminare il caricamento di tutti i loro log fino a quando non viene generato un errore dal testrunner.

Tipo: `Number`<br />
Default: `5000` (ms)

### execArgv

Argomenti Node da specificare quando si avviano i processi figlio.

Tipo: `String[]`<br />
Default: `null`

### filesToWatch

Un elenco di pattern di stringhe che supportano glob che dicono al testrunner di tenere d'occhio anche altri file, ad esempio file dell'applicazione, quando lo si esegue con il flag `--watch`. Per impostazione predefinita, il testrunner guarda già tutti i file spec.

Tipo: `String[]`<br />
Default: `[]`

### updateSnapshots

Imposta su true se vuoi aggiornare i tuoi snapshot. Idealmente utilizzato come parte di un parametro CLI, ad esempio `wdio run wdio.conf.js --s`.

Tipo: `'new' | 'all' | 'none'`<br />
Default: `none` se non fornito e i test vengono eseguiti in CI, `new` se non fornito, altrimenti ciò che è stato fornito

### resolveSnapshotPath

Sostituisce il percorso snapshot predefinito. Ad esempio, per memorizzare gli snapshot accanto ai file di test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Tipo: `(testPath: string, snapExtension: string) => string`<br />
Default: memorizza i file snapshot nella directory `__snapshots__` accanto al file di test

### tsConfigPath

WDIO utilizza `tsx` per compilare i file TypeScript. Il tuo TSConfig viene automaticamente rilevato dalla directory di lavoro corrente, ma puoi specificare un percorso personalizzato qui o impostando la variabile d'ambiente TSX_TSCONFIG_PATH.

Vedi la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Tipo: `String`<br />
Default: `null`<br />

## Hook

Il testrunner WDIO ti consente di impostare hook da attivare in momenti specifici del ciclo di vita del test. Questo consente azioni personalizzate (ad esempio, scattare uno screenshot se un test fallisce).

Ogni hook ha come parametro informazioni specifiche sul ciclo di vita (ad esempio, informazioni sulla suite di test o sul test). Leggi di più su tutte le proprietà degli hook nel [nostro esempio di configurazione](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alcuni hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) vengono eseguiti in un processo diverso e quindi non possono condividere dati globali con gli altri hook che vivono nel processo worker.

### onPrepare

Viene eseguito una volta prima che tutti i worker vengano lanciati.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `param` (`object[]`): elenco dei dettagli delle capacità

### onWorkerStart

Viene eseguito prima che venga generato un processo worker e può essere utilizzato per inizializzare servizi specifici per quel worker e per modificare gli ambienti di runtime in modo asincrono.

Parametri:

- `cid` (`string`): id della capacità (ad esempio 0-0)
- `caps` (`object`): contiene le capacità per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker
- `args` (`object`): oggetto che verrà unito alla configurazione principale una volta che il worker è inizializzato
- `execArgv` (`string[]`): elenco di argomenti stringa passati al processo worker

### onWorkerEnd

Viene eseguito subito dopo che un processo worker è terminato.

Parametri:

- `cid` (`string`): id della capacità (ad esempio 0-0)
- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `specs` (`string[]`): specs eseguiti nel processo worker
- `retries` (`number`): numero di tentativi a livello di spec utilizzati come definito in [_"Aggiungi tentativi su base per-specfile"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Viene eseguito appena prima di inizializzare la sessione webdriver e il framework di test. Consente di manipolare le configurazioni in base alla capacità o alla spec.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capacità per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker

### before

Viene eseguito prima dell'inizio dell'esecuzione del test. A questo punto puoi accedere a tutte le variabili globali come `browser`. È il posto perfetto per definire comandi personalizzati.

Parametri:

- `caps` (`object`): contiene le capacità per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker
- `browser` (`object`): istanza della sessione browser/dispositivo creata

### beforeSuite

Hook che viene eseguito prima dell'inizio della suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### beforeHook

Hook che viene eseguito *prima* di un hook all'interno della suite (ad esempio, viene eseguito prima di chiamare beforeEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)

### afterHook

Hook che viene eseguito *dopo* la fine di un hook all'interno della suite (ad esempio, viene eseguito dopo aver chiamato afterEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)
- `result` (`object`): risultato dell'hook (contiene proprietà `error`, `result`, `duration`, `passed`, `retries`)

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
- `result` (`*`): risultato del comando
- `error` (`Error`): oggetto errore se presente

### afterTest

Funzione da eseguire dopo la fine di un test (in Mocha/Jasmine).

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto scope con cui è stato eseguito il test
- `result.error` (`Error`): oggetto errore in caso di fallimento del test, altrimenti `undefined`
- `result.result` (`Any`): oggetto di ritorno della funzione del test
- `result.duration` (`Number`): durata del test
- `result.passed` (`Boolean`): true se il test è passato, altrimenti false
- `result.retries` (`Object`): informazioni sui tentativi relativi al singolo test come definito per [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) e [Cucumber](./Retry.md#rerunning-in-cucumber), ad esempio `{ attempts: 0, limit: 0 }`, vedi
- `result` (`object`): risultato dell'hook (contiene proprietà `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook che viene eseguito dopo la fine della suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### after

Viene eseguito dopo che tutti i test sono stati completati. Hai ancora accesso a tutte le variabili globali del test.

Parametri:

- `result` (`number`): 0 - test passato, 1 - test fallito
- `caps` (`object`): contiene le capacità per la sessione che è stata generata nel worker
- `specs` (`string[]`): specs eseguiti nel processo worker

### afterSession

Viene eseguito subito dopo aver terminato la sessione webdriver.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capacità per la sessione che è stata generata nel worker
- `specs` (`string[]`): specs eseguiti nel processo worker

### onComplete

Viene eseguito dopo che tutti i worker sono stati chiusi e il processo sta per terminare. Un errore generato nell'hook onComplete provocherà il fallimento dell'esecuzione del test.

Parametri:

- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contiene le capacità per la sessione che è stata generata nel worker
- `result` (`object`): oggetto dei risultati contenente i risultati dei test

### onReload

Viene eseguito quando si verifica un aggiornamento.

Parametri:

- `oldSessionId` (`string`): ID sessione della vecchia sessione
- `newSessionId` (`string`): ID sessione della nuova sessione

### beforeFeature

Viene eseguito prima di una funzionalità Cucumber.

Parametri:

- `uri` (`string`): percorso del file della funzionalità
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto funzionalità di Cucumber

### afterFeature

Viene eseguito dopo una funzionalità Cucumber.

Parametri:

- `uri` (`string`): percorso del file della funzionalità
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto funzionalità di Cucumber

### beforeScenario

Viene eseguito prima di uno scenario Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni su pickle e fase di test
- `context` (`object`): oggetto World di Cucumber

### afterScenario

Viene eseguito dopo uno scenario Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni su pickle e fase di test
- `result` (`object`): oggetto dei risultati contenente i risultati dello scenario
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errori se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto World di Cucumber

### beforeStep

Viene eseguito prima di un passo Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto passo di Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario di Cucumber
- `context` (`object`): oggetto World di Cucumber

### afterStep

Viene eseguito dopo un passo Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto passo di Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario di Cucumber
- `result`: (`object`): oggetto dei risultati contenente i risultati del passo
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errori se lo scenario è fallito
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