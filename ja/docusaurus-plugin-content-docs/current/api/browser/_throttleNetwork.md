---
id: throttleNetwork
title: ネットワークスロットル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

ブラウザのネットワーク機能を制限します。これにより、ユーザーがインターネット接続を
失った場合などのシナリオをエミュレートし、アプリがそれにどう対応するかを
テストするのに役立ちます。

簡単に使用できるデフォルト設定が含まれた多くのプリセットが利用可能です。
それらは `offline`、`GPRS`、`Regular2G`、`Good2G`、`Regular3G`、`Good3G`、
`Regular4G`、`DSL`、`WiFi`、`online` です。

これらのプリセットの値は[ソースコード](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29)で確認できます。

:::info

`throttleNetwork` コマンドを使用するには Chrome DevTools プロトコルのサポートが必要であり、
クラウドで自動テストを実行する場合などには使用できないことに注意してください。Chrome DevTools プロトコルはデフォルトでインストールされていません。
`npm install puppeteer-core` を使用してインストールしてください。
詳細は[自動化プロトコル](/docs/automationProtocols)セクションをご覧ください。

:::

##### 使用方法

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>スロットリングのパラメータ</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>インターネット切断をエミュレートする場合はTrue。</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>リクエスト送信からレスポンスヘッダー受信までの最小遅延時間（ミリ秒）。</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大ダウンロードスループット（バイト/秒）。-1でダウンロードスロットリングを無効化。</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大アップロードスループット（バイト/秒）。-1でアップロードスロットリングを無効化。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // 静的文字列プリセットを使用
    await browser.throttleNetwork('Regular3G')

    // カスタム値を使用
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```