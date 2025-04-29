---
id: wdio-teamcity-reporter
title: Teamcity 报告器
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity 报告器使得实时显示测试结果成为可能，并在构建结果页面的测试选项卡上提供测试信息。


## 安装

```bash
npm install wdio-teamcity-reporter --save-dev
```

有关如何安装 WebdriverIO 的说明可以在这里找到：https://webdriver.io/docs/gettingstarted


## 配置

在你的 [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) 文件中添加报告器：

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### 选项

- `captureStandardOutput (boolean)` — 如果为 `true`，所有在 `testStarted` 和 `testFinished` 消息之间接收的标准输出（和标准错误）消息将被视为测试输出。默认值为 `false`，假设使用 testStdOut 和 testStdErr 服务消息来报告测试输出。默认 `false`。
- `flowId (boolean)` — 如果为 `true`，`flowId` 属性将添加到所有消息中。流跟踪对于区分并行运行的单独进程是必要的。默认 `true`。
- `message (string)` — 为名称属性提供特定格式的可能性。可能的键：`[browser]`，`[title]`。例如，`[browser] / [title]`。默认 `[title]`。


## 链接

- Teamcity 关于报告消息的文档参考：https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity 测试驱动：https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## 许可证

> The MIT License