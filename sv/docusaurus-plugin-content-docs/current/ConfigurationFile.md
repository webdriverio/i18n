---
id: configurationfile
title: Konfigurationsfil
description: "Bläddra i ett kommenterat exempel på wdio.conf.js som listar alla testrunner-alternativ, capabilities och hooks som stöds, med förklaringar."
---

Konfigurationsfilen innehåller all information som behövs för att köra din testsvit. Det är en NodeJS-modul som exporterar en JSON.

Här är en exempelkonfiguration med alla egenskaper som stöds och ytterligare information:

```js
export const config = {

    // ==================================
    // Var ska ditt test startas
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Serverkonfigurationer
    // =====================
    // Värdadress för den körande Selenium-servern. Denna information är vanligtvis överflödig, eftersom
    // WebdriverIO automatiskt ansluter till localhost. Om du använder någon av de
    // molntjänster som stöds, som Sauce Labs, Browserstack, Testing Bot eller TestMu AI (tidigare LambdaTest), behöver du inte heller
    // definiera värd- och portinformation (eftersom WebdriverIO kan räkna ut det
    // från din användar- och nyckelinformation). Om du däremot använder en privat Selenium-
    // backend bör du definiera `hostname`, `port` och `path` här.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protokoll: http | https
    // protocol: 'http',
    //
    // =================
    // Tjänsteleverantörer
    // =================
    // WebdriverIO stöder Sauce Labs, Browserstack, Testing Bot och TestMu AI (tidigare LambdaTest). (Andra molnleverantörer
    // bör också fungera.) Dessa tjänster definierar specifika `user`- och `key`-värden (eller åtkomstnyckel)
    // som du måste ange här för att ansluta till dessa tjänster.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Om du kör dina tester på Sauce Labs kan du ange vilken region du vill köra dina tester
    // i via egenskapen `region`. Tillgängliga förkortningar för regioner är `us` (standard) och `eu`.
    // Dessa regioner används för Sauce Labs VM-moln och Sauce Labs Real Device Cloud.
    // Om du inte anger någon region används `us` som standard.
    region: 'us',
    //
    // Sauce Labs erbjuder en [headless-tjänst](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // som låter dig köra Chrome- och Firefox-tester headless.
    //
    headless: false,
    //
    // ==================
    // Ange testfiler
    // ==================
    // Definiera vilka testspecifikationer som ska köras. Mönstret är relativt till katalogen
    // för den konfigurationsfil som körs.
    //
    // Specifikationerna definieras som en array av spec-filer (eventuellt med jokertecken
    // som kommer att expanderas). Testet för varje spec-fil körs i en separat
    // worker-process. För att låta en grupp spec-filer köras i samma worker-
    // process, omslut dem i en array inuti specs-arrayen.
    //
    // Sökvägen till spec-filerna löses relativt till katalogen för
    // konfigurationsfilen, såvida den inte är absolut.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Mönster att exkludera.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Definiera dina capabilities här. WebdriverIO kan köra flera capabilities samtidigt.
    // Beroende på antalet capabilities startar WebdriverIO flera test-
    // sessioner. Inom dina `capabilities` kan du skriva över vilka filer som körs med
    // `wdio:specs` och `wdio:exclude` för att gruppera specifika specs till en specifik capability.
    //
    // Först kan du definiera hur många instanser som ska startas samtidigt. Låt oss
    // säga att du har 3 olika capabilities (Chrome, Firefox och Safari) och att du har
    // satt `maxInstances` till 1. wdio kommer då att starta 3 processer.
    //
    // Om du alltså har 10 spec-filer och sätter `maxInstances` till 10 kommer alla spec-filer
    // att testas samtidigt och 30 processer kommer att startas.
    //
    // Egenskapen styr hur många capabilities från samma test som ska köra tester.
    //
    maxInstances: 10,
    //
    // Eller sätt en gräns för att köra tester med en specifik capability.
    maxInstancesPerCapability: 10,
    //
    // Infogar WebdriverIO:s globaler (t.ex. `browser`, `$` och `$$`) i den globala miljön.
    // Om du sätter detta till `false` bör du importera från `@wdio/globals`. Obs: WebdriverIO
    // hanterar inte injicering av testramverksspecifika globaler.
    //
    injectGlobals: true,
    //
    // Om du har svårt att få ihop alla viktiga capabilities, kolla in
    // Sauce Labs plattformskonfigurator - ett utmärkt verktyg för att konfigurera dina capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // för att köra chrome headless krävs följande flaggor
        // (se https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parameter för att ignorera vissa eller alla standardflaggor
        // - om värdet är true: ignorera alla DevTools 'default flags' och Puppeteer 'default arguments'
        // - om värdet är en array: DevTools filtrerar angivna standardargument
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances kan skrivas över per capability. Så om du har ett internt Selenium-
        // grid med endast 5 firefox-instanser tillgängliga kan du se till att inte fler än
        // 5 instanser startas åt gången.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flagga för att aktivera Firefox headless-läge (se https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities för mer information om moz:firefoxOptions)
          // args: ['-headless']
        },
        // Om outputDir anges kan WebdriverIO fånga drivrutinens sessionsloggar
        // det är möjligt att konfigurera vilka logTypes som ska exkluderas.
        // excludeDriverLogs: ['*'], // ange '*' för att exkludera alla drivrutinens sessionsloggar
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parameter för att ignorera vissa eller alla Puppeteer-standardargument
        // ignoreDefaultArgs: ['-foreground'], // sätt värdet till true för att ignorera alla standardargument
    }],
    //
    // Ytterligare lista med node-argument att använda när barnprocesser startas
    execArgv: [],
    //
    // ===================
    // Testkonfigurationer
    // ===================
    // Definiera alla alternativ som är relevanta för WebdriverIO-instansen här
    //
    // Nivå på loggningens detaljrikedom: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Ange specifika loggnivåer per logger
    // använd nivån 'silent' för att inaktivera en logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Ange katalog där alla loggar ska sparas
    outputDir: __dirname,
    //
    // Om du bara vill köra dina tester tills ett visst antal tester har misslyckats, använd
    // bail (standard är 0 - avbryt inte, kör alla tester).
    bail: 0,
    //
    // Ange en bas-URL för att förkorta anrop till kommandot `url()`. Om din `url`-parameter börjar
    // med `/` läggs `baseUrl` till före, exklusive sökvägsdelen av `baseUrl`.
    //
    // Om din `url`-parameter börjar utan schema eller `/` (som `some/path`) läggs `baseUrl`
    // till direkt före.
    baseUrl: 'http://localhost:8080',
    //
    // Standardtimeout för alla waitForXXX-kommandon.
    waitforTimeout: 1000,
    //
    // Lägg till filer att bevaka (t.ex. applikationskod eller page objects) när du kör kommandot `wdio`
    // med flaggan `--watch`. Globbing stöds.
    filesToWatch: [
        // t.ex. kör om tester om jag ändrar min applikationskod
        // './app/**/*.js'
    ],
    //
    // Ramverk du vill köra dina specs med.
    // Följande stöds: 'mocha', 'jasmine' och 'cucumber'
    // Se även: https://webdriver.io/docs/frameworks.html
    //
    // Se till att du har wdio-adapterpaketet för det specifika ramverket installerat innan du kör några tester.
    framework: 'mocha',
    //
    // Antal gånger hela spec-filen ska köras om när den misslyckas som helhet
    specFileRetries: 1,
    // Fördröjning i sekunder mellan försöken att köra om spec-filen
    specFileRetriesDelay: 0,
    // Huruvida omkörda spec-filer ska köras om omedelbart eller skjutas upp till slutet av kön
    specFileRetriesDeferred: false,
    //
    // Testrapportör för stdout.
    // Den enda som stöds som standard är 'dot'
    // Se även: https://webdriver.io/docs/dot-reporter.html , och klicka på "Reporters" i vänsterkolumnen
    reporters: [
        'dot',
        ['allure', {
            //
            // Om du använder rapportören "allure" bör du definiera katalogen där
            // WebdriverIO ska spara alla allure-rapporter.
            outputDir: './'
        }]
    ],
    //
    // Alternativ som skickas till Mocha.
    // Se hela listan på: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Alternativ som skickas till Jasmine.
    // Se även: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmines standardtimeout
        defaultTimeoutInterval: 5000,
        //
        // Jasmine-ramverket gör det möjligt att fånga upp varje assertion för att logga applikationens
        // eller webbplatsens tillstånd beroende på resultatet. Det är till exempel mycket praktiskt att ta en skärmdump varje gång
        // en assertion misslyckas.
        expectationResultHandler: function(passed, assertion) {
            // gör något
        },
        //
        // Använd Jasmine-specifik grep-funktionalitet
        grep: null,
        invertGrep: null
    },
    //
    // Om du använder Cucumber måste du ange var dina stegdefinitioner finns.
    // Se även: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (fil/katalog) läs in filer innan features körs
        backtrace: false,   // <boolean> visa fullständig backtrace för fel
        compiler: [],       // <string[]> ("extension:module") läs in filer med angiven EXTENSION efter att MODULE lästs in (upprepningsbar)
        dryRun: false,      // <boolean> anropa formatterare utan att köra steg
        failFast: false,    // <boolean> avbryt körningen vid första fel
        snippets: true,     // <boolean> dölj kodsnuttar för stegdefinitioner för väntande steg
        source: true,       // <boolean> dölj käll-URI:er
        strict: false,      // <boolean> misslyckas om det finns odefinierade eller väntande steg
        tags: '',           // <string> (uttryck) kör endast features eller scenarier med taggar som matchar uttrycket
        timeout: 20000,     // <number> timeout för stegdefinitioner
        ignoreUndefinedDefinitions: false, // <boolean> Aktivera denna inställning för att behandla odefinierade definitioner som varningar.
        scenarioLevelReporter: false // Aktivera detta för att få webdriver.io att bete sig som om scenarier, och inte steg, vore testerna.
    },
    // Ange en anpassad tsconfig-sökväg - WDIO använder `tsx` för att kompilera TypeScript-filer
    // Din TSConfig identifieras automatiskt från den aktuella arbetskatalogen
    // men du kan ange en anpassad sökväg här eller genom att sätta miljövariabeln TSX_TSCONFIG_PATH
    // Se `tsx`-dokumentationen: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Obs: Denna inställning skrivs över av miljövariabeln TSX_TSCONFIG_PATH och/eller cli-argumentet --tsConfigPath om de anges.
    // Denna inställning ignoreras om node inte kan tolka din wdio.conf.ts-fil utan hjälp av tsx, t.ex. om du har sökvägs-
    // alias konfigurerade i tsconfig.json och använder dessa sökvägsalias i din wdio.config.ts-fil.
    // Använd endast detta om du använder en .js-konfigurationsfil eller om din .ts-konfigurationsfil är giltig JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO tillhandahåller flera hooks som du kan använda för att ingripa i testprocessen för att förbättra
    // den och bygga tjänster kring den. Du kan antingen tillämpa en enskild funktion eller en array av
    // metoder. Om någon av dem returnerar ett promise väntar WebdriverIO tills det promise:t har
    // lösts innan den fortsätter.
    //
    /**
     * Körs en gång innan alla workers startas.
     * @param {object} config wdio-konfigurationsobjekt
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Körs innan en worker-process startas och kan användas för att initiera en specifik tjänst
     * för den workern samt modifiera körmiljöer asynkront.
     * @param  {string} cid      capability-id (t.ex. 0-0)
     * @param  {object} caps     objekt som innehåller capabilities för sessionen som ska startas i workern
     * @param  {object} specs    specs som ska köras i worker-processen
     * @param  {object} args     objekt som slås samman med huvudkonfigurationen när workern har initierats
     * @param  {object} execArgv lista med strängargument som skickas till worker-processen
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Körs efter att en worker-process har avslutats.
     * @param  {string} cid      capability-id (t.ex. 0-0)
     * @param  {number} exitCode 0 - lyckat, 1 - misslyckat
     * @param  {object} specs    specs som ska köras i worker-processen
     * @param  {number} retries  antal använda omförsök
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Körs innan webdriver-sessionen och testramverket initieras. Den låter dig
     * manipulera konfigurationer beroende på capability eller spec.
     * @param {object} config wdio-konfigurationsobjekt
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     * @param {Array.<String>} specs Lista med sökvägar till spec-filer som ska köras
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Körs innan testkörningen börjar. Vid denna tidpunkt har du tillgång till alla globala
     * variabler som `browser`. Det är det perfekta stället att definiera anpassade kommandon.
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     * @param {Array.<String>} specs        Lista med sökvägar till spec-filer som ska köras
     * @param {object}         browser      instans av skapad webbläsar-/enhetssession
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Körs innan sviten startar (endast i Mocha/Jasmine).
     * @param {object} suite svitdetaljer
     */
    beforeSuite: function (suite) {
    },
    /**
     * Denna hook körs _innan_ varje hook inom sviten startar.
     * (Till exempel körs denna innan `before`, `beforeEach`, `after`, `afterEach` anropas i Mocha.). I Cucumber är `context` World-objektet.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook som körs _efter_ att varje hook inom sviten har avslutats.
     * (Till exempel körs denna efter att `before`, `beforeEach`, `after`, `afterEach` anropats i Mocha.). I Cucumber är `context` World-objektet.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funktion som körs före ett test (endast i Mocha/Jasmine)
     * @param {object} test    testobjekt
     * @param {object} context scope-objekt som testet kördes med
     */
    beforeTest: function (test, context) {
    },
    /**
     * Körs innan ett WebdriverIO-kommando utförs.
     * @param {string} commandName hook-kommandots namn
     * @param {Array} args argument som kommandot skulle ta emot
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Körs efter att ett WebdriverIO-kommando har utförts
     * @param {string} commandName hook-kommandots namn
     * @param {Array} args argument som kommandot skulle ta emot
     * @param {*} result kommandots resultat
     * @param {Error} error felobjekt, om något
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funktion som körs efter ett test (endast i Mocha/Jasmine)
     * @param {object}  test             testobjekt
     * @param {object}  context          scope-objekt som testet kördes med
     * @param {Error}   result.error     felobjekt om testet misslyckas, annars `undefined`
     * @param {*}       result.result    returobjekt från testfunktionen
     * @param {number}  result.duration  testets varaktighet
     * @param {boolean} result.passed    true om testet har lyckats, annars false
     * @param {object}  result.retries   information om spec-relaterade omförsök, t.ex. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook som körs efter att sviten har avslutats (endast i Mocha/Jasmine).
     * @param {object} suite svitdetaljer
     */
    afterSuite: function (suite) {
    },
    /**
     * Körs efter att alla tester är klara. Du har fortfarande tillgång till alla globala variabler från
     * testet.
     * @param {number} result 0 - test lyckades, 1 - test misslyckades
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     * @param {Array.<String>} specs Lista med sökvägar till spec-filer som kördes
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Körs direkt efter att webdriver-sessionen har avslutats.
     * @param {object} config wdio-konfigurationsobjekt
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     * @param {Array.<String>} specs Lista med sökvägar till spec-filer som kördes
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Körs efter att alla workers har stängts ner och processen är på väg att avslutas.
     * Ett fel som kastas i hooken `onComplete` leder till att testkörningen misslyckas.
     * @param {object} exitCode 0 - lyckat, 1 - misslyckat
     * @param {object} config wdio-konfigurationsobjekt
     * @param {Array.<Object>} capabilities lista med capabilities-detaljer
     * @param {<Object>} results objekt som innehåller testresultat
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Körs när en uppdatering sker.
    * @param {string} oldSessionId sessions-ID för den gamla sessionen
    * @param {string} newSessionId sessions-ID för den nya sessionen
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber-hooks
     *
     * Körs före en Cucumber-feature.
     * @param {string}                   uri      sökväg till feature-fil
     * @param {GherkinDocument.IFeature} feature  Cucumber-feature-objekt
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Körs före ett Cucumber-scenario.
     * @param {ITestCaseHookParameter} world    world-objekt som innehåller information om pickle och teststeg
     * @param {object}                 context  Cucumber World-objekt
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Körs före ett Cucumber-steg.
     * @param {Pickle.IPickleStep} step     stegdata
     * @param {IPickle}            scenario scenario-pickle
     * @param {object}             context  Cucumber World-objekt
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Körs efter ett Cucumber-steg.
     * @param {Pickle.IPickleStep} step             stegdata
     * @param {IPickle}            scenario         scenario-pickle
     * @param {object}             result           resultatobjekt som innehåller scenarioresultat
     * @param {boolean}            result.passed    true om scenariot har lyckats
     * @param {string}             result.error     felstack om scenariot misslyckades
     * @param {number}             result.duration  scenariots varaktighet i millisekunder
     * @param {object}             context          Cucumber World-objekt
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Körs efter ett Cucumber-scenario.
     * @param {ITestCaseHookParameter} world            world-objekt som innehåller information om pickle och teststeg
     * @param {object}                 result           resultatobjekt som innehåller scenarioresultat `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true om scenariot har lyckats
     * @param {string}                 result.error     felstack om scenariot misslyckades
     * @param {number}                 result.duration  scenariots varaktighet i millisekunder
     * @param {object}                 context          Cucumber World-objekt
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Körs efter en Cucumber-feature.
     * @param {string}                   uri      sökväg till feature-fil
     * @param {GherkinDocument.IFeature} feature  Cucumber-feature-objekt
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Körs innan ett WebdriverIO-assertionbibliotek gör en assertion.
     * @param {object} params                 assertion-information
     * @param {string} params.matcherName     namnet på den matcher som testet anropade (för ett alias, aliasnamnet)
     * @param {*}      params.expectedValue   värde som skickas till matchern
     * @param {object} params.options         assertion-alternativ
     */
    beforeAssertion: function (params) {
    },
    /**
     * Körs efter att ett WebdriverIO-assertionbibliotek har gjort en assertion.
     * @param {object} params                 assertion-information, samma som i `beforeAssertion`
     * @param {object} params.result          matcherns resultat, med `pass` (boolean) och `message()`.
     *                                        `pass` är true när värdet matchar, även med `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Du kan också hitta en fil med alla möjliga alternativ och varianter i [exempelmappen](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).