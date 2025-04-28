---
id: configurationfile
title: File di Configurazione
---

Il file di configurazione contiene tutte le informazioni necessarie per eseguire la tua suite di test. È un modulo NodeJS che esporta un JSON.

Ecco un esempio di configurazione con tutte le proprietà supportate e informazioni aggiuntive:

```js
export const config = {

    // ==================================
    // Dove dovrebbero essere lanciati i tuoi test
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurazioni Server
    // =====================
    // Indirizzo host del server Selenium in esecuzione. Questa informazione è solitamente obsoleta,
    // poiché WebdriverIO si connette automaticamente a localhost. Inoltre, se stai utilizzando uno dei
    // servizi cloud supportati come Sauce Labs, Browserstack, Testing Bot o LambdaTest, non è necessario
    // definire le informazioni su host e porta (perché WebdriverIO può determinarlo
    // dalle informazioni dell'utente e della chiave). Tuttavia, se stai utilizzando un backend Selenium
    // privato, dovresti definire qui `hostname`, `port` e `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Provider di Servizi
    // =================
    // WebdriverIO supporta Sauce Labs, Browserstack, Testing Bot e LambdaTest. (Altri provider cloud
    // dovrebbero funzionare altrettanto.) Questi servizi definiscono specifici valori `user` e `key` (o chiave di accesso)
    // che devi inserire qui, per connetterti a questi servizi.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se esegui i tuoi test su Sauce Labs puoi specificare la regione in cui vuoi eseguire i test
    // tramite la proprietà `region`. Le abbreviazioni disponibili per le regioni sono `us` (predefinito) e `eu`.
    // Queste regioni sono utilizzate per Sauce Labs VM cloud e Sauce Labs Real Device Cloud.
    // Se non fornisci la regione, l'impostazione predefinita è `us`.
    region: 'us',
    //
    // Sauce Labs fornisce un'[offerta headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // che ti consente di eseguire test Chrome e Firefox in modalità headless.
    //
    headless: false,
    //
    // ==================
    // Specifica i File di Test
    // ==================
    // Definisci quali specifiche di test dovrebbero essere eseguite. Il pattern è relativo alla directory
    // del file di configurazione in esecuzione.
    //
    // Le specifiche sono definite come un array di file di spec (opzionalmente utilizzando caratteri jolly
    // che verranno espansi). Il test per ogni file di spec verrà eseguito in un processo
    // worker separato. Per avere un gruppo di file di spec eseguiti nello stesso processo
    // worker, includili in un array all'interno dell'array specs.
    //
    // Il percorso dei file di spec verrà risolto relativamente dalla directory
    // del file di configurazione, a meno che non sia assoluto.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Pattern da escludere.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capacità
    // ============
    // Definisci le tue capacità qui. WebdriverIO può eseguire più capacità contemporaneamente.
    // A seconda del numero di capacità, WebdriverIO avvia diverse sessioni di test.
    // All'interno delle tue `capabilities`, puoi sovrascrivere le opzioni `spec` ed `exclude`
    // per raggruppare specifiche spec a una specifica capacità.
    //
    // Prima, puoi definire quante istanze dovrebbero essere avviate contemporaneamente. Diciamo
    // che hai 3 diverse capacità (Chrome, Firefox e Safari) e hai
    // impostato `maxInstances` a 1. wdio genererà 3 processi.
    //
    // Pertanto, se hai 10 file di spec e imposti `maxInstances` a 10, tutti i file di spec
    // verranno testati contemporaneamente e verranno generati 30 processi.
    //
    // La proprietà gestisce quante capacità dello stesso test dovrebbero eseguire test.
    //
    maxInstances: 10,
    //
    // Oppure imposta un limite per eseguire test con una capacità specifica.
    maxInstancesPerCapability: 10,
    //
    // Inserisce i globals di WebdriverIO (ad es. `browser`, `$` e `$$`) nell'ambiente globale.
    // Se impostato su `false`, dovresti importare da `@wdio/globals`. Nota: WebdriverIO non 
    // gestisce l'iniezione di globals specifici del framework di test.
    //
    injectGlobals: true,
    //
    // Se hai problemi a mettere insieme tutte le capacità importanti, dai un'occhiata al
    // configuratore di piattaforma Sauce Labs - un ottimo strumento per configurare le tue capacità:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // per eseguire chrome headless i seguenti flag sono richiesti
        // (vedi https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parametro per ignorare alcuni o tutti i flag predefiniti
        // - se il valore è true: ignora tutti i 'flag predefiniti' di DevTools e gli 'argomenti predefiniti' di Puppeteer
        // - se il valore è un array: DevTools filtra gli argomenti predefiniti dati
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances può essere sovrascritto per capacità. Quindi se hai una griglia Selenium interna
        // con solo 5 istanze firefox disponibili, puoi assicurarti che non più di
        // 5 istanze vengano avviate contemporaneamente.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag per attivare la modalità headless di Firefox (vedi https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities per maggiori dettagli su moz:firefoxOptions)
          // args: ['-headless']
        },
        // Se outputDir è fornito, WebdriverIO può catturare i log della sessione del driver
        // è possibile configurare quali logTypes escludere.
        excludeDriverLogs: ['*'], // passa '*' per escludere tutti i log della sessione del driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametro per ignorare alcuni o tutti gli argomenti predefiniti di Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // imposta il valore su true per ignorare tutti gli argomenti predefiniti
    }],
    //
    // Elenco aggiuntivo di argomenti node da utilizzare quando si avviano processi figlio
    execArgv: [],
    //
    // ===================
    // Configurazioni di Test
    // ===================
    // Definisci tutte le opzioni rilevanti per l'istanza WebdriverIO qui
    //
    // Livello di verbosità dei log: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Imposta livelli di log specifici per logger
    // usa il livello 'silent' per disabilitare il logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Imposta la directory per archiviare tutti i log
    outputDir: __dirname,
    //
    // Se vuoi eseguire i tuoi test solo fino a quando una quantità specifica di test è fallita, usa
    // bail (il valore predefinito è 0 - non interrompere, esegui tutti i test).
    bail: 0,
    //
    // Imposta un URL base per abbreviare le chiamate al comando `url()`. Se il tuo parametro `url` inizia
    // con `/`, il `baseUrl` viene anteposto, escludendo la parte del percorso di `baseUrl`.
    //
    // Se il tuo parametro `url` inizia senza uno schema o `/` (come `some/path`), il `baseUrl`
    // viene anteposto direttamente.
    baseUrl: 'http://localhost:8080',
    //
    // Timeout predefinito per tutti i comandi waitForXXX.
    waitforTimeout: 1000,
    //
    // Aggiungi file da osservare (ad es. codice applicativo o oggetti pagina) quando si esegue il comando `wdio`
    // con il flag `--watch`. È supportato il globbing.
    filesToWatch: [
        // ad es. riesegui i test se modifico il codice dell'applicazione
        // './app/**/*.js'
    ],
    //
    // Framework con cui vuoi eseguire le tue specifiche.
    // I seguenti sono supportati: 'mocha', 'jasmine' e 'cucumber'
    // Vedi anche: https://webdriver.io/docs/frameworks.html
    //
    // Assicurati di avere installato il pacchetto adattatore wdio per il framework specifico prima di eseguire qualsiasi test.
    framework: 'mocha',
    //
    // Il numero di volte in cui riprovare l'intero file spec quando fallisce nel suo insieme
    specFileRetries: 1,
    // Ritardo in secondi tra i tentativi di riprova del file spec
    specFileRetriesDelay: 0,
    // Se i file spec ritentati devono essere ritentati immediatamente o differiti alla fine della coda
    specFileRetriesDeferred: false,
    //
    // Reporter di test per stdout.
    // L'unico supportato di default è 'dot'
    // Vedi anche: https://webdriver.io/docs/dot-reporter.html, e clicca su "Reporters" nella colonna di sinistra
    reporters: [
        'dot',
        ['allure', {
            //
            // Se stai utilizzando il reporter "allure" dovresti definire la directory dove
            // WebdriverIO dovrebbe salvare tutti i report allure.
            outputDir: './'
        }]
    ],
    //
    // Opzioni da passare a Mocha.
    // Vedi l'elenco completo su: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opzioni da passare a Jasmine.
    // Vedi anche: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Timeout predefinito di Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Il framework Jasmine consente di intercettare ogni asserzione per registrare lo stato dell'applicazione
        // o del sito web a seconda del risultato. Ad esempio, è molto utile scattare uno screenshot ogni volta
        // che un'asserzione fallisce.
        expectationResultHandler: function(passed, assertion) {
            // fai qualcosa
        },
        //
        // Utilizza la funzionalità grep specifica di Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Se stai utilizzando Cucumber devi specificare dove si trovano le tue definizioni di step.
    // Vedi anche: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) richiedi file prima di eseguire le feature
        backtrace: false,   // <boolean> mostra il backtrace completo per gli errori
        compiler: [],       // <string[]> ("extension:module") richiedi file con l'ESTENSIONE data dopo aver richiesto MODULE (ripetibile)
        dryRun: false,      // <boolean> invoca i formattatori senza eseguire gli step
        failFast: false,    // <boolean> interrompi l'esecuzione al primo fallimento
        snippets: true,     // <boolean> nascondi frammenti di definizione di step per gli step in sospeso
        source: true,       // <boolean> nascondi gli URI sorgente
        strict: false,      // <boolean> fallisci se ci sono step non definiti o in sospeso
        tagExpression: '',  // <string> (espressione) esegui solo le feature o gli scenari con tag che corrispondono all'espressione
        timeout: 20000,     // <number> timeout per le definizioni di step
        ignoreUndefinedDefinitions: false, // <boolean> Abilita questa configurazione per trattare le definizioni non definite come avvisi.
        scenarioLevelReporter: false // Abilita questo per far comportare webdriver.io come se gli scenari e non gli step fossero i test.
    },
    // Specifica un percorso tsconfig personalizzato - WDIO utilizza `tsx` per compilare i file TypeScript
    // Il tuo TSConfig viene rilevato automaticamente dalla directory di lavoro corrente
    // ma puoi specificare un percorso personalizzato qui o impostando la variabile di ambiente TSX_TSCONFIG_PATH
    // Vedi la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fornisce diversi hook che puoi utilizzare per interferire nel processo di test al fine di migliorarlo
    // e costruire servizi intorno ad esso. Puoi applicare una singola funzione o un array di metodi.
    // Se uno di essi restituisce una promessa, WebdriverIO attenderà fino a che quella promessa non sia
    // risolta per continuare.
    //
    /**
     * Viene eseguito una volta prima che tutti i worker vengano lanciati.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Viene eseguito prima che un processo worker venga generato e può essere utilizzato per inizializzare servizi specifici
     * per quel worker e modificare gli ambienti di runtime in modo asincrono.
     * @param  {string} cid      id della capability (es. 0-0)
     * @param  {object} caps     oggetto contenente le capabilities per la sessione che verrà generata nel worker
     * @param  {object} specs    specifiche da eseguire nel processo worker
     * @param  {object} args     oggetto che verrà unito alla configurazione principale una volta che il worker viene inizializzato
     * @param  {object} execArgv elenco di argomenti stringa passati al processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Viene eseguito dopo che un processo worker è terminato.
     * @param  {string} cid      id della capability (es. 0-0)
     * @param  {number} exitCode 0 - successo, 1 - fallimento
     * @param  {object} specs    specifiche da eseguire nel processo worker
     * @param  {number} retries  numero di tentativi utilizzati
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Viene eseguito prima di inizializzare la sessione webdriver e il framework di test. Consente
     * di manipolare le configurazioni in base alla capability o alla specifica.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec che devono essere eseguiti
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito prima dell'inizio dell'esecuzione del test. A questo punto puoi accedere a tutte le variabili
     * globali come `browser`. È il posto perfetto per definire comandi personalizzati.
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs        Elenco dei percorsi dei file spec che devono essere eseguiti
     * @param {object}         browser      istanza della sessione browser/dispositivo creata
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Viene eseguito prima dell'inizio della suite (solo in Mocha/Jasmine).
     * @param {object} suite dettagli della suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * Questo hook viene eseguito _prima_ di ogni hook all'interno della suite.
     * (Ad esempio, questo viene eseguito prima di chiamare `before`, `beforeEach`, `after`, `afterEach` in Mocha). In Cucumber `context` è l'oggetto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook che viene eseguito _dopo_ ogni hook all'interno della suite.
     * (Ad esempio, questo viene eseguito dopo aver chiamato `before`, `beforeEach`, `after`, `afterEach` in Mocha). In Cucumber `context` è l'oggetto World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funzione da eseguire prima di un test (solo in Mocha/Jasmine)
     * @param {object} test    oggetto test
     * @param {object} context oggetto scope con cui è stato eseguito il test
     */
    beforeTest: function (test, context) {
    },
    /**
     * Viene eseguito prima dell'esecuzione di un comando WebdriverIO.
     * @param {string} commandName nome del comando hook
     * @param {Array} args argomenti che il comando riceverebbe
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Viene eseguito dopo l'esecuzione di un comando WebdriverIO
     * @param {string} commandName nome del comando hook
     * @param {Array} args argomenti che il comando riceverebbe
     * @param {number} result 0 - successo del comando, 1 - errore del comando
     * @param {object} error oggetto errore, se presente
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funzione da eseguire dopo un test (solo in Mocha/Jasmine)
     * @param {object}  test             oggetto test
     * @param {object}  context          oggetto scope con cui è stato eseguito il test
     * @param {Error}   result.error     oggetto errore in caso di fallimento del test, altrimenti `undefined`
     * @param {*}       result.result    oggetto restituito dalla funzione di test
     * @param {number}  result.duration  durata del test
     * @param {boolean} result.passed    true se il test è passato, altrimenti false
     * @param {object}  result.retries   informazioni sui tentativi relativi alla specifica, ad es. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook che viene eseguito dopo la fine della suite (solo in Mocha/Jasmine).
     * @param {object} suite dettagli della suite
     */
    afterSuite: function (suite) {
    },
    /**
     * Viene eseguito dopo che tutti i test sono terminati. Hai ancora accesso a tutte le variabili globali dal
     * test.
     * @param {number} result 0 - test superato, 1 - test fallito
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec che sono stati eseguiti
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Viene eseguito subito dopo la chiusura della sessione webdriver.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec che sono stati eseguiti
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito dopo che tutti i worker sono stati spenti e il processo sta per terminare.
     * Un errore generato nell'hook `onComplete` comporterà il fallimento dell'esecuzione del test.
     * @param {object} exitCode 0 - successo, 1 - fallimento
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {<Object>} results oggetto contenente i risultati dei test
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Viene eseguito quando si verifica un aggiornamento.
    * @param {string} oldSessionId ID sessione della vecchia sessione
    * @param {string} newSessionId ID sessione della nuova sessione
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hook di Cucumber
     *
     * Viene eseguito prima di una Feature Cucumber.
     * @param {string}                   uri      percorso del file feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Viene eseguito prima di uno Scenario Cucumber.
     * @param {ITestCaseHookParameter} world    oggetto world contenente informazioni su pickle e test step
     * @param {object}                 context  oggetto Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Viene eseguito prima di uno Step Cucumber.
     * @param {Pickle.IPickleStep} step     dati dello step
     * @param {IPickle}            scenario pickle dello scenario
     * @param {object}             context  oggetto Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Viene eseguito dopo uno Step Cucumber.
     * @param {Pickle.IPickleStep} step             dati dello step
     * @param {IPickle}            scenario         pickle dello scenario
     * @param {object}             result           oggetto risultati contenente i risultati dello scenario
     * @param {boolean}            result.passed    true se lo scenario è passato
     * @param {string}             result.error     stack di errori se lo scenario è fallito
     * @param {number}             result.duration  durata dello scenario in millisecondi
     * @param {object}             context          oggetto Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Viene eseguito dopo uno Scenario Cucumber.
     * @param {ITestCaseHookParameter} world            oggetto world contenente informazioni su pickle e test step
     * @param {object}                 result           oggetto risultati contenente i risultati dello scenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true se lo scenario è passato
     * @param {string}                 result.error     stack di errori se lo scenario è fallito
     * @param {number}                 result.duration  durata dello scenario in millisecondi
     * @param {object}                 context          oggetto Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Viene eseguito dopo una Feature Cucumber.
     * @param {string}                   uri      percorso del file feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Viene eseguito prima che una libreria di asserzioni WebdriverIO effettui un'asserzione.
     * @param commandName nome del comando
     * @param args argomenti che il comando riceverebbe
     */
    beforeAssertion: function (params) {
    },
    /**
     * Viene eseguito dopo l'esecuzione di un comando WebdriverIO
     * @param commandName  nome del comando
     * @param args         argomenti che il comando riceverebbe
     * @param result       risultato del comando
     * @param error        errore in caso qualcosa sia andato storto
     */
    afterAssertion: function (params) {
    }
}
```

Puoi anche trovare un file con tutte le opzioni e variazioni possibili nella [cartella degli esempi](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).