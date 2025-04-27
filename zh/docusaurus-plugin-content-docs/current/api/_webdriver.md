---
id: webdriver
title: WebDriver 协议
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
New Session 命令在终端节点创建一个新的 WebDriver 会话。如果创建失败，将返回会话未创建错误。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-new-sessions)中找到。

##### 用法

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>一个 JSON 对象，表示在能力处理算法中最终合并和匹配的一组能力</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** 包含 sessionId 和已创建 WebDriver 会话能力的对象。


---

## deleteSession
Delete Session 命令关闭与当前会话相关的任何顶级浏览上下文，终止连接，并最终关闭当前会话。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-delete-session)中找到。

##### 用法

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object</td>
      <td>包含 deleteSession 命令选项的对象，例如 `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Status 命令返回有关远程端是否处于可以创建新会话的状态的信息，并且还可以包含特定于实现的任意元信息。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-status)中找到。

##### 用法

```js
browser.status()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** 包含驱动程序状态的对象。


---

## getTimeouts
Get Timeouts 命令获取与当前会话关联的超时持续时间。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-timeouts)中找到。

##### 用法

```js
browser.getTimeouts()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** 包含 `script`、`pageLoad` 和 `implicit` 超时持续时间的对象。


---

## setTimeouts
Set Timeouts 命令设置与当前会话关联的超时持续时间。可以控制的超时列在下面的会话超时表中。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-set-timeouts)中找到。

##### 用法

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>会话隐式等待超时的整数（毫秒）</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>会话页面加载超时的整数（毫秒）</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>会话脚本超时的整数（毫秒）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Get Current URL 命令返回当前顶级浏览上下文的 URL。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-current-url)中找到。

##### 用法

```js
browser.getUrl()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### 返回

- **&lt;string&gt;**
            **<code><var>url</var></code>:** 当前顶级浏览上下文活动文档的文档 URL


---

## navigateTo
navigateTo (go) 命令用于使用户代理导航当前顶级浏览上下文到新位置。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-navigate-to)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[url](/docs/api/browser/url)。建议使用此命令替代。

:::


##### 用法

```js
browser.navigateTo(url)
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
      <td>string</td>
      <td>表示绝对 URL 的字符串（以 http(s) 开头），可能包含片段（#...），也可能是本地方案（about: 等）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Back 命令使浏览器在当前顶级浏览上下文的联合会话历史记录中后退一步。这相当于在浏览器 chrome 中按下后退按钮或调用 `window.history.back`。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-back)中找到。

##### 用法

```js
browser.back()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Forward 命令使浏览器在当前顶级浏览上下文的联合会话历史记录中前进一步。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-forward)中找到。

##### 用法

```js
browser.forward()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Refresh 命令使浏览器重新加载当前顶级浏览上下文中的页面。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-refresh)中找到。

##### 用法

```js
browser.refresh()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Get Title 命令返回当前顶级浏览上下文的文档标题，相当于调用 `document.title`。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-title)中找到。

##### 用法

```js
browser.getTitle()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### 返回

- **&lt;string&gt;**
            **<code><var>title</var></code>:** 返回一个字符串，与当前顶级浏览上下文的 `document.title` 相同。


---

## getWindowHandle
Get Window Handle 命令返回当前顶级浏览上下文的窗口句柄。它可以作为 Switch To Window 的参数。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-window-handle)中找到。

##### 用法

```js
browser.getWindowHandle()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### 返回

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** 返回一个字符串，它是当前顶级浏览上下文的窗口句柄。


---

## closeWindow
Close Window 命令关闭当前顶级浏览上下文。完成后，如果没有更多开放的顶级浏览上下文，WebDriver 会话本身将关闭。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-close-window)中找到。

##### 用法

```js
browser.closeWindow()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Switch To Window 命令用于为当前会话选择当前顶级浏览上下文，即将用于处理命令的上下文。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-switch-to-window)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[switchWindow](/docs/api/browser/switchWindow)。建议使用此命令替代。

:::


##### 用法

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>表示窗口句柄的字符串，应该是在调用 getWindowHandles 时返回的字符串之一</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
创建新的顶级浏览上下文。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#new-window)中找到。

##### 用法

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>如果新创建的窗口与当前浏览上下文共享一个操作系统级别的窗口，则设置为 'tab'，否则设置为 'window'。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** 新窗口对象，包含值为句柄的 'handle' 和值为创建窗口类型的 'type'


---

## getWindowHandles
Get Window Handles 命令返回每个打开的顶级浏览上下文的窗口句柄列表。返回窗口句柄的顺序是任意的。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-window-handles)中找到。

##### 用法

```js
browser.getWindowHandles()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### 返回

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** 窗口句柄列表的数组。


