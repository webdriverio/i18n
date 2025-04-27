---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Vous pouvez utiliser `call` pour exécuter n'importe quelle action asynchrone dans votre test spec.
Il accepte les promesses et arrête l'exécution jusqu'à ce que la promesse soit résolue.

:::info

Avec WebdriverIO dépréciant l'utilisation synchrone (voir [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
cette commande n'est plus très utile.

:::

##### Utilisation

```js
browser.call(callback)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>fonction à appeler</td>
    </tr>
  </tbody>
</table>

##### Exemple

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