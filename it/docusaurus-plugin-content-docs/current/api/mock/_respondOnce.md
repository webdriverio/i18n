---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Rispondi solo una volta con la sovrascrittura fornita. Puoi chiamare `respondOnce` più volte consecutive e inizierà con la risposta che hai definito per ultima. Se usi solo `respondOnce` e la risorsa viene chiamata più volte di quante ne hai definite con il mock, tornerà alla risorsa originale.

##### Utilizzo

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>payload per sovrascrivere la risposta</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`MockResponseParams`</td>
      <td>parametri di risposta aggiuntivi da sovrascrivere</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object`</td>
      <td>sovrascrivere header specifici</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Number`</td>
      <td>sovrascrivere il codice di stato della risposta</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>recupera la risposta reale prima di rispondere con i dati simulati</td>
    </tr>
  </tbody>
</table>

##### Esempio

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