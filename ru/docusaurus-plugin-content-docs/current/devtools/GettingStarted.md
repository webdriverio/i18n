---
id: getting-started
title: Начало работы
description: "Установите WebdriverIO DevTools и запустите свой первый тест в режиме live или trace, чтобы воспроизвести DOM, скриншоты, сетевые запросы и вывод консоли."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools предоставляет вашим сквозным (end-to-end) браузерным тестам интерфейс инструментов разработчика для запуска, отладки и анализа автоматизации — воспроизведение DOM, скриншоты для каждой команды, захват сетевых запросов и вывода консоли, а также запись экрана сессии. Инструмент работает в двух режимах. **Live mode** открывает интерактивную [панель управления](/docs/devtools/dashboard) в окне браузера во время выполнения тестов, позволяя наблюдать за ними и перезапускать их в реальном времени. **Trace mode** обходится без интерфейса и записывает переносимый офлайн-[артефакт трассировки](/docs/devtools/wdio/trace-mode) (`trace.zip`), который можно позже открыть в плеере `show-trace` — идеально для CI. Эта страница поможет быстро начать работу в режиме live; режим trace включается всего одной опцией.

## Установка и первый запуск

Выберите адаптер, установите его и добавьте минимальную конфигурацию, приведённую ниже. Запускайте тесты как обычно — панель DevTools автоматически откроется в новом окне браузера.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Установите сервис:

```sh
npm install @wdio/devtools-service --save-dev
```

Добавьте его в конфигурацию тест-раннера:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Запускайте тесты WebdriverIO как обычно — интерфейс DevTools откроется автоматически, и визуализация тестов начнётся сразу же.

</TabItem>
<TabItem value="selenium">

Работает с Mocha, Jest, Cucumber или обычным скриптом `node` — плагин автоматически определяет раннер. Установите его:

```bash
npm install @wdio/selenium-devtools
```

Добавьте один импорт и один вызов `configure` в начало файла теста (пример для Mocha):

```js
// tests/example.test.js
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

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Запустите его — интерфейс DevTools откроется в новом окне Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Настройку для Jest, Cucumber и обычного Node смотрите на [странице Selenium](/docs/devtools/selenium).

</TabItem>
<TabItem value="nightwatch">

Установите адаптер:

```bash
npm install @wdio/nightwatch-devtools
```

Подключите его в конфигурации Nightwatch через `globals` — изменять файлы тестов не нужно:

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

Запускайте тесты как обычно — интерфейс DevTools откроется автоматически:

```bash
nightwatch
```

Настройку для Cucumber/BDD смотрите на [странице Nightwatch](/docs/devtools/nightwatch).

</TabItem>
</Tabs>

## Дальнейшие шаги

- **[Trace Mode](/docs/devtools/wdio/trace-mode)** — установите `mode: 'trace'`, чтобы обойтись без интерфейса и получить переносимый офлайн-артефакт трассировки для CI.
- **[Справочник по конфигурации](/docs/devtools/reference)** — все опции для всех трёх адаптеров.
- **Фреймворки** — полные руководства по каждому адаптеру: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).