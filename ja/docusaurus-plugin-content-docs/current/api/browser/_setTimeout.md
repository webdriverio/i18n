---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

現在のセッションに関連するタイムアウトを設定します。タイムアウト時間は、スクリプトの挿入、ドキュメントのナビゲーション、要素の取得などの動作を制御します。
詳細と例については、[タイムアウトガイド](https://webdriver.io/docs/timeouts#selenium-timeouts)を参照してください。

:::info

`implicit`タイムアウトを設定することはお勧めしません。WebdriverIOの動作に影響を与え、
特定のコマンド（例えば、リバースフラグを持つ`waitForExist`）でエラーを引き起こす可能性があります。

:::

##### 使用法

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>セッションタイムアウト値を含むオブジェクト</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>要素を見つける際に要素の場所特定戦略を再試行するミリ秒単位の時間。</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>ドキュメントの読み込みが完了するまで待機するミリ秒単位の時間。</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>[`execute`](https://webdriver.io/docs/api/browser/execute)または[`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync)で挿入されたスクリプトは、スクリプトタイムアウト時間に達するまで実行されます。これもミリ秒単位で指定します。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```