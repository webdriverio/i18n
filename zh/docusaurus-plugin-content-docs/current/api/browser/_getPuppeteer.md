---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

获取 [Puppeteer 浏览器实例](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
以运行 Puppeteer 命令。请注意，所有 Puppeteer 命令默认都是异步的，
因此为了在同步和异步执行之间切换，请确保将 Puppeteer 调用包装在 `browser.call`
命令中，如示例所示。

:::info

请注意，使用 Puppeteer 需要支持 Chrome DevTools 协议，例如
在云中运行自动化测试时无法使用。Chrome DevTools 协议默认不会安装，
使用 `npm install puppeteer-core` 进行安装。
在[自动化协议](/docs/automationProtocols)部分了解更多信息。

:::

:::info

注意：Puppeteer 目前在运行[组件测试](/docs/component-testing)时**不**受支持。

:::

##### 用法

```js
browser.getPuppeteer()
```

##### 示例

```js title="getPuppeteer.test.js"
it('should allow me to use Puppeteer', async () => {
    // WebDriver command
    await browser.url('https://webdriver.io')

    const puppeteerBrowser = await browser.getPuppeteer()
    // switch to Puppeteer
    const metrics = await browser.call(async () => {
        const pages = await puppeteerBrowser.pages()
        pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
        return pages[0].metrics()
    })

    console.log(metrics.LayoutCount) // returns LayoutCount value
})
```

##### 返回

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   已初始化的 puppeteer 实例，已连接到浏览器