---
id: abort
title: 中止
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abort.ts
---

使用以下错误代码之一中止请求：
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`.

##### 用法

```js
mock.abort(errorCode)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>响应的错误代码，可以是以下之一：`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="abort.js"
it('should block Google Analytics from page', async () => {
    const mock = await browser.mock('https://www.google-analytics.com/**')
    mock.abort('Failed')
})
```