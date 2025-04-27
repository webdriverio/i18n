---
id: mock
title: mock (імітація)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Імітація відповіді на запит. Ви можете визначити імітацію на основі відповідного 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
та відповідних заголовків і кодів статусу. Виклик методу mock
повертає об'єкт-заглушку, який можна використовувати для зміни відповіді
веб-ресурсу.

За допомогою об'єкта-заглушки ви можете повернути власну відповідь або
спричинити невдалий запит.

Існує 3 способи змінити відповідь:
- повернути власний JSON-об'єкт (для заглушки API-запиту)
- замінити веб-ресурс локальним файлом (обслуговування модифікованого JavaScript-файлу) або
- перенаправити ресурс на іншу URL-адресу

:::info

Зауважте, що використання команди `mock` вимагає підтримки WebDriver Bidi. Це
зазвичай так при локальному запуску тестів у браузері на основі Chromium або на
Firefox, а також при використанні Selenium Grid v4 або вище. Якщо ви запускаєте тести
у хмарі, переконайтеся, що ваш хмарний провайдер підтримує WebDriver Bidi.

:::

:::info

`URLPattern` є експериментальною технологією і ще не підтримується в деяких середовищах, наприклад, Node.js.
Ми рекомендуємо імпортувати [поліфіл](https://www.npmjs.com/package/urlpattern-polyfill)
доки ця функція не буде широко підтримуватися.

:::

##### Використання

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
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
      <td>`String`</td>
      <td>URL для імітації</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`MockFilterOptions`</td>
      <td>фільтрація імітованих ресурсів за додатковими параметрами</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`String, Function`</td>
      <td>фільтрація ресурсу за HTTP-методом</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Object, Function`</td>
      <td>фільтрація ресурсу за певними заголовками запиту</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Object, Function`</td>
      <td>фільтрація ресурсу за певними заголовками відповіді</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`String, Function`</td>
      <td>фільтрація ресурсу за даними запиту (postData)</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number, Function`</td>
      <td>фільтрація ресурсу за кодом статусу відповіді</td>
    </tr>
  </tbody>
</table>

##### Приклад

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

##### Повертає

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                об'єкт імітації для зміни відповіді