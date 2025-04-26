---
id: testrunner
title: Testrunner
---

WebdriverIO kommt mit seinem eigenen Testrunner, um Ihnen zu helfen, so schnell wie möglich mit dem Testen zu beginnen. Er soll die gesamte Arbeit für Sie erledigen, ermöglicht die Integration in Dienste von Drittanbietern und hilft Ihnen, Ihre Tests so effizient wie möglich auszuführen.

Der Testrunner von WebdriverIO ist separat im NPM-Paket `@wdio/cli` gebündelt.

Installieren Sie es wie folgt:

```sh npm2yarn
npm install @wdio/cli
```

Um die Hilfe zur Befehlszeilenschnittstelle zu sehen, geben Sie den folgenden Befehl in Ihr Terminal ein:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Super! Jetzt müssen Sie eine Konfigurationsdatei definieren, in der alle Informationen zu Ihren Tests, Fähigkeiten und Einstellungen festgelegt sind. Wechseln Sie zum Abschnitt [Konfigurationsdatei](/docs/configuration), um zu sehen, wie diese Datei aussehen sollte.

Mit dem `wdio`-Konfigurationshelfer ist es super einfach, Ihre Konfigurationsdatei zu erstellen. Führen Sie einfach aus:

```sh
$ npx wdio config
```

...und es startet das Hilfsprogramm.

Es stellt Ihnen Fragen und generiert in weniger als einer Minute eine Konfigurationsdatei für Sie.

![WDIO-Konfigurationsdienstprogramm](/img/config-utility.gif)

Sobald Sie Ihre Konfigurationsdatei eingerichtet haben, können Sie Ihre Tests starten, indem Sie ausführen:

```sh
npx wdio run wdio.conf.js
```

Sie können Ihren Testlauf auch ohne den Befehl `run` initialisieren:

```sh
npx wdio wdio.conf.js
```

Das ist alles! Jetzt können Sie über die globale Variable `browser` auf die Selenium-Instanz zugreifen.

## Befehle

### `wdio config`

Der Befehl `config` führt den WebdriverIO-Konfigurationshelfer aus. Dieser Helfer stellt Ihnen einige Fragen zu Ihrem WebdriverIO-Projekt und erstellt basierend auf Ihren Antworten eine `wdio.conf.js`-Datei.

Beispiel:

```sh
wdio config
```

Optionen:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Dies ist der Standardbefehl zum Ausführen Ihrer Konfiguration.

Der Befehl `run` initialisiert Ihre WebdriverIO-Konfigurationsdatei und führt Ihre Tests aus.

Beispiel:

```sh
wdio run ./wdio.conf.js --watch
```

Optionen:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
```

> Hinweis: Autokompilierung kann leicht mit `tsx` ENV-Variablen gesteuert werden. Siehe auch die [TypeScript-Dokumentation](/docs/typescript).

### `wdio install`
Mit dem Befehl `install` können Sie Reporter und Dienste zu Ihren WebdriverIO-Projekten über die CLI hinzufügen.

Beispiel:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Wenn Sie die Pakete mit `yarn` installieren möchten, können Sie dem Befehl das Flag `--yarn` übergeben:

```sh
wdio install service sauce --yarn
```

Sie können auch einen benutzerdefinierten Konfigurationspfad übergeben, wenn sich Ihre WDIO-Konfigurationsdatei nicht in dem Ordner befindet, in dem Sie arbeiten:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Liste der unterstützten Dienste

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Liste der unterstützten Reporter

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Liste der unterstützten Frameworks

```
mocha
jasmine
cucumber
```

### `wdio repl`

Der Befehl repl ermöglicht es, eine interaktive Befehlszeilenschnittstelle zu starten, um WebdriverIO-Befehle auszuführen. Er kann zu Testzwecken oder einfach zum schnellen Starten einer WebdriverIO-Sitzung verwendet werden.

Tests im lokalen Chrome ausführen:

```sh
wdio repl chrome
```

oder Tests auf Sauce Labs ausführen:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Sie können die gleichen Argumente anwenden wie im [run-Befehl](#wdio-run).