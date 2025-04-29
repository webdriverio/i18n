---
id: json-reporter
title: Json 报告器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## 安装

```bash
npm install @wdio/json-reporter --save-dev
```

## 配置

### 结果输出到 `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### 结果输出到文件

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### 使用自定义文件名输出结果到文件

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## 结果文件

从WDIO v5开始，报告功能已经从一个集中式处理过程转变为由并行测试执行时创建的每个"会话"进行处理。这一变化有助于减少WDIO测试执行过程中的通信量，从而提高性能。缺点是不再能够为所有测试执行获取单一的报告。

`@wdio/json-reporter` 提供了一个工具函数，可以将多个json文件合并成一个文件。按照以下步骤来使用这个工具。

你可以在`wdio.conf.js`的[`onComplete`](https://webdriver.io/docs/configuration#oncomplete)中执行这个操作：

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_注意：_ `wdio-custom-filename.json` 是可选的，如果未提供该参数，默认值为 `wdio-merged.json`。

## 贡献

这个报告器的源代码很大程度上受到了 [Jim Davis](https://github.com/fijijavis) 的社区报告器 [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) 的启发。感谢他为维护该项目所做的所有工作！

---

有关WebdriverIO的更多信息，请查看[主页](http://webdriver.io)。