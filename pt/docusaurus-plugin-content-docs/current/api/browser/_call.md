---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Você pode usar `call` para executar qualquer ação assíncrona dentro de sua especificação de teste.
Ele aceita promessas e para a execução até que a promessa tenha sido resolvida.

:::info

Com o WebdriverIO descontinuando o uso síncrono (veja [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
este comando não é mais muito útil.

:::

##### Uso

```js
browser.call(callback)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>função a ser chamada</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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