---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Имитация ответа на запрос. Вы можете определить имитацию на основе соответствующего 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
и соответствующего заголовка и кода состояния. Вызов метода mock
возвращает объект-заглушку, который можно использовать для изменения ответа
веб-ресурса.

С помощью объекта-заглушки вы можете либо вернуть пользовательский ответ, либо
имитировать сбой запроса.

Существует 3 способа изменения ответа:
- вернуть пользовательский JSON-объект (для заглушки API-запроса)
- заменить веб-ресурс локальным файлом (обслуживание модифицированного JavaScript-файла) или
- перенаправить ресурс на другой URL-адрес

:::info

Обратите внимание, что использование команды `mock` требует поддержки WebDriver Bidi. Это
обычно так, когда вы запускаете тесты локально в браузере на основе Chromium или в
Firefox, а также если вы используете Selenium Grid v4 или выше. Если вы запускаете тесты
в облаке, убедитесь, что ваш облачный провайдер поддерживает WebDriver Bidi.

:::

:::info

`URLPattern` - это экспериментальная технология, которая еще не поддерживается в некоторых средах, например, в Node.js.
Мы рекомендуем импортировать [полифилл](https://www.npmjs.com/package/urlpattern-polyfill),
пока эта функция не будет более широко поддерживаться.

:::

##### Использование

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>URL для имитации</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`MockFilterOptions`</td>
      <td>фильтрация имитируемого ресурса по дополнительным параметрам</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String, Function`</td>
      <td>фильтрация ресурса по HTTP-методу</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Object, Function`</td>
      <td>фильтрация ресурса по определенным заголовкам запроса</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Object, Function`</td>
      <td>фильтрация ресурса по определенным заголовкам ответа</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String, Function`</td>
      <td>фильтрация ресурса по данным запроса postData</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Number, Function`</td>
      <td>фильтрация ресурса по коду состояния ответа</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### Возвращает

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                объект mock для изменения ответа