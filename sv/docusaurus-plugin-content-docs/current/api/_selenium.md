---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Ladda upp en fil till fjärrmaskinen där webbläsaren körs.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://www.seleniumhq.org/).

##### Användning

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-kodad zip-arkiv som innehåller __enskild__ fil som ska laddas upp. Om base64-kodad data inte representerar ett zip-arkiv eller arkivet innehåller mer än en fil kommer det att kasta ett okänt fel.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absolut sökväg till uppladdad fil på fjärrmaskinen.


---

## getDownloadableFiles
Lista filer från fjärrmaskinen som är tillgängliga för nedladdning.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://www.seleniumhq.org/).

##### Användning

```js
browser.getDownloadableFiles()
```


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Objekt som innehåller en lista över nedladdningsbara filer på fjärrmaskinen.


---

## download
Ladda ner en fil från fjärrmaskinen där webbläsaren körs.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://www.seleniumhq.org/).

##### Användning

```js
browser.download(name)
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
      <td>Namn på filen som ska laddas ner</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Objekt som innehåller nedladdad filnamn och dess innehåll


---

## deleteDownloadableFiles
Ta bort alla nedladdningsbara filer från fjärrmaskinen där webbläsaren körs.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://www.seleniumhq.org/).

##### Användning

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Ta emot hub-konfiguration på distans.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Användning

```js
browser.getHubConfig()
```


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Returnerar hub-konfigurationen med slotCount, timeouts och annan information.


---

## gridTestSession
Hämta detaljerna för Selenium Grid-noden som kör en session.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### Användning

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>ID för sessionen som ska ta emot hubdetaljer för.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objekt som innehåller information om sessionsdetaljer.


---

## gridProxyDetails
Hämta proxydetaljer.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### Användning

```js
browser.gridProxyDetails(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>ID för proxyn (kan erhållas med hjälp av gridTestSession-kommando).</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objekt som innehåller information om proxy.


---

## manageSeleniumHubLifecycle
Hantera livscykel för hub-nod.<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### Användning

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Kommando att anropa på Selenium Hub. Den enda implementerade åtgärden är att 'shutdown' hubben.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Skicka GraphQL-frågor till Selenium-servern (hub eller nod) för att hämta data. (Stöds endast med Selenium v4 Server)<br /><br />Selenium Standalone-kommando. Mer information finns i [officiell protokolldokumentation](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### Användning

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>En GraphQL-fråga som ska skickas till servern.</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
console.log(JSON.stringify(result, null, 4))
/**
 * outputs:
 * {
 *   "data": {
 *     "nodesInfo": {
 *       "nodes": [{
 *         "status": "UP",
 *         "uri": "http://192.168.0.39:4444"
 *       }]
 *     }
 *   }
 * }
 */
```


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Resultat av GraphQL-frågan.