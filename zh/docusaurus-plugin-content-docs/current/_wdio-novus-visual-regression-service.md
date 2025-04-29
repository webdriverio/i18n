---
id: wdio-novus-visual-regression-service
title: Novus 视觉回归服务
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service 是一个第三方软件包，更多信息请查看 [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> WebdriverIO 的视觉回归测试

基于 Jan-André Zinser 在 [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) 和 [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot) 上的工作

## 安装

您可以通过 NPM 安装 wdio-novus-visual-regression-service：

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置
通过在 WebdriverIO 配置的服务部分添加 `novus-visual-regression` 并在服务选项中定义所需的比较策略来设置 wdio-novus-visual-regression-service。

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### 选项
在 wdio.config.js 中的 `visualRegression` 键下，您可以传递具有以下结构的配置对象：

* **compare** `Object` <br />
截图比较方法，请参阅 [比较方法](#compare-methods)

* **viewportChangePause**  `Number`  ( 默认值: 100 ) <br />
视口改变后等待 x 毫秒。浏览器重新绘制可能需要一段时间。这可能导致渲染问题并产生不一致的结果。

* **viewports** `Object[{ width: Number, height: Number }]`  ( 默认值: *[当前视口]* ) (**仅限桌面**)<br />
   所有屏幕截图将在不同的视口尺寸下拍摄（例如，用于响应式设计测试）

* **orientations** `String[] {landscape, portrait}`  ( 默认值: *[当前方向]* ) (**仅限移动设备**)<br />
    所有屏幕截图将在不同的屏幕方向下拍摄（例如，用于响应式设计测试）

### 比较方法
wdio-novus-visual-regression-service 允许使用不同的屏幕截图比较方法。

#### VisualRegressionCompare.LocalCompare
顾名思义，*LocalCompare* 在您的计算机上本地捕获屏幕截图，并将它们与先前的运行进行比较。

您可以向其构造函数传递以下选项作为对象：

* **referenceName** `Function` <br />
传入一个返回参考截图文件名的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **screenshotName** `Function` <br />
传入一个返回当前截图文件名的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **diffName** `Function` <br />
传入一个返回差异截图文件名的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **misMatchTolerance** `Number`  ( 默认值: 0.01 ) <br />
0 到 100 之间的数字，定义了将两张图像视为相同的不匹配程度，增加此值将减少测试覆盖率。

* **ignoreComparison** `String`  ( 默认值: 无 ) <br />
传入值为 `nothing`、`colors` 或 `antialiasing` 的字符串以调整比较方法。

有关根据当前测试名称生成屏幕截图文件名的示例，请查看[配置](#configuration)的示例代码。

#### VisualRegressionCompare.SaveScreenshot
此方法是 `VisualRegressionCompare.LocalCompare` 的精简变体，仅用于捕获屏幕截图。当您只想创建参考截图并覆盖先前的截图而不进行差异比较时，这非常有用。

您可以向其构造函数传递以下选项作为对象：

* **screenshotName** `Function` <br />
传入一个返回当前截图文件名的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

#### VisualRegressionCompare.Spectre
此方法用于将屏幕截图上传到 Web 应用程序 [Spectre](https://github.com/wearefriday/spectre)。
Spectre 是视觉回归测试的 UI。它存储屏幕截图并比较它们，这对于持续集成非常有用。

您可以向其构造函数传递以下选项作为对象：

* **url** `String` <br />
传入 spectre Web 服务 URL。

* **project** `String` <br />
为您的项目传入名称。

* **suite** `String` <br />
为您的测试套件传入名称。一个项目可以包含多个套件。

* **test** `Function` <br />
传入一个返回截图测试名称的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **browser** `Function` <br />
传入一个返回截图浏览器的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **size** `Function` <br />
传入一个返回截图大小的函数。该函数接收一个包含有关命令所有相关信息的 *context* 对象作为第一个参数。

* **fuzzLevel** `Number`  ( 默认值: 30 ) <br />
0 到 100 之间的数字，定义 Spectre 图像比较方法的模糊因子。有关更多详细信息，请查看 [Spectre 文档](https://github.com/wearefriday/spectre)。

**示例**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## 使用
wdio-novus-visual-regression-service 使用以下命令增强 WebdriverIO 实例：
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


所有这些都提供了选项，可帮助您在不同维度捕获屏幕截图或排除不相关部分（例如内容）。以下选项可用：


* **exclude** `String[]|Object[]` (**尚未实现**)<br />
  排除截图中频繁变化的部分，您可以传递各种不同的 [WebdriverIO 选择器策略](http://webdriver.io/guide/usage/selectors.html)
  查询一个或多个元素，或者您可以定义 x 和 y 值，以拉伸矩形或多边形

* **hide** `Object[]`<br />
  隐藏通过各种不同 [WebdriverIO 选择器策略](http://webdriver.io/guide/usage/selectors.html) 查询的所有元素（通过 `visibility: hidden`）

* **remove** `Object[]`<br />
  移除通过各种不同 [WebdriverIO 选择器策略](http://webdriver.io/guide/usage/selectors.html) 查询的所有元素（通过 `display: none`）

* **viewports** `Object[{ width: Number, height: Number }]` (**仅限桌面**)<br />
     覆盖此命令的全局 *viewports* 值。所有屏幕截图将在不同的视口尺寸下拍摄（例如，用于响应式设计测试）

* **orientations** `String[] {landscape, portrait}` (**仅限移动设备**)<br />
    覆盖此命令的全局 *orientations* 值。所有屏幕截图将在不同的屏幕方向下拍摄（例如，用于响应式设计测试）

* **misMatchTolerance** `Number` <br />
    覆盖此命令的全局 *misMatchTolerance* 值。传入 0 到 100 之间的数字，定义将两张图像视为相同的不匹配程度。

* **fuzzLevel** `Number` <br />
    覆盖此命令的全局 *fuzzLevel* 值。传入 0 到 100 之间的数字，定义 Spectre 图像比较方法的模糊因子。

* **ignoreComparison** `String` <br />
    覆盖此命令的全局 *ignoreComparison* 值。传入值为 `nothing`、`colors` 或 `antialiasing` 的字符串以调整比较方法。

* **viewportChangePause**  `Number` <br />
    覆盖此命令的全局 *viewportChangePause* 值。视口改变后等待 x 毫秒。

### 许可证

MIT