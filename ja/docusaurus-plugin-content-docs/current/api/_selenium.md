---
id: selenium
title: Selenium スタンドアロン
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
リモートマシン（ブラウザが実行されている）にファイルをアップロードします。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://www.seleniumhq.org/)で確認できます。

##### 使用方法

```js
browser.file(file)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>アップロードする__単一の__ファイルを含むBase64エンコードされたzipアーカイブ。Base64エンコードされたデータがzipアーカイブでない場合、またはアーカイブに複数のファイルが含まれている場合は不明なエラーが発生します。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;String&gt;**
            **<code><var>path</var></code>:** リモートマシン上にアップロードされたファイルの絶対パス。


---

## getDownloadableFiles
リモートマシンからダウンロード可能なファイルの一覧を取得します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://www.seleniumhq.org/)で確認できます。

##### 使用方法

```js
browser.getDownloadableFiles()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** リモートマシン上のダウンロード可能なファイルのリストを含むオブジェクト。


---

## download
リモートマシン（ブラウザが実行されている）からファイルをダウンロードします。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://www.seleniumhq.org/)で確認できます。

##### 使用方法

```js
browser.download(name)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>ダウンロードするファイルの名前</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** ダウンロードしたファイル名とその内容を含むオブジェクト


---

## deleteDownloadableFiles
ブラウザが実行されているリモートマシンからすべてのダウンロード可能なファイルを削除します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://www.seleniumhq.org/)で確認できます。

##### 使用方法

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
リモートでハブ設定を受信します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/nicegraham/selenium-grid2-api#gridapihub)で確認できます。

##### 使用方法

```js
browser.getHubConfig()
```


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** スロット数、タイムアウト、その他の情報を含むハブ設定を返します。


---

## gridTestSession
セッションを実行しているSelenium Gridノードの詳細を取得します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession)で確認できます。

##### 使用方法

```js
browser.gridTestSession(session)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>ハブの詳細を受け取るセッションのID。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** セッションの詳細に関する情報を含むオブジェクト。


---

## gridProxyDetails
プロキシの詳細を取得します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy)で確認できます。

##### 使用方法

```js
browser.gridProxyDetails(id)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>プロキシのID（gridTestSessionコマンドを使用して受け取ることができます）。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** プロキシに関する情報を含むオブジェクト。


---

## manageSeleniumHubLifecycle
ハブノードのライフサイクルを管理します。<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager)で確認できます。

##### 使用方法

```js
browser.manageSeleniumHubLifecycle(action)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Selenium Hubで呼び出すコマンド。実装されている唯一のアクションはハブを「shutdown」することです。</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
Selenium（ハブまたはノード）サーバーにGraphQLクエリを送信してデータを取得します。（Selenium v4サーバーでのみサポート）<br /><br />Selenium スタンドアロンコマンドです。詳細は[公式プロトコルドキュメント](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/)で確認できます。

##### 使用方法

```js
browser.queryGrid(query)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>サーバーに送信するGraphQLクエリ。</td>
    </tr>
  </tbody>
</table>

##### 例


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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** GraphQLクエリの結果。