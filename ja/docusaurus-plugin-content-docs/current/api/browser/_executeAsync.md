---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
`executeAsync`コマンドは非推奨であり、将来のバージョンで削除される予定です。
代わりに、`async`/`await`によるエラー処理のサポートが改善された
`execute`コマンドを使用してください。
:::

現在選択されているフレームのコンテキストで実行するために、JavaScriptのスニペットをページに注入します。
実行されるスクリプトは非同期であると見なされ、常に関数の最後の引数として提供されるコールバックを呼び出すことによって
完了を通知する必要があります。このコールバックに渡された値がクライアントに返されます。

非同期スクリプトコマンドはページの読み込みをまたぐことはできません。スクリプトの結果を待っている間にアンロードイベントが
発生した場合、エラーがクライアントに返されるべきです。

スクリプト引数は関数本体の形式で実行するスクリプトを定義します。この関数は指定された順序で引数オブジェクトを介して
アクセスできる引数配列とともに呼び出されます。最後の引数は常に、スクリプトが終了したことを知らせるために呼び出す必要がある
コールバック関数です。

引数はJSON基本型、配列、またはJSONオブジェクトのいずれかです。WebElement参照を定義するJSONオブジェクトは、対応するDOM要素に
変換されます。同様に、スクリプト結果内のWebElementはWebElement JSONオブジェクトとしてクライアントに返されます。

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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">省略可能</span></td>
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