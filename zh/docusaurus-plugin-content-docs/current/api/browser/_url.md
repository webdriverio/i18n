---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

`url` 命令在浏览器中加载 URL。如果在配置中指定了 baseUrl，它将使用 node 的 url.resolve() 方法将其添加到 url 参数前面。使用相同 url 调用 `browser.url('...')` 将触发页面重新加载。然而，如果 url 包含哈希值，浏览器将不会触发新的导航，用户必须[刷新](/docs/api/webdriver#refresh)页面才能触发导航。

该命令返回一个 `WebdriverIO.Request` 对象，其中包含页面加载的请求和响应数据信息：

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

该命令支持以下选项：

### wait
请求资源在完成命令前应处于的期望状态。
它支持以下状态：

 - `none`：页面请求完成并收到响应后不等待
 - `interactive`：等待页面变为可交互状态
 - `complete`：等待页面的 DOM 树完全加载
 - `networkIdle`：等待直到没有待处理的网络请求

### headers

与请求一起发送的头信息。

__默认值：__ `{}`

### auth

基本身份验证凭据。
注意：如果在 `headers` 选项中提供了 `Authorization` 头，这将覆盖现有的 `Authorization` 头。

### timeout

如果设置为数字，命令将等待指定的毫秒数，等待页面加载所有响应后再返回。

注意：要使此选项生效，需要将 `wait` 选项设置为 `networkIdle`。

__默认值：__ `5000`

##### 用法

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>要导航到的 URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`UrlOptions`</td>
      <td>导航选项</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>请求的资源在完成命令前应处于的期望状态。默认值：'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>如果设置为数字，命令将等待指定的毫秒数，等待页面加载所有响应后再返回。默认值：5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Function`</td>
      <td>在页面加载所有资源之前调用的函数。它允许您轻松模拟环境，例如重写应用程序使用的 Web API。</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>基本身份验证凭据</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Record<string, string>`</td>
      <td>与请求一起发送的头信息</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### 返回值

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  页面加载的请求对象，包含请求和响应数据的信息