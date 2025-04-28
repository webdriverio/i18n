---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

ブラウザメソッド `overwriteCommand` は、ブラウザと要素のネイティブコマンド（`pause` や `click` など）を上書きするのに役立ちます。

:::info

これについての詳細情報は[カスタムコマンド](/docs/customcommands#overwriting-native-commands)セクションで確認できます。

:::

##### 使用法

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>元のコマンドの名前</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>元の関数を渡す</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Browserオブジェクトの代わりにElementオブジェクトを拡張する</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```