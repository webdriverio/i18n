---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

设置与当前会话相关的超时时间，超时持续时间控制脚本注入、文档导航和元素检索等行为。
更多信息和示例，请参阅[超时指南](https://webdriver.io/docs/timeouts#selenium-timeouts)。

:::info

不建议设置`implicit`超时，因为它们会影响WebdriverIO的行为，
并可能在某些命令中导致错误，例如带有反向标志的`waitForExist`。

:::

##### 用法

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>包含会话超时值的对象</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>查找元素时重试元素定位策略的毫秒时间。</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>等待文档完成加载的毫秒时间。</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>通过[`execute`](https://webdriver.io/docs/api/browser/execute)或[`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync)注入的脚本将运行，直到达到脚本超时时间（也以毫秒为单位）。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```