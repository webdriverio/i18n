---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Simula la risposta di una richiesta. Puoi definire un mock basato su un modello di corrispondenza
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
e i corrispondenti header e codice di stato. Chiamare il metodo mock
restituisce un oggetto stub che puoi utilizzare per modificare la risposta della
risorsa web.

Con l'oggetto stub puoi quindi restituire una risposta personalizzata o
far fallire la richiesta.

Ci sono 3 modi per modificare la risposta:
- restituire un oggetto JSON personalizzato (per simulare richieste API)
- sostituire la risorsa web con un file locale (servire un file JavaScript modificato) o
- reindirizzare la risorsa a un URL diverso

:::info

Nota che l'utilizzo del comando `mock` richiede il supporto per WebDriver Bidi. Questo
è generalmente il caso quando si eseguono test localmente in un browser basato su Chromium o
su Firefox, così come se si utilizza Selenium Grid v4 o superiore. Se esegui test
nel cloud, assicurati che il tuo provider cloud supporti WebDriver Bidi.

:::

:::info

L'`URLPattern` è una tecnologia sperimentale e non ancora supportata in alcuni ambienti, ad esempio Node.js.
Consigliamo di importare [un polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
fino a quando la funzione non sarà più ampiamente supportata.

:::

##### Utilizzo

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>url da simulare</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`MockFilterOptions`</td>
      <td>filtra la risorsa mock con opzioni aggiuntive</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String, Function`</td>
      <td>filtra la risorsa per metodo HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object, Function`</td>
      <td>filtra la risorsa per specifici header di richiesta</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object, Function`</td>
      <td>filtra la risorsa per specifici header di risposta</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String, Function`</td>
      <td>filtra la risorsa per i dati postData della richiesta</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number, Function`</td>
      <td>filtra la risorsa per il codice di stato della risposta</td>
    </tr>
  </tbody>
</table>

##### Esempio

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

##### Restituisce

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                un oggetto mock per modificare la risposta