---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

指定された要素のshadowRoot内の要素にアクセスします。多くのネストされたシャドウルートを扱っている場合、`shadow$$`の代替アプローチとして[深層セレクタ](https://webdriver.io/docs/selectors#deep-selectors)を使用することができます。

:::info

WebdriverIOは`$`または`$$`コマンドを使用する際に自動的にシャドウルートを貫通します。
このコマンドは、WebDriver Bidiをまだサポートしていない環境、例えばAppiumによるモバイルWebテストなどで自動化する場合にのみ必要です。

:::

##### 使用法

```js
$(selector).shadow$$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>特定の要素を取得するためのセレクタまたはJS関数</td>
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