---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Puoi utilizzare `call` per eseguire qualsiasi azione asincrona all'interno della tua specifica di test.
Accetta promesse e ferma l'esecuzione fino a quando la promessa non è stata risolta.

:::info

Con WebdriverIO che depreca l'uso sincrono (vedi [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
questo comando non è più molto utile.

:::

##### Utilizzo

```js
browser.call(callback)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>funzione da chiamare</td>
    </tr>
  </tbody>
</table>

##### Esempio

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