---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Wszystkie komendy są obsługiwane tylko na Chrome przy użyciu funkcji Sauce Labs
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging).
Możesz je włączyć, ustawiając następujące opcje Sauce:


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
Uzyskaj informacje z logów specyficzne dla strony internetowej na podstawie ostatniego załadowania strony.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Użycie

```js
browser.getPageLogs(type)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>typ logu (np. 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Przykłady


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


##### Zwraca

- **&lt;object&gt;**
            **<code><var>log</var></code>:** wynik logu żądanego typu (patrz przykład)


---

## sauceThrottleNetwork
Dzięki kontroli sieci możesz testować swoją stronę na różnych połączeniach sieciowych, w tym Edge, 3G, a nawet w trybie offline. Możesz ograniczyć przepustowość danych, w tym maksymalną przepustowość pobierania i wysyłania, a także wykorzystać manipulację opóźnieniem, aby wymusić minimalne opóźnienie w czasie podróży połączenia (RTT).<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Użycie

```js
browser.sauceThrottleNetwork(condition)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>warunek sieciowy do ustawienia (np. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Przykłady


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
Możesz ograniczyć CPU w DevTools, aby zrozumieć, jak Twoja strona działa w takich warunkach.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Użycie

```js
browser.throttleCPU(rate)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Współczynnik określający, jak bardzo CPU powinno być ograniczone.</td>
    </tr>
  </tbody>
</table>

##### Przykłady


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
Pozwala modyfikować dowolne żądania wykonywane przez przeglądarkę. Możesz zablokować, zmodyfikować lub przekierować te żądania zgodnie z wymaganiami testów.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Użycie

```js
browser.interceptRequest(rule)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Reguła opisująca przechwytywanie żądania.</td>
    </tr>
  </tbody>
</table>

##### Przykłady


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
Dokonaj porównania z bazową wydajnością Twojej aplikacji.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Użycie

```js
browser.assertPerformance(name, metrics)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nazwa zadania, dla którego utworzyłeś linię bazową.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Nazwy metryk, które chcesz porównać z linią bazową.</td>
    </tr>
  </tbody>
</table>

##### Przykład


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Zwraca

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Obiekt zawierający wynik oraz metryki dotyczące wyniku.


---

## jankinessCheck
Wykonaj test przewijania, który ocenia płynność działania aplikacji.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Użycie

```js
browser.jankinessCheck()
```

##### Przykład


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Zwraca

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Obiekt zawierający wynik oraz metryki dotyczące płynności UX strony podczas testu.


---

## mockRequest
Symuluje zasób sieciowy.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/).

##### Użycie

```js
browser.mockRequest(url, filterOptions)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>Glob URL do dopasowania adresu URL do symulacji.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Dodatkowe opcje filtrowania dla adresu URL do symulacji (np. nagłówki, metoda).</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Obiekt zawierający identyfikator symulowanego zasobu.


---

## getMockCalls
Odbierz informacje o żądaniach, które pasują do symulowanego zasobu.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/).

##### Użycie

```js
browser.getMockCalls(mockId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>identyfikator symulacji</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Lista informacji o żądaniach.


---

## clearMockCalls
Wyczyść listę wywołań symulacji.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/).

##### Użycie

```js
browser.clearMockCalls(mockId, restore)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>identyfikator symulacji</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Ustaw na true, jeśli symulacja powinna zostać również przywrócona.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Odpowiedz, jeśli symulacja pasuje do określonego zasobu.<br /><br />Komenda Sauce Labs. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://docs.saucelabs.com/).

##### Użycie

```js
browser.respondMock(mockId, payload)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>identyfikator symulacji</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Informacje o odpowiedzi symulacji.</td>
    </tr>
  </tbody>
</table>