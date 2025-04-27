---
id: saucelabs
title: सॉस लैब्स
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

सभी कमांड केवल Sauce Labs का उपयोग करके Chrome पर समर्थित हैं
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
क्षमताएँ। आप इन्हें निम्नलिखित Sauce विकल्प सेट करके सक्षम कर सकते हैं:


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
अंतिम पेज लोड के आधार पर वेबपेज विशिष्ट लॉग जानकारी प्राप्त करें।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/insights/debug/#network-logs) में पाए जा सकते हैं।

##### उपयोग

```js
browser.getPageLogs(type)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>लॉग प्रकार (जैसे 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


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


##### रिटर्न

- **&lt;object&gt;**
            **<code><var>log</var></code>:** वांछित प्रकार का लॉग आउटपुट (उदाहरण देखें)


---

## sauceThrottleNetwork
नेटवर्क कंडीशनिंग के साथ आप अपनी साइट का विभिन्न नेटवर्क कनेक्शन पर परीक्षण कर सकते हैं, जिसमें Edge, 3G, और यहां तक कि ऑफलाइन भी शामिल हैं। आप डेटा थ्रूपुट को थ्रॉटल कर सकते हैं, जिसमें अधिकतम डाउनलोड और अपलोड थ्रूपुट शामिल है, और कनेक्शन राउंड-ट्रिप टाइम (RTT) में न्यूनतम देरी लागू करने के लिए लेटेंसी मैनिपुलेशन का उपयोग कर सकते हैं।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork) में पाए जा सकते हैं।

##### उपयोग

```js
browser.sauceThrottleNetwork(condition)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>सेट करने के लिए नेटवर्क स्थिति (जैसे 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


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
आप DevTools में CPU को थ्रॉटल कर सकते हैं ताकि यह समझ सकें कि आपका पेज उस प्रतिबंध के तहत कैसा प्रदर्शन करता है।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu) में पाए जा सकते हैं।

##### उपयोग

```js
browser.throttleCPU(rate)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>CPU को कितना थ्रॉटल किया जाना चाहिए इसका रेट।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


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
ब्राउज़र द्वारा किए गए किसी भी अनुरोध को संशोधित करने की अनुमति देता है। आप अपने परीक्षणों के लिए आवश्यकतानुसार इन्हें ब्लैकलिस्ट, संशोधित, या रीडायरेक्ट कर सकते हैं।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/insights/debug/#intercept-network-requests) में पाए जा सकते हैं।

##### उपयोग

```js
browser.interceptRequest(rule)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>अनुरोध अवरोधन का वर्णन करने वाला नियम।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


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
अपने ऐप के प्रदर्शन बेसलाइन के खिलाफ जांच करें।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities) में पाए जा सकते हैं।

##### उपयोग

```js
browser.assertPerformance(name, metrics)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>उस नौकरी का नाम जिसके साथ आपने अपना बेसलाइन बनाया था।</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>उन मेट्रिक्स के नाम जिन्हें आप बेसलाइन के खिलाफ जांचना चाहते हैं।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### रिटर्न

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** एक ऑब्जेक्ट जिसमें परिणाम के साथ-साथ परिणाम के बारे में मेट्रिक्स शामिल हैं।


---

## jankinessCheck
एक स्क्रॉल टेस्ट करें जो एप्लिकेशन की जैंकिनेस का मूल्यांकन करता है।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command) में पाए जा सकते हैं।

##### उपयोग

```js
browser.jankinessCheck()
```

##### उदाहरण


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### रिटर्न

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** एक ऑब्जेक्ट जिसमें स्कोर के साथ-साथ परीक्षण के दौरान पेज के UX की स्मूथनेस के बारे में मेट्रिक्स शामिल हैं।


---

## mockRequest
एक नेटवर्क संसाधन को मॉक करता है।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/) में पाए जा सकते हैं।

##### उपयोग

```js
browser.mockRequest(url, filterOptions)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>मॉक करने के लिए URL मिलान हेतु URL ग्लोब।</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>मॉक करने के लिए URL के लिए अतिरिक्त फ़िल्टर विकल्प (जैसे headers, method)।</td>
    </tr>
  </tbody>
</table>


##### रिटर्न

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** एक ऑब्जेक्ट जिसमें मॉक संसाधन का आईडी शामिल है।


---

## getMockCalls
मॉक्ड रिसोर्स से मेल खाने वाले अनुरोधों के बारे में अनुरोध जानकारी प्राप्त करें।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/) में पाए जा सकते हैं।

##### उपयोग

```js
browser.getMockCalls(mockId)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>मॉक का आईडी</td>
    </tr>
  </tbody>
</table>


##### रिटर्न

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** अनुरोध जानकारी की एक सूची।


---

## clearMockCalls
मॉक कॉल्स की सूची साफ़ करें।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/) में पाए जा सकते हैं।

##### उपयोग

```js
browser.clearMockCalls(mockId, restore)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>मॉक का आईडी</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>यदि मॉक को भी पुनर्स्थापित किया जाना चाहिए तो true पर सेट करें।</td>
    </tr>
  </tbody>
</table>



---

## respondMock
यदि मॉक किसी विशिष्ट संसाधन से मेल खाता है तो प्रतिक्रिया दें।<br /><br />Sauce Labs कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़](https://docs.saucelabs.com/) में पाए जा सकते हैं।

##### उपयोग

```js
browser.respondMock(mockId, payload)
```


##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>मॉक का आईडी</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>मॉक प्रतिक्रिया पर जानकारी।</td>
    </tr>
  </tbody>
</table>