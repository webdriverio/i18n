---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

All commands are only supported on Chrome using Sauce Labs
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
capabilities. You can enable these by setting the following Sauce options:


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
Get webpage specific log information based on the last page load.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/insights/debug/#network-logs).



##### Usage

```js
browser.getPageLogs(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>log type (e.g. sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// Get Network Logs
console.log(browser.getPageLogs('sauce:network'));
/**
 * outputs:
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
// Get Performance Logs (needs capturePerformance capability see: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * outputs:
 * {
 *   "speedIndex": 1472.023,
 *   "timeToFirstInteractive": 1243.214,
 *   "firstMeaningfulPaint": 892.643,
 *   ...
 * }
 */
```


##### Returns

- **&lt;object&gt;**
            **<code><var>log</var></code>:** log output of desired type (see example)    


---
## sauceThrottleNetwork
With network conditioning you can test your site on a variety of network connections, including Edge, 3G, and even offline. You can throttle the data throughput, including the maximum download and upload throughput, and use latency manipulation to enforce a minimum delay in connection round-trip time (RTT).<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).



##### Usage

```js
browser.sauceThrottleNetwork(condition)
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
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>network condition to set (e.g. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// predefined network condition
browser.sauceThrottleNetwork('offline')
```


```js
// custom network condition
browser.sauceThrottleNetwork({
  download: 1000,
  upload: 500,
  latency: 40'
})
```





---
## throttleCPU
You can throttle the CPU in DevTools to understand how your page performs under that constraint.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).



##### Usage

```js
browser.throttleCPU(rate)
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
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Rate on how much the CPU should get throttled.</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// throttle CPU and make it run 4x slower
browser.throttleCPU(4)
```


```js
// reset CPU throttling
browser.throttleCPU(0)
```





---
## interceptRequest
Allows modifying any request made by the browser. You can blacklist, modify, or redirect these as required for your tests.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).



##### Usage

```js
browser.interceptRequest(rule)
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
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>A rule describing the request interception.</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// redirect a request
browser.interceptRequest({
  url: 'https://saucelabs.com',
  redirect: 'https://google.com'
})
```


```js
// Blacklist requests to 3rd party vendors
browser.interceptRequest({
  url: 'https://api.segment.io/v1/p',
  error: 'Failed'
})
```


```js
// Modify requests to REST API (Mock REST API response)
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
Assert against the performance baseline of your app.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).



##### Usage

```js
browser.assertPerformance(name, metrics)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Name of the job you created your baseline with.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Name of metrics you want to assert agains the baseline.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Returns

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** An object containing the result as well as metrics about the result.    


---
## jankinessCheck
Perform a scroll test that evaluates the jankiness of the application.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).



##### Usage

```js
browser.jankinessCheck()
```



##### Example


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Returns

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** An object containing the score as well as metrics around how smooth the UX of the page was during the test.    


---
## mockRequest
Mocks a network resource.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/).



##### Usage

```js
browser.mockRequest(url, filterOptions)
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
      <td>string</td>
      <td>URL glob to match url to mock.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Additional filter options for url to mock (e.g. headers, method).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** An object containing the id of a mock resource.    


---
## getMockCalls
Receive request information about requests that match the mocked resource.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/).



##### Usage

```js
browser.getMockCalls(mockId)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>the id of a mock</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** A list of request information.    


---
## clearMockCalls
Clear list of mock calls.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/).



##### Usage

```js
browser.clearMockCalls(mockId, restore)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>the id of a mock</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Set to true if mock should be restored as well.</td>
    </tr>
  </tbody>
</table>





---
## respondMock
Respond if mock matches a specific resource.<br /><br />Sauce Labs command. More details can be found in the [official protocol docs](https://docs.saucelabs.com/).



##### Usage

```js
browser.respondMock(mockId, payload)
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
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>the id of a mock</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Information on mock response.</td>
    </tr>
  </tbody>
</table>




