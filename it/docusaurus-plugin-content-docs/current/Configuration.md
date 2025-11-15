---
id: configuration
title: Configurazione
---

In base al [tipo di configurazione](/docs/setuptypes) (ad esempio utilizzando i binding del protocollo raw, WebdriverIO come pacchetto standalone o il testrunner WDIO) è disponibile un diverso set di opzioni per controllare l'ambiente.

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

Il tuo nome utente del servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questo può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Predefinito: `undefined`

### key

La tua chiave di accesso o chiave segreta del servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Se impostato, WebdriverIO imposterà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questo può essere utilizzato per autenticare qualsiasi altro backend WebDriver.

Tipo: `String`<br />
Predefinito: `undefined`

### capabilities

Definisce le capabilities che vuoi eseguire nella tua sessione WebDriver. Consulta il [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) per maggiori dettagli. Se esegui un driver più vecchio che non supporta il protocollo WebDriver, dovrai utilizzare le [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) per eseguire con successo una sessione.

Accanto alle capabilities basate su WebDriver, puoi applicare opzioni specifiche per browser e fornitori che consentono una configurazione più profonda del browser remoto o del dispositivo. Queste sono documentate nelle corrispondenti documentazioni dei fornitori, ad esempio:

- `goog:chromeOptions`: per [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: per [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: per [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: per [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: per [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: per [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Inoltre, uno strumento utile è il [Configuratore di Test Automatizzati](https://docs.saucelabs.com/basics/platform-configurator/) di Sauce Labs, che ti aiuta a creare questo oggetto cliccando insieme le capabilities desiderate.

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

Se stai eseguendo test web o nativi su dispositivi mobili, `capabilities` differisce dal protocollo WebDriver. Consulta la [documentazione di Appium](https://appium.io/docs/en/latest/guides/caps/) per maggiori dettagli.

### logLevel

Livello di dettaglio dei log.

Tipo: `String`<br />
Predefinito: `info`<br />
Opzioni: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Directory in cui memorizzare tutti i file di log del testrunner (inclusi i log dei reporter e i log `wdio`). Se non impostato, tutti i log vengono trasmessi a `stdout`. Poiché la maggior parte dei reporter è progettata per scrivere su `stdout`, si consiglia di utilizzare questa opzione solo per reporter specifici in cui ha più senso inviare i report in un file (come il reporter `junit`, ad esempio).

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

Specifica `headers` personalizzati da passare in ogni richiesta WebDriver. Se la tua Grid Selenium richiede l'autenticazione di base, ti consigliamo di passare un header `Authorization` tramite questa opzione per autenticare le tue richieste WebDriver, ad esempio:

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

Funzione che intercetta gli oggetti di risposta HTTP dopo che una risposta WebDriver è arrivata. La funzione riceve l'oggetto di risposta originale come primo argomento e le corrispondenti `RequestOptions` come secondo argomento.

Tipo: `(Response, RequestOptions) => Response`<br />
Predefinito: *nessuno*

### strictSSL

Se non richiede che il certificato SSL sia valido.
Può essere impostato tramite variabili d'ambiente come `STRICT_SSL` o `strict_ssl`.

Tipo: `Boolean`<br />
Predefinito: `true`

### enableDirectConnect

Se abilitare la [funzionalità di connessione diretta di Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Non fa nulla se la risposta non ha le chiavi appropriate mentre il flag è abilitato.

Tipo: `Boolean`<br />
Predefinito: `true`

### cacheDir

Il percorso della root della directory della cache. Questa directory viene utilizzata per memorizzare tutti i driver che vengono scaricati quando si tenta di avviare una sessione.

Tipo: `String`<br />
Predefinito: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Per una registrazione più sicura, le espressioni regolari impostate con `maskingPatterns` possono oscurare le informazioni sensibili dal log.
 - Il formato stringa è un'espressione regolare con o senza flag (ad es. `/.../i`) e separata da virgole per più espressioni regolari.
 - Per maggiori dettagli sui pattern di mascheramento, consulta la [sezione Masking Patterns nel README del WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Definisci il protocollo che vuoi utilizzare per l'automazione del browser. Attualmente è supportato solo [`webdriver`](https://www.npmjs.com/package/webdriver), in quanto è la principale tecnologia di automazione del browser utilizzata da WebdriverIO.

Se vuoi automatizzare il browser utilizzando una diversa tecnologia di automazione, assicurati di impostare questa proprietà su un percorso che si risolve in un modulo che aderisce alla seguente interfaccia:

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

Abbrevia le chiamate del comando `url` impostando un URL base.
- Se il parametro `url` inizia con `/`, allora `baseUrl` viene anteposto (tranne il percorso di `baseUrl`, se ne ha uno).
- Se il parametro `url` inizia senza uno schema o `/` (come `some/path`), viene anteposto direttamente l'intero `baseUrl`.

Tipo: `String`<br />
Predefinito: `null`

### waitforTimeout

Timeout predefinito per tutti i comandi `waitFor*`. (Nota la "f" minuscola nel nome dell'opzione.) Questo timeout __solo__ influenza i comandi che iniziano con `waitFor*` e il loro tempo di attesa predefinito.

Per aumentare il timeout per un _test_, consultare la documentazione del framework.

Tipo: `Number`<br />
Predefinito: `5000`

### waitforInterval

Intervallo predefinito per tutti i comandi `waitFor*` per verificare se è stato modificato uno stato previsto (ad esempio, visibilità).

Tipo: `Number`<br />
Predefinito: `100`

### region

Se si esegue su Sauce Labs, è possibile scegliere di eseguire i test tra diversi data center: US o EU.
Per cambiare la regione in EU, aggiungi `region: 'eu'` alla tua configurazione.

__Nota:__ Questo ha effetto solo se fornisci le opzioni `user` e `key` che sono collegate al tuo account Sauce Labs.

Tipo: `String`<br />
Predefinito: `us`

*(solo per vm e/o em/simulatori)*

---

## Opzioni Testrunner

Le seguenti opzioni (incluse quelle elencate sopra) sono definite solo per l'esecuzione di WebdriverIO con il testrunner WDIO:

### specs

Definisci le specifiche per l'esecuzione del test. Puoi specificare un pattern glob per abbinare più file contemporaneamente o avvolgere un glob o un set di percorsi in un array per eseguirli all'interno di un singolo processo worker. Tutti i percorsi sono visti come relativi al percorso del file di configurazione.

Tipo: `(String | String[])[]`<br />
Predefinito: `[]`

### exclude

Escludi specifiche dall'esecuzione del test. Tutti i percorsi sono visti come relativi al percorso del file di configurazione.

Tipo: `String[]`<br />
Predefinito: `[]`

### suites

Un oggetto che descrive varie suite, che puoi poi specificare con l'opzione `--suite` nella CLI `wdio`.

Tipo: `Object`<br />
Predefinito: `{}`

### capabilities

Lo stesso della sezione `capabilities` descritta sopra, tranne con la possibilità di specificare un oggetto [`multiremote`](/docs/multiremote), o più sessioni WebDriver in un array per l'esecuzione parallela.

Puoi applicare le stesse capabilities specifiche per fornitore e browser come definito [sopra](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Predefinito: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Numero massimo totale di worker in esecuzione parallela.

__Nota:__ può essere un numero alto come `100`, quando i test vengono eseguiti su alcuni fornitori esterni come le macchine di Sauce Labs. Lì, i test non vengono testati su una singola macchina, ma piuttosto su più VM. Se i test devono essere eseguiti su una macchina di sviluppo locale, usa un numero più ragionevole, come `3`, `4` o `5`. In sostanza, questo è il numero di browser che verranno avviati contemporaneamente ed eseguiranno i tuoi test allo stesso tempo, quindi dipende da quanta RAM è disponibile sulla tua macchina e quante altre app sono in esecuzione sulla tua macchina.

Puoi anche applicare `maxInstances` all'interno dei tuoi oggetti capability utilizzando la capability `wdio:maxInstances`. Questo limiterà la quantità di sessioni parallele per quella particolare capability.

Tipo: `Number`<br />
Predefinito: `100`

### maxInstancesPerCapability

Numero massimo di worker in esecuzione parallela per capability.

Tipo: `Number`<br />
Predefinito: `100`

### injectGlobals

Inserisce i globali di WebdriverIO (ad es. `browser`, `$` e `$$`) nell'ambiente globale.
Se impostato su `false`, dovresti importare da `@wdio/globals`, ad esempio:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO non gestisce l'iniezione di globali specifici del framework di test.

Tipo: `Boolean`<br />
Predefinito: `true`

### bail

Se vuoi che la tua esecuzione di test si fermi dopo un numero specifico di test falliti, usa `bail`.
(Il valore predefinito è `0`, che esegue tutti i test indipendentemente da tutto.) **Nota:** Un test in questo contesto sono tutti i test all'interno di un singolo file spec (quando si utilizza Mocha o Jasmine) o tutti i passaggi all'interno di un file di funzionalità (quando si utilizza Cucumber). Se desideri controllare il comportamento di bail all'interno dei test di un singolo file di test, dai un'occhiata alle opzioni [framework](frameworks) disponibili.

Tipo: `Number`<br />
Predefinito: `0` (non fare bail; esegui tutti i test)

### specFileRetries

Il numero di volte per riprovare un intero file specfile quando fallisce nel suo insieme.

Tipo: `Number`<br />
Predefinito: `0`

### specFileRetriesDelay

Ritardo in secondi tra i tentativi di riprova del file spec

Tipo: `Number`<br />
Predefinito: `0`

### specFileRetriesDeferred

Se i file spec riprovati devono essere ritentati immediatamente o differiti alla fine della coda.

Tipo: `Boolean`<br />
Predefinito: `true`

### groupLogsByTestSpec

Scegli la visualizzazione dell'output dei log.

Se impostato su `false` i log di diversi file di test saranno stampati in tempo reale. Nota che questo potrebbe risultare nella miscelazione degli output di log da file diversi quando si esegue in parallelo.

Se impostato su `true` gli output di log saranno raggruppati per Test Spec e stampati solo quando il Test Spec è completato.

Per impostazione predefinita, è impostato su `false` quindi i log vengono stampati in tempo reale.

Tipo: `Boolean`<br />
Predefinito: `false`

### autoAssertOnTestEnd

Controlla se WebdriverIO asserisce automaticamente tutte le asserzioni soft alla fine di ogni test. Quando impostato su `true`, tutte le asserzioni soft accumulate saranno automaticamente verificate e causeranno il fallimento del test se alcune asserzioni sono fallite. Quando impostato su `false`, devi chiamare manualmente il metodo assert per verificare le asserzioni soft.

Tipo: `Boolean`<br />
Predefinito: `true`

### services

I servizi si occupano di un lavoro specifico di cui non vuoi occuparti. Migliorano la tua configurazione di test con quasi nessuno sforzo.

Tipo: `String[]|Object[]`<br />
Predefinito: `[]`

### framework

Definisce il framework di test da utilizzare con il testrunner WDIO.

Tipo: `String`<br />
Predefinito: `mocha`<br />
Opzioni: `mocha` | `jasmine`

### mochaOpts, jasmineOpts e cucumberOpts

Opzioni specifiche del framework. Consulta la documentazione dell'adattatore del framework per sapere quali opzioni sono disponibili. Leggi di più su questo in [Frameworks](frameworks).

Tipo: `Object`<br />
Predefinito: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista delle funzionalità cucumber con numeri di riga (quando [si utilizza il framework cucumber](./Frameworks.md#using-cucumber)).

Tipo: `String[]`
Predefinito: `[]`

### reporters

Elenco dei reporter da utilizzare. Un reporter può essere una stringa o un array di
`['reporterName', { /* reporter options */}]` dove il primo elemento è una stringa con il nome del reporter e il secondo elemento un oggetto con opzioni del reporter.

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

Determina in quale intervallo il reporter dovrebbe verificare se sono sincronizzati se riportano i loro log in modo asincrono (ad es. se i log vengono trasmessi a un fornitore terzo).

Tipo: `Number`<br />
Predefinito: `100` (ms)

### reporterSyncTimeout

Determina il tempo massimo che i reporter hanno per terminare il caricamento di tutti i loro log fino a quando viene lanciato un errore dal testrunner.

Tipo: `Number`<br />
Predefinito: `5000` (ms)

### execArgv

Argomenti Node da specificare quando si avviano processi figlio.

Tipo: `String[]`<br />
Predefinito: `null`

### filesToWatch

Un elenco di pattern di stringhe che supportano glob che indicano al testrunner di guardare anche altri file, ad esempio file dell'applicazione, quando lo si esegue con il flag `--watch`. Per impostazione predefinita, il testrunner guarda già tutti i file spec.

Tipo: `String[]`<br />
Predefinito: `[]`

### updateSnapshots

Imposta su true se vuoi aggiornare i tuoi snapshot. Idealmente usato come parte di un parametro CLI, ad esempio `wdio run wdio.conf.js --s`.

Tipo: `'new' | 'all' | 'none'`<br />
Predefinito: `none` se non fornito e i test vengono eseguiti in CI, `new` se non fornito, altrimenti ciò che è stato fornito

### resolveSnapshotPath

Sovrascrive il percorso snapshot predefinito. Ad esempio, per memorizzare gli snapshot accanto ai file di test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Tipo: `(testPath: string, snapExtension: string) => string`<br />
Predefinito: memorizza i file snapshot nella directory `__snapshots__` accanto al file di test

### tsConfigPath

WDIO utilizza `tsx` per compilare i file TypeScript. Il tuo TSConfig viene rilevato automaticamente dalla directory di lavoro corrente ma puoi specificare un percorso personalizzato qui o impostando la variabile di ambiente TSX_TSCONFIG_PATH.

Vedi la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Tipo: `String`<br />
Predefinito: `null`<br />

## Hooks

Il testrunner WDIO ti consente di impostare hook da attivare in momenti specifici del ciclo di vita del test. Questo consente azioni personalizzate (ad es. scattare uno screenshot se un test fallisce).

Ogni hook ha come parametro informazioni specifiche sul ciclo di vita (ad es. informazioni sulla suite di test o test). Leggi di più su tutte le proprietà degli hook nella [nostra configurazione di esempio](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alcuni hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) vengono eseguiti in un processo diverso e quindi non possono condividere dati globali con gli altri hook che vivono nel processo worker.

### onPrepare

Viene eseguito una volta prima che tutti i worker vengano lanciati.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `param` (`object[]`): elenco dei dettagli delle capabilities

### onWorkerStart

Viene eseguito prima che un processo worker venga generato e può essere utilizzato per inizializzare un servizio specifico per quel worker e modificare gli ambienti di runtime in modo asincrono.

Parametri:

- `cid` (`string`): id della capability (es. 0-0)
- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker
- `args` (`object`): oggetto che verrà unito alla configurazione principale una volta che il worker è inizializzato
- `execArgv` (`string[]`): elenco di argomenti stringa passati al processo worker

### onWorkerEnd

Viene eseguito subito dopo che un processo worker è uscito.

Parametri:

- `cid` (`string`): id della capability (es. 0-0)
- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `specs` (`string[]`): specs da eseguire nel processo worker
- `retries` (`number`): numero di tentativi a livello di spec utilizzati come definito in [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Viene eseguito appena prima di inizializzare la sessione webdriver e il framework di test. Ti permette di manipolare le configurazioni in base alla capability o alla spec.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker

### before

Viene eseguito prima che inizi l'esecuzione del test. A questo punto puoi accedere a tutte le variabili globali come `browser`. È il posto perfetto per definire comandi personalizzati.

Parametri:

- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker
- `browser` (`object`): istanza della sessione browser/dispositivo creata

### beforeSuite

Hook che viene eseguito prima che inizi la suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### beforeHook

Hook che viene eseguito *prima* di un hook all'interno della suite (ad es. viene eseguito prima di chiamare beforeEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)

### afterHook

Hook che viene eseguito *dopo* che un hook all'interno della suite termina (ad es. viene eseguito dopo aver chiamato afterEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funzione da eseguire prima di un test (solo in Mocha/Jasmine).

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto scope con cui il test è stato eseguito

### beforeCommand

Viene eseguito prima che un comando WebdriverIO venga eseguito.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe

### afterCommand

Viene eseguito dopo che un comando WebdriverIO è stato eseguito.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe
- `result` (`*`): risultato del comando
- `error` (`Error`): oggetto errore se presente

### afterTest

Funzione da eseguire dopo che un test (in Mocha/Jasmine) termina.

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto scope con cui il test è stato eseguito
- `result.error` (`Error`): oggetto errore in caso di fallimento del test, altrimenti `undefined`
- `result.result` (`Any`): oggetto di ritorno della funzione di test
- `result.duration` (`Number`): durata del test
- `result.passed` (`Boolean`): true se il test è passato, altrimenti false
- `result.retries` (`Object`): informazioni sui tentativi di riprova relativi a un singolo test come definito per [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) e [Cucumber](./Retry.md#rerunning-in-cucumber), ad es. `{ attempts: 0, limit: 0 }`, vedi
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook che viene eseguito dopo che la suite è terminata (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### after

Viene eseguito dopo che tutti i test sono terminati. Hai ancora accesso a tutte le variabili globali dal test.

Parametri:

- `result` (`number`): 0 - test passato, 1 - test fallito
- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker

### afterSession

Viene eseguito subito dopo la terminazione della sessione webdriver.

Parametri:

- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): specs da eseguire nel processo worker

### onComplete

Viene eseguito dopo che tutti i worker sono stati spenti e il processo sta per uscire. Un errore lanciato nell'hook onComplete comporterà il fallimento dell'esecuzione del test.

Parametri:

- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `config` (`object`): oggetto di configurazione WebdriverIO
- `caps` (`object`): contenente le capabilities per la sessione che verrà generata nel worker
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
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto funzionalità Cucumber

### afterFeature

Viene eseguito dopo una funzionalità Cucumber.

Parametri:

- `uri` (`string`): percorso del file della funzionalità
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto funzionalità Cucumber

### beforeScenario

Viene eseguito prima di uno scenario Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni sul pickle e sullo step del test
- `context` (`object`): oggetto Cucumber World

### afterScenario

Viene eseguito dopo uno scenario Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni sul pickle e sullo step del test
- `result` (`object`): oggetto dei risultati contenente i risultati dello scenario
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errore se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto Cucumber World

### beforeStep

Viene eseguito prima di uno step Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto step Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario Cucumber
- `context` (`object`): oggetto Cucumber World

### afterStep

Viene eseguito dopo uno step Cucumber.

Parametri:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): oggetto step Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): oggetto scenario Cucumber
- `result`: (`object`): oggetto dei risultati contenente i risultati dello step
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack di errore se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto Cucumber World

### beforeAssertion

Hook che viene eseguito prima che avvenga un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher (ad es. `toHaveTitle`)
- `params.expectedValue`: valore che viene passato nel matcher
- `params.options`: opzioni di asserzione

### afterAssertion

Hook che viene eseguito dopo che è avvenuta un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher (ad es. `toHaveTitle`)
- `params.expectedValue`: valore che viene passato nel matcher
- `params.options`: opzioni di asserzione
- `params.result`: risultati dell'asserzione