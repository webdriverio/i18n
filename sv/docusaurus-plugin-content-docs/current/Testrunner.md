---
id: testrunner
title: Testrunner
description: "Installera WDIO-testrunnern från @wdio/cli och använd dess kommandon config, run, install, repl och session för att konfigurera och köra testsviter."
---

WebdriverIO-testrunnern kör din testsvit utifrån en konfigurationsfil. Den startar en worker per capability, kopplar ihop ditt ramverk, dina tjänster och reportrar, och kör specs parallellt. Använd den för alla testprojekt; använd [fristående läge](/docs/setuptypes) endast när du bäddar in WebdriverIO i dina egna verktyg.

Testrunnern levereras i paketet `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` kör samma CLI när `@wdio/cli` ännu inte är installerat. npm installerar det oscopade paketet [`wdio`](https://www.npmjs.com/package/wdio), och det paketet startar `@wdio/cli`.

För att sätta upp ett nytt projekt kör du konfigurationsguiden. Den ställer några frågor, installerar paketen och skriver en `wdio.conf.ts`:

```sh
npx wdio config
```

Kör sedan dina tester:

```sh
npx wdio run wdio.conf.ts
```

`run` är standardkommandot, så `npx wdio wdio.conf.ts` gör samma sak. I dina specs importerar du sessionen från `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Se [Konfigurationsfil](/docs/configurationfile) för alla alternativ i `wdio.conf.ts`.

## Kommandon

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

Varje kommando skriver ut sina egna alternativ med `--help`, t.ex. `npx wdio run --help`.

### `wdio config`

Kommandot `config` kör konfigurationsguiden och skapar en `wdio.conf.ts` (eller `wdio.conf.js`) baserat på dina svar.

```sh
npx wdio config
```

Ange `--yes` för att använda standardvärdena (Mocha, Chrome och page objects) utan frågor. Varje fråga i guiden har också en flagga, så du kan besvara några eller alla av dem på kommandoraden:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Alternativ:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

Guiden installerar paket med den pakethanterare som kör den: `pnpm wdio config` använder pnpm, `yarn wdio config` använder Yarn och `npx` använder npm.

`npx wdio config --help` listar guidens flaggor och de värden de accepterar. En flagga för en fråga som guiden inte ställer för din konfiguration ger ett fel, och det gör även ett värde som den inte erbjuder. Se [Besvara guiden med flaggor](/docs/gettingstarted#answer-the-wizard-with-flags) för exempel.

### `wdio run`

> Detta är standardkommandot för att köra din konfiguration.

Kommandot `run` läser in din konfigurationsfil och kör dina tester. Kommandoradsalternativ åsidosätter motsvarande alternativ i konfigurationsfilen.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Alternativ:

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

Exempel:

```sh
# kör en svit
npx wdio run wdio.conf.ts --suite login

# kör den första av fyra shards, t.ex. i en CI-matris
npx wdio run wdio.conf.ts --shard 1/4

# kör alla webbläsare headless, eller tvinga headed-läge
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# ange ramverksalternativ med punktnotation
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# kör ett Cucumber-scenario via radnummer
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# använd en anpassad tsconfig.json
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# pausa misslyckade tester och browser.debug() så att en kodagent kan inspektera dem
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` åsidosätter inställningen [`tsConfigPath`](/docs/configurationfile) i din konfiguration. Se [TypeScript](/docs/typescript) för hur WebdriverIO kompilerar dina specs med `tsx`.

### `wdio install`

Kommandot `install` lägger till en reporter, tjänst, ett ramverk, plugin eller en runner i ett befintligt projekt. Det installerar paketet, lägger till det i din `package.json` och uppdaterar din konfigurationsfil.

```sh
npx wdio install service sauce        # installerar @wdio/sauce-service
npx wdio install reporter dot         # installerar @wdio/dot-reporter
npx wdio install framework mocha      # installerar @wdio/mocha-framework
```

Paketen installeras med den pakethanterare som kör kommandot, så `pnpm wdio install reporter dot` installerar med pnpm och `yarn wdio install reporter dot` med Yarn. `npx` och direkta anrop använder npm.

Om din konfigurationsfil inte är `wdio.conf.(js|ts|cjs|mjs)` i den aktuella mappen, ange dess plats:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` skriver ut alla paket som stöds med deras npm-namn.

#### Lista över tjänster som stöds

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Lista över reportrar som stöds

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Lista över ramverk som stöds

```
mocha, jasmine, cucumber
```

#### Lista över plugins och runners som stöds

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Kommandot `repl` startar en WebDriver-session och öppnar en interaktiv prompt där du kör WebdriverIO-kommandon. Använd det för att prova selektorer och kommandon utan att skriva en spec. Se [REPL-gränssnitt](/docs/repl) för mer information.

Starta en lokal Chrome:

```sh
npx wdio repl chrome
```

Kör i Sauce Labs-molnet:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Använd en capability från din konfigurationsfil, via index eller via dess multi-remote-namn:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Anslut till en pågående [`wdio session`](/docs/session) i stället för att starta en ny webbläsare:

```sh
npx wdio repl --session default
```

`repl` accepterar anslutningsalternativen från [run-kommandot](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) samt dessa mobilalternativ. Använd de långa formerna `--user` och `--udid`: `-u` är det korta aliaset för båda.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Kommandot `session` styr en webbläsare, mobilapp eller skrivbordsapp från skalet, ett kommando per anrop. Det är byggt för kodagenter: de öppnar en session, tar ögonblicksbilder, klickar och skriver, och exporterar det de gjorde som ett test. Se [wdio session](/docs/session) för arbetsflödet och [wdio session-kommandon](/docs/session-commands) för alla åtgärder.

```sh
npx wdio session --help
```

## Nästa steg

- [Konfigurationsfil](/docs/configurationfile): alla alternativ i `wdio.conf.ts`
- [Kom igång](/docs/gettingstarted): sätt upp ett projekt med guiden
- [REPL-gränssnitt](/docs/repl): felsök kommandon interaktivt
- [wdio session](/docs/session): styr en webbläsare från skalet eller en agent