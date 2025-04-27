---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Все команды поддерживаются только в Chrome при использовании возможностей 
[Расширенной отладки](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging) 
Sauce Labs. Вы можете включить их, установив следующие опции Sauce:


```js
{
    browserName: 'Chrome',
    browserVersion: 'latest',
    platformName: 'Windows 10',
    'sauce:options': {
        extendedDebugging: true
    }
}
```

---

## getPageLogs
Получение информации из логов веб-страницы на основе последней загрузки страницы.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Использование

```js
browser.getPageLogs(type)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>тип лога (например, 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// Получить логи сети
console.log(browser.getPageLogs('sauce:network'));
/**
 * выводит:
 * [{
 *   "url": "https://app.saucelabs.com/dashboard",
 *   "statusCode": 200,
 *   "method": "GET",
 *   "requestHeaders": {
 *     ...
 *   },
 *   "responseHeaders": {
 *     ...
 *   },
 *   "timing": {
 *     ...
 *   }
 * }, {,
 *   ...
 * }]
 */
```


```js
// Получить логи производительности (требуется возможность capturePerformance, см.: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * выводит:
 * {
 *   "speedIndex": 1472.023,
 *   "timeToFirstInteractive": 1243.214,
 *   "firstMeaningfulPaint": 892.643,
 *   ...
 * }
 */
```


##### Возвращает

- **&lt;object&gt;**
            **<code><var>log</var></code>:** выходные данные лога желаемого типа (см. пример)


---

## sauceThrottleNetwork
С помощью настройки сети вы можете тестировать свой сайт на различных сетевых соединениях, включая Edge, 3G и даже в офлайн-режиме. Вы можете ограничить скорость передачи данных, включая максимальную скорость загрузки и выгрузки, и использовать манипуляции с задержкой для обеспечения минимальной задержки в круговом времени соединения (RTT).<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Использование

```js
browser.sauceThrottleNetwork(condition)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>условие сети для установки (например, 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// предопределенное состояние сети
browser.sauceThrottleNetwork('offline')
```


```js
// пользовательское состояние сети
browser.sauceThrottleNetwork({
  download: 1000,
  upload: 500,
  latency: 40'
})
```



---

## throttleCPU
Вы можете ограничить CPU в DevTools, чтобы понять, как ваша страница работает при таком ограничении.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Использование

```js
browser.throttleCPU(rate)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Коэффициент ограничения CPU.</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// ограничить CPU и замедлить его в 4 раза
browser.throttleCPU(4)
```


```js
// сбросить ограничения CPU
browser.throttleCPU(0)
```



---

## interceptRequest
Позволяет изменять любые запросы, сделанные браузером. Вы можете блокировать, изменять или перенаправлять их в соответствии с требованиями ваших тестов.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Использование

```js
browser.interceptRequest(rule)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Правило, описывающее перехват запроса.</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// перенаправить запрос
browser.interceptRequest({
  url: 'https://saucelabs.com',
  redirect: 'https://google.com'
})
```


```js
// Блокировать запросы к сторонним поставщикам
browser.interceptRequest({
  url: 'https://api.segment.io/v1/p',
  error: 'Failed'
})
```


```js
// Изменить запросы к REST API (имитация ответа REST API)
browser.interceptRequest({
  url: 'http://sampleapp.appspot.com/api/todos',
  response: {
    headers: {
      'x-custom-headers': 'foobar'
    },
    body: [{
      title: 'My custom todo',
      order: 1,
      completed: false,
      url: 'http://todo-backend-express.herokuapp.com/15727'
    }]
  }
})
```



---

## assertPerformance
Сравнение с базовыми показателями производительности вашего приложения.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Использование

```js
browser.assertPerformance(name, metrics)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Имя задания, с которым вы создали базовый уровень.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Названия метрик, которые вы хотите сравнить с базовым уровнем.</td>
    </tr>
  </tbody>
</table>

##### Пример


```js
// тестирование производительности страницы
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // убедитесь, что имя также задано в опциях sauce в ваших capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Возвращает

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Объект, содержащий результат, а также метрики о результате.


---

## jankinessCheck
Выполнить тест прокрутки, который оценивает плавность работы приложения.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Использование

```js
browser.jankinessCheck()
```

##### Пример


```js
// тестирование производительности страницы
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Возвращает

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Объект, содержащий оценку, а также метрики плавности пользовательского интерфейса страницы во время теста.


---

## mockRequest
Имитирует сетевой ресурс.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/).

##### Использование

```js
browser.mockRequest(url, filterOptions)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>Шаблон URL для соответствия URL, который нужно имитировать.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Дополнительные параметры фильтрации для URL, который нужно имитировать (например, headers, method).</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Объект, содержащий идентификатор имитируемого ресурса.


---

## getMockCalls
Получить информацию о запросах, соответствующих имитируемому ресурсу.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/).

##### Использование

```js
browser.getMockCalls(mockId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>идентификатор имитации</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Список информации о запросах.


---

## clearMockCalls
Очистить список вызовов имитаций.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/).

##### Использование

```js
browser.clearMockCalls(mockId, restore)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>идентификатор имитации</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Установите true, если имитация также должна быть восстановлена.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Ответить, если имитация соответствует определенному ресурсу.<br /><br />Команда Sauce Labs. Более подробную информацию можно найти в [официальной документации протокола](https://docs.saucelabs.com/).

##### Использование

```js
browser.respondMock(mockId, payload)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>идентификатор имитации</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Информация об ответе имитации.</td>
    </tr>
  </tbody>
</table>