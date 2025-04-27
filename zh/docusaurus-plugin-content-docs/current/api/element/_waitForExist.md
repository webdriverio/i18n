---
id: waitForExist
title: 等待元素存在
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

等待元素在提供的毫秒数内在DOM中存在。如果选择器匹配DOM中至少一个存在的元素，则返回true，否则抛出错误。如果reverse标志为true，则当选择器不匹配任何元素时，命令将返回true。

:::info

与其他元素命令不同，WebdriverIO在执行此命令时不会等待元素存在。

:::

##### 用法

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>时间（毫秒）（默认基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，则等待相反的结果（默认值：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`String`</td>
      <td>如果存在，则覆盖默认错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>检查之间的间隔（默认值：`waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### 返回

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果元素存在（或者如果设置了标志，则不存在），则为true    