---
id: configurationfile
title: Plik konfiguracyjny
description: "Przejrzyj opatrzony komentarzami przykładowy plik wdio.conf.js, który zawiera wszystkie obsługiwane opcje testrunnera, capabilities i hooki wraz z objaśnieniami."
---

Plik konfiguracyjny zawiera wszystkie informacje niezbędne do uruchomienia zestawu testów. Jest to moduł NodeJS, który eksportuje JSON.

Oto przykładowa konfiguracja ze wszystkimi obsługiwanymi właściwościami i dodatkowymi informacjami:

```js
export const config = {

    // ==================================
    // Gdzie powinien zostać uruchomiony test
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Konfiguracja serwera
    // =====================
    // Adres hosta działającego serwera Selenium. Ta informacja jest zazwyczaj zbędna, ponieważ
    // WebdriverIO automatycznie łączy się z localhost. Ponadto, jeśli korzystasz z jednej z
    // obsługiwanych usług chmurowych, takich jak Sauce Labs, Browserstack, Testing Bot lub TestMu AI (dawniej LambdaTest), również nie
    // musisz definiować informacji o hoście i porcie (ponieważ WebdriverIO może je ustalić
    // na podstawie Twojego użytkownika i klucza). Jeśli jednak korzystasz z prywatnego
    // backendu Selenium, powinieneś zdefiniować tutaj `hostname`, `port` i `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protokół: http | https
    // protocol: 'http',
    //
    // =================
    // Dostawcy usług
    // =================
    // WebdriverIO obsługuje Sauce Labs, Browserstack, Testing Bot i TestMu AI (dawniej LambdaTest). (Inni dostawcy chmurowi
    // również powinni działać.) Te usługi definiują określone wartości `user` i `key` (lub klucz dostępu),
    // które musisz tutaj podać, aby połączyć się z tymi usługami.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Jeśli uruchamiasz testy w Sauce Labs, możesz określić region, w którym mają być uruchamiane testy,
    // za pomocą właściwości `region`. Dostępne skróty dla regionów to `us` (domyślny) i `eu`.
    // Te regiony są używane dla chmury VM Sauce Labs oraz Sauce Labs Real Device Cloud.
    // Jeśli nie podasz regionu, domyślnie zostanie użyty `us`.
    region: 'us',
    //
    // Sauce Labs oferuje [rozwiązanie headless](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // które pozwala uruchamiać testy Chrome i Firefox w trybie headless.
    //
    headless: false,
    //
    // ==================
    // Określ pliki testowe
    // ==================
    // Zdefiniuj, które specyfikacje testów mają zostać uruchomione. Wzorzec jest względny względem katalogu
    // uruchamianego pliku konfiguracyjnego.
    //
    // Specyfikacje są definiowane jako tablica plików spec (opcjonalnie z użyciem symboli wieloznacznych,
    // które zostaną rozwinięte). Test dla każdego pliku spec zostanie uruchomiony w osobnym
    // procesie roboczym (workerze). Aby grupa plików spec była uruchamiana w tym samym procesie
    // roboczym, umieść je w tablicy wewnątrz tablicy specs.
    //
    // Ścieżka plików spec zostanie rozwiązana względem katalogu
    // pliku konfiguracyjnego, chyba że jest bezwzględna.
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
    // Capabilities
    // ============
    // Zdefiniuj tutaj swoje capabilities. WebdriverIO może uruchamiać wiele capabilities jednocześnie.
    // W zależności od liczby capabilities WebdriverIO uruchamia kilka sesji
    // testowych. W ramach `capabilities` możesz nadpisać, które pliki są uruchamiane, za pomocą
    // `wdio:specs` i `wdio:exclude`, aby przypisać określone specyfikacje do określonej capability.
    //
    // Po pierwsze, możesz zdefiniować, ile instancji ma być uruchamianych jednocześnie. Załóżmy,
    // że masz 3 różne capabilities (Chrome, Firefox i Safari) i ustawiłeś
    // `maxInstances` na 1. wdio uruchomi 3 procesy.
    //
    // Zatem jeśli masz 10 plików spec i ustawisz `maxInstances` na 10, wszystkie pliki spec
    // zostaną przetestowane jednocześnie i zostanie uruchomionych 30 procesów.
    //
    // Ta właściwość określa, ile capabilities z tego samego testu ma uruchamiać testy.
    //
    maxInstances: 10,
    //
    // Lub ustaw limit uruchamiania testów z określoną capability.
    maxInstancesPerCapability: 10,
    //
    // Wstawia globalne obiekty WebdriverIO (np. `browser`, `$` i `$$`) do środowiska globalnego.
    // Jeśli ustawisz `false`, powinieneś importować je z `@wdio/globals`. Uwaga: WebdriverIO nie
    // obsługuje wstrzykiwania globalnych obiektów specyficznych dla frameworka testowego.
    //
    injectGlobals: true,
    //
    // Jeśli masz problem z zestawieniem wszystkich ważnych capabilities, sprawdź
    // konfigurator platformy Sauce Labs - świetne narzędzie do konfigurowania capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // aby uruchomić chrome w trybie headless, wymagane są następujące flagi
        // (zobacz https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych flag
        // - jeśli wartość to true: ignoruj wszystkie 'domyślne flagi' DevTools i 'domyślne argumenty' Puppeteer
        // - jeśli wartość to tablica: DevTools filtruje podane domyślne argumenty
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances można nadpisać dla każdej capability. Jeśli więc masz wewnętrzny grid
        // Selenium z tylko 5 dostępnymi instancjami firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flaga aktywująca tryb headless Firefoksa (zobacz https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities, aby uzyskać więcej informacji o moz:firefoxOptions)
          // args: ['-headless']
        },
        // Jeśli podano outputDir, WebdriverIO może przechwytywać logi sesji sterownika
        // można skonfigurować, które logTypes mają zostać wykluczone.
        // excludeDriverLogs: ['*'], // przekaż '*', aby wykluczyć wszystkie logi sesji sterownika
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych argumentów Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // ustaw wartość na true, aby ignorować wszystkie domyślne argumenty
    }],
    //
    // Dodatkowa lista argumentów node używanych podczas uruchamiania procesów potomnych
    execArgv: [],
    //
    // ===================
    // Konfiguracja testów
    // ===================
    // Zdefiniuj tutaj wszystkie opcje istotne dla instancji WebdriverIO
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
    // Ustaw katalog, w którym będą przechowywane wszystkie logi
    outputDir: __dirname,
    //
    // Jeśli chcesz uruchamiać testy tylko do momentu, gdy określona liczba testów zakończy się niepowodzeniem, użyj
    // bail (domyślnie 0 - nie przerywaj, uruchom wszystkie testy).
    bail: 0,
    //
    // Ustaw bazowy URL, aby skrócić wywołania komendy `url()`. Jeśli parametr `url` zaczyna się
    // od `/`, `baseUrl` jest dodawany na początku, bez części ścieżki z `baseUrl`.
    //
    // Jeśli parametr `url` zaczyna się bez schematu lub `/` (np. `some/path`), `baseUrl`
    // jest dodawany bezpośrednio na początku.
    baseUrl: 'http://localhost:8080',
    //
    // Domyślny limit czasu dla wszystkich komend waitForXXX.
    waitforTimeout: 1000,
    //
    // Dodaj pliki do obserwowania (np. kod aplikacji lub page objects) podczas uruchamiania komendy `wdio`
    // z flagą `--watch`. Obsługiwane są wzorce glob.
    filesToWatch: [
        // np. uruchom ponownie testy, jeśli zmienię kod mojej aplikacji
        // './app/**/*.js'
    ],
    //
    // Framework, z którym chcesz uruchamiać swoje specyfikacje.
    // Obsługiwane są: 'mocha', 'jasmine' i 'cucumber'
    // Zobacz także: https://webdriver.io/docs/frameworks.html
    //
    // Upewnij się, że masz zainstalowany pakiet adaptera wdio dla danego frameworka przed uruchomieniem jakichkolwiek testów.
    framework: 'mocha',
    //
    // Liczba ponownych prób uruchomienia całego pliku spec, gdy zakończy się on niepowodzeniem jako całość
    specFileRetries: 1,
    // Opóźnienie w sekundach między kolejnymi próbami ponownego uruchomienia pliku spec
    specFileRetriesDelay: 0,
    // Czy ponawiane pliki spec mają być uruchamiane natychmiast, czy odkładane na koniec kolejki
    specFileRetriesDeferred: false,
    //
    // Reporter testów dla stdout.
    // Jedynym domyślnie obsługiwanym jest 'dot'
    // Zobacz także: https://webdriver.io/docs/dot-reporter.html i kliknij "Reporters" w lewej kolumnie
    reporters: [
        'dot',
        ['allure', {
            //
            // Jeśli używasz reportera "allure", powinieneś zdefiniować katalog, w którym
            // WebdriverIO ma zapisywać wszystkie raporty allure.
            outputDir: './'
        }]
    ],
    //
    // Opcje przekazywane do Mocha.
    // Pełna lista dostępna pod adresem: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opcje przekazywane do Jasmine.
    // Zobacz także: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Domyślny limit czasu Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Framework Jasmine pozwala przechwycić każdą asercję, aby zalogować stan aplikacji
        // lub strony internetowej w zależności od wyniku. Na przykład bardzo przydatne jest wykonywanie zrzutu ekranu za każdym razem,
        // gdy asercja się nie powiedzie.
        expectationResultHandler: function(passed, assertion) {
            // zrób coś
        },
        //
        // Skorzystaj z funkcjonalności grep specyficznej dla Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Jeśli używasz Cucumber, musisz określić, gdzie znajdują się definicje kroków.
    // Zobacz także: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (plik/katalog) wczytaj pliki przed wykonaniem funkcjonalności
        backtrace: false,   // <boolean> pokaż pełny ślad stosu dla błędów
        compiler: [],       // <string[]> ("extension:module") wczytaj pliki z podanym ROZSZERZENIEM po wczytaniu MODUŁU (powtarzalne)
        dryRun: false,      // <boolean> wywołaj formattery bez wykonywania kroków
        failFast: false,    // <boolean> przerwij uruchomienie przy pierwszym niepowodzeniu
        snippets: true,     // <boolean> ukryj fragmenty definicji kroków dla oczekujących kroków
        source: true,       // <boolean> ukryj URI źródeł
        strict: false,      // <boolean> zakończ niepowodzeniem, jeśli istnieją niezdefiniowane lub oczekujące kroki
        tags: '',           // <string> (wyrażenie) wykonuj tylko funkcjonalności lub scenariusze z tagami pasującymi do wyrażenia
        timeout: 20000,     // <number> limit czasu dla definicji kroków
        ignoreUndefinedDefinitions: false, // <boolean> Włącz tę opcję, aby traktować niezdefiniowane definicje jako ostrzeżenia.
        scenarioLevelReporter: false // Włącz tę opcję, aby webdriver.io zachowywał się tak, jakby testami były scenariusze, a nie kroki.
    },
    // Określ niestandardową ścieżkę tsconfig - WDIO używa `tsx` do kompilowania plików TypeScript
    // Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego,
    // ale możesz tutaj określić niestandardową ścieżkę lub ustawić zmienną środowiskową TSX_TSCONFIG_PATH
    // Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Uwaga: To ustawienie zostanie nadpisane przez zmienną środowiskową TSX_TSCONFIG_PATH i/lub argument CLI --tsConfigPath, jeśli zostały określone.
    // To ustawienie zostanie zignorowane, jeśli node nie będzie w stanie sparsować Twojego pliku wdio.conf.ts bez pomocy tsx, np. jeśli masz skonfigurowane
    // aliasy ścieżek w tsconfig.json i używasz tych aliasów w swoim pliku wdio.config.ts.
    // Używaj tego tylko wtedy, gdy korzystasz z pliku konfiguracyjnego .js lub Twój plik konfiguracyjny .ts jest poprawnym kodem JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooki
    // =====
    // WebdriverIO udostępnia kilka hooków, których możesz użyć do ingerowania w proces testowy, aby go rozszerzyć
    // i budować wokół niego usługi. Możesz przypisać do nich pojedynczą funkcję lub tablicę
    // metod. Jeśli któraś z nich zwróci promise, WebdriverIO poczeka, aż ten promise zostanie
    // rozwiązany, zanim będzie kontynuować.
    //
    /**
     * Wykonywany raz przed uruchomieniem wszystkich workerów.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wykonywany przed uruchomieniem procesu workera i może być użyty do zainicjowania określonej usługi
     * dla tego workera, a także do asynchronicznej modyfikacji środowiska uruchomieniowego.
     * @param  {string} cid      identyfikator capability (np. 0-0)
     * @param  {object} caps     obiekt zawierający capabilities dla sesji, która zostanie uruchomiona w workerze
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {object} args     obiekt, który zostanie scalony z główną konfiguracją po zainicjowaniu workera
     * @param  {object} execArgv lista argumentów tekstowych przekazanych do procesu workera
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wykonywany po zakończeniu procesu workera.
     * @param  {string} cid      identyfikator capability (np. 0-0)
     * @param  {number} exitCode 0 - sukces, 1 - niepowodzenie
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {number} retries  liczba wykorzystanych ponownych prób
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wykonywany przed zainicjowaniem sesji webdriver i frameworka testowego. Pozwala
     * modyfikować konfigurację w zależności od capability lub specyfikacji.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     * @param {Array.<String>} specs lista ścieżek plików spec, które mają zostać uruchomione
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywany przed rozpoczęciem wykonywania testów. W tym momencie masz dostęp do wszystkich
     * zmiennych globalnych, takich jak `browser`. To idealne miejsce do definiowania niestandardowych komend.
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     * @param {Array.<String>} specs        lista ścieżek plików spec, które mają zostać uruchomione
     * @param {object}         browser      instancja utworzonej sesji przeglądarki/urządzenia
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wykonywany przed rozpoczęciem zestawu testów (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu testów
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ten hook jest wykonywany _przed_ rozpoczęciem każdego hooka w zestawie testów.
     * (Na przykład jest uruchamiany przed wywołaniem `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook wykonywany _po_ zakończeniu każdego hooka w zestawie testów.
     * (Na przykład jest uruchamiany po wywołaniu `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funkcja wykonywana przed testem (tylko w Mocha/Jasmine)
     * @param {object} test    obiekt testu
     * @param {object} context obiekt zakresu, w którym test został wykonany
     */
    beforeTest: function (test, context) {
    },
    /**
     * Uruchamiany przed wykonaniem komendy WebdriverIO.
     * @param {string} commandName nazwa komendy hooka
     * @param {Array} args argumenty, które otrzymałaby komenda
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Uruchamiany po wykonaniu komendy WebdriverIO
     * @param {string} commandName nazwa komendy hooka
     * @param {Array} args argumenty, które otrzymałaby komenda
     * @param {*} result wynik komendy
     * @param {Error} error obiekt błędu, jeśli wystąpił
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funkcja wykonywana po teście (tylko w Mocha/Jasmine)
     * @param {object}  test             obiekt testu
     * @param {object}  context          obiekt zakresu, w którym test został wykonany
     * @param {Error}   result.error     obiekt błędu, jeśli test się nie powiedzie, w przeciwnym razie `undefined`
     * @param {*}       result.result    obiekt zwracany przez funkcję testową
     * @param {number}  result.duration  czas trwania testu
     * @param {boolean} result.passed    true, jeśli test zakończył się powodzeniem, w przeciwnym razie false
     * @param {object}  result.retries   informacje o ponownych próbach związanych ze specyfikacją, np. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook wykonywany po zakończeniu zestawu testów (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu testów
     */
    afterSuite: function (suite) {
    },
    /**
     * Wykonywany po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych
     * z testu.
     * @param {number} result 0 - test zaliczony, 1 - test niezaliczony
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     * @param {Array.<String>} specs lista ścieżek plików spec, które zostały uruchomione
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wykonywany zaraz po zakończeniu sesji webdriver.
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     * @param {Array.<String>} specs lista ścieżek plików spec, które zostały uruchomione
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywany po zamknięciu wszystkich workerów, gdy proces ma się zakończyć.
     * Błąd zgłoszony w hooku `onComplete` spowoduje niepowodzenie uruchomienia testów.
     * @param {object} exitCode 0 - sukces, 1 - niepowodzenie
     * @param {object} config obiekt konfiguracji wdio
     * @param {Array.<Object>} capabilities lista szczegółów capabilities
     * @param {<Object>} results obiekt zawierający wyniki testów
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wykonywany, gdy nastąpi odświeżenie.
    * @param {string} oldSessionId identyfikator sesji starej sesji
    * @param {string} newSessionId identyfikator sesji nowej sesji
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooki Cucumber
     *
     * Uruchamiany przed funkcjonalnością (Feature) Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcjonalności
     * @param {GherkinDocument.IFeature} feature  obiekt funkcjonalności Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Uruchamiany przed scenariuszem Cucumber.
     * @param {ITestCaseHookParameter} world    obiekt world zawierający informacje o pickle i kroku testu
     * @param {object}                 context  obiekt World Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Uruchamiany przed krokiem Cucumber.
     * @param {Pickle.IPickleStep} step     dane kroku
     * @param {IPickle}            scenario pickle scenariusza
     * @param {object}             context  obiekt World Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Uruchamiany po kroku Cucumber.
     * @param {Pickle.IPickleStep} step             dane kroku
     * @param {IPickle}            scenario         pickle scenariusza
     * @param {object}             result           obiekt wyników zawierający wyniki scenariusza
     * @param {boolean}            result.passed    true, jeśli scenariusz zakończył się powodzeniem
     * @param {string}             result.error     stos błędu, jeśli scenariusz się nie powiódł
     * @param {number}             result.duration  czas trwania scenariusza w milisekundach
     * @param {object}             context          obiekt World Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Uruchamiany po scenariuszu Cucumber.
     * @param {ITestCaseHookParameter} world            obiekt world zawierający informacje o pickle i kroku testu
     * @param {object}                 result           obiekt wyników zawierający wyniki scenariusza `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, jeśli scenariusz zakończył się powodzeniem
     * @param {string}                 result.error     stos błędu, jeśli scenariusz się nie powiódł
     * @param {number}                 result.duration  czas trwania scenariusza w milisekundach
     * @param {object}                 context          obiekt World Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Uruchamiany po funkcjonalności (Feature) Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcjonalności
     * @param {GherkinDocument.IFeature} feature  obiekt funkcjonalności Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Uruchamiany, zanim biblioteka asercji WebdriverIO wykona asercję.
     * @param {object} params                 informacje o asercji
     * @param {string} params.matcherName     nazwa matchera wywołanego przez test (w przypadku aliasu - nazwa aliasu)
     * @param {*}      params.expectedValue   wartość przekazana do matchera
     * @param {object} params.options         opcje asercji
     */
    beforeAssertion: function (params) {
    },
    /**
     * Uruchamiany po wykonaniu asercji przez bibliotekę asercji WebdriverIO.
     * @param {object} params                 informacje o asercji, takie same jak w `beforeAssertion`
     * @param {object} params.result          wynik matchera, zawierający `pass` (boolean) i `message()`.
     *                                        `pass` ma wartość true, gdy wartość pasuje, również w przypadku `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Plik ze wszystkimi możliwymi opcjami i wariantami znajdziesz również w [folderze z przykładami](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).