---

## printPage
Print Page 命令将文档渲染为分页 PDF 文档。__注意:__ Chrome 目前仅在[无头模式](https://webdriver.io/docs/capabilities/#run-browser-headless)下支持此功能，参见 [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118))。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#print-page)中找到。

##### 用法

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>页面方向。默认值：`portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面缩放。默认值：`1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>页面背景。默认值：`false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面宽度，单位厘米。默认值：`21.59`（来自页面）</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面高度，单位厘米。默认值：`27.94`（来自页面）</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面上边距，单位厘米。默认值：`1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面下边距，单位厘米。默认值：`1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面左边距，单位厘米。默认值：`1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>页面右边距，单位厘米。默认值：`1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>缩小 PDF 以适应页面。默认值：`true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object[]</td>
      <td>页面范围。默认值：`[]`</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### 返回

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** 分页文档的 base64 编码 PDF 表示。


---

## switchToFrame
Switch To Frame 命令用于选择当前顶级浏览上下文或当前浏览上下文的子浏览上下文，作为后续命令的当前浏览上下文。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-switch-to-frame)中找到。
:::caution

此协议命令已弃用<br />此命令已弃用，我们鼓励大家使用 `switchFrame` 来切换到框架。更多关于此命令的信息请访问 https://webdriver.io/docs/api/browser/switchFrame
:::

##### 用法

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>三种可能类型之一：null：表示顶级浏览上下文（即非 iframe），数字，表示对应于框架的窗口对象的索引，使用 `findElement` 接收的 Element 对象。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Switch to Parent Frame 命令将将来命令的当前浏览上下文设置为当前浏览上下文的父级。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame)中找到。

##### 用法

```js
browser.switchToParentFrame()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Get Window Rect 命令返回与当前顶级浏览上下文对应的操作系统窗口在屏幕上的大小和位置。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-window-rect)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getWindowSize](/docs/api/browser/getWindowSize)。建议使用此命令替代。

:::


##### 用法

```js
browser.getWindowRect()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** "窗口矩形"对象的 JSON 表示。它有 4 个属性：`x`, `y`, `width` 和 `height`。


---

## setWindowRect
Set Window Rect 命令更改与当前顶级浏览上下文对应的操作系统窗口的大小和位置。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-set-window-rect)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[setWindowSize](/docs/api/browser/setWindowSize)。建议使用此命令替代。

:::


##### 用法

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>窗口对象的 screenX 属性</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>窗口对象的 screenY 属性</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>顶级浏览上下文的外部尺寸宽度，包括浏览器 chrome 等...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>顶级浏览上下文的外部尺寸高度，包括浏览器 chrome 等...</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** 基于新窗口状态的"窗口矩形"对象的 JSON 表示。


---

## maximizeWindow
Maximize Window 命令调用窗口管理器特定的"最大化"操作（如果有的话）在包含当前顶级浏览上下文的窗口上。这通常会在不全屏的情况下将窗口增加到最大可用大小。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-maximize-window)中找到。

##### 用法

