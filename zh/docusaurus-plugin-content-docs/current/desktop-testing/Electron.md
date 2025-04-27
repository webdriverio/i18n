---
id: electron
title: Electron
---

Electron是一个使用JavaScript、HTML和CSS构建桌面应用程序的框架。通过将Chromium和Node.js嵌入到其二进制文件中，Electron允许你维护一个JavaScript代码库并创建可在Windows、macOS和Linux上运行的跨平台应用程序——无需原生开发经验。

WebdriverIO提供了一个集成服务，简化了与Electron应用程序的交互，使测试变得非常简单。使用WebdriverIO测试Electron应用程序的优势包括：

- 🚗 自动设置所需的Chromedriver
- 📦 自动检测Electron应用程序的路径 - 支持[Electron Forge](https://www.electronforge.io/)和[Electron Builder](https://www.electron.build/)
- 🧩 在测试中访问Electron API
- 🕵️ 通过类似Vitest的API模拟Electron API

你只需要几个简单的步骤就可以开始。观看来自[WebdriverIO YouTube](https://www.youtube.com/@webdriverio)频道的这个简单的逐步入门视频教程：

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

或者按照以下部分的指南进行操作。

## 入门指南

要启动一个新的WebdriverIO项目，请运行：

```sh
npm create wdio@latest ./
```

安装向导将指导你完成此过程。确保在询问你想要进行什么类型的测试时选择_"Desktop Testing - of Electron Applications"_。之后提供你编译好的Electron应用程序的路径，例如`./dist`，然后保持默认设置或根据你的偏好进行修改。

配置向导将安装所有必需的包，并创建一个带有测试应用程序所需配置的`wdio.conf.js`或`wdio.conf.ts`。如果你同意自动生成一些测试文件，你可以通过`npm run wdio`运行你的第一个测试。

## 手动设置

如果你已经在项目中使用WebdriverIO，可以跳过安装向导，只需添加以下依赖项：

```sh
npm install --save-dev wdio-electron-service
```

然后你可以使用以下配置：

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

就是这样 🎉

了解更多关于[如何配置Electron Service](/docs/desktop-testing/electron/configuration)、[如何模拟Electron API](/docs/desktop-testing/electron/mocking)以及[如何访问Electron API](/docs/desktop-testing/electron/api)的信息。