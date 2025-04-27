---
id: throttleCPU
title: 限制CPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

限制CPU以模拟较慢的处理器。

:::info

请注意，使用`throttleCPU`命令需要支持Chrome DevTools协议，例如在云端运行自动化测试时无法使用。Chrome DevTools协议默认不会安装，
请使用`npm install puppeteer-core`来安装它。
在[自动化协议](/docs/automationProtocols)部分了解更多信息。

:::

##### 用法

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>降速因子(1表示不限制，2表示速度降低2倍，以此类推)</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```