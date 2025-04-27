---
id: visual-reporter
title: 可视化报告器
---

可视化报告器是`@wdio/visual-service`从[v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0)版本开始引入的新功能。该报告器允许用户将视觉测试服务生成的JSON差异报告可视化，并将其转换为人类可读的格式。它通过提供图形界面来查看输出，帮助团队更好地分析和管理视觉测试结果。

要使用此功能，请确保您有必要的配置来生成所需的`output.json`文件。本文档将指导您设置、运行和理解可视化报告器。

# 前提条件

在使用可视化报告器之前，确保您已经配置视觉测试服务以生成JSON报告文件：

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // 生成output.json文件
            },
        ],
    ],
};
```

有关更详细的设置说明，请参阅WebdriverIO的[视觉测试文档](./)或[`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# 安装

要安装可视化报告器，请使用npm将其作为开发依赖项添加到您的项目中：

```bash
npm install @wdio/visual-reporter --save-dev
```

这将确保生成视觉测试报告所需的文件可用。

# 使用方法

## 构建可视化报告

一旦您运行了视觉测试并生成了`output.json`文件，您可以使用CLI或交互式提示来构建可视化报告。

### CLI使用

您可以使用CLI命令生成报告：

```bash
npx wdio-visual-reporter --jsonOutput=<output.json的路径> --reportFolder=<存储报告的路径> --logLevel=debug
```

#### 必需选项：

-   `--jsonOutput`：视觉测试服务生成的`output.json`文件的相对路径。此路径相对于执行命令的目录。
-   `--reportFolder`：生成的报告将存储的相对目录。此路径也相对于执行命令的目录。

#### 可选选项：

-   `--logLevel`：设置为`debug`以获取详细日志，特别适用于故障排除。

#### 示例

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

这将在指定文件夹中生成报告，并在控制台中提供反馈。例如：

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### 查看报告

:::warning
直接在浏览器中打开`path/to/report/index.html`**而不从本地服务器提供服务**将**无法**工作。
:::

要查看报告，您需要使用简单的服务器，如[sirv-cli](https://www.npmjs.com/package/sirv-cli)。您可以使用以下命令启动服务器：

```bash
npx sirv-cli /path/to/report --single
```

这将产生类似于下面示例的日志。请注意，端口号可能会有所不同：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

现在您可以在浏览器中打开提供的URL来查看报告。

### 使用交互式提示

或者，您可以运行以下命令并回答提示来生成报告：

```bash
npx @wdio/visual-reporter
```

提示将引导您提供所需的路径和选项。最后，交互式提示还会询问您是否要启动服务器来查看报告。如果您选择启动服务器，该工具将启动一个简单的服务器并在日志中显示URL。您可以在浏览器中打开此URL来查看报告。

![可视化报告器CLI](/img/visual/cli-screen-recording.gif)

![可视化报告器](/img/visual/visual-reporter.gif)

#### 查看报告

:::warning
直接在浏览器中打开`path/to/report/index.html`**而不从本地服务器提供服务**将**无法**工作。
:::

如果您选择**不**通过交互式提示启动服务器，您仍然可以通过手动运行以下命令来查看报告：

```bash
npx sirv-cli /path/to/report --single
```

这将产生类似于下面示例的日志。请注意，端口号可能会有所不同：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

现在您可以在浏览器中打开提供的URL来查看报告。

# 报告演示

要查看报告外观的示例，请访问我们的[GitHub Pages演示](https://webdriverio.github.io/visual-testing/)。

# 理解可视化报告

可视化报告器提供了视觉测试结果的有组织视图。对于每次测试运行，您将能够：

-   轻松在测试用例之间导航并查看汇总结果。
-   查看元数据，如测试名称、使用的浏览器和比较结果。
-   查看显示检测到视觉差异位置的差异图像。

这种视觉表示简化了测试结果的分析，使识别和解决视觉回归变得更加容易。

# CI集成

我们正在努力支持不同的CI工具，如Jenkins、GitHub Actions等。如果您想帮助我们，请通过[Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642)联系我们。