---
id: saucelabs
title: ساس لبز
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

تمام دستورات فقط در مرورگر کروم با استفاده از قابلیت‌های 
[اشکال‌زدایی گسترده](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
ساس لبز پشتیبانی می‌شوند. شما می‌توانید این قابلیت‌ها را با تنظیم گزینه‌های ساس به صورت زیر فعال کنید:


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
دریافت اطلاعات گزارش مخصوص صفحه وب بر اساس آخرین بارگذاری صفحه.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/insights/debug/#network-logs) بیابید.

##### استفاده

```js
browser.getPageLogs(type)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>نوع گزارش (مانند 'sauce:network'، 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


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


##### مقادیر برگشتی

- **&lt;object&gt;**
            **<code><var>log</var></code>:** خروجی گزارش نوع مورد نظر (نمونه را ببینید)


---

## sauceThrottleNetwork
با شرایط شبکه می‌توانید سایت خود را در انواع مختلف اتصالات شبکه، از جمله Edge، 3G و حتی آفلاین آزمایش کنید. می‌توانید توان داده را محدود کنید، از جمله حداکثر توان دانلود و آپلود، و از دستکاری تاخیر برای اعمال حداقل تاخیر در زمان رفت و برگشت اتصال (RTT) استفاده کنید.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork) بیابید.

##### استفاده

```js
browser.sauceThrottleNetwork(condition)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>شرایط شبکه برای تنظیم (مانند 'online'، 'offline'، 'GPRS'، 'Regular 2G'، 'Good 2G'، 'Regular 3G'، 'Good 3G'، 'Regular 4G'، 'DSL'، 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


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
می‌توانید CPU را در DevTools محدود کنید تا نحوه عملکرد صفحه خود را تحت آن محدودیت درک کنید.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu) بیابید.

##### استفاده

```js
browser.throttleCPU(rate)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>نرخی که بر اساس آن CPU باید محدود شود.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


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
اجازه می‌دهد هر درخواستی که توسط مرورگر انجام می‌شود را تغییر دهید. می‌توانید این درخواست‌ها را در لیست سیاه قرار دهید، تغییر دهید یا تغییر مسیر دهید، همانطور که برای آزمایش‌های خود نیاز دارید.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/insights/debug/#intercept-network-requests) بیابید.

##### استفاده

```js
browser.interceptRequest(rule)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>قانونی که رهگیری درخواست را توصیف می‌کند.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


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
سنجش برابر خط مبنای عملکرد برنامه شما.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities) بیابید.

##### استفاده

```js
browser.assertPerformance(name, metrics)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>نام کاری که با آن خط مبنای خود را ایجاد کرده‌اید.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string[]</td>
      <td>نام معیارهایی که می‌خواهید در برابر خط مبنا بسنجید.</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### مقادیر برگشتی

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** یک شی که شامل نتیجه و همچنین معیارهای مربوط به نتیجه است.


---

## jankinessCheck
یک تست اسکرول انجام دهید که میزان لگ‌زدگی برنامه را ارزیابی می‌کند.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command) بیابید.

##### استفاده

```js
browser.jankinessCheck()
```

##### مثال


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### مقادیر برگشتی

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** یک شی که شامل امتیاز و همچنین معیارهای مربوط به میزان روان بودن تجربه کاربری صفحه در طول آزمایش است.


---

## mockRequest
یک منبع شبکه را شبیه‌سازی می‌کند.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/) بیابید.

##### استفاده

```js
browser.mockRequest(url, filterOptions)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>الگوی URL برای تطبیق با آدرس شبیه‌سازی شده.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object</td>
      <td>گزینه‌های فیلتر اضافی برای آدرس شبیه‌سازی شده (مانند headers، method).</td>
    </tr>
  </tbody>
</table>


##### مقادیر برگشتی

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** یک شی که شامل شناسه منبع شبیه‌سازی شده است.


---

## getMockCalls
دریافت اطلاعات درخواست‌های مطابق با منبع شبیه‌سازی شده.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/) بیابید.

##### استفاده

```js
browser.getMockCalls(mockId)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>شناسه یک شبیه‌سازی</td>
    </tr>
  </tbody>
</table>


##### مقادیر برگشتی

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** لیستی از اطلاعات درخواست‌ها.


---

## clearMockCalls
پاک کردن لیست فراخوانی‌های شبیه‌سازی شده.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/) بیابید.

##### استفاده

```js
browser.clearMockCalls(mockId, restore)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>شناسه یک شبیه‌سازی</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>روی true تنظیم کنید اگر شبیه‌سازی نیز باید بازیابی شود.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
اگر شبیه‌سازی با منبع خاصی مطابقت داشته باشد، پاسخ می‌دهد.<br /><br />دستور ساس لبز. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://docs.saucelabs.com/) بیابید.

##### استفاده

```js
browser.respondMock(mockId, payload)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>شناسه یک شبیه‌سازی</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object</td>
      <td>اطلاعات مربوط به پاسخ شبیه‌سازی شده.</td>
    </tr>
  </tbody>
</table>