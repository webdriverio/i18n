---
id: integrate-with-app-percy
title: 移动应用程序
---

## 将WebdriverIO测试与App Percy集成

在集成之前，您可以探索[App Percy的WebdriverIO示例构建教程](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。
将您的测试套件与BrowserStack App Percy集成，以下是集成步骤概述：

### 步骤1：在Percy仪表板上创建新的应用项目

[登录](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)Percy并[创建一个新的应用类型项目](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。创建项目后，您将看到一个`PERCY_TOKEN`环境变量。Percy将使用`PERCY_TOKEN`来知道将截图上传到哪个组织和项目。您将在接下来的步骤中需要这个`PERCY_TOKEN`。

### 步骤2：将项目令牌设置为环境变量

运行给定命令将PERCY_TOKEN设置为环境变量：

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### 步骤3：安装Percy包

安装建立测试套件集成环境所需的组件。
要安装依赖项，请运行以下命令：

```sh
npm install --save-dev @percy/cli
```

### 步骤4：安装依赖项

安装Percy Appium应用

```sh
npm install --save-dev @percy/appium-app
```

### 步骤5：更新测试脚本
确保在代码中导入@percy/appium-app。

以下是使用percyScreenshot函数的示例测试。在需要截图的地方使用此函数。

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
我们传递了所需的参数给percyScreenshot方法。

截图方法参数是：

```sh
percyScreenshot(driver, name[, options])
```
### 步骤6：运行您的测试脚本

使用`percy app:exec`运行您的测试。

如果您无法使用percy app:exec命令或更喜欢使用IDE运行选项来运行测试，可以使用percy app:exec:start和percy app:exec:stop命令。要了解更多信息，请访问[运行Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。

```sh
$ percy app:exec -- appium test command
```
此命令启动Percy，创建一个新的Percy构建，拍摄快照并将它们上传到您的项目，然后停止Percy：


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## 访问以下页面了解更多详情：
- [将WebdriverIO测试与Percy集成](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [环境变量页面](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [使用BrowserStack SDK集成](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)（如果您使用的是BrowserStack Automate）。


| 资源                                                                                                                                                            | 描述                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [官方文档](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy的WebdriverIO文档 |
| [示例构建 - 教程](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy的WebdriverIO教程      |
| [官方视频](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | 使用App Percy进行视觉测试         |
| [博客](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | 认识App Percy：用于原生应用的AI驱动自动视觉测试平台    |