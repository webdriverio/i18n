I'll translate this Markdown content from English to German, following your specifications.

---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Mit `call` können Sie jede asynchrone Aktion innerhalb Ihrer Test-Spezifikation ausführen.
Es akzeptiert Promises und hält die Ausführung an, bis das Promise aufgelöst wurde.

:::info

Da WebdriverIO die synchrone Verwendung auslaufen lässt (siehe [RFC](https://github.com/webdriverio/webdriverio/discussions/6702)), 
ist dieser Befehl nicht mehr sehr nützlich.

:::

##### Verwendung

```js
browser.call(callback)
```

##### Parameter

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
      <td>Funktion, die aufgerufen werden soll</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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