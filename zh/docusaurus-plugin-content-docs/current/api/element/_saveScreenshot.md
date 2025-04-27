---
id: saveScreenshot
title: 保存截图
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

将元素的截图保存为PNG文件到您的操作系统中。

##### 用法

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>生成图像的路径（需要`.png`后缀）相对于执行目录</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### 返回

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             截图缓冲区