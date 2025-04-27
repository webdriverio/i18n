---
id: respond
title: பதிலளி
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respond.ts
---

எப்போதும் ஒரே மேலெழுதலுடன் பதிலளிக்கவும்.

##### பயன்பாடு

```js
mock.respond(overwrites, { header, statusCode, fetchResponse })
```

##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>பதிலை மேலெழுத பயன்படுத்தப்படும் பேலோடு</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`MockResponseParams`</td>
      <td>மேலெழுத கூடுதலான பதிலளிக்கும் அளபுருக்கள்</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Object`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>பதில் நிலைக் குறியீட்டை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>போலியான தரவுகளுடன் பதிலளிப்பதற்கு முன் உண்மையான பதிலைப் பெறவும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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