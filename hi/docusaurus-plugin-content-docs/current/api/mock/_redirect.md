---
id: redirect
title: रीडायरेक्ट
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

दिए गए मॉक के लिए एक रीडायरेक्ट सेट करता है। यह आपको किसी अनुरोध को दूसरे URL पर रीडायरेक्ट करने की अनुमति देता है।
नोट: ये रीडायरेक्ट केवल ब्राउज़र में स्क्रिप्ट द्वारा किए गए अनुरोधों पर लागू होते हैं, `url` कमांड को कॉल करते समय नहीं।

##### उपयोग

```js
mock.redirect(url)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>target resource to redirect requests to</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```