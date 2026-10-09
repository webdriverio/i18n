---
id: testrunner
title: Тестраннер
description: "Установите тестраннер WDIO из @wdio/cli и используйте его команды config, run, install, repl и session для настройки и запуска наборов тестов."
---

Тестраннер WebdriverIO запускает ваш набор тестов на основе конфигурационного файла. Он запускает по одному воркеру на каждую capability, подключает ваш фреймворк, сервисы и репортеры, а также выполняет спецификации параллельно. Используйте его для каждого тестового проекта; используйте [автономный режим](/docs/setuptypes) только тогда, когда встраиваете WebdriverIO в собственные инструменты.

Тестраннер поставляется в пакете `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

`npx wdio` запускает тот же CLI, даже если `@wdio/cli` ещё не установлен. npm устанавливает пакет без области видимости [`wdio`](https://www.npmjs.com/package/wdio), и этот пакет запускает `@wdio/cli`.

Чтобы настроить новый проект, запустите мастер конфигурации. Он задаст несколько вопросов, установит пакеты и создаст файл `wdio.conf.ts`:

```sh
npx wdio config
```

Затем запустите тесты:

```sh
npx wdio run wdio.conf.ts
```

`run` — команда по умолчанию, поэтому `npx wdio wdio.conf.ts` делает то же самое. В своих спецификациях импортируйте сессию из `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Все параметры `wdio.conf.ts` описаны в разделе [Конфигурационный файл](/docs/configurationfile).

## Команды

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

Каждая команда выводит собственные параметры с помощью `--help`, например `npx wdio run --help`.

### `wdio config`

Команда `config` запускает мастер конфигурации и создаёт `wdio.conf.ts` (или `wdio.conf.js`) на основе ваших ответов.

```sh
npx wdio config
```

Передайте `--yes`, чтобы использовать значения по умолчанию (Mocha, Chrome и page objects) без вопросов. Для каждого вопроса мастера также есть флаг, поэтому вы можете ответить на некоторые или все вопросы в командной строке:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Параметры:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

Мастер устанавливает пакеты с помощью того менеджера пакетов, который его запускает: `pnpm wdio config` использует pnpm, `yarn wdio config` использует Yarn, а `npx` использует npm.

`npx wdio config --help` выводит список флагов мастера и допустимых для них значений. Флаг для вопроса, который мастер не задаёт при вашей конфигурации, считается ошибкой, как и значение, которое он не предлагает. Примеры см. в разделе [Ответы на вопросы мастера с помощью флагов](/docs/gettingstarted#answer-the-wizard-with-flags).

### `wdio run`

> Это команда по умолчанию для запуска вашей конфигурации.

Команда `run` загружает ваш конфигурационный файл и запускает тесты. Параметры командной строки переопределяют соответствующие параметры в конфигурационном файле.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Параметры:

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

Примеры:

```sh
# запустить один набор
npx wdio run wdio.conf.ts --suite login

# запустить первый из четырёх шардов, например в матрице CI
npx wdio run wdio.conf.ts --shard 1/4

# запустить все браузеры в headless-режиме или принудительно с интерфейсом
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# задать параметры фреймворка с помощью точечной нотации
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# запустить сценарий Cucumber по номеру строки
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# использовать собственный tsconfig.json
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# приостановить упавшие тесты и browser.debug(), чтобы ИИ-агент мог их изучить
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` переопределяет настройку [`tsConfigPath`](/docs/configurationfile) вашей конфигурации. О том, как WebdriverIO компилирует ваши спецификации с помощью `tsx`, см. в разделе [TypeScript](/docs/typescript).

### `wdio install`

Команда `install` добавляет репортер, сервис, фреймворк, плагин или раннер в существующий проект. Она устанавливает пакет, добавляет его в ваш `package.json` и обновляет конфигурационный файл.

```sh
npx wdio install service sauce        # устанавливает @wdio/sauce-service
npx wdio install reporter dot         # устанавливает @wdio/dot-reporter
npx wdio install framework mocha      # устанавливает @wdio/mocha-framework
```

Пакеты устанавливаются с помощью того менеджера пакетов, который запускает команду, поэтому `pnpm wdio install reporter dot` устанавливает через pnpm, а `yarn wdio install reporter dot` — через Yarn. `npx` и прямые вызовы используют npm.

Если ваш конфигурационный файл не является `wdio.conf.(js|ts|cjs|mjs)` в текущей папке, укажите его расположение:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` выводит все поддерживаемые пакеты с их именами в npm.

#### Список поддерживаемых сервисов

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Список поддерживаемых репортеров

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Список поддерживаемых фреймворков

```
mocha, jasmine, cucumber
```

#### Список поддерживаемых плагинов и раннеров

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Команда `repl` запускает сессию WebDriver и открывает интерактивную консоль, в которой можно выполнять команды WebdriverIO. Используйте её, чтобы опробовать селекторы и команды, не создавая спецификацию. Подробнее см. в разделе [Интерфейс REPL](/docs/repl).

Запустить локальный Chrome:

```sh
npx wdio repl chrome
```

Запустить в облаке Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Использовать capability из конфигурационного файла по индексу или по её имени в multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Подключиться к запущенной [`wdio session`](/docs/session) вместо запуска нового браузера:

```sh
npx wdio repl --session default
```

`repl` принимает параметры подключения [команды run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) и следующие параметры для мобильных устройств. Используйте длинные формы `--user` и `--udid`: `-u` является коротким псевдонимом для обеих.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Команда `session` управляет браузером, мобильным или десктопным приложением из командной оболочки — по одной команде за вызов. Она создана для ИИ-агентов: они открывают сессию, делают снимки, кликают и вводят текст, а затем экспортируют свои действия в виде теста. Описание рабочего процесса см. в разделе [wdio session](/docs/session), а все действия — в разделе [Команды wdio session](/docs/session-commands).

```sh
npx wdio session --help
```

## Дальнейшие шаги

- [Конфигурационный файл](/docs/configurationfile): все параметры `wdio.conf.ts`
- [Начало работы](/docs/gettingstarted): настройка проекта с помощью мастера
- [Интерфейс REPL](/docs/repl): интерактивная отладка команд
- [wdio session](/docs/session): управление браузером из командной оболочки или агентом