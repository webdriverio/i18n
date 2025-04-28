---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Carica un file sulla macchina remota su cui è in esecuzione il browser.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.seleniumhq.org/).

##### Utilizzo

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Archivio zip codificato in base64 contenente __un solo__ file da caricare. Nel caso in cui i dati codificati in base64 non rappresentino un archivio zip o l'archivio contenga più di un file, verrà generato un errore sconosciuto.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Percorso assoluto del file caricato sulla macchina remota.


---

## getDownloadableFiles
Elenca i file dalla macchina remota disponibili per il download.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.seleniumhq.org/).

##### Utilizzo

```js
browser.getDownloadableFiles()
```


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Oggetto contenente un elenco di file scaricabili sulla macchina remota.


---

## download
Scarica un file dalla macchina remota su cui è in esecuzione il browser.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.seleniumhq.org/).

##### Utilizzo

```js
browser.download(name)
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
      <td>Nome del file da scaricare</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Oggetto contenente il nome del file scaricato e il suo contenuto


---

## deleteDownloadableFiles
Rimuovi tutti i file scaricabili dalla macchina remota su cui è in esecuzione il browser.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.seleniumhq.org/).

##### Utilizzo

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Ricevi la configurazione dell'hub in remoto.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Utilizzo

```js
browser.getHubConfig()
```


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Restituisce la configurazione dell'hub con slotCount, timeout e altre informazioni.


---

## gridTestSession
Ottieni i dettagli del nodo Selenium Grid che esegue una sessione.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### Utilizzo

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>L'ID della sessione per cui ricevere i dettagli dell'hub.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Oggetto contenente informazioni sui dettagli della sessione.


---

## gridProxyDetails
Ottieni i dettagli del proxy.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### Utilizzo

```js
browser.gridProxyDetails(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>L'ID del proxy (può essere ricevuto utilizzando il comando gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Oggetto contenente informazioni sul proxy.


---

## manageSeleniumHubLifecycle
Gestisci il ciclo di vita del nodo hub.<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### Utilizzo

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Comando da chiamare su Selenium Hub. L'unica azione implementata è 'shutdown' dell'hub.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Invia query GraphQL al server Selenium (hub o nodo) per recuperare dati. (Supportato solo con Selenium v4 Server)<br /><br />Comando Selenium Standalone. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### Utilizzo

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Una query GraphQL da inviare al server.</td>
    </tr>
  </tbody>
</table>

##### Esempio


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


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Risultato della query GraphQL.