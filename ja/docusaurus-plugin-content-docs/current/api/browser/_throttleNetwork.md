---
id: throttleNetwork
title: ネットワークスロットリング
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

ブラウザのネットワーク機能を制限します。これは、ユーザーがインターネット接続を
失った場合やアプリケーションがそのような状況に対応する必要がある場合などの
シナリオをエミュレートするのに役立ちます。

簡単に使用できるデフォルト設定が含まれた多くのプリセットが利用可能です。
これらには `offline`、`GPRS`、`Regular2G`、`Good2G`、`Regular3G`、`Good3G`、
`Regular4G`、`DSL`、`WiFi`、`online` があります。

これらのプリセットの値は[ソースコード](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29)で確認できます。

:::info

`throttleNetwork` コマンドを使用するにはChrome DevToolsプロトコルのサポートが必要であり、
クラウドで自動テストを実行する場合などには使用できません。Chrome DevToolsプロトコルはデフォルトでインストールされていないため、
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
      <th>名前</th><th>型</th><th>詳細</th>
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
      <td>インターネット切断をエミュレートする場合はtrue。</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>リクエスト送信からレスポンスヘッダー受信までの最小遅延（ミリ秒）。</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大集約ダウンロードスループット（バイト/秒）。-1はダウンロードスロットリングを無効にします。</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大集約アップロードスループット（バイト/秒）。-1はアップロードスロットリングを無効にします。</td>
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