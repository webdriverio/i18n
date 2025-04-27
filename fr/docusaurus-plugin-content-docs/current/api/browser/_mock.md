---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Simuler la réponse d'une requête. Vous pouvez définir une simulation basée sur un 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
correspondant et des en-têtes et codes d'état correspondants. L'appel de la méthode mock
renvoie un objet stub que vous pouvez utiliser pour modifier la réponse de la
ressource web.

Avec l'objet stub, vous pouvez soit renvoyer une réponse personnalisée, soit
faire échouer la requête.

Il existe 3 façons de modifier la réponse :
- renvoyer un objet JSON personnalisé (pour simuler une requête API)
- remplacer une ressource web par un fichier local (servir un fichier JavaScript modifié) ou
- rediriger la ressource vers une URL différente

:::info

Notez que l'utilisation de la commande `mock` nécessite la prise en charge de WebDriver Bidi. C'est
généralement le cas lorsque vous exécutez des tests localement dans un navigateur basé sur Chromium ou sur
Firefox, ainsi que si vous utilisez Selenium Grid v4 ou supérieur. Si vous exécutez des tests
dans le cloud, assurez-vous que votre fournisseur cloud prend en charge WebDriver Bidi.

:::

:::info

L'`URLPattern` est une technologie expérimentale et n'est pas encore prise en charge dans certains environnements, par exemple Node.js.
Nous vous recommandons d'importer [un polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
jusqu'à ce que la fonctionnalité soit plus largement prise en charge.

:::

##### Utilisation

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>url à simuler</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`MockFilterOptions`</td>
      <td>filtrer la ressource simulée par des options supplémentaires</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String, Function`</td>
      <td>filtrer la ressource par méthode HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object, Function`</td>
      <td>filtrer la ressource par en-têtes de requête spécifiques</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object, Function`</td>
      <td>filtrer la ressource par en-têtes de réponse spécifiques</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String, Function`</td>
      <td>filtrer la ressource par les données postData de la requête</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number, Function`</td>
      <td>filtrer la ressource par code d'état de la réponse</td>
    </tr>
  </tbody>
</table>

##### Exemple

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

##### Retourne

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                un objet mock pour modifier la réponse