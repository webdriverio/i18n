---
id: configurationfile
title: Plik konfiguracyjny
---

Plik konfiguracyjny zawiera wszystkie niezbędne informacje do uruchomienia zestawu testów. Jest to moduł NodeJS, który eksportuje obiekt JSON.

Oto przykładowa konfiguracja ze wszystkimi obsługiwanymi właściwościami i dodatkowymi informacjami:

```js
export const config = {

    // ==================================
    // Gdzie powinny być uruchamiane Twoje testy
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Konfiguracje serwera
    // =====================
    // Adres hosta działającego serwera Selenium. Ta informacja jest zazwyczaj zbędna, ponieważ
    // WebdriverIO automatycznie łączy się z localhost. Również jeśli używasz jednej z
    // obsługiwanych usług chmurowych, takich jak Sauce Labs, Browserstack, Testing Bot lub LambdaTest, również nie
    // musisz definiować informacji o hoście i porcie (ponieważ WebdriverIO może to ustalić
    // na podstawie informacji o użytkowniku i kluczu). Jednak jeśli korzystasz z prywatnego backendu
    // Selenium, powinieneś zdefiniować tutaj `hostname`, `port` i `path`.
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
    // WebdriverIO obsługuje Sauce Labs, Browserstack, Testing Bot i LambdaTest. (Inni dostawcy chmurowi
    // również powinni działać.) Te usługi definiują konkretne wartości `user` i `key` (lub klucz dostępu),
    // które musisz tutaj umieścić, aby połączyć się z tymi usługami.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Jeśli uruchamiasz swoje testy w Sauce Labs, możesz określić region, w którym chcesz uruchamiać swoje testy
    // za pomocą właściwości `region`. Dostępne skrócone oznaczenia regionów to `us` (domyślnie) i `eu`.
    // Te regiony są używane dla Sauce Labs VM cloud i Sauce Labs Real Device Cloud.
    // Jeśli nie podasz regionu, domyślnie będzie to `us`.
    region: 'us',
    //
    // Sauce Labs oferuje [testowanie bezgłowicowe](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // które umożliwia uruchamianie testów Chrome i Firefox w trybie headless.
    //
    headless: false,
    //
    // ==================
    // Określenie plików testowych
    // ==================
    // Zdefiniuj, które pliki specyfikacji testów powinny zostać uruchomione. Wzorzec jest względny do katalogu
    // pliku konfiguracyjnego, który jest uruchamiany.
    //
    // Specyfikacje są definiowane jako tablica plików specyfikacji (opcjonalnie z użyciem znaków wieloznacznych,
    // które zostaną rozwinięte). Test dla każdego pliku specyfikacji będzie uruchamiany w oddzielnym
    // procesie roboczym. Aby mieć grupę plików specyfikacji uruchamianych w tym samym procesie
    // roboczym, umieść je w tablicy wewnątrz tablicy specs.
    //
    // Ścieżka plików specyfikacji zostanie rozwiązana względem katalogu
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
    // aby zgrupować konkretne specyfikacje dla konkretnych możliwości.
    //
    // Najpierw możesz zdefiniować, ile instancji powinno być uruchomionych w tym samym czasie. Powiedzmy,
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
    // Lub ustaw limit, aby uruchamiać testy z konkretną możliwością.
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
        // aby uruchomić chrome w trybie headless wymagane są następujące flagi
        // (zobacz https://developers.google.com/web/updates/2017/04/headless-chrome)
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
        // maxInstances może zostać nadpisane dla każdej możliwości. Więc jeśli masz własną sieć Selenium
        // z tylko 5 instancjami Firefoxa, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flaga do aktywowania trybu headless Firefoxa (zobacz https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities, aby uzyskać więcej informacji o moz:firefoxOptions)
          // args: ['-headless']
        },
        // Jeśli podano outputDir, WebdriverIO może przechwytywać logi sesji sterownika
        // możliwe jest skonfigurowanie, które typy logów wykluczyć.
        excludeDriverLogs: ['*'], // przekaż '*', aby wykluczyć wszystkie logi sesji sterownika
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parametr do ignorowania niektórych lub wszystkich domyślnych argumentów Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // ustaw wartość na true, aby ignorować wszystkie domyślne argumenty
    }],
    //
    // Dodatkowa lista argumentów node do użycia przy uruchamianiu procesów potomnych
    execArgv: [],
    //
    // ===================
    // Konfiguracje testów
    // ===================
    // Zdefiniuj wszystkie opcje, które są istotne dla instancji WebdriverIO tutaj
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
    // Jeśli chcesz uruchamiać testy tylko do momentu, gdy określona liczba testów zakończy się niepowodzeniem, użyj
    // bail (domyślnie 0 - nie przerywaj, uruchom wszystkie testy).
    bail: 0,
    //
    // Ustaw bazowy URL, aby skrócić wywołania komendy `url()`. Jeśli Twój parametr `url` zaczyna się
    // od `/`, `baseUrl` jest dołączany, z wyłączeniem części ścieżki `baseUrl`.
    //
    // Jeśli Twój parametr `url` zaczyna się bez schematu lub `/` (jak `some/path`), `baseUrl`
    // jest dołączany bezpośrednio.
    baseUrl: 'http://localhost:8080',
    //
    // Domyślny limit czasu dla wszystkich poleceń waitForXXX.
    waitforTimeout: 1000,
    //
    // Dodaj pliki do obserwacji (np. kod aplikacji lub obiekty stron) podczas uruchamiania polecenia `wdio`
    // z flagą `--watch`. Obsługiwane jest globbing.
    filesToWatch: [
        // np. uruchom testy ponownie, jeśli zmienię kod mojej aplikacji
        // './app/**/*.js'
    ],
    //
    // Framework, z którym chcesz uruchamiać swoje specyfikacje.
    // Obsługiwane są następujące: 'mocha', 'jasmine' i 'cucumber'
    // Zobacz także: https://webdriver.io/docs/frameworks.html
    //
    // Upewnij się, że masz zainstalowany pakiet adaptera wdio dla konkretnego frameworka przed uruchomieniem jakichkolwiek testów.
    framework: 'mocha',
    //
    // Liczba prób ponownego uruchomienia całego pliku specyfikacji, gdy cały plik kończy się niepowodzeniem
    specFileRetries: 1,
    // Opóźnienie w sekundach między próbami ponownego uruchomienia pliku specyfikacji
    specFileRetriesDelay: 0,
    // Czy powtórzone pliki specyfikacji powinny być ponownie uruchamiane natychmiast czy odłożone na koniec kolejki
    specFileRetriesDeferred: false,
    //
    // Reporter testów dla stdout.
    // Jedynym obsługiwanym domyślnie jest 'dot'
    // Zobacz także: https://webdriver.io/docs/dot-reporter.html i kliknij "Reporters" w lewej kolumnie
    reporters: [
        'dot',
        ['allure', {
            //
            // Jeśli używasz reportera "allure", powinieneś zdefiniować katalog, w którym
            // WebdriverIO powinno zapisywać wszystkie raporty allure.
            outputDir: './'
        }]
    ],
    //
    // Opcje, które mają być przekazane do Mocha.
    // Zobacz pełną listę na: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opcje, które mają być przekazane do Jasmine.
    // Zobacz także: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Domyślny limit czasu Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Framework Jasmine pozwala przechwytywać każdą asercję, aby rejestrować stan aplikacji
        // lub strony internetowej w zależności od wyniku. Na przykład, jest dość przydatne robienie zrzutu ekranu za każdym razem,
        // gdy asercja kończy się niepowodzeniem.
        expectationResultHandler: function(passed, assertion) {
            // zrób coś
        },
        //
        // Korzystaj z funkcji grep specyficznej dla Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Jeśli używasz Cucumber, musisz określić, gdzie znajdują się definicje kroków.
    // Zobacz także: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (plik/katalog) wymaga plików przed wykonaniem funkcji
        backtrace: false,   // <boolean> pokaż pełny ślad dla błędów
        compiler: [],       // <string[]> ("rozszerzenie:moduł") wymaga plików z podanym ROZSZERZENIEM po wymaganiu MODUŁU (powtarzalne)
        dryRun: false,      // <boolean> wywołuj formaty bez wykonywania kroków
        failFast: false,    // <boolean> przerwij uruchomienie przy pierwszym niepowodzeniu
        snippets: true,     // <boolean> ukryj fragmenty definicji kroków dla oczekujących kroków
        source: true,       // <boolean> ukryj źródłowe URI
        strict: false,      // <boolean> zakończ niepowodzeniem, jeśli istnieją niezdefiniowane lub oczekujące kroki
        tagExpression: '',  // <string> (wyrażenie) wykonaj tylko funkcje lub scenariusze z tagami pasującymi do wyrażenia
        timeout: 20000,     // <number> limit czasu dla definicji kroków
        ignoreUndefinedDefinitions: false, // <boolean> Włącz tę konfigurację, aby traktować niezdefiniowane definicje jako ostrzeżenia.
        scenarioLevelReporter: false // Włącz to, aby sprawić, by webdriver.io zachowywał się tak, jakby scenariusze, a nie kroki, były testami.
    },
    // Określ niestandardową ścieżkę tsconfig - WDIO używa `tsx` do kompilacji plików TypeScript
    // Twój TSConfig jest automatycznie wykrywany z bieżącego katalogu roboczego
    // ale możesz określić niestandardową ścieżkę tutaj lub ustawiając zmienną środowiskową TSX_TSCONFIG_PATH
    // Zobacz dokumentację `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Uwaga: To ustawienie zostanie nadpisane przez zmienną środowiskową TSX_TSCONFIG_PATH i/lub argument --tsConfigPath cli, jeśli są określone.
    // To ustawienie zostanie zignorowane, jeśli node nie jest w stanie przeanalizować pliku wdio.conf.ts bez pomocy tsx, np. jeśli masz
    // aliasy ścieżek skonfigurowane w tsconfig.json i używasz tych aliasów ścieżek w pliku wdio.config.ts.
    // Używaj tego tylko wtedy, gdy używasz pliku konfiguracyjnego .js lub plik konfiguracyjny .ts jest prawidłowym kodem JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooki
    // =====
    // WebdriverIO udostępnia kilka hooków, których możesz użyć do ingerowania w proces testowy w celu jego ulepszenia
    // i budowania usług wokół niego. Możesz zastosować pojedynczą funkcję lub tablicę
    // metod. Jeśli jedna z nich zwraca obietnicę, WebdriverIO poczeka, aż ta obietnica zostanie
    // rozwiązana, aby kontynuować.
    //
    /**
     * Wykonywane raz przed uruchomieniem wszystkich pracowników.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wykonywane przed uruchomieniem procesu roboczego i może być używane do inicjalizacji określonej usługi
     * dla tego pracownika, a także do modyfikacji środowisk wykonawczych w sposób asynchroniczny.
     * @param  {string} cid      identyfikator możliwości (np. 0-0)
     * @param  {object} caps     obiekt zawierający możliwości dla sesji, która zostanie utworzona w procesie roboczym
     * @param  {object} specs    specyfikacje do uruchomienia w procesie roboczym
     * @param  {object} args     obiekt, który zostanie połączony z główną konfiguracją po zainicjowaniu pracownika
     * @param  {object} execArgv lista argumentów ciągów przekazywanych do procesu roboczego
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wykonywane po zakończeniu procesu roboczego.
     * @param  {string} cid      identyfikator możliwości (np. 0-0)
     * @param  {number} exitCode 0 - sukces, 1 - niepowodzenie
     * @param  {object} specs    specyfikacje do uruchomienia w procesie roboczym
     * @param  {number} retries  liczba użytych ponownych prób
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wykonywane przed inicjalizacją sesji webdriver i frameworka testowego. Pozwala to na
     * manipulowanie konfiguracjami w zależności od możliwości lub specyfikacji.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które mają być uruchomione
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywane przed rozpoczęciem wykonania testu. W tym momencie masz dostęp do wszystkich zmiennych globalnych
     * takich jak `browser`. Jest to idealne miejsce do definiowania niestandardowych poleceń.
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs        Lista ścieżek plików specyfikacji, które mają być uruchomione
     * @param {object}         browser      instancja utworzonej sesji przeglądarki/urządzenia
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wykonywane przed rozpoczęciem pakietu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły pakietu
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ten hook jest wykonywany _przed_ każdym hookiem w pakiecie.
     * (Na przykład, działa to przed wywołaniem `before`, `beforeEach`, `after`, `afterEach` w Mocha.) W Cucumber `context` to obiekt World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, który jest wykonywany _po_ każdym hooku w pakiecie.
     * (Na przykład, działa to po wywołaniu `before`, `beforeEach`, `after`, `afterEach` w Mocha.) W Cucumber `context` to obiekt World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funkcja do wykonania przed testem (tylko w Mocha/Jasmine)
     * @param {object} test    obiekt testowy
     * @param {object} context obiekt zakresu, w którym test został wykonany
     */
    beforeTest: function (test, context) {
    },
    /**
     * Uruchamiane przed wykonaniem polecenia WebdriverIO.
     * @param {string} commandName nazwa polecenia hook
     * @param {Array} args argumenty, które polecenie by otrzymało
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Uruchamiane po wykonaniu polecenia WebdriverIO
     * @param {string} commandName nazwa polecenia hook
     * @param {Array} args argumenty, które polecenie by otrzymało
     * @param {*} result wynik polecenia
     * @param {Error} error obiekt błędu, jeśli występuje
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funkcja do wykonania po teście (tylko w Mocha/Jasmine)
     * @param {object}  test             obiekt testowy
     * @param {object}  context          obiekt zakresu, w którym test został wykonany
     * @param {Error}   result.error     obiekt błędu w przypadku niepowodzenia testu, w przeciwnym razie `undefined`
     * @param {*}       result.result    obiekt zwracany funkcji testowej
     * @param {number}  result.duration  czas trwania testu
     * @param {boolean} result.passed    true, jeśli test przeszedł, w przeciwnym razie false
     * @param {object}  result.retries   informacje o ponownych próbach związanych ze specyfikacją, np. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook, który jest wykonywany po zakończeniu pakietu (tylko w Mocha/Jasmine).
     * @param {object} suite szczegóły pakietu
     */
    afterSuite: function (suite) {
    },
    /**
     * Wykonywane po zakończeniu wszystkich testów. Nadal masz dostęp do wszystkich zmiennych globalnych
     * z testu.
     * @param {number} result 0 - test przeszedł, 1 - test nie powiódł się
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wykonywane zaraz po zakończeniu sesji webdriver.
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {Array.<String>} specs Lista ścieżek plików specyfikacji, które zostały uruchomione
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wykonywane po zatrzymaniu wszystkich pracowników i tuż przed zakończeniem procesu.
     * Błąd zgłoszony w hooku `onComplete` spowoduje niepowodzenie uruchomienia testu.
     * @param {object} exitCode 0 - sukces, 1 - niepowodzenie
     * @param {object} config obiekt konfiguracyjny wdio
     * @param {Array.<Object>} capabilities lista szczegółów możliwości
     * @param {<Object>} results obiekt zawierający wyniki testów
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wykonywane, gdy następuje odświeżenie.
    * @param {string} oldSessionId identyfikator sesji starej sesji
    * @param {string} newSessionId identyfikator sesji nowej sesji
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
     * @param {object}                 context  obiekt Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Uruchamiane przed krokiem Cucumber.
     * @param {Pickle.IPickleStep} step     dane kroku
     * @param {IPickle}            scenario pickle scenariusza
     * @param {object}             context  obiekt Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Uruchamiane po kroku Cucumber.
     * @param {Pickle.IPickleStep} step             dane kroku
     * @param {IPickle}            scenario         pickle scenariusza
     * @param {object}             result           obiekt wyników zawierający wyniki scenariusza
     * @param {boolean}            result.passed    true jeśli scenariusz przeszedł
     * @param {string}             result.error     stos błędu, jeśli scenariusz nie powiódł się
     * @param {number}             result.duration  czas trwania scenariusza w milisekundach
     * @param {object}             context          obiekt Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Uruchamiane po scenariuszu Cucumber.
     * @param {ITestCaseHookParameter} world            obiekt świata zawierający informacje o pickle i kroku testowym
     * @param {object}                 result           obiekt wyników zawierający wyniki scenariusza `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true jeśli scenariusz przeszedł
     * @param {string}                 result.error     stos błędu, jeśli scenariusz nie powiódł się
     * @param {number}                 result.duration  czas trwania scenariusza w milisekundach
     * @param {object}                 context          obiekt Cucumber World
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
     * Uruchamiane przed dokonaniem asercji przez bibliotekę asercji WebdriverIO.
     * @param commandName nazwa polecenia
     * @param args        argumenty, które polecenie by otrzymało
     */
    beforeAssertion: function (params) {
    },
    /**
     * Uruchamiane po wykonaniu polecenia WebdriverIO
     * @param commandName  nazwa polecenia
     * @param args         argumenty, które polecenie by otrzymało
     * @param result       wynik polecenia
     * @param error        błąd w przypadku, gdy coś poszło nie tak
     */
    afterAssertion: function (params) {
    }
}
```

Możesz również znaleźć plik ze wszystkimi możliwymi opcjami i wariantami w [folderze przykładów](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).