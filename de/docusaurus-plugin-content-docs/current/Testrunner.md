---
id: testrunner
title: Testrunner
---

WebdriverIO kommt mit seinem eigenen Test-Runner, um dir den schnellstmöglichen Einstieg ins Testen zu ermöglichen. Er soll die gesamte Arbeit für dich erledigen, ermöglicht die Integration von Drittanbieterdiensten und hilft dir, deine Tests so effizient wie möglich auszuführen.

WebdriverIOs Testrunner ist separat im NPM-Paket `@wdio/cli` gebündelt.

Installiere es wie folgt:

```sh npm2yarn
npm install @wdio/cli
```

Um die Hilfe zur Befehlszeilenschnittstelle zu sehen, gib den folgenden Befehl in deinem Terminal ein:

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

Super! Jetzt musst du eine Konfigurationsdatei definieren, in der alle Informationen zu deinen Tests, Fähigkeiten und Einstellungen festgelegt sind. Wechsle zum Abschnitt [Configuration File](/docs/configuration), um zu sehen, wie diese Datei aussehen sollte.

Mit dem `wdio`-Konfigurationshelfer ist es super einfach, deine Konfigurationsdatei zu erstellen. Führe einfach aus:

```sh
$ npx wdio config
```

...und es startet das Hilfsprogramm.

Es wird dir Fragen stellen und in weniger als einer Minute eine Konfigurationsdatei für dich generieren.

![WDIO configuration utility](/img/config-utility.gif)

Sobald du deine Konfigurationsdatei eingerichtet hast, kannst du deine Tests starten, indem du folgenden Befehl ausführst:

```sh
npx wdio run wdio.conf.js
```

Du kannst deinen Testlauf auch ohne den Befehl `run` initialisieren:

```sh
npx wdio wdio.conf.js
```

Das war's! Jetzt kannst du über die globale Variable `browser` auf die Selenium-Instanz zugreifen.

## Befehle

### `wdio config`

Der Befehl `config` führt den WebdriverIO-Konfigurationshelfer aus. Dieser Helfer stellt dir einige Fragen zu deinem WebdriverIO-Projekt und erstellt basierend auf deinen Antworten eine `wdio.conf.js`-Datei.

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

> Dies ist der Standardbefehl zum Ausführen deiner Konfiguration.

Der Befehl `run` initialisiert deine WebdriverIO-Konfigurationsdatei und führt deine Tests aus.

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
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> Hinweis: Die automatische Kompilierung kann leicht mit `tsx` ENV Vars gesteuert werden. Siehe auch die [TypeScript-Dokumentation](/docs/typescript).

### `wdio install`
Mit dem Befehl `install` kannst du Reporter und Dienste zu deinen WebdriverIO-Projekten über die CLI hinzufügen.

Beispiel:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Wenn du die Pakete mit `yarn` anstelle von npm installieren möchtest, kannst du dem Befehl die Flag `--yarn` übergeben:

```sh
wdio install service sauce --yarn
```

Du könntest auch einen benutzerdefinierten Konfigurationspfad übergeben, wenn deine WDIO-Konfigurationsdatei nicht im selben Ordner liegt, an dem du arbeitest:

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

Der Befehl `repl` ermöglicht den Start einer interaktiven Befehlszeilenschnittstelle, um WebdriverIO-Befehle auszuführen. Er kann für Testzwecke oder zum schnellen Starten einer WebdriverIO-Sitzung verwendet werden.

Tests in lokalem Chrome ausführen:

```sh
wdio repl chrome
```

oder Tests auf Sauce Labs ausführen:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Du kannst die gleichen Argumente anwenden, die du auch im [run-Befehl](#wdio-run) verwenden kannst.