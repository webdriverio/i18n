---
id: wdio-json-html-reporter
title: JSON HTML 报告生成器
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter 是第三方包，更多信息请参见 [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

这是一个自定义的 WebDriverIO 报告生成器，在测试执行期间生成详细的 JSON 报告，并提供可移植的 HTML 报告生成器来可视化您的测试结果。它记录时间戳、执行元数据，并可以按需捕获屏幕截图。该包遵循 WebDriverIO 报告器的约定，并以 `wdio-json-html-reporter` 的名称发布为 npm 包。

## 目录

- [概述](#overview)
- [特点](#features)
- [安装](#installation)
  - [1. 安装包](#1-install-the-package)
  - [2. 验证安装](#2-verify-installation)
  - [3. 更新 WebDriverIO 配置](#3-update-webdriverio-configuration)
  - [4. 运行测试](#4-run-your-tests)
- [CLI 使用](#cli-usage)
- [历史选项和聚合历史生成](#history-option-and-aggregated-history-generation)
- [屏幕截图](#screenshots)

## Overview

WDIO JSON HTML REPORTER 提供两个主要组件：

- **JSONReporter**：一个自定义报告器，扩展了 WebDriverIO 报告器接口，用于收集测试事件并生成带有元数据、测试结果和（可选）屏幕截图的 JSON 文件。
- **HTMLReportGenerator**：一个工具，用于将多个 JSON 报告文件转换为综合性 HTML 报告，包含交互式图表、过滤和导出功能。此外，报告生成器现在支持可选的历史文件，用于显示历史执行数据（如果可用）。当没有提供历史数据时，报告会省略历史部分，只显示唯一错误。

这些工具帮助您清晰地了解测试运行情况，这对调试和持续集成至关重要。

## Features

- **JSON 报告**：包含时间戳、套件名称、测试结果、错误和可选屏幕截图的详细报告。
- **HTML 报告**：将 JSON 报告转换为可移植的 HTML 报告，包含仪表板、图表、详细测试报告和过滤功能。
- **导出到 Excel**：详细的测试报告可以导出为 Excel 文件。
- **屏幕截图支持**：根据您的配置为失败的测试（或所有测试）捕获屏幕截图。
- **执行元数据**：记录浏览器信息、执行开始/结束时间和总体持续时间。
- **历史执行（可选）**：提供历史 JSON 文件以包含按套件的历史执行数据。如果没有提供历史数据，报告将自动隐藏此部分，仅显示唯一错误。
- **聚合历史生成**：JSON 报告器现在包括聚合历史生成功能。使用静态方法 `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`，您可以自动扫描报告目录中的所有 JSON 报告文件（匹配模式 `test-report-*.json`），聚合测试结果，并根据历史数据计算缺陷比较。然后将聚合的历史记录附加到您的历史文件中，可用于 HTML 报告生成器来可视化随时间的趋势。

## Installation

要安装 `wdio-json-html-reporter` 包，请按照以下步骤操作：

### 1. Install the package

运行以下命令将软件包安装为开发依赖项：

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

确保包已正确安装，运行：

```bash
npm list wdio-json-html-reporter
```

如果正确安装，您应该看到类似以下的输出：

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

修改您的 `wdio.conf.js` 或 `wdio.conf.ts` 文件以包含自定义报告器：

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

执行您的 WebDriverIO 测试套件：

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

除了与 WebDriverIO 集成外，您还可以使用内置 CLI 直接从命令行运行 HTML 报告生成器。

**用法：**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

例如，如果您的 JSON 文件在名为 `test/reports/json-reports` 的文件夹中，并且想要生成名为 `test/reports/report.html` 的 HTML 报告，可以运行：

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

如果您还有历史文件（例如，`test/reports/history.json`），请将其作为可选的第四个参数包括进来：

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**注意：**  
CLI 功能仅在您将 `generate-html` 命令作为第一个参数传递时触发。通过 WebDriverIO 运行时（例如，使用 `wdio run wdio.conf.js`），CLI 逻辑将被绕过。

## History Option and Aggregated History Generation

HTML 报告生成器现在支持**历史选项**。这允许您提供包含历史执行数据的 JSON 文件，该文件合并到报告中的"按套件历史执行"部分。如果提供了历史文件并包含有效数据，报告将显示历史趋势以及交互式图表和每个套件的折叠面板。如果没有传递历史文件或者文件不包含任何套件数据，报告将自动隐藏历史部分，只显示唯一错误概览。

此外，JSON 报告器现在包括**聚合历史生成**功能。使用静态方法 `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`，您可以自动扫描报告目录中的所有 JSON 报告文件（匹配模式 `test-report-*.json`），聚合测试结果（汇总测试计数和合并套件数据），并通过与最后一个聚合记录比较来计算缺陷比较。新生成的历史记录然后附加到指定的历史文件中。这个聚合的历史数据随后可以被 HTML 报告生成器使用，以提供多次测试运行的历史执行洞察。

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)