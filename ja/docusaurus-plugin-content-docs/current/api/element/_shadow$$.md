---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

指定された要素のshadowRoot内の要素にアクセスします。多くのネストされたシャドウルートを扱っている場合、`shadow$$`の代替アプローチとして[ディープセレクタ](https://webdriver.io/docs/selectors#deep-selectors)を使用することができます。

:::info

WebdriverIOは`$`または`$$`コマンドを使用するとき、自動的にシャドウルートを貫通します。
このコマンドは、WebDriver Bidiをまだサポートしていない環境（例：Appiumを使用したモバイルウェブテスト）で自動化する場合にのみ必要です。

:::

##### 使用方法

```js
$(selector).shadow$$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### 戻り値

- **&lt;WebdriverIO.ElementArray&gt;**