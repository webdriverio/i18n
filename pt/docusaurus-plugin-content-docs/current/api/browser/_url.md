---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

O comando `url` carrega uma URL no navegador. Se um baseUrl for especificado na configuração,
ele será adicionado ao início do parâmetro url usando o método url.resolve() do Node. Chamar
`browser.url('...')` com a mesma url da última vez acionará um recarregamento da página. No entanto,
se a url contiver um hash, o navegador não acionará uma nova navegação e o usuário
precisará [atualizar](/docs/api/webdriver#refresh) a página para acionar uma.

O comando retorna um objeto `WebdriverIO.Request` que contém informações sobre o
pedido e dados de resposta do carregamento da página:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

O comando suporta as seguintes opções:

### wait
O estado desejado em que o recurso solicitado deve estar antes de finalizar o comando.
Suporta os seguintes estados:

 - `none`: sem espera após a solicitação da página ser feita e a resposta ser recebida
 - `interactive`: aguardar até que a página esteja interativa
 - `complete`: aguardar até que a árvore DOM da página esteja totalmente carregada
 - `networkIdle`: aguardar até que não haja solicitações de rede pendentes

### headers

Cabeçalhos a serem enviados com a solicitação.

__Padrão:__ `{}`

### auth

Credenciais de autenticação básica.
Nota: isso substituirá o cabeçalho `Authorization` existente, se fornecido na opção `headers`.

### timeout

Se definido como um número, o comando aguardará a quantidade especificada de milissegundos para que a página carregue
todas as respostas antes de retornar.

Nota: para que isso tenha impacto, é necessário que a opção `wait` seja definida como `networkIdle`.

__Padrão:__ `5000`

##### Uso

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>a URL para navegar</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`UrlOptions`</td>
      <td>opções de navegação</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>O estado desejado em que o recurso solicitado deve estar antes de finalizar o comando. Padrão: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Se definido como um número, o comando aguardará a quantidade especificada de milissegundos para que a página carregue
todas as respostas antes de retornar. Padrão: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Function`</td>
      <td>Uma função que é chamada antes que sua página tenha carregado todos os seus recursos. Ela permite que você simule facilmente
o ambiente, por exemplo, substituindo APIs da Web que sua aplicação usa.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>credenciais de autenticação básica</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Record<string, string>`</td>
      <td>cabeçalhos a serem enviados com a solicitação</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### Retorna

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  um objeto de requisição do carregamento da página com informações sobre os dados da requisição e resposta