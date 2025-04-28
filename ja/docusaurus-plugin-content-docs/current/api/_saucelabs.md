---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

すべてのコマンドはSauce Labs上のChromeでのみサポートされており、
[拡張デバッグ](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)
機能を使用しています。以下のようなSauceオプションを設定することで有効化できます:


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
最後のページ読み込みに基づいたウェブページ固有のログ情報を取得します。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#network-logs)で確認できます。

##### 使用法

```js
browser.getPageLogs(type)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>ログタイプ (例: 'sauce:network', 'sauce:performance')</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// ネットワークログを取得
console.log(browser.getPageLogs('sauce:network'));
/**
 * 出力:
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
// パフォーマンスログを取得（capturePerformanceケイパビリティが必要 参照: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * 出力:
 * {
 *   "speedIndex": 1472.023,
 *   "timeToFirstInteractive": 1243.214,
 *   "firstMeaningfulPaint": 892.643,
 *   ...
 * }
 */
```


##### 戻り値

- **&lt;object&gt;**
            **<code><var>log</var></code>:** 指定したタイプのログ出力（例を参照）


---

## sauceThrottleNetwork
ネットワーク条件を設定することで、さまざまなネットワーク接続（Edge、3G、オフラインなど）でサイトをテストできます。データのスループット（最大ダウンロードおよびアップロードスループットを含む）を制限したり、接続の往復時間（RTT）に最小遅延を適用するための遅延操作を使用したりできます。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork)で確認できます。

##### 使用法

```js
browser.sauceThrottleNetwork(condition)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>string, object</td>
      <td>設定するネットワーク条件 (例: 'online', 'offline', 'GPRS', 'Regular 2G', 'Good 2G', 'Regular 3G', 'Good 3G', 'Regular 4G', 'DSL', 'Wifi')</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// 定義済みネットワーク条件
browser.sauceThrottleNetwork('offline')
```


```js
// カスタムネットワーク条件
browser.sauceThrottleNetwork({
  download: 1000,
  upload: 500,
  latency: 40'
})
```



---

## throttleCPU
DevToolsでCPUをスロットリングして、その制約下でページがどのように動作するかを理解できます。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#saucethrottlecpu)で確認できます。

##### 使用法

```js
browser.throttleCPU(rate)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rate</var></code></td>
      <td>number</td>
      <td>CPUをスロットリングする割合</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// CPUをスロットリングして4倍遅くする
browser.throttleCPU(4)
```


```js
// CPUスロットリングをリセット
browser.throttleCPU(0)
```



---

## interceptRequest
ブラウザが行うリクエストを変更できます。テストに必要に応じて、これらをブラックリストに登録したり、変更したり、リダイレクトしたりできます。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#intercept-network-requests)で確認できます。

##### 使用法

```js
browser.interceptRequest(rule)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>rule</var></code></td>
      <td>object</td>
      <td>リクエストのインターセプトを記述するルール</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// リクエストをリダイレクト
browser.interceptRequest({
  url: 'https://saucelabs.com',
  redirect: 'https://google.com'
})
```


```js
// サードパーティベンダーへのリクエストをブラックリストに登録
browser.interceptRequest({
  url: 'https://api.segment.io/v1/p',
  error: 'Failed'
})
```


```js
// REST APIへのリクエストを変更（REST APIレスポンスをモック）
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
アプリのパフォーマンスベースラインに対してアサートします。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities)で確認できます。

##### 使用法

```js
browser.assertPerformance(name, metrics)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>ベースラインを作成したジョブの名前</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>string[]</td>
      <td>ベースラインに対してアサートしたいメトリクスの名前</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// ページのパフォーマンスをテスト
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // 名前がケイパビリティのsauceオプションにも設定されていることを確認してください
  metrics: ['score', 'firstPaint']
})
```


##### 戻り値

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** 結果とその結果に関するメトリクスを含むオブジェクト


---

## jankinessCheck
アプリケーションのジャンキネス（描画のガタつき）を評価するスクロールテストを実行します。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command)で確認できます。

##### 使用法

```js
browser.jankinessCheck()
```

##### 例


```js
// ページのパフォーマンスをテスト
browser.url('https://webdriver.io')
browser.jankinessCheck()
```


##### 戻り値

- **&lt;object&gt;**
            **<code><var>testResults</var></code>:** スコアとテスト中のページのUXのスムーズさに関するメトリクスを含むオブジェクト


---

## mockRequest
ネットワークリソースをモックします。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/)で確認できます。

##### 使用法

```js
browser.mockRequest(url, filterOptions)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>モックするURLに一致するグロブパターン</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>object</td>
      <td>モックするURLの追加フィルターオプション（ヘッダー、メソッドなど）</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** モックリソースのIDを含むオブジェクト


---

## getMockCalls
モックされたリソースに一致するリクエストに関する情報を受け取ります。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/)で確認できます。

##### 使用法

```js
browser.getMockCalls(mockId)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>モックのID</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>requests</var></code>:** リクエスト情報のリスト


---

## clearMockCalls
モック呼び出しのリストをクリアします。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/)で確認できます。

##### 使用法

```js
browser.clearMockCalls(mockId, restore)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>モックのID</td>
    </tr>
    <tr>
      <td><code><var>restore</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>boolean</td>
      <td>モックも復元する場合はtrueに設定します</td>
    </tr>
  </tbody>
</table>



---

## respondMock
モックが特定のリソースに一致した場合に応答します。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/)で確認できます。

##### 使用法

```js
browser.respondMock(mockId, payload)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mockId</var></code></td>
      <td>String</td>
      <td>モックのID</td>
    </tr>
    <tr>
      <td><code><var>payload</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>object</td>
      <td>モックレスポンスに関する情報</td>
    </tr>
  </tbody>
</table>