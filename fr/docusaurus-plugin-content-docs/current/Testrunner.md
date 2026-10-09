---
id: testrunner
title: Testrunner
description: "Installez le testrunner WDIO depuis @wdio/cli et utilisez ses commandes config, run, install, repl et session pour configurer et exécuter vos suites de tests."
---

Le testrunner de WebdriverIO exécute votre suite de tests à partir d'un fichier de configuration. Il démarre un worker par capability, met en place votre framework, vos services et vos reporters, et exécute les specs en parallèle. Utilisez-le pour tous vos projets de test ; n'utilisez le [mode standalone](/docs/setuptypes) que si vous intégrez WebdriverIO dans vos propres outils.

Le testrunner est fourni dans le package `@wdio/cli` :

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` exécute la même CLI lorsque `@wdio/cli` n'est pas encore installé. npm installe le package sans scope [`wdio`](https://www.npmjs.com/package/wdio), et ce package démarre `@wdio/cli`.

Pour configurer un nouveau projet, lancez l'assistant de configuration. Il pose quelques questions, installe les packages et génère un `wdio.conf.ts` :

```sh
npx wdio config
```

Ensuite, exécutez vos tests :

```sh
npx wdio run wdio.conf.ts
```

`run` est la commande par défaut, donc `npx wdio wdio.conf.ts` fait la même chose. Dans vos specs, importez la session depuis `@wdio/globals` :

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Consultez [Fichier de configuration](/docs/configurationfile) pour découvrir toutes les options de `wdio.conf.ts`.

## Commandes

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

Chaque commande affiche ses propres options avec `--help`, par exemple `npx wdio run --help`.

### `wdio config`

La commande `config` lance l'assistant de configuration et crée un `wdio.conf.ts` (ou `wdio.conf.js`) en fonction de vos réponses.

```sh
npx wdio config
```

Passez `--yes` pour utiliser les valeurs par défaut (Mocha, Chrome et page objects) sans aucune question. Chaque question de l'assistant possède également un flag, vous pouvez donc répondre à certaines ou à toutes directement en ligne de commande :

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Options :

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

L'assistant installe les packages avec le gestionnaire de packages qui l'exécute : `pnpm wdio config` utilise pnpm, `yarn wdio config` utilise Yarn, et `npx` utilise npm.

`npx wdio config --help` liste les flags de l'assistant et les valeurs qu'ils acceptent. Un flag correspondant à une question que l'assistant ne pose pas pour votre configuration provoque une erreur, tout comme une valeur qu'il ne propose pas. Consultez [Répondre à l'assistant avec des flags](/docs/gettingstarted#answer-the-wizard-with-flags) pour des exemples.

### `wdio run`

> Il s'agit de la commande par défaut pour exécuter votre configuration.

La commande `run` charge votre fichier de configuration et exécute vos tests. Les options de ligne de commande remplacent les options correspondantes du fichier de configuration.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Options :

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

Exemples :

```sh
# exécuter une seule suite
npx wdio run wdio.conf.ts --suite login

# exécuter le premier de quatre shards, par ex. dans une matrice CI
npx wdio run wdio.conf.ts --shard 1/4

# exécuter tous les navigateurs en mode headless, ou forcer le mode avec interface
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# définir les options du framework avec la notation pointée
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# exécuter un scénario Cucumber par numéro de ligne
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# utiliser un tsconfig.json personnalisé
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# mettre en pause les tests en échec et browser.debug() pour qu'un agent de code puisse les inspecter
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` remplace le paramètre [`tsConfigPath`](/docs/configurationfile) de votre configuration. Consultez [TypeScript](/docs/typescript) pour savoir comment WebdriverIO compile vos specs avec `tsx`.

### `wdio install`

La commande `install` ajoute un reporter, un service, un framework, un plugin ou un runner à un projet existant. Elle installe le package, l'ajoute à votre `package.json` et met à jour votre fichier de configuration.

```sh
npx wdio install service sauce        # installe @wdio/sauce-service
npx wdio install reporter dot         # installe @wdio/dot-reporter
npx wdio install framework mocha      # installe @wdio/mocha-framework
```

Les packages sont installés avec le gestionnaire de packages qui exécute la commande : `pnpm wdio install reporter dot` installe avec pnpm et `yarn wdio install reporter dot` avec Yarn. `npx` et les appels directs utilisent npm.

Si votre fichier de configuration n'est pas `wdio.conf.(js|ts|cjs|mjs)` dans le dossier courant, indiquez son emplacement :

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` affiche tous les packages pris en charge avec leur nom npm.

#### Liste des services pris en charge

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Liste des reporters pris en charge

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Liste des frameworks pris en charge

```
mocha, jasmine, cucumber
```

#### Liste des plugins et runners pris en charge

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

La commande `repl` démarre une session WebDriver et ouvre une invite interactive dans laquelle vous exécutez des commandes WebdriverIO. Utilisez-la pour essayer des sélecteurs et des commandes sans écrire de spec. Consultez [Interface REPL](/docs/repl) pour en savoir plus.

Démarrer un Chrome local :

```sh
npx wdio repl chrome
```

Exécuter dans le cloud Sauce Labs :

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Utiliser une capability de votre fichier de configuration, par son index ou par son nom multiremote :

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Se connecter à une [`wdio session`](/docs/session) en cours au lieu de démarrer un nouveau navigateur :

```sh
npx wdio repl --session default
```

`repl` accepte les options de connexion de la [commande run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) ainsi que ces options mobiles. Utilisez les formes longues `--user` et `--udid` : `-u` est l'alias court des deux.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

La commande `session` pilote un navigateur, une application mobile ou une application de bureau depuis le shell, une commande par appel. Elle est conçue pour les agents de code : ils ouvrent une session, prennent des snapshots, cliquent et saisissent du texte, puis exportent ce qu'ils ont fait sous forme de test. Consultez [wdio session](/docs/session) pour le workflow et [commandes wdio session](/docs/session-commands) pour toutes les actions.

```sh
npx wdio session --help
```

## Étapes suivantes

- [Fichier de configuration](/docs/configurationfile) : toutes les options de `wdio.conf.ts`
- [Premiers pas](/docs/gettingstarted) : configurer un projet avec l'assistant
- [Interface REPL](/docs/repl) : déboguer des commandes de manière interactive
- [wdio session](/docs/session) : piloter un navigateur depuis le shell ou un agent