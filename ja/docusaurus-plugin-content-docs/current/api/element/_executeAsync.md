---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
`executeAsync`コマンドは非推奨であり、将来のバージョンで削除される予定です。
代わりに`execute`コマンドを使用してください。`execute`コマンドは`async`/`await`を通じて
より良いエラーハンドリングのサポートを提供します。
:::

現在選択されているフレームのコンテキストで実行するために、JavaScriptのスニペットをページに注入します。
スコープとして指定された要素を使用するため、要素のスコープ上にあるということは、WebdriverIOが
スクリプトを実行する前に要素が存在するのを自動的に待機することを意味します。
実行されるスクリプトは非同期であると想定され、提供されたコールバックを呼び出すことによって
完了を通知する必要があります。このコールバックは常に関数の最後の引数として提供されます。
このコールバックに渡された値がクライアントに返されます。

非同期スクリプトコマンドはページの読み込みをまたぐことはできません。スクリプトの結果を待っている間に
アンロードイベントが発生した場合、エラーがクライアントに返されるべきです。

script引数は関数本体の形式で実行するスクリプトを定義します。この関数は提供されたargs配列で
呼び出され、値は指定された順序でargumentsオブジェクトを介してアクセスできます。最後の引数は
常にコールバック関数であり、スクリプトが完了したことを通知するために呼び出す必要があります。

引数はJSON基本型、配列、またはJSONオブジェクトのいずれかです。WebElement参照を定義するJSONオブジェクトは
対応するDOM要素に変換されます。同様に、スクリプト結果内のWebElementはWebElement JSONオブジェクトとして
クライアントに返されます。

:::caution

代わりに`execute`を使用してください
:::

##### 使用法

```js
$(selector).executeAsync(script, arguments)
```

##### パラメーター

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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>スクリプトの引数</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              スクリプトの結果。