---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Todos os comandos são suportados apenas no Chrome usando os recursos de
[Extended Debugging](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
do Sauce Labs. Você pode ativá-los definindo as seguintes opções do Sauce:


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
Obtenha informações específicas do registro da página web com base no último carregamento da página.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/insights/debug/#network-logs).

##### Uso

```js
browser.getPageLogs(type)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>tipo de log (por exemplo, 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Exemplos


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


##### Retorna

- **&lt;object&gt;**
            **<code><var>log</var></code>:** saída de log do tipo desejado (veja o exemplo)


---

## sauceThrottleNetwork
Com o condicionamento de rede, você pode testar seu site em uma variedade de conexões de rede, incluindo Edge, 3G e até mesmo offline. Você pode limitar a taxa de transferência de dados, incluindo o throughput máximo de download e upload, e usar a manipulação de latência para impor um atraso mínimo no tempo de ida e volta da conexão (RTT).<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).

##### Uso

```js
browser.sauceThrottleNetwork(condition)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>condição de rede a ser definida (por exemplo, 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Exemplos


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
Você pode limitar a CPU no DevTools para entender como sua página funciona sob essa restrição.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).

##### Uso

```js
browser.throttleCPU(rate)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Taxa de quanto a CPU deve ser limitada.</td>
    </tr>
  </tbody>
</table>

##### Exemplos


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
Permite modificar qualquer solicitação feita pelo navegador. Você pode colocar na lista negra, modificar ou redirecionar essas solicitações conforme necessário para seus testes.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).

##### Uso

```js
browser.interceptRequest(rule)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Uma regra descrevendo a interceptação de solicitação.</td>
    </tr>
  </tbody>
</table>

##### Exemplos


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
Faça assertivas contra a linha de base de desempenho de seu aplicativo.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).

##### Uso

```js
browser.assertPerformance(name, metrics)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nome do trabalho com o qual você criou sua linha de base.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string[]</td>
      <td>Nome das métricas que você deseja testar contra a linha de base.</td>
    </tr>
  </tbody>
</table>

##### Exemplo


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Retorna

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Um objeto contendo o resultado, bem como métricas sobre o resultado.


---

## jankinessCheck
Realize um teste de rolagem que avalia a instabilidade do aplicativo.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).

##### Uso

```js
browser.jankinessCheck()
```

##### Exemplo


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Retorna

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Um objeto contendo a pontuação, bem como métricas sobre quão suave a UX da página foi durante o teste.


---

## mockRequest
Simula um recurso de rede.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/).

##### Uso

```js
browser.mockRequest(url, filterOptions)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>URL glob para corresponder à URL a ser simulada.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Opções adicionais de filtro para URL a ser simulada (por exemplo, cabeçalhos, método).</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Um objeto contendo o ID de um recurso simulado.


---

## getMockCalls
Receba informações de solicitação sobre solicitações que correspondem ao recurso simulado.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/).

##### Uso

```js
browser.getMockCalls(mockId)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>o ID de uma simulação</td>
    </tr>
  </tbody>
</table>


##### Retorna

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Uma lista de informações de solicitação.


---

## clearMockCalls
Limpar lista de chamadas simuladas.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/).

##### Uso

```js
browser.clearMockCalls(mockId, restore)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>o ID de uma simulação</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Defina como verdadeiro se a simulação também deve ser restaurada.</td>
    </tr>
  </tbody>
</table>



---

## respondMock
Responda se a simulação corresponder a um recurso específico.<br /><br />Comando do Sauce Labs. Mais detalhes podem ser encontrados na [documentação oficial do protocolo](https://docs.saucelabs.com/).

##### Uso

```js
browser.respondMock(mockId, payload)
```


##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>o ID de uma simulação</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Informações sobre a resposta simulada.</td>
    </tr>
  </tbody>
</table>