---
id: reloadSession
title: 重新加载会话
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

使用当前capabilities创建一个新的Selenium会话。这在测试高度有状态的应用程序时非常有用，您需要在规格文件中的测试之间清理浏览器会话，以避免使用WDIO创建数百个单一测试文件。
但要小心，这个命令会极大地影响您的测试时间，因为生成新的Selenium会话非常耗时，尤其是在使用云服务时。

当您想要连接到不同的远程服务时，可以在browserName旁边添加连接参数，如主机名、端口、协议等。这在一种情况下很有用，例如，您在原生应用程序中开始测试，并需要在Web应用程序中验证数据。

如果您从远程服务开始，如果您想切换到本地驱动程序，可以为主机名传入0.0.0.0。

##### 用法

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>用于创建会话的新capabilities</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```