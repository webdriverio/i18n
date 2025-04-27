---
id: scroll
title: 滚动
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

在浏览器视口内滚动。请注意，`x`和`y`坐标是相对于当前滚动位置的，因此`browser.scroll(0, 0)`是一个无效操作。

##### 用法

```js
browser.scroll(x, y)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详细信息</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>水平滚动位置（默认：`0`）</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>垂直滚动位置（默认：`0`）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```