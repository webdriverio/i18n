---
id: lighthouse-service
title: Lighthouse 服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 一个 WebdriverIO 服务，允许您使用 [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) 运行可访问性和性能测试。

**注意：**此服务目前仅支持在 Google Chrome 或 Chromium 上运行的测试！鉴于大多数云供应商不开放对 Chrome DevTools 协议的访问，这个服务通常只有在本地运行测试或通过 [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 或更高版本时才能使用。

## 安装

最简单的方法是将 `@wdio/lighthouse-service` 作为开发依赖保留在您的 `package.json` 中，通过：

```sh
npm install @wdio/lighthouse-service --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

要使用该服务，您只需要在 `wdio.conf.js` 的服务列表中添加该服务，如：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## 使用

`@wdio/lighthouse-service` 允许您通过 WebdriverIO 运行 Google Lighthouse 可访问性和性能测试。

### 性能测试

Lighthouse 服务允许您从每次页面加载或由点击引起的页面转换中捕获性能数据。要启用它，请调用 `browser.enablePerformanceAudits(<options>)`。在完成捕获所有必要的性能数据后，禁用它以恢复节流设置，例如：

```js
import assert from 'node:assert'

describe('JSON.org page', () => {
    before(async () => {
        await browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        await browser.url('http://json.org')

        let metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = await browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(async () => {
        await browser.disablePerformanceAudits()
    })
})
```

以下命令及其结果可用：

#### `getMetrics`

获取最常用的性能指标，例如：

```js
console.log(await browser.getMetrics())
/**
 * { timeToFirstByte: 566,
 *   serverResponseTime: 566,
 *   domContentLoaded: 3397,
 *   firstVisualChange: 2610,
 *   firstPaint: 2822,
 *   firstContentfulPaint: 2822,
 *   firstMeaningfulPaint: 2822,
 *   largestContentfulPaint: 2822,
 *   lastVisualChange: 15572,
 *   interactive: 6135,
 *   load: 8429,
 *   speedIndex: 3259,
 *   totalBlockingTime: 31,
 *   maxPotentialFID: 161,
 *   cumulativeLayoutShift: 2822 }
 */
```

#### `getDiagnostics`

获取有关页面加载的一些有用诊断信息。

```js
console.log(await browser.getDiagnostics())
/**
 * { numRequests: 8,
 *   numScripts: 0,
 *   numStylesheets: 0,
 *   numFonts: 0,
 *   numTasks: 237,
 *   numTasksOver10ms: 5,
 *   numTasksOver25ms: 2,
 *   numTasksOver50ms: 2,
 *   numTasksOver100ms: 0,
 *   numTasksOver500ms: 0,
 *   rtt: 147.20600000000002,
 *   throughput: 47729.68474448835,
 *   maxRtt: 176.085,
 *   maxServerLatency: 1016.813,
 *   totalByteWeight: 62929,
 *   totalTaskTime: 254.07899999999978,
 *   mainDocumentTransferSize: 8023 }
 */
```

#### getMainThreadWorkBreakdown

返回包含所有主线程任务及其总持续时间的列表。

```js
console.log(await browser.getMainThreadWorkBreakdown())
/**
 * [ { group: 'styleLayout', duration: 130.59099999999998 },
 *   { group: 'other', duration: 44.819 },
 *   { group: 'paintCompositeRender', duration: 13.732000000000005 },
 *   { group: 'parseHTML', duration: 3.9080000000000004 },
 *   { group: 'scriptEvaluation', duration: 2.437999999999999 },
 *   { group: 'scriptParseCompile', duration: 0.20800000000000002 } ]
 */
```

#### getPerformanceScore

返回 [Lighthouse 性能分数](https://developers.google.com/web/tools/lighthouse/scoring)，这是以下指标的加权平均值：`firstContentfulPaint`、`speedIndex`、`largestContentfulPaint`、`cumulativeLayoutShift`、`totalBlockingTime`、`interactive`、`maxPotentialFID` 或 `cumulativeLayoutShift`。

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

为所有由调用 `url` 命令或点击链接或任何导致页面加载的操作引起的页面加载启用自动性能审计。您可以传入配置对象来确定一些节流选项。默认的节流配置是 `Good 3G` 网络，CPU 节流为 4 倍。

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

可用的网络节流配置有：`offline`、`GPRS`、`Regular 2G`、`Good 2G`、`Regular 3G`、`Good 3G`、`Regular 4G`、`DSL`、`Wifi` 和 `online`（无节流）。

### PWA 测试

使用 `checkPWA` 命令，您可以验证您的 Web 应用是否符合最新的渐进式 Web 应用标准。它检查：

- 您的应用是否可安装
- 提供服务工作者
- 有启动画面
- 提供 Apple Touch 和 Maskable 图标
- 可以在移动设备上提供服务

如果您对这些检查中的某些不感兴趣，可以传入您想要运行的检查列表。如果所有检查都通过，`passed` 属性将返回 `true`。如果它们失败，您可以使用 `details` 属性来丰富您的失败消息，详细说明失败原因。

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)` 命令

开始跟踪浏览器。您可以选择传入自定义跟踪类别（默认为[此列表](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)）和采样频率（默认为 `10000`）。

```js
await browser.startTracing()
```

### `endTracing` 命令

停止跟踪浏览器。

```js
await browser.endTracing()
```

### `getTraceLogs` 命令

返回在跟踪期间捕获的跟踪日志。您可以使用此命令将跟踪日志存储在文件系统上，以通过 Chrome DevTools 界面分析跟踪。

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight` 命令

返回最后一次页面加载的页面权重信息。

```js
await browser.startTracing()
await browser.url('https://webdriver.io')
await browser.endTracing()

console.log(await browser.getPageWeight())
// outputs:
// { pageWeight: 2438485,
//   transferred: 1139136,
//   requestCount: 72,
//   details: {
//       Document: { size: 221705, encoded: 85386, count: 11 },
//       Stylesheet: { size: 52712, encoded: 50130, count: 2 },
//       Image: { size: 495023, encoded: 482433, count: 36 },
//       Script: { size: 1073597, encoded: 322854, count: 15 },
//       Font: { size: 84412, encoded: 84412, count: 5 },
//       Other: { size: 1790, encoded: 1790, count: 2 },
//       XHR: { size: 509246, encoded: 112131, count: 1 } }
// }
```

----

有关 WebdriverIO 的更多信息，请参阅[主页](https://webdriver.io)。