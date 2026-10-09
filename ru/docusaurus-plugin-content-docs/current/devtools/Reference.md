---
id: reference
title: Справочник по конфигурации
description: "Все параметры DevTools для режима live и режима trace в адаптерах WebdriverIO, Selenium и Nightwatch, а также их значения по умолчанию."
---

Все параметры DevTools в одном месте для всех трёх адаптеров. **Имена, типы и значения по умолчанию** параметров **одинаковы** во всех адаптерах; если поведение различается, это указано отдельно. Полное описание каждого параметра режима trace см. в соответствующем разделе на странице [Trace Mode](/docs/devtools/wdio/trace-mode).

Передавайте параметры так, как этого ожидает каждый адаптер:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Параметры режима и режима live

| Параметр | Тип / значения | По умолчанию | Примечания |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` открывает панель DevTools UI; `'trace'` пропускает её и записывает переносимый артефакт. Эти режимы взаимоисключающие. |
| `port` | `number` | случайный | Порт, к которому привязывается DevTools UI / бэкенд. Только для режима live. |
| `hostname` | `string` | `'localhost'` | Имя хоста, к которому привязывается сервер. Только для режима live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Непрерывная запись видео сессии (`.webm`). Только для режима live — в режиме trace используйте `video`. См. [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities, используемые для открытия окна DevTools UI. Только WebdriverIO, только режим live. |

## Параметры режима trace

Применяются только при `mode: 'trace'`.

| Параметр | Тип / значения | По умолчанию | Подробности |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Единый архив или распакованный каталог. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Одна трассировка на сессию / spec-файл / тест. Значение `'test'` необходимо для скриншотов/видео по каждому тесту и встроенного прикрепления к Allure. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Какие трассировки сохранять. Используется вместе с `traceGranularity: 'test'`. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Плотная непрерывная запись экрана в трассировку для плавной перемотки; `false` записывает один кадр на действие. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Скриншот для каждого теста (требуется `traceGranularity: 'test'`). Параметр сервиса WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Фрагмент видео для каждого теста (требуется `traceGranularity: 'test'`). Параметр сервиса WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Записывает `devtools-artifacts-<sessionId>.json`. Включается автоматически при обнаружении репортера Allure (в Nightwatch — по явному включению). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Записывает `node:assert` (и матчеры `expect` фреймворка, где поддерживается) как действия трассировки. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Только для Nightwatch

| Параметр | Тип / значения | По умолчанию | Примечания |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Включает сбор данных через WebDriver BiDi (консоль + исключения JS + сеть). Требует `webSocketUrl: true` в capabilities. В WebdriverIO и Selenium BiDi подключается автоматически. См. [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Различия между адаптерами

Некоторые возможности трассировки в отдельных адаптерах работают в ограниченном виде — полную картину см. в [матрице поддержки фреймворков](/docs/devtools/cross-framework). Наиболее заметные:

- **Сохранение с учётом повторов в Nightwatch** — надёжно работает только `retain-on-failure`; остальные значения `tracePolicy` сводятся к нему.
- **BDD `describe/it` в Nightwatch** — `traceGranularity: 'test'` сводится к одному фрагменту в рамках сессии.
- **Прикрепление к Allure в Nightwatch** — `screenshot`/`video` для каждого теста только создаются (файлы + манифест), но не прикрепляются встроенно.