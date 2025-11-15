---
id: configurationfile
title: Konfigurationsdatei
---

Die Konfigurationsdatei enthält alle notwendigen Informationen, um Ihre Testsuite auszuführen. Es ist ein NodeJS-Modul, das ein JSON exportiert.

Hier ist ein Beispiel für eine Konfiguration mit allen unterstützten Eigenschaften und zusätzlichen Informationen:

```js
export const config = {

    // ==================================
    // Wo sollen Ihre Tests gestartet werden
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Server Konfigurationen
    // =====================
    // Host-Adresse des laufenden Selenium-Servers. Diese Information ist in der Regel überflüssig, da
    // WebdriverIO automatisch eine Verbindung zu localhost herstellt. Auch wenn Sie einen der
    // unterstützten Cloud-Dienste wie Sauce Labs, Browserstack, Testing Bot oder LambdaTest verwenden, müssen Sie
    // keine Host- und Port-Informationen definieren (da WebdriverIO diese
    // aus Ihren Benutzer- und Schlüsselinformationen ermitteln kann). Wenn Sie jedoch ein privates Selenium-
    // Backend verwenden, sollten Sie `hostname`, `port` und `path` hier definieren.
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
    // WebdriverIO unterstützt Sauce Labs, Browserstack, Testing Bot und LambdaTest. (Andere Cloud-Anbieter
    // sollten auch funktionieren.) Diese Dienste definieren spezifische `user` und `key` (oder Zugangsschlüssel)
    // Werte, die Sie hier eingeben müssen, um sich mit diesen Diensten zu verbinden.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Wenn Sie Ihre Tests auf Sauce Labs ausführen, können Sie die Region angeben, in der Sie Ihre Tests
    // ausführen möchten, über die `region`-Eigenschaft. Verfügbare Kurzformen für Regionen sind `us` (Standard) und `eu`.
    // Diese Regionen werden für die Sauce Labs VM Cloud und die Sauce Labs Real Device Cloud verwendet.
    // Wenn Sie keine Region angeben, wird standardmäßig `us` verwendet.
    region: 'us',
    //
    // Sauce Labs bietet ein [Headless-Angebot](https://saucelabs.com/products/web-testing/sauce-headless-testing) an,
    // mit dem Sie Chrome- und Firefox-Tests im Headless-Modus ausführen können.
    //
    headless: false,
    //
    // ==================
    // Testdateien angeben
    // ==================
    // Definieren Sie, welche Testspezifikationen ausgeführt werden sollen. Das Muster ist relativ zum Verzeichnis
    // der Konfigurationsdatei, die ausgeführt wird.
    //
    // Die Spezifikationen werden als Array von Spezifikationsdateien definiert (optional mit Platzhaltern,
    // die erweitert werden). Der Test für jede Spezifikationsdatei wird in einem separaten
    // Arbeitsprozess ausgeführt. Um eine Gruppe von Spezifikationsdateien im selben Arbeitsprozess
    // auszuführen, schließen Sie sie in ein Array innerhalb des specs-Arrays ein.
    //
    // Der Pfad der Spezifikationsdateien wird relativ zum Verzeichnis der
    // Konfigurationsdatei aufgelöst, es sei denn, es ist ein absoluter Pfad.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Muster zum Ausschließen.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Definieren Sie hier Ihre Capabilities. WebdriverIO kann mehrere Capabilities gleichzeitig
    // ausführen. Je nach Anzahl der Capabilities startet WebdriverIO mehrere Test-
    // Sitzungen. Innerhalb Ihrer `capabilities` können Sie die `spec`- und `exclude`-
    // Optionen überschreiben, um bestimmte Spezifikationen einer bestimmten Capability zuzuordnen.
    //
    // Zuerst können Sie definieren, wie viele Instanzen gleichzeitig gestartet werden sollen. Nehmen wir
    // an, Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und haben
    // `maxInstances` auf 1 gesetzt. wdio wird 3 Prozesse starten.
    //
    // Wenn Sie also 10 Spezifikationsdateien haben und `maxInstances` auf 10 setzen, werden alle Spezifikationsdateien
    // gleichzeitig getestet und es werden 30 Prozesse gestartet.
    //
    // Die Eigenschaft legt fest, wie viele Capabilities aus demselben Test Tests ausführen sollen.
    //
    maxInstances: 10,
    //
    // Oder setzen Sie ein Limit, um Tests mit einer bestimmten Capability auszuführen.
    maxInstancesPerCapability: 10,
    //
    // Fügt WebdriverIO-Globals (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
    // Wenn Sie dies auf `false` setzen, sollten Sie aus `@wdio/globals` importieren. Hinweis: WebdriverIO führt keine
    // Injektion von testframework-spezifischen Globals durch.
    //
    injectGlobals: true,
    //
    // Wenn Sie Schwierigkeiten haben, alle wichtigen Capabilities zusammenzustellen, schauen Sie sich den
    // Sauce Labs-Plattformkonfigurator an - ein großartiges Tool zur Konfiguration Ihrer Capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // um Chrome im Headless-Modus auszuführen, sind die folgenden Flags erforderlich
        // (siehe https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parameter zum Ignorieren einiger oder aller Standardflags
        // - wenn der Wert true ist: ignoriere alle DevTools 'default flags' und Puppeteer 'default arguments'
        // - wenn der Wert ein Array ist: DevTools filtert gegebene Standardargumente
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances kann pro Capability überschrieben werden. Wenn Sie also ein hausinternes Selenium-
        // Grid mit nur 5 Firefox-Instanzen haben, können Sie sicherstellen, dass nicht mehr als
        // 5 Instanzen gleichzeitig gestartet werden.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Flag zur Aktivierung des Firefox Headless-Modus (siehe https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities für weitere Details zu moz:firefoxOptions)
          // args: ['-headless']
        },
        // Wenn outputDir angegeben ist, kann WebdriverIO Treiber-Sitzungsprotokolle erfassen
        // es ist möglich zu konfigurieren, welche logTypes ausgeschlossen werden sollen.
        // excludeDriverLogs: ['*'], // übergeben Sie '*', um alle Treiber-Sitzungsprotokolle auszuschließen
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parameter zum Ignorieren einiger oder aller Puppeteer-Standardargumente
        // ignoreDefaultArgs: ['-foreground'], // setzen Sie den Wert auf true, um alle Standardargumente zu ignorieren
    }],
    //
    // Zusätzliche Liste von Node-Argumenten, die beim Starten von Kindprozessen verwendet werden sollen
    execArgv: [],
    //
    // ===================
    // Test-Konfigurationen
    // ===================
    // Definieren Sie hier alle Optionen, die für die WebdriverIO-Instanz relevant sind
    //
    // Level der Protokollierungsausführlichkeit: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Setzen Sie bestimmte Protokollierungsstufen pro Logger
    // verwenden Sie 'silent'-Stufe, um Logger zu deaktivieren
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Verzeichnis zum Speichern aller Protokolle festlegen
    outputDir: __dirname,
    //
    // Wenn Sie Ihre Tests nur ausführen möchten, bis eine bestimmte Anzahl von Tests fehlgeschlagen ist, verwenden Sie
    // bail (Standard ist 0 - kein Abbruch, alle Tests ausführen).
    bail: 0,
    //
    // Setzen Sie eine Basis-URL, um `url()`-Befehlsaufrufe zu verkürzen. Wenn Ihr `url`-Parameter mit
    // `/` beginnt, wird `baseUrl` vorangestellt, jedoch nicht einschließlich des Pfadteils von `baseUrl`.
    //
    // Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird `baseUrl`
    // direkt vorangestellt.
    baseUrl: 'http://localhost:8080',
    //
    // Standardzeitlimit für alle waitForXXX-Befehle.
    waitforTimeout: 1000,
    //
    // Dateien zum Überwachen hinzufügen (z. B. Anwendungscode oder Seitenobjekte) beim Ausführen des `wdio`-Befehls
    // mit dem Flag `--watch`. Globbing wird unterstützt.
    filesToWatch: [
        // z.B. Tests erneut ausführen, wenn ich meinen Anwendungscode ändere
        // './app/**/*.js'
    ],
    //
    // Framework, mit dem Sie Ihre Spezifikationen ausführen möchten.
    // Die folgenden werden unterstützt: 'mocha', 'jasmine' und 'cucumber'
    // Siehe auch: https://webdriver.io/docs/frameworks.html
    //
    // Stellen Sie sicher, dass Sie das wdio-Adapter-Paket für das spezifische Framework installiert haben, bevor Sie Tests ausführen.
    framework: 'mocha',
    //
    // Die Anzahl der Wiederholungen der gesamten Spezifikationsdatei, wenn sie als Ganzes fehlschlägt
    specFileRetries: 1,
    // Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spezifikationsdatei
    specFileRetriesDelay: 0,
    // Ob fehlgeschlagene Spezifikationsdateien sofort oder am Ende der Warteschlange wiederholt werden sollen
    specFileRetriesDeferred: false,
    //
    // Test-Reporter für stdout.
    // Der einzige, der standardmäßig unterstützt wird, ist 'dot'
    // Siehe auch: https://webdriver.io/docs/dot-reporter.html und klicken Sie in der linken Spalte auf "Reporters"
    reporters: [
        'dot',
        ['allure', {
            //
            // Wenn Sie den "allure"-Reporter verwenden, sollten Sie das Verzeichnis definieren, in dem
            // WebdriverIO alle Allure-Berichte speichern soll.
            outputDir: './'
        }]
    ],
    //
    // Optionen, die an Mocha übergeben werden sollen.
    // Siehe die vollständige Liste unter: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Optionen, die an Jasmine übergeben werden sollen.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine-Standardzeitlimit
        defaultTimeoutInterval: 5000,
        //
        // Das Jasmine-Framework ermöglicht es, jede Assertion abzufangen, um den Zustand der Anwendung
        // oder Website je nach Ergebnis zu protokollieren. Es ist zum Beispiel sehr praktisch, bei jedem Fehlschlag einer
        // Assertion einen Screenshot zu machen.
        expectationResultHandler: function(passed, assertion) {
            // do something
        },
        //
        // Nutzen Sie Jasmine-spezifische grep-Funktionalität
        grep: null,
        invertGrep: null
    },
    //
    // Wenn Sie Cucumber verwenden, müssen Sie angeben, wo sich Ihre Schrittdefinitionen befinden.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) Dateien vor Ausführung der Features einbinden
        backtrace: false,   // <boolean> vollständigen Backtrace für Fehler anzeigen
        compiler: [],       // <string[]> ("extension:module") Dateien mit der angegebenen EXTENSION einbinden, nachdem MODULE eingebunden wurde (wiederholbar)
        dryRun: false,      // <boolean> Formatierer aufrufen, ohne Schritte auszuführen
        failFast: false,    // <boolean> Ausführung beim ersten Fehler abbrechen
        snippets: true,     // <boolean> Schrittdefinitionsschnipsel für ausstehende Schritte ausblenden
        source: true,       // <boolean> Quell-URIs ausblenden
        strict: false,      // <boolean> fehlschlagen, wenn es undefinierte oder ausstehende Schritte gibt
        tagExpression: '',  // <string> (expression) nur Features oder Szenarien mit Tags ausführen, die dem Ausdruck entsprechen
        timeout: 20000,     // <number> Zeitlimit für Schrittdefinitionen
        ignoreUndefinedDefinitions: false, // <boolean> Diese Konfiguration aktivieren, um undefinierte Definitionen als Warnungen zu behandeln.
        scenarioLevelReporter: false // Aktivieren Sie dies, damit webdriver.io sich so verhält, als ob Szenarien und nicht Schritte die Tests wären.
    },
    // Geben Sie einen benutzerdefinierten tsconfig-Pfad an - WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren
    // Ihre TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt
    // aber Sie können hier einen benutzerdefinierten Pfad angeben oder die Umgebungsvariable TSX_TSCONFIG_PATH setzen
    // Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Hinweis: Diese Einstellung wird durch die Umgebungsvariable TSX_TSCONFIG_PATH und/oder das cli-Argument --tsConfigPath überschrieben, wenn diese angegeben sind.
    // Diese Einstellung wird ignoriert, wenn Node Ihre wdio.conf.ts-Datei nicht ohne Hilfe von tsx parsen kann, z.B. wenn Sie
    // Pfadalias-Setup in tsconfig.json haben und diese Pfadaliase in Ihrer wdio.config.ts-Datei verwenden.
    // Verwenden Sie dies nur, wenn Sie eine .js-Konfigurationsdatei verwenden oder Ihre .ts-Konfigurationsdatei gültiges JavaScript ist.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO bietet verschiedene Hooks, mit denen Sie in den Testprozess eingreifen können, um ihn
    // zu verbessern und Dienste darum herum zu entwickeln. Sie können entweder eine einzelne Funktion darauf anwenden oder ein Array von
    // Methoden. Wenn eine davon mit einem Promise zurückkehrt, wartet WebdriverIO, bis dieses Promise aufgelöst ist,
    // um fortzufahren.
    //
    /**
     * Wird einmal ausgeführt, bevor alle Worker gestartet werden.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wird ausgeführt, bevor ein Arbeitsprozess gestartet wird, und kann verwendet werden, um spezifische Dienste
     * für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu modifizieren.
     * @param  {string} cid      Capability-ID (z.B. 0-0)
     * @param  {object} caps     Objekt mit Capabilities für die Sitzung, die im Worker gestartet wird
     * @param  {object} specs    Spezifikationen, die im Arbeitsprozess ausgeführt werden sollen
     * @param  {object} args     Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
     * @param  {object} execArgv Liste der String-Argumente, die an den Arbeitsprozess übergeben werden
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wird ausgeführt, nachdem ein Arbeitsprozess beendet wurde.
     * @param  {string} cid      Capability-ID (z.B. 0-0)
     * @param  {number} exitCode 0 - Erfolg, 1 - Fehler
     * @param  {object} specs    Spezifikationen, die im Arbeitsprozess ausgeführt werden sollen
     * @param  {number} retries  Anzahl der verwendeten Wiederholungen
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wird vor der Initialisierung der Webdriver-Sitzung und des Test-Frameworks ausgeführt. Es ermöglicht Ihnen,
     * Konfigurationen je nach Capability oder Spezifikation zu manipulieren.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     * @param {Array.<String>} specs Liste der Spezifikationsdateipfade, die ausgeführt werden sollen
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wird vor Beginn der Testausführung ausgeführt. An diesem Punkt können Sie auf alle globalen
     * Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     * @param {Array.<String>} specs        Liste der Spezifikationsdateipfade, die ausgeführt werden sollen
     * @param {object}         browser      Instanz der erstellten Browser-/Gerätesitzung
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Wird ausgeführt, bevor die Suite beginnt (nur in Mocha/Jasmine).
     * @param {object} suite Suite-Details
     */
    beforeSuite: function (suite) {
    },
    /**
     * Dieser Hook wird _vor_ jedem Hook innerhalb der Suite ausgeführt.
     * (Zum Beispiel wird dies vor dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.). In Cucumber ist `context` das World-Objekt.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, der _nach_ jedem Hook innerhalb der Suite ausgeführt wird.
     * (Zum Beispiel wird dies nach dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.). In Cucumber ist `context` das World-Objekt.
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
     * Wird vor der Ausführung eines WebdriverIO-Befehls ausgeführt.
     * @param {string} commandName Hook-Befehlsname
     * @param {Array} args Argumente, die der Befehl erhalten würde
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Wird nach der Ausführung eines WebdriverIO-Befehls ausgeführt
     * @param {string} commandName Hook-Befehlsname
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
     * @param {Error}   result.error     Fehlerobjekt, falls der Test fehlschlägt, sonst `undefined`
     * @param {*}       result.result    Rückgabeobjekt der Testfunktion
     * @param {number}  result.duration  Dauer des Tests
     * @param {boolean} result.passed    true, wenn der Test bestanden hat, sonst false
     * @param {object}  result.retries   Informationen über spezifikationsbezogene Wiederholungen, z.B. `{ attempts: 0, limit: 0 }`
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
     * Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Sie haben immer noch Zugriff auf alle globalen Variablen aus
     * dem Test.
     * @param {number} result 0 - Test bestanden, 1 - Test fehlgeschlagen
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     * @param {Array.<String>} specs Liste der Spezifikationsdateipfade, die ausgeführt wurden
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wird direkt nach dem Beenden der Webdriver-Sitzung ausgeführt.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     * @param {Array.<String>} specs Liste der Spezifikationsdateipfade, die ausgeführt wurden
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll.
     * Ein im `onComplete`-Hook ausgelöster Fehler führt zum Fehlschlagen des Testlaufs.
     * @param {object} exitCode 0 - Erfolg, 1 - Fehler
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste mit Capabilities-Details
     * @param {<Object>} results Objekt mit Testergebnissen
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wird ausgeführt, wenn eine Aktualisierung stattfindet.
    * @param {string} oldSessionId Sitzungs-ID der alten Sitzung
    * @param {string} newSessionId Sitzungs-ID der neuen Sitzung
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber Hooks
     *
     * Wird vor einem Cucumber Feature ausgeführt.
     * @param {string}                   uri      Pfad zur Feature-Datei
     * @param {GherkinDocument.IFeature} feature  Cucumber Feature-Objekt
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Wird vor einem Cucumber Scenario ausgeführt.
     * @param {ITestCaseHookParameter} world    World-Objekt mit Informationen zu Pickle und Testschritt
     * @param {object}                 context  Cucumber World-Objekt
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Wird vor einem Cucumber Step ausgeführt.
     * @param {Pickle.IPickleStep} step     Step-Daten
     * @param {IPickle}            scenario Scenario-Pickle
     * @param {object}             context  Cucumber World-Objekt
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Wird nach einem Cucumber Step ausgeführt.
     * @param {Pickle.IPickleStep} step             Step-Daten
     * @param {IPickle}            scenario         Scenario-Pickle
     * @param {object}             result           Ergebnisobjekt mit Szenarioergebnissen
     * @param {boolean}            result.passed    true, wenn das Szenario bestanden hat
     * @param {string}             result.error     Fehlerstapel, wenn das Szenario fehlgeschlagen ist
     * @param {number}             result.duration  Dauer des Szenarios in Millisekunden
     * @param {object}             context          Cucumber World-Objekt
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Wird nach einem Cucumber Scenario ausgeführt.
     * @param {ITestCaseHookParameter} world            World-Objekt mit Informationen zu Pickle und Testschritt
     * @param {object}                 result           Ergebnisobjekt mit Szenarioergebnissen `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, wenn das Szenario bestanden hat
     * @param {string}                 result.error     Fehlerstapel, wenn das Szenario fehlgeschlagen ist
     * @param {number}                 result.duration  Dauer des Szenarios in Millisekunden
     * @param {object}                 context          Cucumber World-Objekt
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Wird nach einem Cucumber Feature ausgeführt.
     * @param {string}                   uri      Pfad zur Feature-Datei
     * @param {GherkinDocument.IFeature} feature  Cucumber Feature-Objekt
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Wird ausgeführt, bevor eine WebdriverIO-Assertion-Bibliothek eine Assertion durchführt.
     * @param commandName Befehlsname
     * @param args        Argumente, die der Befehl erhalten würde
     */
    beforeAssertion: function (params) {
    },
    /**
     * Wird nach der Ausführung eines WebdriverIO-Befehls ausgeführt
     * @param commandName  Befehlsname
     * @param args         Argumente, die der Befehl erhalten würde
     * @param result       Ergebnis des Befehls
     * @param error        Fehler, falls etwas schiefgelaufen ist
     */
    afterAssertion: function (params) {
    }
}
```

Sie können auch eine Datei mit allen möglichen Optionen und Variationen im [example Ordner](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) finden.