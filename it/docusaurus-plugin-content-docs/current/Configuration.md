---
id: configuration
title: Configurazione
description: "Consulta tutte le opzioni di configurazione per WebDriver, WebdriverIO standalone e il testrunner WDIO, inclusi tutti gli hook del testrunner."
---

In base al [tipo di configurazione](/docs/setuptypes) (ad es. usando i binding del protocollo grezzo, WebdriverIO come pacchetto standalone o il testrunner WDIO) è disponibile un diverso insieme di opzioni per controllare l'ambiente.

## Opzioni WebDriver

Le seguenti opzioni sono definite quando si utilizza il pacchetto di protocollo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Protocollo da utilizzare per comunicare con il server del driver.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host del tuo server del driver.

</Option>

### port

<Option type="Number" default="undefined">

Porta su cui si trova il tuo server del driver.

</Option>

### path

<Option type="String" default="/">

Percorso dell'endpoint del server del driver.

</Option>

### queryParams

<Option type="Object" default="undefined">

Parametri di query che vengono propagati al server del driver.

</Option>

### user

<Option type="String" default="undefined">

Il nome utente del tuo servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Se impostato, WebdriverIO configurerà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questa opzione può essere usata per autenticare qualsiasi altro backend WebDriver.

</Option>

### key

<Option type="String" default="undefined">

