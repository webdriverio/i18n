---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Alla kommandon stöds endast på Chrome med hjälp av Sauce Labs
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
funktioner. Du kan aktivera dessa genom att ställa in följande Sauce-alternativ:


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
Hämta webbsidespecifik logginformation baserat på den senaste sidladdningen.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Användning

```js
browser.getPageLogs(type)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>loggtyp (t.ex. 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Exempel


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


##### Returnerar

- **&lt;object&gt;**
            **<code><var>log</var></code>:** loggutdata av önskad typ (se exempel)


---

## sauceThrottleNetwork
Med nätverkskonditionering kan du testa din webbplats på olika nätverksanslutningar, inklusive Edge, 3G och till och med offline. Du kan begränsa datagenomströmningen, inklusive maximal ned- och uppladdningskapacitet, och använda latensmanipulation för att framtvinga en minimal fördröjning i anslutningens rundtur (RTT).<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Användning

```js
browser.sauceThrottleNetwork(condition)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>nätverksvillkor att ställa in (t.ex. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Exempel


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
Du kan begränsa CPU:n i DevTools för att förstå hur din sida presterar under den begränsningen.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Användning

```js
browser.throttleCPU(rate)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Hastighet för hur mycket CPU:n ska begränsas.</td>
    </tr>
  </tbody>
</table>

##### Exempel


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
Tillåter modifiering av alla förfrågningar som görs av webbläsaren. Du kan svartlista, ändra eller omdirigera dessa efter behov för dina tester.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Användning

```js
browser.interceptRequest(rule)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>En regel som beskriver förfrågningsavskärningen.</td>
    </tr>
  </tbody>
</table>

##### Exempel


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
Utvärdera prestanda mot din apps baseline.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Användning

```js
browser.assertPerformance(name, metrics)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Namnet på jobbet du skapade din baseline med.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Namn på mätvärden du vill jämföra mot baseline.</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Returnerar

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Ett objekt som innehåller resultatet samt mätvärden om resultatet.


---

## jankinessCheck
Utför ett rulltest som utvärderar applikationens ryckighet.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Användning

```js
browser.jankinessCheck()
```

##### Exempel


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Returnerar

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Ett objekt som innehåller poängen samt mätvärden kring hur smidig UX på sidan var under testet.


---

## mockRequest
Mockar en nätverksresurs.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/).

##### Användning

```js
browser.mockRequest(url, filterOptions)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>URL-mönster för att matcha URL att mocka.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Ytterligare filteralternativ för URL att mocka (t.ex. headers, method).</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Ett objekt som innehåller ID för en mockresurs.


---

## getMockCalls
Ta emot förfrågningsinformation om förfrågningar som matchar den mockade resursen.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/).

##### Användning

```js
browser.getMockCalls(mockId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ID för en mock</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** En lista med förfrågningsinformation.


---

## clearMockCalls
Rensa lista över mock-anrop.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/).

##### Användning

```js
browser.clearMockCalls(mockId, restore)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ID för en mock</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Ange som true om mocken också ska återställas.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Svara om mock matchar en specifik resurs.<br /><br />Sauce Labs-kommando. Mer information finns i [officiell protokolldokumentation](https://docs.saucelabs.com/).

##### Användning

```js
browser.respondMock(mockId, payload)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>ID för en mock</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Information om mock-svar.</td>
    </tr>
  </tbody>
</table>