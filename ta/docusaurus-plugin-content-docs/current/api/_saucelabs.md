---
id: saucelabs
title: சாஸ் லேப்ஸ்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

அனைத்து கட்டளைகளும் சாஸ் லேப்ஸ் [விரிவான பிழைத்திருத்தம்](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging) 
திறன்களைப் பயன்படுத்தி குரோமில் மட்டுமே ஆதரிக்கப்படுகின்றன. பின்வரும் சாஸ் விருப்பங்களை அமைப்பதன் மூலம் நீங்கள் இவற்றை செயல்படுத்தலாம்:


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
கடைசி பக்க ஏற்றத்தின் அடிப்படையில் வலைப்பக்கம் குறிப்பிட்ட பதிவு தகவல்களைப் பெறுங்கள்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/insights/debug/#network-logs) காணலாம்.

##### பயன்பாடு

```js
browser.getPageLogs(type)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>பதிவு வகை (எ.கா. sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்


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


##### திருப்பி அனுப்புவது

- **&lt;object&gt;**
            **<code><var>log</var></code>:** விரும்பிய வகையின் பதிவு வெளியீடு (எடுத்துக்காட்டைப் பார்க்கவும்)


---

## sauceThrottleNetwork
நெட்வொர்க் நிலைமைகளுடன், எட்ஜ், 3ஜி, மற்றும் ஆஃப்லைன் உட்பட பல்வேறு நெட்வொர்க் இணைப்புகளில் உங்கள் தளத்தை சோதிக்கலாம். தரவு ஒழுங்குமுறையை (throughput) குறைக்கலாம், அதிகபட்ச பதிவிறக்கம் மற்றும் பதிவேற்ற ஒழுங்குமுறை உட்பட, மற்றும் இணைப்பு ரவுண்ட்-ட்ரிப் நேரத்தில் (RTT) குறைந்தபட்ச தாமதத்தை கட்டாயப்படுத்த லேட்டன்சி கையாளுதலைப் பயன்படுத்தலாம்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork) காணலாம்.

##### பயன்பாடு

```js
browser.sauceThrottleNetwork(condition)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>அமைக்க வேண்டிய நெட்வொர்க் நிலைமை (எ.கா. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்


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
அந்த கட்டுப்பாட்டின் கீழ் உங்கள் பக்கம் எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்துகொள்ள DevTools இல் CPU வை குறைக்கலாம்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu) காணலாம்.

##### பயன்பாடு

```js
browser.throttleCPU(rate)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>CPU எவ்வளவு குறைக்கப்பட வேண்டும் என்பதற்கான விகிதம்.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்


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
உலாவியால் செய்யப்படும் எந்த கோரிக்கையையும் மாற்ற அனுமதிக்கிறது. உங்கள் சோதனைகளுக்குத் தேவைப்படும் போது இவற்றைத் தடைசெய்யலாம், மாற்றியமைக்கலாம் அல்லது திருப்பி விடலாம்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/insights/debug/#intercept-network-requests) காணலாம்.

##### பயன்பாடு

```js
browser.interceptRequest(rule)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>கோரிக்கை இடைமறிப்பை விவரிக்கும் விதி.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்


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
உங்கள் செயலியின் செயல்திறன் அடிப்படை எதிராக உறுதிப்படுத்தவும்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities) காணலாம்.

##### பயன்பாடு

```js
browser.assertPerformance(name, metrics)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>நீங்கள் உங்கள் அடிப்படையை உருவாக்கிய பணியின் பெயர்.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>அடிப்படைக்கு எதிராக உறுதிப்படுத்த விரும்பும் அளவீடுகளின் பெயர்.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### திருப்பி அனுப்புவது

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** முடிவு மற்றும் அதன் அளவீடுகளை கொண்ட ஒரு பொருள்.


---

## jankinessCheck
பயன்பாட்டின் ஜாங்கினெஸ்-ஐ மதிப்பிடும் ஒரு ஸ்க்ரோல் சோதனையை செய்யவும்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command) காணலாம்.

##### பயன்பாடு

```js
browser.jankinessCheck()
```

##### எடுத்துக்காட்டு


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### திருப்பி அனுப்புவது

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** சோதனையின் போது பக்கத்தின் UX எவ்வளவு மென்மையானது என்பதைப் பற்றிய மதிப்பெண் மற்றும் அளவீடுகளைக் கொண்ட ஒரு பொருள்.


---

## mockRequest
நெட்வொர்க் வளத்தை மாக் (mock) செய்கிறது.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/) காணலாம்.

##### பயன்பாடு

```js
browser.mockRequest(url, filterOptions)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>மாக் செய்ய URL glob பொருத்தம்.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>மாக் செய்ய URL க்கான கூடுதல் வடிகட்டி விருப்பங்கள் (எ.கா. headers, method).</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** மாக் வளத்தின் ஐடியைக் கொண்ட ஒரு பொருள்.


---

## getMockCalls
மாக் செய்யப்பட்ட வளத்துடன் பொருந்தும் கோரிக்கைகளைப் பற்றிய கோரிக்கை தகவலைப் பெறவும்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/) காணலாம்.

##### பயன்பாடு

```js
browser.getMockCalls(mockId)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ஒரு மாக்கின் ஐடி</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புவது

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** கோரிக்கை தகவல்களின் பட்டியல்.


---

## clearMockCalls
மாக் அழைப்புகளின் பட்டியலை அழிக்கவும்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/) காணலாம்.

##### பயன்பாடு

```js
browser.clearMockCalls(mockId, restore)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ஒரு மாக்கின் ஐடி</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>மாக் மீட்டமைக்கப்பட வேண்டுமானால் true என அமைக்கவும்.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
மாக் ஒரு குறிப்பிட்ட வளத்துடன் பொருந்தினால் பதிலளிக்கவும்.<br /><br />சாஸ் லேப்ஸ் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://docs.saucelabs.com/) காணலாம்.

##### பயன்பாடு

```js
browser.respondMock(mockId, payload)
```


##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ஒரு மாக்கின் ஐடி</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>மாக் பதில் பற்றிய தகவல்.</td>
    </tr>
  </tbody>
</table>