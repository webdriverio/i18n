---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Todos los comandos solo son compatibles con Chrome usando las capacidades de 
[Depuración Extendida](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
de Sauce Labs. Puedes habilitarlas configurando las siguientes opciones de Sauce:


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
Obtén información específica de registro de la página web basada en la última carga de página.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/insights/debug/#network-logs).



##### Uso

```js
browser.getPageLogs(type)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>tipo de registro (por ejemplo, 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Ejemplos


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


##### Devuelve

- **&lt;object&gt;**
            **<code><var>log</var></code>:** salida de registro del tipo deseado (ver ejemplo)    


---
## sauceThrottleNetwork
Con el acondicionamiento de red puedes probar tu sitio en una variedad de conexiones de red, incluyendo Edge, 3G, e incluso sin conexión. Puedes limitar el rendimiento de datos, incluyendo la velocidad máxima de descarga y carga, y usar la manipulación de latencia para forzar un retraso mínimo en el tiempo de ida y vuelta de la conexión (RTT).<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).



##### Uso

```js
browser.sauceThrottleNetwork(condition)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>condición de red a establecer (por ejemplo, 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Ejemplos


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
Puedes limitar la CPU en DevTools para entender cómo se comporta tu página bajo esa restricción.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).



##### Uso

```js
browser.throttleCPU(rate)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Tasa sobre cuánto debe limitarse la CPU.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos


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
Permite modificar cualquier solicitud realizada por el navegador. Puedes poner en lista negra, modificar o redirigir estas según sea necesario para tus pruebas.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).



##### Uso

```js
browser.interceptRequest(rule)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Una regla que describe la interceptación de solicitud.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos


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
Afirma contra la línea base de rendimiento de tu aplicación.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).



##### Uso

```js
browser.assertPerformance(name, metrics)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nombre del trabajo con el que creaste tu línea base.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string[]</td>
      <td>Nombre de las métricas contra las que quieres afirmar la línea base.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Devuelve

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Un objeto que contiene el resultado así como métricas sobre el resultado.    


---
## jankinessCheck
Realiza una prueba de desplazamiento que evalúa la inestabilidad de la aplicación.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).



##### Uso

```js
browser.jankinessCheck()
```



##### Ejemplo


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Devuelve

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Un objeto que contiene la puntuación así como métricas sobre cuán fluida fue la experiencia de usuario de la página durante la prueba.    


---
## mockRequest
Simula un recurso de red.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/).



##### Uso

```js
browser.mockRequest(url, filterOptions)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>Patrón URL para coincidir con la URL a simular.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Opciones de filtro adicionales para la URL a simular (por ejemplo, encabezados, método).</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Un objeto que contiene el ID de un recurso simulado.    


---
## getMockCalls
Recibe información de solicitud sobre solicitudes que coinciden con el recurso simulado.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/).



##### Uso

```js
browser.getMockCalls(mockId)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>el ID de una simulación</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Una lista de información de solicitudes.    


---
## clearMockCalls
Limpia la lista de llamadas simuladas.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/).



##### Uso

```js
browser.clearMockCalls(mockId, restore)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>el ID de una simulación</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Establecer en true si la simulación también debe ser restaurada.</td>
    </tr>
  </tbody>
</table>





---
## respondMock
Responde si la simulación coincide con un recurso específico.<br /><br />Comando de Sauce Labs. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://docs.saucelabs.com/).



##### Uso

```js
browser.respondMock(mockId, payload)
```


##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>el ID de una simulación</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Información sobre la respuesta simulada.</td>
    </tr>
  </tbody>
</table>




