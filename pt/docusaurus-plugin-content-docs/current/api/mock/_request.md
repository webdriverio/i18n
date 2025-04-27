---
id: request
title: requisição
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Permite modificar requisições que o navegador faz durante a sessão. Isso pode ser útil para os seguintes casos de uso:

- validar se sua aplicação envia cargas de requisição corretas
- passar cabeçalhos de autorização para testar recursos protegidos
- definir cookies de sessão para testar autenticação do usuário
- modificar requisições para testar casos extremos

##### Uso

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>substituir cabeçalhos específicos</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>substituir cookies de requisição</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>substituir método de requisição</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>substituir URL de requisição para iniciar um redirecionamento</td>
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
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```