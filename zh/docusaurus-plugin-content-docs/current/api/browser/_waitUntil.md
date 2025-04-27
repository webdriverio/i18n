---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

这个等待命令是您想要等待某事发生时的通用武器。它需要一个条件，并等待直到该条件返回一个真值。

一个常见的例子是等待某个元素包含特定文本（见示例）。

##### 用法

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>要等待的条件，直到返回真值</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`WaitUntilOptions`</td>
      <td>命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>时间，单位为毫秒（默认基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>waitUntil 超时时抛出的错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>条件检查之间的间隔（默认基于 [`waitforInterval`](/docs/configuration#waitforinterval) 配置值设置）</td>
    </tr>
  </tbody>
</table>

##### 示例

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果条件满足则返回 true