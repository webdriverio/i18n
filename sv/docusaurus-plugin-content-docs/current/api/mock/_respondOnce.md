---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Svara endast en gång med given överskrivning. Du kan anropa `respondOnce` flera 
gånger i följd och det kommer att börja med det svar du definierade senast. Om du 
endast använder `respondOnce` och resursen anropas fler gånger än en mock har 
definierats så återgår den till den ursprungliga resursen.

##### Användning

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>data för att skriva över svaret</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`MockResponseParams`</td>
      <td>ytterligare svarsparametrar att skriva över</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object`</td>
      <td>skriv över specifika headers</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>skriv över svarets statuskod</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>hämta verkligt svar innan man svarar med mockad data</td>
    </tr>
  </tbody>
</table>

##### Exempel

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