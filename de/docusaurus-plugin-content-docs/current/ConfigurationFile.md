---
id: configurationfile
title: Konfigurationsdatei
---

Die Konfigurationsdatei enthält alle notwendigen Informationen, um Ihre Testsuite auszuführen. Es handelt sich um ein NodeJS-Modul, das ein JSON exportiert.

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
    // Host-Adresse des laufenden Selenium-Servers. Diese Information ist normalerweise überflüssig, da
    // WebdriverIO automatisch eine Verbindung zu localhost herstellt. Auch wenn Sie einen der
    // unterstützten Cloud-Dienste wie Sauce Labs, Browserstack, Testing Bot oder LambdaTest verwenden, müssen Sie
    // keine Host- und Port-Informationen definieren (da WebdriverIO diese
    // aus Ihren Benutzer- und Schlüsselinformationen ermitteln kann). Wenn Sie jedoch ein privates Selenium-
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
    // WebdriverIO unterstützt Sauce Labs, Browserstack, Testing Bot und LambdaTest. (Andere Cloud-Anbieter
    // sollten auch funktionieren.) Diese Dienste definieren spezifische `user`- und `key`-Werte (oder Zugriffsschlüssel),
    // die Sie hier angeben müssen, um eine Verbindung zu diesen Diensten herzustellen.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Wenn Sie Ihre Tests auf Sauce Labs ausführen, können Sie die Region, in der Sie Ihre Tests ausführen möchten,
    // über die Eigenschaft `region` angeben. Verfügbare Kurzbezeichnungen für Regionen sind `us` (Standard) und `eu`.
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
    // Konfigurationsdatei aufgelöst, es sei denn, es handelt sich um einen absoluten Pfad.
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
    // Sitzungen. Innerhalb Ihrer `capabilities` können Sie die Optionen `spec` und `exclude`
    // überschreiben, um bestimmte Spezifikationen einer bestimmten Capability zuzuordnen.
    //
    // Zunächst können Sie definieren, wie viele Instanzen gleichzeitig gestartet werden sollen. Angenommen,
    // Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und Sie haben
    // `maxInstances` auf 1 gesetzt. wdio wird 3 Prozesse starten.
    //
    // Wenn Sie also 10 Spezifikationsdateien haben und `maxInstances` auf 10 setzen, werden alle Spezifikationsdateien
    // gleichzeitig getestet und 30 Prozesse werden gestartet.
    //
    // Die Eigenschaft steuert, wie viele Capabilities aus demselben Test Tests ausführen sollen.
    //
    maxInstances: 10,
    //
    // Oder setzen Sie ein Limit, um Tests mit einer bestimmten Capability auszuführen.
    maxInstancesPerCapability: 10,
    //
    // Fügt WebdriverIO-Globals (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
    // Wenn Sie auf `false` setzen, sollten Sie aus `@wdio/globals` importieren. Hinweis: WebdriverIO behandelt
    // nicht die Injektion von testframework-spezifischen Globals.
    //
    injectGlobals: true,
    //
    // Wenn Sie Schwierigkeiten haben, alle wichtigen Capabilities zusammenzustellen, schauen Sie sich den
    // Sauce Labs Platform Configurator an - ein großartiges Tool zur Konfiguration Ihrer Capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // Um Chrome headless auszuführen, sind die folgenden Flags erforderlich
        // (siehe https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parameter zum Ignorieren einiger oder aller Standard-Flags
        // - wenn der Wert true ist: Ignoriere alle DevTools 'default flags' und Puppeteer 'default arguments'
        // - wenn der Wert ein Array ist: DevTools filtert die angegebenen Standardargumente
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
          // Flag zur Aktivierung des Firefox-Headless-Modus (siehe https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities für weitere Details zu moz:firefoxOptions)
          // args: ['-headless']
        },
        // Wenn outputDir angegeben ist, kann WebdriverIO Treibersitzungsprotokolle erfassen
        // Es ist möglich zu konfigurieren, welche logTypes ausgeschlossen werden sollen.
        excludeDriverLogs: ['bugreport', 'server'], // übergeben Sie '*', um alle Treibersitzungsprotokolle auszuschließen
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
    // Ausführlichkeit der Protokollierung: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Setzen Sie spezifische Log-Level pro Logger
    // Verwenden Sie 'silent' Level, um Logger zu deaktivieren
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
    // Setzen Sie eine Basis-URL, um `url()`-Befehlsaufrufe zu verkürzen. Wenn Ihr `url`-Parameter mit
    // `/` beginnt, wird die `baseUrl` vorangestellt, ohne den Pfadteil der `baseUrl` einzubeziehen.
    //
    // Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die `baseUrl`
    // direkt vorangestellt.
    baseUrl: 'http://localhost:8080',
    //
    // Standardzeitlimit für alle waitForXXX-Befehle.
    waitforTimeout: 1000,
    //
    // Fügen Sie Dateien hinzu, die überwacht werden sollen (z.B. Anwendungscode oder Seitenobjekte), wenn der Befehl `wdio`
    // mit dem Flag `--watch` ausgeführt wird. Globbing wird unterstützt.
    filesToWatch: [
        // z.B. Tests erneut ausführen, wenn ich meinen Anwendungscode ändere
        // './app/**/*.js'
    ],
    //
    // Framework, mit dem Sie Ihre Spezifikationen ausführen möchten.
    // Folgende werden unterstützt: 'mocha', 'jasmine' und 'cucumber'
    // Siehe auch: https://webdriver.io/docs/frameworks.html
    //
    // Stellen Sie sicher, dass Sie das wdio-Adapterpaket für das spezifische Framework installiert haben, bevor Sie Tests ausführen.
    framework: 'mocha',
    //
    // Die Anzahl der Wiederholungen der gesamten Spezifikationsdatei, wenn sie als Ganzes fehlschlägt
    specFileRetries: 1,
    // Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spezifikationsdatei
    specFileRetriesDelay: 0,
    // Ob wiederholte Spezifikationsdateien sofort wiederholt oder ans Ende der Warteschlange verschoben werden sollen
    specFileRetriesDeferred: false,
    //
    // Testreporter für stdout.
    // Der einzige, der standardmäßig unterstützt wird, ist 'dot'
    // Siehe auch: https://webdriver.io/docs/dot-reporter.html und klicken Sie auf "Reporters" in der linken Spalte
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
        // oder Website abhängig vom Ergebnis zu protokollieren. Es ist zum Beispiel sehr praktisch, jedes Mal einen Screenshot zu machen,
        // wenn eine Assertion fehlschlägt.
        expectationResultHandler: function(passed, assertion) {
            // etwas tun
        },
        //
        // Nutzen Sie die Jasmine-spezifische grep-Funktionalität
        grep: null,
        invertGrep: null
    },
    //
    // Wenn Sie Cucumber verwenden, müssen Sie angeben, wo Ihre Schrittdefinitionen gespeichert sind.
    // Siehe auch: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (Datei/Verzeichnis) Dateien vor der Ausführung von Features laden
        backtrace: false,   // <boolean> vollständigen Backtrace für Fehler anzeigen
        compiler: [],       // <string[]> ("Erweiterung:Modul") Dateien mit der angegebenen ERWEITERUNG nach dem Laden des MODULS laden (wiederholbar)
        dryRun: false,      // <boolean> Formatierer aufrufen, ohne Schritte auszuführen
        failFast: false,    // <boolean> Ausführung beim ersten Fehler abbrechen
        snippets: true,     // <boolean> Schrittdefinitionsschnipsel für ausstehende Schritte ausblenden
        source: true,       // <boolean> Quell-URIs ausblenden
        strict: false,      // <boolean> Fehlschlag, wenn es undefinierte oder ausstehende Schritte gibt
        tagExpression: '',  // <string> (Ausdruck) nur Features oder Szenarien mit Tags ausführen, die dem Ausdruck entsprechen
        timeout: 20000,     // <number> Zeitlimit für Schrittdefinitionen
        ignoreUndefinedDefinitions: false, // <boolean> Aktivieren Sie diese Konfiguration, um undefinierte Definitionen als Warnungen zu behandeln.
        scenarioLevelReporter: false // Aktivieren Sie dies, damit webdriver.io sich so verhält, als wären Szenarien und nicht Schritte die