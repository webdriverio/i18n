---
id: waitForEnabled
title: 等待启用
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Wait for an element (selected by css selector) for the provided amount of
milliseconds to be (dis/en)abled. If multiple elements get queried by given
selector, it returns true if at least one element is (dis/en)abled.

:::info

As opposed to other element commands WebdriverIO will not wait for the element
to exist to execute this command.

:::

##### Usage

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled 选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>以毫秒为单位的时间（默认值基于 [`waitforTimeout`](/docs/configuration#waitfortimeout) 配置值设置）</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>如果为 true，则等待相反的结果（默认值：false）</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>如果存在，则覆盖默认错误消息</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>检查之间的间隔（默认值：`waitforInterval`）</td>
    </tr>
  </tbody>
</table>

##### Examples

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     如果元素已（禁用/启用）    