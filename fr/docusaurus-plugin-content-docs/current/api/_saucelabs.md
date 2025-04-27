---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

Toutes les commandes ne sont prises en charge que sur Chrome en utilisant les capacités de 
[Débogage étendu](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
de Sauce Labs. Vous pouvez les activer en définissant les options Sauce suivantes :


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
Obtenez des informations de journal spécifiques à la page web basées sur le dernier chargement de page.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/insights/debug/#network-logs).



##### Usage

```js
browser.getPageLogs(type)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>type de journal (par exemple 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### Examples


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


##### Returns

- **&lt;object&gt;**
            **<code><var>log</var></code>:** sortie de journal du type souhaité (voir exemple)    


---
## sauceThrottleNetwork
Avec le conditionnement réseau, vous pouvez tester votre site sur diverses connexions réseau, y compris Edge, 3G et même hors ligne. Vous pouvez limiter le débit de données, y compris le débit maximum de téléchargement et d'envoi, et utiliser la manipulation de latence pour imposer un délai minimum au temps d'aller-retour de connexion (RTT).<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork).



##### Usage

```js
browser.sauceThrottleNetwork(condition)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>condition réseau à définir (par exemple 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### Examples


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
Vous pouvez limiter le CPU dans DevTools pour comprendre comment votre page fonctionne sous cette contrainte.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu).



##### Usage

```js
browser.throttleCPU(rate)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>Taux de limitation du CPU.</td>
    </tr>
  </tbody>
</table>

##### Examples


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
Permet de modifier toute requête effectuée par le navigateur. Vous pouvez mettre sur liste noire, modifier ou rediriger ces requêtes selon les besoins de vos tests.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/insights/debug/#intercept-network-requests).



##### Usage

```js
browser.interceptRequest(rule)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>Une règle décrivant l'interception de la requête.</td>
    </tr>
  </tbody>
</table>

##### Examples


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
Vérifier par rapport à la base de performance de votre application.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities).



##### Usage

```js
browser.assertPerformance(name, metrics)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nom du job avec lequel vous avez créé votre référence.</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Nom des métriques que vous souhaitez vérifier par rapport à la référence.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// test performance for a page
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
  metrics: ['score', 'firstPaint']
})
```


##### Returns

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** Un objet contenant le résultat ainsi que des métriques sur le résultat.    


---
## jankinessCheck
Effectuez un test de défilement qui évalue la fluidité de l'application.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command).



##### Usage

```js
browser.jankinessCheck()
```



##### Example


```js
// test performance for a page
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### Returns

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** Un objet contenant le score ainsi que des métriques sur la fluidité de l'UX de la page pendant le test.    


---
## mockRequest
Simule une ressource réseau.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/).



##### Usage

```js
browser.mockRequest(url, filterOptions)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>Modèle d'URL globale à faire correspondre pour simuler.</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Options de filtrage supplémentaires pour l'URL à simuler (par exemple, en-têtes, méthode).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** Un objet contenant l'identifiant d'une ressource simulée.    


---
## getMockCalls
Recevoir des informations sur les requêtes qui correspondent à la ressource simulée.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/).



##### Usage

```js
browser.getMockCalls(mockId)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'une simulation</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** Une liste d'informations sur les requêtes.    


---
## clearMockCalls
Effacer la liste des appels simulés.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/).



##### Usage

```js
browser.clearMockCalls(mockId, restore)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'une simulation</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Mettre à true si la simulation doit également être restaurée.</td>
    </tr>
  </tbody>
</table>





---
## respondMock
Répondre si la simulation correspond à une ressource spécifique.<br /><br />Commande Sauce Labs. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://docs.saucelabs.com/).



##### Usage

```js
browser.respondMock(mockId, payload)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'une simulation</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Informations sur la réponse simulée.</td>
    </tr>
  </tbody>
</table>