---
id: devtools
title: DevTools 开发工具
---

DevTools 服务为 WebdriverIO 测试执行提供了强大的基于浏览器的调试界面。它允许您通过交互式网络应用程序实时可视化、调试和控制测试。

## 概述

此服务使您能够：

- **选择性地重新运行测试** - 点击任何测试用例或套件立即重新执行
- **可视化调试** - 通过自动截图查看实时浏览器预览
- **跟踪执行** - 查看带有时间戳和结果的详细命令日志
- **监控网络和控制台** - 检查 API 调用和 JavaScript 日志
- **导航到代码** - 直接跳转到测试源文件

## 安装

将服务安装为开发依赖项：

```sh
npm install --save-dev @wdio/devtools-service
```

## 配置

将服务添加到您的 WebDriverIO 配置中：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### 服务选项

使用这些选项配置 DevTools 服务：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // DevTools UI 的端口 (默认: 3000)
        }]
    ],
    // ...
};
```

#### 选项

- **port** (数字, 默认: `3000`) - DevTools UI 服务器的端口号

## 工作原理

当您启用 DevTools 服务运行 WebdriverIO 测试时：

1. 该服务在 `http://localhost:3000`（可配置）打开一个浏览器窗口
2. 您的测试正常执行，同时 DevTools UI 显示实时更新
3. UI 显示测试层次结构、浏览器预览、命令时间轴和日志
4. 测试完成后，您可以点击任何测试单独重新运行它
5. 测试在同一浏览器会话中重新运行以加快调试速度

## 功能

详细了解 DevTools 功能：

- **[交互式测试重新运行和可视化](devtools/interactive-test-rerunning)** - 具有测试重新运行功能的实时浏览器预览
- **[多框架支持](devtools/multi-framework-support)** - 适用于 Mocha、Jasmine 和 Cucumber
- **[控制台日志](devtools/console-logs)** - 捕获并检查浏览器控制台输出
- **[网络日志](devtools/network-logs)** - 监控 API 调用和网络活动
- **[TestLens](devtools/testlens)** - 通过智能代码导航导航到源代码