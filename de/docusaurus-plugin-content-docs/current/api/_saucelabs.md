---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Alle Befehle werden nur für Chrome mit Sauce Labs
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
Funktionen unterstützt. Sie können diese aktivieren, indem Sie die folgenden Sauce-Optionen setzen:


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
Erhalten Sie webseiten-spezifische Log-Informationen basierend auf dem letzten Seitenladevorgang.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Verwendung

```js
browser.getPageLogs(type)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Log-Typ (z.B. 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Beispiele


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


##### Rückgabewert

- **&lt;object&gt;**
            **<code><var>log</var></code>:** Log-Ausgabe des gewünschten Typs (siehe Beispiel)


---

## sauceThrottleNetwork
Mit Netzwerkbedingungen können Sie Ihre Website auf verschiedenen Netzwerkverbindungen testen, einschließlich Edge, 3G und sogar offline. Sie können den Datendurchsatz drosseln, einschließlich des maximalen Download- und Upload-Durchsatzes, und Latenzmanipulation verwenden, um eine Mindestverzögerung in der Verbindungs-Rundumlaufzeit (RTT) zu erzwingen.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Verwendung

```js
browser.sauceThrottleNetwork(condition)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>Netzwerkbedingung, die eingestellt werden soll (z.B. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Beispiele


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
Sie können die CPU in DevTools drosseln, um zu verstehen, wie Ihre Seite unter dieser Einschränkung funktioniert.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Verwendung

```js
browser.throttleCPU(rate)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Rate, wie stark die CPU gedrosselt werden soll.</td>
    </tr>
  </tbody>
</table>

##### Beispiele


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
Ermöglicht die Modifikation jeder vom Browser getätigten Anfrage. Sie können diese Anfragen nach Bedarf für Ihre Tests auf die schwarze Liste setzen, modifizieren oder umleiten.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Verwendung

```js
browser.interceptRequest(rule)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Eine Regel, die die Anfragenabfangung beschreibt.</td>
    </tr>
  </tbody>
</table>

##### Beispiele


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
Prüfen Sie gegen die Performance-Baseline Ihrer App.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Verwendung

```js
browser.assertPerformance(name, metrics)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Name des Jobs, mit dem Sie Ihre Baseline erstellt haben.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Name der Metriken, die Sie gegen die Baseline prüfen möchten.</td>
    </tr>
  </tbody>
</table>

##### Beispiel


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Rückgabewert

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Ein Objekt, das das Ergebnis sowie Metriken über das Ergebnis enthält.


---

## jankinessCheck
Führen Sie einen Scrolltest durch, der die Ruckeligkeit der Anwendung auswertet.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Verwendung

```js
browser.jankinessCheck()
```

##### Beispiel


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Rückgabewert

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Ein Objekt, das die Punktzahl sowie Metriken zur Geschmeidigkeit der UX der Seite während des Tests enthält.


---

## mockRequest
Mockt eine Netzwerkressource.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/).

##### Verwendung

```js
browser.mockRequest(url, filterOptions)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>URL-Glob, um die zu mockende URL abzugleichen.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Zusätzliche Filteroptionen für die zu mockende URL (z.B. headers, method).</td>
    </tr>
  </tbody>
</table>


##### Rückgabewert

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Ein Objekt, das die ID einer Mock-Ressource enthält.


---

## getMockCalls
Erhalten Sie Anfrageinformationen über Anfragen, die mit der gemockten Ressource übereinstimmen.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/).

##### Verwendung

```js
browser.getMockCalls(mockId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>die ID eines Mocks</td>
    </tr>
  </tbody>
</table>


##### Rückgabewert

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Eine Liste von Anfrageinformationen.


---

## clearMockCalls
Leeren Sie die Liste der Mock-Aufrufe.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/).

##### Verwendung

```js
browser.clearMockCalls(mockId, restore)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>die ID eines Mocks</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Auf true setzen, wenn der Mock ebenfalls wiederhergestellt werden soll.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Antworten, wenn der Mock einer bestimmten Ressource entspricht.<br /><br />Sauce Labs Befehl. Weitere Details finden Sie in der [offiziellen Protokoll-Dokumentation](https://docs.saucelabs.com/).

##### Verwendung

```js
browser.respondMock(mockId, payload)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>die ID eines Mocks</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Informationen zur Mock-Antwort.</td>
    </tr>
  </tbody>
</table>