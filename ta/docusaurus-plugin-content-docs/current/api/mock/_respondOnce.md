---
id: respondOnce
title: ஒருமுறை பதிலளித்தல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

கொடுக்கப்பட்ட மாற்றியமைப்புடன் ஒரு முறை மட்டுமே பதிலளிக்கவும். நீங்கள் `respondOnce` ஐ தொடர்ச்சியாக பல முறை அழைக்கலாம், மற்றும் இது நீங்கள் கடைசியாக வரையறுத்த பதிலில் இருந்து தொடங்கும். நீங்கள் `respondOnce` மட்டுமே பயன்படுத்தினால், மாக் வரையறுத்ததை விட அதிக முறை வளம் அழைக்கப்பட்டால், அது அசல் வளத்திற்கு மீண்டும் இயல்புநிலைக்கு செல்கிறது.

##### பயன்பாடு

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### அளவுருக்கள்

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
      <td>பதிலை மாற்றியமைக்க பேலோடு</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`MockResponseParams`</td>
      <td>மாற்றியமைக்க கூடுதல் பதில் அளவுருக்கள்</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Object`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மாற்றியமை</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>பதில் நிலை குறியீட்டை மாற்றியமை</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>போலியான தரவுடன் பதிலளிப்பதற்கு முன் உண்மையான பதிலைப் பெறுக</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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