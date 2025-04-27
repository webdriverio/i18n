---
id: waitForDisplayed
title: 等待元素显示
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

等待元素在指定的毫秒数内显示或不显示。

:::info

与其他元素命令不同，WebdriverIO 不会等待元素存在才执行此命令。

:::

##### 用法

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForDisplayed 选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>毫秒时间（默认基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为 true，则等待相反的情况（默认值：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>如果存在，它会覆盖默认的错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>检查之间的间隔（默认值：`waitforInterval`）</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>设置为 `true` 以等待元素在视口内显示（默认值：`false`）</td>
    </tr>
  </tbody>
</table>

##### 示例

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果元素显示（或者如果标志设置为相反情况则不显示）返回 true