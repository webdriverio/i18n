---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

`customs$$` は `browser.addLocatorStrategy` を使用して宣言されたカスタム戦略を使用することができます。
カスタムセレクタ戦略についての詳細は [セレクタドキュメント](../../selectors#custom-selector-strategies) を参照してください。

##### 使用方法

```js
$(selector).custom$$(strategyName, strategyArguments)
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
      <td><code><var>strategyName</var></code></td>
      <td>`string`</td>
      <td></td>
    </tr>
    <tr>
      <td><code><var>strategyArguments</var></code></td>
      <td>`*`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### 例

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginRowBlock = await browser.custom$('myStrat', '.pluginRowBlock')
    const pluginWrapper = await pluginRowBlock.custom$$('myStrat', '.pluginWrapper')

    console.log(pluginWrapper.length) // 4
})
```

##### 戻り値

- **&lt;WebdriverIO.ElementArray&gt;**