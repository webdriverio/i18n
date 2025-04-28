---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

現在選択されているフレームのコンテキストでJavaScriptのスニペットを注入して実行します。スコープとして指定された要素を使用します。要素のスコープ上にあるため、WebdriverIOはスクリプトを実行する前に自動的に要素が存在するのを待ちます。
実行されるスクリプトは同期的であると見なされ、スクリプトの評価結果がクライアントに返されます。

script引数は、関数本体の形式で実行するスクリプトを定義します。その関数によって返される値がクライアントに返されます。関数は指定されたargs配列で呼び出され、その値は指定された順序でargumentsオブジェクトを介してアクセスできます。

引数はJSON-プリミティブ、配列、またはJSONオブジェクトを指定できます。WebElement参照を定義するJSONオブジェクトは、対応するDOM要素に変換されます。同様に、スクリプト結果内のWebElementsはWebElement JSONオブジェクトとしてクライアントに返されます。

##### 使用法

```js
$(selector).execute(script, arguments)
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
      <td>スクリプト引数</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              スクリプトの結果。