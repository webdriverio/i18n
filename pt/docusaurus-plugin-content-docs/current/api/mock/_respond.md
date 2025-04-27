---
id: respond
title: respond
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respond.ts
---

Sempre responde com a mesma sobrescrita.

##### Uso

```js
mock.respond(overwrites, { header, statusCode, fetchResponse })
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
      <td>payload para sobrescrever a resposta</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`MockResponseParams`</td>
      <td>parâmetros adicionais de resposta para sobrescrever</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>sobrescrever cabeçalhos específicos</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>sobrescrever código de status da resposta</td>
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
it('should demonstrate response overwrite with static data', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
        method: 'get'
    })

    mock.respond([{
        title: 'Injected (non) completed Todo',
        order: null,
        completed: false
    }, {
        title: 'Injected completed Todo',
        order: null,
        completed: true
    }], {
        statusCode: 200,
        fetchResponse: true // default
    })

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

    await $('#todo-list li').waitForExist()
    console.log(await $$('#todo-list li').map(el => el.getText()))
    // outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
})

it('should demonstrate response overwrite with dynamic data', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

    mock.respond((request) => {
        if (request.body.username === 'test') {
            return { ...request.body, foo: 'bar' }
        }
        return request.body
    }, {
        statusCode: () => 200,
        headers: () => ({ foo: 'bar }),
        fetchResponse: false // do not fetch real response
    })
})
```