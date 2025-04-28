---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$.ts
---

`react$`コマンドは、Reactコンポーネントを実際の名前で検索し、propsやstateでフィルタリングするための便利なコマンドです。

:::info

このコマンドはReact v16.xを使用しているアプリケーションでのみ機能します。Reactセレクタの詳細については、[セレクタ](/docs/selectors#react-selectors)ガイドをご覧ください。

:::

##### 使用方法

```js
$(selector).react$(selector, { props, state })
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
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>Reactコンポーネントの</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Reactセレクタオプション</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Object`</td>
      <td>要素が含むべきReact props</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>要素があるべきReact state</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await browser.$('div#root')

    await browser.react$('t', {
        props: { name: '7' }
    }).click()
    await browser.react$('t', {
        props: { name: 'x' }
    }).click()
    await browser.react$('t', {
        props: { name: '6' }
    }).click()
    await browser.react$('t', {
        props: { name: '=' }
    }).click()

    console.log(await $('.component-display').getText()); // 「42」を出力します
});
```

##### 戻り値

- **&lt;WebdriverIO.Element&gt;**