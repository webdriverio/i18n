---
id: abort
title: abort（中止）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abort.ts
---

以下のエラーコードのいずれかでリクエストを中止します：
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`.

##### 使用方法

```js
mock.abort(errorCode)
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
      <td>レスポンスのエラーコード。次のいずれかを指定できます：`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="abort.js"
it('should block Google Analytics from page', async () => {
    const mock = await browser.mock('https://www.google-analytics.com/**')
    mock.abort('Failed')
})
```