---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
上传文件到运行浏览器的远程机器上。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://www.seleniumhq.org/)中找到。

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
      <td>Base64编码的zip归档文件，其中包含要上传的__单个__文件。如果base64编码的数据不代表zip存档或存档包含多个文件，将抛出未知错误。</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** 上传文件在远程机器上的绝对路径。


---

## getDownloadableFiles
列出远程机器上可供下载的文件。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://www.seleniumhq.org/)中找到。

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** 包含远程机器上可下载文件列表的对象。


---

## download
从运行浏览器的远程机器下载文件。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://www.seleniumhq.org/)中找到。

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
      <td>要下载的文件名</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** 包含下载文件名称及其内容的对象


---

## deleteDownloadableFiles
删除运行浏览器的远程机器上的所有可下载文件。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://www.seleniumhq.org/)中找到。

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
远程接收hub配置。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://github.com/nicegraham/selenium-grid2-api#gridapihub)中找到。

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** 返回包含slotCount、超时和其他信息的hub配置。


---

## gridTestSession
获取运行会话的Selenium Grid节点的详细信息。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession)中找到。

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
      <td>要接收hub详情的会话ID。</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** 包含会话详情信息的对象。


---

## gridProxyDetails
获取代理详情。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy)中找到。

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
      <td>代理的ID（可以使用gridTestSession命令获取）。</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** 包含代理信息的对象。


---

## manageSeleniumHubLifecycle
管理hub节点的生命周期。<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager)中找到。

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
      <td>在Selenium Hub上调用的命令。唯一实现的操作是"shutdown"（关闭）hub。</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
向Selenium（hub或节点）服务器发送GraphQL查询以获取数据。（仅支持Selenium v4服务器）<br /><br />Selenium Standalone 命令。更多细节可以在[官方协议文档](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/)中找到。

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
      <td>发送到服务器的GraphQL查询。</td>
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
            **<code><var>data</var></code>:** GraphQL查询的结果。