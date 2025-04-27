---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

`react$` 命令是一个有用的命令，用于通过组件的实际名称查询 React 组件，并通过 props 和 state 进行筛选。

:::info

该命令仅适用于使用 React v16.x 的应用程序。有关 React 选择器的更多信息，请阅读[选择器](/docs/selectors#react-selectors)指南。

:::

##### 用法

```js
browser.react$(selector, { props, state })
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
    const appWrapper = await $('div#root')

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

    console.log(await $('.component-display').getText()); // 打印 "42"
});
```

##### 返回

- **&lt;WebdriverIO.Element&gt;**