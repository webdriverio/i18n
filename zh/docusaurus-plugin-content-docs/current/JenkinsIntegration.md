---
id: jenkins
title: Jenkins 持续集成
---

WebdriverIO提供了与[Jenkins](https://jenkins-ci.org)等CI系统的紧密集成。通过`junit`报告器，您可以轻松调试测试并跟踪测试结果。集成过程非常简单。

1. 安装`junit`测试报告器：`$ npm install @wdio/junit-reporter --save-dev`)
1. 更新您的配置，将XUnit结果保存在Jenkins能够找到的位置（并指定`junit`报告器）：

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

您可以自由选择使用哪个框架，报告结果会类似。
在本教程中，我们将使用Jasmine。

编写完几个测试后，您可以设置一个新的Jenkins任务。为其命名并添加描述：

![Name And Description](/img/jenkins/jobname.png "Name And Description")

然后确保它始终获取您的仓库的最新版本：

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**现在是重要部分：**创建一个`build`步骤来执行shell命令。`build`步骤需要构建您的项目。由于这个演示项目只是测试外部应用程序，您不需要构建任何东西。只需安装node依赖项并运行命令`npm test`（这是`node_modules/.bin/wdio test/wdio.conf.js`的别名）。

如果您已安装了AnsiColor等插件，但日志仍未着色，请使用环境变量`FORCE_COLOR=1`运行测试（例如，`FORCE_COLOR=1 npm test`）。

![Build Step](/img/jenkins/runjob.png "Build Step")

测试结束后，您需要Jenkins跟踪您的XUnit报告。为此，您必须添加一个名为_"Publish JUnit test result report"_的构建后操作。

您也可以安装外部XUnit插件来跟踪报告。JUnit插件随基本Jenkins安装一起提供，目前已足够使用。

根据配置文件，XUnit报告将保存在项目的根目录中。这些报告是XML文件。因此，您需要做的就是指示Jenkins查找根目录中的所有XML文件：

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

就是这样！您现在已经设置了Jenkins来运行您的WebdriverIO作业。您的作业将提供详细的测试结果，包括历史图表、失败作业的堆栈跟踪信息以及每个测试中使用的命令及其负载列表。

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")