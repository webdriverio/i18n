---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

所有命令仅在使用 Sauce Labs 的 Chrome 浏览器上支持
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
功能。您可以通过设置以下 Sauce 选项来启用这些功能：


```js
{
    browserName: 'Chrome',
    browserVersion: 'latest',
    platformName: 'Windows 10',
    'sauce:options': {
        extendedDebugging: true
    }
}
```

---

## getPageLogs
获取基于最后一次页面加载的网页特定日志信息。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/insights/debug/#network-logs)中找到。

##### 用法

```js
browser.getPageLogs(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>日志类型 (例如 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 获取网络日志
console.log(browser.getPageLogs('sauce:network'));
/**
 * 输出:
 * [{
 *   "url": "https://app.saucelabs.com/dashboard",
 *   "statusCode": 200,
 *   "method": "GET",
 *   "requestHeaders": {
 *     ...
 *   },
 *   "responseHeaders": {
 *     ...
 *   },
 *   "timing": {
 *     ...
 *   }
 * }, {,
 *   ...
 * }]
 */
```


```js
// 获取性能日志 (需要 capturePerformance 功能，参见: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * 输出:
 * {
 *   "speedIndex": 1472.023,
 *   "timeToFirstInteractive": 1243.214,
 *   "firstMeaningfulPaint": 892.643,
 *   ...
 * }
 */
```


##### 返回

- **&lt;object&gt;**
            **<code><var>log</var></code>:** 所需类型的日志输出 (参见示例)


---

## sauceThrottleNetwork
通过网络调节，您可以在各种网络连接上测试您的网站，包括 Edge、3G，甚至离线状态。您可以限制数据吞吐量，包括最大下载和上传吞吐量，并使用延迟操作来强制连接往返时间 (RTT) 的最小延迟。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork)中找到。

##### 用法

```js
browser.sauceThrottleNetwork(condition)
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
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>要设置的网络条件 (例如 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 预定义的网络条件
browser.sauceThrottleNetwork('offline')
```


```js
// 自定义网络条件
browser.sauceThrottleNetwork({
  download: 1000,
  upload: 500,
  latency: 40'
})
```



---

## throttleCPU
您可以在 DevTools 中限制 CPU 以了解您的页面在该限制下的性能表现。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu)中找到。

##### 用法

```js
browser.throttleCPU(rate)
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
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>CPU 应该被限制的比率。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 限制 CPU 使其运行速度变慢4倍
browser.throttleCPU(4)
```


```js
// 重置 CPU 限制
browser.throttleCPU(0)
```



---

## interceptRequest
允许修改浏览器发出的任何请求。您可以根据测试需要将这些请求列入黑名单、修改或重定向。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/insights/debug/#intercept-network-requests)中找到。

##### 用法

```js
browser.interceptRequest(rule)
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
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>描述请求拦截的规则。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 重定向请求
browser.interceptRequest({
  url: 'https://saucelabs.com',
  redirect: 'https://google.com'
})
```


```js
// 将第三方供应商的请求列入黑名单
browser.interceptRequest({
  url: 'https://api.segment.io/v1/p',
  error: 'Failed'
})
```


```js
// 修改对 REST API 的请求 (模拟 REST API 响应)
browser.interceptRequest({
  url: 'http://sampleapp.appspot.com/api/todos',
  response: {
    headers: {
      'x-custom-headers': 'foobar'
    },
    body: [{
      title: 'My custom todo',
      order: 1,
      completed: false,
      url: 'http://todo-backend-express.herokuapp.com/15727'
    }]
  }
})
```



---

## assertPerformance
针对您的应用程序的性能基准进行断言。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities)中找到。

##### 用法

```js
browser.assertPerformance(name, metrics)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>您创建基准的作业名称。</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string[]</td>
      <td>您想要与基准进行比较的指标名称。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 测试页面性能
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // 确保名称也在您的功能的 sauce options 中设置
  metrics: ['score', 'firstPaint']
})
```


##### 返回

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** 包含结果以及关于结果的指标的对象。


---

## jankinessCheck
执行滚动测试，评估应用程序的卡顿程度。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command)中找到。

##### 用法

```js
browser.jankinessCheck()
```

##### 示例


```js
// 测试页面性能
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### 返回

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** 包含分数以及在测试期间页面 UX 流畅程度的指标的对象。


---

## mockRequest
模拟网络资源。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/)中找到。

##### 用法

```js
browser.mockRequest(url, filterOptions)
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
      <td>string</td>
      <td>匹配要模拟的 URL 的通配符。</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object</td>
      <td>要模拟的 URL 的附加筛选选项（例如 headers, method）。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** 包含模拟资源 ID 的对象。


---

## getMockCalls
接收与模拟资源匹配的请求信息。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/)中找到。

##### 用法

```js
browser.getMockCalls(mockId)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>模拟的 ID</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** 请求信息列表。


---

## clearMockCalls
清除模拟调用列表。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/)中找到。

##### 用法

```js
browser.clearMockCalls(mockId, restore)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>模拟的 ID</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>如果模拟也应该被恢复，则设置为 true。</td>
    </tr>
  </tbody>
</table>



---

## respondMock
当模拟匹配特定资源时响应。<br /><br />Sauce Labs 命令。更多详情可以在[官方协议文档](https://docs.saucelabs.com/)中找到。

##### 用法

```js
browser.respondMock(mockId, payload)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>模拟的 ID</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object</td>
      <td>模拟响应的信息。</td>
    </tr>
  </tbody>
</table>