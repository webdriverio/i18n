---
id: testrunner
title: Testrunner
description: "Installa il testrunner WDIO da @wdio/cli e usa i suoi comandi config, run, install, repl e session per configurare ed eseguire le suite di test."
---

Il testrunner di WebdriverIO esegue la tua suite di test a partire da un file di configurazione. Avvia un worker per ogni capability, collega il tuo framework, i servizi e i reporter, ed esegue gli spec in parallelo. Usalo per ogni progetto di test; usa la [modalità standalone](/docs/setuptypes) solo quando integri WebdriverIO nei tuoi strumenti.

Il testrunner è incluso nel pacchetto `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` esegue la stessa CLI quando `@wdio/cli` non è ancora installato. npm installa il pacchetto senza scope [`wdio`](https://www.npmjs.com/package/wdio), e quel pacchetto avvia `@wdio/cli`.

Per configurare un nuovo progetto, esegui la procedura guidata di configurazione. Pone alcune domande, installa i pacchetti e scrive un `wdio.conf.ts`:

```sh
npx wdio config
```

Poi esegui i tuoi test:

```sh
npx wdio run wdio.conf.ts
```

`run` è il comando predefinito, quindi `npx wdio wdio.conf.ts` fa la stessa cosa. Nei tuoi spec, importa la sessione da `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Consulta [File di configurazione](/docs/configurationfile) per tutte le opzioni di `wdio.conf.ts`.

## Comandi

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

Ogni comando mostra le proprie opzioni con `--help`, ad esempio `npx wdio run --help`.

### `wdio config`

Il comando `config` esegue la procedura guidata di configurazione e crea un `wdio.conf.ts` (o `wdio.conf.js`) in base alle tue risposte.

```sh
npx wdio config
```

Passa `--yes` per usare i valori predefiniti (Mocha, Chrome e page object) senza richieste. Ogni domanda della procedura guidata ha anche un flag, quindi puoi rispondere ad alcune o a tutte dalla riga di comando:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Opzioni:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

La procedura guidata installa i pacchetti con il package manager che la esegue: `pnpm wdio config` usa pnpm, `yarn wdio config` usa Yarn e `npx` usa npm.

`npx wdio config --help` elenca i flag della procedura guidata e i valori che accettano. Un flag per una domanda che la procedura guidata non pone per la tua configurazione genera un errore, così come un valore che non viene offerto. Consulta [Rispondere alla procedura guidata con i flag](/docs/gettingstarted#answer-the-wizard-with-flags) per alcuni esempi.

### `wdio run`

> Questo è il comando predefinito per eseguire la tua configurazione.

Il comando `run` carica il tuo file di configurazione ed esegue i tuoi test. Le opzioni della riga di comando sovrascrivono le opzioni corrispondenti nel file di configurazione.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Opzioni:

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

Esempi:

```sh
# esegui una suite
npx wdio run wdio.conf.ts --suite login

# esegui il primo di quattro shard, ad es. in una matrice CI
npx wdio run wdio.conf.ts --shard 1/4

# esegui tutti i browser in modalità headless, o forza la modalità con interfaccia
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# imposta le opzioni del framework con la notazione a punti
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# esegui uno scenario Cucumber tramite numero di riga
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# usa un tsconfig.json personalizzato
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# metti in pausa i test falliti e browser.debug() in modo che un coding agent possa ispezionarli
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` sovrascrive l'impostazione [`tsConfigPath`](/docs/configurationfile) della tua configurazione. Consulta [TypeScript](/docs/typescript) per sapere come WebdriverIO compila i tuoi spec con `tsx`.

### `wdio install`

Il comando `install` aggiunge un reporter, un servizio, un framework, un plugin o un runner a un progetto esistente. Installa il pacchetto, lo aggiunge al tuo `package.json` e aggiorna il tuo file di configurazione.

```sh
npx wdio install service sauce        # installa @wdio/sauce-service
npx wdio install reporter dot         # installa @wdio/dot-reporter
npx wdio install framework mocha      # installa @wdio/mocha-framework
```

I pacchetti vengono installati con il package manager che esegue il comando, quindi `pnpm wdio install reporter dot` installa con pnpm e `yarn wdio install reporter dot` con Yarn. `npx` e le chiamate dirette usano npm.

Se il tuo file di configurazione non è `wdio.conf.(js|ts|cjs|mjs)` nella cartella corrente, passa il suo percorso:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` mostra ogni pacchetto supportato con il suo nome npm.

#### Elenco dei servizi supportati

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Elenco dei reporter supportati

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Elenco dei framework supportati

```
mocha, jasmine, cucumber
```

#### Elenco dei plugin e runner supportati

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Il comando `repl` avvia una sessione WebDriver e apre un prompt interattivo in cui puoi eseguire comandi WebdriverIO. Usalo per provare selettori e comandi senza scrivere uno spec. Consulta [Interfaccia REPL](/docs/repl) per maggiori informazioni.

Avvia un Chrome locale:

```sh
npx wdio repl chrome
```

Esegui nel cloud di Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Usa una capability dal tuo file di configurazione, tramite indice o tramite il suo nome multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Collegati a una [`wdio session`](/docs/session) in esecuzione invece di avviare un nuovo browser:

```sh
npx wdio repl --session default
```

`repl` accetta le opzioni di connessione del [comando run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) e queste opzioni per dispositivi mobili. Usa le forme estese `--user` e `--udid`: `-u` è l'alias breve di entrambe.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Il comando `session` controlla un browser, un'app mobile o un'app desktop dalla shell, un comando per ogni chiamata. È pensato per i coding agent: aprono una sessione, acquisiscono snapshot, cliccano e digitano, ed esportano ciò che hanno fatto come test. Consulta [wdio session](/docs/session) per il flusso di lavoro e [comandi di wdio session](/docs/session-commands) per ogni azione.

```sh
npx wdio session --help
```

## Prossimi passi

- [File di configurazione](/docs/configurationfile): tutte le opzioni di `wdio.conf.ts`
- [Per iniziare](/docs/gettingstarted): configura un progetto con la procedura guidata
- [Interfaccia REPL](/docs/repl): esegui il debug dei comandi in modo interattivo
- [wdio session](/docs/session): controlla un browser dalla shell o da un agent