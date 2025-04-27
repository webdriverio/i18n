---
id: call
title: कॉल
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

आप अपने टेस्ट स्पेक में किसी भी एसिंक एक्शन को एक्जीक्यूट करने के लिए `call` का उपयोग कर सकते हैं।
यह प्रॉमिस स्वीकार करता है और प्रॉमिस के हल होने तक एक्जीक्यूशन को रोक देता है।

:::info

WebdriverIO के सिंक्रोनस उपयोग को डेप्रिकेट करने के साथ (देखें [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
यह कमांड अब बहुत उपयोगी नहीं है।

:::

##### उपयोग

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>function to be called</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="call.js"
it('some testing here', async () => {
    await browser.url('http://google.com')
    // make an asynchronous call using any 3rd party library supporting promises
    // e.g. call to backend or db to inject fixture data
    await browser.call(() => {
        return somePromiseLibrary.someMethod().then(() => {
            // ...
        })
    })

    // example for async call to 3rd party library that doesn't support promises
    const result = await browser.call(() => {
        return new Promise((resolve, reject) => {
            someOtherNodeLibrary.someMethod(param1, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    })
});
```