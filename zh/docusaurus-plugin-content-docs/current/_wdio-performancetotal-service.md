---
id: wdio-performancetotal-service
title: 性能总计服务
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
注意：<br/>
WebdriverIO v9 使用版本 4.x.x。<br/>
WebdriverIO v8 使用版本 3.x.x。<br/>
WebdriverIO v7 使用版本 2.x.x。<br/>
WebdriverIO v6 使用版本 1.x.x。

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

通过这个 [webdriver.io](https://webdriver.io/) 插件，您可以轻松地将性能分析添加到测试中的任何流程，无论是纯UI、API还是两者的组合。此插件提供了一种简单高效的方式来测量各种程序的响应时间，并识别应用程序中潜在的瓶颈。有了这些信息，您可以就优化和改进做出明智的决定，以提高应用程序的整体性能。

## 安装

安装此模块作为开发依赖的最简单方法是使用以下命令：

```
npm install wdio-performancetotal-service --save-dev
```

## 使用方法

将 wdio-performancetotal-service 添加到您的 `wdio.conf.js`：

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...或者带上服务选项：

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // The options (with default values)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### 选项

#### __disableAppendToExistingFile__

当设置为 `true` 时，新的测试运行将从零开始并覆盖任何现有的性能数据。
当设置为 `false`（默认值）时，性能数据将被添加到现有数据中。

> **⚠️ 注意：**
>
> 此操作将永久删除所有性能数据。请确保在继续之前有备份。

#### __performanceResultsFileName__

您可以覆盖默认的结果文件名（`performance-results`）。
新创建的结果文件通常会覆盖旧文件。如果您想保留旧文件，建议向文件名添加时间戳。例如：

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

默认为 `false`。当值设置为 `true` 时，将排除失败测试的性能分析。

#### __recentDays__

默认为 `0`（无限制）。要设置性能分析考虑的天数，请设置天数。也支持部分天数（例如 `recentDays: 0.5`）

#### __performanceResultsDirectory__

您可以覆盖项目根目录中结果目录的默认路径。
例如：

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

默认为 `false`。如果为 `true`，性能数据也将按浏览器类型进行分析。


### 在测试中使用

只需在需要的地方导入 __performancetotal__，无论是在测试文件中还是任何其他类中。该对象提供了测量测试中性能数据的方法，包括 sampleStart 和 sampleEnd 用于开始和结束性能测量。
以下是如何使用 performancetotal 对象来测量两个网站的启动性能的示例：

```typescript
// This test case measures the startup performance of Github and SourceForge using the performancetotal object.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Start a new performance measurement for Github
    performancetotal.sampleStart("GH-Startup");

    // Navigate to Github
    browser.url("https://github.com/");

    // End the Github measurement and save the results
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Start a new performance measurement for SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigate to SourceForge
    await browser.url("https://sourceforge.net/");

    // End the SourceForge measurement and save the results
    performancetotal.sampleEnd("SF-Startup");
});

```

您可以通过在测试中调用 performancetotal.getSampleTime(sampleName) 来获取单个性能样本所用的时间。这样您可以检查代码特定部分的性能，并确保它满足您的期望。

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## 获取结果

当所有测试完成后，会在项目的根文件夹中创建一个新的结果目录（默认目录名为 performance-results）。在此目录中，将创建两个文件：performance-results.json 和 performance-results.csv。这些文件包含每个样本的分析数据，包括平均时间、平均标准误差（SEM）、样本数量、最小值、最大值、最早时间和最晚时间。您可以使用这些数据来识别随时间推移的任何性能退化或改进。

### 批量分析性能数据

要在不生成新测试的情况下批量分析现有性能数据，建议使用 [__performancetotal-cli__ 工具](https://www.npmjs.com/package/performancetotal-cli)。

## Typescript 支持

此插件支持 Typescript。

## 支持

如需支持和建议，请随时联系我：[tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com)。