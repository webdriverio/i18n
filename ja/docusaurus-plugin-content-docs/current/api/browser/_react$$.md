---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

`react$$`コマンドは、実際の名前でReactコンポーネントを複数クエリし、propsやstateでフィルタリングするための便利なコマンドです。

:::info

このコマンドはReact v16.xを使用したアプリケーションでのみ動作します。Reactセレクタの詳細については[セレクタ](/docs/selectors#react-selectors)ガイドをご覧ください。

:::

##### 使用法

```js
browser.react$$(selector, { props, state })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Reactセレクタオプション</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object`</td>
      <td>要素が含むべきReact props</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>要素があるべきReact state</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### 戻り値

- **&lt;WebdriverIO.ElementArray&gt;**