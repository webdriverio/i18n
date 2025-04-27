---
id: throttleNetwork
title: 节流网络
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

限制浏览器的网络能力。这有助于模拟用户失去互联网连接的某些场景，
以及你的应用程序需要如何应对这种情况。

有许多预设配置可供轻松使用。
这些预设包括 `offline`、`GPRS`、`Regular2G`、`Good2G`、`Regular3G`、`Good3G`、
`Regular4G`、`DSL`、`WiFi`、`online`。

你可以在[源代码](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29)中查看这些预设的值。

:::info

请注意，使用 `throttleNetwork` 命令需要支持Chrome DevTools协议，例如
在云中运行自动化测试时无法使用。Chrome DevTools协议默认不安装，
使用 `npm install puppeteer-core` 来安装它。
在[自动化协议](/docs/automationProtocols)部分了解更多信息。

:::

##### 用法

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>节流参数</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>设为true以模拟互联网断开连接。</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>从发送请求到接收响应头的最小延迟时间（毫秒）。</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大聚合下载吞吐量（字节/秒）。-1表示禁用下载节流。</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>最大聚合上传吞吐量（字节/秒）。-1表示禁用上传节流。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // 通过静态字符串预设
    await browser.throttleNetwork('Regular3G')

    // 通过自定义值
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```