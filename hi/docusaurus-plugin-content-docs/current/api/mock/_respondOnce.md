---
id: respondOnce
title: respondOnce (केवल एक बार प्रतिक्रिया देना)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

केवल एक बार दिए गए ओवरराइट के साथ प्रतिक्रिया दें। आप `respondOnce` को कई बार लगातार कॉल कर सकते हैं और यह आपके द्वारा अंतिम परिभाषित प्रतिक्रिया से शुरू होगा। यदि आप केवल `respondOnce` का उपयोग करते हैं और संसाधन को मॉक को परिभाषित करने से अधिक बार कॉल किया जाता है, तो यह वापस मूल संसाधन पर लौट जाता है।

##### उपयोग

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
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
      <td>विशिष्ट हेडर्स को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>प्रतिक्रिया स्टेटस कोड को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>मॉक किए गए डेटा के साथ प्रतिक्रिया देने से पहले वास्तविक प्रतिक्रिया प्राप्त करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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