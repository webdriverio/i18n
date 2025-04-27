---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Simular la respuesta de una solicitud. Puede definir una simulación basada en un 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
coincidente y el encabezado y código de estado correspondientes. Llamar al método mock
devuelve un objeto stub que puede usar para modificar la respuesta del
recurso web.

Con el objeto stub puede devolver una respuesta personalizada o
hacer que la solicitud falle.

Hay 3 formas de modificar la respuesta:
- devolver un objeto JSON personalizado (para simular solicitudes de API)
- reemplazar el recurso web con un archivo local (servir un archivo JavaScript modificado) o
- redirigir el recurso a una URL diferente

:::info

Tenga en cuenta que el uso del comando `mock` requiere soporte para WebDriver Bidi. Eso
suele ser el caso cuando se ejecutan pruebas localmente en un navegador basado en Chromium o en
Firefox, así como si utiliza Selenium Grid v4 o superior. Si ejecuta pruebas
en la nube, asegúrese de que su proveedor de servicios en la nube admita WebDriver Bidi.

:::

:::info

El `URLPattern` es una tecnología experimental y aún no es compatible con algunos entornos, por ejemplo, Node.js.
Recomendamos importar [un polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
hasta que la función tenga un soporte más amplio.

:::

##### Uso

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>url para simular</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`MockFilterOptions`</td>
      <td>filtrar recurso simulado por opciones adicionales</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String, Function`</td>
      <td>filtrar recurso por método HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object, Function`</td>
      <td>filtrar recurso por encabezados de solicitud específicos</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object, Function`</td>
      <td>filtrar recurso por encabezados de respuesta específicos</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String, Function`</td>
      <td>filtrar recurso por postData de solicitud</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number, Function`</td>
      <td>filtrar recurso por código de estado de respuesta</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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

##### Devuelve

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                un objeto mock para modificar la respuesta