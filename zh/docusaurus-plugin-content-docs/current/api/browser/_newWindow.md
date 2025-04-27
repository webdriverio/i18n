---
id: newWindow
title: 新窗口
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

在浏览器中打开新窗口或新标签页（如果未指定，默认为新窗口）。
此命令相当于 `window.open()` 函数。此命令在移动环境中不起作用。

__注意:__ 调用此命令时，你会自动切换到新的窗口或标签页。

##### 用法

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>要打开的网站 URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindow 命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>新窗口类型：'tab' 或 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>新窗口的名称</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>打开窗口的特性（例如大小、位置、滚动条等）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### 返回值

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           包含窗口句柄和新窗口类型的对象 `{handle: string, type: string}` handle - 新标签页或窗口的窗口句柄 ID，type - 新窗口的类型，'tab' 或 'window'    
##### 抛出

- **Error**:  如果 `url` 无效，命令在移动设备上使用，或 `type` 不是 'tab' 或 'window'。