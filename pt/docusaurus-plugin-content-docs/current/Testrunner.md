---
id: testrunner
title: Testrunner
description: "Instale o testrunner do WDIO a partir de @wdio/cli e use seus comandos config, run, install, repl e session para configurar e executar suítes de teste."
---

O testrunner do WebdriverIO executa sua suíte de testes a partir de um arquivo de configuração. Ele inicia um worker por capability, conecta seu framework, serviços e reporters, e executa as specs em paralelo. Use-o em todo projeto de teste; use o [modo standalone](/docs/setuptypes) somente quando você incorporar o WebdriverIO às suas próprias ferramentas.

O testrunner vem no pacote `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` executa a mesma CLI quando o `@wdio/cli` ainda não está instalado. O npm instala o pacote sem escopo [`wdio`](https://www.npmjs.com/package/wdio), e esse pacote inicia o `@wdio/cli`.

Para configurar um novo projeto, execute o assistente de configuração. Ele faz algumas perguntas, instala os pacotes e gera um `wdio.conf.ts`:

```sh
npx wdio config
```

Em seguida, execute seus testes:

```sh
npx wdio run wdio.conf.ts
```

`run` é o comando padrão, então `npx wdio wdio.conf.ts` faz o mesmo. Nas suas specs, importe a sessão de `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Veja [Arquivo de Configuração](/docs/configurationfile) para todas as opções do `wdio.conf.ts`.

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

Cada comando exibe suas próprias opções com `--help`, por exemplo, `npx wdio run --help`.

### `wdio config`

O comando `config` executa o assistente de configuração e cria um `wdio.conf.ts` (ou `wdio.conf.js`) com base nas suas respostas.

```sh
npx wdio config
```

Passe `--yes` para usar os padrões (Mocha, Chrome e page objects) sem perguntas. Cada pergunta do assistente também tem uma flag, então você pode responder algumas ou todas elas na linha de comando:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Opções:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

O assistente instala os pacotes com o gerenciador de pacotes que o executa: `pnpm wdio config` usa pnpm, `yarn wdio config` usa Yarn e `npx` usa npm.

`npx wdio config --help` lista as flags do assistente e os valores que elas aceitam. Uma flag para uma pergunta que o assistente não faz para a sua configuração gera um erro, assim como um valor que ele não oferece. Veja [Responda ao assistente com flags](/docs/gettingstarted#answer-the-wizard-with-flags) para exemplos.

### `wdio run`

> Este é o comando padrão para executar sua configuração.

O comando `run` carrega seu arquivo de configuração e executa seus testes. As opções de linha de comando sobrescrevem as opções correspondentes no arquivo de configuração.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Opções:

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

Exemplos:

```sh
# executa uma suíte
npx wdio run wdio.conf.ts --suite login

# executa o primeiro de quatro shards, por exemplo, em uma matriz de CI
npx wdio run wdio.conf.ts --shard 1/4

# executa todos os navegadores em modo headless, ou força o modo com interface
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# define opções do framework com notação de ponto
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# executa um cenário do Cucumber pelo número da linha
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# usa um tsconfig.json personalizado
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# pausa testes com falha e browser.debug() para que um agente de código possa inspecioná-los
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` sobrescreve a configuração [`tsConfigPath`](/docs/configurationfile) do seu arquivo de configuração. Veja [TypeScript](/docs/typescript) para saber como o WebdriverIO compila suas specs com `tsx`.

### `wdio install`

O comando `install` adiciona um reporter, serviço, framework, plugin ou runner a um projeto existente. Ele instala o pacote, adiciona-o ao seu `package.json` e atualiza seu arquivo de configuração.

```sh
npx wdio install service sauce        # instala @wdio/sauce-service
npx wdio install reporter dot         # instala @wdio/dot-reporter
npx wdio install framework mocha      # instala @wdio/mocha-framework
```

Os pacotes são instalados com o gerenciador de pacotes que executa o comando, então `pnpm wdio install reporter dot` instala com pnpm e `yarn wdio install reporter dot` com Yarn. `npx` e chamadas diretas usam npm.

Se o seu arquivo de configuração não for `wdio.conf.(js|ts|cjs|mjs)` na pasta atual, passe sua localização:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` exibe todos os pacotes suportados com seus nomes no npm.

#### Lista de serviços suportados

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Lista de reporters suportados

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Lista de frameworks suportados

```
mocha, jasmine, cucumber
```

#### Lista de plugins e runners suportados

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

O comando `repl` inicia uma sessão WebDriver e abre um prompt interativo onde você executa comandos do WebdriverIO. Use-o para experimentar seletores e comandos sem escrever uma spec. Veja [Interface REPL](/docs/repl) para mais informações.

Inicie um Chrome local:

```sh
npx wdio repl chrome
```

Execute na nuvem da Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Use uma capability do seu arquivo de configuração, pelo índice ou pelo seu nome multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Conecte-se a uma [`wdio session`](/docs/session) em execução em vez de iniciar um novo navegador:

```sh
npx wdio repl --session default
```

`repl` aceita as opções de conexão do [comando run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) e estas opções para dispositivos móveis. Use as formas longas `--user` e `--udid`: `-u` é o alias curto de ambas.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

O comando `session` controla um navegador, aplicativo móvel ou aplicativo desktop a partir do shell, um comando por chamada. Ele foi criado para agentes de código: eles abrem uma sessão, tiram snapshots, clicam e digitam, e exportam o que fizeram como um teste. Veja [wdio session](/docs/session) para o fluxo de trabalho e [comandos do wdio session](/docs/session-commands) para todas as ações.

```sh
npx wdio session --help
```

## Próximos passos

- [Arquivo de Configuração](/docs/configurationfile): todas as opções do `wdio.conf.ts`
- [Primeiros Passos](/docs/gettingstarted): configure um projeto com o assistente
- [Interface REPL](/docs/repl): depure comandos de forma interativa
- [wdio session](/docs/session): controle um navegador a partir do shell ou de um agente