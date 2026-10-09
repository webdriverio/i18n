---
id: testrunner
title: Testrunner
description: "Installiere den WDIO-Testrunner aus @wdio/cli und nutze seine Befehle config, run, install, repl und session, um Testsuiten einzurichten und auszuführen."
---

Der WebdriverIO-Testrunner führt deine Testsuite anhand einer Konfigurationsdatei aus. Er startet einen Worker pro Capability, bindet dein Framework, deine Services und Reporter ein und führt Specs parallel aus. Verwende ihn für jedes Testprojekt; verwende den [Standalone-Modus](/docs/setuptypes) nur, wenn du WebdriverIO in dein eigenes Tooling einbettest.

Der Testrunner ist im Paket `@wdio/cli` enthalten:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` führt dieselbe CLI aus, wenn `@wdio/cli` noch nicht installiert ist. npm installiert das Paket [`wdio`](https://www.npmjs.com/package/wdio) ohne Scope, und dieses Paket startet `@wdio/cli`.

Um ein neues Projekt einzurichten, führe den Konfigurationsassistenten aus. Er stellt ein paar Fragen, installiert die Pakete und schreibt eine `wdio.conf.ts`:

```sh
npx wdio config
```

Führe dann deine Tests aus:

```sh
npx wdio run wdio.conf.ts
```

`run` ist der Standardbefehl, daher bewirkt `npx wdio wdio.conf.ts` dasselbe. Importiere in deinen Specs die Session aus `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Unter [Konfigurationsdatei](/docs/configurationfile) findest du alle Optionen von `wdio.conf.ts`.

## Befehle

```sh
$ npx wdio --help

wdio [command]

Commands:
  wdio config                           Initialize WebdriverIO and setup
                                        configuration in your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or
                                        `framework` to your WebdriverIO project.
  wdio repl [option] [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to
                                        initialize your tests. (default)
  wdio session [action..]               Drive a browser, mobile app or desktop
                                        app from the shell

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

Jeder Befehl gibt mit `--help` seine eigenen Optionen aus, z. B. `npx wdio run --help`.

### `wdio config`

Der Befehl `config` startet den Konfigurationsassistenten und erstellt anhand deiner Antworten eine `wdio.conf.ts` (oder `wdio.conf.js`).

```sh
npx wdio config
```

Übergib `--yes`, um ohne Rückfragen die Standardwerte (Mocha, Chrome und Page Objects) zu verwenden. Für jede Frage des Assistenten gibt es außerdem ein Flag, sodass du einige oder alle Fragen direkt auf der Kommandozeile beantworten kannst:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Optionen:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

Der Assistent installiert Pakete mit dem Paketmanager, der ihn ausführt: `pnpm wdio config` verwendet pnpm, `yarn wdio config` verwendet Yarn und `npx` verwendet npm.

`npx wdio config --help` listet die Flags des Assistenten und die Werte auf, die sie akzeptieren. Ein Flag für eine Frage, die der Assistent bei deinem Setup nicht stellt, führt zu einem Fehler, ebenso wie ein Wert, den er nicht anbietet. Beispiele findest du unter [Den Assistenten mit Flags beantworten](/docs/gettingstarted#answer-the-wizard-with-flags).

### `wdio run`

> Dies ist der Standardbefehl, um deine Konfiguration auszuführen.

Der Befehl `run` lädt deine Konfigurationsdatei und führt deine Tests aus. Kommandozeilenoptionen überschreiben die entsprechenden Optionen in der Konfigurationsdatei.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Optionen:

```
    --watch            Run WebdriverIO in watch mode                   [boolean]
-h, --hostname         automation driver host address                   [string]
-p, --port             automation driver port                           [number]
    --path             path to WebDriver endpoints (default "/")        [string]
-u, --user             username if using a cloud service as automation backend
                                                                        [string]
-k, --key              corresponding access key to the user             [string]
-l, --logLevel         level of logging verbosity
                [choices: "trace", "debug", "info", "warn", "error", "silent"]
    --bail             stop test runner after specific amount of tests have
                       failed                                           [number]
    --baseUrl          shorten url command calls by setting a base url  [string]
-w, --waitforTimeout   timeout for all waitForXXX commands              [number]
-s, --updateSnapshots  update DOM, image or test snapshots              [string]
-f, --framework        defines the framework (Mocha, Jasmine or Cucumber) to
                       run the specs                                    [string]
