---
id: setWindowSize
title: 设置窗口大小
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

根据提供的宽度和高度调整浏览器窗口的外部尺寸。根据您的操作系统，某些浏览器窗口可能不允许宽度小于`500px`。如果您想模拟例如iPhone的视口，您应该考虑使用`setViewport`命令。

##### 用法

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>浏览器将被调整到提供的宽度</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>浏览器将被调整到提供的高度</td>
    </tr>
  </tbody>
</table>

##### 返回值

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  对于非W3C浏览器返回Null，对于W3C浏览器返回对象 `{x, y, width, height}`