---
id: saucelabs
title: صلصة لابز
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

جميع الأوامر مدعومة فقط على Chrome باستخدام إمكانيات Sauce Labs
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
. يمكنك تمكين هذه الإمكانيات عن طريق تعيين خيارات Sauce التالية:


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
الحصول على معلومات سجل محددة لصفحة الويب بناءً على آخر تحميل للصفحة.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/insights/debug/#network-logs).

##### الاستخدام

```js
browser.getPageLogs(type)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>نوع السجل (مثل 'sauce:network'، 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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


##### العائد

- **&lt;object&gt;**
            **<code><var>log</var></code>:** مخرج السجل من النوع المطلوب (انظر المثال)


---

## sauceThrottleNetwork
باستخدام تكييف الشبكة، يمكنك اختبار موقعك على مجموعة متنوعة من اتصالات الشبكة، بما في ذلك Edge و3G وحتى في وضع عدم الاتصال. يمكنك التحكم في معدل نقل البيانات، بما في ذلك الحد الأقصى للتنزيل والتحميل، واستخدام التلاعب بزمن الاستجابة لفرض حد أدنى للتأخير في وقت استجابة الاتصال (RTT).<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### الاستخدام

```js
browser.sauceThrottleNetwork(condition)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>حالة الشبكة للتعيين (مثل 'online'، 'offline'، 'GPRS'، 'Regular 2G'، 'Good 2G'، 'Regular 3G'، 'Good 3G'، 'Regular 4G'، 'DSL'، 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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
يمكنك التحكم في استخدام وحدة المعالجة المركزية في DevTools لفهم كيفية أداء صفحتك تحت هذا القيد.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### الاستخدام

```js
browser.throttleCPU(rate)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>معدل تقييد وحدة المعالجة المركزية.</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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
يسمح بتعديل أي طلب تم إجراؤه بواسطة المتصفح. يمكنك منع أو تعديل أو إعادة توجيه هذه الطلبات حسب متطلبات اختباراتك.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### الاستخدام

```js
browser.interceptRequest(rule)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>قاعدة تصف اعتراض الطلب.</td>
    </tr>
  </tbody>
</table>

##### أمثلة


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
التحقق من أداء تطبيقك مقابل خط الأساس.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### الاستخدام

```js
browser.assertPerformance(name, metrics)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>اسم المهمة التي أنشأت خط الأساس الخاص بك بها.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string[]</td>
      <td>أسماء المقاييس التي تريد التحقق منها مقابل خط الأساس.</td>
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


##### العائد

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** كائن يحتوي على النتيجة بالإضافة إلى قياسات حول النتيجة.


---

## jankinessCheck
قم بإجراء اختبار التمرير الذي يقيم تقطيع التطبيق.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### الاستخدام

```js
browser.jankinessCheck()
```

##### مثال


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### العائد

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** كائن يحتوي على النتيجة بالإضافة إلى قياسات حول مدى سلاسة تجربة المستخدم للصفحة أثناء الاختبار.


---

## mockRequest
يحاكي مورد شبكة.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/).

##### الاستخدام

```js
browser.mockRequest(url, filterOptions)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>نمط URL لمطابقة عنوان URL للمحاكاة.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>خيارات تصفية إضافية لعنوان URL للمحاكاة (مثل الرؤوس، الطريقة).</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** كائن يحتوي على معرف مورد المحاكاة.


---

## getMockCalls
استلام معلومات الطلب حول الطلبات التي تتطابق مع مورد المحاكاة.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/).

##### الاستخدام

```js
browser.getMockCalls(mockId)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>معرف المحاكاة</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** قائمة بمعلومات الطلبات.


---

## clearMockCalls
مسح قائمة مكالمات المحاكاة.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/).

##### الاستخدام

```js
browser.clearMockCalls(mockId, restore)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>معرف المحاكاة</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>اضبط على true إذا كان يجب استعادة المحاكاة أيضًا.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
الاستجابة إذا تطابقت المحاكاة مع مورد محدد.<br /><br />أمر Sauce Labs. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://docs.saucelabs.com/).

##### الاستخدام

```js
browser.respondMock(mockId, payload)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>معرف المحاكاة</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>معلومات عن استجابة المحاكاة.</td>
    </tr>
  </tbody>
</table>