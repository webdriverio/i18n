---
id: waitForClickable
title: 等待元素可点击
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

等待指定毫秒数，直到元素变为可点击或不可点击状态。

:::info

与其他元素命令不同，WebdriverIO 在执行此命令时不会等待元素存在。

:::

##### 用法

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>waitForEnabled 选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>超时时间（毫秒）（默认基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为 true，则等待相反的结果（默认值：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>如果存在，将覆盖默认错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>检查间隔时间（默认值：`waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 如果元素可点击（或者当设置标志时不可点击）则返回 `true`