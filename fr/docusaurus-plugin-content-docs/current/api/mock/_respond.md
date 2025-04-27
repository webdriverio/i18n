---
id: respond
title: respond
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respond.ts
---

Répond toujours avec la même réécriture.

##### Utilisation

```js
mock.respond(overwrites, { header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>charge utile pour réécrire la réponse</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`MockResponseParams`</td>
      <td>paramètres de réponse supplémentaires à réécrire</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object`</td>
      <td>réécrire des en-têtes spécifiques</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>réécrire le code d'état de la réponse</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>récupérer la réponse réelle avant de répondre avec des données simulées</td>
    </tr>
  </tbody>
</table>

##### Exemple

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