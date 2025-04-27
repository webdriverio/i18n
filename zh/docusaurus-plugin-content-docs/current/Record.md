---
id: record
title: 记录测试
---

Chrome DevTools 有一个 _Recorder_ 面板，允许用户在Chrome中记录和回放自动化步骤。这些步骤可以[通过扩展导出为WebdriverIO测试](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en)，使编写测试变得非常容易。

## 什么是Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/)是一个工具，它允许你直接在浏览器中记录和回放测试操作，并将它们导出为JSON（或导出为e2e测试），以及测量测试性能。

这个工具非常直观，由于它集成在浏览器中，我们可以方便地不切换上下文或处理任何第三方工具。

## 如何使用Chrome DevTools Recorder记录测试

如果你使用最新版本的Chrome，你已经安装了Recorder并可以使用它。只需打开任何网站，右键点击并选择_"检查"_。在DevTools中，你可以通过按`CMD/Control` + `Shift` + `p`并输入_"Show Recorder"_来打开Recorder。

![Chrome DevTools Recorder](/img/recorder/recorder.png)

要开始记录用户旅程，点击_"Start new recording"_，给你的测试命名，然后使用浏览器记录你的测试：

![Chrome DevTools Recorder](/img/recorder/demo.gif)

下一步，点击_"Replay"_检查记录是否成功并执行你想要的操作。如果一切正常，点击[导出](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)图标并选择_"Export as a WebdriverIO Test Script"_：

只有安装了[WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn)扩展后，_"Export as a WebdriverIO Test Script"_选项才可用。

![Chrome DevTools Recorder](/img/recorder/export.gif)

就是这样！

## 导出记录

如果你将流程导出为WebdriverIO测试脚本，它应该会下载一个脚本，你可以复制粘贴到你的测试套件中。例如，上面的记录看起来如下：

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

确保你重新审视一些定位器，如有必要，将它们替换为更具弹性的[选择器类型](/docs/selectors)。你也可以将流程导出为JSON文件，并使用[`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder)包将其转换为实际的测试脚本。

## 下一步

你可以使用这个流程轻松地为你的应用创建测试。Chrome DevTools Recorder有各种额外功能，例如：

- [模拟慢网络](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) 或者
- [测量你的测试性能](https://developer.chrome.com/docs/devtools/recorder/#measure)

确保查看他们的[文档](https://developer.chrome.com/docs/devtools/recorder)。