---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Laden Sie eine Datei auf die Remote-Maschine hoch, auf der der Browser läuft.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://www.seleniumhq.org/).

##### Usage

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-kodiertes ZIP-Archiv, das __eine einzige__ Datei zum Hochladen enthält. Falls die base64-kodierte Daten kein ZIP-Archiv darstellen oder das Archiv mehr als eine Datei enthält, wird ein unbekannter Fehler ausgelöst.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absoluter Pfad der hochgeladenen Datei auf der Remote-Maschine.


---

## getDownloadableFiles
Listet Dateien von der Remote-Maschine auf, die zum Download verfügbar sind.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://www.seleniumhq.org/).

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Objekt mit einer Liste von herunterladbaren Dateien auf der Remote-Maschine.


---

## download
Laden Sie eine Datei von der Remote-Maschine herunter, auf der der Browser läuft.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://www.seleniumhq.org/).

##### Usage

```js
browser.download(name)
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
      <td>Name der herunterzuladenden Datei</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Objekt mit dem Namen der heruntergeladenen Datei und ihrem Inhalt


---

## deleteDownloadableFiles
Entfernt alle herunterladbaren Dateien von der Remote-Maschine, auf der der Browser läuft.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://www.seleniumhq.org/).

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Empfangen Sie die Hub-Konfiguration aus der Ferne.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Gibt die Hub-Konfiguration mit slotCount, Timeouts und anderen Informationen zurück.


---

## gridTestSession
Erhalten Sie die Details des Selenium Grid-Knotens, der eine Sitzung ausführt.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### Usage

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>Die ID der Sitzung, für die Hub-Details empfangen werden sollen.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objekt mit Informationen über Sitzungsdetails.


---

## gridProxyDetails
Proxy-Details abrufen.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### Usage

```js
browser.gridProxyDetails(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>Die ID des Proxys (kann mit dem gridTestSession-Befehl empfangen werden).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objekt mit Informationen über den Proxy.


---

## manageSeleniumHubLifecycle
Verwalten Sie den Lebenszyklus des Hub-Knotens.<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### Usage

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Befehl, der auf dem Selenium Hub aufgerufen werden soll. Die einzige implementierte Aktion ist 'shutdown' des Hubs.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Senden Sie GraphQL-Abfragen an den Selenium-Server (Hub oder Knoten), um Daten abzurufen. (Nur mit Selenium v4 Server unterstützt)<br /><br />Selenium Standalone Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### Usage

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Eine GraphQL-Abfrage, die an den Server gesendet werden soll.</td>
    </tr>
  </tbody>
</table>

##### Example


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


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Ergebnis der GraphQL-Abfrage.