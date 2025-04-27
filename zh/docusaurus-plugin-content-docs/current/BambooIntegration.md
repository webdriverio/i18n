---
id: bamboo
title: Bamboo（竹子）
---

WebdriverIO 提供了与 [Bamboo](https://www.atlassian.com/software/bamboo) 等 CI 系统的紧密集成。通过 [JUnit](https://webdriver.io/docs/junit-reporter.html) 或 [Allure](https://webdriver.io/docs/allure-reporter.html) 报告器，您可以轻松调试测试并跟踪测试结果。集成非常简单。

1. 安装 JUnit 测试报告器：`$ npm install @wdio/junit-reporter --save-dev`)
1. 更新您的配置，将 JUnit 结果保存在 Bamboo 可以找到的位置（并指定 `junit` 报告器）：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
注意：*将测试结果保存在单独的文件夹中而不是根文件夹中始终是一个好的标准。*

```js
// wdio.conf.js - 用于并行运行的测试
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

所有框架的报告都将类似，您可以使用任何一种：Mocha、Jasmine 或 Cucumber。

现在，我们相信您已经编写了测试，并在 ```./testresults/``` 文件夹中生成了结果，而且您的 Bamboo 已经启动并运行。

## 在 Bamboo 中集成您的测试

1. 打开您的 Bamboo 项目
    > 创建新计划，链接您的存储库（确保它始终指向您存储库的最新版本）并创建您的阶段

    ![计划详情](/img/bamboo/plancreation.png "计划详情")

    我将使用默认阶段和作业。在您的情况下，您可以创建自己的阶段和作业

    ![默认阶段](/img/bamboo/defaultstage.png "默认阶段")
2. 打开您的测试作业并创建任务以在 Bamboo 中运行您的测试
    >**任务 1:** 源代码检出

    >**任务 2:** 运行您的测试 ```npm i && npm run test```。您可以使用 *脚本* 任务和 *Shell 解释器* 来运行上述命令（这将生成测试结果并将它们保存在 ```./testresults/``` 文件夹中）

    ![测试运行](/img/bamboo/testrun.png "测试运行")

    >**任务: 3** 添加 *jUnit 解析器* 任务来解析您保存的测试结果。请在此处指定测试结果目录（您也可以使用 Ant 样式模式）

    ![jUnit 解析器](/img/bamboo/junitparser.png "jUnit 解析器")

    注意：*确保您将结果解析器任务放在 *最终* 部分，以便即使您的测试任务失败，它也始终会被执行*

    >**任务: 4** （可选）为确保您的测试结果不会与旧文件混淆，您可以创建一个任务，在成功解析到 Bamboo 后删除 ```./testresults/``` 文件夹。您可以添加一个 shell 脚本，如 ```rm -f ./testresults/*.xml``` 来删除结果，或 ```rm -r testresults``` 来删除整个文件夹

完成上述 *火箭科学* 后，请启用计划并运行它。您的最终输出将如下所示：

## 成功的测试

![成功的测试](/img/bamboo/successfulltest.png "成功的测试")

## 失败的测试

![失败的测试](/img/bamboo/failedtest.png "失败的测试")

## 失败和修复

![失败和修复](/img/bamboo/failedandfixed.png "失败和修复")

耶！！就是这样。您已成功地在 Bamboo 中集成了 WebdriverIO 测试。