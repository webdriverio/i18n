---
id: saveScreenshot
title: 保存截图
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

将当前浏览上下文的截图保存为操作系统上的PNG文件。请注意，
一些浏览器驱动程序会截取整个文档的截图（例如Firefox的Geckodriver），
而其他驱动程序只截取当前视口的截图（例如Chrome的Chromedriver）。

##### 用法

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
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
      <td>生成图片的路径（需要`.png`后缀）相对于执行目录</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>截图选项</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>是否截取整个页面或仅当前视口</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>截图的格式（`png`或`jpeg`）</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>JPEG格式的截图质量，范围为0-100百分比</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object`</td>
      <td>截图的矩形裁剪区域</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="saveScreenshot.js"
it('should save a screenshot of the browser viewport', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png');
});

it('should save a screenshot of the full page', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { fullPage: true });
});

it('should save a screenshot of a specific rectangle', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { clip: { x: 0, y: 0, width: 100, height: 100 } });
});

it('should save a screenshot of the full page in JPEG format', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg' });
});

it('should save a screenshot of the full page in JPEG format with quality 50', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg', quality: 50 });
});

 running from a hook, make sure to explicitly define the hook as async:

```

```js title="wdio.conf.js"
afterTest: async function(test) {
    await browser.saveScreenshot('./some/path/screenshot.png');
}
```

##### 返回

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             截图缓冲区