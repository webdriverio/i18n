---
id: wdio-html-nice-reporter
title: HTML 报告生成器
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter 是第三方软件包，更多信息请参阅 [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

一个为 webdriver.io 生成精美 HTML 报告的报告生成器。  
这个名字虽然看起来有点傻，但它提供了与 webdriverio 的集成

### 新消息：不再是测试版。

### 新消息：清理并将日志记录切换到 wdio-logging。示例已更新。
    您需要从配置中删除 log4Js 日志初始化

### 新消息：重写为 ES 模块以兼容 webdriverio 8。
    您可能需要在测试应用程序中进行更改

### 错误修复：webdriverio 在 json 异步写入过程中关闭。

### 错误修复：json 写入未正确等待

### 重大改进：不再因 json.stringify 而出现内存不足错误

### 重要新功能：为每个测试录制视频


## [更新日志](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## 信息

这个项目是 [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter) 的重写
它使用 typescript 编写，并有许多增强功能。



## 配置

### WDIO.config.ts

以下代码显示了默认的 wdio 测试运行器配置。只需将 HtmlReporter 对象作为另一个报告器添加到 reporters 数组中：

### 在 [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts) 中提供了一个功能完整的 wdio.config.ts

下面是该文件中的片段。

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## 配置选项：
  
### 为所有测试套件生成主报告

webdriver.io 将为每个测试套件调用报告器。它不会聚合报告。要实现这一点，请将以下事件处理程序添加到您的 wdio.config.js

添加到浏览器配置文件：
```
let reportAggregator : ReportAggregator;
```
添加到浏览器配置对象：
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### 从此报告生成 PDF 文件

需要额外插件，对于不需要此功能的用户来说支持更轻量级。
参见 [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## 示例输出：

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

这必须手动设置。在配置时无法获取，因为浏览器对象直到您开始会话时才存在。