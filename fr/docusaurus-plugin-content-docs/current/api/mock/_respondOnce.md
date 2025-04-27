---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Répond une seule fois avec la modification donnée. Vous pouvez appeler `respondOnce` plusieurs fois consécutives et cela commencera par la réponse que vous avez définie en dernier. Si vous utilisez uniquement `respondOnce` et que la ressource est appelée plus de fois qu'un mock a été défini, elle revient par défaut à la ressource originale.

##### Utilisation

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
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
      <td>charge utile pour remplacer la réponse</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`MockResponseParams`</td>
      <td>paramètres de réponse supplémentaires à remplacer</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object`</td>
      <td>remplacer des en-têtes spécifiques</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>remplacer le code d'état de la réponse</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>récupérer la réponse réelle avant de répondre avec des données simulées</td>
    </tr>
  </tbody>
</table>

##### Exemple

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