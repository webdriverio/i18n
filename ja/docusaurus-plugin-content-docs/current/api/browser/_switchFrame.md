---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

アクティブなコンテキストをフレーム（ページ上のiframeなど）に切り替えます。ページ上のフレームを照会するには複数の方法があります:

  - 文字列を指定すると、一致するコンテキストID、URLまたはその文字列を含むURLを持つフレームに切り替えます
    ```ts
    // 特定のURLを持つか、URLに文字列を含むフレームに切り替える
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // 注意: このフレームはネストされたiframe内にありますが、目的のフレームの
    // フレームURLのみを提供する必要があります
    await browser.switchFrame('https://www.w3schools.com')
    // ページのタイトルを確認する
    console.log(await browser.execute(() => [document.title, document.URL]))
    // 出力: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - フレームのコンテキストIDがある場合は、それを直接使用できます
    ```ts
    // 特定のコンテキストIDを持つフレームに切り替える
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - `iframe`要素を参照するWebdriverIO要素が指定された場合、そのフレームに切り替えます
    ```ts
    // 現在のコンテキストから照会されたフレーム要素に切り替える
    await browser.switchFrame($('iframe'))
    ```

  - 関数が指定された場合、ページ上のすべてのiframeをループし、コンテキストオブジェクト内でその関数を呼び出します。
    関数はフレームを選択すべきかどうかを示すブール値を返す必要があります。この関数はブラウザ内で実行され、
    すべてのWeb APIにアクセスできます。例：
    ```ts
    // id "#frameContent"を持つ要素を含む最初のフレームに切り替える
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // URLに "webdriver" を含む最初のフレームに切り替える
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - `null`が指定された場合、最上位のフレームに切り替えます
    ```ts
    // まずフレームに切り替える
    await browser.switchFrame($('iframe'))
    // そのフレーム内でさらに自動化を行い、その後...

    // 最上位のフレームに切り替える
    await browser.switchFrame(null)
    ```

フレームに切り替えると、異なるページへのナビゲーションを含むすべての後続のコマンドは、そのフレームのコンテキスト内で実行されます。

##### 使用法

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### 戻り値

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  現在のアクティブなコンテキストID