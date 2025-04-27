---
id: abortOnce
title: abortOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abortOnce.ts
---

Abort the request once with one of the following error codes:
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`.

##### Usage

```js
mock.abortOnce(errorCode)
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
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>error code of the response, can be one of: `Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### Example

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

