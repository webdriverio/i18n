---
id: redirect
title: 重定向
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

为给定的模拟设置重定向。这允许您将请求重定向到另一个URL。
注意：这些重定向仅适用于浏览器中脚本发出的请求，而不适用于调用`url`命令时。

##### Usage

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>要将请求重定向到的目标资源</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```