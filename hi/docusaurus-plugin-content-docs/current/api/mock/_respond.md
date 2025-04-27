---
id: respond
title: प्रतिक्रिया दें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respond.ts
---

हमेशा समान ओवरराइट के साथ प्रतिक्रिया दें।

##### उपयोग

```js
mock.respond(overwrites, { header, statusCode, fetchResponse })
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>प्रतिक्रिया को ओवरराइट करने के लिए पेलोड</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`MockResponseParams`</td>
      <td>ओवरराइट करने के लिए अतिरिक्त प्रतिक्रिया पैरामीटर्स</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Object`</td>
      <td>विशिष्ट हेडर्स ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>प्रतिक्रिया स्टेटस कोड ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>मॉक्ड डेटा के साथ प्रतिक्रिया देने से पहले वास्तविक प्रतिक्रिया प्राप्त करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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