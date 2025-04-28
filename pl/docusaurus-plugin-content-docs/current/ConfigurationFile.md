---
id: configurationfile
title: Plik Konfiguracyjny
---

Plik konfiguracyjny zawiera wszystkie niezbędne informacje do uruchomienia zestawu testów. Jest to moduł NodeJS, który eksportuje obiekt JSON.

Oto przykład konfiguracji ze wszystkimi obsługiwanymi właściwościami i dodatkowymi informacjami:

```js
export const config = {

    // ==================================
    // Gdzie powinny być uruchamiane testy
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Konfiguracje Serwera
    // =====================
    // Adres hosta działającego serwera Selenium. Ta informacja jest zwykle zbędna,
    // ponieważ WebdriverIO automatycznie łączy się z localhost. Także jeśli używasz jednej z
    // obsługiwanych usług w chmurze, takich jak Sauce Labs, Browserstack, Testing Bot lub LambdaTest, również nie
    // musisz definiować informacji o hoście i porcie (ponieważ WebdriverIO może to ustalić
    // na podstawie informacji o użytkowniku i kluczu). Jednak jeśli używasz prywatnego backendu Selenium,
    // powinieneś tutaj zdefiniować `hostname`, `port` i `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Dostawcy Usług
    // =================
    // WebdriverIO obsługuje Sauce Labs, Browserstack, Testing Bot i LambdaTest. (Inni dostawcy chmury
    // powinni również działać.) Te usługi definiują określone wartości `user` i `key` (lub klucza dostępu),
    // które musisz tu umieścić, aby połączyć się z tymi usługami.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Jeśli uruchamiasz testy na Sauce Labs, możesz określić region, w którym chcesz uruchamiać testy
    // za pomocą właściwości `region`. Dostępne skróty regionów to `us` (domyślnie) i `eu`.
    // Te regiony są używane dla chmury VM Sauce Labs i chmury urządzeń rzeczywistych Sauce Labs.
    // Jeśli nie podasz regionu, domyślnie ustawiony jest `us`.
    region: 'us',
    //
    // Sauce Labs oferuje [rozwiązanie bezgłowicowe](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // które umożliwia uruchamianie testów Chrome i Firefox w trybie headless.
    //
    headless: false,
    //
    // ==================
    // Określ Pliki Testowe
    // ==================
    // Zdefiniuj, które specyfikacje testowe powinny być uruchomione. Wzorzec jest względny do katalogu
    // pliku konfiguracyjnego.
    //
    // Specyfikacje są zdefiniowane jako tablica plików specyfikacji (opcjonalnie używając wieloznaczników,
    // które zostaną rozwinięte). Test dla każdego pliku specyfikacji będzie uruchamiany w osobnym
    // procesie roboczym. Aby uruchomić grupę plików specyfikacji w tym samym procesie
    // roboczym, zamknij je w tablicy wewnątrz tablicy specs.
    //
    // Ścieżka plików specyfikacji zostanie rozwiązana względem katalogu
    // pliku konfiguracyjnego, chyba że jest absolutna.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Wzorce do wykluczenia.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Możliwości
    // ============
    // Zdefiniuj swoje możliwości tutaj. WebdriverIO może uruchamiać wiele możliwości
    // jednocześnie. W zależności od liczby możliwości WebdriverIO uruchamia kilka sesji
    // testowych. W ramach swoich `capabilities` możesz nadpisać opcje `spec` i `exclude`
    // w celu pogrupowania określonych specyfikacji dla określonej możliwości.
    //
    // Najpierw możesz zdefiniować, ile instancji powinno być uruchomionych jednocześnie. Powiedzmy,
    // że masz 3 różne możliwości (Chrome, Firefox i Safari) i masz
    // ustawione `maxInstances` na 1. wdio uruchomi 3 procesy.
    //
    // Dlatego, jeśli masz 10 plików specyfikacji i ustawisz `maxInstances` na 10, wszystkie pliki specyfikacji
    // będą testowane jednocześnie i zostanie uruchomionych 30 procesów.
    //
    // Ta właściwość określa, ile możliwości z tego samego testu powinno uruchamiać testy.
    //
    maxInstances: 10,
    //
    // Lub ustaw limit do uruchamiania testów z określoną możliwością.
    maxInstancesPerCapability: 10,
    //
    // Wstawia globalne zmienne WebdriverIO (np. `browser`, `$` i `$$`) do globalnego środowiska.
    // Jeśli ustawisz na `false`, powinieneś importować z `@wdio/globals`. Uwaga: WebdriverIO nie
    // obsługuje wstrzykiwania globalnych zmiennych specyficznych dla frameworka testowego.
    //
    injectGlobals: true,
    //
    // Jeśli masz problemy z zebraniem wszystkich ważnych możliwości, sprawdź
    // konfigurator platformy Sauce Labs - świetne narzędzie do konfigurowania możliwości:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // aby uruchomić chrome w trybie headless, wymagane są następujące flagi
        // (patrz https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych flag
        // - jeśli wartość to true: ignoruje wszystkie 'domyślne flagi' DevTools i 'domyślne argumenty' Puppeteer
        // - jeśli wartość to tablica: DevTools filtruje podane domyślne argumenty
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances może być nadpisane na podstawie możliwości. Więc jeśli masz własną sieć Selenium
        // z tylko 5 dostępnymi instancjami Firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flaga do aktywacji trybu bezgłowicowego Firefox (więcej szczegółów o moz:firefoxOptions na stronie https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities)
          // args: ['-headless']
        },
        // Jeśli podano outputDir, WebdriverIO może przechwytywać dzienniki sesji sterownika
        // można skonfigurować, które logTypes wykluczyć.
        // excludeDriverLogs: ['*'], // przekaż '*', aby wykluczyć wszystkie dzienniki sesji sterownika
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych argumentów Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // ustaw wartość na true, aby ignorować wszystkie domyślne argumenty
    }],
    //
    // Dodatkowa lista argumentów węzła do użycia podczas uruchamiania procesów potomnych
    execArgv: [],
    //
    // ===================
    // Konfiguracje Testów
    // ===================
    // Zdefiniuj wszystkie opcje, które są istotne dla instancji WebdriverIO
    //
    // Poziom szczegółowości logowania: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Ustaw określone poziomy logowania dla poszczególnych loggerów
    // użyj poziomu 'silent', aby wyłączyć logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Ustaw katalog do przechowywania wszystkich logów
    outputDir: __dirname,
    //
    // Jeśli chcesz uruchamiać testy tylko do momentu, gdy określona liczba testów nie powiedzie się, użyj
    // bail (domyślnie 0 - nie przerywaj, uruchom wszystkie testy).
    bail: 0,
    //
    // Ustaw podstawowy URL, aby skrócić wywołania poleceń `url()`. Jeśli twój parametr `url` zaczyna się
    // od `/`, zostanie dodany `baseUrl`, nie obejmując części ścieżki `baseUrl`.
    //
    // Jeśli twój parametr `url` zaczyna się bez schematu lub `/` (np. `some/path`), `baseUrl`
    // zostanie dodany bezpośrednio.
    baseUrl: 'http://localhost:8080',
    //
    // Domyślny timeout dla wszystkich poleceń waitForXXX.
    waitforTimeout: 1000,
    //
    // Dodaj pliki do obserwowania (np. kod aplikacji lub obiekty stron) podczas uruchamiania polecenia `wdio`
    // z flagą `--watch`. Obsługiwane są wzorce globalne.
    filesToWatch: [
        // np. uruchom ponownie testy, jeśli zmienię kod mojej aplikacji
        // './app/**/*.js'
    ],
    //
    // Framework, z którym chcesz uruchamiać specyfikacje.
    // Obsługiwane są: 'mocha', 'jasmine' i 'cucumber'
    // Zobacz również: https://webdriver.io/docs/frameworks.html
    //
    // Upewnij się, że masz zainstalowany pakiet adaptera wdio dla konkretnego frameworka przed uruchomieniem jakichkolwiek testów.
    framework: 'mocha',
    //
    // Liczba prób ponownego uruchomienia całego pliku specyfikacji, gdy nie powiedzie się jako całość
    specFileRetries: 1,
    // Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji
    specFileRetriesDelay: 0,
    // Czy ponownie uruchomione pliki specyfikacji powinny być uruchamiane natychmiast, czy przełożone na koniec kolejki
    specFileRetriesDeferred: false,
    //
    // Reporter dla stdout.
    // Jedynym obsługiwanym domyślnie jest 'dot'
    // Zobacz również: https://webdriver.io/docs/dot-reporter.html i kliknij "Reporters" w lewej kolumnie
    reporters: [
        'dot',
        ['allure', {
            //
            // Jeśli używasz reportera "allure", powinieneś zdefiniować katalog, w którym
            // WebdriverIO powinien zapisywać wszystkie raporty allure.
            outputDir: './'
        }]
    ],
    //
    // Opcje do przekazania do Mocha.
    // Zobacz pełną listę na: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opcje do przekazania do Jasmine.
    // Zobacz również: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Domyślny timeout Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Framework Jasmine pozwala na przechwytywanie każdego asercji w celu rejestrowania stanu aplikacji
        // lub strony internetowej w zależności od wyniku. Na przykład, bardzo przydatne jest robienie zrzutu ekranu za każdym razem,
        // gdy asercja nie powiedzie się.
        expectationResultHandler: function(passed, assertion) {
            // zrób coś
        },
        //
        // Korzystaj z funkcjonalności grep specyficznej dla Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Jeśli używasz Cucumber, musisz określić, gdzie znajdują się definicje kroków.
    // Zobacz również: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (plik/katalog) wymaga plików przed wykonaniem funkcji
        backtrace: false,   // <boolean> pokaż pełny backtrace dla błędów
        compiler: [],       // <string[]> ("rozszerzenie:moduł") wymaga plików z danym ROZSZERZENIEM po wymaganiu MODUŁU (powtarzalne)
        dryRun: false,      // <boolean> wywołuje formatery bez wykonywania kroków
        failFast: false,    // <boolean> przerwij uruchomienie przy pierwszym niepowodzeniu
        snippets: true,     // <boolean> ukryj fragmenty definicji kroków dla oczekujących kroków
        source: true,       // <boolean> ukryj URI źródłowe
        strict: false,      // <boolean> nie powiedzie się, jeśli istnieją niezdefiniowane lub oczekujące kroki
        tagExpression: '',  // <string> (wyrażenie) wykonuj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia
        timeout: 20000,     // <number> timeout dla definicji kroków
        ignoreUndefinedDefinitions: false, // <boolean> Włącz tę konfigurację, aby traktować niezdefiniowane definicje jako ostrzeżenia.
        scenarioLevelReporter: false // Włącz to, aby webdriver.io zachowywał się, jakby scenariusze, a nie kroki były testami.
    },
    // Określ niestandardową ścieżkę tsconfig - WDIO używa `tsx` do kompilacji plików TypeScript
    // Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego
    // ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH
    // Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooki
    // =====
    // WebdriverIO oferuje kilka hooków, których możesz użyć do ingerencji w proces testowy w celu jego ulepszenia
    // i zbudowania wokół niego usług. Możesz zastosować pojedynczą funkcję lub tablicę
    // metod. Jeśli jedna z nich zwraca obietnicę, WebdriverIO poczeka, aż ta obietnica zostanie
    // rozwiązana, aby kontynuować.
    //
    /**
     * Wykonywane raz przed uruchomieniem wszystkich workerów.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wykonywane przed utworzeniem procesu workera i może być używane do inicjalizacji określonej usługi
     * dla tego workera oraz do modyfikacji środowisk uruchomieniowych w sposób asynchroniczny.
     * @param  {string} cid      id możliwości (np. 0-0)
     * @param  {object} caps     obiekt zawierający możliwości dla sesji, która zostanie utworzona w workerze
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {object} args     obiekt, który zostanie połączony z główną konfiguracją po inicjalizacji workera
     * @param  {object} execArgv lista argumentów string przekazywanych do procesu workera
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wykonywane po zakończeniu procesu workera.
     * @param  {string} cid      id możliwości (np. 0-0)
     * @param  {number} exitCode 0 - sukces, 1 - niepowodzenie
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {number} retries  liczba użytych ponownych prób
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wykonywane przed inicjalizacją sesji webdrivera i frameworka testowego. Pozwala
     * na manipulowanie konfiguracjami w zależności od możliwości lub specyfikacji.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji do uruchomienia
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywane przed rozpoczęciem wykonywania testu. W tym momencie masz dostęp do wszystkich zmiennych
     * globalnych, takich jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs        Lista ścieżek plików specyfikacji do uruchomienia
     * @param {object}         browser      instancja utworzonej sesji przeglądarki/urządzenia
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wykonywane przed rozpoczęciem zestawu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ten hook jest wykonywany _przed_ każdym hookiem w zestawie.
     * (Na przykład, uruchamia się przed wywołaniem `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, który jest wykonywany _po_ każdym hooku w zestawie.
     * (Na przykład, uruchamia się po wywołaniu `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funkcja wykonywana przed testem (tylko w Mocha/Jasmine)
     * @param {object} test    obiekt testu
     * @param {object} context obiekt zakresu, z którym test został wykonany
     */
    beforeTest: function (test, context) {
    },
    /**
     * Uruchamiane przed wykonaniem polecenia WebdriverIO.
     * @param {string} commandName nazwa polecenia hooka
     * @param {Array} args argumenty, które polecenie otrzymałoby
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Uruchamiane po wykonaniu polecenia WebdriverIO
     * @param {string} commandName nazwa polecenia hooka
     * @param {Array} args argumenty, które polecenie otrzymałoby
     * @param {number} result 0 - sukces polecenia, 1 - błąd polecenia
     * @param {object} error obiekt błędu, jeśli istnieje
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funkcja wykonywana po teście (tylko w Mocha/Jasmine)
     * @param {object}  test             obiekt testu
     * @param {object}  context          obiekt zakresu, z którym test został wykonany
     * @param {Error}   result.error     obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
     * @param {*}       result.result    obiekt zwrotny funkcji testowej
     * @param {number}  result.duration  czas trwania testu
     * @param {boolean} result.passed    true, jeśli test przeszedł, w przeciwnym razie false
     * @param {object}  result.retries   informacje o ponownych próbach związanych ze specyfikacją, np. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook, który jest wykonywany po zakończeniu zestawu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu
     */
    afterSuite: function (suite) {
    },
    /**
     * Wykonywane po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych
     * z testu.
     * @param {number} result 0 - test zdany, 1 - test nieudany
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wykonywane zaraz po zakończeniu sesji webdrivera.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywane po zamknięciu wszystkich workerów i przed zamknięciem procesu.
     * Błąd rzucony w hooku `onComplete` spowoduje niepowodzenie uruchomienia testu.
     * @param {object} exitCode 0 - sukces, 1 - niepowodzenie
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {<Object>} results obiekt zawierający wyniki testów
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wykonywane, gdy następuje odświeżenie.
    * @param {string} oldSessionId ID sesji starej sesji
    * @param {string} newSessionId ID sesji nowej sesji
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooki Cucumber
     *
     * Uruchamiane przed funkcją Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcji
     * @param {GherkinDocument.IFeature} feature  obiekt funkcji Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Uruchamiane przed scenariuszem Cucumber.
     * @param {ITestCaseHookParameter} world    obiekt świata zawierający informacje o pickle i kroku testowym
     * @param {object}                 context  obiekt świata Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Uruchamiane przed krokiem Cucumber.
     * @param {Pickle.IPickleStep} step     dane kroku
     * @param {IPickle}            scenario pickle scenariusza
     * @param {object}             context  obiekt świata Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Uruchamiane po kroku Cucumber.
     * @param {Pickle.IPickleStep} step             dane kroku
     * @param {IPickle}            scenario         pickle scenariusza
     * @param {object}             result           obiekt wyników zawierający wyniki scenariusza
     * @param {boolean}            result.passed    true, jeśli scenariusz przeszedł
     * @param {string}             result.error     stos błędów, jeśli scenariusz nie powiódł się
     * @param {number}             result.duration  czas trwania scenariusza w milisekundach
     * @param {object}             context          obiekt świata Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Uruchamiane po scenariuszu Cucumber.
     * @param {ITestCaseHookParameter} world            obiekt świata zawierający informacje o pickle i kroku testowym
     * @param {object}                 result           obiekt wyników zawierający wyniki scenariusza `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, jeśli scenariusz przeszedł
     * @param {string}                 result.error     stos błędów, jeśli scenariusz nie powiódł się
     * @param {number}                 result.duration  czas trwania scenariusza w milisekundach
     * @param {object}                 context          obiekt świata Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Uruchamiane po funkcji Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcji
     * @param {GherkinDocument.IFeature} feature  obiekt funkcji Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Uruchamiane przed wykonaniem asercji przez bibliotekę asercji WebdriverIO.
     * @param commandName nazwa polecenia
     * @param args argumenty, które polecenie otrzymałoby
     */
    beforeAssertion: function (params) {
    },
    /**
     * Uruchamiane po wykonaniu polecenia WebdriverIO
     * @param commandName nazwa polecenia
     * @param args argumenty, które polecenie otrzymałoby
     * @param result wynik polecenia
     * @param error błąd w przypadku, gdy coś poszło nie tak
     */
    afterAssertion: function (params) {
    }
}
```

Możesz również znaleźć plik ze wszystkimi możliwymi opcjami i wariantami w [folderze przykładów](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).