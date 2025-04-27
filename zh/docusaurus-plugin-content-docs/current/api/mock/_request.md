---
id: request
title: 请求
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

允许你修改浏览器在会话期间发出的请求。这对以下用例很有用：

- 验证你的应用程序是否发送了正确的请求负载
- 传递授权头以测试受保护的资源
- 设置会话 cookie 以测试用户身份验证
- 修改请求以测试边缘情况

##### 用法

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>用于覆盖响应的载荷</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>覆盖特定的头信息</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>覆盖请求的 cookie</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>覆盖请求方法</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>覆盖请求的 URL 以启动重定向</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`MockResponseParams`</td>
      <td>要覆盖的额外响应参数</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object`</td>
      <td>覆盖特定的头信息</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>覆盖响应状态码</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>在使用模拟数据响应之前获取真实响应</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```