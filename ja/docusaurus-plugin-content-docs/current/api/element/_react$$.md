---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

`react$$`コマンドは、実際の名前でReactコンポーネントを複数クエリし、propsとstateでフィルタリングするための便利なコマンドです。

:::info

このコマンドはReact v16.xを使用しているアプリケーションでのみ動作します。Reactセレクターについての詳細は[セレクター](/docs/selectors#react-selectors)ガイドをご覧ください。

:::

##### 使用法

```js
$(selector).react$$(selector, { props, state })
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
      <td>of React component</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React selector options</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>React props the element should contain</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state the element should be in</td>
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