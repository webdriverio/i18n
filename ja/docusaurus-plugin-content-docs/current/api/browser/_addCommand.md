---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

ブラウザメソッド `addCommand` は、独自のコマンドセットを作成するのに役立ちます。

:::info

カスタムコマンドの追加についての詳細情報は、[カスタムコマンド](/docs/customcommands#adding-custom-commands)ガイドで見つけることができます。

:::

##### 使用法

```js
browser.addCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>カスタムコマンドの名前</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>呼び出される関数</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>BrowserオブジェクトではなくElementオブジェクトを拡張する</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="execute.js"
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` は `browser` スコープを参照します
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//使用例
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```