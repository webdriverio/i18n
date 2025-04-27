---
id: requestOnce
title: 仅请求一次
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

仅在下一次请求时使用给定的覆写更改请求参数一次。您可以连续多次调用 `requestOnce`，它将按顺序应用这些覆写。如果您只使用 `requestOnce` 并且资源被调用的次数超过了已定义的模拟次数，则会默认回退到原始资源。

##### 用法

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>用于覆写响应的载荷</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>覆写特定头信息</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>覆写请求cookies</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>覆写请求方法</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>覆写请求URL以启动重定向</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`MockResponseParams`</td>
      <td>要覆写的额外响应参数</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object`</td>
      <td>覆写特定头信息</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>覆写响应状态码</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>在使用模拟数据响应前获取真实响应</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```