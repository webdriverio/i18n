---
id: lighthouse-service
title: Сервис Lighthouse
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Сервис WebdriverIO, который позволяет вам запускать тесты доступности и производительности с помощью [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

**Примечание:** на данный момент этот сервис поддерживает только тесты, запущенные в Google Chrome или Chromium! Учитывая, что большинство облачных поставщиков не предоставляют доступ к Chrome DevTools Protocol, этот сервис обычно работает только при локальном запуске тестов или через [Selenium Grid](https://www.selenium.dev/documentation/grid/) версии 4 или выше.

## Установка

Самый простой способ - это добавить `@wdio/lighthouse-service` как dev-зависимость в ваш `package.json`, с помощью:

```sh
npm install @wdio/lighthouse-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted).

## Конфигурация

Чтобы использовать сервис, вам просто нужно добавить его в список сервисов в вашем `wdio.conf.js`, например:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## Использование

Сервис `@wdio/lighthouse-service` позволяет вам запускать тесты доступности и производительности Google Lighthouse через WebdriverIO.

### Тестирование производительности

Сервис Lighthouse позволяет вам собирать данные о производительности при каждой загрузке страницы или переходе, вызванном кликом. Чтобы включить его, вызовите `browser.enablePerformanceAudits(<options>)`. После того, как вы закончите сбор всех необходимых данных о производительности, отключите его, чтобы вернуть настройки дросселирования, например:

```js
import assert from 'node:assert'

describe('JSON.org page', () => {
    before(async () => {
        await browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        await browser.url('http://json.org')

        let metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = await browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(async () => {
        await browser.disablePerformanceAudits()
    })
})
```

Доступны следующие команды с их результатами:

#### `getMetrics`

Получает наиболее часто используемые метрики производительности, например:

```js
console.log(await browser.getMetrics())
/**
 * { timeToFirstByte: 566,
 *   serverResponseTime: 566,
 *   domContentLoaded: 3397,
 *   firstVisualChange: 2610,
 *   firstPaint: 2822,
 *   firstContentfulPaint: 2822,
 *   firstMeaningfulPaint: 2822,
 *   largestContentfulPaint: 2822,
 *   lastVisualChange: 15572,
 *   interactive: 6135,
 *   load: 8429,
 *   speedIndex: 3259,
 *   totalBlockingTime: 31,
 *   maxPotentialFID: 161,
 *   cumulativeLayoutShift: 2822 }
 */
```

#### `getDiagnostics`

Получает полезную диагностическую информацию о загрузке страницы.

```js
console.log(await browser.getDiagnostics())
/**
 * { numRequests: 8,
 *   numScripts: 0,
 *   numStylesheets: 0,
 *   numFonts: 0,
 *   numTasks: 237,
 *   numTasksOver10ms: 5,
 *   numTasksOver25ms: 2,
 *   numTasksOver50ms: 2,
 *   numTasksOver100ms: 0,
 *   numTasksOver500ms: 0,
 *   rtt: 147.20600000000002,
 *   throughput: 47729.68474448835,
 *   maxRtt: 176.085,
 *   maxServerLatency: 1016.813,
 *   totalByteWeight: 62929,
 *   totalTaskTime: 254.07899999999978,
 *   mainDocumentTransferSize: 8023 }
 */
```

#### getMainThreadWorkBreakdown

Возвращает список с разбивкой всех задач основного потока и их общей продолжительностью.

```js
console.log(await browser.getMainThreadWorkBreakdown())
/**
 * [ { group: 'styleLayout', duration: 130.59099999999998 },
 *   { group: 'other', duration: 44.819 },
 *   { group: 'paintCompositeRender', duration: 13.732000000000005 },
 *   { group: 'parseHTML', duration: 3.9080000000000004 },
 *   { group: 'scriptEvaluation', duration: 2.437999999999999 },
 *   { group: 'scriptParseCompile', duration: 0.20800000000000002 } ]
 */
```

#### getPerformanceScore

Возвращает [оценку производительности Lighthouse](https://developers.google.com/web/tools/lighthouse/scoring), которая является взвешенным средним следующих метрик: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` или `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

Включает автоматический аудит производительности для всех загрузок страниц, вызванных командой `url`, нажатием на ссылку или любым другим действием, вызывающим загрузку страницы. Вы можете передать объект конфигурации для определения некоторых параметров дросселирования. Профиль дросселирования по умолчанию - сеть `Good 3G` с 4-кратным ограничением CPU.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

Доступны следующие профили дросселирования сети: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` и `online` (без дросселирования).

### Тестирование PWA

С помощью команды `checkPWA` вы можете проверить, соответствует ли ваше веб-приложение последним веб-стандартам прогрессивных веб-приложений. Проверяется:

- устанавливаемо ли ваше приложение
- предоставляет ли service worker
- имеет ли экран-заставку
- предоставляет ли Apple Touch и Maskable иконки
- может ли обслуживаться на мобильных устройствах

Если вы не заинтересованы в одной из этих проверок, вы можете передать список проверок, которые хотите выполнить. Свойство `passed` вернет `true`, если все проверки пройдены. Если они не проходят, вы можете использовать свойство `details` для обогащения своего сообщения об ошибке деталями сбоя.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### Команда `startTracing(categories, samplingFrequency)`

Начинает трассировку браузера. Вы можете опционально передать пользовательские категории трассировки (по умолчанию [этот список](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) и частоту выборки (по умолчанию `10000`).

```js
await browser.startTracing()
```

### Команда `endTracing`

Останавливает трассировку браузера.

```js
await browser.endTracing()
```

### Команда `getTraceLogs`

Возвращает логи трассировки, которые были собраны в период трассировки. Вы можете использовать эту команду для сохранения логов трассировки в файловой системе, чтобы анализировать трассировку через интерфейс Chrome DevTools.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### Команда `getPageWeight`

Возвращает информацию о весе страницы последней загрузки.

```js
await browser.startTracing()
await browser.url('https://webdriver.io')
await browser.endTracing()

console.log(await browser.getPageWeight())
// outputs:
// { pageWeight: 2438485,
//   transferred: 1139136,
//   requestCount: 72,
//   details: {
//       Document: { size: 221705, encoded: 85386, count: 11 },
//       Stylesheet: { size: 52712, encoded: 50130, count: 2 },
//       Image: { size: 495023, encoded: 482433, count: 36 },
//       Script: { size: 1073597, encoded: 322854, count: 15 },
//       Font: { size: 84412, encoded: 84412, count: 5 },
//       Other: { size: 1790, encoded: 1790, count: 2 },
//       XHR: { size: 509246, encoded: 112131, count: 1 } }
// }
```

----

Для получения дополнительной информации о WebdriverIO смотрите [домашнюю страницу](https://webdriver.io).