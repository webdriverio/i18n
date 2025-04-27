---
id: respondOnce
title: respondOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

Відповідає тільки один раз із заданим перевизначенням. Ви можете викликати `respondOnce` декілька разів підряд, і перша відповідь буде тою, яку ви визначили останньою. Якщо ви використовуєте тільки `respondOnce` і ресурс викликається більше разів, ніж було визначено мок, він повертається до оригінального ресурсу.

##### Використання

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>корисне навантаження для перевизначення відповіді</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`MockResponseParams`</td>
      <td>додаткові параметри відповіді для перевизначення</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Object`</td>
      <td>перевизначити конкретні заголовки</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>перевизначити код статусу відповіді</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Boolean`</td>
      <td>отримати реальну відповідь перед відповіддю з мок-даними</td>
    </tr>
  </tbody>
</table>

##### Приклад

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