---
id: savePDF
title: 保存PDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

将当前浏览上下文的页面打印为操作系统上的PDF文件。

##### 用法

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>生成的PDF路径（需要`.pdf`后缀）相对于执行目录</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`PDFPrintOptions`</td>
      <td>打印PDF选项</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>PDF页面方向</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面缩放比例</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>包含PDF页面背景</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面宽度</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面高度</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面顶部内边距</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面底部内边距</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面左侧内边距</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>PDF页面右侧内边距</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>缩小页面以适应页面</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>要包含在PDF中的页面范围</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### 返回值

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    截图缓冲区