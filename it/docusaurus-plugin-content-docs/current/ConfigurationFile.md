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
    // Configurazioni del Server
    // =====================
    // Indirizzo host del server Selenium in esecuzione. Questa informazione è solitamente obsoleta, poiché
    // WebdriverIO si connette automaticamente a localhost. Inoltre, se stai utilizzando uno dei
    // servizi cloud supportati come Sauce Labs, Browserstack, Testing Bot o LambdaTest, non hai bisogno
    // di definire le informazioni di host e porta (perché WebdriverIO può capirle
    // dalle tue informazioni di utente e chiave). Tuttavia, se stai utilizzando un backend Selenium
    // privato, dovresti definire qui `hostname`, `port` e `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Fornitori di Servizi
    // =================
    // WebdriverIO supporta Sauce Labs, Browserstack, Testing Bot e LambdaTest. (Altri provider cloud
    // dovrebbero funzionare, anche.) Questi servizi definiscono specifici valori `user` e `key` (o chiave di accesso)
    // che devi inserire qui, per connetterti a questi servizi.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se esegui i tuoi test su Sauce Labs puoi specificare la regione in cui vuoi eseguire i tuoi test
    // tramite la proprietà `region`. Gli handle brevi disponibili per le regioni sono `us` (predefinito) e `eu`.
    // Queste regioni sono utilizzate per il cloud VM di Sauce Labs e il Sauce Labs Real Device Cloud.
    // Se non fornisci la regione, il valore predefinito è `us`.
    region: 'us',
    //
    // Sauce Labs fornisce un'[offerta headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // che ti permette di eseguire test Chrome e Firefox in modalità headless.
    //
    headless: false,
    //
    // ==================
    // Specifica File di Test
    // ==================
    // Definisci quali specifiche di test dovrebbero essere eseguite. Il pattern è relativo alla directory
    // del file di configurazione in esecuzione.
    //
    // Le specifiche sono definite come un array di file di specifiche (opzionalmente utilizzando caratteri jolly
    // che verranno espansi). Il test per ogni file di specifiche sarà eseguito in un processo
    // worker separato. Per avere un gruppo di file di specifiche eseguiti nello stesso processo
    // worker, racchiudili in un array all'interno dell'array specs.
    //
    // Il percorso dei file di specifiche sarà risolto relativamente dalla directory
    // del file di configurazione a meno che non sia assoluto.
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
    // Capabilities
    // ============
    // Definisci le tue capabilities qui. WebdriverIO può eseguire più capabilities allo stesso
    // tempo. A seconda del numero di capabilities, WebdriverIO avvia diverse sessioni
    // di test. All'interno delle tue `capabilities`, puoi sovrascrivere le opzioni `spec` e `exclude`
    // per raggruppare specifiche specifiche per una capability specifica.
    //
    // Innanzitutto, puoi definire quante istanze dovrebbero essere avviate contemporaneamente. Diciamo
    // che hai 3 diverse capabilities (Chrome, Firefox e Safari) e hai
    // impostato `maxInstances` a 1. wdio genererà 3 processi.
    //
    // Quindi, se hai 10 file di specifiche e imposti `maxInstances` a 10, tutti i file di specifiche
    // saranno testati contemporaneamente e verranno generati 30 processi.
    //
    // La proprietà gestisce quante capabilities dallo stesso test dovrebbero eseguire i test.
    //
    maxInstances: 10,
    //
    // Oppure imposta un limite per eseguire test con una capability specifica.
    maxInstancesPerCapability: 10,
    //
    // Inserisce i globali di WebdriverIO (ad es. `browser`, `$` e `$$`) nell'ambiente globale.
    // Se imposti a `false`, dovresti importare da `@wdio/globals`. Nota: WebdriverIO non
    // gestisce l'iniezione di globali specifici del framework di test.
    //
    injectGlobals: true,
    //
    // Se hai problemi a mettere insieme tutte le capabilities importanti, dai un'occhiata al
    // configuratore di piattaforma di Sauce Labs - un ottimo strumento per configurare le tue capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // per eseguire chrome headless sono necessari i seguenti flag
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
        // maxInstances può essere sovrascritto per capability. Quindi se hai una griglia Selenium interna
        // con solo 5 istanze firefox disponibili puoi assicurarti che non più di
        // 5 istanze vengano avviate alla volta.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag per attivare la modalità headless di Firefox (vedi https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities per maggiori dettagli su moz:firefoxOptions)
          // args: ['-headless']
        },
        // Se viene fornito outputDir, WebdriverIO può catturare i log della sessione del driver
        // è possibile configurare quali tipi di log escludere.
        excludeDriverLogs: ['*'], // passa '*' per escludere tutti i log di sessione del driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametro per ignorare alcuni o tutti gli argomenti predefiniti di Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // imposta il valore a true per ignorare tutti gli argomenti predefiniti
    }],
    //
    // Lista aggiuntiva di argomenti node da utilizzare quando si avviano processi figlio
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
    // Imposta la directory per memorizzare tutti i log
    outputDir: __dirname,
    //
    // Se vuoi eseguire i tuoi test solo fino a quando un numero specifico di test fallisce, usa
    // bail (il valore predefinito è 0 - non fare bail, esegui tutti i test).
    bail: 0,
    //
    // Imposta un URL base per abbreviare le chiamate al comando `url()`. Se il tuo parametro `url` inizia
    // con `/`, il `baseUrl` viene anteposto, non includendo la parte di percorso di `baseUrl`.
    //
    // Se il tuo parametro `url` inizia senza uno schema o `/` (come `some/path`), il `baseUrl`
    // viene anteposto direttamente.
    baseUrl: 'http://localhost:8080',
    //
    // Timeout predefinito per tutti i comandi waitForXXX.
    waitforTimeout: 1000,
    //
    // Aggiungi file da guardare (ad es. codice dell'applicazione o oggetti pagina) quando si esegue il comando `wdio`
    // con il flag `--watch`. È supportato il globbing.
    filesToWatch: [
        // ad es. riesegui i test se modifico il codice della mia applicazione
        // './app/**/*.js'
    ],
    //
    // Framework con cui vuoi eseguire le tue specifiche.
    // I seguenti sono supportati: 'mocha', 'jasmine' e 'cucumber'
    // Vedi anche: https://webdriver.io/docs/frameworks.html
    //
    // Assicurati di avere il pacchetto adattatore wdio per il framework specifico installato prima di eseguire qualsiasi test.
    framework: 'mocha',
    //
    // Il numero di volte per riprovare l'intero file di specifiche quando fallisce nel suo insieme
    specFileRetries: 1,
    // Ritardo in secondi tra i tentativi di ripetizione del file di specifiche
    specFileRetriesDelay: 0,
    // Se i file di specifiche ripetuti devono essere ritentati immediatamente o differiti alla fine della coda
    specFileRetriesDeferred: false,
    //
    // Reporter di test per stdout.
    // L'unico supportato di default è 'dot'
    // Vedi anche: https://webdriver.io/docs/dot-reporter.html, e clicca su "Reporters" nella colonna sinistra
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
    // Vedi la lista completa a: http://mochajs.org
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
        // Il framework Jasmine permette di intercettare ogni asserzione per registrare lo stato dell'applicazione
        // o del sito web a seconda del risultato. Ad esempio, è molto utile scattare uno screenshot ogni volta
        // che un'asserzione fallisce.
        expectationResultHandler: function(passed, assertion) {
            // fai qualcosa
        },
        //
        // Utilizzo della funzionalità grep specifica di Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Se stai utilizzando Cucumber devi specificare dove si trovano le tue definizioni di step.
    // Vedi anche: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) richiedi file prima di eseguire le funzionalità
        backtrace: false,   // <boolean> mostra il backtrace completo per gli errori
        compiler: [],       // <string[]> ("extension:module") richiedi file con l'ESTENSIONE data dopo aver richiesto MODULE (ripetibile)
        dryRun: false,      // <boolean> invocare i formattatori senza eseguire gli step
        failFast: false,    // <boolean> interrompi l'esecuzione al primo fallimento
        snippets: true,     // <boolean> nascondi snippet di definizione degli step per gli step in sospeso
        source: true,       // <boolean> nascondi URI di origine
        strict: false,      // <boolean> fallisci se ci sono step non definiti o in sospeso
        tagExpression: '',  // <string> (espressione) esegui solo le funzionalità o gli scenari con tag corrispondenti all'espressione
        timeout: 20000,     // <number> timeout per le definizioni degli step
        ignoreUndefinedDefinitions: false, // <boolean> Abilita questa configurazione per trattare le definizioni non definite come avvisi.
        scenarioLevelReporter: false // Abilita questo per far comportare webdriver.io come se gli scenari e non gli step fossero i test.
    },
    // Specifica un percorso tsconfig personalizzato - WDIO usa `tsx` per compilare i file TypeScript
    // Il tuo TSConfig viene rilevato automaticamente dalla directory di lavoro corrente
    // ma puoi specificare un percorso personalizzato qui o impostando la variabile di ambiente TSX_TSCONFIG_PATH
    // Vedi la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fornisce diversi hook che puoi utilizzare per interferire nel processo di test per migliorarlo
    // e costruire servizi intorno ad esso. Puoi applicare una singola funzione o un array di
    // metodi. Se uno di essi restituisce una promessa, WebdriverIO attenderà fino a quando quella promessa è
    // risolta per continuare.
    //
    /**
     * Viene eseguito una volta prima che tutti i worker vengano lanciati.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Viene eseguito prima che un processo worker venga generato e può essere utilizzato per inizializzare servizi specifici
     * per quel worker e per modificare gli ambienti runtime in modo asincrono.
     * @param  {string} cid      id della capability (ad es. 0-0)
     * @param  {object} caps     oggetto contenente le capabilities per la sessione che verrà generata nel worker
     * @param  {object} specs    specifiche da eseguire nel processo worker
     * @param  {object} args     oggetto che verrà unito alla configurazione principale una volta che il worker è inizializzato
     * @param  {object} execArgv lista di argomenti stringa passati al processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Viene eseguito dopo che un processo worker è terminato.
     * @param  {string} cid      id della capability (ad es. 0-0)
     * @param  {number} exitCode 0 - successo, 1 - fallimento
     * @param  {object} specs    specifiche eseguite nel processo worker
     * @param  {number} retries  numero di tentativi utilizzati
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Viene eseguito prima di inizializzare la sessione webdriver e il framework di test. Permette di
     * manipolare le configurazioni in base alla capability o alla specifica.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
     * @param {Array.<String>} specs Lista dei percorsi dei file di specifiche che devono essere eseguiti
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito prima che inizi l'esecuzione del test. A questo punto puoi accedere a tutte le variabili
     * globali come `browser`. È il posto perfetto per definire comandi personalizzati.
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
     * @param {Array.<String>} specs        Lista dei percorsi dei file di specifiche che devono essere eseguiti
     * @param {object}         browser      istanza della sessione browser/dispositivo creata
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Viene eseguito prima che inizi la suite (solo in Mocha/Jasmine).
     * @param {object} suite dettagli della suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * Questo hook viene eseguito _prima_ di ogni hook all'interno della suite.
     * (Ad esempio, viene eseguito prima di chiamare `before`, `beforeEach`, `after`, `afterEach` in Mocha.). In Cucumber `context` è l'oggetto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook che viene eseguito _dopo_ ogni hook all'interno della suite.
     * (Ad esempio, viene eseguito dopo aver chiamato `before`, `beforeEach`, `after`, `afterEach` in Mocha.). In Cucumber `context` è l'oggetto World.
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
     * Viene eseguito prima che venga eseguito un comando WebdriverIO.
     * @param {string} commandName nome del comando hook
     * @param {Array} args argomenti che il comando riceverà
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Viene eseguito dopo che un comando WebdriverIO viene eseguito
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
     * @param {*}       result.result    oggetto di ritorno della funzione di test
     * @param {number}  result.duration  durata del test
     * @param {boolean} result.passed    true se il test è passato, altrimenti false
     * @param {object}  result.retries   informazioni sui tentativi relativi alla specifica, ad es. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook che viene eseguito dopo che la suite è terminata (solo in Mocha/Jasmine).
     * @param {object} suite dettagli della suite
     */
    afterSuite: function (suite) {
    },
    /**
     * Viene eseguito dopo che tutti i test sono stati completati. Hai ancora accesso a tutte le variabili globali dal
     * test.
     * @param {number} result 0 - test passato, 1 - test fallito
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
     * @param {Array.<String>} specs Lista dei percorsi dei file di specifiche che sono stati eseguiti
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Viene eseguito subito dopo aver terminato la sessione webdriver.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
     * @param {Array.<String>} specs Lista dei percorsi dei file di specifiche che sono stati eseguiti
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito dopo che tutti i worker sono stati spenti e il processo sta per terminare.
     * Un errore lanciato nell'hook `onComplete` causerà il fallimento dell'esecuzione del test.
     * @param {object} exitCode 0 - successo, 1 - fallimento
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities lista di dettagli delle capabilities
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
     * @param {string}                   uri      percorso al file di feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Viene eseguito prima di uno Scenario Cucumber.
     * @param {ITestCaseHookParameter} world    oggetto world contenente informazioni su pickle e step di test
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
     * @param {object}             result           oggetto dei risultati contenente i risultati dello scenario
     * @param {boolean}            result.passed    true se lo scenario è passato
     * @param {string}             result.error     stack di errore se lo scenario è fallito
     * @param {number}             result.duration  durata dello scenario in millisecondi
     * @param {object}             context          oggetto Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Viene eseguito dopo uno Scenario Cucumber.
     * @param {ITestCaseHookParameter} world            oggetto world contenente informazioni su pickle e step di test
     * @param {object}                 result           oggetto dei risultati contenente i risultati dello scenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true se lo scenario è passato
     * @param {string}                 result.error     stack di errore se lo scenario è fallito
     * @param {number}                 result.duration  durata dello scenario in millisecondi
     * @param {object}                 context          oggetto Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Viene eseguito dopo una Feature Cucumber.
     * @param {string}                   uri      percorso al file di feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Viene eseguito prima che una libreria di asserzione WebdriverIO effettui un'asserzione.
     * @param commandName nome del comando
     * @param args        argomenti che il comando riceverebbe
     */
    beforeAssertion: function (params) {
    },
    /**
     * Viene eseguito dopo che un comando WebdriverIO viene eseguito
     * @param commandName  nome del comando
     * @param args         argomenti che il comando riceverebbe
     * @param result       risultato del comando
     * @param error        errore in caso qualcosa sia andato storto
     */
    afterAssertion: function (params) {
    }
}
```

Puoi anche trovare un file con tutte le opzioni e variazioni possibili nella [cartella di esempio](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).