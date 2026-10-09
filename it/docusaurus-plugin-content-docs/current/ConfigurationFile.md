---
id: configurationfile
title: File di Configurazione
description: "Consulta un esempio commentato di wdio.conf.js che elenca ogni opzione del testrunner, capability e hook supportati, con le relative spiegazioni."
---

Il file di configurazione contiene tutte le informazioni necessarie per eseguire la tua suite di test. È un modulo NodeJS che esporta un JSON.

Ecco un esempio di configurazione con tutte le proprietà supportate e informazioni aggiuntive:

```js
export const config = {

    // ==================================
    // Dove dovrebbe essere avviato il test
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurazioni del Server
    // =====================
    // Indirizzo host del server Selenium in esecuzione. Questa informazione è solitamente superflua, poiché
    // WebdriverIO si connette automaticamente a localhost. Inoltre, se stai utilizzando uno dei
    // servizi cloud supportati come Sauce Labs, Browserstack, Testing Bot o TestMu AI (precedentemente LambdaTest), non
    // è necessario definire le informazioni su host e porta (perché WebdriverIO può ricavarle
    // dalle informazioni su utente e chiave). Tuttavia, se stai utilizzando un backend Selenium
    // privato, dovresti definire qui `hostname`, `port` e `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocollo: http | https
    // protocol: 'http',
    //
    // =================
    // Fornitori di Servizi
    // =================
    // WebdriverIO supporta Sauce Labs, Browserstack, Testing Bot e TestMu AI (precedentemente LambdaTest). (Anche altri fornitori cloud
    // dovrebbero funzionare.) Questi servizi definiscono valori specifici di `user` e `key` (o chiave di accesso)
    // che devi inserire qui, per connetterti a questi servizi.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se esegui i tuoi test su Sauce Labs puoi specificare la regione in cui vuoi eseguire i test
    // tramite la proprietà `region`. Le abbreviazioni disponibili per le regioni sono `us` (predefinita) e `eu`.
    // Queste regioni sono utilizzate per il cloud VM di Sauce Labs e per il Sauce Labs Real Device Cloud.
    // Se non specifichi la regione, il valore predefinito è `us`.
    region: 'us',
    //
    // Sauce Labs offre una [soluzione headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // che ti permette di eseguire test Chrome e Firefox in modalità headless.
    //
    headless: false,
    //
    // ==================
    // Specificare i File di Test
    // ==================
    // Definisci quali spec di test devono essere eseguite. Il pattern è relativo alla directory
    // del file di configurazione in esecuzione.
    //
    // Le spec sono definite come un array di file spec (opzionalmente usando wildcard
    // che verranno espanse). Il test per ogni file spec verrà eseguito in un processo
    // worker separato. Per eseguire un gruppo di file spec nello stesso processo
    // worker, racchiudili in un array all'interno dell'array specs.
    //
    // Il percorso dei file spec verrà risolto relativamente alla directory
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
    // Capabilities
    // ============
    // Definisci qui le tue capabilities. WebdriverIO può eseguire più capabilities contemporaneamente.
    // A seconda del numero di capabilities, WebdriverIO avvia diverse sessioni
    // di test. All'interno delle tue `capabilities`, puoi sovrascrivere quali file vengono eseguiti con
    // `wdio:specs` e `wdio:exclude` per raggruppare spec specifiche per una determinata capability.
    //
    // Innanzitutto, puoi definire quante istanze devono essere avviate contemporaneamente. Supponiamo
    // che tu abbia 3 capabilities diverse (Chrome, Firefox e Safari) e che tu abbia
    // impostato `maxInstances` a 1. wdio avvierà 3 processi.
    //
    // Pertanto, se hai 10 file spec e imposti `maxInstances` a 10, tutti i file spec
    // verranno testati contemporaneamente e verranno avviati 30 processi.
    //
    // La proprietà gestisce quante capabilities dello stesso test devono eseguire i test.
    //
    maxInstances: 10,
    //
    // Oppure imposta un limite per eseguire test con una capability specifica.
    maxInstancesPerCapability: 10,
    //
    // Inserisce le variabili globali di WebdriverIO (ad es. `browser`, `$` e `$$`) nell'ambiente globale.
    // Se imposti a `false`, dovresti importarle da `@wdio/globals`. Nota: WebdriverIO non
    // gestisce l'iniezione delle variabili globali specifiche del framework di test.
    //
    injectGlobals: true,
    //
    // Se hai difficoltà a mettere insieme tutte le capabilities importanti, dai un'occhiata al
    // configuratore di piattaforme di Sauce Labs - un ottimo strumento per configurare le tue capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // per eseguire chrome in modalità headless sono necessari i seguenti flag
        // (vedi https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parametro per ignorare alcuni o tutti i flag predefiniti
        // - se il valore è true: ignora tutti i 'default flags' di DevTools e i 'default arguments' di Puppeteer
        // - se il valore è un array: DevTools filtra gli argomenti predefiniti indicati
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances può essere sovrascritto per ogni capability. Quindi, se hai una griglia Selenium
        // interna con solo 5 istanze di firefox disponibili, puoi assicurarti che non vengano
        // avviate più di 5 istanze alla volta.
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
        // è possibile configurare quali logTypes escludere.
        // excludeDriverLogs: ['*'], // passa '*' per escludere tutti i log della sessione del driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametro per ignorare alcuni o tutti gli argomenti predefiniti di Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // imposta il valore a true per ignorare tutti gli argomenti predefiniti
    }],
    //
    // Elenco aggiuntivo di argomenti node da usare all'avvio dei processi figli
    execArgv: [],
    //
    // ===================
    // Configurazioni dei Test
    // ===================
    // Definisci qui tutte le opzioni rilevanti per l'istanza di WebdriverIO
    //
    // Livello di verbosità del logging: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Imposta livelli di log specifici per ogni logger
    // usa il livello 'silent' per disabilitare il logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Imposta la directory in cui salvare tutti i log
    outputDir: __dirname,
    //
    // Se vuoi eseguire i test solo fino a quando un certo numero di test non è fallito, usa
    // bail (il valore predefinito è 0 - non interrompere, esegui tutti i test).
    bail: 0,
    //
    // Imposta un URL di base per abbreviare le chiamate al comando `url()`. Se il tuo parametro `url` inizia
    // con `/`, viene anteposto il `baseUrl`, esclusa la parte del percorso di `baseUrl`.
    //
    // Se il tuo parametro `url` inizia senza uno schema o `/` (come `some/path`), il `baseUrl`
    // viene anteposto direttamente.
    baseUrl: 'http://localhost:8080',
    //
    // Timeout predefinito per tutti i comandi waitForXXX.
    waitforTimeout: 1000,
    //
    // Aggiungi file da monitorare (ad es. codice dell'applicazione o page object) quando esegui il comando `wdio`
    // con il flag `--watch`. Il globbing è supportato.
    filesToWatch: [
        // ad es. riesegui i test se modifico il codice della mia applicazione
        // './app/**/*.js'
    ],
    //
    // Framework con cui vuoi eseguire le tue spec.
    // Sono supportati i seguenti: 'mocha', 'jasmine' e 'cucumber'
    // Vedi anche: https://webdriver.io/docs/frameworks.html
    //
    // Assicurati di aver installato il pacchetto adapter wdio per il framework specifico prima di eseguire qualsiasi test.
    framework: 'mocha',
    //
    // Il numero di tentativi di riesecuzione dell'intero file spec quando fallisce nel suo complesso
    specFileRetries: 1,
    // Ritardo in secondi tra i tentativi di riesecuzione del file spec
    specFileRetriesDelay: 0,
    // Se i file spec da rieseguire debbano essere rieseguiti immediatamente o rimandati alla fine della coda
    specFileRetriesDeferred: false,
    //
    // Reporter dei test per stdout.
    // L'unico supportato di default è 'dot'
    // Vedi anche: https://webdriver.io/docs/dot-reporter.html , e clicca su "Reporters" nella colonna di sinistra
    reporters: [
        'dot',
        ['allure', {
            //
            // Se stai usando il reporter "allure" dovresti definire la directory in cui
            // WebdriverIO deve salvare tutti i report allure.
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
        // Il framework Jasmine permette di intercettare ogni asserzione per registrare lo stato dell'applicazione
        // o del sito web a seconda del risultato. Ad esempio, è molto comodo acquisire uno screenshot ogni volta
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
    // Se stai usando Cucumber devi specificare dove si trovano le tue step definitions.
    // Vedi anche: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) richiede i file prima di eseguire le feature
        backtrace: false,   // <boolean> mostra il backtrace completo per gli errori
        compiler: [],       // <string[]> ("extension:module") richiede i file con l'EXTENSION indicata dopo aver richiesto il MODULE (ripetibile)
        dryRun: false,      // <boolean> invoca i formatter senza eseguire gli step
        failFast: false,    // <boolean> interrompe l'esecuzione al primo fallimento
        snippets: true,     // <boolean> nasconde gli snippet delle step definition per gli step in sospeso
        source: true,       // <boolean> nasconde gli URI sorgente
        strict: false,      // <boolean> fallisce se ci sono step non definiti o in sospeso
        tags: '',           // <string> (espressione) esegue solo le feature o gli scenari con tag corrispondenti all'espressione
        timeout: 20000,     // <number> timeout per le step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Abilita questa configurazione per trattare le definizioni non definite come avvisi.
        scenarioLevelReporter: false // Abilita questa opzione per far sì che webdriver.io si comporti come se i test fossero gli scenari e non gli step.
    },
    // Specifica un percorso tsconfig personalizzato - WDIO usa `tsx` per compilare i file TypeScript
    // Il tuo TSConfig viene rilevato automaticamente dalla directory di lavoro corrente
    // ma puoi specificare qui un percorso personalizzato oppure impostando la variabile d'ambiente TSX_TSCONFIG_PATH
    // Vedi la documentazione di `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Nota: questa impostazione verrà sovrascritta dalla variabile d'ambiente TSX_TSCONFIG_PATH e/o dall'argomento cli --tsConfigPath, se specificati.
    // Questa impostazione verrà ignorata se node non è in grado di analizzare il tuo file wdio.conf.ts senza l'aiuto di tsx, ad es. se hai configurato
    // alias di percorso in tsconfig.json e usi tali alias all'interno del tuo file wdio.config.ts.
    // Usala solo se stai usando un file di configurazione .js o se il tuo file di configurazione .ts è JavaScript valido.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hook
    // =====
    // WebdriverIO fornisce diversi hook che puoi usare per intervenire nel processo di test al fine di migliorarlo
    // e costruirci attorno dei servizi. Puoi applicare una singola funzione oppure un array di
    // metodi. Se uno di essi restituisce una promise, WebdriverIO attenderà che tale promise venga
    // risolta prima di continuare.
    //
    /**
     * Viene eseguito una sola volta prima che vengano avviati tutti i worker.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Viene eseguito prima che venga avviato un processo worker e può essere usato per inizializzare un servizio specifico
     * per quel worker, nonché per modificare gli ambienti di runtime in modo asincrono.
     * @param  {string} cid      id della capability (ad es. 0-0)
     * @param  {object} caps     oggetto contenente le capabilities per la sessione che verrà avviata nel worker
     * @param  {object} specs    spec da eseguire nel processo worker
     * @param  {object} args     oggetto che verrà unito alla configurazione principale una volta inizializzato il worker
     * @param  {object} execArgv elenco di argomenti stringa passati al processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Viene eseguito dopo che un processo worker è terminato.
     * @param  {string} cid      id della capability (ad es. 0-0)
     * @param  {number} exitCode 0 - successo, 1 - fallimento
     * @param  {object} specs    spec da eseguire nel processo worker
     * @param  {number} retries  numero di tentativi utilizzati
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Viene eseguito prima dell'inizializzazione della sessione webdriver e del framework di test. Ti permette
     * di manipolare le configurazioni in base alla capability o alla spec.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec da eseguire
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito prima dell'inizio dell'esecuzione dei test. A questo punto puoi accedere a tutte le variabili
     * globali come `browser`. È il posto perfetto per definire comandi personalizzati.
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs        Elenco dei percorsi dei file spec da eseguire
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
     * Questo hook viene eseguito _prima_ dell'avvio di ogni hook all'interno della suite.
     * (Ad esempio, viene eseguito prima di chiamare `before`, `beforeEach`, `after`, `afterEach` in Mocha.). In Cucumber `context` è l'oggetto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook che viene eseguito _dopo_ la fine di ogni hook all'interno della suite.
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
     * Viene eseguito prima che un comando WebdriverIO venga eseguito.
     * @param {string} commandName nome del comando hook
     * @param {Array} args argomenti che il comando riceverebbe
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Viene eseguito dopo che un comando WebdriverIO è stato eseguito
     * @param {string} commandName nome del comando hook
     * @param {Array} args argomenti che il comando riceverebbe
     * @param {*} result risultato del comando
     * @param {Error} error oggetto errore, se presente
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funzione da eseguire dopo un test (solo in Mocha/Jasmine)
     * @param {object}  test             oggetto test
     * @param {object}  context          oggetto scope con cui è stato eseguito il test
     * @param {Error}   result.error     oggetto errore nel caso in cui il test fallisca, altrimenti `undefined`
     * @param {*}       result.result    oggetto restituito dalla funzione di test
     * @param {number}  result.duration  durata del test
     * @param {boolean} result.passed    true se il test è stato superato, altrimenti false
     * @param {object}  result.retries   informazioni sui tentativi relativi alla spec, ad es. `{ attempts: 0, limit: 0 }`
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
     * Viene eseguito dopo che tutti i test sono stati completati. Hai ancora accesso a tutte le variabili globali
     * del test.
     * @param {number} result 0 - test superato, 1 - test fallito
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec eseguiti
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Viene eseguito subito dopo la chiusura della sessione webdriver.
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {Array.<String>} specs Elenco dei percorsi dei file spec eseguiti
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Viene eseguito dopo che tutti i worker sono stati arrestati e il processo sta per terminare.
     * Un errore lanciato nell'hook `onComplete` causerà il fallimento dell'esecuzione dei test.
     * @param {object} exitCode 0 - successo, 1 - fallimento
     * @param {object} config oggetto di configurazione wdio
     * @param {Array.<Object>} capabilities elenco dei dettagli delle capabilities
     * @param {<Object>} results oggetto contenente i risultati dei test
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Viene eseguito quando avviene un refresh.
    * @param {string} oldSessionId ID della vecchia sessione
    * @param {string} newSessionId ID della nuova sessione
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hook di Cucumber
     *
     * Viene eseguito prima di una Feature di Cucumber.
     * @param {string}                   uri      percorso del file feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature di Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Viene eseguito prima di uno Scenario di Cucumber.
     * @param {ITestCaseHookParameter} world    oggetto world contenente informazioni su pickle e step di test
     * @param {object}                 context  oggetto World di Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Viene eseguito prima di uno Step di Cucumber.
     * @param {Pickle.IPickleStep} step     dati dello step
     * @param {IPickle}            scenario pickle dello scenario
     * @param {object}             context  oggetto World di Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Viene eseguito dopo uno Step di Cucumber.
     * @param {Pickle.IPickleStep} step             dati dello step
     * @param {IPickle}            scenario         pickle dello scenario
     * @param {object}             result           oggetto risultati contenente i risultati dello scenario
     * @param {boolean}            result.passed    true se lo scenario è stato superato
     * @param {string}             result.error     stack dell'errore se lo scenario è fallito
     * @param {number}             result.duration  durata dello scenario in millisecondi
     * @param {object}             context          oggetto World di Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Viene eseguito dopo uno Scenario di Cucumber.
     * @param {ITestCaseHookParameter} world            oggetto world contenente informazioni su pickle e step di test
     * @param {object}                 result           oggetto risultati contenente i risultati dello scenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true se lo scenario è stato superato
     * @param {string}                 result.error     stack dell'errore se lo scenario è fallito
     * @param {number}                 result.duration  durata dello scenario in millisecondi
     * @param {object}                 context          oggetto World di Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Viene eseguito dopo una Feature di Cucumber.
     * @param {string}                   uri      percorso del file feature
     * @param {GherkinDocument.IFeature} feature  oggetto feature di Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Viene eseguito prima che la libreria di asserzioni di WebdriverIO effettui un'asserzione.
     * @param {object} params                 informazioni sull'asserzione
     * @param {string} params.matcherName     nome del matcher chiamato dal test (per un alias, il nome dell'alias)
     * @param {*}      params.expectedValue   valore passato al matcher
     * @param {object} params.options         opzioni dell'asserzione
     */
    beforeAssertion: function (params) {
    },
    /**
     * Viene eseguito dopo che la libreria di asserzioni di WebdriverIO ha effettuato un'asserzione.
     * @param {object} params                 informazioni sull'asserzione, le stesse di `beforeAssertion`
     * @param {object} params.result          risultato del matcher, con `pass` (boolean) e `message()`.
     *                                        `pass` è true quando il valore corrisponde, anche con `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Puoi anche trovare un file con tutte le possibili opzioni e varianti nella [cartella degli esempi](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).