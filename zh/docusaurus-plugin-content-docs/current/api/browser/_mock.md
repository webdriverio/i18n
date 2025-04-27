---
id: mock
title: 模拟
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

模拟请求的响应。您可以基于匹配的[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)和相应的头部和状态码定义模拟。调用mock方法会返回一个存根对象，您可以使用它来修改Web资源的响应。

通过存根对象，您可以返回自定义响应或使请求失败。

有3种修改响应的方式：
- 返回自定义JSON对象（用于模拟API请求）
- 用本地文件替换Web资源（提供修改后的JavaScript文件）或
- 将资源重定向到不同的URL

:::info

请注意，使用`mock`命令需要支持WebDriver Bidi。当您在基于Chromium的浏览器或Firefox上本地运行测试时，或者使用Selenium Grid v4或更高版本时，通常都支持该功能。如果您在云端运行测试，请确保您的云提供商支持WebDriver Bidi。

:::

:::info

`URLPattern`是一项实验性技术，在某些环境中尚未得到支持，例如Node.js。
我们建议导入[一个polyfill](https://www.npmjs.com/package/urlpattern-polyfill)，直到该功能得到更广泛的支持。

:::

##### 用法

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
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
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>要模拟的url</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`MockFilterOptions`</td>
      <td>通过附加选项过滤模拟资源</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String, Function`</td>
      <td>按HTTP方法过滤资源</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object, Function`</td>
      <td>按特定请求头过滤资源</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object, Function`</td>
      <td>按特定响应头过滤资源</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String, Function`</td>
      <td>按请求postData过滤资源</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number, Function`</td>
      <td>按响应状态码过滤资源</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### 返回

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                一个用于修改响应的模拟对象