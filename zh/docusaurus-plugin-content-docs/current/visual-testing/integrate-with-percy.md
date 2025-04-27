---
id: integrate-with-percy
title: 用于Web应用程序
---

## 将您的WebdriverIO测试与Percy集成

在集成之前，您可以探索[Percy的WebdriverIO示例构建教程](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。
将您的WebdriverIO自动化测试与BrowserStack Percy集成，以下是集成步骤概述：

### 步骤1：创建Percy项目
[登录](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)Percy。在Percy中，创建一个Web类型的项目，然后命名项目。项目创建后，Percy会生成一个令牌。请记下它。您需要在下一步中使用它来设置环境变量。

有关创建项目的详细信息，请参阅[创建Percy项目](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。

### 步骤2：将项目令牌设置为环境变量

运行以下命令将PERCY_TOKEN设置为环境变量：

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### 步骤3：安装Percy依赖项

安装建立测试套件集成环境所需的组件。

要安装依赖项，请运行以下命令：

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### 步骤4：更新您的测试脚本

导入Percy库以使用截图所需的方法和属性。
以下示例在异步模式下使用percySnapshot()函数：

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

在[独立模式](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)下使用WebdriverIO时，将浏览器对象作为第一个参数提供给`percySnapshot`函数：

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
快照方法参数如下：

```sh
percySnapshot(name[, options])
```
### 独立模式

```sh
percySnapshot(browser, name[, options])
```

- browser (必需) - WebdriverIO浏览器对象
- name (必需) - 快照名称；对每个快照必须唯一
- options - 参见每个快照的配置选项

要了解更多信息，请参阅[Percy快照](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。

### 步骤5：运行Percy
使用`percy exec`命令运行您的测试，如下所示：

如果您无法使用`percy:exec`命令或更喜欢使用IDE运行选项来运行测试，可以使用`percy:exec:start`和`percy:exec:stop`命令。要了解更多信息，请访问[运行Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)。

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## 有关更多详细信息，请访问以下页面：
- [将WebdriverIO测试与Percy集成](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [环境变量页面](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [使用BrowserStack SDK集成](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)（如果您使用的是BrowserStack Automate）。


| 资源                                                                                                                                                              | 描述                           |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| [官方文档](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)               | Percy的WebdriverIO文档        |
| [示例构建 - 教程](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)      | Percy的WebdriverIO教程        |
| [官方视频](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                                 | 使用Percy进行视觉测试         |
| [博客](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                  | 介绍视觉审查2.0               |