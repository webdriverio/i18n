---
id: debug
title: 调试
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

此命令可帮助您调试集成测试。它会停止正在运行的浏览器，并给您时间跳转到浏览器中检查应用程序的状态（例如使用开发者工具）。
您的终端将转变为[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
接口，允许您尝试特定命令，查找元素并测试对它们的操作。

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

如果您运行WDIO测试运行器，请确保增加您正在使用的测试框架（例如Mocha或Jasmine）的超时属性，以防止因测试超时而导致测试终止。
此外，避免在多个功能同时运行时执行该命令。

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### 用法

```js
browser.debug()
```

##### 示例

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```