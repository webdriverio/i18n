---
id: testrunner
title: Testrunner
description: "Instala el testrunner de WDIO desde @wdio/cli y usa sus comandos config, run, install, repl y session para configurar y ejecutar suites de pruebas."
---

El testrunner de WebdriverIO ejecuta tu suite de pruebas a partir de un archivo de configuración. Inicia un worker por cada capability, conecta tu framework, servicios y reporters, y ejecuta los specs en paralelo. Úsalo en todos tus proyectos de pruebas; usa el [modo standalone](/docs/setuptypes) solo cuando integres WebdriverIO en tus propias herramientas.

El testrunner se distribuye en el paquete `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` ejecuta la misma CLI cuando `@wdio/cli` aún no está instalado. npm instala el paquete sin scope [`wdio`](https://www.npmjs.com/package/wdio), y ese paquete inicia `@wdio/cli`.

Para configurar un proyecto nuevo, ejecuta el asistente de configuración. Te hace algunas preguntas, instala los paquetes y genera un `wdio.conf.ts`:

```sh
npx wdio config
```

Después ejecuta tus pruebas:

```sh
npx wdio run wdio.conf.ts
```

`run` es el comando por defecto, así que `npx wdio wdio.conf.ts` hace lo mismo. En tus specs, importa la sesión desde `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Consulta [Archivo de configuración](/docs/configurationfile) para ver todas las opciones de `wdio.conf.ts`.

## Comandos

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

Cada comando muestra sus propias opciones con `--help`, p. ej. `npx wdio run --help`.

### `wdio config`

El comando `config` ejecuta el asistente de configuración y crea un `wdio.conf.ts` (o `wdio.conf.js`) según tus respuestas.

```sh
npx wdio config
```

Pasa `--yes` para usar los valores por defecto (Mocha, Chrome y page objects) sin preguntas. Cada pregunta del asistente también tiene un flag, así que puedes responder algunas o todas desde la línea de comandos:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Opciones:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

El asistente instala los paquetes con el gestor de paquetes que lo ejecuta: `pnpm wdio config` usa pnpm, `yarn wdio config` usa Yarn y `npx` usa npm.

`npx wdio config --help` lista los flags del asistente y los valores que aceptan. Usar un flag para una pregunta que el asistente no hace en tu configuración es un error, al igual que un valor que no ofrece. Consulta [Responder al asistente con flags](/docs/gettingstarted#answer-the-wizard-with-flags) para ver ejemplos.

### `wdio run`

> Este es el comando por defecto para ejecutar tu configuración.

El comando `run` carga tu archivo de configuración y ejecuta tus pruebas. Las opciones de línea de comandos sobrescriben las opciones correspondientes del archivo de configuración.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Opciones:

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

Ejemplos:

```sh
# ejecutar una suite
npx wdio run wdio.conf.ts --suite login

# ejecutar el primero de cuatro shards, p. ej. en una matriz de CI
npx wdio run wdio.conf.ts --shard 1/4

# ejecutar todos los navegadores en modo headless, o forzar el modo con interfaz
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# establecer opciones del framework con notación de punto
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# ejecutar un escenario de Cucumber por número de línea
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# usar un tsconfig.json personalizado
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# pausar las pruebas fallidas y browser.debug() para que un agente de programación pueda inspeccionarlas
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` sobrescribe el ajuste [`tsConfigPath`](/docs/configurationfile) de tu configuración. Consulta [TypeScript](/docs/typescript) para saber cómo WebdriverIO compila tus specs con `tsx`.

### `wdio install`

El comando `install` añade un reporter, servicio, framework, plugin o runner a un proyecto existente. Instala el paquete, lo añade a tu `package.json` y actualiza tu archivo de configuración.

```sh
npx wdio install service sauce        # instala @wdio/sauce-service
npx wdio install reporter dot         # instala @wdio/dot-reporter
npx wdio install framework mocha      # instala @wdio/mocha-framework
```

Los paquetes se instalan con el gestor de paquetes que ejecuta el comando, así que `pnpm wdio install reporter dot` instala con pnpm y `yarn wdio install reporter dot` con Yarn. `npx` y las llamadas directas usan npm.

Si tu archivo de configuración no es `wdio.conf.(js|ts|cjs|mjs)` en la carpeta actual, indica su ubicación:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` muestra todos los paquetes soportados con su nombre en npm.

#### Lista de servicios soportados

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Lista de reporters soportados

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Lista de frameworks soportados

```
mocha, jasmine, cucumber
```

#### Lista de plugins y runners soportados

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

El comando `repl` inicia una sesión de WebDriver y abre un prompt interactivo donde puedes ejecutar comandos de WebdriverIO. Úsalo para probar selectores y comandos sin escribir un spec. Consulta [Interfaz REPL](/docs/repl) para más información.

Iniciar un Chrome local:

```sh
npx wdio repl chrome
```

Ejecutar en la nube de Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Usar una capability de tu archivo de configuración, por índice o por su nombre de multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Conectarse a una [`wdio session`](/docs/session) en ejecución en lugar de iniciar un navegador nuevo:

```sh
npx wdio repl --session default
```

`repl` acepta las opciones de conexión del [comando run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) y estas opciones para móviles. Usa las formas largas `--user` y `--udid`: `-u` es el alias corto de ambas.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

El comando `session` controla un navegador, una app móvil o una app de escritorio desde la terminal, un comando por llamada. Está pensado para agentes de programación: abren una sesión, toman snapshots, hacen clic y escriben, y exportan lo que hicieron como una prueba. Consulta [wdio session](/docs/session) para conocer el flujo de trabajo y [comandos de wdio session](/docs/session-commands) para ver todas las acciones.

```sh
npx wdio session --help
```

## Próximos pasos

- [Archivo de configuración](/docs/configurationfile): todas las opciones de `wdio.conf.ts`
- [Primeros pasos](/docs/gettingstarted): configura un proyecto con el asistente
- [Interfaz REPL](/docs/repl): depura comandos de forma interactiva
- [wdio session](/docs/session): controla un navegador desde la terminal o un agente