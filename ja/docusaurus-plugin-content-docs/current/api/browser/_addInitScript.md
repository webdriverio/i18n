---
id: addInitScript
title: 初期化スクリプトの追加
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

以下のシナリオのいずれかで評価されるスクリプトを追加します：

- ページがナビゲートされるたびに。
- 子フレームが接続されるか、ナビゲートされるたびに。この場合、スクリプトは新しく接続されたフレームのコンテキストで評価されます。

スクリプトは、ドキュメントが作成された後、かつそのスクリプトが実行される前に評価されます。
ページから初期化スクリプトを再び削除するには、この関数によって返される関数を呼び出します。

これはJavaScript環境を修正するのに役立ちます。例えば、Math.randomを設定するなど。

##### 使用方法

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
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

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
  console.log(data) // prints: BODY, DIV, P, ...
})
```