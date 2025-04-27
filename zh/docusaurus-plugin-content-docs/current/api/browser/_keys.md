---
id: keys
title: 按键操作
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

向"活动"元素发送一系列按键操作。您可以通过点击一个输入元素使其变为活动状态。要使用"左箭头"或"退格键"等字符，请从WebdriverIO包中导入`Key`对象。

修饰键如`Control`、`Shift`、`Alt`和`Command`将保持按下状态，因此您需要再次触发它们以释放。但是，修改点击操作需要您通过[performActions](https://webdriver.io/docs/api/webdriver#performactions)方法使用WebDriver Actions API。

:::info

控制键会根据浏览器运行的操作系统而有所不同，例如MacOS上是`Command`，Windows上是`Control`。WebdriverIO提供了一个跨浏览器的修饰控制键`Ctrl`（见下面的例子）。

:::

##### 用法

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>要输入的按键序列。必须提供数组或字符串。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```