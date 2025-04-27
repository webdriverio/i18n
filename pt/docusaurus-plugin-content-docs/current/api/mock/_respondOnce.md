---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Responde apenas uma vez com a substituição fornecida. Você pode chamar `respondOnce` múltiplas
vezes consecutivas e ele começará com a resposta que você definiu por último. Se você
usar apenas `respondOnce` e o recurso for chamado mais vezes do que um mock foi
definido, ele volta ao recurso original.

##### Uso

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
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

```js title="respondOnce.js"
async function getToDos () {
    await $('#todo-list li').waitForExist()
    return $$('#todo-list li').map(el => el.getText())
}

it('should demonstrate the respondOnce command', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
        method: 'get'
    })

    mock.respondOnce([{
        title: '3'
    }, {
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '1'
    }])

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '3', '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs actual resource response
})
```