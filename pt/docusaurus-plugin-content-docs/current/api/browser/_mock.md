---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Simule a resposta de uma requisição. Você pode definir uma simulação baseada em um padrão 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
correspondente e cabeçalho e código de status correspondentes. Chamar o método mock
retorna um objeto stub que você pode usar para modificar a resposta do
recurso web.

Com o objeto stub, você pode então retornar uma resposta personalizada ou
fazer com que a requisição falhe.

Existem 3 maneiras de modificar a resposta:
- retornar um objeto JSON personalizado (para simular requisições de API)
- substituir o recurso web por um arquivo local (servir um arquivo JavaScript modificado) ou
- redirecionar o recurso para uma URL diferente

:::info

Observe que usar o comando `mock` requer suporte para WebDriver Bidi. Isso
geralmente é o caso quando você executa testes localmente em um navegador baseado em Chromium ou no
Firefox, bem como se você usar um Selenium Grid v4 ou superior. Se você executar testes
na nuvem, certifique-se de que seu provedor de nuvem suporte WebDriver Bidi.

:::

:::info

O `URLPattern` é uma tecnologia experimental e ainda não é suportado em alguns ambientes, como Node.js.
Recomendamos importar [um polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
até que o recurso seja mais amplamente suportado.

:::

##### Uso

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
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
      <td>filtrar recurso simulado por opções adicionais</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String, Function`</td>
      <td>filtrar recurso por método HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object, Function`</td>
      <td>filtrar recurso por cabeçalhos de requisição específicos</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object, Function`</td>
      <td>filtrar recurso por cabeçalhos de resposta específicos</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String, Function`</td>
      <td>filtrar recurso por postData da requisição</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number, Function`</td>
      <td>filtrar recurso por código de status da resposta</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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

##### Retorna

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                um objeto mock para modificar a resposta