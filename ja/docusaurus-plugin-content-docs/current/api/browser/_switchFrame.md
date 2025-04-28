---
id: switchFrame
title: switchFrame（フレーム切り替え）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

アクティブなコンテキストをフレーム（ページ上のiframeなど）に切り替えます。ページ上のフレームを照会するには複数の方法があります：

  - 文字列を与えると、一致するコンテキストID、URL、またはその文字列を含むURLを持つフレームに切り替えます
    ```ts
    // 特定のURLを持つか、URLに特定の文字列を含むフレームに切り替える
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // 注：このフレームはネストされたiframe内にありますが、
    // 目的のフレームのURLのみを提供する必要があります
    await browser.switchFrame('https://www.w3schools.com')
    // ページのタイトルを確認する
    console.log(await browser.execute(() => [document.title, document.URL]))
    // 出力: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - フレームのコンテキストIDを持っている場合は、それを直接使用できます
    ```ts
    // 特定のコンテキストIDを持つフレームに切り替える
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - `iframe`要素を参照するWebdriverIO要素を与えると、そのフレームに切り替えます
    ```ts
    // 現在のコンテキストから照会したフレーム要素に切り替える
    await browser.switchFrame($('iframe'))
    ```

  - 関数を与えると、ページ上のすべてのiframeをループし、コンテキストオブジェクト内でその関数を呼び出します。
    関数はフレームを選択すべきかどうかを示すブール値を返す必要があります。関数はブラウザ内で実行され、
    すべてのWeb APIにアクセスできます：
    ```ts
    // id "#frameContent"を持つ要素を含む最初のフレームに切り替える
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // URLに "webdriver"を含む最初のフレームに切り替える
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - `null`を与えると、トップレベルのフレームに切り替えます
    ```ts
    // まずフレームに切り替える
    await browser.switchFrame($('iframe'))
    // そのフレーム内でさらに自動化を行い、その後...

    // トップレベルのフレームに切り替える
    await browser.switchFrame(null)
    ```

フレームに切り替えると、異なるページへの移動を含め、以降のすべてのコマンドはそのフレームのコンテキスト内で実行されます。

##### 使用法

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### 戻り値

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  現在のアクティブなコンテキストID