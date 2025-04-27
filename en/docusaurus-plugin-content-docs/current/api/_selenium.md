---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
Upload a file to remote machine on which the browser is running.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://www.seleniumhq.org/).

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
      <td>Base64-encoded zip archive containing __single__ file which to upload. In case base64-encoded data does not represent a zip archive or archive contains more than one file it will throw an unknown error.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absolute path of uploaded file on remote machine.


---

## getDownloadableFiles
List files from remote machine available for download.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://www.seleniumhq.org/).

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Object containing a list of downloadable files on remote machine.


---

## download
Download a file from remote machine on which the browser is running.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://www.seleniumhq.org/).

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
      <td>Name of the file to be downloaded</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Object containing downloaded file name and its content


---

## deleteDownloadableFiles
Remove all downloadable files from remote machine on which the browser is running.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://www.seleniumhq.org/).

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
Receive hub config remotely.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Returns the hub config with slotCount, timeouts and other information.


---

## gridTestSession
Get the details of the Selenium Grid node running a session.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

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
      <td>The id of the session to receive hub details for.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Object containing information about session details.


---

## gridProxyDetails
Get proxy details.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

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
      <td>the id of the proxy (can be received using gridTestSession command).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Object containing information about proxy.


---

## manageSeleniumHubLifecycle
Manage lifecycle of hub node.<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

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
      <td>Command to call on Selenium Hub. The only implemented action is to 'shutdown' the hub.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Send GraphQL queries to the Selenium (hub or node) server to fetch data. (Only supported with Selenium v4 Server)<br /><br />Selenium Standalone command. More details can be found in the [official protocol docs](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

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
      <td>A GraphQL query to be send to the server.</td>
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
            **<code><var>data</var></code>:** Result of the GraphQL query.