La chiave di accesso o chiave segreta del tuo servizio cloud (funziona solo per account [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Se impostata, WebdriverIO configurerà automaticamente le opzioni di connessione per te. Se non utilizzi un provider cloud, questa opzione può essere usata per autenticare qualsiasi altro backend WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Definisce le capabilities che vuoi eseguire nella tua sessione WebDriver. Consulta il [Protocollo WebDriver](https://w3c.github.io/webdriver/#capabilities) per maggiori dettagli.

Oltre alle capabilities basate su WebDriver, puoi applicare opzioni specifiche del browser e del fornitore che consentono una configurazione più approfondita del browser o dispositivo remoto. Queste sono documentate nella relativa documentazione del fornitore, ad es.:

- `goog:chromeOptions`: per [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: per [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: per [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: per [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: per [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: per [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Inoltre, uno strumento utile è l'[Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) di Sauce Labs, che ti aiuta a creare questo oggetto selezionando con dei clic le capabilities desiderate.

</Option>
**Esempio:**

```js
{
    browserName: 'chrome', // opzioni: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versione del browser
    platformName: 'Windows 10' // piattaforma del sistema operativo
}
```

Se stai eseguendo test web o nativi su dispositivi mobili, `capabilities` differisce dal protocollo WebDriver. Consulta la [documentazione di Appium](https://appium.io/docs/en/latest/guides/caps/) per maggiori dettagli.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Livello di dettaglio del logging.

</Option>

### outputDir

<Option type="String" default="null">

Directory in cui memorizzare tutti i file di log del testrunner (inclusi i log dei reporter e i log di `wdio`). Se non impostata, tutti i log vengono inviati a `stdout`. Poiché la maggior parte dei reporter è progettata per scrivere i log su `stdout`, si consiglia di usare questa opzione solo per reporter specifici in cui ha più senso salvare il report in un file (come ad esempio il reporter `junit`).

Quando si esegue in modalità standalone, l'unico log generato da WebdriverIO sarà il log di `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Timeout per qualsiasi richiesta WebDriver verso un driver o una grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Numero massimo di tentativi di richiesta verso il server Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Timeout (in ms) entro il quale un comando WebDriver Bidi deve ricevere una risposta dal browser. Aumentalo se esegui comandi, ad es. [`execute`](/docs/api/browser/execute), che richiedono legittimamente più tempo del valore predefinito per essere risolti, altrimenti WebdriverIO smette di attendere prima che il browser abbia finito.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Consente di utilizzare un [agent](https://www.npmjs.com/package/got#agent) personalizzato` http`/`https`/`http2` per effettuare le richieste.

</Option>

### headers

<Option type="Object" default={`{}`}>

Specifica `headers` personalizzati da passare a ogni richiesta WebDriver. Se la tua Selenium Grid richiede l'autenticazione Basic, ti consigliamo di passare un header `Authorization` tramite questa opzione per autenticare le tue richieste WebDriver, ad es.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Legge nome utente e password dalle variabili d'ambiente
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combina nome utente e password con i due punti come separatore
const credentials = `${username}:${password}`;
// Codifica le credenziali in Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Funzione che intercetta le [opzioni della richiesta HTTP](https://github.com/sindresorhus/got#options) prima che venga effettuata una richiesta WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Funzione che intercetta gli oggetti di risposta HTTP dopo l'arrivo di una risposta WebDriver. Alla funzione vengono passati l'oggetto di risposta originale come primo argomento e le corrispondenti `RequestOptions` come secondo argomento.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Indica se non è richiesto che il certificato SSL sia valido.
Può essere impostato tramite le variabili d'ambiente `STRICT_SSL` o `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Indica se abilitare la [funzionalità di connessione diretta di Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Non ha alcun effetto se la risposta non contiene le chiavi appropriate mentre il flag è abilitato.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Il percorso della radice della directory di cache. Questa directory viene usata per memorizzare tutti i driver scaricati durante il tentativo di avviare una sessione.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Per un logging più sicuro, le espressioni regolari impostate con `maskingPatterns` possono offuscare le informazioni sensibili nel log.
 - Il formato della stringa è un'espressione regolare con o senza flag (ad es. `/.../i`), separata da virgole in caso di più espressioni regolari.
 - Per maggiori dettagli sui pattern di mascheramento, consulta la [sezione Masking Patterns nel README di WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Esempio:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Le seguenti opzioni (incluse quelle elencate sopra) possono essere utilizzate con WebdriverIO in modalità standalone:

### automationProtocol

<Option type="String" default="webdriver">

Definisce il protocollo che vuoi usare per l'automazione del browser. Attualmente è supportato solo [`webdriver`](https://www.npmjs.com/package/webdriver), poiché è la principale tecnologia di automazione del browser utilizzata da WebdriverIO.

Se vuoi automatizzare il browser utilizzando una tecnologia di automazione diversa, assicurati di impostare questa proprietà su un percorso che si risolve in un modulo che rispetta la seguente interfaccia:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Avvia una sessione di automazione e restituisce una [monade](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * con i rispettivi comandi di automazione. Vedi il pacchetto [webdriver](https://www.npmjs.com/package/webdriver)
     * come implementazione di riferimento
     *
     * @param {Capabilities.RemoteConfig} options opzioni di WebdriverIO
     * @param {Function} hook che consente di modificare il client prima che venga rilasciato dalla funzione
     * @param {PropertyDescriptorMap} userPrototype consente all'utente di aggiungere comandi di protocollo personalizzati
     * @param {Function} customCommandWrapper consente di modificare l'esecuzione dei comandi
     * @returns un'istanza client compatibile con WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * consente all'utente di collegarsi a sessioni esistenti
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Modifica l'id di sessione dell'istanza e le capabilities del browser per la nuova sessione
     * direttamente nell'oggetto browser passato
     *
     * @optional
     * @param   {object} instance  l'oggetto ottenuto da una nuova sessione del browser.
     * @returns {string}           il nuovo id di sessione del browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Abbrevia le chiamate al comando `url` impostando un URL di base.
- Se il tuo parametro `url` inizia con `/`, allora viene anteposto `baseUrl` (escluso il percorso di `baseUrl`, se presente).
- Se il tuo parametro `url` inizia senza uno schema o `/` (come `some/path`), allora viene anteposto direttamente l'intero `baseUrl`.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Timeout predefinito per tutti i comandi `waitFor*`. (Nota la `f` minuscola nel nome dell'opzione.) Questo timeout influisce __solo__ sui comandi che iniziano con `waitFor*` e sul loro tempo di attesa predefinito.

Per aumentare il timeout di un _test_, consulta la documentazione del framework.

</Option>

### waitforInterval

<Option type="Number" default="100">

Intervallo predefinito con cui tutti i comandi `waitFor*` verificano se uno stato atteso (ad es. la visibilità) è cambiato.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Fa sì che il comando [`$`](/docs/api/browser/$) generi un `StrictSelectorError` quando il selettore fornito corrisponde a più di un elemento, invece di usare silenziosamente la prima corrispondenza. `$$` non è interessato.

Puoi disattivarlo per una singola query passando `{ strict: false }` come secondo argomento, ad es. `$('button', { strict: false })`.

Consulta la guida [Selettori](/docs/selectors#strict-mode) per i dettagli.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Dimensione massima del corpo della risposta (in byte) che può essere restituito quando si usa il comando [`mock`](/docs/api/browser/mock). Usa `0` per disabilitare la raccolta dei dati del payload spiato.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Se esegui su Sauce Labs, puoi scegliere di eseguire i test tra diversi data center.
Usa gli identificativi brevi di regione `us` (predefinito, corrisponde a `us-west-1`) o `eu` (corrisponde a `eu-central-1`), oppure direttamente i nomi completi delle regioni.

__Nota:__ Questo ha effetto solo se fornisci le opzioni `user` e `key` collegate al tuo account Sauce Labs.

</Option>
*(solo per vm e/o em/simulatori, eccetto `us-east-4` e `asia-south-2` che ospitano solo dispositivi reali)*

## Opzioni del Testrunner

Le seguenti opzioni (incluse quelle elencate sopra) sono definite solo per l'esecuzione di WebdriverIO con il testrunner WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

Definisce le spec per l'esecuzione dei test. Puoi specificare un pattern glob per far corrispondere più file contemporaneamente oppure racchiudere un glob o un insieme di percorsi in un array per eseguirli all'interno di un singolo processo worker. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

</Option>

### exclude

<Option type="String[]" default="[]">

Esclude spec dall'esecuzione dei test. Tutti i percorsi sono considerati relativi al percorso del file di configurazione.

</Option>

### suites

<Option type="Object" default={`{}`}>

Un oggetto che descrive varie suite, che puoi poi specificare con l'opzione `--suite` della CLI `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Uguale alla sezione `capabilities` descritta sopra, con la differenza che è possibile specificare un oggetto [multi-remote](/docs/multiremote) oppure più sessioni WebDriver in un array per l'esecuzione parallela.

Puoi applicare le stesse capabilities specifiche del fornitore e del browser definite [sopra](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Numero massimo totale di worker in esecuzione parallela.

__Nota:__ può essere un numero alto fino a `100` quando i test vengono eseguiti su fornitori esterni come le macchine di Sauce Labs. In quel caso, i test non vengono eseguiti su una singola macchina, ma su più VM. Se i test devono essere eseguiti su una macchina di sviluppo locale, usa un numero più ragionevole, come `3`, `4` o `5`. In sostanza, questo è il numero di browser che verranno avviati contemporaneamente ed eseguiranno i tuoi test nello stesso momento, quindi dipende da quanta RAM ha la tua macchina e da quante altre app sono in esecuzione su di essa.

Puoi anche applicare `maxInstances` all'interno dei tuoi oggetti capability usando la capability `wdio:maxInstances`. Questo limiterà il numero di sessioni parallele per quella particolare capability.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Numero massimo totale di worker in esecuzione parallela per capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Inserisce le variabili globali di WebdriverIO (ad es. `browser`, `$` e `$$`) nell'ambiente globale.
Se impostato su `false`, dovresti importarle da `@wdio/globals`, ad es.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO non gestisce l'iniezione delle variabili globali specifiche del framework di test.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Se vuoi che l'esecuzione dei test si interrompa dopo un numero specifico di test falliti, usa `bail`.
(Il valore predefinito è `0`, che esegue tutti i test in ogni caso.) **Nota:** In questo contesto, un test corrisponde a tutti i test all'interno di un singolo file spec (quando si usa Mocha o Jasmine) o a tutti gli step all'interno di un file feature (quando si usa Cucumber). Se vuoi controllare il comportamento di bail all'interno dei test di un singolo file di test, dai un'occhiata alle opzioni del [framework](frameworks) disponibili.

</Option>

### specFileRetries

<Option type="Number" default="0">

Il numero di volte in cui ritentare un intero file spec quando fallisce nel suo complesso.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Ritardo in secondi tra i tentativi di ripetizione del file spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Indica se i file spec da ritentare devono essere ritentati immediatamente o rimandati alla fine della coda.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Sceglie la modalità di visualizzazione dell'output dei log.

Se impostato su `false`, i log dei diversi file di test verranno stampati in tempo reale. Tieni presente che questo può causare la mescolanza degli output dei log di file diversi durante l'esecuzione in parallelo.

Se impostato su `true`, gli output dei log verranno raggruppati per Test Spec e stampati solo al completamento della Test Spec.

Per impostazione predefinita è `false`, quindi i log vengono stampati in tempo reale.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Controlla se WebdriverIO verifica automaticamente tutte le soft assertion alla fine di ogni test. Se impostato su `true`, tutte le soft assertion accumulate verranno verificate automaticamente e faranno fallire il test se una qualsiasi asserzione è fallita. Se impostato su `false`, devi chiamare manualmente il metodo assert per verificare le soft assertion.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

I servizi si occupano di un compito specifico di cui non vuoi preoccuparti. Migliorano la configurazione dei tuoi test quasi senza sforzo.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Definisce il framework di test da utilizzare con il testrunner WDIO.

</Option>

### mochaOpts, jasmineOpts e cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Opzioni specifiche relative al framework. Consulta la documentazione dell'adattatore del framework per sapere quali opzioni sono disponibili. Maggiori informazioni in [Framework](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Elenco di feature di cucumber con numeri di riga (quando si [usa il framework cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Elenco dei reporter da utilizzare. Un reporter può essere una stringa oppure un array del tipo
`['reporterName', { /* reporter options */}]` in cui il primo elemento è una stringa con il nome del reporter e il secondo elemento è un oggetto con le opzioni del reporter.

</Option>
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

<Option type="Number" default="100 (ms)">

Determina con quale intervallo il reporter deve verificare se è sincronizzato, nel caso in cui riporti i propri log in modo asincrono (ad es. se i log vengono inviati in streaming a un fornitore di terze parti).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Determina il tempo massimo a disposizione dei reporter per completare il caricamento di tutti i loro log prima che il testrunner generi un errore.

</Option>

### execArgv

<Option type="String[]" default="null">

Argomenti di Node da specificare all'avvio dei processi figli.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Abilita la profilazione della CPU per il processo worker. Il profilo verrà generato automaticamente all'uscita del processo worker.

</Option>

### heapProf

<Option type="Boolean" default="false">

Abilita la profilazione dell'Heap per il processo worker. Lo snapshot verrà generato automaticamente all'uscita del processo worker (utilizza il sampling heap profiler).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Directory in cui verranno salvati i profili della CPU (`.cpuprofile`) e i profili dell'Heap (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Un elenco di pattern di stringhe con supporto glob che indicano al testrunner di monitorare anche altri file, ad es. i file dell'applicazione, quando viene eseguito con il flag `--watch`. Per impostazione predefinita, il testrunner monitora già tutti i file spec.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Imposta su true se vuoi aggiornare i tuoi snapshot. Idealmente utilizzato come parametro della CLI, ad es. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Sovrascrive il percorso predefinito degli snapshot. Ad esempio, per memorizzare gli snapshot accanto ai file di test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO usa `tsx` per compilare i file TypeScript. Il tuo TSConfig viene rilevato automaticamente dalla directory di lavoro corrente, ma puoi specificare qui un percorso personalizzato oppure impostare la variabile d'ambiente TSX_TSCONFIG_PATH.

Consulta la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Avvia un display virtuale per l'esecuzione su Linux quando né `DISPLAY` né `WAYLAND_DISPLAY` sono impostati. Imposta su `false` quando esegui in modalità headless o solo su un servizio cloud o una grid remota. Controlla soltanto se viene avviato un display server: con solo `WAYLAND_DISPLAY` impostato, il testrunner imposta comunque `XDG_SESSION_TYPE`, `GDK_BACKEND` e `ELECTRON_OZONE_PLATFORM_HINT` su `wayland` per l'esecuzione. Consulta [Headless & Display Server](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Quale display server avviare. `auto` prova Weston e ripiega su Xvfb quando Weston manca o non riesce ad avviarsi. `wayland` e `xvfb` provano solo quel server.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Installa un display server mancante con il gestore di pacchetti di sistema quando nessuno di quelli installati si avvia.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Come viene eseguita l'installazione integrata: `root` installa solo quando si esegue come root, `sudo` usa `sudo -n` non interattivo quando non si è root, oppure installa senza di esso quando `sudo` non è installato.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Un comando da eseguire al posto dell'installazione integrata, così com'è e senza `sudo`. Viene eseguito solo con `displayServerAutoInstall: true`. Una stringa viene eseguita in una shell, un array viene eseguito senza shell. Con `auto`, viene eseguito prima per Weston e di nuovo per Xvfb solo se Weston non è ancora disponibile o non riesce ad avviarsi, e Xvfb è ancora mancante. Imposta `displayServer` sul server che il comando installa per saltare il tentativo con l'altro server.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Larghezza dello schermo del display virtuale in pixel.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Altezza dello schermo del display virtuale in pixel.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Profondità di colore del display virtuale. Solo Xvfb.

</Option>

## Hook

Il testrunner WDIO consente di impostare hook da attivare in momenti specifici del ciclo di vita dei test. Questo permette di eseguire azioni personalizzate (ad es. acquisire uno screenshot se un test fallisce).

Ogni hook riceve come parametro informazioni specifiche sul ciclo di vita (ad es. informazioni sulla suite di test o sul test). Leggi di più su tutte le proprietà degli hook nella [nostra configurazione di esempio](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alcuni hook (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) vengono eseguiti in un processo diverso e quindi non possono condividere dati globali con gli altri hook che risiedono nel processo worker.

### onPrepare

Viene eseguito una volta prima che tutti i worker vengano avviati.

Parametri:

- `config` (`object`): oggetto di configurazione di WebdriverIO
- `param` (`object[]`): elenco dei dettagli delle capabilities

### onWorkerStart

Viene eseguito prima che venga generato un processo worker e può essere utilizzato per inizializzare un servizio specifico per quel worker, nonché per modificare gli ambienti di runtime in modo asincrono.

Parametri:

- `cid` (`string`): id della capability (ad es. 0-0)
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): spec da eseguire nel processo worker
- `args` (`object`): oggetto che verrà unito alla configurazione principale una volta inizializzato il worker
- `execArgv` (`string[]`): elenco di argomenti stringa passati al processo worker

### onWorkerEnd

Viene eseguito subito dopo l'uscita di un processo worker.

Parametri:

- `cid` (`string`): id della capability (ad es. 0-0)
- `exitCode` (`number`): 0 - successo, 1 - fallimento. Un worker terminato da un segnale riporta invece `128` + il numero del segnale, ad es. `139` per un `SIGSEGV`
- `specs` (`string[]`): spec da eseguire nel processo worker
- `retries` (`number`): numero di tentativi a livello di spec utilizzati, come definito in [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): segnale che ha terminato il worker, ad es. `SIGSEGV`, oppure `null` se è uscito autonomamente

### beforeSession

Viene eseguito appena prima dell'inizializzazione della sessione webdriver e del framework di test. Consente di manipolare le configurazioni in base alla capability o alla spec.

Parametri:

- `config` (`object`): oggetto di configurazione di WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): spec da eseguire nel processo worker

### before

Viene eseguito prima dell'inizio dell'esecuzione dei test. A questo punto puoi accedere a tutte le variabili globali come `browser`. È il posto perfetto per definire comandi personalizzati.

Parametri:

- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): spec da eseguire nel processo worker
- `browser` (`object`): istanza della sessione browser/dispositivo creata

### beforeSuite

Hook che viene eseguito prima dell'inizio della suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### beforeHook

Hook che viene eseguito *prima* dell'inizio di un hook all'interno della suite (ad es. viene eseguito prima della chiamata a beforeEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)

### afterHook

Hook che viene eseguito *dopo* la fine di un hook all'interno della suite (ad es. viene eseguito dopo la chiamata a afterEach in Mocha)

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): contesto del test (rappresenta l'oggetto World in Cucumber)
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funzione da eseguire prima di un test (solo in Mocha/Jasmine).

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto di scope con cui è stato eseguito il test

### beforeCommand

Viene eseguito prima che venga eseguito un comando WebdriverIO.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe

### afterCommand

Viene eseguito dopo che è stato eseguito un comando WebdriverIO.

Parametri:

- `commandName` (`string`): nome del comando
- `args` (`*`): argomenti che il comando riceverebbe
- `result` (`*`): risultato del comando
- `error` (`Error`): oggetto di errore, se presente

### afterTest

Funzione da eseguire al termine di un test (in Mocha/Jasmine).

Parametri:

- `test` (`object`): dettagli del test
- `context` (`object`): oggetto di scope con cui è stato eseguito il test
- `result.error` (`Error`): oggetto di errore nel caso in cui il test fallisca, altrimenti `undefined`
- `result.result` (`Any`): oggetto restituito dalla funzione di test
- `result.duration` (`Number`): durata del test
- `result.passed` (`Boolean`): true se il test è passato, altrimenti false
- `result.retries` (`Object`): informazioni sui tentativi relativi al singolo test, come definito per [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) e per [Cucumber](./Retry.md#rerunning-in-cucumber), ad es. `{ attempts: 0, limit: 0 }`, vedi
- `result` (`object`): risultato dell'hook (contiene le proprietà `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook che viene eseguito al termine della suite (solo in Mocha/Jasmine)

Parametri:

- `suite` (`object`): dettagli della suite

### after

Viene eseguito dopo che tutti i test sono stati completati. Hai ancora accesso a tutte le variabili globali del test.

Parametri:

- `result` (`number`): 0 - test superato, 1 - test fallito
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): spec da eseguire nel processo worker

### afterSession

Viene eseguito subito dopo la chiusura della sessione webdriver.

Parametri:

- `config` (`object`): oggetto di configurazione di WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `specs` (`string[]`): spec da eseguire nel processo worker

### onComplete

Viene eseguito dopo che tutti i worker sono stati arrestati e il processo sta per terminare. Un errore generato nell'hook onComplete causerà il fallimento dell'esecuzione dei test.

Parametri:

- `exitCode` (`number`): 0 - successo, 1 - fallimento
- `config` (`object`): oggetto di configurazione di WebdriverIO
- `caps` (`object`): contiene le capabilities per la sessione che verrà generata nel worker
- `result` (`object`): oggetto dei risultati contenente i risultati dei test

### onReload

Viene eseguito quando si verifica un aggiornamento.

Parametri:

- `oldSessionId` (`string`): ID della vecchia sessione
- `newSessionId` (`string`): ID della nuova sessione

### beforeFeature

Viene eseguito prima di una Feature di Cucumber.

Parametri:

- `uri` (`string`): percorso del file feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto feature di Cucumber

### afterFeature

Viene eseguito dopo una Feature di Cucumber.

Parametri:

- `uri` (`string`): percorso del file feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): oggetto feature di Cucumber

### beforeScenario

Viene eseguito prima di uno Scenario di Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni sul pickle e sullo step di test
- `context` (`object`): oggetto World di Cucumber

### afterScenario

Viene eseguito dopo uno Scenario di Cucumber.

Parametri:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): oggetto world contenente informazioni sul pickle e sullo step di test
- `result` (`object`): oggetto dei risultati contenente i risultati dello scenario
- `result.passed` (`boolean`): true se lo scenario è passato
- `result.error` (`string`): stack dell'errore se lo scenario è fallito
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
- `result.error` (`string`): stack dell'errore se lo scenario è fallito
- `result.duration` (`number`): durata dello scenario in millisecondi
- `context` (`object`): oggetto World di Cucumber

### beforeAssertion

Hook che viene eseguito prima che avvenga un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher chiamato dal test (ad es. `toHaveTitle`). Per un alias, è il nome dell'alias (ad es. `toBeExisting`, non `toExist`).
- `params.expectedValue`: valore passato al matcher
- `params.options`: opzioni dell'asserzione

### afterAssertion

Hook che viene eseguito dopo che è avvenuta un'asserzione WebdriverIO.

Parametri:

- `params`: informazioni sull'asserzione
- `params.matcherName` (`string`): nome del matcher chiamato dal test (ad es. `toHaveTitle`). Per un alias, è il nome dell'alias (ad es. `toBeExisting`, non `toExist`).
- `params.expectedValue`: valore passato al matcher
- `params.options`: opzioni dell'asserzione
- `params.result` (`object`): risultato del matcher, con `pass` (`boolean`) e `message()`. `pass` è `true` quando il valore corrisponde al valore atteso, anche con `.not`: con `.not`, l'asserzione passa quando `pass` è `false`.