```js
browser.maximizeWindow()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** 基于新窗口状态的"窗口矩形"对象的 JSON 表示。


---

## minimizeWindow
Minimize Window 命令调用窗口管理器特定的"最小化"操作（如果有的话）在包含当前顶级浏览上下文的窗口上。这通常会将窗口隐藏在系统托盘中。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-minimize-window)中找到。

##### 用法

```js
browser.minimizeWindow()
```


##### 返回

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** （新的）当前顶级浏览上下文的"窗口矩形"对象的 JSON 表示。


---

## fullscreenWindow
Fullscreen Window 命令调用窗口管理器特定的"全屏"操作（如果有的话）在包含当前顶级浏览上下文的窗口上。这通常会将窗口增加到物理显示器的大小，并可以隐藏工具栏等浏览器 chrome 元素。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-fullscreen-window)中找到。

##### 用法

```js
browser.fullscreenWindow()
```


##### 返回

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** （新的）当前顶级浏览上下文的"窗口矩形"对象的 JSON 表示。


---

## findElement
Find Element 命令用于在当前浏览上下文中查找可用于未来命令的元素。此命令返回元素的 JSON 表示，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-find-element)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[$](/docs/api/browser/$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### 返回

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 元素对象的 JSON 表示，例如 `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementFromShadowRoot
Find Element From Shadow Root 命令用于在元素的阴影根中查找可用于未来命令的元素。此命令返回元素的 JSON 表示，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#find-element-from-shadow-root)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[shadow$](/docs/api/element/shadow$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>阴影根元素的元素 id</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### 返回

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 元素阴影对象的 JSON 表示，例如 `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElements
Find Elements 命令用于在当前浏览上下文中查找可用于未来命令的元素。此命令返回元素的 JSON 表示数组，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素（参见 findElement）。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-find-elements)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[$$](/docs/api/browser/$$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### 返回

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 元素对象表示的（可能为空的）JSON 列表，例如 `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`。


---

## findElementsFromShadowRoot
Find Elements 命令用于在元素的阴影根中查找可用于未来命令的元素。此命令返回元素的 JSON 表示数组，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素（参见 findElement）。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#find-elements-from-shadow-root)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[shadow$$](/docs/api/element/shadow$$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>阴影根元素的元素 id</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### 返回

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 元素对象表示的（可能为空的）JSON 列表，例如 `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementFromElement
Find Element From Element 命令用于从当前浏览上下文中的网页元素查找可用于未来命令的元素。此命令返回元素的 JSON 表示，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素（参见 findElement）。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-find-element-from-element)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[$](/docs/api/element/$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### 返回

- **&lt;object&gt;**
            **<code><var>element</var></code>:** 元素对象的 JSON 表示，例如 `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## findElementsFromElement
Find Elements From Element 命令用于从当前浏览上下文中的网页元素查找可用于未来命令的元素。此命令返回元素的 JSON 表示数组，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素（参见 findElement）。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-find-elements-from-element)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[$$](/docs/api/element/$$)。建议使用此命令替代。

:::


##### 用法

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>有效的元素定位策略</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>用于查找元素的实际选择器</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### 返回

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** 元素对象表示的（可能为空的）JSON 列表，例如 `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`。


---

## getElementShadowRoot
获取元素的阴影根对象。结果对象可用于使用例如 findElementFromShadowRoots 或 findElementsFromShadowRoots 来获取此阴影根内的元素。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-active-element)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[shadow$](/docs/api/element/shadow$)。建议使用此命令替代。

:::


##### 用法

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### 返回

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** 元素阴影根的 JSON 表示，例如 `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## getActiveElement
Get Active Element 返回当前浏览上下文的文档元素的活动元素。此命令返回元素的 JSON 表示，可以传递给 $ 命令以将引用转换为扩展的 WebdriverIO 元素（参见 findElement）。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-active-element)中找到。

##### 用法

