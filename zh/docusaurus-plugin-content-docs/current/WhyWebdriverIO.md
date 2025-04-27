---
id: why-webdriverio
title: 为什么选择 Webdriver.IO？
---

WebdriverIO 是一个先进的自动化框架，专为自动化现代网页和移动应用程序而构建。它简化了与应用程序的交互，并提供了一系列插件，帮助你创建可扩展、健壮且稳定的测试套件。

它的设计理念是：

- __可扩展__ - 添加辅助函数，或更复杂的命令集和组合是__简单__且__非常有用__的
- __兼容性好__ - WebdriverIO 可以在 [WebDriver 协议](https://w3c.github.io/webdriver/)上运行以实现__真正的跨浏览器测试__，也可以通过 [Chrome DevTools 协议](https://chromedevtools.github.io/devtools-protocol/) 使用 [Puppeteer](https://pptr.dev/) 进行基于 Chromium 的自动化。
- __功能丰富__ - 大量内置和社区插件允许你__轻松集成__和__扩展__你的设置，以满足你的需求。

你可以使用 WebdriverIO 来自动化：

- 🌐 <span>&nbsp;</span> __现代网页应用程序__，如使用 React、Vue、Angular、Svelte 或其他前端框架编写的应用
- 📱 <span>&nbsp;</span> 在模拟器/仿真器或真实设备上运行的__混合__或__原生移动应用程序__
- 💻 <span>&nbsp;</span> __原生桌面应用程序__（例如使用 Electron.js 编写的应用）
- 📦 <span>&nbsp;</span> 浏览器中网页组件的__单元测试或组件测试__

## 基于 Web 标准

WebdriverIO 利用了 [WebDriver](https://w3c.github.io/webdriver/) 和 [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) 协议的强大功能，这些协议由所有浏览器厂商开发和支持，保证了真正的跨浏览器测试体验。虽然其他自动化工具需要你下载实际用户不使用的修改过的浏览器引擎，或通过注入 JavaScript 来模拟用户行为，但 WebdriverIO 依赖于一个通用的自动化标准，该标准经过[适当测试](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned)，确保未来几十年的兼容性。

此外，WebdriverIO 还支持其他专有自动化协议，如用于调试和内省目的的 [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)。这允许用户在基于 WebDriver 的传统命令和通过 [Puppeteer](https://pptr.dev/) 实现的强大浏览器交互之间无缝切换。

在[自动化协议](automationProtocols)部分阅读更多关于这些自动化标准的区别。

## 真正的开源

与生态系统中的许多自动化工具相比，WebdriverIO 是一个真正的开源项目，由称为 [OpenJS Foundation](https://openjsf.org/) 的非营利实体运行并采用开放治理模式。这在法律上约束项目在所有参与者的利益方向上成长和发展。项目团队重视开放性和协作，不受金钱利益驱动。

这使得项目在如何开发以及未来方向上保持独立。它让我们能够在[社区频道](https://discord.webdriver.io)中提供全天候的免费支持，因为我们建立了一个可持续的社区，大家互相支持和学习。最后，由于其[开放治理](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md)，它为参与项目并与之互动的人们提供了很多机会。