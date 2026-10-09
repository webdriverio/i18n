---
id: nightwatch
title: Nightwatch DevTools
description: "Добавьте отладочный интерфейс DevTools в набор тестов Nightwatch без изменения тестов и настройте запись экрана, захват BiDi и режим трассировки."
---

Адаптер Nightwatch для [WebdriverIO DevTools](https://github.com/webdriverio/devtools) — предоставляет тот же визуальный интерфейс отладки для вашего набора тестов Nightwatch без каких-либо изменений в коде тестов.

## Установка

```bash
npm install @wdio/nightwatch-devtools
```

## Настройка

### Стандартный Nightwatch (в стиле mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Требуется для захвата сетевых запросов
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Запускайте тесты как обычно — интерфейс DevTools автоматически откроется в новом окне браузера:

```bash
nightwatch
```

> Изменять файлы тестов не нужно.

### Cucumber / BDD

Импортируйте `cucumberHooksPath` вместе с основным экспортом и передайте его в опцию Cucumber `require`. Это регистрирует хуки сценариев `Before` / `After`, которые повторяют поведение `beforeScenario` / `afterScenario` сервиса WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- регистрация хуков DevTools для Cucumber
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Параметры конфигурации

| Параметр | Тип | По умолчанию | Описание |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Порт бэкенд-сервера DevTools. Автоматически увеличивается, если уже занят. |
| `hostname` | `string` | `'localhost'` | Имя хоста, к которому привязывается бэкенд-сервер. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Запись видео `.webm` для каждой сессии. См. [Запись экрана](#screencast) ниже. |
| `bidi` | `boolean` | `false` | Включает захват WebDriver BiDi для консоли браузера, исключений JS и сети. Требует `webSocketUrl: true` в capabilities и chromedriver с поддержкой BiDi. При подключении путь захвата сети через perf-log Chrome для каждой команды отключается, чтобы запросы не дублировались. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` открывает интерфейс DevTools; `trace` пропускает его и вместо этого записывает переносимый артефакт. См. [Режим трассировки](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Структура артефакта трассировки. Применяется только при `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Одна трассировка на сессию / spec-файл / тест. `'test'` записывает каждую в `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Применяется только при `mode: 'trace'`. См. [Режим трассировки](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Оговорка:** BDD-интерфейс `describe/it` сводится к одному срезу в рамках сессии (см. [Нарезка по тестам](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Какие трассировки сохранять. Используется вместе с `traceGranularity: 'test'`. Применяется только при `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Записывает в трассировку плотную непрерывную ленту кадров для воспроизведения с перемоткой в плеере трассировок — а не только один кадр на действие. Запускает рекордер экрана (в режиме опроса для Nightwatch) на время сессии. Применяется только при `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Скриншот для каждого теста. Только в режиме трассировки + `traceGranularity: 'test'`. **Только создание** — PNG записывается в выходной каталог трассировки (и в манифест при `emitArtifactsManifest: true`); не прикрепляется напрямую к Allure (см. примечание ниже). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Видеофрагмент для каждого теста, сохраняемый согласно заданной политике (например, `'retain-on-failure'`). Только в режиме трассировки + `traceGranularity: 'test'`. Значение, отличное от `off`, само запускает рекордер экрана — дополнительно включать `filmstrip` или `screencast.enabled` **не** нужно. **Только создание** — `.webm` записывается в выходной каталог трассировки (и в манифест при `emitArtifactsManifest: true`); не прикрепляется напрямую к Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Записывает манифест `devtools-artifacts-<sessionId>.json` (общий индекс, который используют репортеры/CI для обнаружения созданных артефактов) рядом с трассировкой. **Для Nightwatch включается явно** — здесь нет живого сигнала Allure для автоопределения, поэтому, в отличие от WDIO/Selenium, он никогда не включается автоматически. Применяется только при `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Захватывает утверждения как строки действий трассировки — `node:assert`, а также нативные `browser.assert`/`browser.verify`, включая отрицательные матчеры `.not.*`. Установите `false`, чтобы отключить. |

> **Прямое прикрепление к Allure для Nightwatch не поддерживается.** Его официальный репортер `nightwatch-allure` работает постфактум (нет API для живого прикрепления), а `attachment()` из `allure-js-commons` в запуске Nightwatch ничего не делает. Поэтому артефакты `screenshot` / `video` *создаются* (файлы, а также манифест артефактов при `emitArtifactsManifest: true`) в выходном каталоге трассировки, но не прикрепляются к тесту Allure. Нарезка по тестам — а значит, и эти артефакты — имеет смысл для интерфейсов Cucumber и exports-object; BDD-интерфейс `describe/it` сводится к гранулярности сессии, поэтому там проверка на уровне теста ничего не делает.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Запись экрана

Записывает непрерывное видео `.webm` сессии браузера. Запись начинается с первой сессии, которую видит плагин, и завершается в хуке Nightwatch `after()`.

**Только режим опроса.** Nightwatch не предоставляет стабильного обходного доступа к CDP, как WebdriverIO (`browser.getPuppeteer()`) и Selenium (`driver.createCDPConnection`), поэтому запись экрана захватывает кадры, вызывая `browser.takeScreenshot()` с фиксированным интервалом. Работает во всех браузерах, которые поддерживает Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Параметр | Тип | По умолчанию | Примечания |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Главный переключатель. |
| `pollIntervalMs` | `number` | `200` | Интервал скриншотов (мс). Меньше = более плавное видео, больше обращений к WebDriver. 200 мс ≈ 5 кадров/с. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Пиксельный формат каждого кадра, передаваемый кодировщику ffmpeg перед финальным мультиплексированием в `.webm`. В режиме опроса исходные скриншоты всегда захватываются в PNG, поэтому этот параметр **не** влияет на захват — только на формат, который получает кодировщик для каждого кадра. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Параметры только для CDP, игнорируются в режиме опроса. Указаны для совместимости формы с адаптерами WDIO/Selenium. |

**Требования:** `fluent-ffmpeg` (уже является runtime-зависимостью пакета), а также бинарный файл `ffmpeg` в PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Без ffmpeg рекордер всё равно работает, но шаг кодирования выводит предупреждение и пропускает запись файла.

**Вывод:** видеофайл записывается рядом с только что выполненным файлом теста (с каталогом `nightwatch.conf.*` в качестве запасного варианта и `process.cwd()` в крайнем случае). Полный путь появляется в строке лога Nightwatch `📹 Screencast video: <path>`, а видео также транслируется во вкладку Screencast панели.

Полное описание функции записи экрана (поддержка браузеров, пути вывода для всех трёх адаптеров) см. на [странице Screencast](/docs/devtools/wdio/screencast).

## Захват BiDi (по желанию)

Включите захват WebDriver BiDi для сообщений консоли браузера, исключений JS и сетевых запросов. Аналогично пути, используемому selenium-devtools — оба адаптера используют одну и ту же логику подключения в `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Также необходимо указать `webSocketUrl: true` в capabilities, чтобы chromedriver действительно открыл канал BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← включает BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Когда BiDi подключён, путь захвата сети через performance-log Chrome для каждой команды отключается, чтобы запросы не появлялись в панели дважды. Если `webSocketUrl` отсутствует или версия chromedriver не поддерживает BiDi, подключение молча завершается неудачей, и запасной вариант через perf-log продолжает работать.

## Режим трассировки

Путь захвата без интерфейса — окно DevTools не открывается. В конце сессии адаптер записывает переносимый `trace-<sessionId>.zip` (или каталог) в папку `test-results/` (рядом с определённым каталогом тестов / конфигурации), с той же структурой, что и артефакт трассировки WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // необязательно; по умолчанию 'zip'
})
```

### Гранулярность и Cucumber

`traceGranularity` определяет, что охватывает один артефакт — `'session'` (по умолчанию), `'spec'` или `'test'`.

Nightwatch закрывает браузер после каждого сценария Cucumber. Трассировка `'session'` охватывает всё это: один zip на весь запуск, где каждый сценарий вложен в свою фичу. `'test'` записывает один zip на сценарий в отдельную папку — это рекомендуемый вариант для Cucumber: артефакты меньше, и именно на эту гранулярность опирается политика хранения `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // одна трассировка на сценарий Cucumber
})
```

В BDD-интерфейсе `describe/it` значение `'test'` сводится к одному срезу в рамках сессии: Nightwatch выполняет каждый `it()` внутренне и вызывает хук плагина для каждого теста только один раз на модуль. Дерево действий при этом по-прежнему показывает каждый `it` как отдельную группу.

Привязка порта бэкенда, окно интерфейса и параметр `screencast` в режиме трассировки пропускаются. Полное описание функции (содержимое артефакта, просмотрщик, мобильное тестирование, когда выбирать `zip`, а когда `ndjson-directory`) см. на [странице Trace Mode](/docs/devtools/wdio/trace-mode).

Nightwatch использует тот же конвейер трассировки, что и адаптеры WebdriverIO и Selenium, поэтому структура артефакта идентична независимо от того, какой адаптер его создал. Трассировка Nightwatch содержит полный захват для каждого действия — скриншот, снимок дерева доступности с отступами по глубине, список интерактивных элементов и Markdown-транскрипт — поэтому она открывается в плеере `show-trace` с перемещением во времени по DOM/снимкам, вкладками **A11y** и **Transcript**, наложением элементов для выбора локатора и (для Cucumber) вложенностью **Feature → Scenario → Step**.

Откройте трассировку с помощью бинарника `show-trace`, поставляемого с `@wdio/nightwatch-devtools` (без дополнительных зависимостей):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # в проекте, где установлен адаптер
pnpm show-trace test-results/trace-<sessionId>.zip  # из монорепозитория devtools
```

Полное руководство и сочетания клавиш см. на странице [Trace Player](/docs/devtools/trace-player).

### Нарезка по тестам и оговорка для BDD `describe/it`

Параметры уровня теста — `traceGranularity: 'test'`, а также сопутствующие ему `tracePolicy`, `screenshot` и `video` — требуют хука для каждого теста, чтобы отрезать срез каждого теста. Интерфейс **exports-object (в стиле mocha)** и **Cucumber** (хуки для каждого сценария) предоставляют такой хук, поэтому для них работает настоящая нарезка по тестам. Исключением является интерфейс **BDD `describe/it`**: Nightwatch выполняет каждый `it()` внутренне и вызывает хук плагина для каждого теста только один раз на модуль, поэтому `traceGranularity: 'test'` сводится к одному срезу **в рамках сессии**, привязанному к первому тесту. Манифест артефактов по-прежнему перечисляет каждый тест-кейс с его корректным состоянием; сводится только привязка срезов/артефактов к тестам. Трассировки с гранулярностью сессии и spec не затрагиваются.

## Примеры

Рабочие примеры находятся в каталоге `examples/` верхнего уровня репозитория. Соберите рабочее пространство один раз (`pnpm install && pnpm build`), затем запускайте из корня репозитория:

| Каталог | Раннер | Команда |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch в стиле mocha | `pnpm demo:nightwatch` |

## Возможности

Адаптер Nightwatch предоставляет тот же опыт работы с интерфейсом DevTools, что и WebdriverIO. Каждая из перечисленных ниже возможностей захватывается автоматически при базовой настройке `globals: nightwatchDevtools({ port: 3000 })` — без отдельной конфигурации для каждой функции (для сетевых логов дополнительно нужен `'goog:loggingPrefs': { performance: 'ALL' }`, показанный в разделе [Настройка](#setup)). Ссылки ведут на полное описание каждой функции.

- **[Интерактивный перезапуск и визуализация тестов](/docs/devtools/wdio/interactive-test-rerunning)** — живой предпросмотр браузера, скриншоты для каждой команды и перезапуск теста/набора в один клик
- **[Сохранение и перезапуск (сравнение)](/docs/devtools/wdio/preserve-and-rerun)** — сохраните снимок упавшего теста, перезапустите его и сравните два запуска бок о бок
- **[Поддержка нескольких фреймворков](/docs/devtools/wdio/multi-framework-support)** — стандартный раннер (в стиле mocha) и Cucumber/BDD
- **[Логи консоли](/docs/devtools/wdio/console-logs)** — захват и просмотр вывода консоли браузера (в реальном времени с `bidi: true`)
- **[Сетевые логи](/docs/devtools/wdio/network-logs)** — мониторинг вызовов API и сетевой активности
- **[Метаданные](/docs/devtools/wdio/metadata)** — capabilities сессии, окружение и тайминги для каждой сессии браузера
- **[TestLens](/docs/devtools/wdio/testlens)** — переход от любой команды к строке исходного кода, которая её вызвала
- **[Запись экрана сессии](/docs/devtools/wdio/screencast)** — непрерывная запись `.webm` сессии браузера
- **[Режим трассировки](/docs/devtools/wdio/trace-mode)** — захват без интерфейса, создающий переносимый `trace.zip` (без окна интерфейса)

Запись экрана — единственная функция с собственными параметрами (полный список в разделе [Запись экрана](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Ограничения

Nightwatch не предоставляет такой же глубины хуков фреймворка, как WebdriverIO, поэтому есть несколько отличий от сервиса WDIO DevTools:

| Ограничение | Подробности |
|-----------|--------|
| Нет нативных хуков команд | В Nightwatch нет хуков `beforeCommand` / `afterCommand`. Вместо этого команды перехватываются с помощью прокси-обёртки браузера. |
| Ограниченный контекст теста | `browser.currentTest` предоставляет меньше метаданных, чем контекст раннера WDIO; для имён тестов и путей к файлам требуются дополнительные эвристики. |
| Плоская вложенность наборов | Nightwatch нативно не поддерживает многоуровневую вложенность блоков `describe`; плагин отображает максимум два уровня. |
| Отложенная доступность результатов | Результаты тестов финализируются только в `afterEach` и недоступны во время выполнения теста. |
| Запись экрана только в режиме опроса | В отличие от WDIO (CDP push через `browser.getPuppeteer()`) и Selenium (CDP push через `driver.createCDPConnection`), у Nightwatch нет стабильного обходного доступа к CDP, поэтому кадры захватываются опросом `browser.takeScreenshot()`. Работает во всех браузерах, поддерживаемых Nightwatch; небольшие затраты на каждый кадр пропорциональны интервалу опроса. |
| Нарезка трассировки по тестам (BDD `describe/it`) | BDD-интерфейс вызывает хук плагина для каждого теста один раз на модуль, поэтому `traceGranularity: 'test'` сводится к одному срезу в рамках сессии. Интерфейсы exports-object (в стиле mocha) и Cucumber получают настоящую нарезку по тестам. См. [Нарезка по тестам](#per-test-slicing--the-bdd-describeit-caveat). |
| Артефакты трассировки только создаются | Файлы `screenshot` / `video` для каждого теста записываются в выходной каталог трассировки (и в манифест при `emitArtifactsManifest: true`), но не прикрепляются напрямую к Allure — в Nightwatch нет API для живого прикрепления к Allure. |

Общий паритет возможностей с сервисом WebdriverIO DevTools составляет примерно **80–90%**.