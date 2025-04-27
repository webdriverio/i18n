---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Отвечает только один раз с заданной перезаписью. Вы можете вызывать `respondOnce` несколько 
раз подряд, и он начнет с ответа, который вы определили последним. Если вы 
используете только `respondOnce`, и ресурс вызывается большее количество раз, чем определен мок,
то он возвращается к исходному ресурсу.

##### Использование

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>данные для перезаписи ответа</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`MockResponseParams`</td>
      <td>дополнительные параметры ответа для перезаписи</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Object`</td>
      <td>перезаписать определенные заголовки</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>перезаписать код статуса ответа</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>получить реальный ответ перед ответом с поддельными данными</td>
    </tr>
  </tbody>
</table>

##### Пример

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