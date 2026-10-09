---
id: gettingstarted
title: Начало работы
description: Создайте проект WebdriverIO с помощью npm init wdio@latest, запустите свой первый тест и найдите следующее руководство для вашей платформы.
---

Настройте WebdriverIO в существующем или новом проекте одной командой, а затем запустите свой первый тест. Мастер настройки спросит, что вы хотите тестировать (веб, мобильные, десктопные приложения или расширения VS Code), какой фреймворк и репортеры использовать, и установит всё за вас.

:::info
Это документация для WebdriverIO __v10__. Всё ещё используете v9? Воспользуйтесь [документацией v9](https://v9.webdriver.io) или следуйте [руководству по миграции на v10](/docs/v10-migration).
:::

:::tip Используете ИИ-агента для написания кода?
Укажите ему [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) или подключите MCP-сервер документации по адресу `https://webdriver.io/mcp`. Подробнее см. [WebdriverIO для ИИ-агентов](/docs/ai-agents).
:::

## Инициализация WebdriverIO

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) добавляет полную настройку WebdriverIO в существующий или новый проект. В корневом каталоге существующего проекта выполните:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

или, если вы хотите создать новый проект:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

или, если вы хотите создать новый проект:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

или, если вы хотите создать новый проект:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

или, если вы хотите создать новый проект:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Эта единственная команда загружает инструмент WebdriverIO CLI и запускает мастер настройки, который поможет вам сконфигурировать набор тестов.

<CreateProjectAnimation />

Мастер задаст ряд вопросов, которые проведут вас через процесс настройки. Вы можете передать параметр `--yes`, чтобы выбрать настройку по умолчанию, которая использует Mocha с Chrome и паттерн [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Ответы на вопросы мастера с помощью флагов

Для каждого вопроса мастера существует флаг командной строки. Флаг отвечает на свой вопрос, и мастер задаёт только остальные. Вместе с `--yes` мастер использует значения по умолчанию для остальных вопросов и ничего не спрашивает — именно это нужно ИИ-агенту или CI-задаче:

```sh
# Cucumber на JavaScript с репортерами spec и JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox и Edge вместо Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Android-приложение с Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Тесты компонентов React
npm init wdio@latest . -- --yes --runner component --preset react

# Записать конфигурацию, но установить зависимости самостоятельно
npm init wdio@latest . -- --yes --no-npm-install
```

В Yarn, pnpm и bun передавайте флаги без разделителя `--`, например `pnpm create wdio@latest . --yes --framework cucumber`.

Наиболее распространённые флаги:

| Флаг | Значения |
| --- | --- |
| `--runner` | `e2e` (по умолчанию), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (по умолчанию), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript используется по умолчанию, если в проекте есть `tsconfig.json` |
| `--browsers` | Список через запятую из `chrome` (по умолчанию), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (по умолчанию), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, с `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, с `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Короткие имена через запятую, например `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Записать раздел `AGENTS.md` и навык `wdio-session` (включено по умолчанию) |
| `--npm-install` / `--no-npm-install` | Установить зависимости (включено по умолчанию) |

`npm init wdio@latest -- --help` выводит список всех флагов, допустимых для них значений и вопросов, на которые они отвечают. Логические флаги принимают префикс `--no-`. Те же флаги работают с `npx wdio config`.

Мастер проверяет каждый флаг на соответствие вашей настройке. Неизвестное значение, флаг для вопроса, который мастер не задал бы, или значение, которое он не предложил бы для вашей настройки, останавливают его с кодом выхода 2 до записи каких-либо файлов:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Ручная установка CLI

Вы также можете добавить пакет CLI в свой проект вручную:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # выводит, например, `8.13.10`

# запуск мастера настройки
npx wdio config
```

## Запуск тестов

Вы можете запустить набор тестов с помощью команды `run`, указав только что созданный конфигурационный файл WebdriverIO:

```sh
npx wdio run ./wdio.conf.js
```

Если вы хотите запустить определённые тестовые файлы, добавьте параметр `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

или определите наборы (suites) в конфигурационном файле и запустите только тестовые файлы, входящие в набор:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Запуск в скрипте

Если вы хотите использовать WebdriverIO как движок автоматизации в [автономном режиме](/docs/setuptypes#standalone-mode) внутри скрипта Node.JS, вы также можете напрямую установить WebdriverIO и использовать его как пакет, например, для создания скриншота веб-сайта:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Примечание:__ все команды WebdriverIO асинхронны и должны корректно обрабатываться с помощью [`async/await`](https://javascript.info/async-await).

## Запись тестов

WebdriverIO предоставляет инструменты, которые помогут вам начать работу, записывая ваши действия на экране и автоматически генерируя тестовые скрипты WebdriverIO. Подробнее см. [Запись тестов с помощью Chrome DevTools Recorder](/docs/record).

## Системные требования

Вам потребуется установленный [Node.js](http://nodejs.org).

- Установите как минимум v22.19.0 или выше, так как это самая старая поддерживаемая LTS-версия
- Официально поддерживаются только релизы, которые являются или станут LTS-релизами

Если Node не установлен в вашей системе, мы рекомендуем воспользоваться таким инструментом, как [NVM](https://github.com/creationix/nvm) или [Volta](https://volta.sh/), для управления несколькими активными версиями Node.js. NVM — популярный выбор, но Volta также является хорошей альтернативой.

## Посмотрите вводное видео

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Больше видео доступно на [официальном YouTube-канале](https://youtube.com/@webdriverio).

## Следующие шаги

- Выберите свою платформу: [Веб-браузеры](/docs/platforms/web), [Мобильные приложения](/docs/platforms/mobile), [Десктопные приложения](/docs/platforms/desktop) или [Расширения и редакторы](/docs/platforms/apps-and-extensions)
- Узнайте, как [выбирать элементы](/docs/selectors) и писать [утверждения](/docs/assertion)
- Настройте тестовый раннер в [`wdio.conf.ts`](/docs/configurationfile)
- Получите помощь в [Discord](https://discord.webdriver.io)