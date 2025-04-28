---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Prześlij plik do zdalnej maszyny, na której działa przeglądarka.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.seleniumhq.org/).

##### Użycie

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Zakodowane w base64 archiwum zip zawierające __pojedynczy__ plik do przesłania. W przypadku gdy dane zakodowane w base64 nie reprezentują archiwum zip lub archiwum zawiera więcej niż jeden plik, zostanie wyrzucony nieznany błąd.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Ścieżka bezwzględna przesłanego pliku na zdalnej maszynie.


---

## getDownloadableFiles
Lista plików dostępnych do pobrania ze zdalnej maszyny.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.seleniumhq.org/).

##### Użycie

```js
browser.getDownloadableFiles()
```


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Obiekt zawierający listę plików możliwych do pobrania na zdalnej maszynie.


---

## download
Pobierz plik ze zdalnej maszyny, na której działa przeglądarka.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.seleniumhq.org/).

##### Użycie

```js
browser.download(name)
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
      <td>Nazwa pliku do pobrania</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Obiekt zawierający nazwę pobranego pliku i jego zawartość


---

## deleteDownloadableFiles
Usuń wszystkie pliki możliwe do pobrania ze zdalnej maszyny, na której działa przeglądarka.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.seleniumhq.org/).

##### Użycie

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Otrzymaj konfigurację huba zdalnie.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Użycie

```js
browser.getHubConfig()
```


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Zwraca konfigurację huba z liczbą slotów, limitami czasu i innymi informacjami.


---

## gridTestSession
Pobierz szczegóły węzła Selenium Grid uruchamiającego sesję.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### Użycie

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>Identyfikator sesji, dla której mają zostać pobrane szczegóły huba.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Obiekt zawierający informacje o szczegółach sesji.


---

## gridProxyDetails
Pobierz szczegóły proxy.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### Użycie

```js
browser.gridProxyDetails(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>identyfikator proxy (można go otrzymać używając komendy gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Obiekt zawierający informacje o proxy.


---

## manageSeleniumHubLifecycle
Zarządzaj cyklem życia węzła huba.<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### Użycie

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Komenda do wywołania na Selenium Hub. Jedyna zaimplementowana akcja to 'shutdown' (wyłączenie) huba.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Wysyłaj zapytania GraphQL do serwera Selenium (hub lub node), aby pobrać dane. (Obsługiwane tylko z serwerem Selenium v4)<br /><br />Komenda Selenium Standalone. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### Użycie

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Zapytanie GraphQL, które ma być wysłane do serwera.</td>
    </tr>
  </tbody>
</table>

##### Przykład


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


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Wynik zapytania GraphQL.