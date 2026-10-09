---
id: testrunner
title: Testrunner
description: "Zainstaluj testrunner WDIO z pakietu @wdio/cli i używaj jego poleceń config, run, install, repl oraz session, aby konfigurować i uruchamiać zestawy testów."
---

Testrunner WebdriverIO uruchamia Twój zestaw testów na podstawie pliku konfiguracyjnego. Uruchamia jeden worker na każdą capability, podłącza Twój framework, usługi i reportery, a następnie uruchamia specyfikacje równolegle. Używaj go w każdym projekcie testowym; z [trybu standalone](/docs/setuptypes) korzystaj tylko wtedy, gdy osadzasz WebdriverIO we własnych narzędziach.

Testrunner jest dostarczany w pakiecie `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` uruchamia to samo CLI, gdy `@wdio/cli` nie jest jeszcze zainstalowany. npm instaluje pakiet [`wdio`](https://www.npmjs.com/package/wdio) bez zakresu (unscoped), a ten pakiet uruchamia `@wdio/cli`.

Aby skonfigurować nowy projekt, uruchom kreator konfiguracji. Zada on kilka pytań, zainstaluje pakiety i zapisze plik `wdio.conf.ts`:

```sh
npx wdio config
```

Następnie uruchom testy:

```sh
npx wdio run wdio.conf.ts
```

`run` jest poleceniem domyślnym, więc `npx wdio wdio.conf.ts` robi to samo. W swoich specyfikacjach importuj sesję z `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Zobacz [Plik konfiguracyjny](/docs/configurationfile), aby poznać wszystkie opcje `wdio.conf.ts`.

## Polecenia

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

Każde polecenie wyświetla własne opcje po dodaniu `--help`, np. `npx wdio run --help`.

### `wdio config`

Polecenie `config` uruchamia kreator konfiguracji i tworzy plik `wdio.conf.ts` (lub `wdio.conf.js`) na podstawie Twoich odpowiedzi.

```sh
npx wdio config
```

Przekaż `--yes`, aby użyć wartości domyślnych (Mocha, Chrome i obiekty stron) bez dodatkowych pytań. Każde pytanie kreatora ma również odpowiadającą mu flagę, więc możesz odpowiedzieć na niektóre lub wszystkie z nich w wierszu poleceń:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Opcje:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

Kreator instaluje pakiety za pomocą menedżera pakietów, który go uruchomił: `pnpm wdio config` używa pnpm, `yarn wdio config` używa Yarn, a `npx` używa npm.

`npx wdio config --help` wyświetla listę flag kreatora oraz akceptowanych przez nie wartości. Flaga dla pytania, którego kreator nie zadaje w przypadku Twojej konfiguracji, powoduje błąd — podobnie jak wartość, której kreator nie oferuje. Przykłady znajdziesz w sekcji [Odpowiadanie kreatorowi za pomocą flag](/docs/gettingstarted#answer-the-wizard-with-flags).

### `wdio run`

> Jest to domyślne polecenie do uruchamiania Twojej konfiguracji.

Polecenie `run` wczytuje plik konfiguracyjny i uruchamia testy. Opcje wiersza poleceń nadpisują odpowiadające im opcje w pliku konfiguracyjnym.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Opcje:

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

Przykłady:

```sh
# uruchom jeden zestaw (suite)
npx wdio run wdio.conf.ts --suite login

# uruchom pierwszy z czterech shardów, np. w macierzy CI
npx wdio run wdio.conf.ts --shard 1/4

# uruchom wszystkie przeglądarki w trybie headless lub wymuś tryb z interfejsem
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# ustaw opcje frameworka za pomocą notacji kropkowej
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# uruchom scenariusz Cucumber według numeru linii
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# użyj niestandardowego tsconfig.json
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# wstrzymaj nieudane testy i browser.debug(), aby agent kodujący mógł je zbadać
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` nadpisuje ustawienie [`tsConfigPath`](/docs/configurationfile) w Twojej konfiguracji. Zobacz [TypeScript](/docs/typescript), aby dowiedzieć się, jak WebdriverIO kompiluje Twoje specyfikacje za pomocą `tsx`.

### `wdio install`

Polecenie `install` dodaje reporter, usługę, framework, wtyczkę lub runner do istniejącego projektu. Instaluje pakiet, dodaje go do Twojego `package.json` i aktualizuje plik konfiguracyjny.

```sh
npx wdio install service sauce        # installs @wdio/sauce-service
npx wdio install reporter dot         # installs @wdio/dot-reporter
npx wdio install framework mocha      # installs @wdio/mocha-framework
```

Pakiety są instalowane za pomocą menedżera pakietów, który uruchomił polecenie, więc `pnpm wdio install reporter dot` instaluje przy użyciu pnpm, a `yarn wdio install reporter dot` przy użyciu Yarn. `npx` i bezpośrednie wywołania używają npm.

Jeśli Twój plik konfiguracyjny to nie `wdio.conf.(js|ts|cjs|mjs)` w bieżącym folderze, podaj jego lokalizację:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` wyświetla wszystkie obsługiwane pakiety wraz z ich nazwami w npm.

#### Lista obsługiwanych usług

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Lista obsługiwanych reporterów

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Lista obsługiwanych frameworków

```
mocha, jasmine, cucumber
```

#### Lista obsługiwanych wtyczek i runnerów

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Polecenie `repl` uruchamia sesję WebDriver i otwiera interaktywny wiersz poleceń, w którym możesz wykonywać polecenia WebdriverIO. Używaj go do wypróbowywania selektorów i poleceń bez pisania specyfikacji. Więcej informacji znajdziesz w sekcji [Interfejs REPL](/docs/repl).

Uruchom lokalnego Chrome'a:

```sh
npx wdio repl chrome
```

Uruchom w chmurze Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Użyj capability z pliku konfiguracyjnego, podając jej indeks lub nazwę multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Podłącz się do działającej [`wdio session`](/docs/session) zamiast uruchamiać nową przeglądarkę:

```sh
npx wdio repl --session default
```

`repl` akceptuje opcje połączenia [polecenia run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) oraz poniższe opcje mobilne. Używaj długich form `--user` i `--udid`: `-u` jest krótkim aliasem obu z nich.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Polecenie `session` steruje przeglądarką, aplikacją mobilną lub aplikacją desktopową z poziomu powłoki — jedno polecenie na wywołanie. Zostało stworzone z myślą o agentach kodujących: otwierają one sesję, wykonują snapshoty, klikają i wpisują tekst, a następnie eksportują swoje działania jako test. Zobacz [wdio session](/docs/session), aby poznać przepływ pracy, oraz [polecenia wdio session](/docs/session-commands), aby poznać wszystkie akcje.

```sh
npx wdio session --help
```

## Kolejne kroki

- [Plik konfiguracyjny](/docs/configurationfile): wszystkie opcje `wdio.conf.ts`
- [Pierwsze kroki](/docs/gettingstarted): skonfiguruj projekt za pomocą kreatora
- [Interfejs REPL](/docs/repl): debuguj polecenia interaktywnie
- [wdio session](/docs/session): steruj przeglądarką z poziomu powłoki lub agenta