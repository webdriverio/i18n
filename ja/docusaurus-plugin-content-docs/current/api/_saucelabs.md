---
id: saucelabs
title: Sauce Labs
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/saucelabs.ts
---

すべてのコマンドは、Sauce Labsの[拡張デバッグ](https://docs.saucelabs.com/insights/debug/#enabling-extended-debugging)機能を使用したChromeでのみサポートされています。これらを有効にするには、以下のSauceオプションを設定します：


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
      <td>ログタイプ（例：'sauce:network'、'sauce:performance'）</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// ネットワークログを取得
console.log(browser.getPageLogs('sauce:network'));
/**
 * 出力例：
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
// パフォーマンスログを取得（capturePerformanceケーパビリティが必要 参照：https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
console.log(browser.getPageLogs('sauce:performance'));
/**
 * 出力例：
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
            **<code><var>log</var></code>:** 指定されたタイプのログ出力（例を参照）


---

## sauceThrottleNetwork
ネットワーク調整により、Edge、3G、さらにはオフラインなど、さまざまなネットワーク接続でサイトをテストできます。データのスループットを制限（ダウンロードおよびアップロードの最大スループットを含む）し、接続ラウンドトリップタイム（RTT）に最小遅延を強制するためのレイテンシ操作を使用できます。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork)で確認できます。

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
      <td>設定するネットワーク状態（例：'online'、'offline'、'GPRS'、'Regular 2G'、'Good 2G'、'Regular 3G'、'Good 3G'、'Regular 4G'、'DSL'、'Wifi'）</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// 事前定義されたネットワーク条件
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
      <td>CPUをどの程度スロットリングするかの比率。</td>
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
ブラウザが行うリクエストを変更することができます。テストの要件に応じて、これらをブラックリスト化、変更、またはリダイレクトすることができます。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/insights/debug/#intercept-network-requests)で確認できます。

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
      <td>リクエスト傍受を記述するルール。</td>
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
// サードパーティベンダーへのリクエストをブラックリスト化
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
アプリのパフォーマンスベースラインに対してアサーションを行います。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities)で確認できます。

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
      <td>ベースラインを作成したジョブの名前。</td>
    </tr>
    <tr>
      <td><code><var>metrics</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>string[]</td>
      <td>ベースラインに対してアサーションを行いたいメトリクスの名前。</td>
    </tr>
  </tbody>
</table>

##### 例


```js
// ページのパフォーマンスをテスト
browser.url('https://webdriver.io')
const hasRegression = browser.assertPerformance({
  name: 'my performance test', // この名前がケーパビリティのsauceオプションでも設定されていることを確認してください
  metrics: ['score', 'firstPaint']
})
```


##### 戻り値

- **&lt;object&gt;**
            **<code><var>hasRegression</var></code>:** 結果と結果に関するメトリクスを含むオブジェクト。


---

## jankinessCheck
アプリケーションのぎこちなさ（jankiness）を評価するスクロールテストを実行します。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command)で確認できます。

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
            **<code><var>testResults</var></code>:** テスト中のページのUXの滑らかさに関するスコアとメトリクスを含むオブジェクト。


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
      <td>モックするURLに一致するURLグロブ。</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>object</td>
      <td>モックするURLの追加フィルターオプション（例：ヘッダー、メソッド）。</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;object&gt;**
            **<code><var>mockId</var></code>:** モックリソースのIDを含むオブジェクト。


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
            **<code><var>requests</var></code>:** リクエスト情報のリスト。


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
      <td><code><var>restore</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>boolean</td>
      <td>モックも復元する場合はtrueに設定します。</td>
    </tr>
  </tbody>
</table>



---

## respondMock
モックが特定のリソースに一致する場合に応答します。<br /><br />Sauce Labsコマンドです。詳細は[公式プロトコルドキュメント](https://docs.saucelabs.com/)で確認できます。

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
      <td><code><var>payload</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>object</td>
      <td>モックレスポンスに関する情報。</td>
    </tr>
  </tbody>
</table>