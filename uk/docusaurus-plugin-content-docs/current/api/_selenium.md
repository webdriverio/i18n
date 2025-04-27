---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Завантаження файлу на віддалену машину, на якій запущено браузер.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://www.seleniumhq.org/).

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
      <td>ZIP-архів, закодований в base64, що містить __один__ файл для завантаження. Якщо дані, закодовані в base64, не представляють ZIP-архів або архів містить більше одного файлу, буде викинуто невідому помилку.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Абсолютний шлях завантаженого файлу на віддаленій машині.


---

## getDownloadableFiles
Список файлів з віддаленої машини, доступних для завантаження.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://www.seleniumhq.org/).

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Об'єкт, що містить список файлів, доступних для завантаження на віддаленій машині.


---

## download
Завантажити файл з віддаленої машини, на якій запущено браузер.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://www.seleniumhq.org/).

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
      <td>Назва файлу, який потрібно завантажити</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Об'єкт, що містить назву завантаженого файлу та його вміст


---

## deleteDownloadableFiles
Видалити всі файли, доступні для завантаження, з віддаленої машини, на якій запущено браузер.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://www.seleniumhq.org/).

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Отримати конфігурацію хабу віддалено.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Повертає конфігурацію хабу з кількістю слотів, часом очікування та іншою інформацією.


---

## gridTestSession
Отримати деталі про вузол Selenium Grid, на якому виконується сесія.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

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
      <td>Ідентифікатор сесії, для якої потрібно отримати деталі хабу.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Об'єкт, що містить інформацію про деталі сесії.


---

## gridProxyDetails
Отримати деталі проксі.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

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
      <td>ідентифікатор проксі (можна отримати за допомогою команди gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Об'єкт, що містить інформацію про проксі.


---

## manageSeleniumHubLifecycle
Керувати життєвим циклом вузла хабу.<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

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
      <td>Команда для виклику на Selenium Hub. Єдина реалізована дія — 'shutdown' (вимкнення) хабу.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Надсилати GraphQL-запити до серверa Selenium (хаб або вузол) для отримання даних. (Підтримується лише з Selenium v4 Server)<br /><br />Команда Selenium Standalone. Більше деталей можна знайти в [офіційній документації протоколу](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

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
      <td>GraphQL-запит для надсилання на сервер.</td>
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
            **<code><var>data</var></code>:** Результат GraphQL-запиту.