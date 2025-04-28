---
id: execute
title: execute（実行）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

JavaScriptのスニペットをページに注入し、現在選択されているフレームのコンテキストで実行します。
実行されるスクリプトは同期的であると見なされ、スクリプトの評価結果がクライアントに返されます。

scriptパラメータは、関数本体の形式で実行するスクリプトを定義します。その関数によって返される値が
クライアントに返されます。関数は指定されたargs配列で呼び出され、値は指定された順序でargumentsオブジェクト
を介してアクセスできます。

引数は任意のJSONプリミティブ、配列、またはJSONオブジェクトです。WebElement参照を定義するJSONオブジェクトは、
対応するDOM要素に変換されます。同様に、スクリプト結果内のWebElementはWebElement JSONオブジェクトとして
クライアントに返されます。

##### 使用方法

```js
browser.execute(script, arguments)
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
      <td>実行するスクリプト</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`*`</td>
      <td>スクリプトの引数</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### 戻り値

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              スクリプトの結果。