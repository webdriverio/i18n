---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
`executeAsync`コマンドは非推奨であり、将来のバージョンで削除される予定です。
代わりに`execute`コマンドを使用してください。`execute`コマンドは`async`/`await`を介して
より良いエラー処理のサポートを提供します。
:::

現在選択されているフレームのコンテキストで実行するために、JavaScriptのスニペットをページに挿入します。実行されるスクリプトは非同期であると想定され、常に関数の最後の引数として提供されるコールバックを呼び出すことで完了を通知する必要があります。このコールバックに渡された値がクライアントに返されます。

非同期スクリプトコマンドはページの読み込みをまたぐことはできません。スクリプトの結果を待っている間にアンロードイベントが発生した場合、エラーがクライアントに返されるべきです。

script引数は関数本体の形式で実行するスクリプトを定義します。関数は提供されたargs配列とともに呼び出され、値は指定された順序でargumentsオブジェクトを介してアクセスできます。最後の引数は常にコールバック関数であり、スクリプトが終了したことを通知するために呼び出す必要があります。

引数はJSON型の基本データ型、配列、またはJSONオブジェクトです。WebElement参照を定義するJSONオブジェクトは、対応するDOM要素に変換されます。同様に、スクリプト結果内のWebElementはWebElement JSONオブジェクトとしてクライアントに返されます。

:::caution

代わりに`execute`を使用してください
:::

##### 使用法

```js
browser.executeAsync(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>実行するスクリプト。</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`*`</td>
      <td>スクリプトの引数</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              スクリプトの結果。