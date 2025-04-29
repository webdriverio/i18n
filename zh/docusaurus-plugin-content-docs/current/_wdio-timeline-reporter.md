---
id: wdio-timeline-reporter
title: 时间线报告器
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter 是一个第三方包，更多信息请查看 [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> WebdriverIO测试结果聚合可视化的一站式报告器，因为"眼见为实"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## 为什么

因为我们花费大量时间从终端输出切换到查看错误截图等方式来调试失败的测试。这个报告器将所有典型信息聚合到一个报告中。运行测试后，您可以查看漂亮的事件时间线，进一步验证一切是否正常。

#### 功能包括：

- 与Mocha和Jasmine框架配合良好。也可以与Cucumber一起使用，但每个步骤都会被报告为一个测试
- 醒目的测试结果摘要
- 每次测试运行的详细信息，包括测试执行期间捕获的所有截图
- 测试结果过滤。非常适合聚焦于失败的测试
- 附加到测试的错误堆栈跟踪
- 能够在运行时向测试添加额外信息
- 不需要后处理。在wdio测试过程完成后，将生成静态html报告文件
- 时间线服务用于管理截图，包括调整图像大小

示例html报告可以在[这里](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)找到

关于如何安装`WebdriverIO`的说明可以在[这里](http://webdriver.io/guide/getstarted/install.html)找到。

## 安装

**适用于WEBDRIVERIO V4版本的兼容版本见[这里](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

依赖将添加到您的`package.json`中

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### 使用

在wdio配置文件中将`timeline`添加到reporters数组中。

同时从wdio-timeline-reporter导入并添加`TimelineService`。

服务是必需的，用于合并报告并创建html，因为在webdriverio 5中，reporters现在是按运行器实例初始化的。[查看webdriverio上的公开讨论](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService还可以管理测试执行期间的截图。您可以选择减小图像的大小和质量，并将图像作为base64嵌入到报告中。这些可以通过[reporter选项](#reporter-options)进行配置。

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Reporter选项

如果您希望覆盖默认的reporter配置，请在reporters下的timeline数组中添加reporterOptions对象字面量，如下所示。

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| 索引 | 描述                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------- |
| 1.    | 创建html文件和截图的目录。必选选项                                                                     |
| 2.    | 报告html文件的名称。默认值为`timeline-report.html`                                                    |
| 3.    | 将图像作为base64嵌入html文件。默认值为`false`                                                          |
| 4.    | 图像处理的对象选项                                                                                    |
| 5.    | 设置JPEG质量。仅在`resize`选项为`true`时相关。值越小，图像尺寸和质量越小。默认值为`70`。允许的最大值为`100` |
| 6.    | 调整图像大小。默认值为`false`                                                                          |
| 7.    | 减少总像素数的值。仅在`resize`选项为true时相关。默认为`1`有效值为`1 - 5`                                |
| 8.    | 截图频率。支持的值有`on:error`、`before:click`、`none`。默认为`none`。`before:click`是创建被测应用截图时间线的绝佳选项 |

### 向测试上下文添加额外信息

可以使用`addContext`静态方法向测试添加额外信息。这对于添加可能有助于调试失败测试的重要信息非常有用，例如在测试运行期间创建的具有动态用户名的用户

#### 基本用法

`TimelineReporter.addContext`静态方法接受字符串参数或带有两个属性`title`和`value`的对象字面量，例如

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value也可以是链接

##### Mocha示例

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // 对象字面量参数
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // 值为锚标签
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // 字符串参数
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## 致谢

非常感谢[wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter)的作者和维护者。查看他们的v5解决方案帮助加速了我的工作