```js
browser.getActiveElement()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### 返回

- **&lt;string&gt;**
            **<code><var>element</var></code>:** 元素对象的 JSON 表示，例如 `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`。


---

## isElementSelected
Is Element Selected 确定引用的元素是否被选中。此操作仅对复选框和单选按钮状态的输入元素或选项元素有意义。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-is-element-selected)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[isSelected](/docs/api/element/isSelected)。建议使用此命令替代。

:::


##### 用法

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** 基于选中状态的 `true` 或 `false`。


---

## isElementDisplayed
Is Element Displayed 确定元素的可见性，以人眼感知可见为指导。在这种上下文中，元素的显示性与 `visibility` 或 `display` 样式属性无关。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#element-displayedness)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[isDisplayed](/docs/api/element/isDisplayed)。建议使用此命令替代。

:::


##### 用法

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** 基于可见状态的 `true` 或 `false`。


---

## getElementAttribute
Get Element Attribute 命令将返回网页元素的属性。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-attribute)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getAttribute](/docs/api/element/getAttribute)。建议使用此命令替代。

:::


##### 用法

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>要检索的属性值的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### 返回

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** 元素的命名属性。


---

## getElementProperty
Get Element Property 命令将返回获取元素属性的结果。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-property)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getProperty](/docs/api/element/getProperty)。建议使用此命令替代。

:::


##### 用法

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>要检索的属性的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### 返回

- **&lt;string&gt;**
            **<code><var>property</var></code>:** 元素的命名属性，通过在元素对象上调用 GetOwnProperty 访问。


---

## getElementCSSValue
Get Element CSS Value 命令检索给定网页元素的给定 CSS 属性的计算值。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-css-value)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getCSSProperty](/docs/api/element/getCSSProperty)。建议使用此命令替代。

:::


##### 用法

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>要检索的 CSS 属性的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### 返回

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** 从元素的样式声明中对应于属性名称的参数的计算值（除非文档类型是 xml，在这种情况下，返回值仅为空字符串）。


---

## getElementText
Get Element Text 命令旨在返回元素的文本"如呈现"。元素的呈现文本也用于通过链接文本和部分链接文本定位元素。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-text)中找到。

##### 用法

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### 返回

- **&lt;string&gt;**
            **<code><var>text</var></code>:** 元素的可见文本（包括子元素），遵循 Selenium Atoms 中定义的算法 [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981)。


---

## getElementTagName
Get Element Tag Name 命令返回给定网页元素的限定元素名称。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-tag-name)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getTagName](/docs/api/element/getTagName)。建议使用此命令替代。

:::


##### 用法

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### 返回

- **&lt;string&gt;**
            **<code><var>text</var></code>:** 元素的 tagName 属性。


---

## getElementRect
Get Element Rect 命令返回给定网页元素的尺寸和坐标。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-element-rect)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[getSize](/docs/api/element/getSize)、[getLocation](/docs/api/element/getLocation)。建议使用这些命令替代。

:::


##### 用法

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** 表示元素位置和边界矩形的 JSON 对象。


---

## isElementEnabled
Is Element Enabled 确定引用的元素是否启用。此操作仅对表单控件有意义。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-is-element-enabled)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[isEnabled](/docs/api/element/isEnabled)。建议使用此命令替代。

:::


##### 用法

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** 如果元素在 xml 文档中，或者是禁用的表单控件：`false`，否则为 `true`。


---

## elementClick
Element Click 命令如果元素尚未可指针交互，则将元素滚动到视图中，并点击其视图中心点。如果元素的中心点被另一个元素遮挡，则返回元素点击被拦截错误。如果元素在视口外，则返回元素不可交互错误。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-element-click)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[click](/docs/api/element/click)。建议使用此命令替代。

:::


##### 用法

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Element Clear 命令将可编辑或可重置的元素滚动到视图中，然后尝试清除其选定的文件或文本内容。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-element-clear)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[clearValue](/docs/api/element/clearValue)。建议使用此命令替代。

:::


##### 用法

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Element Send Keys 命令将表单控件元素滚动到视图中，然后将提供的键发送到元素。如果元素不可键盘交互，则返回元素不可交互错误。<br /><br />输入过程中可以通过发送空键（U+E000，NULL）来清除用于输入的键输入状态。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-element-send-keys)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[addValue](/docs/api/element/addValue)、[setValue](/docs/api/element/setValue)。建议使用这些命令替代。

:::


##### 用法

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>作为击键发送到元素的字符串</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Get Page Source 命令返回当前浏览上下文活动文档的 DOM 的字符串序列化。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-page-source)中找到。

##### 用法

```js
browser.getPageSource()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### 返回

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** 当前浏览上下文活动文档的 DOM


---

## executeScript
Execute Script 命令在当前浏览上下文的上下文中执行 JavaScript 函数并返回函数的返回值。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-execute-script)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[execute](/docs/api/browser/execute)。建议使用此命令替代。

:::


##### 用法

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>一个字符串，您想要执行的 Javascript 函数体</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>一个 JSON 值数组，这些值将被反序列化并作为参数传递给您的函数</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### 返回

- **&lt;*&gt;**
            **<code><var>result</var></code>:** 您脚本的返回值，您脚本返回的 Promise 的实现，或者您脚本返回的 Promise 拒绝的原因的错误。


---

## executeAsyncScript
Execute Async Script 命令使 JavaScript 作为匿名函数执行。与 Execute Script 命令不同，函数的结果被忽略。相反，作为最后一个参数提供了一个附加参数。这是一个函数，当被调用时，将其第一个参数作为响应返回。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-execute-async-script)中找到。

:::info

此协议命令嵌入在以下便捷方法中：[executeAsync](/docs/api/browser/executeAsync)。建议使用此命令替代。

:::


##### 用法

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>一个字符串，您想要执行的 Javascript 函数体</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>一个 JSON 值数组，这些值将被反序列化并作为参数传递给您的函数</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### 返回

