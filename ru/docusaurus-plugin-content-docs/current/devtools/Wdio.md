---
id: wdio
title: WebDriverIO DevTools
description: "Установите и настройте сервис WebdriverIO DevTools для отладки тестов с воспроизведением DOM, скриншотами, перехватом сетевых запросов и консоли, а также записью скринкастов."
---

Сервис WebdriverIO, предоставляющий пользовательский интерфейс инструментов разработчика для запуска, отладки и анализа тестов автоматизации браузера. Возможности включают воспроизведение мутаций DOM, скриншоты для каждой команды, анализ сетевых запросов, перехват логов консоли и запись скринкаста сессии.

## Установка

```sh
npm install @wdio/devtools-service --save-dev
```

## Использование

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Автономный режим

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Опции сервиса

```ts
services: [['devtools', options]]
```

| Опция | Тип | По умолчанию | Описание |
|---|---|---|---|
| `port` | `number` | случайный | Порт, который прослушивает сервер DevTools UI |
| `hostname` | `string` | `'localhost'` | Имя хоста, к которому привязывается сервер DevTools UI |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities, используемые для открытия окна DevTools UI |
| `screencast` | `ScreencastOptions` | - | Видеозапись сессии ([см. Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` открывает DevTools UI; `trace` пропускает его и вместо этого записывает переносимый артефакт ([см. Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Структура артефакта трассировки — единый архив или распакованная директория. Применяется только при `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Одна трассировка на сессию / spec-файл / тест. `'test'` записывает каждую в `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Применяется только при `mode: 'trace'` ([см. Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Какие трассировки сохранять. Используется вместе с `traceGranularity: 'test'`. Применяется только при `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Записывает плотную непрерывную ленту кадров скринкаста *в* трассировку для плавной перемотки в плеере — плотные кадры в дополнение к кадрам для каждого действия, прореженные и адресуемые по содержимому при экспорте. Применяется только при `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Скриншот для каждого теста, встраиваемый в Allure (`image/png`). Требует `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Видео скринкаста для каждого теста, сохраняемое согласно заданной политике и встраиваемое в Allure (`video/webm`). Требует `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Записывает `devtools-artifacts-<sessionId>.json` — универсальный индекс всех созданных артефактов и состояния каждого теста для репортеров/CI. Включается автоматически, если в конфигурации присутствует `@wdio/allure-reporter`. Применяется только при `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Перехватывает утверждения как строки действий трассировки — `node:assert`, а также успешные/неуспешные матчеры `expect(...)`. Установите `false`, чтобы отключить |

## Начало работы

1. Запустите тесты WebdriverIO
2. DevTools UI автоматически откроется во внешнем окне браузера
3. Тесты сразу начнут выполняться с визуализацией в реальном времени
4. Просматривайте живой предпросмотр браузера, ход тестов и выполнение команд
5. После завершения первого запуска используйте кнопки воспроизведения для повторного запуска отдельных тестов или наборов
6. Нажмите кнопку остановки в любой момент, чтобы прервать выполняющиеся тесты
7. Изучайте действия, метаданные, логи консоли и исходный код во вкладках рабочей области

## Возможности

Подробнее о возможностях WebDriverIO DevTools:

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Предпросмотр браузера в реальном времени с повторным запуском тестов
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Сохраните снимок упавшего теста, перезапустите его и сравните два запуска бок о бок
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Работает с Mocha, Jasmine и Cucumber
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Перехват и анализ вывода консоли браузера
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Мониторинг API-вызовов и сетевой активности
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities сессии, окружение и тайминги для каждой сессии браузера
- **[TestLens](/docs/devtools/wdio/testlens)** - Переход к исходному коду с интеллектуальной навигацией по коду
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Автоматическая видеозапись сессий браузера
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Режим захвата без UI, создающий переносимый артефакт `trace.zip` (без окна UI); поддерживает форматы вывода `zip` и `ndjson-directory`, гранулярность на уровне сессии/spec/теста, политики хранения с учётом повторных запусков и опциональную плотную `filmstrip` — всё это можно просматривать в собственном плеере `show-trace`

## Trace Player

Трассировка, записанная с `mode: 'trace'`, открывается в собственном плеере `show-trace` (`npx show-trace path/to/trace.zip`) — путешествие во времени по DOM, вкладка A11y и оверлей элементов для выбора локатора, вкладка Transcript с функцией Copy-for-LLM, вкладки Errors / Console / Network / Source, а также перематываемая временная шкала (плотная лента кадров, вложенность Cucumber Feature → Scenario → Step).

Полное руководство и другие совместимые просмотрщики см. на странице **[Trace Player](/docs/devtools/trace-player)**.

## Отчёты Allure

Если в конфигурации присутствует `@wdio/allure-reporter`, артефакты режима трассировки (zip-архив трассировки, а также скриншот и видео для каждого теста при `traceGranularity: 'test'`) автоматически прикрепляются к отчёту Allure, а `emitArtifactsManifest` включается автоматически.

Подробности о вложениях и опциях подавления шагов репортера см. в разделе **[Allure Integration](/docs/devtools/allure)**.