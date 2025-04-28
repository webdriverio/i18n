---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Tutti i comandi sono supportati solo su Chrome utilizzando le funzionalità
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
di Sauce Labs. Puoi abilitarle impostando le seguenti opzioni Sauce:


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
Ottieni informazioni di log specifiche della pagina web basate sull'ultimo caricamento della pagina.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Utilizzo

```js
browser.getPageLogs(type)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>tipo di log (ad es. 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Esempi


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


##### Restituisce

- **&lt;object&gt;**
            **<code><var>log</var></code>:** output del log del tipo desiderato (vedi esempio)


---

## sauceThrottleNetwork
Con il condizionamento della rete puoi testare il tuo sito su una varietà di connessioni di rete, inclusi Edge, 3G e persino offline. Puoi limitare la velocità di trasmissione dati, inclusa la velocità massima di download e upload, e utilizzare la manipolazione della latenza per imporre un ritardo minimo nel tempo di andata e ritorno della connessione (RTT).<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Utilizzo

```js
browser.sauceThrottleNetwork(condition)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>condizione di rete da impostare (ad es. 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Esempi


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
Puoi limitare la CPU in DevTools per capire come si comporta la tua pagina con questo vincolo.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Utilizzo

```js
browser.throttleCPU(rate)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Tasso di quanto la CPU dovrebbe essere limitata.</td>
    </tr>
  </tbody>
</table>

##### Esempi


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
Consente di modificare qualsiasi richiesta effettuata dal browser. Puoi mettere in blacklist, modificare o reindirizzare queste richieste secondo le necessità dei tuoi test.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Utilizzo

```js
browser.interceptRequest(rule)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Una regola che descrive l'intercettazione della richiesta.</td>
    </tr>
  </tbody>
</table>

##### Esempi


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
Verifica le prestazioni rispetto alla baseline della tua app.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Utilizzo

```js
browser.assertPerformance(name, metrics)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nome del job con cui hai creato la tua baseline.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Nome delle metriche che vuoi verificare rispetto alla baseline.</td>
    </tr>
  </tbody>
</table>

##### Esempio


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Restituisce

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Un oggetto contenente il risultato e le metriche relative al risultato.


---

## jankinessCheck
Esegue un test di scorrimento che valuta la fluidità dell'applicazione.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Utilizzo

```js
browser.jankinessCheck()
```

##### Esempio


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Restituisce

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Un oggetto contenente il punteggio e le metriche relative alla fluidità dell'UX della pagina durante il test.


---

## mockRequest
Simula una risorsa di rete.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/).

##### Utilizzo

```js
browser.mockRequest(url, filterOptions)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>URL glob da abbinare all'URL da simulare.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Opzioni di filtro aggiuntive per l'URL da simulare (ad es. headers, method).</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Un oggetto contenente l'ID di una risorsa simulata.


---

## getMockCalls
Ricevi informazioni sulle richieste che corrispondono alla risorsa simulata.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/).

##### Utilizzo

```js
browser.getMockCalls(mockId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'ID di una simulazione</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Un elenco di informazioni sulle richieste.


---

## clearMockCalls
Cancella l'elenco delle chiamate simulate.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/).

##### Utilizzo

```js
browser.clearMockCalls(mockId, restore)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'ID di una simulazione</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Imposta su true se la simulazione deve essere ripristinata.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Risponde se la simulazione corrisponde a una risorsa specifica.<br /><br />Comando di Sauce Labs. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://docs.saucelabs.com/).

##### Utilizzo

```js
browser.respondMock(mockId, payload)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'ID di una simulazione</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Informazioni sulla risposta simulata.</td>
    </tr>
  </tbody>
</table>