---
id: abortOnce
title: abortOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abortOnce.ts
---

以下のエラーコードのいずれかを使用して、リクエストを一度だけ中止します：
`Failed`、`Aborted`、`TimedOut`、`AccessDenied`、`ConnectionClosed`、
`ConnectionReset`、`ConnectionRefused`、`ConnectionAborted`、
`ConnectionFailed`、`NameNotResolved`、`InternetDisconnected`、
`AddressUnreachable`、`BlockedByClient`、`BlockedByResponse`。

##### 使用法

```js
mock.abortOnce(errorCode)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>レスポンスのエラーコード、以下のいずれかになります：`Failed`、`Aborted`、`TimedOut`、`AccessDenied`、`ConnectionClosed`、`ConnectionReset`、`ConnectionRefused`、`ConnectionAborted`、`ConnectionFailed`、`NameNotResolved`、`InternetDisconnected`、`AddressUnreachable`、`BlockedByClient`、`BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### 例

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