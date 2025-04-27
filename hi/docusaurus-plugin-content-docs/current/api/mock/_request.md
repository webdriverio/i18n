---
id: request
title: रिक्वेस्ट
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

यह आपको सत्र के दौरान ब्राउज़र द्वारा की जाने वाली रिक्वेस्ट को संशोधित करने की अनुमति देता है। यह निम्नलिखित उपयोग मामलों के लिए उपयोगी हो सकता है:

- यह सत्यापित करना कि आपका एप्लिकेशन सही रिक्वेस्ट पेलोड भेज रहा है
- संरक्षित संसाधनों का परीक्षण करने के लिए प्राधिकरण हेडर पास करना
- उपयोगकर्ता प्रमाणीकरण का परीक्षण करने के लिए सत्र कुकीज़ सेट करना
- विशेष मामलों का परीक्षण करने के लिए रिक्वेस्ट को संशोधित करना

##### उपयोग

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>विशिष्ट हेडर्स को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>रिक्वेस्ट कुकीज़ को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>रिक्वेस्ट मेथड को ओवरराइट करें</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>रीडायरेक्ट शुरू करने के लिए रिक्वेस्ट यूआरएल को ओवरराइट करें</td>
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
      <td>मॉक डेटा के साथ प्रतिक्रिया देने से पहले वास्तविक प्रतिक्रिया प्राप्त करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```