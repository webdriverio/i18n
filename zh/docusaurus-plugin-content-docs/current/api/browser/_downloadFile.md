---
id: downloadFile
title: 下载文件
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

通过使用 [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) 命令，将运行 Selenium 节点的远程计算机上的文件下载到本地文件系统。

:::info
请注意，此命令仅在您使用 [Selenium Grid](https://www.selenium.dev/documentation/en/grid/) 且浏览器为 Chrome、Edge 或 Firefox，并且在 capabilities 中设置了 `se:downloadsEnabled` 标志时才受支持。
:::

##### 用法

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>文件的远程路径</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>本地计算机上的目标位置</td>
    </tr>
  </tbody>
</table>