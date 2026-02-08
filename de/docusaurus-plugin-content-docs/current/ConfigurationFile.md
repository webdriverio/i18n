---
id: configurationfile
title: Konfigurationsdatei
---

Die Konfigurationsdatei enthält alle notwendigen Informationen, um Ihre Test-Suite auszuführen. Es handelt sich um ein NodeJS-Modul, das ein JSON exportiert.

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
    // Server-Konfigurationen
    // =====================
    // Host-Adresse des laufenden Selenium-Servers. Diese Information ist in der Regel überflüssig, da
    // WebdriverIO automatisch eine Verbindung zu localhost herstellt. Auch wenn Sie einen der
    // unterstützten Cloud-Dienste wie Sauce Labs, Browserstack, Testing Bot oder TestMu AI (ehemals LambdaTest) nutzen, müssen Sie auch
    // keine Host- und Port-Informationen definieren (da WebdriverIO diese
    // aus Ihren Benutzer- und Schlüsselinformationen ermitteln kann). Wenn Sie jedoch ein privates Selenium
    // Backend verwenden, sollten Sie hier `hostname`, `port` und `path` definieren.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protokoll: http | https
    // protocol: 'http',
    //
    // =================
    // Service-Anbieter
    // =================
    // WebdriverIO unterstützt Sauce Labs, Browserstack, Testing Bot und TestMu AI (ehemals LambdaTest). (Andere Cloud-Anbieter
    // sollten auch funktionieren.) Diese Dienste definieren spezifische `user`- und `key`-Werte (oder Zugriffsschlüssel),
    // die Sie hier angeben müssen, um eine Verbindung zu diesen Diensten herzustellen.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Wenn Sie Ihre Tests auf Sauce Labs ausführen, können Sie über die Eigenschaft `region` die Region angeben,
    // in der Sie Ihre Tests ausführen möchten. Verfügbare Kurzbezeichnungen für Regionen sind `us` (Standard) und `eu`.
    // Diese Regionen werden für die Sauce Labs VM Cloud und die Sauce Labs Real Device Cloud verwendet.
    // Wenn Sie keine Region angeben, wird standardmäßig `us` verwendet.
    region: 'us',
    //
    // Sauce Labs bietet ein [Headless-Angebot](https://saucelabs.com/products/web-testing/sauce-headless-testing) an,
    // mit dem Sie Chrome- und Firefox-Tests headless ausführen können.
    //
    headless: false,
    //
    // ==================
    // Testdateien festlegen
    // ==================
    // Definieren Sie, welche Testspezifikationen ausgeführt werden sollen. Das Muster ist relativ zum Verzeichnis
    // der Konfigurationsdatei, die ausgeführt wird.
    //
    // Die Specs werden als Array von Spec-Dateien definiert (optional unter Verwendung von Platzhaltern,
    // die erweitert werden). Der Test für jede Spec-Datei wird in einem separaten
    // Arbeitsprozess ausgeführt. Um eine Gruppe von Spec-Dateien im selben Worker-
    // Prozess auszuführen, schließen Sie sie in einem Array innerhalb des Specs-Arrays ein.
    //
    // Der Pfad der Spec-Dateien wird relativ zum Verzeichnis
    // der Konfigurationsdatei aufgelöst, es sei denn, es handelt sich um einen absoluten Pfad.
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
    // Sitzungen. In Ihren `capabilities` können Sie die Optionen `spec` und `exclude`
    // überschreiben, um bestimmte Specs einer bestimmten Capability zuzuordnen.
    //
    // Zunächst können Sie definieren, wie viele Instanzen gleichzeitig gestartet werden sollen. Angenommen,
    // Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und Sie haben
    // `maxInstances` auf 1 gesetzt. wdio wird 3 Prozesse starten.
    //
    // Wenn Sie also 10 Spec-Dateien haben und `maxInstances` auf 10 setzen, werden alle Spec-Dateien
    // gleichzeitig getestet und 30 Prozesse werden gestartet.
    //
    // Die Eigenschaft bestimmt, wie viele Capabilities aus demselben Test Tests ausführen sollen.
    //
    maxInstances: 10,
    //
    // Oder setzen Sie ein Limit, um Tests mit einer bestimmten Capability auszuführen.
    maxInstancesPerCapability: 10,
    //
    // Fügt WebdriverIOs Globals (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
    // Wenn Sie auf `false` setzen, sollten Sie aus `@wdio/globals` importieren. Hinweis: WebdriverIO behandelt
    // nicht die Injektion von testframework-spezifischen Globals.
    //
    injectGlobals: true,
    //
    // Wenn Sie Schwierigkeiten haben, alle wichtigen Capabilities zusammenzustellen, schauen Sie sich den
    // Sauce Labs Platform Configurator an - ein großartiges Tool zum Konfigurieren Ihrer Capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // Um Chrome headless auszuführen, sind folgende Flags erforderlich
        // (siehe https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parameter zum Ignorieren einiger oder aller Standardflags
        // - wenn der Wert true ist: alle DevTools 'default flags' und Puppeteer 'default arguments' ignorieren
        // - wenn der Wert ein Array ist: DevTools filtert die angegebenen Standardargumente
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances kann pro Capability überschrieben werden. Wenn Sie also ein eigenes Selenium-
        // Grid mit nur 5 Firefox-Instanzen haben, können Sie sicherstellen, dass nicht mehr als
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
        // Wenn outputDir angegeben ist, kann WebdriverIO Treibersitzungsprotokolle erfassen
        // Es ist möglich zu konfigurieren, welche Protokolltypen ausgeschlossen werden sollen.
        // excludeDriverLogs: ['*'], // übergeben Sie '*', um alle Treibersitzungsprotokolle auszuschließen
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parameter zum Ignorieren einiger oder aller Puppeteer-Standardargumente
        // ignoreDefaultArgs: ['-foreground'], // Wert auf true setzen, um alle Standardargumente zu ignorieren
    }],
    //
    // Zusätzliche Liste von Node-Argumenten, die beim Starten von Kindprozessen verwendet werden sollen
    execArgv: [],
    //
    // ===================
    // Testkonfigurationen
    // ===================
    // Definieren Sie hier alle Optionen, die für die WebdriverIO-Instanz relevant sind
    //
    // Level der Protokollierungsausführlichkeit: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Setzen Sie bestimmte Protokollebenen pro Logger
    // Verwenden Sie die Stufe 'silent', um den Logger zu deaktivieren
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Verzeichnis zum Speichern aller Protokolle festlegen
    outputDir: __dirname,
    //
    // Wenn Sie Ihre Tests nur bis zu einer bestimmten Anzahl fehlgeschlagener Tests ausführen möchten, verwenden Sie
    // bail (Standard ist 0 - kein Abbruch, alle Tests ausführen).
    bail: 0,
    //
    // Legen Sie eine Basis-URL fest, um `url()`-Befehlsaufrufe zu verkürzen. Wenn Ihr Parameter `url` mit
    // einem `/` beginnt, wird die `baseUrl` vorangestellt, ohne den Pfadteil der `baseUrl` einzubeziehen.
    //
    // Wenn Ihr Parameter `url` ohne Schema oder `/` beginnt (wie `some/path`), wird die `baseUrl`
    // direkt vorangestellt.
    baseUrl: 'http://localhost:8080',
    //
    // Standardzeitüberschreitung für alle waitForXXX-Befehle.
    waitforTimeout: 1000,
    //
    // Dateien zum Beobachten hinzufügen (z. B. Anwendungscode oder Seitenojekte), wenn der Befehl `wdio`
    // mit der Flag `--watch` ausgeführt wird. Globbing wird unterstützt.
    filesToWatch: [
        // z.B. Tests neu ausführen, wenn ich meinen Anwendungscode ändere
        // './app/**/*.js'
    ],
    //
    // Framework, mit dem Sie Ihre Specs ausführen möchten.
    // Die folgenden werden unterstützt: 'mocha', 'jasmine' und 'cucumber'
    // Siehe auch: https://webdriver.io/docs/frameworks.html
    //
    // Stellen Sie sicher, dass Sie das wdio-Adapterpaket für das spezifische Framework installiert haben, bevor Sie Tests ausführen.
    framework: 'mocha',
    //
    // Die Anzahl der Wiederholungsversuche für die gesamte Specdatei, wenn sie als Ganzes fehlschlägt
    specFileRetries: 1,
    // Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Specdatei
    specFileRetriesDelay: 0,
    // Ob wiederholte Specdateien sofort oder am Ende der Warteschlange erneut versucht werden sollen
    specFileRetriesDeferred: false,
    //
    // Testberichterstatter für stdout.
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
        // Jasmine Standard-Timeout
        defaultTimeoutInterval: 5000,
        //
        // Das Jasmine-Framework ermöglicht es, jede Assertion abzufangen, um den Zustand der Anwendung
        // oder Website je nach Ergebnis zu protokollieren. Es ist zum Beispiel sehr praktisch, bei jedem Fehlschlag
        // einer Assertion einen Screenshot zu machen.
        expectationResultHandler: function(passed, assertion) {
            // etwas tun
        },
        //
        // Nutzung der Jasmine-spezifischen grep-Funktionalität
        grep: null,
        invertGrep: null
    },
    //
    // Wenn Sie Cucumber verwenden, müssen Sie angeben, wo Ihre Schrittdefinitionen gespeichert sind.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (Datei/Verzeichnis) Dateien vor der Ausführung von Features laden
        backtrace: false,   // <boolean> vollständigen Backtrace für Fehler anzeigen
        compiler: [],       // <string[]> ("extension:module") Dateien mit der angegebenen EXTENSION nach dem Laden des MODULs laden (wiederholbar)
        dryRun: false,      // <boolean> Formatierer aufrufen, ohne Schritte auszuführen
        failFast: false,    // <boolean> Ausführung beim ersten Fehler abbrechen
        snippets: true,     // <boolean> Schrittdefinitionsausschnitte für ausstehende Schritte ausblenden
        source: true,       // <boolean> Quell-URIs ausblenden
        strict: false,      // <boolean> Fehler, wenn es undefinierte oder ausstehende Schritte gibt
        tagExpression: '',  // <string> (Ausdruck) nur Features oder Szenarien mit Tags ausführen, die dem Ausdruck entsprechen
        timeout: 20000,     // <number> Zeitüberschreitung für Schrittdefinitionen
        ignoreUndefinedDefinitions: false, // <boolean> Aktivieren Sie diese Konfiguration, um undefinierte Definitionen als Warnungen zu behandeln.
        scenarioLevelReporter: false // Aktivieren Sie dies, damit webdriver.io sich verhält, als wären Szenarien und nicht Schritte die Tests.
    },
    // Geben Sie einen benutzerdefinierten tsconfig-Pfad an - WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren
    // Ihre TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt
    // aber Sie können hier einen benutzerdefinierten Pfad angeben oder indem Sie die Umgebungsvariable TSX_TSCONFIG_PATH setzen
    // Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Hinweis: Diese Einstellung wird durch die Umgebungsvariable TSX_TSCONFIG_PATH und/oder das CLI-Argument --tsConfigPath überschrieben, wenn sie angegeben sind.
    // Diese Einstellung wird ignoriert, wenn Node Ihre wdio.conf.ts-Datei nicht ohne Hilfe von tsx parsen kann, z. B. wenn Sie
    // Pfad-Aliase in tsconfig.json eingerichtet haben und diese Pfad-Aliase in Ihrer wdio.config.ts-Datei verwenden.
    // Verwenden Sie dies nur, wenn Sie eine .js-Konfigurationsdatei verwenden oder Ihre .ts-Konfigurationsdatei gültiges JavaScript ist.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO bietet mehrere Hooks, mit denen Sie in den Testprozess eingreifen können, um ihn zu verbessern
    // und Dienste darum herum zu erstellen. Sie können entweder eine einzelne Funktion oder ein Array von
    // Methoden darauf anwenden. Wenn einer von ihnen mit einem Promise zurückkommt, wartet WebdriverIO, bis dieses Promise
    // aufgelöst ist, um fortzufahren.
    //
    /**
     * Wird einmal ausgeführt, bevor alle Worker gestartet werden.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Wird ausgeführt, bevor ein Arbeiterprozess gestartet wird und kann verwendet werden, um bestimmte Dienste
     * für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu ändern.
     * @param  {string} cid      Capability-ID (z. B. 0-0)
     * @param  {object} caps     Objekt mit Capabilities für die Sitzung, die im Worker gestartet wird
     * @param  {object} specs    Spezifikationen, die im Arbeiterprozess ausgeführt werden sollen
     * @param  {object} args     Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
     * @param  {object} execArgv Liste der String-Argumente, die an den Arbeiterprozess übergeben werden
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Wird ausgeführt, nachdem ein Arbeiterprozess beendet wurde.
     * @param  {string} cid      Capability-ID (z. B. 0-0)
     * @param  {number} exitCode 0 - Erfolg, 1 - Fehler
     * @param  {object} specs    Spezifikationen, die im Arbeiterprozess ausgeführt werden sollen
     * @param  {number} retries  Anzahl der verwendeten Wiederholungsversuche
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Wird ausgeführt, bevor die Webdriver-Sitzung und das Testframework initialisiert werden. Ermöglicht es Ihnen,
     * Konfigurationen abhängig von der Capability oder Spezifikation zu manipulieren.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     * @param {Array.<String>} specs Liste der Spec-Dateipfade, die ausgeführt werden sollen
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Wird ausgeführt, bevor die Testausführung beginnt. An diesem Punkt können Sie auf alle globalen
     * Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     * @param {Array.<String>} specs        Liste der Spec-Dateipfade, die ausgeführt werden sollen
     * @param {object}         browser      Instanz der erstellten Browser-/Gerätesitzung
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
     * Dieser Hook wird _vor_ jedem Hook innerhalb der Suite ausgeführt.
     * (Zum Beispiel wird dies vor dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.) In Cucumber ist `context` das World-Objekt.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook, der _nach_ jedem Hook innerhalb der Suite ausgeführt wird.
     * (Zum Beispiel wird dies nach dem Aufruf von `before`, `beforeEach`, `after`, `afterEach` in Mocha ausgeführt.) In Cucumber ist `context` das World-Objekt.
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
     * @param {string} commandName Hook-Befehlsname
     * @param {Array} args Argumente, die der Befehl erhalten würde
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Wird ausgeführt, nachdem ein WebdriverIO-Befehl ausgeführt wurde
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
     * @param {Error}   result.error     Fehlerobjekt, falls der Test fehlschlägt, ansonsten `undefined`
     * @param {*}       result.result    Rückgabeobjekt der Testfunktion
     * @param {number}  result.duration  Dauer des Tests
     * @param {boolean} result.passed    true, wenn der Test bestanden hat, ansonsten false
     * @param {object}  result.retries   Informationen zu spec-bezogenen Wiederholungen, z. B. `{ attempts: 0, limit: 0 }`
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
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     * @param {Array.<String>} specs Liste der Spec-Dateipfade, die ausgeführt wurden
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Wird direkt nach dem Beenden der Webdriver-Sitzung ausgeführt.
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     * @param {Array.<String>} specs Liste der Spec-Dateipfade, die ausgeführt wurden
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll.
     * Ein im Hook `onComplete` ausgelöster Fehler führt dazu, dass der Testlauf fehlschlägt.
     * @param {object} exitCode 0 - Erfolg, 1 - Fehler
     * @param {object} config wdio-Konfigurationsobjekt
     * @param {Array.<Object>} capabilities Liste der Capabilities-Details
     * @param {<Object>} results Objekt mit Testergebnissen
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Wird ausgeführt, wenn eine Aktualisierung erfolgt.
    * @param {string} oldSessionId Sitzungs-ID der alten Sitzung
    * @param {string} newSessionId Sitzungs-ID der neuen Sitzung
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
     * @param {ITestCaseHookParameter} world    World-Objekt mit Informationen zu Pickle und Testschritt
     * @param {object}                 context  Cucumber-World-Objekt
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Wird vor einem Cucumber-Schritt ausgeführt.
     * @param {Pickle.IPickleStep} step     Schrittdaten
     * @param {IPickle}            scenario Szenario-Pickle
     * @param {object}             context  Cucumber-World-Objekt
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Wird nach einem Cucumber-Schritt ausgeführt.
     * @param {Pickle.IPickleStep} step             Schrittdaten
     * @param {IPickle}            scenario         Szenario-Pickle
     * @param {object}             result           Ergebnisobjekt mit Szenarioergebnissen
     * @param {boolean}            result.passed    true, wenn das Szenario bestanden hat
     * @param {string}             result.error     Fehler-Stack, wenn das Szenario fehlgeschlagen ist
     * @param {number}             result.duration  Dauer des Szenarios in Millisekunden
     * @param {object}             context          Cucumber-World-Objekt
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Wird nach einem Cucumber-Szenario ausgeführt.
     * @param {ITestCaseHookParameter} world            World-Objekt mit Informationen zu Pickle und Testschritt
     * @param {object}                 result           Ergebnisobjekt mit Szenarioergebnissen `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, wenn das Szenario bestanden hat
     * @param {string}                 result.error     Fehler-Stack, wenn das Szenario fehlgeschlagen ist
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
     * Wird ausgeführt, bevor eine WebdriverIO-Assertionsbibliothek eine Assertion durchführt.
     * @param commandName Befehlsname
     * @param args        Argumente, die der Befehl erhalten würde
     */
    beforeAssertion: function (params) {
    },
    /**
     * Wird ausgeführt, nachdem ein WebdriverIO-Befehl ausgeführt wurde
     * @param commandName  Befehlsname
     * @param args         Argumente, die der Befehl erhalten würde
     * @param result       Ergebnis des Befehls
     * @param error        Fehler, falls etwas schief gelaufen ist
     */
    afterAssertion: function (params) {
    }
}
```

Sie können auch eine Datei mit allen möglichen Optionen und Variationen im [Example-Ordner](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) finden.