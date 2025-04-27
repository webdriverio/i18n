---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

You can use `call` to execute any async action within your test spec.
It accepts promises and stops the execution until the promise has been resolved.

:::info

With WebdriverIO deprecating synchronous usage (see [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
this command is not very useful anymore.

:::

##### Usage

```js
browser.call(callback)
```

##### Parameters

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

##### Example

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

