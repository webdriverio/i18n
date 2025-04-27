---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Загрузка файла на удаленную машину, на которой запущен браузер.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://www.seleniumhq.org/).

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
      <td>Zip-архив, закодированный в base64, содержащий __один__ файл для загрузки. Если данные в формате base64 не представляют zip-архив или архив содержит более одного файла, будет вызвана неизвестная ошибка.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Абсолютный путь загруженного файла на удаленной машине.


---

## getDownloadableFiles
Список файлов на удаленной машине, доступных для скачивания.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://www.seleniumhq.org/).

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Объект, содержащий список файлов, доступных для скачивания на удаленной машине.


---

## download
Скачать файл с удаленной машины, на которой запущен браузер.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://www.seleniumhq.org/).

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
      <td>Имя файла для скачивания</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Объект, содержащий имя скачанного файла и его содержимое


---

## deleteDownloadableFiles
Удалить все скачиваемые файлы с удаленной машины, на которой запущен браузер.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://www.seleniumhq.org/).

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Получить конфигурацию хаба удаленно.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Возвращает конфигурацию хаба с информацией о количестве слотов, тайм-аутах и другой информацией.


---

## gridTestSession
Получить подробности о ноде Selenium Grid, запускающей сессию.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

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
      <td>ID сессии, для которой необходимо получить подробности хаба.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Объект, содержащий информацию о деталях сессии.


---

## gridProxyDetails
Получить сведения о прокси.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

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
      <td>ID прокси (можно получить с помощью команды gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Объект, содержащий информацию о прокси.


---

## manageSeleniumHubLifecycle
Управление жизненным циклом ноды хаба.<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

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
      <td>Команда для вызова на Selenium Hub. Единственное реализованное действие — это 'shutdown' (отключение) хаба.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Отправка GraphQL-запросов на сервер Selenium (хаб или нода) для получения данных. (Поддерживается только с Selenium v4 Server)<br /><br />Команда Selenium Standalone. Более подробную информацию можно найти в [официальной документации протокола](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

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
      <td>GraphQL-запрос для отправки на сервер.</td>
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
            **<code><var>data</var></code>:** Результат GraphQL-запроса.