- **&lt;*&gt;**
            **<code><var>result</var></code>:** 您脚本的返回值，您脚本返回的 Promise 的实现，或者您脚本返回的 Promise 拒绝的原因的错误。


---

## getAllCookies
Get All Cookies 命令返回与当前浏览上下文的活动文档地址相关的所有 cookie。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-all-cookies)中找到。

##### 用法

```js
browser.getAllCookies()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### 返回

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** 序列化 cookie 的列表。每个序列化 cookie 都有一些可能返回也可能不返回的可选字段，除了 `name` 和 `value`。


---

## addCookie
Add Cookie 命令将单个 cookie 添加到与活动文档地址关联的 cookie 存储中。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-adding-a-cookie)中找到。

##### 用法

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>表示 cookie 的 JSON 对象。它必须至少有 name 和 value 字段，并且可能有更多字段，包括过期时间等</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Delete All Cookies 命令允许删除与活动文档地址关联的所有 cookie。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-delete-all-cookies)中找到。

##### 用法

```js
browser.deleteAllCookies()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Get Named Cookie 命令从当前浏览上下文的活动文档的 cookie 存储中的关联 cookie 返回请求名称的 cookie。如果未找到 cookie，则返回无此类 cookie 错误。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-named-cookie)中找到。

##### 用法

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>要检索的 cookie 的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### 返回

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** 一个序列化的 cookie，具有 name 和 value 字段。还有一些可选字段，如 `path`、`domain` 和 `expiry-time`，也可能存在。


---

## deleteCookie
Delete Cookie 命令允许您通过参数名称删除单个 cookie，或者如果名称未定义，则删除与活动文档地址关联的所有 cookie。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-delete-cookie)中找到。

##### 用法

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>要删除的 cookie 的名称</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Perform Actions 命令用于执行复杂的用户操作。有关更多详情，请参见[规范](https://github.com/jlipps/simple-wd-spec#perform-actions)。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-perform-actions)中找到。

##### 用法

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>对象列表，每个对象代表一个输入源及其关联的操作</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Release Actions 命令用于释放当前按下的所有键和指针按钮。这会导致事件被触发，就好像状态是通过明确的一系列操作释放的一样。它还会清除虚拟设备的所有内部状态。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-release-actions)中找到。

##### 用法

```js
browser.releaseActions()
```



---

## dismissAlert
Dismiss Alert 命令在存在简单对话框时将其关闭，否则报错。请求关闭用户提示（可能没有取消按钮）的请求与接受它具有相同的效果。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-dismiss-alert)中找到。

##### 用法

```js
browser.dismissAlert()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Accept Alert 命令在存在简单对话框时接受它，否则报错。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-accept-alert)中找到。

##### 用法

```js
browser.acceptAlert()
```



---

## getAlertText
Get Alert Text 命令返回当前用户提示的消息。如果没有当前用户提示，它将返回错误。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-get-alert-text)中找到。

##### 用法

```js
browser.getAlertText()
```

##### 示例

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### 返回

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** 用户提示的消息。


---

## sendAlertText
Send Alert Text 命令将 window.prompt 用户提示的文本字段设置为给定值。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-send-alert-text)中找到。

##### 用法

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>设置提示的字符串</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Take Screenshot 命令拍摄顶级浏览上下文视口的屏幕截图。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-take-screenshot)中找到。

##### 用法

```js
browser.takeScreenshot()
```


##### 返回

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** 包含初始视口屏幕截图的 base64 编码 PNG 图像数据。


---

## takeElementScreenshot
Take Element Screenshot 命令拍摄元素边界矩形所包含的可见区域的屏幕截图。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#dfn-take-element-screenshot)中找到。

##### 用法

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>将元素滚动到视图中。默认值：true</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** 包含元素边界矩形可见区域的屏幕截图的 base64 编码 PNG 图像数据，在将其滚动到视图中后。


---

## getElementComputedRole
获取元素的计算 WAI-ARIA 角色。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#get-computed-role)中找到。

##### 用法

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>role</var></code>:** 计算元素的 WAI-ARIA 角色的结果。


---

## getElementComputedLabel
获取元素的可访问名称。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/webdriver/#get-computed-label)中找到。

##### 用法

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用 Find Element(s) 时返回的元素 id</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>label</var></code>:** 元素的可访问名称和描述计算的结果。


---

## setPermissions
模拟用户对 PermissionDescriptor 的权限状态的修改。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/permissions/#set-permission-command)中找到。

##### 用法

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>每个强大功能都有一个或多个方面，网站可以请求访问这些方面的权限。为了描述这些方面，每个功能都定义了 PermissionDescriptor 的子类型作为其权限描述符类型。__注意:__ 此功能尚未在所有浏览器中实现。</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>确定权限是被授予、拒绝还是提示。</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>是否将权限应用于所有执行上下文。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 设置 midi 权限
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // 也可以是 "denied" 或 "prompt"
);
```