-r, --reporters        reporters to print out the results on stdout      [array]
    --suite            overwrites the specs attribute and runs the defined
                       suite                                             [array]
    --spec             run only a certain spec file or wildcard - overrides
                       specs piped from stdin                            [array]
    --exclude          exclude certain spec file or wildcard from the test run
                       - overrides exclude piped from stdin              [array]
    --repeat           Repeat specific specs and/or suites N times      [number]
    --mochaOpts        Mocha options
    --jasmineOpts      Jasmine options
    --cucumberOpts     Cucumber options
    --coverage         Enable coverage for browser runner
    --headless         run all browser instances in headless mode, overrides
                       capability settings in wdio.conf.js             [boolean]
    --shard            Shard tests and execute only the selected shard.
                       Specify in the one-based form like `--shard x/y`, where
                       x is the current and y the total shard.
    --cpuProf          Enable Node.js CPU profiling for worker processes
                       (--cpu-prof)                                    [boolean]
    --heapProf         Enable Node.js heap profiling for worker processes
                       (--heap-prof)                                   [boolean]
    --debug            Pause failing tests and browser.debug() in an agent
                       session. Only `agent` is supported
                                                   [string] [choices: "agent"]
    --tsConfigPath     custom path for `tsconfig.json`                  [string]
```

Beispiele:

```sh
# eine Suite ausführen
npx wdio run wdio.conf.ts --suite login

# den ersten von vier Shards ausführen, z. B. in einer CI-Matrix
npx wdio run wdio.conf.ts --shard 1/4

# alle Browser headless ausführen oder den Headed-Modus erzwingen
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# Framework-Optionen mit Punktnotation setzen
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# ein Cucumber-Szenario anhand der Zeilennummer ausführen
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# eine eigene tsconfig.json verwenden
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# fehlschlagende Tests und browser.debug() pausieren, damit ein Coding-Agent sie untersuchen kann
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` überschreibt die Einstellung [`tsConfigPath`](/docs/configurationfile) deiner Konfiguration. Unter [TypeScript](/docs/typescript) erfährst du, wie WebdriverIO deine Specs mit `tsx` kompiliert.

### `wdio install`

Der Befehl `install` fügt einem bestehenden Projekt einen Reporter, Service, ein Framework, Plugin oder einen Runner hinzu. Er installiert das Paket, fügt es deiner `package.json` hinzu und aktualisiert deine Konfigurationsdatei.

```sh
npx wdio install service sauce        # installiert @wdio/sauce-service
npx wdio install reporter dot         # installiert @wdio/dot-reporter
npx wdio install framework mocha      # installiert @wdio/mocha-framework
```

Die Pakete werden mit dem Paketmanager installiert, der den Befehl ausführt, d. h. `pnpm wdio install reporter dot` installiert mit pnpm und `yarn wdio install reporter dot` mit Yarn. `npx` und direkte Aufrufe verwenden npm.

Wenn deine Konfigurationsdatei nicht `wdio.conf.(js|ts|cjs|mjs)` im aktuellen Ordner ist, gib ihren Speicherort an:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` gibt jedes unterstützte Paket mit seinem npm-Namen aus.

#### Liste der unterstützten Services

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Liste der unterstützten Reporter

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Liste der unterstützten Frameworks

```
mocha, jasmine, cucumber
```

#### Liste der unterstützten Plugins und Runner

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Der Befehl `repl` startet eine WebDriver-Session und öffnet eine interaktive Eingabeaufforderung, in der du WebdriverIO-Befehle ausführst. Verwende ihn, um Selektoren und Befehle auszuprobieren, ohne eine Spec zu schreiben. Mehr dazu unter [REPL-Schnittstelle](/docs/repl).

Einen lokalen Chrome starten:

```sh
npx wdio repl chrome
```

In der Sauce-Labs-Cloud ausführen:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Eine Capability aus deiner Konfigurationsdatei verwenden, per Index oder über ihren Multiremote-Namen:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

An eine laufende [`wdio session`](/docs/session) anhängen, anstatt einen neuen Browser zu starten:

```sh
npx wdio repl --session default
```

`repl` akzeptiert die Verbindungsoptionen des [run-Befehls](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) sowie diese Mobile-Optionen. Verwende die langen Formen `--user` und `--udid`: `-u` ist der kurze Alias für beide.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Der Befehl `session` steuert einen Browser, eine mobile App oder eine Desktop-App aus der Shell, ein Befehl pro Aufruf. Er ist für Coding-Agents gedacht: Sie öffnen eine Session, erstellen Snapshots, klicken und tippen und exportieren ihre Aktionen als Test. Den Arbeitsablauf findest du unter [wdio session](/docs/session) und alle Aktionen unter [wdio session-Befehle](/docs/session-commands).

```sh
npx wdio session --help
```

## Nächste Schritte

- [Konfigurationsdatei](/docs/configurationfile): alle Optionen von `wdio.conf.ts`
- [Erste Schritte](/docs/gettingstarted): ein Projekt mit dem Assistenten einrichten
- [REPL-Schnittstelle](/docs/repl): Befehle interaktiv debuggen
- [wdio session](/docs/session): einen Browser aus der Shell oder über einen Agent steuern