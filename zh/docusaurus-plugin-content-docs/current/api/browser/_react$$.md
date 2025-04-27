---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

`react$$` 命令是一个有用的命令，用于通过实际名称查询多个 React 组件，并通过 props 和 state 进行筛选。

:::info

该命令仅适用于使用 React v16.x 的应用程序。在 [Selectors](/docs/selectors#react-selectors) 指南中了解更多关于 React 选择器的信息。

:::

##### 用法

```js
browser.react$$(selector, { props, state })
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>React 组件名称</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React 选择器选项</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object`</td>
      <td>元素应包含的 React props</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>元素应处于的 React state</td>
    </tr>
  </tbody>
</table>

##### 示例

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

##### 返回值

- **&lt;WebdriverIO.ElementArray&gt;**