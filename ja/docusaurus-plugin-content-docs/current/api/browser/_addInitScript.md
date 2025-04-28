---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

以下のシナリオのいずれかで評価されるスクリプトを追加します：

- ページがナビゲートされるたび。
- 子フレームが接続されるか、ナビゲートされるたび。この場合、スクリプトは新しく接続されたフレームのコンテキストで評価されます。

スクリプトはドキュメントが作成された後、そのスクリプトが実行される前に評価されます。
ページから初期化スクリプトを再び削除するには、この関数によって返された関数を呼び出してください。

これはJavaScript環境を修正するのに便利です。例えば、Math.randomに値を設定するなど。

##### 使用法

```js
browser.addInitScript(script, args)
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
      <td>`Function`</td>
      <td>初期化スクリプトとして注入される関数</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>スクリプトのパラメータ</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // 42を返します

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // ランダムな数字を返します

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // 出力: BODY, DIV, P, ...
})
```