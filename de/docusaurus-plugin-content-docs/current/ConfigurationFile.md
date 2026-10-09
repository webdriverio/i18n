---
id: configurationfile
title: Konfigurationsdatei
description: "Durchsuchen Sie eine kommentierte Beispiel-wdio.conf.js, die jede unterstützte Testrunner-Option, Capability und jeden Hook mit Erläuterungen auflistet."
---

Die Konfigurationsdatei enthält alle notwendigen Informationen, um Ihre Testsuite auszuführen. Es handelt sich um ein NodeJS-Modul, das ein JSON exportiert.

Hier ist eine Beispielkonfiguration mit allen unterstützten Eigenschaften und zusätzlichen Informationen:

```js
export const config = {

    // ==================================
    // Wo soll Ihr Test gestartet werden
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Server-Konfigurationen
    // =====================
    // Host-Adresse des laufenden Selenium-Servers. Diese Information ist normalerweise überflüssig, da
    // WebdriverIO sich automatisch mit localhost verbindet. Auch wenn Sie einen der
    // unterstützten Cloud-Dienste wie Sauce Labs, Browserstack, Testing Bot oder TestMu AI (ehemals LambdaTest) verwenden, müssen Sie
    // keine Host- und Port-Informationen angeben (da WebdriverIO diese anhand
    // Ihrer Benutzer- und Schlüsselinformationen ermitteln kann). Wenn Sie jedoch ein privates Selenium-
    // Backend verwenden, sollten Sie hier `hostname`, `port` und `path` definieren.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protokoll: http | https
    // protocol: 'http',
    //
    // =================
    // Dienstanbieter
    // =================
    // WebdriverIO unterstützt Sauce Labs, Browserstack, Testing Bot und TestMu AI (ehemals LambdaTest). (Andere Cloud-Anbieter
    // sollten ebenfalls funktionieren.) Diese Dienste definieren spezifische `user`- und `key`- (oder Access-Key-)
    // Werte, die Sie hier eintragen müssen, um sich mit diesen Diensten zu verbinden.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Wenn Sie Ihre Tests auf Sauce Labs ausführen, können Sie über die Eigenschaft `region` die Region angeben,
    // in der Ihre Tests laufen sollen. Verfügbare Kurzbezeichnungen für Regionen sind `us` (Standard) und `eu`.
    // Diese Regionen werden für die Sauce Labs VM Cloud und die Sauce Labs Real Device Cloud verwendet.
    // Wenn Sie keine Region angeben, wird standardmäßig `us` verwendet.
    region: 'us',
    //
    // Sauce Labs bietet ein [Headless-Angebot](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // mit dem Sie Chrome- und Firefox-Tests headless ausführen können.
    //
    headless: false,
    //
    // ==================
    // Testdateien angeben
    // ==================
    // Legen Sie fest, welche Test-Specs ausgeführt werden sollen. Das Muster ist relativ zum Verzeichnis
    // der ausgeführten Konfigurationsdatei.
    //
    // Die Specs werden als Array von Spec-Dateien definiert (optional mit Wildcards,
    // die expandiert werden). Der Test jeder Spec-Datei wird in einem separaten
    // Worker-Prozess ausgeführt. Um eine Gruppe von Spec-Dateien im selben Worker-
    // Prozess auszuführen, fassen Sie sie in einem Array innerhalb des Specs-Arrays zusammen.
    //
    // Der Pfad der Spec-Dateien wird relativ zum Verzeichnis
    // der Konfigurationsdatei aufgelöst, sofern er nicht absolut ist.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Auszuschließende Muster.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Definieren Sie hier Ihre Capabilities. WebdriverIO kann mehrere Capabilities gleichzeitig
    // ausführen. Abhängig von der Anzahl der Capabilities startet WebdriverIO mehrere Test-
    // Sessions. Innerhalb Ihrer `capabilities` können Sie mit `wdio:specs` und `wdio:exclude`
    // überschreiben, welche Dateien ausgeführt werden, um bestimmte Specs einer bestimmten Capability zuzuordnen.
    //
    // Zunächst können Sie festlegen, wie viele Instanzen gleichzeitig gestartet werden sollen. Angenommen,
    // Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und haben
    // `maxInstances` auf 1 gesetzt. wdio startet dann 3 Prozesse.
    //
    // Wenn Sie also 10 Spec-Dateien haben und `maxInstances` auf 10 setzen, werden alle Spec-Dateien
    // gleichzeitig getestet und 30 Prozesse gestartet.
    //
    // Die Eigenschaft regelt, wie viele Capabilities desselben Tests Tests ausführen sollen.
    //
    maxInstances: 10,
    //
    // Oder legen Sie ein Limit für die Ausführung von Tests mit einer bestimmten Capability fest.
    maxInstancesPerCapability: 10,
    //
    // Fügt die Globals von WebdriverIO (z. B. `browser`, `$` und `$$`) in die globale Umgebung ein.
    // Wenn Sie dies auf `false` setzen, sollten Sie aus `@wdio/globals` importieren. Hinweis: WebdriverIO
    // übernimmt nicht das Einfügen von Testframework-spezifischen Globals.
    //
    injectGlobals: true,
    //
    // Wenn Sie Schwierigkeiten haben, alle wichtigen Capabilities zusammenzustellen, sehen Sie sich den
    // Sauce Labs Platform Configurator an – ein großartiges Tool zur Konfiguration Ihrer Capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // um Chrome headless auszuführen, sind die folgenden Flags erforderlich
        // (siehe https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parameter, um einige oder alle Standard-Flags zu ignorieren
        // - wenn der Wert true ist: alle DevTools-'Standard-Flags' und Puppeteer-'Standard-Argumente' ignorieren
        // - wenn der Wert ein Array ist: DevTools filtert die angegebenen Standard-Argumente
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances kann pro Capability überschrieben werden. Wenn Sie also ein internes Selenium-
        // Grid mit nur 5 verfügbaren Firefox-Instanzen haben, können Sie sicherstellen, dass nicht mehr als
        // 5 Instanzen gleichzeitig gestartet werden.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Flag zum Aktivieren des Firefox-Headless-Modus (siehe https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities für weitere Details zu moz:firefoxOptions)
          // args: ['-headless']
        },
        // Wenn outputDir angegeben ist, kann WebdriverIO die Driver-Session-Logs erfassen.
        // Es ist möglich zu konfigurieren, welche logTypes ausgeschlossen werden sollen.
        // excludeDriverLogs: ['*'], // '*' übergeben, um alle Driver-Session-Logs auszuschließen
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parameter, um einige oder alle Puppeteer-Standard-Argumente zu ignorieren
        // ignoreDefaultArgs: ['-foreground'], // Wert auf true setzen, um alle Standard-Argumente zu ignorieren
    }],
    //
    // Zusätzliche Liste von Node-Argumenten, die beim Starten von Kindprozessen verwendet werden
    execArgv: [],
    //
    // ===================
    // Testkonfigurationen
    // ===================
    // Definieren Sie hier alle Optionen, die für die WebdriverIO-Instanz relevant sind
    //
    // Ausführlichkeit des Loggings: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Spezifische Log-Level pro Logger festlegen
    // verwenden Sie das Level 'silent', um den Logger zu deaktivieren
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Verzeichnis festlegen, in dem alle Logs gespeichert werden
    outputDir: __dirname,
    //
    // Wenn Sie Ihre Tests nur so lange ausführen möchten, bis eine bestimmte Anzahl von Tests fehlgeschlagen ist, verwenden Sie
    // bail (Standard ist 0 – nicht abbrechen, alle Tests ausführen).
    bail: 0,
    //
    // Legen Sie eine Basis-URL fest, um Aufrufe des `url()`-Befehls zu verkürzen. Wenn Ihr `url`-Parameter
    // mit `/` beginnt, wird die `baseUrl` vorangestellt, ohne den Pfadanteil der `baseUrl`.
    //
    // Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die `baseUrl`
    // direkt vorangestellt.
    baseUrl: 'http://localhost:8080',
    //
    // Standard-Timeout für alle waitForXXX-Befehle.
    waitforTimeout: 1000,
    //
    // Dateien hinzufügen, die beobachtet werden sollen (z. B. Anwendungscode oder Page Objects), wenn der `wdio`-Befehl
    // mit dem Flag `--watch` ausgeführt wird. Globbing wird unterstützt.
    filesToWatch: [
        // z. B. Tests erneut ausführen, wenn ich meinen Anwendungscode ändere
        // './app/**/*.js'
    ],
    //
    // Framework, mit dem Sie Ihre Specs ausführen möchten.
    // Folgende werden unterstützt: 'mocha', 'jasmine' und 'cucumber'
    // Siehe auch: https://webdriver.io/docs/frameworks.html
    //
    // Stellen Sie sicher, dass das wdio-Adapterpaket für das jeweilige Framework installiert ist, bevor Sie Tests ausführen.
    framework: 'mocha',
    //
    // Anzahl der Wiederholungen der gesamten Spec-Datei, wenn sie als Ganzes fehlschlägt
    specFileRetries: 1,
    // Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spec-Datei
    specFileRetriesDelay: 0,
    // Ob wiederholte Spec-Dateien sofort wiederholt oder an das Ende der Warteschlange verschoben werden sollen
    specFileRetriesDeferred: false,
    //
    // Test-Reporter für stdout.
    // Der einzige standardmäßig unterstützte ist 'dot'
    // Siehe auch: https://webdriver.io/docs/dot-reporter.html , und klicken Sie in der linken Spalte auf "Reporters"
    reporters: [
        'dot',
        ['allure', {
            //
            // Wenn Sie den "allure"-Reporter verwenden, sollten Sie das Verzeichnis festlegen, in dem
            // WebdriverIO alle Allure-Reports speichern soll.
            outputDir: './'
        }]
    ],
    //
    // Optionen, die an Mocha übergeben werden.
    // Die vollständige Liste finden Sie unter: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Optionen, die an Jasmine übergeben werden.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine-Standard-Timeout
        defaultTimeoutInterval: 5000,
        //
        // Das Jasmine-Framework ermöglicht es, jede Assertion abzufangen, um je nach Ergebnis den Zustand der Anwendung
        // oder Website zu protokollieren. Zum Beispiel ist es sehr praktisch, jedes Mal einen Screenshot zu machen,
        // wenn eine Assertion fehlschlägt.
        expectationResultHandler: function(passed, assertion) {
            // etwas tun
        },
        //
        // Jasmine-spezifische grep-Funktionalität nutzen
        grep: null,
        invertGrep: null
    },
    //
    // Wenn Sie Cucumber verwenden, müssen Sie angeben, wo sich Ihre Step-Definitionen befinden.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (Datei/Verzeichnis) Dateien vor dem Ausführen der Features laden
        backtrace: false,   // <boolean> vollständigen Backtrace für Fehler anzeigen
        compiler: [],       // <string[]> ("extension:module") Dateien mit der angegebenen EXTENSION nach dem Laden von MODULE laden (wiederholbar)
        dryRun: false,      // <boolean> Formatter aufrufen, ohne Steps auszuführen
        failFast: false,    // <boolean> den Lauf beim ersten Fehler abbrechen
        snippets: true,     // <boolean> Step-Definition-Snippets für ausstehende Steps ausblenden
        source: true,       // <boolean> Quell-URIs ausblenden
        strict: false,      // <boolean> fehlschlagen, wenn undefinierte oder ausstehende Steps vorhanden sind
        tags: '',           // <string> (Ausdruck) nur Features oder Szenarien ausführen, deren Tags dem Ausdruck entsprechen
        timeout: 20000,     // <number> Timeout für Step-Definitionen
        ignoreUndefinedDefinitions: false, // <boolean> Aktivieren Sie diese Konfiguration, um undefinierte Definitionen als Warnungen zu behandeln.
        scenarioLevelReporter: false // Aktivieren Sie dies, damit sich webdriver.io so verhält, als wären Szenarien und nicht Steps die Tests.
    },
    // Einen benutzerdefinierten tsconfig-Pfad angeben – WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren
    // Ihre TSConfig wird automatisch im aktuellen Arbeitsverzeichnis erkannt,
    // Sie können aber hier oder über die Umgebungsvariable TSX_TSCONFIG_PATH einen benutzerdefinierten Pfad angeben
    // Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Hinweis: Diese Einstellung wird von der Umgebungsvariable TSX_TSCONFIG_PATH und/oder dem CLI-Argument --tsConfigPath überschrieben, falls diese angegeben sind.
    // Diese Einstellung wird ignoriert, wenn Node Ihre wdio.conf.ts-Datei nicht ohne Hilfe von tsx parsen kann, z. B. wenn Sie
    // Pfad-Aliase in der tsconfig.json eingerichtet haben und diese Pfad-Aliase in Ihrer wdio.config.ts-Datei verwenden.
    // Verwenden Sie dies nur, wenn Sie eine .js-Konfigurationsdatei verwenden oder Ihre .ts-Konfigurationsdatei gültiges JavaScript ist.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO bietet mehrere Hooks, mit denen Sie in den Testprozess eingreifen können, um ihn zu erweitern
    // und Services darum herum aufzubauen. Sie können entweder eine einzelne Funktion oder ein Array von
    // Methoden angeben. Wenn eine davon ein Promise zurückgibt, wartet WebdriverIO, bis dieses Promise
    // aufgelöst ist, bevor es fortfährt.
    //
    /**
     * Wird einmal ausgeführt, bevor alle Worker gestartet werden.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um einen bestimmten Service
     * für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu verändern.
     * @param  {string} cid      Capability-ID (z. B. 0-0)
     * @param  {object} caps     Objekt mit den Capabilities für die Session, die im Worker gestartet wird
     * @param  {object} specs    Specs, die im Worker-Prozess ausgeführt werden
     * @param  {object} args     Objekt, das nach der Initialisierung des Workers mit der Hauptkonfiguration zusammengeführt wird
     * @param  {object} execArgv Liste von String-Argumenten, die an den Worker-Prozess übergeben werden
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wird ausgeführt, nachdem ein Worker-Prozess beendet wurde.
     * @param  {string} cid      Capability-ID (z. B. 0-0)
     * @param  {number} exitCode 0 - Erfolg, 1 - Fehlschlag
     * @param  {object} specs    Specs, die im Worker-Prozess ausgeführt werden
     * @param  {number} retries  Anzahl der verwendeten Wiederholungen
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wird vor der Initialisierung der Webdriver-Session und des Testframeworks ausgeführt. Ermöglicht es Ihnen,
     * Konfigurationen abhängig von der Capability oder Spec zu verändern.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     * @param {Array.<String>} specs Liste der Spec-Dateipfade, die ausgeführt werden sollen
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wird vor Beginn der Testausführung ausgeführt. An dieser Stelle haben Sie Zugriff auf alle globalen
     * Variablen wie `browser`. Dies ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     * @param {Array.<String>} specs        Liste der Spec-Dateipfade, die ausgeführt werden sollen
     * @param {object}         browser      Instanz der erstellten Browser-/Geräte-Session
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wird ausgeführt, bevor die Suite startet (nur in Mocha/Jasmine).
     * @param {object} suite Suite-Details
     */
    beforeSuite: function (suite) {
    },
    /**
     * Dieser Hook wird _vor_ dem Start jedes Hooks innerhalb der Suite ausgeführt.
     * (Zum Beispiel wird er vor dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.) In Cucumber ist `context` das World-Objekt.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, der _nach_ dem Ende jedes Hooks innerhalb der Suite ausgeführt wird.
     * (Zum Beispiel wird er nach dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.) In Cucumber ist `context` das World-Objekt.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine)
     * @param {object} test    Testobjekt
     * @param {object} context Scope-Objekt, mit dem der Test ausgeführt wurde
     */
    beforeTest: function (test, context) {
    },
    /**
     * Wird ausgeführt, bevor ein WebdriverIO-Befehl ausgeführt wird.
     * @param {string} commandName Name des Hook-Befehls
     * @param {Array} args Argumente, die der Befehl erhalten würde
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Wird ausgeführt, nachdem ein WebdriverIO-Befehl ausgeführt wurde
     * @param {string} commandName Name des Hook-Befehls
     * @param {Array} args Argumente, die der Befehl erhalten würde
     * @param {*} result Ergebnis des Befehls
     * @param {Error} error Fehlerobjekt, falls vorhanden
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Funktion, die nach einem Test ausgeführt wird (nur in Mocha/Jasmine)
     * @param {object}  test             Testobjekt
     * @param {object}  context          Scope-Objekt, mit dem der Test ausgeführt wurde
     * @param {Error}   result.error     Fehlerobjekt, falls der Test fehlschlägt, andernfalls `undefined`
     * @param {*}       result.result    Rückgabeobjekt der Testfunktion
     * @param {number}  result.duration  Dauer des Tests
     * @param {boolean} result.passed    true, wenn der Test bestanden wurde, andernfalls false
     * @param {object}  result.retries   Informationen über Spec-bezogene Wiederholungen, z. B. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook, der ausgeführt wird, nachdem die Suite beendet wurde (nur in Mocha/Jasmine).
     * @param {object} suite Suite-Details
     */
    afterSuite: function (suite) {
    },
    /**
     * Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Sie haben weiterhin Zugriff auf alle globalen Variablen
     * des Tests.
     * @param {number} result 0 - Test bestanden, 1 - Test fehlgeschlagen
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     * @param {Array.<String>} specs Liste der ausgeführten Spec-Dateipfade
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wird direkt nach dem Beenden der Webdriver-Session ausgeführt.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     * @param {Array.<String>} specs Liste der ausgeführten Spec-Dateipfade
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess kurz vor dem Beenden steht.
     * Ein im `onComplete`-Hook geworfener Fehler führt dazu, dass der Testlauf fehlschlägt.
     * @param {object} exitCode 0 - Erfolg, 1 - Fehlschlag
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capability-Details
     * @param {<Object>} results Objekt mit den Testergebnissen
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wird ausgeführt, wenn ein Refresh stattfindet.
    * @param {string} oldSessionId Session-ID der alten Session
    * @param {string} newSessionId Session-ID der neuen Session
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber-Hooks
     *
     * Wird vor einem Cucumber-Feature ausgeführt.
     * @param {string}                   uri      Pfad zur Feature-Datei
     * @param {GherkinDocument.IFeature} feature  Cucumber-Feature-Objekt
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Wird vor einem Cucumber-Szenario ausgeführt.
     * @param {ITestCaseHookParameter} world    World-Objekt mit Informationen zu Pickle und Test-Step
     * @param {object}                 context  Cucumber-World-Objekt
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Wird vor einem Cucumber-Step ausgeführt.
     * @param {Pickle.IPickleStep} step     Step-Daten
     * @param {IPickle}            scenario Szenario-Pickle
     * @param {object}             context  Cucumber-World-Objekt
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Wird nach einem Cucumber-Step ausgeführt.
     * @param {Pickle.IPickleStep} step             Step-Daten
     * @param {IPickle}            scenario         Szenario-Pickle
     * @param {object}             result           Ergebnisobjekt mit den Szenario-Ergebnissen
     * @param {boolean}            result.passed    true, wenn das Szenario bestanden wurde
     * @param {string}             result.error     Fehler-Stack, falls das Szenario fehlgeschlagen ist
     * @param {number}             result.duration  Dauer des Szenarios in Millisekunden
     * @param {object}             context          Cucumber-World-Objekt
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Wird nach einem Cucumber-Szenario ausgeführt.
     * @param {ITestCaseHookParameter} world            World-Objekt mit Informationen zu Pickle und Test-Step
     * @param {object}                 result           Ergebnisobjekt mit den Szenario-Ergebnissen `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, wenn das Szenario bestanden wurde
     * @param {string}                 result.error     Fehler-Stack, falls das Szenario fehlgeschlagen ist
     * @param {number}                 result.duration  Dauer des Szenarios in Millisekunden
     * @param {object}                 context          Cucumber-World-Objekt
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Wird nach einem Cucumber-Feature ausgeführt.
     * @param {string}                   uri      Pfad zur Feature-Datei
     * @param {GherkinDocument.IFeature} feature  Cucumber-Feature-Objekt
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Wird ausgeführt, bevor eine WebdriverIO-Assertion-Bibliothek eine Assertion durchführt.
     * @param {object} params                 Assertion-Informationen
     * @param {string} params.matcherName     Name des Matchers, den der Test aufgerufen hat (bei einem Alias der Alias-Name)
     * @param {*}      params.expectedValue   Wert, der an den Matcher übergeben wird
     * @param {object} params.options         Assertion-Optionen
     */
    beforeAssertion: function (params) {
    },
    /**
     * Wird ausgeführt, nachdem eine WebdriverIO-Assertion-Bibliothek eine Assertion durchgeführt hat.
     * @param {object} params                 Assertion-Informationen, dieselben wie in `beforeAssertion`
     * @param {object} params.result          Ergebnis des Matchers, mit `pass` (boolean) und `message()`.
     *                                        `pass` ist true, wenn der Wert übereinstimmt, auch mit `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Eine Datei mit allen möglichen Optionen und Varianten finden Sie auch im [Beispielordner](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).