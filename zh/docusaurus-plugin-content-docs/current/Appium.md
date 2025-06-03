---
id: appium
title: Appium 配置
---

使用WebdriverIO，您不仅可以在浏览器中测试Web应用程序，还可以测试其他平台，例如：

- 📱 iOS、Android或Tizen上的移动应用程序
- 🖥️ macOS或Windows上的桌面应用程序
- 📺 以及Roku、tvOS、Android TV和Samsung的TV应用

我们建议使用[Appium](https://appium.io/)来帮助您进行这些类型的测试。您可以在其[官方文档页面](https://appium.io/docs/en/latest/intro/)上了解Appium的概述。

设置正确的环境并不简单。幸运的是，Appium生态系统提供了很好的工具来帮助您。要设置上述环境之一，只需运行：

```sh
$ npx appium-installer
```

这将启动[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)工具包，引导您完成设置过程。