---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Mock-svaret på en begäran. Du kan definiera en mock baserat på matchande 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
och motsvarande header och statuskod. Att anropa mock-metoden
returnerar ett stub-objekt som du kan använda för att modifiera svaret på
webbresursen.

Med stub-objektet kan du antingen returnera ett anpassat svar eller
låta begäran misslyckas.

Det finns 3 sätt att modifiera svaret:
- returnera ett anpassat JSON-objekt (för att stubba API-begäran)
- ersätta webbresurs med en lokal fil (servera en modifierad JavaScript-fil) eller
- omdirigera resursen till en annan url

:::info

Observera att användning av kommandot `mock` kräver stöd för WebDriver Bidi. Det är
vanligtvis fallet när du kör tester lokalt i en Chromium-baserad webbläsare eller på
Firefox samt om du använder en Selenium Grid v4 eller högre. Om du kör tester
i molnet, se till att din molnleverantör stöder WebDriver Bidi.

:::

:::info

`URLPattern` är en experimentell teknik och stöds ännu inte i vissa miljöer, t.ex. Node.js.
Vi rekommenderar att importera [en polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
tills funktionen är mer allmänt stödd.

:::

##### Användning

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>url att mocka</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`MockFilterOptions`</td>
      <td>filtrera mock-resurs med ytterligare alternativ</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String, Function`</td>
      <td>filtrera resurs efter HTTP-metod</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object, Function`</td>
      <td>filtrera resurs efter specifika request headers</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object, Function`</td>
      <td>filtrera resurs efter specifika response headers</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String, Function`</td>
      <td>filtrera resurs efter request postData</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number, Function`</td>
      <td>filtrera resurs efter response statusCode</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                ett mock-objekt för att modifiera svaret