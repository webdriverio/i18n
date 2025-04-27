---
id: mock
title: मॉक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

अनुरोध के प्रतिक्रिया का मॉक करें। आप एक मेल खाते [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) और उसके अनुरूप हेडर और स्टेटस कोड के आधार पर एक मॉक परिभाषित कर सकते हैं। मॉक मेथड को कॉल करने पर एक स्टब ऑब्जेक्ट मिलता है जिसका उपयोग आप वेब रिसोर्स की प्रतिक्रिया को संशोधित करने के लिए कर सकते हैं।

स्टब ऑब्जेक्ट के साथ आप या तो एक कस्टम प्रतिक्रिया लौटा सकते हैं या अनुरोध को विफल करा सकते हैं।

प्रतिक्रिया को संशोधित करने के 3 तरीके हैं:
- एक कस्टम JSON ऑब्जेक्ट लौटाना (API अनुरोध के लिए स्टबिंग)
- वेब रिसोर्स को एक स्थानीय फ़ाइल से बदलना (संशोधित JavaScript फ़ाइल सर्व करना) या
- रिसोर्स को किसी अलग URL पर रीडायरेक्ट करना

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए WebDriver Bidi के समर्थन की आवश्यकता होती है। यह आमतौर पर तब होता है जब आप Chromium आधारित ब्राउज़र या Firefox में स्थानीय रूप से टेस्ट चला रहे हों, या यदि आप Selenium Grid v4 या उच्चतर का उपयोग करते हैं। यदि आप क्लाउड में टेस्ट चलाते हैं, तो सुनिश्चित करें कि आपका क्लाउड प्रदाता WebDriver Bidi का समर्थन करता है।

:::

:::info

`URLPattern` एक प्रायोगिक तकनीक है और अभी तक कुछ वातावरणों में समर्थित नहीं है, जैसे Node.js।
हम सुझाव देते हैं कि आप [एक पॉलिफिल](https://www.npmjs.com/package/urlpattern-polyfill) इम्पोर्ट करें जब तक कि यह सुविधा अधिक व्यापक रूप से समर्थित न हो जाए।

:::

##### उपयोग

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
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
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>मॉक करने के लिए url</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`MockFilterOptions`</td>
      <td>अतिरिक्त विकल्पों द्वारा मॉक रिसोर्स फ़िल्टर करें</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String, Function`</td>
      <td>HTTP मेथड द्वारा रिसोर्स फ़िल्टर करें</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Object, Function`</td>
      <td>विशिष्ट अनुरोध हेडर्स द्वारा रिसोर्स फ़िल्टर करें</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Object, Function`</td>
      <td>विशिष्ट प्रतिक्रिया हेडर्स द्वारा रिसोर्स फ़िल्टर करें</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String, Function`</td>
      <td>अनुरोध postData द्वारा रिसोर्स फ़िल्टर करें</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number, Function`</td>
      <td>प्रतिक्रिया statusCode द्वारा रिसोर्स फ़िल्टर करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### रिटर्न्स

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                प्रतिक्रिया को संशोधित करने के लिए एक मॉक ऑब्जेक्ट