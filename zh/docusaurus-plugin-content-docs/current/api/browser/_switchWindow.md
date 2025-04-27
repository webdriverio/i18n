---
id: switchWindow
title: 切换窗口
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

将焦点切换到特定的标签页/窗口。

##### 用法

```js
browser.switchWindow(matcher)
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
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>匹配页面标题或URL、窗口名称或窗口句柄的字符串或正则表达式</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="switchWindow.js"
it('should switch to another window', async () => {
    // open url
    await browser.url('https://google.com')

    // get window handle
    const handle = await browser.getWindowHandle()

    // create new window
    await browser.newWindow('https://webdriver.io')

    // switch back via url match
    await browser.switchWindow('google.com')

    // switch back via title match
    await browser.switchWindow('Next-gen browser and mobile automation test framework for Node.js')

    // switch back via window handle
    await browser.switchWindow(handle)
});
```