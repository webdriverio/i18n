---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

这个等待命令是当你想要等待某些事情发生时的通用武器。它需要一个条件，并等待该条件以真值被满足。

:::info

与其他元素命令不同，WebdriverIO 不会等待元素存在才执行此命令。

:::

一个常见的例子是等待某个元素包含特定文本（见示例）。

##### 用法

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td>要等待的条件</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`WaitUntilOptions`</td>
      <td>命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>时间（毫秒）(默认值基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>waitUntil 超时时抛出的错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>条件检查间隔（默认值基于 [`waitforInterval`](/docs/configuration#waitforinterval) 配置值设置）</td>
    </tr>
  </tbody>
</table>

##### 示例

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 如果条件满足则为 true