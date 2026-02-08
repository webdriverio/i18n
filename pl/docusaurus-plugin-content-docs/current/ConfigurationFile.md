---
id: configurationfile
title: Plik Konfiguracyjny
---

Plik konfiguracyjny zawiera wszystkie niezbędne informacje do uruchomienia zestawu testów. Jest to moduł NodeJS, który eksportuje JSON.

Oto przykładowa konfiguracja ze wszystkimi obsługiwanymi właściwościami i dodatkowymi informacjami:

```js
export const config = {

    // ==================================
    // Gdzie powinny być uruchomione Twoje testy
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Konfiguracje serwera
    // =====================
    // Adres hosta uruchomionego serwera Selenium. Ta informacja jest zazwyczaj zbędna,
    // ponieważ WebdriverIO automatycznie łączy się z localhost. Również jeśli używasz jednej
    // z obsługiwanych usług w chmurze, takich jak Sauce Labs, Browserstack, Testing Bot lub TestMu AI (dawniej LambdaTest), 
    // również nie musisz definiować informacji o hoście i porcie (ponieważ WebdriverIO może to ustalić
    // na podstawie informacji o użytkowniku i kluczu). Jednakże, jeśli używasz prywatnego backendu Selenium,
    // powinieneś zdefiniować tutaj `hostname`, `port` i `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Dostawcy usług
    // =================
    // WebdriverIO wspiera Sauce Labs, Browserstack, Testing Bot i TestMu AI (dawniej LambdaTest). (Inni dostawcy chmury
    // również powinni działać). Te usługi definiują konkretne wartości `user` i `key` (lub klucz dostępu),
    // które musisz tutaj umieścić, aby połączyć się z tymi usługami.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Jeśli uruchamiasz testy w Sauce Labs, możesz określić region, w którym chcesz uruchamiać testy
    // za pomocą właściwości `region`. Dostępne skróty dla regionów to `us` (domyślnie) i `eu`.
    // Te regiony są używane dla chmury VM Sauce Labs i Real Device Cloud Sauce Labs.
    // Jeśli nie podasz regionu, domyślnie jest to `us`.
    region: 'us',
    //
    // Sauce Labs oferuje [rozwiązanie bezgłowe](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // które pozwala uruchamiać testy Chrome i Firefox w trybie bezgłowym.
    //
    headless: false,
    //
    // ==================
    // Określ pliki testowe
    // ==================
    // Zdefiniuj, które specyfikacje testów powinny być uruchomione. Wzorzec jest względny w stosunku do katalogu
    // pliku konfiguracyjnego, który jest uruchamiany.
    //
    // Specyfikacje są definiowane jako tablica plików specyfikacji (opcjonalnie z użyciem wieloznaczników,
    // które zostaną rozszerzone). Test dla każdego pliku specyfikacji będzie uruchomiony w oddzielnym
    // procesie roboczym. Aby grupa plików specyfikacji była uruchamiana w tym samym procesie roboczym,
    // umieść je w tablicy wewnątrz tablicy specs.
    //
    // Ścieżka plików specyfikacji będzie rozwiązywana względem katalogu
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
    // Możliwości
    // ============
    // Zdefiniuj swoje możliwości tutaj. WebdriverIO może uruchamiać wiele możliwości jednocześnie.
    // W zależności od liczby możliwości, WebdriverIO uruchamia kilka sesji testowych.
    // W ramach swoich `capabilities` możesz nadpisać opcje `spec` i `exclude`,
    // aby grupować konkretne specyfikacje do określonej możliwości.
    //
    // Najpierw możesz zdefiniować, ile instancji powinno być uruchomionych jednocześnie. Powiedzmy,
    // że masz 3 różne możliwości (Chrome, Firefox i Safari) i masz
    // ustawione `maxInstances` na 1. wdio uruchomi 3 procesy.
    //
    // Dlatego, jeśli masz 10 plików specyfikacji i ustawiłeś `maxInstances` na 10, wszystkie pliki specyfikacji
    // będą testowane jednocześnie i zostanie utworzonych 30 procesów.
    //
    // Właściwość określa, ile możliwości z tego samego testu powinno uruchamiać testy.
    //
    maxInstances: 10,
    //
    // Lub ustaw limit uruchamiania testów z określoną możliwością.
    maxInstancesPerCapability: 10,
    //
    // Wstawia globalne zmienne WebdriverIO (np. `browser`, `$` i `$$`) do globalnego środowiska.
    // Jeśli ustawisz na `false`, powinieneś importować z `@wdio/globals`. Uwaga: WebdriverIO nie
    // obsługuje wstawiania globalnych zmiennych specyficznych dla framework testowego.
    //
    injectGlobals: true,
    //
    // Jeśli masz problemy ze zgromadzeniem wszystkich ważnych możliwości, sprawdź
    // konfigurator platformy Sauce Labs - świetne narzędzie do konfigurowania twoich możliwości:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // do uruchomienia chrome w trybie headless wymagane są następujące flagi
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
        // maxInstances może zostać nadpisane dla poszczególnych możliwości. Więc jeśli masz wewnętrzną sieć Selenium
        // grid z tylko 5 dostępnymi instancjami Firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flaga do aktywacji trybu bezgłowego Firefox (zobacz https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities, aby uzyskać więcej informacji o moz:firefoxOptions)
          // args: ['-headless']
        },
        // Jeśli podano outputDir, WebdriverIO może przechwytywać logi sesji sterownika
        // możliwe jest skonfigurowanie, które typy logów wykluczyć.
        excludeDriverLogs: ['*'], // przekaż '*', aby wykluczyć wszystkie logi sesji sterownika
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych argumentów Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // ustaw wartość na true, aby zignorować wszystkie domyślne argumenty
    }],
    //
    // Dodatkowa lista argumentów node do użycia przy uruchamianiu procesów potomnych
    execArgv: [],
    //
    // ===================
    // Konfiguracje testów
    // ===================
    // Zdefiniuj wszystkie opcje, które są istotne dla instancji WebdriverIO
    //
    // Poziom szczegółowości logowania: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Ustaw określone poziomy logów dla każdego loggera
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
    // Ustaw bazowy URL, aby skrócić wywołania komendy `url()`. Jeśli twój parametr `url` zaczyna się
    // od `/`, `baseUrl` jest dodawany na początku, nie uwzględniając części ścieżki `baseUrl`.
    //
    // Jeśli twój parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), `baseUrl`
    // jest dodawany bezpośrednio na początku.
    baseUrl: 'http://localhost:8080',
    //
    // Domyślny limit czasu dla wszystkich poleceń waitForXXX.
    waitforTimeout: 1000,
    //
    // Dodaj pliki do obserwowania (np. kod aplikacji lub obiekty stronowe) podczas uruchamiania komendy `wdio`
    // z flagą `--watch`. Obsługa globbing jest wspierana.
    filesToWatch: [
        // np. uruchom ponownie testy, jeśli zmienię kod aplikacji
        // './app/**/*.js'
    ],
    //
    // Framework, z którym chcesz uruchamiać swoje specyfikacje.
    // Następujące są obsługiwane: 'mocha', 'jasmine' i 'cucumber'
    // Zobacz również: https://webdriver.io/docs/frameworks.html
    //
    // Upewnij się, że masz zainstalowany pakiet adaptera wdio dla konkretnego frameworka przed uruchomieniem jakichkolwiek testów.
    framework: 'mocha',
    //
    // Liczba powtórzeń całego pliku specyfikacji, gdy nie powiedzie się jako całość
    specFileRetries: 1,
    // Opóźnienie w sekundach między próbami pliku specyfikacji
    specFileRetriesDelay: 0,
    // Czy powtórzone pliki specyfikacji powinny być powtórzone natychmiast, czy odłożone na koniec kolejki
    specFileRetriesDeferred: false,
    //
    // Reporter testów dla stdout.
    // Jedynym obsługiwanym domyślnie jest 'dot'
    // Zobacz również: https://webdriver.io/docs/dot-reporter.html i kliknij "Reporters" w lewej kolumnie
    reporters: [
        'dot',
        ['allure', {
            //
            // Jeśli używasz reportera "allure", powinieneś zdefiniować katalog, gdzie
            // WebdriverIO powinno zapisać wszystkie raporty allure.
            outputDir: './'
        }]
    ],
    //
    // Opcje przekazywane do Mocha.
    // Zobacz pełną listę na: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opcje przekazywane do Jasmine.
    // Zobacz również: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Domyślny timeout Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Framework Jasmine pozwala przechwytywać każde zapewnienie w celu logowania stanu aplikacji
        // lub strony internetowej w zależności od wyniku. Na przykład, bardzo wygodne jest robienie zrzutu ekranu za każdym razem,
        // gdy zapewnienie nie powiedzie się.
        expectationResultHandler: function(passed, assertion) {
            // zrób coś
        },
        //
        // Korzystaj z funkcji grep specyficznej dla Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Jeśli używasz Cucumber, musisz określić, gdzie znajdują się definicje twoich kroków.
    // Zobacz również: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (plik/katalog) wymagaj plików przed wykonaniem funkcji
        backtrace: false,   // <boolean> pokaż pełny ślad dla błędów
        compiler: [],       // <string[]> ("extension:module") wymagaj plików z danym ROZSZERZENIEM po wymaganiu MODUŁU (powtarzalne)
        dryRun: false,      // <boolean> wywołaj formatery bez wykonywania kroków
        failFast: false,    // <boolean> przerwij działanie przy pierwszym niepowodzeniu
        snippets: true,     // <boolean> ukryj fragmenty definicji kroków dla oczekujących kroków
        source: true,       // <boolean> ukryj identyfikatory URI źródeł
        strict: false,      // <boolean> nie powiedzie się, jeśli istnieją jakiekolwiek niezdefiniowane lub oczekujące kroki
        tagExpression: '',  // <string> (wyrażenie) wykonaj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia
        timeout: 20000,     // <number> timeout dla definicji kroków
        ignoreUndefinedDefinitions: false, // <boolean> Włącz tę konfigurację, aby traktować niezdefiniowane definicje jako ostrzeżenia.
        scenarioLevelReporter: false // Włącz to, aby sprawić, że webdriver.io zachowywał się tak, jakby scenariusze, a nie kroki były testami.
    },
    // Określ niestandardową ścieżkę tsconfig - WDIO używa `tsx` do kompilacji plików TypeScript
    // Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego
    // ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH
    // Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Uwaga: To ustawienie zostanie zastąpione przez zmienną środowiskową TSX_TSCONFIG_PATH i/lub argument cli --tsConfigPath, jeśli zostaną określone.
    // To ustawienie zostanie zignorowane, jeśli node nie jest w stanie przeanalizować pliku wdio.conf.ts bez pomocy tsx, np. jeśli masz ustawione 
    // aliasy ścieżek w tsconfig.json i używasz tych aliasów ścieżek w pliku wdio.config.ts.
    // Używaj tego tylko, jeśli używasz pliku konfiguracyjnego .js lub twój plik konfiguracyjny .ts jest poprawnym kodem JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO udostępnia kilka hooków, których możesz użyć do ingerencji w proces testowy w celu jego rozszerzenia
    // i budowania wokół niego usług. Możesz zastosować pojedynczą funkcję lub tablicę
    // metod. Jeśli jedna z nich zwróci obietnicę, WebdriverIO poczeka, aż ta obietnica zostanie
    // rozwiązana, aby kontynuować.
    //
    /**
     * Wykonuje się raz przed uruchomieniem wszystkich workerów.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wykonuje się przed utworzeniem procesu workera i może być używany do inicjalizacji określonej usługi
     * dla tego workera, a także do modyfikowania środowisk wykonawczych w sposób asynchroniczny.
     * @param  {string} cid      identyfikator możliwości (np. 0-0)
     * @param  {object} caps     obiekt zawierający możliwości dla sesji, która zostanie utworzona w workerze
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {object} args     obiekt, który zostanie połączony z główną konfiguracją po inicjalizacji workera
     * @param  {object} execArgv lista argumentów ciągowych przekazanych do procesu workera
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wykonuje się po zakończeniu procesu workera.
     * @param  {string} cid      identyfikator możliwości (np. 0-0)
     * @param  {number} exitCode 0 - sukces, 1 - niepowodzenie
     * @param  {object} specs    specyfikacje do uruchomienia w procesie workera
     * @param  {number} retries  liczba użytych powtórzeń
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wykonuje się przed inicjalizacją sesji webdrivera i frameworka testowego. Pozwala
     * manipulować konfiguracjami w zależności od możliwości lub specyfikacji.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które mają zostać uruchomione
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonuje się przed rozpoczęciem wykonania testu. W tym momencie masz dostęp do wszystkich globalnych
     * zmiennych jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs        Lista ścieżek plików specyfikacji, które mają zostać uruchomione
     * @param {object}         browser      instancja utworzonej sesji przeglądarki/urządzenia
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wykonuje się przed rozpoczęciem zestawu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ten hook wykonuje się _przed_ każdym hookiem w zestawie.
     * (Na przykład, działa przed wywołaniem `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, który wykonuje się _po_ każdym hooku w zestawie.
     * (Na przykład, działa po wywołaniu `before`, `beforeEach`, `after`, `afterEach` w Mocha.). W Cucumber `context` to obiekt World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funkcja, która zostanie wykonana przed testem (tylko w Mocha/Jasmine)
     * @param {object} test    obiekt testowy
     * @param {object} context obiekt zakresu, z którym test został wykonany
     */
    beforeTest: function (test, context) {
    },
    /**
     * Uruchamia się przed wykonaniem polecenia WebdriverIO.
     * @param {string} commandName nazwa polecenia hook
     * @param {Array} args argumenty, które polecenie otrzymałoby
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Uruchamia się po wykonaniu polecenia WebdriverIO
     * @param {string} commandName nazwa polecenia hook
     * @param {Array} args argumenty, które polecenie otrzymałoby
     * @param {*} result wynik polecenia
     * @param {Error} error obiekt błędu, jeśli istnieje
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funkcja, która zostanie wykonana po teście (tylko w Mocha/Jasmine)
     * @param {object}  test             obiekt testowy
     * @param {object}  context          obiekt zakresu, z którym test został wykonany
     * @param {Error}   result.error     obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
     * @param {*}       result.result    obiekt zwracany funkcji testowej
     * @param {number}  result.duration  czas trwania testu
     * @param {boolean} result.passed    true, jeśli test został zaliczony, w przeciwnym razie false
     * @param {object}  result.retries   informacje o powtórzeniach związanych ze specyfikacją, np. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook, który wykonuje się po zakończeniu zestawu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły zestawu
     */
    afterSuite: function (suite) {
    },
    /**
     * Wykonuje się po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych z
     * testu.
     * @param {number} result 0 - test zdany, 1 - test nie powiódł się
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wykonuje się bezpośrednio po zakończeniu sesji webdrivera.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonuje się po zakończeniu pracy wszystkich workerów i przed zakończeniem procesu.
     * Błąd rzucony w hooku `onComplete` spowoduje niepowodzenie uruchomienia testu.
     * @param {object} exitCode 0 - sukces, 1 - niepowodzenie
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {<Object>} results obiekt zawierający wyniki testów
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wykonuje się, gdy następuje odświeżenie.
    * @param {string} oldSessionId ID sesji starej sesji
    * @param {string} newSessionId ID sesji nowej sesji
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooki Cucumber
     *
     * Uruchamia się przed funkcją Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcji
     * @param {GherkinDocument.IFeature} feature  obiekt funkcji Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Uruchamia się przed scenariuszem Cucumber.
     * @param {ITestCaseHookParameter} world    obiekt świata zawierający informacje o pickle i kroku testowym
     * @param {object}                 context  obiekt świata Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Uruchamia się przed krokiem Cucumber.
     * @param {Pickle.IPickleStep} step     dane kroku
     * @param {IPickle}            scenario pickle scenariusza
     * @param {object}             context  obiekt świata Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Uruchamia się po kroku Cucumber.
     * @param {Pickle.IPickleStep} step             dane kroku
     * @param {IPickle}            scenario         pickle scenariusza
     * @param {object}             result           obiekt wyników zawierający wyniki scenariusza
     * @param {boolean}            result.passed    true, jeśli scenariusz został zaliczony
     * @param {string}             result.error     stos błędów, jeśli scenariusz nie powiódł się
     * @param {number}             result.duration  czas trwania scenariusza w milisekundach
     * @param {object}             context          obiekt świata Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Uruchamia się po scenariuszu Cucumber.
     * @param {ITestCaseHookParameter} world            obiekt świata zawierający informacje o pickle i kroku testowym
     * @param {object}                 result           obiekt wyników zawierający wyniki scenariusza `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, jeśli scenariusz został zaliczony
     * @param {string}                 result.error     stos błędów, jeśli scenariusz nie powiódł się
     * @param {number}                 result.duration  czas trwania scenariusza w milisekundach
     * @param {object}                 context          obiekt świata Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Uruchamia się po funkcji Cucumber.
     * @param {string}                   uri      ścieżka do pliku funkcji
     * @param {GherkinDocument.IFeature} feature  obiekt funkcji Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Uruchamia się przed wykonaniem asercji przez bibliotekę asercji WebdriverIO.
     * @param commandName nazwa polecenia
     * @param args argumenty, które polecenie otrzymałoby
     */
    beforeAssertion: function (params) {
    },
    /**
     * Uruchamia się po wykonaniu polecenia WebdriverIO
     * @param commandName  nazwa polecenia
     * @param args         argumenty, które polecenie otrzymałoby
     * @param result       wynik polecenia
     * @param error        błąd w przypadku, gdy coś poszło nie tak
     */
    afterAssertion: function (params) {
    }
}
```

Możesz również znaleźć plik ze wszystkimi możliwymi opcjami i wariantami w [folderze przykładów](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).