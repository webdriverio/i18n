---
id: setCookies
title: 设置Cookie
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

为当前页面设置一个或多个[cookies](https://w3c.github.io/webdriver/#cookies)。确保你已经
在需要接收cookie的页面上。你不能在不访问该页面的情况下为任意页面设置cookie。

##### 用法

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>cookie对象或对象数组。</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>cookie的名称。</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>cookie的值。</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>cookie的路径。添加cookie时如果省略，默认为"/"。</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>cookie可见的域。添加cookie时如果省略，默认为当前浏览上下文活动文档的URL域。</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>cookie是否为安全cookie。添加cookie时如果省略，默认为false。</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>cookie是否为HTTP only cookie。添加cookie时如果省略，默认为false。</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>cookie过期时间，以Unix纪元以来的秒数指定。添加cookie时必须未设置如果省略。</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>cookie是否应用于SameSite策略。添加cookie时如果省略，默认为None。可以设置为"Lax"或"Strict"。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```