```js
// 设置剪贴板权限
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// 现在你可以通过以下方式读取剪贴板
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
为测试生成报告。[Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi) 的扩展。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/reporting/#automation)中找到。

##### 用法

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>在报告中显示的消息。</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>指定将报告发送到的端点组。</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
创建一个模拟传感器来模拟如环境光传感器之类的传感器。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/sensors/#create-mock-sensor-command)中找到。

##### 用法

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>要模拟的传感器 API 类型，例如 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>表示频率（Hz）的双精度数，用于设置关联模拟传感器支持的最大采样频率。</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>表示频率（Hz）的双精度数，用于设置关联模拟传感器支持的最小采样频率。</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
检索关于给定类型模拟传感器的信息。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/sensors/#get-mock-sensor-command)中找到。

##### 用法

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>要检索信息的模拟传感器类型。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** 模拟传感器读数的值。


---

## updateMockSensor
更新模拟传感器类型。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/sensors/#update-mock-sensor-reading-command)中找到。

##### 用法

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>要更新信息的模拟传感器类型。</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>要模拟的传感器 API 类型，例如 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>表示频率（Hz）的双精度数，用于设置关联模拟传感器支持的最大采样频率。</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>表示频率（Hz）的双精度数，用于设置关联模拟传感器支持的最小采样频率。</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Delete Session 命令关闭与当前会话相关的任何顶级浏览上下文，终止连接，并最终关闭当前会话。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/sensors/#delete-mock-sensor-command)中找到。

##### 用法

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>要删除的模拟传感器类型。</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
为测试目的模拟时区的更改。__注意:__ 此功能尚未在所有浏览器中实现。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://w3c.github.io/sensors/#create-mock-sensor-command)中找到。

##### 用法

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>时区名称，例如 Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
创建一个软件[虚拟验证器](https://www.w3.org/TR/webauthn-2/#virtual-authenticators)。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator)中找到。

##### 用法

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>有效值：'ctap1/u2f'、'ctap2'、'ctap2_1'。</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>有效值：'usb'、'nfc'、'ble' 或 'internal'。</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>有效值：true、false。</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>有效值：true、false。</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>有效值：true、false。</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>有效值：包含扩展标识符的数组。</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string[]</td>
      <td>有效值：最多 3 个用户验证方法条目。</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** 返回验证器的字符串 ID。


---

## removeVirtualAuthenticator
移除先前创建的虚拟验证器。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator)中找到。

##### 用法

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 id</td>
    </tr>
  </tbody>
</table>



---

## addCredential
将公钥凭证源注入现有的虚拟验证器。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential)中找到。

##### 用法

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 ID</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>使用 Base64url 编码的凭证 ID。</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>如果设置为 true，则创建客户端可发现凭证。如果设置为 false，则创建服务器端凭证。</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>凭证范围的依赖方 ID。</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>包含单个私钥的非对称密钥包，符合 [RFC5958]，使用 Base64url 编码。</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>与凭证关联的 userHandle，使用 Base64url 编码。此属性可能未定义。</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>与公钥凭证源关联的签名计数器的初始值。</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>与公钥凭证源关联的大型、每个凭证的 blob，使用 Base64url 编码。此属性可能未定义。</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
为存储在虚拟验证器中的每个公钥凭证源返回一个凭证参数对象，无论它们是使用 Add Credential 还是 `navigator.credentials.create()` 存储的。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials)中找到。

##### 用法

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 id</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** 返回凭证数组。


---

## removeAllCredentials
移除存储在虚拟验证器上的所有公钥凭证源。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials)中找到。

##### 用法

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 id</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
移除存储在虚拟验证器上的公钥凭证源。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential)中找到。

##### 用法

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 id</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>凭证的 id</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Set User Verified 扩展命令在虚拟验证器上设置 isUserVerified 属性。<br /><br />WebDriver 协议命令。更多详情可在[官方协议文档](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified)中找到。

##### 用法

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>验证器的 id</td>
    </tr>
  </tbody>
</table>

