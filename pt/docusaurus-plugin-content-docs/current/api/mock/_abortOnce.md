---
id: abortOnce
title: abortOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abortOnce.ts
---

Abortar a requisição uma vez com um dos seguintes códigos de erro:
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`.

##### Uso

```js
mock.abortOnce(errorCode)
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
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>código de erro da resposta, pode ser um de: `Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="abortOnce.js"
it('should block mock only once', async () => {
    const mock = await browser.mock('https://webdriver.io')
    mock.abortOnce('Failed')

    await browser.url('https://webdriver.io')
        // catch failing command as page can't be loaded
        .catch(() => {})
    console.log(await browser.getTitle()) // outputs: ""

    await browser.url('https://webdriver.io')
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```