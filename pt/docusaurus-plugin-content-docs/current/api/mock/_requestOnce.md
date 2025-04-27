---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Altera os parâmetros da requisição apenas uma vez com a substituição fornecida para a próxima requisição. Você pode chamar `requestOnce` várias vezes consecutivas e ele aplicará as substituições em ordem. Se você usar apenas `requestOnce` e o recurso for chamado mais vezes do que um mock foi definido, ele volta ao recurso original por padrão.

##### Uso

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>payload para substituir a resposta</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>substituir cabeçalhos específicos</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>substituir cookies da requisição</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>substituir método da requisição</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>substituir URL da requisição para iniciar um redirecionamento</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`MockResponseParams`</td>
      <td>parâmetros adicionais de resposta para substituir</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>substituir cabeçalhos específicos</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>substituir código de status da resposta</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>buscar resposta real antes de responder com dados simulados</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```