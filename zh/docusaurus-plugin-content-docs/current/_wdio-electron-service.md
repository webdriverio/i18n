---
id: wdio-electron-service
title: Electron 服务
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**用于测试 Electron 应用程序的 WebdriverIO 服务**

通过丰富的 WebdriverIO 生态系统实现跨平台 Electron 应用 E2E 测试。

[Spectron](https://github.com/electron-userland/spectron) 的精神继承者（[RIP](https://github.com/electron-userland/spectron/issues/1045)）。

### 特性

通过以下方式使 Electron 应用程序测试变得更加简单：

- 🚗 自动设置所需的 Chromedriver（适用于 Electron v26 及以上版本）
- 📦 自动检测 Electron 应用程序路径
  - 支持 [Electron Forge](https://www.electronforge.io/)、[Electron Builder](https://www.electron.build/) 和未打包的应用
- 🧩 在测试中访问 Electron API
- 🕵️ 通过类似 Vitest 的 API 模拟 Electron API

## 安装

您需要安装 `WebdriverIO`，安装指南可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 快速开始

快速上手的推荐方式是使用 [WDIO 配置向导](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup)。

### 手动快速开始

要在不使用配置向导的情况下开始，您需要安装服务和 `@wdio/cli`：

```bash
npm install --dev @wdio/cli wdio-electron-service
```

或者使用您选择的包管理器 - pnpm、yarn 等。

接下来，创建您的 WDIO 配置文件。如果您需要一些灵感，可以参考本仓库[示例目录](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts)中的可用配置，以及 [WDIO 配置参考页面](https://webdriver.io/docs/configuration)。

您需要将 `electron` 添加到您的 services 数组中并设置 Electron capability，例如：

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

最后，使用您的配置文件[运行一些测试](https://webdriver.io/docs/gettingstarted#run-test)。

这将以与 WDIO 处理 Chrome 或 Firefox 等浏览器相同的方式启动您的应用程序实例。如果您需要同时运行其他实例，例如多个应用程序实例或应用程序与 Web 浏览器的不同组合，该服务可以与 [WDIO（并行）multiremote](https://webdriver.io/docs/multiremote) 一起使用。

如果您使用 [Electron Forge](https://www.electronforge.io/) 或 [Electron Builder](https://www.electron.build/) 打包您的应用，则该服务将自动尝试找到您打包的 Electron 应用的路径。您可以通过自定义服务能力提供二进制文件的自定义路径，例如：

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

请参阅[配置文档](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath)，了解如何为 Electron 支持的不同操作系统找到 `appBinaryPath` 值。

或者，您可以通过提供 `main.js` 脚本的路径，将服务指向未打包的应用。Electron 需要安装在您的 `node_modules` 中。建议使用 Rollup、Parcel、Webpack 等打包工具来打包未打包的应用。

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Chromedriver 配置

**如果您的应用使用的 Electron 版本低于 v26，则需要[手动配置 Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed)。**

这是因为 WDIO 使用 Chrome for Testing 下载 Chromedriver，它只提供 v115 或更新版本的 Chromedriver。

## 文档

**[服务配置](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Chromedriver 配置](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[访问 Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[模拟 Electron API](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[窗口管理](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[独立模式](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[开发](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[常见问题和调试](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## 开发

如果您有兴趣贡献，请阅读[开发文档](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)。

## 示例集成

查看我们的 [Electron 样板](https://github.com/webdriverio/electron-boilerplate)项目，该项目展示了如何在示例应用程序中集成 WebdriverIO。您还可以查看本仓库中的[示例应用](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/)和 [E2E 测试](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/)目录。

## 支持

如果您在使用该服务运行 WDIO 时遇到问题，首先应该查看文档中的[常见问题](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md)，然后在[主要 WDIO 论坛](https://github.com/webdriverio/webdriverio/discussions)中开启讨论。

Electron 服务讨论论坛的活跃度比 WDIO 的要低，但如果您遇到的问题特定于 Electron 或使用该服务，您可以在[这里](https://github.com/webdriverio-community/wdio-electron-service/discussions)开启讨论。