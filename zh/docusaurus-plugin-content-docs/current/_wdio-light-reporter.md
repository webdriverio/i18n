---
id: wdio-light-reporter
title: 轻量级报告生成器
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter 是一个第三方包，更多信息请查看 [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## 灵感来源于 HTML 和 Mochawesome 报告生成器

!理念:

> 此报告生成器不支持 cucumber 报告重新生成，开发时考虑的是 bdd 和 mocha 框架。
> 在这里，`describe()` 部分被视为测试场景，而 `it()` 被视为测试场景内的测试用例。

## 特性

1. 简单设置
2. 增强的 UI
3. 在 html 报告中嵌入截图
4. addLabel() 用于包含步骤上下文或名称


## 发布版本
V 0.1.9 - 初始发布
V 0.2.6 - (最新)
  1. 包含多环境运行并基于环境进行分类。
  2. 修复错误
  3. 提升性能。


## 示例

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## 安装

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## 配置

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## 截图

该报告生成器没有自动配置截图的功能，但是如果手动配置，它会监听事件并将截图附加到 HTML 报告中。
**要在报告中包含截图，请在 wdio 配置文件的 afterTest() 钩子中添加以下代码。**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## 结果文件

每次运行都会为每个 spec 文件重新生成 json 报告，要生成合并的 json 和 HTML 报告，请在 wdio 配置文件的 **onComplete()** 钩子中添加以下代码

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> 如果您在运行测试时没有使用任何 --suite 选项，则将 default 视为套件
> 如果您在运行时给出多个套件参数，报告生成器将无法工作。
> wdio run `wdio.conf.js --suite firstSuite` - **(正常工作)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(不工作)** :(

## 添加上下文

> 您可以使用 `useLabel()` 向任何步骤添加上下文或将其添加为步骤。

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## 更新
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## 许可证

MIT
**免费，耶！**