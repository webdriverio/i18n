---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Усі команди підтримуються лише у Chrome при використанні можливостей 
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
від Sauce Labs. Ви можете активувати їх, встановивши наступні опції Sauce:


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
Отримати специфічну лог-інформацію веб-сторінки на основі останнього завантаження сторінки.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Використання

```js
browser.getPageLogs(type)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>тип логу (наприклад, 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Приклади


```js
// Get Network Logs
console.log(browser.getPageLogs('sauce:network'));
/**
 * outputs:
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
// Get Performance Logs (needs capturePerformance capability see: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * outputs:
 * {
 *   "speedIndex": 1472.023,
 *   "timeToFirstInteractive": 1243.214,
 *   "firstMeaningfulPaint": 892.643,
 *   ...
 * }
 */
```


##### Повертає

- **&lt;object&gt;**
            **<code><var>log</var></code>:** вивід логу бажаного типу (див. приклад)


---

## sauceThrottleNetwork
За допомогою управління мережею ви можете тестувати ваш сайт на різних типах з'єднань, включаючи Edge, 3G, і навіть в режимі офлайн. Ви можете обмежити пропускну здатність даних, включаючи максимальну швидкість завантаження і вивантаження, а також використовувати маніпуляції затримки для забезпечення мінімальної затримки в часі обороту з'єднання (RTT).<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Використання

```js
browser.sauceThrottleNetwork(condition)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>умова мережі для встановлення (наприклад, 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Приклади


```js
// predefined network condition
browser.sauceThrottleNetwork('offline')
```


```js
// custom network condition
browser.sauceThrottleNetwork({
  download: 1000,
  upload: 500,
  latency: 40'
})
```



---

## throttleCPU
Ви можете обмежити CPU в DevTools, щоб зрозуміти, як ваша сторінка працює в цих обмеженнях.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Використання

```js
browser.throttleCPU(rate)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Ставка, наскільки CPU повинен бути обмежений.</td>
    </tr>
  </tbody>
</table>

##### Приклади


```js
// throttle CPU and make it run 4x slower
browser.throttleCPU(4)
```


```js
// reset CPU throttling
browser.throttleCPU(0)
```



---

## interceptRequest
Дозволяє модифікувати будь-який запит, зроблений браузером. Ви можете блокувати, змінювати або перенаправляти їх, як потрібно для ваших тестів.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Використання

```js
browser.interceptRequest(rule)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Правило, яке описує перехоплення запиту.</td>
    </tr>
  </tbody>
</table>

##### Приклади


```js
// redirect a request
browser.interceptRequest({
  url: 'https://saucelabs.com',
  redirect: 'https://google.com'
})
```


```js
// Blacklist requests to 3rd party vendors
browser.interceptRequest({
  url: 'https://api.segment.io/v1/p',
  error: 'Failed'
})
```


```js
// Modify requests to REST API (Mock REST API response)
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
Перевірити продуктивність вашого додатка порівняно з базовим рівнем.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Використання

```js
browser.assertPerformance(name, metrics)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Назва завдання, для якого ви створили базовий рівень.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Назви метрик, які ви хочете перевірити порівняно з базовим рівнем.</td>
    </tr>
  </tbody>
</table>

##### Приклад


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Повертає

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Об'єкт, що містить результат, а також метрики про результат.


---

## jankinessCheck
Виконати тест прокрутки, який оцінює плавність (відсутність ривків) роботи додатка.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Використання

```js
browser.jankinessCheck()
```

##### Приклад


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Повертає

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Об'єкт, що містить оцінку, а також метрики щодо того, наскільки плавним був UX сторінки під час тесту.


---

## mockRequest
Імітує мережевий ресурс.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/).

##### Використання

```js
browser.mockRequest(url, filterOptions)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>URL-шаблон для відповідності URL для імітації.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Додаткові параметри фільтрації для URL для імітації (наприклад, заголовки, метод).</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Об'єкт, що містить ідентифікатор імітованого ресурсу.


---

## getMockCalls
Отримати інформацію про запити, які відповідають імітованому ресурсу.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/).

##### Використання

```js
browser.getMockCalls(mockId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ідентифікатор імітації</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Список інформації про запити.


---

## clearMockCalls
Очистити список імітаційних викликів.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/).

##### Використання

```js
browser.clearMockCalls(mockId, restore)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ідентифікатор імітації</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Встановіть значення true, якщо імітація також повинна бути відновлена.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Відповісти, якщо імітація відповідає певному ресурсу.<br /><br />Команда Sauce Labs. Більше деталей можна знайти в [офіційній документації протоколу](https://docs.saucelabs.com/).

##### Використання

```js
browser.respondMock(mockId, payload)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ідентифікатор імітації</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Інформація про відповідь імітації.</td>
    </tr>
  </tbody>
</table>