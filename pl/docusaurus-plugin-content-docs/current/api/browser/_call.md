---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Możesz użyć `call` do wykonania dowolnej asynchronicznej akcji w ramach twojej specyfikacji testowej.
Akceptuje obietnice (promises) i zatrzymuje wykonanie do momentu rozwiązania obietnicy.

:::info

Z powodu wycofywania synchronicznego użycia WebdriverIO (zobacz [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
ta komenda nie jest już zbyt przydatna.

:::

##### Użycie

```js
browser.call(callback)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>funkcja do wywołania</td>
    </tr>
  </tbody>
</table>

##### Przykład

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