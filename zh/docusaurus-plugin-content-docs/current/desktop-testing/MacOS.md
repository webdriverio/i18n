---
id: macos
title: MacOS
---

WebdriverIO 可以使用 [Appium](https://appium.io/docs/en/2.0/) 自动化任意 MacOS 应用程序。您只需要在系统上安装 [XCode](https://developer.apple.com/xcode/)，将 Appium 和 [Mac2 Driver](https://github.com/appium/appium-mac2-driver) 作为依赖项安装，并设置正确的功能参数。

## 入门指南

要启动一个新的 WebdriverIO 项目，请运行：

```sh
npm create wdio@latest ./
```

安装向导将引导您完成整个过程。确保在询问您想要进行哪种类型的测试时选择 _"Desktop Testing - of MacOS Applications"_。之后，只需保持默认设置或根据您的偏好进行修改。

配置向导将安装所有必需的 Appium 包，并创建一个带有在 MacOS 上测试所需配置的 `wdio.conf.js` 或 `wdio.conf.ts`。如果您同意自动生成一些测试文件，您可以通过 `npm run wdio` 运行您的第一个测试。

<CreateMacOSProjectAnimation />

就是这样 🎉

## 示例

以下是一个简单测试的示例，该测试打开计算器应用程序，进行计算并验证其结果：

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__注意：__ 因为在功能参数中定义了 `'appium:bundleId': 'com.apple.calculator'`，所以会话开始时计算器应用会自动打开。您可以随时在会话期间切换应用程序。

## 更多信息

有关在 MacOS 上测试的具体信息，我们建议查看 [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) 项目。