---
id: requestOnce
title: रिक्वेस्टवन्स
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

केवल अगले अनुरोध के लिए दिए गए ओवरराइट के साथ अनुरोध पैरामीटर को एक बार बदलें। आप `requestOnce` को कई बार लगातार कॉल कर सकते हैं और यह ओवरराइट्स को क्रम में लागू करेगा। यदि आप केवल `requestOnce` का उपयोग करते हैं और रिसोर्स को उतनी बार से अधिक कॉल किया जाता है जितनी बार मॉक परिभाषित किया गया है, तो यह मूल रिसोर्स पर वापस लौट जाता है।

##### उपयोग

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>विशिष्ट हेडर्स को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>अनुरोध कुकीज़ को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>अनुरोध विधि को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>रीडायरेक्ट शुरू करने के लिए अनुरोध URL को ओवरराइट करें</td>
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
      <td>प्रतिक्रिया स्थिति कोड को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>मॉक किए गए डेटा के साथ प्रतिक्रिया देने से पहले वास्तविक प्रतिक्रिया प्राप्त करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```