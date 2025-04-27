---
id: abortOnce
title: abortOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abortOnce.ts
---

Прервать запрос один раз с использованием одного из следующих кодов ошибок:
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`.

##### Использование

```js
mock.abortOnce(errorCode)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>код ошибки ответа, может быть одним из: `Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### Пример

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