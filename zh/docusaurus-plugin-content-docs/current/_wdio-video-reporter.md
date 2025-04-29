---
id: wdio-video-reporter
title: 视频记录器
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter 是一个第三方包，更多信息请参阅 [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

这是一个用于 [Webdriver IO v6 及更高版本](https://webdriver.io/) 的报告生成器，可以为您的 wdio 测试执行生成视频。如果您使用 allure，那么测试用例也会自动添加视频。(对于 Webdriver IO v5，请使用 wdio-video-reporter 版本 ^2.0.0。)

视频将保存在 `wdio.config.outputDir` 中

查看包含失败测试视频的 Allure 报告示例：
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

优点：
- 在 allure 报告中有漂亮的视频
- 视频播放速度适合人类观看，即使测试执行速度很快
- 支持 Selenium 网格
- 适用于所有支持 `saveScreenshot` 的 webdriver
- 已验证在以下使用 Selenium 3.141.59 的桌面浏览器上可用：
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- 已验证在以下使用 [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 的 iOS 和 Android 设备上可用：
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

缺点：
- 通过在"操作"后截取屏幕截图工作，这会使测试速度变慢一些。通过仔细选择哪些 [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) 消息应该导致截图来缓解这一问题
- Selenium 驱动程序的截图不包括警告框和弹出窗口，因此它们在视频中不可见


快速开始
===========

查看 [wdio-template](https://github.com/presidenten/wdio-template) 中的简单模板，快速上手。

克隆其中一个存储库并使用 `yarn` 或 `npm install` 安装依赖项。然后在 demo 目录中运行 `yarn e2e` 或 `npm run e2e`，最后运行 `yarn report` 或 `npm run report` 查看 allure 报告。


安装
============

安装报告器
--------------------

`yarn add wdio-video-reporter`
或
`npm install wdio-video-reporter`


将报告器添加到配置
--------------------------

在 `wdio.conf.js` 文件的顶部，引入库：
```
const video = require('wdio-video-reporter');
```

然后将视频报告器添加到 reporters 属性的配置中：

```
 reporters: [
    [video, {
      saveAllVideos: false,       // 如果为 true，也会保存成功测试用例的视频
      videoSlowdownMultiplier: 3, // 更高的值获得更慢的视频，更低的值获得更快的视频 [值 1-100]
    }],
  ],
```


与 Allure 一起使用
-----------------

添加 Allure 报告器后，会自动将视频更新到报告中，无需任何额外配置 :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // 如果为 true，也会保存成功测试用例的视频
      videoSlowdownMultiplier: 3, // 更高的值获得更慢的视频，更低的值获得更快的视频 [值 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


配置
=============

常规配置参数
-------------------------------

大多数用户可能需要设置这些

- `saveAllVideos` 设置为 true 以保存通过测试的视频。`默认值：false`
- `videoSlowdownMultiplier` 1-100 之间的整数。如果视频播放太快，请增加此值。`默认值：3`
- `videoRenderTimeout` 等待视频渲染的最大秒数。`默认值：5`
- `outputDir` 如果未设置，则使用 wdio.config.outputDir。`默认值：undefined`
- `outputDir` 如果未设置，则使用 wdio.config.outputDir。`默认值：undefined`
- `maxTestNameCharacters` 测试名称的最大长度。`默认值：250`

高级配置参数
---------------------------------

想要更改引擎何时进行屏幕截图的高级用户可以编辑这些内容。这些数组可以填充 [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) 消息的最后一个单词，例如 /session/:sessionId/`buttondown`。

- `addExcludedActions` 添加不需要截图的操作。`默认值：[]`
- `addJsonWireActions` 添加缺少截图的操作。`默认值：[]`
- `recordAllActions` 跳过过滤并截取所有内容的屏幕截图。（不推荐）`默认值：false`

要查看处理的消息，请设置 `wdio.config.logLevel: 'debug'` 并检查 `outputDir/wdio-X-Y-Video-reporter.log`。这也会保留屏幕截图输出目录以便审查。

要完全避免额外的日志记录并只获取视频文件，请设置 `wdio.config.logLevel: 'silent'`。

Cucumber 支持
----------------

如果您使用 Allure 报告器，您需要确保执行以下操作：

- 使用 `chai` 而不是使用内置的 node 断言，否则失败的测试会在步骤定义中被报告为损坏
- 在 `wdio.conf.js` 文件中向 Allure 选项添加 `useCucumberStepReporter: true`，典型配置如下：
```
  reporters: [
    [video, {
      saveAllVideos: false,       // 如果为 true，也会保存成功测试用例的视频
      videoSlowdownMultiplier: 3, // 更高的值获得更慢的视频，更低的值获得更快的视频 [值 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
有关完整示例，请查看 [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber) 的 cucumber 分支


Appium 设置
------------

从 `wdio-video-reporter` v1.2.4 开始，支持帮助 Allure 区分桌面和设备上的 safari 和 chrome 浏览器。
报告器使用自定义属性 `deviceType` 来标识不同的设备。
建议值为 `phone` 和 `tablet`。
建议为_所有_浏览器包含 `browserVersion`，以避免在同一 Selenium 网格中使用设备和桌面 Chrome 浏览器时出现 Chrome webdriver 的 bug。

生成的视频文件也会将 `deviceType` 添加到浏览器名称中。

Appium 配置示例：
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

以及 `wdio-config.json`：
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


贡献
============

fork 代码，进行更改，编写一些测试，进行 lint，运行测试，构建，并在 demo 中验证更改是否如预期工作，然后提交 PR。

demo 文件夹使用库的构建版本，所以如果您添加了新功能并想尝试它们，请确保进行构建。


感谢
======

感谢 [Johnson E](https://github.com/jonn-set) 修复了许多用户要求的 Cucumber 支持。