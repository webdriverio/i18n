---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Zasymuluj odpowiedź żądania. Możesz zdefiniować pozorowanie (mock) na podstawie pasującego
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
i odpowiednich nagłówków oraz kodu statusu. Wywołanie metody mock
zwraca obiekt stub, którego możesz użyć do modyfikacji odpowiedzi
zasobu internetowego.

Za pomocą obiektu stub możesz albo zwrócić niestandardową odpowiedź, albo
spowodować niepowodzenie żądania.

Istnieją 3 sposoby modyfikacji odpowiedzi:
- zwrócenie niestandardowego obiektu JSON (do symulowania żądań API)
- zastąpienie zasobu internetowego lokalnym plikiem (serwowanie zmodyfikowanego pliku JavaScript) lub
- przekierowanie zasobu na inny adres URL

:::info

Pamiętaj, że korzystanie z polecenia `mock` wymaga obsługi WebDriver Bidi. Jest to
zwykle możliwe podczas lokalnego uruchamiania testów w przeglądarce opartej na Chromium lub
w Firefoksie, a także jeśli używasz Selenium Grid v4 lub nowszego. Jeśli uruchamiasz testy
w chmurze, upewnij się, że Twój dostawca usług chmurowych obsługuje WebDriver Bidi.

:::

:::info

`URLPattern` to eksperymentalna technologia, która nie jest jeszcze obsługiwana w niektórych środowiskach, np. Node.js.
Zalecamy zaimportowanie [polyfilla](https://www.npmjs.com/package/urlpattern-polyfill)
do czasu, aż funkcja będzie szerzej obsługiwana.

:::

##### Użycie

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>adres URL do zasymulowania</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`MockFilterOptions`</td>
      <td>filtruj symulowane zasoby według dodatkowych opcji</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String, Function`</td>
      <td>filtruj zasób według metody HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Object, Function`</td>
      <td>filtruj zasób według określonych nagłówków żądania</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Object, Function`</td>
      <td>filtruj zasób według określonych nagłówków odpowiedzi</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String, Function`</td>
      <td>filtruj zasób według danych postData żądania</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number, Function`</td>
      <td>filtruj zasób według kodu statusu odpowiedzi</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                obiekt mock do modyfikacji odpowiedzi