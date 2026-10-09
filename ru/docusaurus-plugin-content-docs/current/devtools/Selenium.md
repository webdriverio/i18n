---
id: selenium
title: Selenium DevTools
description: "Добавьте отладочный интерфейс DevTools в тесты Selenium WebDriver на Node.js или Python с любым тест-раннером и включите режим трассировки."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Адаптер Selenium WebDriver для [WebdriverIO DevTools](https://github.com/webdriverio/devtools) — тот же визуальный отладочный интерфейс для любого теста Selenium на **Node.js** или **Python**, независимо от тест-раннера.

В Node.js поддерживаются **Mocha**, **Jest**, **Cucumber** и обычный скрипт: плагин сам определяет раннер и соответствующим образом размечает границы тестов. В Python поддерживаются **pytest** и обычный скрипт, причём с pytest ваши тестовые файлы вообще не нужно менять.

Выберите язык на вкладках ниже — выбор сохранится по всей странице.

## Установка

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Требуются Python 3.10+ и `selenium>=4.44`.** Оба требования объявлены в метаданных пакета, поэтому pip проверяет их сам, а не оставляет вас наедине с пустой вкладкой Network во время выполнения. Захват сети подписывается через публичный API событий BiDi, который selenium перегенерировал в версии 4.44; приватное соединение, которое он заменил, было удалено в том же релизе, и именно 4.44 определяет минимальную версию Python.

</TabItem>
</Tabs>

## Настройка

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Каждый блок ниже — **полный пример, готовый к копированию**, включая вызов `DevTools.configure(...)`. Выберите свой раннер, вставьте фрагмент в проект и запустите.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Запуск:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Альтернатива: не импортируйте плагин в каждом файле, а используйте `mocha --require @wdio/selenium-devtools`, чтобы загрузить его один раз на весь запуск.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Запуск (для ESM нужен экспериментальный флаг):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Из-за раздельной структуры Cucumber понадобятся три небольших файла: один для загрузки плагина, один для World/хуков и один для определений шагов.

`features/support/setup.js` — загрузка плагина и однократная настройка:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` — жизненный цикл драйвера:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` — подключите файл настройки **первым**, чтобы плагин пропатчил Selenium до выполнения любого шага:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Запуск:

```bash
cucumber-js --config cucumber.json
```

### Обычный скрипт Node (без тест-раннера)

Если вы запускаете `node tests/google.test.js` напрямую, у плагина нет раннера, к которому можно автоматически подключиться. По умолчанию в панели будет одна строка «Selenium Session». Чтобы получить именованную границу теста, оберните свой код вызовами `DevTools.startTest` / `endTest`:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // необязательно — задаёт имя строки теста

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Используйте `startTest` / `endTest` только в обычных скриптах Node. В Mocha / Jest / Cucumber плагин уже знает, когда каждый тест начинается и заканчивается, — ручной вызов создаст дублирующиеся строки.

</TabItem>
<TabItem value="python" label="Python">

### pytest

В тестовых файлах ничего добавлять не нужно — плагин обнаруживается автоматически, а флаг включает его для запуска:

```bash
pytest --devtools tests/              # живая панель
pytest --devtools-trace tests/        # вместо этого записать архив трассировки (подразумевает --devtools)
```

Или зафиксируйте выбор в конфигурации, чтобы никому не приходилось помнить о флаге:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # архив трассировки вместо панели
# devtools_trace_granularity = "test"            # ... по одному архиву на тест
# devtools_trace_policy = "retain-on-failure"    # ... сохраняя только упавшие
```

`pytest.ini` с секцией `[pytest]` принимает те же ключи. Два параметра трассировки описаны в разделе [Сколько архивов и какие сохранять](#how-many-archives-and-which-ones-to-keep).

Захват всегда включается явно — установка пакета никогда не должна менять поведение существующего набора тестов. Различается лишь то, *как* вы даёте согласие:

| Как включить | Область действия |
|---|---|
| `--devtools` / `--devtools-trace` | этот запуск |
| `devtools` / `devtools_trace` в `[tool.pytest.ini_options]` | этот проект |
| `DEVTOOLS_ENABLE=1` (или `DEVTOOLS_PORT=<n>`, который также подключается к уже запущенной панели) | эта оболочка — для CI |

Приоритет от высшего к низшему: CLI, затем ini, затем окружение. `pytest -o devtools=false` отключает настройку проекта по умолчанию для одного запуска, поэтому флага `--no-devtools` нет. `DEVTOOLS_TRACE=1` выбирает режим трассировки, но сам по себе **не** включает захват, поэтому экспорт этой переменной для ваших собственных скриптов никогда не приведёт к захвату запуска pytest, о котором вы не просили.

В живом режиме панель открывается в отдельном окне браузера и **остаётся открытой после запуска**, чтобы вы могли изучить произошедшее; закройте её (или нажмите `Ctrl-C`), чтобы завершить. Два вида запусков не захватываются, даже если вы включили захват: `--collect-only`, при котором ничего не выполняется, и запуск, не собравший ни одного теста, — иначе опечатка в пути оставила бы ваш терминал висеть на пустой панели.

### Обычный скрипт Python (без тест-раннера)

Две строки вокруг вашего существующего кода Selenium:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # открыть панель, захватывать каждую команду
# devtools.enable(trace=True)         # или: записать trace.zip и не открывать окно

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # оставить UI открытым для изучения (ничего не делает, если окно не открыто)
devtools.disable()
```

Если бэкенд не удаётся запустить или до него невозможно достучаться, `enable()` выводит предупреждение и возвращает `None`. Захват пропускается, а тесты всё равно выполняются — отсутствие панели никогда не роняет набор тестов.

### Параллельные запуски (`pytest -n`)

**pytest-xdist работает без дополнительной настройки.** Все процессы, отправляющие данные в один запуск, должны договориться об идентификаторе запуска, иначе бэкенд воспринимает каждое подключение как новый запуск и стирает то, что захватил предыдущий. С xdist они договариваются: плагин загружается и в **контроллере**, и включение захвата там определяет идентификатор до того, как xdist запустит воркеры, — воркеры являются дочерними процессами и наследуют его.

Что действительно воспринимается как отдельные запуски: два независимых вызова `pytest` или воркер, запущенный без этого окружения. Экспортируйте `DEVTOOLS_RUN_ID` сами, чтобы объединить такие процессы в один запуск.

</TabItem>
</Tabs>

## Параметры конфигурации {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Параметр | Тип | По умолчанию | Описание |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Порт сервера бэкенда DevTools. Автоматически увеличивается, если уже занят. |
| `hostname` | `string` | `'localhost'` | Имя хоста, к которому привязывается сервер бэкенда. |
| `openUi` | `boolean` | `true` | Автоматически открывать интерфейс DevTools в новом окне Chrome. Для CI установите `false`. |
| `captureScreenshots` | `boolean` | `true` | Делать скриншот после каждой команды WebDriver. |
| `headless` | `boolean` | `false` | Запускать **тестовый** браузер в headless-режиме (внедряет `--headless=old`). На окно интерфейса DevTools не влияет. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Запись видео `.webm` для каждой сессии. Параметры совпадают с описанными на странице [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | авто | Шаблон команды для повторного запуска отдельного теста. Подставляется `{{testName}}`. Если не указан, выводится автоматически из argv раннера. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` открывает интерфейс DevTools; `trace` пропускает его и вместо этого записывает переносимый артефакт. См. [Режим трассировки](/docs/devtools/wdio/trace-mode). Переопределяет `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Структура артефакта трассировки. Применяется только при `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Одна трассировка на сессию / spec-файл / тест. `'test'` записывает каждую в `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Применяется только при `mode: 'trace'`. См. [Режим трассировки](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Какие трассировки сохранять. Используется вместе с `traceGranularity: 'test'`. Применяется только при `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Записывать в трассировку плотный непрерывный скринкаст для покадровой перемотки в плеере. Применяется только при `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Режим трассировки + `traceGranularity: 'test'`. Скриншот для каждого теста, прикрепляемый к Allure (`image/png`) через `allure-js-commons`, если активен адаптер раннера Allure. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Режим трассировки + `traceGranularity: 'test'`. Видео скринкаста для каждого теста, сохраняемое согласно заданной политике и прикрепляемое к Allure (`video/webm`) через `allure-js-commons`, если активен адаптер раннера Allure. |
| `emitArtifactsManifest` | `boolean` | авто | Записывать рядом с трассировкой манифест `devtools-artifacts-<sessionId>.json` — универсальный индекс, по которому репортеры/CI находят созданные артефакты. По умолчанию выключено; **включается автоматически**, когда активна среда выполнения `allure-js-commons`. Только в режиме трассировки. |
| `captureAssertions` | `boolean` | `true` | Захватывать утверждения `node:assert` (как успешные, так и неуспешные) в виде строк действий трассировки. Установите `false`, чтобы отключить. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Для CI** установите и `headless: true` (скрыть тестовый браузер), и `openUi: false` (не пытаться открывать окно панели — в CI-окружениях нет дисплея). Бэкенд продолжает работать на настроенном порту, так что при необходимости вы сможете открыть интерфейс позже.

</TabItem>
<TabItem value="python" label="Python">

Объекта параметров нет — в тестовом коде не должно появляться ничего специфичного для devtools. В pytest адаптер настраивается так же, как сам pytest; скрипт передаёт именованные аргументы в `enable()`; всё, для чего нет флага, задаётся переменной окружения.

| Флаг pytest | `[tool.pytest.ini_options]` | Действие |
|---|---|---|
| `--devtools` | `devtools = true` | Захватить этот запуск и открыть панель. |
| `--devtools-trace` | `devtools_trace = true` | Захватить этот запуск и записать архив трассировки вместо открытия панели. Подразумевает `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Один архив на весь запуск (`session`, по умолчанию) или по одному на тест. Подразумевает `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Какие архивы стоит сохранять. Подразумевает `--devtools-trace`. См. [Сколько архивов и какие сохранять](#how-many-archives-and-which-ones-to-keep). |

Приоритет от высшего к низшему: CLI, затем ini, затем переменные окружения ниже. `pytest -o devtools=false` отключает настройку проекта по умолчанию для одного запуска, а `pytest -o devtools_trace_policy=on` делает то же самое для любого другого параметра.

| Переменная | Действие |
|---|---|
| `DEVTOOLS_ENABLE=1` | Включить захват, если его ещё не включили флаг или параметр ini. |
| `DEVTOOLS_PORT=<n>` | Подключиться к панели, уже слушающей этот порт; также включает захват. |
| `DEVTOOLS_HOST=<host>` | Хост, на котором доступна панель (по умолчанию `localhost`). |
| `DEVTOOLS_TRACE=1` | Записать архив трассировки вместо открытия панели. Выбирает режим для обычного скрипта; в pytest сама по себе не включает захват запуска. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Режим трассировки: один архив на весь запуск или по одному на тест. Действует как фоновая настройка, поэтому сама по себе никогда не выбирает режим трассировки — используйте вместе с `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Режим трассировки: какие архивы стоит сохранять. Действует как фоновая настройка, поэтому сама по себе никогда не выбирает режим трассировки — используйте вместе с `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Режим трассировки: не включать плотную киноленту в архив. |
| `DEVTOOLS_A11Y=0` | Режим трассировки: пропустить дерево A11y и прямоугольники элементов для каждого действия. |
| `DEVTOOLS_OPEN=0` | Не открывать окно панели (CI). |
| `DEVTOOLS_BIDI=0` | Отключить BiDi, а вместе с ним и захват консоли и сети. |
| `DEVTOOLS_RUN_ID=<id>` | Объединить несколько процессов в один запуск. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Запускать бэкенд явно заданной командой вместо определённой автоматически. |

Бэкенд — это приложение на Node, поэтому **Node.js 22.19 или новее должен быть доступен в любом режиме** — даже в режиме трассировки, где окно панели никогда не открывается. Дело не только в UI: бэкенд раздаёт сборщик для страницы, через его WebSocket проходит весь поток событий, а в режиме трассировки именно он собирает архив. `enable()` заранее проверяет наличие Node и сообщает, чего не хватает, вместо того чтобы позже упасть по таймауту запуска. Адаптер сам находит или запускает бэкенд — см. [запуск бэкенда отдельно](/docs/devtools/dashboard#running-the-backend-on-its-own), если предпочитаете управлять им сами, или укажите в `DEVTOOLS_PORT` уже работающий бэкенд — в этом случае локальный Node не нужен.

### Утверждения

Успешные и неуспешные операторы `assert` отображаются строками с **ожидаемым** (expected) и **фактическим** (actual) значениями, а неудачи попадают на вкладку Errors. В Python `assert` — это оператор, а не вызов, поэтому, в отличие от патчинга `node:assert` в адаптере Node, оборачивать нечего — результат поступает от раннера.

**В pytest** значения берутся из механизма перезаписи утверждений, поэтому каждая строка содержит реальные операнды. Для захвата *успешных* утверждений нужен `enable_assertion_pass_hook` pytest, который плагин включает самостоятельно. Одна оговорка: pytest решает для каждого модуля, *в момент его перезаписи*, генерировать ли этот хук, поэтому модуль, чей перезаписанный байткод был закеширован до установки плагина, продолжит сообщать только о неудачах. Адаптер один раз сообщает об этом при сборе тестов и указывает кеш, который нужно удалить, — и это **не** всегда `__pycache__` рядом с вашими тестами, поскольку `sys.pycache_prefix` (установленный по умолчанию в системном Python на macOS) отправляет все перезаписанные модули в одно центральное дерево.

**В обычном скрипте** механизма перезаписи нет, поэтому результаты берутся из событий строк интерпретатора, а значения читаются из фрейма, который вот-вот выполнит assert. Разрешаются только чтения, которые не могут выполнить ваш код: литерал или локальная переменная разрешаются, атрибут или вызов — нет, поскольку повторное вычисление `driver.current_url` отправило бы ещё одну команду WebDriver.

</TabItem>
</Tabs>

## Режим трассировки {#trace-mode}

Путь headless-захвата в **обоих языках** — окно интерфейса DevTools не открывается, а запуск записывает переносимый архив трассировки в папку `test-results/` той же структуры, что и артефакт трассировки WebdriverIO. Различаются они лишь тем, насколько тонко можно настроить артефакт, и тем, кто его собирает.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

В конце сессии адаптер сам записывает `trace-<sessionId>.zip` (или каталог) в `test-results/` рядом с определённым каталогом тестов / конфигурации.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // необязательно; по умолчанию 'zip'
})
```

В режиме трассировки привязка порта бэкенда, окно UI и параметр `screencast` пропускаются. Полное описание возможностей (содержимое артефакта, просмотрщик, мобильное тестирование, когда выбирать `zip`, а когда `ndjson-directory`) см. на [странице режима трассировки](/docs/devtools/wdio/trace-mode).

### Артефакты для каждого теста и их хранение

При `traceGranularity: 'test'` каждый тест получает собственную папку артефактов, а `tracePolicy` определяет, какие из них сохраняются (например, `retain-on-failure`). В этом режиме также можно делать `screenshot` (PNG) и `video` (`.webm`) для каждого теста и включить плотную `filmstrip`, записываемую в трассировку для покадровой перемотки. Если активен адаптер раннера `allure-js-commons`, трассировки / скриншоты / видео каждого теста прикрепляются прямо к отчёту Allure (и `emitArtifactsManifest` включается автоматически); в противном случае они записываются в `test-results/` и фиксируются в манифесте.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Объекта параметров нет — флаг в pytest, именованный аргумент в скрипте:

```bash
pytest --devtools-trace tests/        # подразумевает --devtools
DEVTOOLS_TRACE=1 python3 login.py     # обычный скрипт; то же, что devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # записать trace.zip вместо открытия панели
```

Архив попадает в `test-results/` рядом с тестовым файлом, из которого пришла первая захваченная команда, — в тот же каталог, куда уже пишутся видео скринкаста, — и называется `trace-<sessionId>.zip` или по имени каждого теста, если вы запросили [по одному архиву на тест](#how-many-archives-and-which-ones-to-keep). Если ни одна команда не несла информацию о расположении в вашем исходном коде, используется `test-results/` в текущем каталоге.

**Окно панели не открывается.** Результатом является артефакт, а живой запуск блокируется на окне, пока вы его не закроете, — окно превратило бы запись файла в интерактивную сессию. Бэкенд всё равно запускается, потому что именно он *собирает* архив: преобразования трассировки написаны на TypeScript, поэтому запуск на Python запрашивает их у бэкенда, а не поставляет вторую их копию. Это единственное отличие от режима трассировки адаптера Node.js, не требующего бэкенда, и причина, по которой [Node.js 22.19 или новее нужен в любом режиме](#configuration-options).

Помимо строк команд, скриншотов и селекторов для каждой команды, консоли и сети, которые захватываются в обоих режимах, архив содержит:

| В архиве | По умолчанию | Отключение |
|---|---|---|
| Путешествие во времени по DOM — поток мутаций, который плеер воспроизводит шаг за шагом | вкл. | - |
| Плотная кинолента — кадры скринкаста, помещаемые в трассировку вместо `.webm` | вкл. | `DEVTOOLS_FILMSTRIP=0` |
| Дерево A11y и наложение элементов — считываются рядом с каждым действием ценой двух дополнительных обращений на команду | вкл. | `DEVTOOLS_A11Y=0` |

Режим трассировки не кодирует `.webm`, поэтому ему не нужен `ffmpeg` — кадры *и есть* кинолента.

**Экспорт запрашивается по завершении запуска, а не при выходе процесса** — pytest запрашивает его на `sessionfinish`, а `disable()` в скрипте выполняет экспорт до закрытия транспорта, так что CI получает артефакт независимо от того, было ли вообще задействовано окно.

### Сколько архивов и какие сохранять {#how-many-archives-and-which-ones-to-keep}

Это определяют два параметра, и ни один из них не имеет смысла вне режима трассировки.

**Гранулярность** — сколько архивов записывает запуск:

| `--devtools-trace-granularity` | Результат |
|---|---|
| `session` (по умолчанию) | Один архив на весь запуск. |
| `test` | По одному архиву на тест, каждый содержит только команды, консоль, сеть, мутации DOM, деревья a11y и кадры скринкаста этого теста. |

Значения `spec` здесь намеренно нет. Для этого адаптера spec — это и есть тестовый файл, поэтому третье имя могло бы лишь незаметно означать одно из двух вышеуказанных.

**Политика** — какие из этих архивов сохраняются:

| `--devtools-trace-policy` | Результат |
|---|---|
| `on` (по умолчанию) | Сохранять всё. |
| `retain-on-failure` | Сохранять только упавшие. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Принимаются, но сейчас ведут себя **точно так же, как `retain-on-failure`**. |

Последние четыре пока не учитывают повторы, и об этом стоит сказать прямо, а не дать вам обнаружить это по ожидаемому архиву: ничто из того, что этот адаптер передаёт, не содержит номера попытки, поэтому повторно запущенный тест перезаписывает свой предыдущий результат, и вопрос с учётом повторов вообще невозможно задать. Бэкенд сообщает об этом упрощении в логе, а не делает вид, что всё в порядке. Выбирайте одно из них, только если хотите `retain-on-failure` под именем, которое позже будет значить больше.

Параметры комбинируются:

| Гранулярность | Политика | Что вы получите |
|---|---|---|
| `test` | `retain-on-failure` | Только упавшие тесты. |
| `session` | `retain-on-failure` | Архив всего запуска, если в нём что-то упало. |
| любая | `on` | Всё. |

Каждый архив, сохранённый при гранулярности `test`, называется по имени своего теста (`trace-<test>-<hash>.zip`, где хеш берётся из nodeid теста, чтобы два параметризованных случая с одинаковым заголовком не перезаписали друг друга). Запуск, который ничего не сохраняет, вообще ничего не записывает, и в этом весь смысл — остающиеся архивы стоит открыть, а отклонённый экспорт означает, что политика работает, а не что произошла ошибка.

Задайте их для одного запуска:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Или зафиксируйте в конфигурации, чтобы участник, клонировавший проект, захватывал так же без дополнительных объяснений:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` в `pyproject.toml` принимает те же ключи, а `pytest -o devtools_trace_policy=on tests/` переопределяет один из них на один запуск без редактирования файла. Полностью прокомментированная версия — каждый параметр и каждая переменная окружения с пояснением назначения — находится в репозитории в [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Обычный скрипт передаёт те же два параметра именованными аргументами:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Явное указание любого из них выбирает режим трассировки.** Флаг CLI, параметр ini и аргумент `enable()` подразумевают его, поскольку политика или гранулярность ничего не значат в живом режиме, и учёт их без режима молча отбросил бы то, о чём вы просили. `DEVTOOLS_TRACE_POLICY` и `DEVTOOLS_TRACE_GRANULARITY` намеренно этого **не** делают: экспортированная переменная — фоновая настройка и могла быть задана для другого скрипта в той же оболочке, поэтому переключение живого запуска в режим трассировки на этом основании отняло бы панель, которую никто не просил убирать, — используйте их вместе с `DEVTOOLS_TRACE=1`. Запуск, проигнорировавший экспортированный параметр трассировки, выводит предупреждение, а не оставляет вас гадать, почему архив так и не появился.

</TabItem>
</Tabs>

### Просмотр трассировки

Откройте любой `.zip` трассировки в фирменном плеере — том же интерфейсе DevTools в специальном режиме **плеера**:

```bash
npx show-trace path/to/trace.zip      # в проекте, где установлен адаптер
pnpm show-trace path/to/trace.zip     # из монорепозитория devtools
```

Исполняемый файл `show-trace` поставляется вместе с `@wdio/selenium-devtools`, поэтому он доступен в любом проекте, где установлен этот пакет, — без дополнительных зависимостей. Проект на Python не устанавливает адаптер Node.js, но тот же плеер поставляется вместе с бэкендом, который адаптер уже загружает за вас: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Поскольку адаптер Selenium захватывает **поток мутаций DOM** страницы и снимок элемента / доступности для каждой команды вместе с каждым скриншотом, трассировка Selenium задействует все возможности плеера — путешествие во времени по DOM, вкладку A11y и наложение выбора локатора, вкладку Transcript с Copy-for-LLM, вложенность Cucumber Feature → Scenario → Step и перематываемую временную шкалу. Трассировка Python содержит тот же поток мутаций и снимок для каждого действия (чтение элемента / a11y там доступно только в режиме трассировки и включено по умолчанию); вложенность Gherkin — единственный пункт, у которого нет аналога в pytest.

Трассировка использует переносимую схему NDJSON, поэтому тот же `.zip` (или каталог) открывается и в других совместимых просмотрщиках трассировок. Полное пошаговое руководство см. на странице **[Trace Player](/docs/devtools/trace-player)**.

## Публичный API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // задать параметры времени выполнения (см. выше)
DevTools.startTest(name, meta?)      // отметить именованную границу теста (только для обычных скриптов Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

В Mocha / Jest / Cucumber плагин автоматически подключается к жизненному циклу раннера, поэтому вызывать `startTest` / `endTest` вручную не нужно — это создало бы дублирующиеся строки.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # подключиться и инструментировать; идемпотентно
devtools.disable()                    # завершить работу; безопасно вызывать дважды
devtools.wait_for_dashboard_close()   # блокировать, пока окно не будет закрыто
devtools.get_capturer()               # активный SessionCapturer или None
devtools.dashboard_url()              # URL, по которому доступна панель
```

`enable()` принимает необязательные `host` и `port`, а также именованные аргументы:

```python
devtools.enable(trace=True)                            # записать trace.zip; не открывать окно
devtools.enable(trace=True, filmstrip=False)           # ... без плотной киноленты
devtools.enable(trace=True, a11y=False)                # ... без чтения элемента / a11y для каждого действия
devtools.enable(trace_granularity='test')              # ... по одному архиву на тест (подразумевает trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... сохранять только упавшие (подразумевает trace=True)
```

`filmstrip` и `a11y` применяются только в режиме трассировки и по умолчанию включены (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` задают то же самое из окружения). `trace` по умолчанию берётся из `DEVTOOLS_TRACE`. `trace_granularity` и `trace_policy` по умолчанию берутся из `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, а передача любого из них сама по себе включает режим трассировки — см. [Сколько архивов и какие сохранять](#how-many-archives-and-which-ones-to-keep). Значение вне допустимого набора вызывает предупреждение и заменяется значением по умолчанию, а не обнаруживается позже в виде отсутствующего файла.

В pytest плагин управляет всем этим через `--devtools` / `--devtools-trace` (или соответствующий параметр ini, или `DEVTOOLS_ENABLE=1`), а границы тестов берутся из собственных хуков pytest — аналога `startTest` / `endTest` для вызова нет.

</TabItem>
</Tabs>

## Примеры

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Рабочие примеры находятся в каталоге верхнего уровня `examples/` репозитория. Один раз соберите рабочее пространство (`pnpm install && pnpm build`), затем запускайте из корня репозитория. `pnpm demo:selenium` запускает пример по умолчанию (Cucumber); варианты для каждого раннера:

| Каталог | Раннер | Команда |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Примеры на Python находятся в [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Установите адаптер и один раз соберите рабочее пространство (`pnpm install && pnpm build`, чтобы бэкенд существовал), затем запускайте из корня репозитория:

| Пример | Что демонстрирует | Команда |
|---|---|---|
| `web_form.py` | Настройку обычного скрипта в три строки | `pnpm demo:python` |
| `login.py` | Более длинный скрипт: навигация, заполнение формы, утверждения | `pnpm demo:python:login` |
| `trace-py-test/` | pytest с классом и тестом на уровне модуля, плюс `pytest.ini`, фиксирующий режим трассировки, гранулярность и хранение, — каждый параметр в нём снабжён комментарием о том, что он делает | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Возможности

Адаптер Selenium предоставляет тот же опыт работы с интерфейсом DevTools, что и WebdriverIO, в обоих языках. Каждая возможность ниже захватывается автоматически без отдельной настройки — достаточно базового `DevTools.configure({})` в Node.js или `pytest --devtools` в Python. Консоль и сеть передаются через обработчики BiDi Selenium, а в Node.js есть резервный вариант с внедрённым сборщиком. Ссылки ведут на полное описание каждой возможности.

- **[Интерактивный повторный запуск тестов и визуализация](/docs/devtools/wdio/interactive-test-rerunning)** - Живой предпросмотр браузера, скриншоты для каждой команды и повторный запуск теста/набора в один клик
- **[Сохранение и повторный запуск (сравнение)](/docs/devtools/wdio/preserve-and-rerun)** - Сделайте снимок падающего теста, перезапустите его и сравните два запуска бок о бок
- **[Поддержка нескольких фреймворков](/docs/devtools/wdio/multi-framework-support)** - Автоматическое определение Mocha, Jest, Cucumber или обычного скрипта в Node.js; pytest или обычного скрипта в Python
- **[Логи консоли](/docs/devtools/wdio/console-logs)** - Захват и изучение вывода консоли браузера
- **[Сетевые логи](/docs/devtools/wdio/network-logs)** - Мониторинг вызовов API и сетевой активности
- **[Метаданные](/docs/devtools/wdio/metadata)** - Возможности сессии, окружение и тайминги для каждой сессии браузера
- **[TestLens](/docs/devtools/wdio/testlens)** - Переход от любой команды к строке исходного кода, которая её вызвала
- **[Скринкаст сессии](/docs/devtools/wdio/screencast)** - Автоматическая запись видео сессий браузера
- **[Режим трассировки](/docs/devtools/wdio/trace-mode)** - Headless-захват, создающий переносимый `trace.zip` (без окна UI), в обоих языках, с разбиением по тестам и политикой хранения в обоих (`traceGranularity` / `tracePolicy` в Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` в Python). `screenshot` / `video` для каждого теста и прикрепление к Allure по-прежнему доступны только в Node.js; см. [Режим трассировки](#trace-mode)

В Node.js скринкаст — единственная возможность со своими параметрами (см. [Параметры конфигурации](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

В Python настройка не требуется: Chrome передаёт кадры через CDP, другие браузеры переходят на один скриншот на команду, а для кодирования `.webm` нужен `ffmpeg` в `PATH`. В режиме трассировки те же кадры становятся плотной кинолентой архива вместо `.webm`, поэтому ничего не кодируется и `ffmpeg` не нужен.

## Как это работает

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Плагин патчит прототипы `Builder`, `WebDriver` и `WebElement` из `selenium-webdriver` при импорте:

- **`Builder.build()`** - после создания драйвер регистрируется в механизме захвата сессии, а бэкенд DevTools запускается в отсоединённом дочернем процессе.
- **Каждый публичный метод `WebDriver` / `WebElement`** - оборачивается захватом команды (аргументы + результат + скриншот + место вызова).
- **`WebDriver.quit()`** - ожидаемый хук очистки завершает кодирование скринкаста, сбрасывает буфер WebSocket и итоговые метаданные до выполнения исходного quit.

Когда доступен BiDi (Chrome ≥114), логи консоли, исключения JavaScript и сетевые события передаются напрямую через обработчики BiDi Selenium. В противном случае плагин переходит на внедрённый в браузер скрипт-сборщик.

Тот же внедрённый сборщик также записывает **поток мутаций DOM** страницы и снимок элемента / доступности для каждой команды, так что трассировка содержит достаточно данных для восстановления живого DOM на каждом шаге (с сопоставлением по навигациям) — именно это обеспечивает путешествие во времени по DOM и вкладку A11y в плеере вместо воспроизведения одних лишь скриншотов.

</TabItem>
<TabItem value="python" label="Python">

Прототипов для патчинга нет, поэтому адаптер Python оборачивает вместо этого один метод:

- **`WebDriver.execute()`** - единственная точка, через которую проходит каждая команда. Методы элементов тоже делегируют ему (`self._parent.execute`), поэтому `click`, `send_keys` и `text` захватываются той же обёрткой без вмешательства в классы элементов.
- **Настройка сессии** - при первой реальной команде драйвер регистрируется, отправляются метаданные, а BiDi, сборщик и скринкаст приводятся в готовность.
- **`quit()`** - перехватывается до завершения сессии, так что скринкаст кодируется, а последние кадры сбрасываются, пока драйвер ещё существует.

Консоль, исключения JavaScript и сеть передаются через слой BiDi selenium (4.44+), который адаптер включает за вас, внедряя capability `webSocketUrl` в запрос `newSession`.

**Поток мутаций DOM** поступает от того же браузерного сборщика, что и в Node.js, регистрируемого при старте документа через BiDi, чтобы страница инструментировала себя до выполнения любого своего скрипта. В Chrome скринкаст передаётся браузером по собственному CDP-вебсокету — отдельному от командного канала сессии, — что и делает реальный поток кадров безопасным, учитывая, что сессия Selenium не потокобезопасна.

</TabItem>
</Tabs>

## Ограничения

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Ограничение | Подробности |
|-----------|--------|
| Повторный запуск отдельных шагов Cucumber | Фильтр `--name` в Cucumber нацелен на сценарии, а не на отдельные шаги Gherkin. Повторный запуск отдельных шагов в панели при использовании Cucumber отключён. |
| Особенность headless-режима | `headless: true` внедряет `--headless=old`; `--headless=new` даёт полностью чёрные CDP-кадры в скринкасте. |
| Начальная область просмотра | iframe снимка в панели использует 1280×800, пока не завершится первая навигация и браузерный сборщик не сообщит реальный размер области просмотра. |

</TabItem>
<TabItem value="python" label="Python">

| Ограничение | Подробности |
|-----------|--------|
| Нет скриншотов, видео и прикрепления к Allure для каждого теста | **Архивы трассировки** для каждого теста поддерживаются (`--devtools-trace-granularity test`), но у параметров `screenshot` и `video` для каждого теста и встроенного прикрепления через `allure-js-commons` из адаптера Node.js нет аналогов в Python — артефактами являются архивы. |
| Хранение с учётом повторов упрощено | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` и `retain-on-failure-and-retries` принимаются, но ведут себя точно так же, как `retain-on-failure`: ничто из передаваемого не содержит номера попытки, поэтому повторно запущенный тест перезаписывает свой предыдущий результат. Бэкенд сообщает об этом упрощении в логе. |
| Node нужен в любом режиме | Бэкенд — это приложение на Node: он раздаёт сборщик для страницы, передаёт поток событий и собирает архив трассировки, — поэтому Node.js 22.19 или новее должен присутствовать даже в режиме трассировки, где окно не открывается. Адаптер сам находит или запускает его. |
| Параметры браузера — на вашей стороне | Параметра `headless` нет; настраивайте Chrome через собственный объект `Options` selenium, как обычно. |
| Видео в живом режиме требует ffmpeg | Без `ffmpeg` в `PATH` кодирование `.webm` пропускается с предупреждением, а не с ошибкой. Режим трассировки ничего не кодирует — его кадры идут в киноленту, — поэтому ему ffmpeg никогда не нужен. |

</TabItem>
</Tabs>